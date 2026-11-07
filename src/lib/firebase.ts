import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Mandatory boot connection check per Firebase integration guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validation constants synced verbatim with firebase-blueprint.json
export const CONSULTATION_CONSTRAINTS = {
  ID_MAX_LENGTH: 128,
  ID_PATTERN: /^[a-zA-Z0-9_\-]+$/,
  ALLOWED_BRANDS: ['Jaguar', 'Land Rover', 'Bentley', 'Rolls-Royce'] as const,
  MODEL_MIN_LENGTH: 2,
  MODEL_MAX_LENGTH: 100,
  SERVICE_MIN_LENGTH: 2,
  SERVICE_MAX_LENGTH: 80,
  KELUHAN_MIN_LENGTH: 5,
  KELUHAN_MAX_LENGTH: 1000,
  DIAGNOSA_MAX_LENGTH: 4000,
  ALLOWED_STATUS: ['tercatat', 'dikonsultasikan', 'selesai'] as const,
};

export type BritishBrandName = (typeof CONSULTATION_CONSTRAINTS.ALLOWED_BRANDS)[number];
export type ConsultationStatus = (typeof CONSULTATION_CONSTRAINTS.ALLOWED_STATUS)[number];

export interface ConsultationRecord {
  id: string;
  ownerId: string;
  merek: BritishBrandName;
  modelTahun: string;
  layanan: string;
  keluhan: string;
  catatanDiagnosa: string;
  status: ConsultationStatus;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export async function createConsultationRecord(input: {
  merek: BritishBrandName;
  modelTahun: string;
  layanan: string;
  keluhan: string;
  catatanDiagnosa: string;
}): Promise<string> {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error('Silakan masuk terlebih dahulu untuk menyimpan catatan konsultasi.');
  }

  const cleanId = `consult_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const path = `consultations/${cleanId}`;

  const sanitizedPayload = {
    ownerId: currentUser.uid.slice(0, CONSULTATION_CONSTRAINTS.ID_MAX_LENGTH),
    merek: CONSULTATION_CONSTRAINTS.ALLOWED_BRANDS.includes(input.merek)
      ? input.merek
      : 'Land Rover',
    modelTahun: input.modelTahun
      .trim()
      .slice(0, CONSULTATION_CONSTRAINTS.MODEL_MAX_LENGTH) || 'Model Umum',
    layanan: input.layanan
      .trim()
      .slice(0, CONSULTATION_CONSTRAINTS.SERVICE_MAX_LENGTH) || 'Diagnosa Komputer',
    keluhan: input.keluhan.trim().slice(0, CONSULTATION_CONSTRAINTS.KELUHAN_MAX_LENGTH),
    catatanDiagnosa: (input.catatanDiagnosa || '')
      .trim()
      .slice(0, CONSULTATION_CONSTRAINTS.DIAGNOSA_MAX_LENGTH),
    status: 'tercatat' as ConsultationStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    await setDoc(doc(db, 'consultations', cleanId), sanitizedPayload);
    return cleanId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateConsultationStatus(
  id: string,
  status: ConsultationStatus
): Promise<void> {
  if (!CONSULTATION_CONSTRAINTS.ID_PATTERN.test(id)) {
    throw new Error('ID catatan tidak valid.');
  }
  const path = `consultations/${id}`;
  try {
    await updateDoc(doc(db, 'consultations', id), {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteConsultationRecord(id: string): Promise<void> {
  if (!CONSULTATION_CONSTRAINTS.ID_PATTERN.test(id)) {
    throw new Error('ID catatan tidak valid.');
  }
  const path = `consultations/${id}`;
  try {
    await deleteDoc(doc(db, 'consultations', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeUserConsultations(
  uid: string,
  onData: (records: ConsultationRecord[]) => void,
  onError?: (err: Error) => void
) {
  const path = 'consultations';
  const q = query(collection(db, path), where('ownerId', '==', uid));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: ConsultationRecord[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ownerId: String(data.ownerId || ''),
          merek: (data.merek as BritishBrandName) || 'Land Rover',
          modelTahun: String(data.modelTahun || ''),
          layanan: String(data.layanan || ''),
          keluhan: String(data.keluhan || ''),
          catatanDiagnosa: String(data.catatanDiagnosa || ''),
          status: (data.status as ConsultationStatus) || 'tercatat',
          createdAt: data.createdAt ?? null,
          updatedAt: data.updatedAt ?? null,
        };
      });
      items.sort((a, b) => {
        const timeA = a.createdAt?.toMillis?.() ?? 0;
        const timeB = b.createdAt?.toMillis?.() ?? 0;
        return timeB - timeA;
      });
      onData(items);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (formattedErr) {
        if (onError && formattedErr instanceof Error) {
          onError(formattedErr);
        }
      }
    }
  );
}

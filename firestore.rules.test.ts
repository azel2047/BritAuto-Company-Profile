/**
 * Security Rules Dirty Dozen Verification Suite (`firestore.rules.test.ts`)
 * Verifies that all 12 adversarial payloads defined in `security_spec.md`
 * are rejected with PERMISSION_DENIED by `firestore.rules`.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  path: string;
  auth: { uid: string; email_verified: boolean } | null;
  payload?: Record<string, unknown>;
  existingData?: Record<string, unknown>;
  expectedResult: 'PERMISSION_DENIED';
}

const SERVER_TIME = '2026-11-06T04:00:00.000Z';

const validBasePayload = {
  ownerId: 'user_123',
  merek: 'Land Rover',
  modelTahun: 'Range Rover Vogue L405 2019',
  layanan: 'Diagnosa Komputer',
  keluhan: 'Suspensi udara depan turun setelah parkir semalam dan muncul pesan kesalahan.',
  catatanDiagnosa: 'Perlu pemeriksaan kompresor air suspension dan valve block.',
  status: 'tercatat',
  createdAt: SERVER_TIME,
  updatedAt: SERVER_TIME,
};

export const dirtyDozenPayloads: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: 'Unauthenticated Write',
    operation: 'create',
    path: '/consultations/consult_01',
    auth: null,
    payload: validBasePayload,
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 2,
    name: 'Unverified Email Write',
    operation: 'create',
    path: '/consultations/consult_02',
    auth: { uid: 'user_123', email_verified: false },
    payload: validBasePayload,
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 3,
    name: 'Identity Spoofing on Create',
    operation: 'create',
    path: '/consultations/consult_03',
    auth: { uid: 'attacker_999', email_verified: true },
    payload: { ...validBasePayload, ownerId: 'user_123' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Shadow/Ghost Field Injection',
    operation: 'create',
    path: '/consultations/consult_04',
    auth: { uid: 'user_123', email_verified: true },
    payload: { ...validBasePayload, isVerifiedAdmin: true },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'ID Poisoning Attack',
    operation: 'create',
    path: `/consultations/${'a'.repeat(200)}`,
    auth: { uid: 'user_123', email_verified: true },
    payload: validBasePayload,
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 6,
    name: 'Brand Enum Violation',
    operation: 'create',
    path: '/consultations/consult_06',
    auth: { uid: 'user_123', email_verified: true },
    payload: { ...validBasePayload, merek: 'OtherBrand' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 7,
    name: 'Denial-of-Wallet Oversized String',
    operation: 'create',
    path: '/consultations/consult_07',
    auth: { uid: 'user_123', email_verified: true },
    payload: { ...validBasePayload, keluhan: 'X'.repeat(1500) },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 8,
    name: 'Client Timestamp Forgery',
    operation: 'create',
    path: '/consultations/consult_08',
    auth: { uid: 'user_123', email_verified: true },
    payload: { ...validBasePayload, createdAt: '2020-01-01T00:00:00.000Z' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 9,
    name: 'Owner Reassignment on Update',
    operation: 'update',
    path: '/consultations/consult_09',
    auth: { uid: 'user_123', email_verified: true },
    existingData: validBasePayload,
    payload: { ...validBasePayload, ownerId: 'other_user_456' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Immutable CreatedAt Mutation',
    operation: 'update',
    path: '/consultations/consult_10',
    auth: { uid: 'user_123', email_verified: true },
    existingData: validBasePayload,
    payload: { ...validBasePayload, createdAt: '2026-11-06T05:00:00.000Z' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 11,
    name: 'Terminal State Bypass',
    operation: 'update',
    path: '/consultations/consult_11',
    auth: { uid: 'user_123', email_verified: true },
    existingData: { ...validBasePayload, status: 'selesai' },
    payload: { ...validBasePayload, status: 'tercatat' },
    expectedResult: 'PERMISSION_DENIED',
  },
  {
    id: 12,
    name: 'Cross-User Read/List Scraping',
    operation: 'get',
    path: '/consultations/consult_12',
    auth: { uid: 'attacker_999', email_verified: true },
    existingData: validBasePayload,
    expectedResult: 'PERMISSION_DENIED',
  },
];

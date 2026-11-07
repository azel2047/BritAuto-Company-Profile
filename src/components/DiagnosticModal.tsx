import React, { useState, useEffect } from 'react';
import {
  X,
  Wrench,
  Send,
  BookmarkCheck,
  Trash2,
  CheckCircle2,
  LogIn,
  LogOut,
  Loader2,
} from 'lucide-react';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  auth,
  googleProvider,
  CONSULTATION_CONSTRAINTS,
  BritishBrandName,
  ConsultationRecord,
  createConsultationRecord,
  subscribeUserConsultations,
  updateConsultationStatus,
  deleteConsultationRecord,
} from '../lib/firebase';
import { buildWhatsAppLink } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const { language, content } = useLanguage();
  const [merek, setMerek] = useState<BritishBrandName>('Land Rover');
  const [modelTahun, setModelTahun] = useState('Range Rover Vogue 2019');
  const [layanan, setLayanan] = useState(
    initialService || content.services.items[0].title
  );
  const [keluhan, setKeluhan] = useState('');
  const [catatanDiagnosa, setCatatanDiagnosa] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisNotice, setAnalysisNotice] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [savedRecords, setSavedRecords] = useState<ConsultationRecord[]>([]);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialService) {
      setLayanan(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setSavedRecords([]);
      return;
    }
    const unsubDocs = subscribeUserConsultations(
      currentUser.uid,
      (records) => {
        setSavedRecords(records);
      },
      () => {
        // Handled by handleFirestoreError
      }
    );
    return () => unsubDocs();
  }, [currentUser]);

  if (!isOpen) return null;

  const handleAnalyzeSymptoms = async () => {
    setAnalysisNotice(null);
    const trimmedKeluhan = keluhan.trim();
    if (trimmedKeluhan.length < CONSULTATION_CONSTRAINTS.KELUHAN_MIN_LENGTH) {
      setAnalysisNotice(
        language === 'en'
          ? 'Please enter at least 5 characters describing the vehicle symptoms.'
          : 'Mohon tuliskan keluhan kendaraan minimal 5 karakter terlebih dahulu.'
      );
      return;
    }

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merek,
          modelTahun: modelTahun.trim().slice(0, CONSULTATION_CONSTRAINTS.MODEL_MAX_LENGTH),
          layanan,
          keluhan: trimmedKeluhan.slice(0, CONSULTATION_CONSTRAINTS.KELUHAN_MAX_LENGTH),
        }),
      });
      const data = await response.json();

      if (response.ok && data.analysis) {
        setCatatanDiagnosa(
          String(data.analysis).slice(0, CONSULTATION_CONSTRAINTS.DIAGNOSA_MAX_LENGTH)
        );
      } else {
        const fallbackSummary =
          language === 'en'
            ? [
                `1. Inspection Focus (${merek} - ${layanan}): Diagnostic module scanning and physical component inspection by Brit Auto technicians.`,
                `2. Workshop Stage: Vehicle registration upon arrival and root-cause verification by our 4 experienced technicians in Cilandak.`,
                `3. Cost Transparency: Detailed cost estimate prepared and approved by you before any repair work begins.`,
              ].join('\n')
            : [
                `1. Fokus Pemeriksaan (${merek} - ${layanan}): Pemeriksaan modul terkait menggunakan alat diagnosa serta inspeksi fisik komponen oleh teknisi Brit Auto.`,
                `2. Tahap di Bengkel: Kendaraan didata saat tiba, sumber keluhan dipastikan oleh 4 teknisi berpengalaman kami di Cilandak.`,
                `3. Transparansi Biaya: Estimasi biaya disusun secara rinci dan disetujui Anda terlebih dahulu sebelum pengerjaan dimulai.`,
              ].join('\n');
        setCatatanDiagnosa(fallbackSummary);
        setAnalysisNotice(
          language === 'en'
            ? 'Initial inspection summary prepared for forwarding to Brit Auto WhatsApp.'
            : 'Ringkasan pemeriksaan awal telah disiapkan untuk diteruskan ke WhatsApp Brit Auto.'
        );
      }
    } catch {
      const fallbackSummary =
        language === 'en'
          ? [
              `1. Inspection Focus (${merek} - ${layanan}): Comprehensive troubleshooting of reported symptoms.`,
              `2. Workshop Stage: Direct inspection by Brit Auto technicians at Jl. Karang Tengah Raya No. 9, Cilandak.`,
              `3. Cost Transparency: Cost estimate approved by you before work begins.`,
            ].join('\n')
          : [
              `1. Fokus Pemeriksaan (${merek} - ${layanan}): Pemeriksaan menyeluruh sumber keluhan pada kendaraan Anda.`,
              `2. Tahap di Bengkel: Pemeriksaan langsung oleh teknisi Brit Auto di Jl. Karang Tengah Raya No. 9, Cilandak.`,
              `3. Transparansi Biaya: Estimasi biaya disetujui Anda sebelum pengerjaan dimulai.`,
            ].join('\n');
      setCatatanDiagnosa(fallbackSummary);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGoogleLogin = async () => {
    setSaveMessage(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {
      setSaveMessage(
        language === 'en'
          ? 'Google sign-in failed. Please try again.'
          : 'Gagal masuk dengan akun Google. Silakan coba kembali.'
      );
    }
  };

  const handleSaveConsultation = async () => {
    setSaveMessage(null);
    const trimmedKeluhan = keluhan.trim();
    if (trimmedKeluhan.length < CONSULTATION_CONSTRAINTS.KELUHAN_MIN_LENGTH) {
      setSaveMessage(
        language === 'en'
          ? 'Please enter at least 5 characters describing the symptoms.'
          : 'Mohon tuliskan keluhan kendaraan minimal 5 karakter.'
      );
      return;
    }

    setIsSaving(true);
    try {
      await createConsultationRecord({
        merek,
        modelTahun: modelTahun.trim() || merek,
        layanan,
        keluhan: trimmedKeluhan,
        catatanDiagnosa,
      });
      setSaveMessage(
        language === 'en'
          ? 'Consultation record saved to your history.'
          : 'Catatan keluhan berhasil disimpan ke riwayat Anda.'
      );
    } catch {
      setSaveMessage(
        language === 'en'
          ? 'Failed to save record. Make sure your Google account is verified.'
          : 'Gagal menyimpan catatan. Pastikan akun Google Anda terverifikasi.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const compiledWhatsAppMessage =
    language === 'en'
      ? [
          `Hello Brit Auto, I would like to consult regarding my British car:`,
          `• Brand: ${merek}`,
          `• Model/Year: ${modelTahun.trim() || '-'}`,
          `• Service: ${layanan}`,
          `• Symptoms: ${keluhan.trim() || '-'}`,
          catatanDiagnosa ? `\nPre-Diagnosis Notes:\n${catatanDiagnosa}` : '',
        ]
          .filter(Boolean)
          .join('\n')
      : [
          `Halo Brit Auto, saya ingin konsultasi servis mobil Inggris saya:`,
          `• Merek: ${merek}`,
          `• Model/Tahun: ${modelTahun.trim() || '-'}`,
          `• Layanan: ${layanan}`,
          `• Keluhan: ${keluhan.trim() || '-'}`,
          catatanDiagnosa ? `\nCatatan Pra-Diagnosa:\n${catatanDiagnosa}` : '',
        ]
          .filter(Boolean)
          .join('\n');

  const whatsappUrl = buildWhatsAppLink(compiledWhatsAppMessage, language);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="diagnostic-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060E24]/75 backdrop-blur-sm overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] dark:bg-[#0B1B3F] text-[#0B1B3F] dark:text-[#FFFFFF] rounded-[24px] border border-[#DDE2F0] dark:border-[#DDE2F0]/15 shadow-2xl p-6 md:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#DDE2F0] dark:border-[#DDE2F0]/15">
          <div>
            <span className="inline-flex items-center rounded-full bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 text-[#2F5BEA] dark:text-[#FFFFFF] px-3 py-1 text-xs font-medium uppercase tracking-[0.04em]">
              {content.diagnosticAssistant.modalPill}
            </span>
            <h2
              id="diagnostic-modal-title"
              className="mt-2 heading-h3 text-[#0B1B3F] dark:text-[#FFFFFF]"
            >
              {content.diagnosticAssistant.modalTitle}
            </h2>
            <p className="mt-1 text-sm text-[#4A5578] dark:text-[#B8C2DD]">
              {content.diagnosticAssistant.modalSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={
              language === 'en' ? 'Close consultation window' : 'Tutup jendela konsultasi'
            }
            className="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full text-[#4A5578] dark:text-[#B8C2DD] hover:bg-[#F4F6FB] dark:hover:bg-[#060E24] hover:text-[#0B1B3F] dark:hover:text-[#FFFFFF] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
          </button>
        </div>

        {/* Form Controls */}
        <div className="mt-6 space-y-4">
          {/* Brand Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD] mb-2">
              {content.diagnosticAssistant.brandLabel}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CONSULTATION_CONSTRAINTS.ALLOWED_BRANDS.map((brandOption) => (
                <button
                  key={brandOption}
                  type="button"
                  onClick={() => setMerek(brandOption)}
                  className={`min-h-[44px] px-3 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    merek === brandOption
                      ? 'bg-[#2F5BEA] text-[#FFFFFF]'
                      : 'bg-[#F4F6FB] dark:bg-[#060E24] text-[#0B1B3F] dark:text-[#FFFFFF] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA]/30'
                  }`}
                >
                  {brandOption}
                </button>
              ))}
            </div>
          </div>

          {/* Model & Service Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="vehicle-model-input"
                className="block text-xs font-semibold uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD] mb-1.5"
              >
                {content.diagnosticAssistant.modelLabel}
              </label>
              <input
                id="vehicle-model-input"
                type="text"
                maxLength={CONSULTATION_CONSTRAINTS.MODEL_MAX_LENGTH}
                value={modelTahun}
                onChange={(e) => setModelTahun(e.target.value)}
                placeholder={content.diagnosticAssistant.modelPlaceholder}
                className="w-full h-12 px-4 rounded-[12px] bg-[#FFFFFF] dark:bg-[#060E24] border border-[#DDE2F0] dark:border-[#DDE2F0]/20 text-sm text-[#0B1B3F] dark:text-[#FFFFFF] focus:border-[#2F5BEA] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="service-category-select"
                className="block text-xs font-semibold uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD] mb-1.5"
              >
                {content.diagnosticAssistant.serviceLabel}
              </label>
              <select
                id="service-category-select"
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                className="w-full h-12 px-4 rounded-[12px] bg-[#FFFFFF] dark:bg-[#060E24] border border-[#DDE2F0] dark:border-[#DDE2F0]/20 text-sm text-[#0B1B3F] dark:text-[#FFFFFF] focus:border-[#2F5BEA] focus:outline-none"
              >
                {content.services.items.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Symptom Description */}
          <div>
            <label
              htmlFor="symptom-textarea"
              className="block text-xs font-semibold uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD] mb-1.5"
            >
              {content.diagnosticAssistant.symptomLabel}
            </label>
            <textarea
              id="symptom-textarea"
              rows={3}
              maxLength={CONSULTATION_CONSTRAINTS.KELUHAN_MAX_LENGTH}
              value={keluhan}
              onChange={(e) => setKeluhan(e.target.value)}
              placeholder={content.diagnosticAssistant.symptomPlaceholder}
              className="w-full p-4 rounded-[12px] bg-[#FFFFFF] dark:bg-[#060E24] border border-[#DDE2F0] dark:border-[#DDE2F0]/20 text-sm text-[#0B1B3F] dark:text-[#FFFFFF] focus:border-[#2F5BEA] focus:outline-none"
            />
          </div>

          {/* Pre-Diagnosis Button & Output */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleAnalyzeSymptoms}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#2F5BEA] dark:border-[#93B4FF] text-[#2F5BEA] dark:text-[#FFFFFF] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA]/30 px-5 py-2.5 min-h-[44px] text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              ) : (
                <Wrench className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              )}
              <span>
                {isAnalyzing
                  ? content.diagnosticAssistant.analyzingButton
                  : content.diagnosticAssistant.analyzeButton}
              </span>
            </button>

            {analysisNotice && (
              <span className="text-xs text-[#4A5578] dark:text-[#B8C2DD]">
                {analysisNotice}
              </span>
            )}
          </div>

          {catatanDiagnosa && (
            <div className="rounded-[12px] bg-[#F4F6FB] dark:bg-[#060E24] border border-[#DDE2F0] dark:border-[#DDE2F0]/15 p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.04em] text-[#2F5BEA] dark:text-[#93B4FF] mb-1.5">
                {content.diagnosticAssistant.summaryHeading}
              </div>
              <p className="text-xs leading-5 text-[#0B1B3F] dark:text-[#FFFFFF] whitespace-pre-line">
                {catatanDiagnosa}
              </p>
            </div>
          )}

          {/* Primary WhatsApp Forward & Optional Cloud Save */}
          <div className="pt-4 border-t border-[#DDE2F0] dark:border-[#DDE2F0]/15 flex flex-wrap items-center justify-between gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D32F3F] hover:bg-[#B82635] text-[#FFFFFF] px-6 py-3 min-h-[44px] text-sm font-semibold transition-colors"
            >
              <Send className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              <span>{content.diagnosticAssistant.sendWhatsAppButton}</span>
            </a>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSaveConsultation}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-full bg-[#E6ECFD] dark:bg-[#2F5BEA]/25 hover:bg-[#2F5BEA] text-[#2F5BEA] dark:text-[#FFFFFF] hover:text-[#FFFFFF] px-4 py-2.5 min-h-[44px] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <BookmarkCheck className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                  <span>
                    {isSaving
                      ? content.diagnosticAssistant.savingButton
                      : content.diagnosticAssistant.saveButton}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => signOut(auth)}
                  aria-label="Keluar dari akun"
                  className="inline-flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full text-[#4A5578] dark:text-[#B8C2DD] hover:bg-[#F4F6FB] dark:hover:bg-[#060E24] cursor-pointer"
                >
                  <LogOut className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="inline-flex items-center gap-2 rounded-full bg-[#F4F6FB] dark:bg-[#060E24] hover:bg-[#E6ECFD] dark:hover:bg-[#2F5BEA]/30 text-[#0B1B3F] dark:text-[#FFFFFF] px-4 py-2.5 min-h-[44px] text-xs font-medium transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4 stroke-[1.5] text-[#2F5BEA] dark:text-[#93B4FF]" aria-hidden="true" />
                <span>{content.diagnosticAssistant.loginGoogleButton}</span>
              </button>
            )}
          </div>

          {saveMessage && (
            <p className="text-xs font-medium text-[#2F5BEA] dark:text-[#93B4FF]">
              {saveMessage}
            </p>
          )}

          {/* Saved Consultation History for Authenticated Owner */}
          {currentUser && savedRecords.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[#DDE2F0] dark:border-[#DDE2F0]/15">
              <h3 className="text-xs font-semibold uppercase tracking-[0.04em] text-[#4A5578] dark:text-[#B8C2DD] mb-3">
                {content.diagnosticAssistant.historyHeading} ({savedRecords.length})
              </h3>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {savedRecords.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-[12px] bg-[#F4F6FB] dark:bg-[#060E24] border border-[#DDE2F0] dark:border-[#DDE2F0]/15 p-3 flex items-start justify-between gap-3"
                  >
                    <div className="text-xs">
                      <div className="font-semibold text-[#0B1B3F] dark:text-[#FFFFFF]">
                        {item.merek} · {item.modelTahun} ({item.layanan})
                      </div>
                      <p className="text-[#4A5578] dark:text-[#B8C2DD] mt-0.5">
                        {item.keluhan}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-medium text-[#2F5BEA] dark:text-[#93B4FF]">
                        Status: {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {item.status !== 'selesai' && (
                        <button
                          type="button"
                          onClick={() =>
                            updateConsultationStatus(item.id, 'dikonsultasikan')
                          }
                          aria-label="Tandai sudah dikonsultasikan"
                          className="inline-flex items-center justify-center w-9 h-9 min-w-[44px] min-h-[44px] rounded-full text-[#1F9D55] hover:bg-[#FFFFFF] dark:hover:bg-[#0B1B3F] cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteConsultationRecord(item.id)}
                        aria-label="Hapus catatan"
                        className="inline-flex items-center justify-center w-9 h-9 min-w-[44px] min-h-[44px] rounded-full text-[#4A5578] dark:text-[#B8C2DD] hover:text-[#D32F3F] hover:bg-[#FFFFFF] dark:hover:bg-[#0B1B3F] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

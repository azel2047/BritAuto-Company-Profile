import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

export const WhatsAppFloat: React.FC = () => {
  const { language } = useLanguage();
  const whatsappHref = buildWhatsAppLink(undefined, language);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      title="Chat WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center justify-center w-14 h-14 min-w-[56px] min-h-[56px] rounded-full bg-[#1F9D55] hover:bg-[#198246] hover:scale-[1.04] active:scale-[0.98] text-[#FFFFFF] shadow-[0_12px_32px_rgba(6,14,36,0.28)] transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-[#2F5BEA] focus-visible:outline-offset-2"
    >
      <MessageCircle className="w-7 h-7 stroke-[1.75]" aria-hidden="true" />
    </a>
  );
};

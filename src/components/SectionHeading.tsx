import React from 'react';

interface SectionHeadingProps {
  id?: string;
  pill?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  pill,
  title,
  subtitle,
  align = 'center',
  dark = false,
}) => {
  const alignmentClasses =
    align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';

  return (
    <div className={`flex flex-col max-w-2xl pt-12 pb-4 ${alignmentClasses}`}>
      {pill && (
        <span
          className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.04em] mb-4 ${
            dark
              ? 'bg-[#2F5BEA]/25 text-[#B8C2DD] border border-[#2F5BEA]/40'
              : 'bg-[#E6ECFD] text-[#2F5BEA] dark:bg-[#2F5BEA]/25 dark:text-[#B8C2DD] dark:border dark:border-[#2F5BEA]/40'
          }`}
        >
          {pill}
        </span>
      )}
      <h2
        id={id}
        className={`heading-h2 ${
          dark ? 'text-[#FFFFFF]' : 'text-[#0B1B3F] dark:text-[#FFFFFF]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-6 font-normal ${
            dark ? 'text-[#B8C2DD]' : 'text-[#4A5578] dark:text-[#B8C2DD]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

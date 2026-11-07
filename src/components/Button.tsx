import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost-dark' | 'ghost-light';
  withArrowCircle?: boolean;
  external?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  withArrowCircle = false,
  external = false,
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 min-h-[44px] text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-150 ease-out focus-visible:outline-2 focus-visible:outline-[#2F5BEA] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-[#D32F3F] text-[#FFFFFF] hover:bg-[#B82635] hover:scale-[1.02] active:scale-[0.99] shadow-sm',
    secondary:
      'bg-transparent border-[1.5px] border-[#2F5BEA] text-[#2F5BEA] hover:bg-[#E6ECFD] hover:scale-[1.02]',
    'ghost-dark':
      'bg-[#0B1B3F]/60 border border-[#FFFFFF]/25 text-[#FFFFFF] hover:bg-[#FFFFFF]/10 hover:border-[#FFFFFF]/40 hover:scale-[1.02]',
    'ghost-light':
      'bg-[#FFFFFF] border border-[#DDE2F0] text-[#0B1B3F] hover:border-[#2F5BEA] hover:text-[#2F5BEA] hover:scale-[1.02]',
  };

  const content = (
    <>
      <span>{children}</span>
      {withArrowCircle && (
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#FFFFFF] text-[#D32F3F] shrink-0"
        >
          <ArrowUpRight className="w-4 h-4 stroke-[2]" />
        </span>
      )}
    </>
  );

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={combinedClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={combinedClassName}
    >
      {content}
    </button>
  );
};

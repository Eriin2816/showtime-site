import { business } from '@/data/business';

interface CTAButtonProps {
  label?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: boolean;
}

export function CTAButton({
  label,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = true,
}: CTAButtonProps) {
  const finalHref = href ?? business.cta.href;
  const finalLabel = label ?? business.cta.label;

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-[background,transform,box-shadow] duration-200 active:scale-[0.97] focus-ring';

  const sizeMap = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const variantMap = {
    primary: 'bg-pool-azure text-white hover:bg-pool-azure-hover shadow-azure hover:shadow-azure-lg',
    secondary: 'bg-pool-deep text-white hover:bg-pool-deep-700 shadow-deep',
    outline: 'border-2 border-pool-azure text-pool-azure hover:bg-pool-azure hover:text-white',
  };

  return (
    <a
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${sizeMap[size]} ${variantMap[variant]} ${className}`}
    >
      {icon && (
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )}
      {finalLabel}
    </a>
  );
}

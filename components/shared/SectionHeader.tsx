interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean; // for dark backgrounds
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const textAlign = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const eyebrowColor = light ? 'text-pool-azure' : 'text-pool-azure';
  const titleColor = light ? 'text-white' : 'text-pool-deep';
  const subtitleColor = light ? 'text-white/70' : 'text-slate-600';

  return (
    <div className={`max-w-2xl mb-10 md:mb-14 ${textAlign}`}>
      {eyebrow && (
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-display font-800 text-3xl md:text-4xl lg:text-5xl leading-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

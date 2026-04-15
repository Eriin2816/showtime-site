import Link from 'next/link';

interface Crumb { label: string; href?: string }

export function BreadcrumbNav({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-slate-500 mb-6 flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-slate-300">/</span>}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-pool-azure transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-pool-deep font-semibold" aria-current="page">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

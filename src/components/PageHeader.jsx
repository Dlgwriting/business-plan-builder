export default function PageHeader({ icon: Icon, eyebrow, title, subtitle, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="flex items-start gap-4">
        {Icon && (
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-700 text-white shadow-md shadow-brand-700/20">
            <Icon className="h-6 w-6" />
          </span>
        )}
        <div>
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">{eyebrow}</p>}
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1.5 max-w-2xl text-slate-600">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

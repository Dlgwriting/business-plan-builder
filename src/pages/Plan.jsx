import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, CircleDot, ExternalLink, HelpCircle, Lightbulb, ChevronDown, FileText, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlan } from '../context/PlanContext';
import { SECTIONS, sectionById } from '../data/sections';
import { planProgress, sectionProgress } from '../lib/progress';
import { SECTION_ICON_COMPONENTS } from '../components/icons';
import { Field } from '../components/fields';
import SectionLesson from '../components/SectionLesson';

function StatusIcon({ status, className = 'h-4 w-4' }) {
  if (status === 'complete') return <CheckCircle2 className={`${className} text-emerald-600`} />;
  if (status === 'inProgress') return <CircleDot className={`${className} text-gold-500`} />;
  return <Circle className={`${className} text-slate-300`} />;
}

function HelpPanel({ section }) {
  const { t, tv } = useLanguage();
  const base = `plan.sections.${section.id}`;
  const guiding = tv(`${base}.guiding`) || [];
  const example = tv(`${base}.example`);
  return (
    <div className="space-y-5">
      <div className="card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-brand-50 px-5 py-3 text-sm font-bold text-brand-900">
          <HelpCircle className="h-4 w-4" /> {t('plan.guidingTitle')}
        </div>
        <ul className="space-y-2.5 p-5 text-sm leading-relaxed text-slate-700">
          {Array.isArray(guiding) &&
            guiding.map((g, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                {g}
              </li>
            ))}
        </ul>
      </div>
      {typeof example === 'string' && (
        <div className="card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-slate-100 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-900">
            <Lightbulb className="h-4 w-4" /> {t('plan.exampleTitle')}
          </div>
          <p className="p-5 text-sm italic leading-relaxed text-slate-700">{example}</p>
        </div>
      )}
    </div>
  );
}

function ResearchPanel({ links, collapsible = false }) {
  const { t } = useLanguage();
  if (!links?.length) return null;

  const title = (
    <span className="flex items-center gap-2.5">
      <Search className="h-5 w-5 shrink-0" aria-hidden="true" />
      {t('plan.linksTitle')}
    </span>
  );
  const list = (
    <div className="p-4">
      <p className="mb-3 text-sm leading-relaxed text-brand-900">{t('plan.linksNote')}</p>
      <ul className="space-y-2">
        {links.map(({ id, url, region }) => (
          <li key={id}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="focus-ring block rounded-xl border border-brand-100 bg-white px-3.5 py-2.5 transition hover:border-brand-500 hover:bg-brand-50">
              <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold text-brand-800">
                <span className="min-w-0 wrap-break-word">{new URL(url).hostname.replace(/^www\./, '')}</span>
                {region && <span className="rounded-md bg-brand-50 px-1.5 py-0.5 text-xs font-semibold text-brand-800">{t(`plan.region${region}`)}</span>}
                <ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </span>
              <span className="mt-1 block text-sm leading-snug text-slate-700">{t(`plan.links.${id}`)}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
  const panel = 'rounded-2xl border border-brand-100 bg-accent-100/60';

  if (collapsible) {
    return (
      <details className={`group/research ${panel}`}>
        <summary className="focus-ring flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-2xl px-4 py-2.5 text-base font-bold text-brand-900 hover:bg-accent-100 [&::-webkit-details-marker]:hidden">
          {title}
          <ChevronDown className="h-4 w-4 shrink-0 group-open/research:rotate-180" aria-hidden="true" />
        </summary>
        {list}
      </details>
    );
  }

  return (
    <section className={panel}>
      <h2 className="rounded-t-2xl bg-brand-800 px-4 py-3.5 text-base font-bold text-white">{title}</h2>
      {list}
    </section>
  );
}

export default function Plan() {
  const { sectionId } = useParams();
  const { t } = useLanguage();
  const { state } = usePlan();
  const navigate = useNavigate();

  if (!state.planStarted) return <Navigate to={state.quizDone ? '/results' : '/team'} replace />;
  const section = sectionById(sectionId);
  if (!section) return <Navigate to="/plan/team" replace />;

  const index = SECTIONS.indexOf(section);
  const progress = planProgress(state.plan);
  const mine = sectionProgress(section, state.plan);
  const Icon = SECTION_ICON_COMPONENTS[section.icon];
  const prev = SECTIONS[index - 1];
  const next = SECTIONS[index + 1];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_320px]">
        {/* Section list */}
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-bold text-slate-900">{t('plan.sectionsTitle')}</span>
              <span className="font-semibold text-brand-700">{progress.percent}%</span>
            </div>
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500 transition-all" style={{ width: `${progress.percent}%` }} />
            </div>
            <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
              {progress.per.map(({ section: s, status }, i) => (
                <Link key={s.id} to={`/plan/${s.id}`} className={`flex shrink-0 items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition focus-ring ${s.id === section.id ? 'bg-brand-700 font-semibold text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
                  {s.id === section.id ? <span className="grid h-4 w-4 place-items-center text-[11px] font-bold">{i + 1}</span> : <StatusIcon status={status} />}
                  <span className="whitespace-nowrap lg:whitespace-normal">{t(`plan.sections.${s.id}.title`)}</span>
                </Link>
              ))}
              <Link to="/review" className="mt-1 flex shrink-0 items-center gap-2.5 rounded-lg border-t border-slate-100 px-2.5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50 focus-ring">
                <FileText className="h-4 w-4" /> {t('plan.toReview')}
              </Link>
            </nav>
          </div>
        </aside>

        {/* Form */}
        <motion.section key={section.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="min-w-0">
          <div className="card p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-700 text-white shadow-md shadow-brand-700/20">
                <Icon className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-600">{t('plan.sectionOf', { n: index + 1, total: SECTIONS.length })}</p>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{t(`plan.sections.${section.id}.title`)}</h1>
                <p className="mt-1 text-slate-600">{t(`plan.sections.${section.id}.intro`)}</p>
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 sm:flex">
                <StatusIcon status={mine.status} className="h-3.5 w-3.5" />
                {mine.done}/{mine.total}
              </span>
            </div>

            <SectionLesson sectionId={section.id} />

            <div className="mt-4 space-y-2 xl:hidden">
              <ResearchPanel links={section.links} collapsible />
              <details className="group/help">
                <summary className="btn-secondary btn w-full cursor-pointer list-none justify-between [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-brand-600" aria-hidden="true" /> {t('plan.helpTitle')}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 group-open/help:rotate-180" aria-hidden="true" />
                </summary>
                <div className="mt-3"><HelpPanel section={section} /></div>
              </details>
            </div>

            <div className="mt-8 space-y-8">
              {section.fields.map((f) => (
                <Field key={f.name} section={section} field={f} />
              ))}
            </div>

            {mine.status === 'complete' && (
              <p className="mt-8 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                <CheckCircle2 className="h-4 w-4" /> {t('plan.sectionDone')}
              </p>
            )}
          </div>

          <div className="mt-5 flex justify-between gap-3">
            <button type="button" onClick={() => navigate(prev ? `/plan/${prev.id}` : '/results')} className="btn-secondary btn">
              <ArrowLeft className="h-4 w-4" /> {prev ? t(`plan.sections.${prev.id}.title`) : t('nav.results')}
            </button>
            <button type="button" onClick={() => navigate(next ? `/plan/${next.id}` : '/review')} className="btn-primary btn">
              {next ? t(`plan.sections.${next.id}.title`) : t('plan.toReview')} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.section>

        {/* Help on wide screens */}
        <aside className="hidden space-y-5 xl:sticky xl:top-24 xl:block xl:max-h-[calc(100vh-7rem)] xl:self-start xl:overflow-y-auto xl:p-0.5">
          <ResearchPanel links={section.links} />
          <HelpPanel section={section} />
        </aside>
      </div>
    </div>
  );
}

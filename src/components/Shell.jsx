import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Globe, RotateCcw, CloudOff, Check, Rocket } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlan } from '../context/PlanContext';
import { LANGUAGES } from '../i18n';
import { CURRENCIES } from '../lib/finance';

function Wordmark() {
  const { t } = useLanguage();
  return (
    <Link to="/" className="flex items-center gap-3 rounded-lg focus-ring">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
        <Rocket className="h-5 w-5 text-accent-500" aria-hidden="true" />
      </span>
      <span className="text-base leading-tight font-bold text-white">{t('brand.product')}</span>
    </Link>
  );
}

export default function Shell({ children }) {
  const { t, language, setLanguage } = useLanguage();
  const { state, update, reset, saveStatus } = usePlan();
  const navigate = useNavigate();

  const steps = [
    { to: '/team', label: t('nav.team'), enabled: true },
    { to: '/quiz', label: t('nav.quiz'), enabled: state.members.filter((m) => m.name.trim()).length >= 2 },
    { to: '/results', label: t('nav.results'), enabled: state.quizDone },
    { to: '/plan', label: t('nav.plan'), enabled: state.planStarted },
    { to: '/review', label: t('nav.review'), enabled: state.planStarted },
  ];

  const startOver = () => {
    if (window.confirm(t('nav.startOver') + '\n\n' + t('nav.startOverConfirm'))) {
      reset();
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-brand-900 text-white shadow-lg shadow-brand-950/20 print:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
          <Wordmark />
          <nav className="order-3 -mx-1 flex w-full gap-1 overflow-x-auto lg:order-none lg:w-auto lg:flex-1" aria-label="Progress">
            {steps.map((s, i) =>
              s.enabled ? (
                <NavLink key={s.to} to={s.to} className={({ isActive }) => `whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition focus-ring ${isActive ? 'bg-white text-brand-900' : 'text-brand-100 hover:bg-white/10'}`}>
                  <span className="mr-1.5 opacity-60">{i + 1}</span>
                  {s.label}
                </NavLink>
              ) : (
                <span key={s.to} className="whitespace-nowrap px-3 py-1.5 text-sm font-medium text-brand-100/35">
                  <span className="mr-1.5">{i + 1}</span>
                  {s.label}
                </span>
              ),
            )}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <label className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-sm ring-1 ring-white/15">
              <Globe className="h-4 w-4 text-brand-100" aria-hidden="true" />
              <span className="sr-only">{t('nav.language')}</span>
              <select value={language} onChange={(e) => setLanguage(e.target.value)} className="cursor-pointer bg-transparent font-medium text-white outline-none [&>option]:text-slate-900">
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>{l.label}</option>
                ))}
              </select>
            </label>
            <label className="flex items-center rounded-lg bg-white/10 px-2.5 py-1.5 text-sm ring-1 ring-white/15">
              <span className="sr-only">{t('nav.currency')}</span>
              <select value={state.currency} onChange={(e) => update((s) => ({ ...s, currency: e.target.value }))} className="cursor-pointer bg-transparent font-medium text-white outline-none [&>option]:text-slate-900">
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm text-slate-500 sm:px-6">
          <span className="flex items-center gap-2">
            {saveStatus === 'saved' ? <Check className="h-4 w-4 text-emerald-600" /> : <CloudOff className="h-4 w-4 text-amber-600" />}
            {saveStatus === 'saved' ? t('nav.saved') : t('nav.notSaved')}
          </span>
          <span className="hidden md:inline">{t('footer.note')}</span>
          <button type="button" onClick={startOver} className="btn-ghost btn px-3 py-1.5 text-sm">
            <RotateCcw className="h-4 w-4" /> {t('nav.startOver')}
          </button>
        </div>
      </footer>
    </div>
  );
}

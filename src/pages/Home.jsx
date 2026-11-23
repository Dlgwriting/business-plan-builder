import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles, Trophy, FileText, Download, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlan } from '../context/PlanContext';

const STEP_ICONS = { team: Users, quiz: Sparkles, results: Trophy, plan: FileText, review: Download };

export default function Home() {
  const { t } = useLanguage();
  const { state, reset } = usePlan();
  const navigate = useNavigate();
  const hasProgress = state.members.some((m) => m.name.trim()) || state.planStarted;
  const resumeTo = state.planStarted ? '/plan' : state.quizDone ? '/results' : state.members.filter((m) => m.name.trim()).length >= 2 ? '/quiz' : '/team';

  const startNew = () => {
    if (hasProgress && !window.confirm(t('nav.startOverConfirm'))) return;
    if (hasProgress) reset();
    navigate('/team');
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent-500/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent-100 ring-1 ring-white/20">
              {t('home.eyebrow')}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">{t('home.title')}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100">{t('home.subtitle')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {hasProgress && (
                <Link to={resumeTo} className="btn bg-white px-6 py-3.5 text-base text-brand-900 shadow-lg hover:bg-brand-50">
                  {t('home.resume')} <ArrowRight className="h-5 w-5" />
                </Link>
              )}
              <button type="button" onClick={startNew} className={`btn px-6 py-3.5 text-base ${hasProgress ? 'bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20' : 'bg-white text-brand-900 shadow-lg hover:bg-brand-50'}`}>
                {t('home.start')} {!hasProgress && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>
            <p className="mt-6 flex items-start gap-2 text-sm text-brand-100/80">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" /> {t('home.privacy')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-brand-700">{t('home.stepsTitle')}</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Object.keys(STEP_ICONS).map((key, i) => {
            const Icon = STEP_ICONS[key];
            return (
              <motion.li key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.06 }} className="card relative p-5">
                <span className="absolute right-4 top-4 text-3xl font-black text-slate-100">{i + 1}</span>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{t(`home.steps.${key}.title`)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{t(`home.steps.${key}.desc`)}</p>
              </motion.li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Check, Crown, RotateCcw, ArrowRight, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlan, emptyPlan } from '../context/PlanContext';
import { rankIdeas } from '../lib/scoring';
import { ROLES } from '../data/quiz';
import PageHeader from '../components/PageHeader';

export default function Results() {
  const { t } = useLanguage();
  const { state, update } = usePlan();
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const ranked = useMemo(() => rankIdeas(state.groupAnswers), [state.groupAnswers]);
  const members = state.members.filter((m) => m.name.trim());

  if (!state.quizDone) return <Navigate to="/quiz" replace />;

  const visible = showAll ? ranked.slice(0, 9) : ranked.slice(0, 3);
  const roles = state.roles;
  const unfilled = ROLES.filter((r) => !roles.includes(r));
  const hasDuplicate = roles.length !== new Set(roles).size;
  const hasCeo = roles.includes('ceo');
  const ideaReady = state.chosenIdea && (state.chosenIdea !== 'custom' || state.customIdea.trim());

  const choose = (id) => update((s) => ({ ...s, chosenIdea: id }));
  const setRole = (i, role) => update((s) => ({ ...s, roles: s.roles.map((r, j) => (j === i ? role : r)) }));

  const reasonText = (reasons) => reasons.map((c) => t(`cats.${c}`)).join(` ${t('results.and')} `);

  const start = () => {
    update((s) => {
      const ms = s.members.filter((m) => m.name.trim());
      const prev = s.planStarted ? s.plan : emptyPlan();
      // Team rows: keep anything already written for the same person, refresh name and role from the results.
      const team = ms.map((m, i) => {
        const old = prev.team.find((r) => r.memberId === m.id) || {};
        return {
          memberId: m.id,
          name: m.name,
          role: s.roles[i] || '',
          skills: old.skills ?? (typeof m.answers.skills === 'string' ? m.answers.skills : ''),
          responsibilities: old.responsibilities ?? t(`roles.${s.roles[i]}.duties`),
        };
      });
      const starter = s.chosenIdea === 'custom' ? s.customIdea.trim() : t(`ideas.${s.chosenIdea}.starter`);
      return {
        ...s,
        planStarted: true,
        plan: { ...prev, team, description: prev.description?.trim() ? prev.description : starter },
      };
    });
    navigate('/plan/team');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <PageHeader icon={Trophy} title={t('results.title')} subtitle={t('results.subtitle')}>
        <button type="button" className="btn-ghost btn" onClick={() => navigate('/quiz')}>
          <RotateCcw className="h-4 w-4" /> {t('results.retake')}
        </button>
      </PageHeader>

      <section>
        <h2 className="mb-4 text-lg font-bold text-slate-900">{t('results.ideasTitle')}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {visible.map(({ idea, match, reasons }, i) => {
            const selected = state.chosenIdea === idea.id;
            return (
              <motion.button
                key={idea.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => choose(idea.id)}
                aria-pressed={selected}
                className={`card relative flex flex-col p-5 text-left transition focus-ring ${selected ? 'border-brand-600 ring-4 ring-brand-100' : 'hover:border-brand-300 hover:shadow-md'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${i === 0 && !showAll ? 'bg-gold-500 text-white' : 'bg-brand-50 text-brand-700'}`}>{t('results.match', { n: match })}</span>
                  {selected && (
                    <span className="flex items-center gap-1 text-xs font-bold text-brand-700">
                      <Check className="h-4 w-4" /> {t('results.chosen')}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-900">{t(`ideas.${idea.id}.name`)}</h3>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">{t(`ideas.${idea.id}.desc`)}</p>
                {reasons.length > 0 && <p className="mt-3 text-xs font-medium text-brand-700">{t('results.because', { cats: reasonText(reasons) })}</p>}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500" style={{ width: `${match}%` }} />
                </div>
              </motion.button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
          <button type="button" className="btn-ghost btn" onClick={() => setShowAll((v) => !v)}>
            {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showAll ? t('results.showLess') : t('results.showMore')}
          </button>
          <div className={`card flex-1 p-4 transition ${state.chosenIdea === 'custom' ? 'border-brand-600 ring-4 ring-brand-100' : ''}`}>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-800">
              <input type="radio" name="idea" checked={state.chosenIdea === 'custom'} onChange={() => choose('custom')} className="h-4 w-4 accent-brand-700" />
              <Lightbulb className="h-4 w-4 text-gold-500" /> {t('results.own')}
            </label>
            {state.chosenIdea === 'custom' && (
              <textarea className="input mt-3 min-h-20" maxLength={400} value={state.customIdea} placeholder={t('results.ownPlaceholder')} onChange={(e) => update((s) => ({ ...s, customIdea: e.target.value }))} autoFocus />
            )}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-slate-900">{t('results.rolesTitle')}</h2>
        <p className="mb-4 text-sm text-slate-600">{t('results.rolesSubtitle')}</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <div key={m.id} className="card p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-lg font-black text-white">{m.name[0]?.toUpperCase()}</span>
                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">{m.name}</p>
                  <p className="flex items-center gap-1 text-sm font-semibold text-brand-700">
                    {roles[i] === 'ceo' && <Crown className="h-4 w-4 text-gold-500" />}
                    {roles[i] ? t(`roles.${roles[i]}.name`) : '—'}
                  </p>
                </div>
              </div>
              {roles[i] && <p className="mt-3 text-sm leading-relaxed text-slate-600">{t(`roles.${roles[i]}.desc`)}</p>}
              <select className="input mt-4 py-2 text-sm" value={roles[i] || ''} onChange={(e) => setRole(i, e.target.value)} aria-label={`${m.name} – ${t('plan.columns.role')}`}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{t(`roles.${r}.name`)}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {!hasCeo && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{t('results.noCeo')}</p>}
          {hasDuplicate && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">{t('results.duplicateRole')}</p>}
          {unfilled.length > 0 && (
            <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-900">
              {t('results.unfilled')} <strong>{unfilled.map((r) => t(`roles.${r}.short`)).join(', ')}</strong>
            </p>
          )}
        </div>
      </section>

      <div className="mt-10 flex flex-col items-end gap-2 border-t border-slate-200 pt-6">
        <button type="button" disabled={!ideaReady || !hasCeo} onClick={start} className="btn-primary btn px-7 py-3 text-base">
          {state.planStarted ? t('results.continuePlan') : t('results.startPlan')} <ArrowRight className="h-5 w-5" />
        </button>
        {!ideaReady && <p className="text-sm text-slate-500">{t('results.pickIdea')}</p>}
      </div>
    </div>
  );
}

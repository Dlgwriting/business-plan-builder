import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowRight, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlan, newId } from '../context/PlanContext';
import { MAX_MEMBERS, MIN_MEMBERS } from '../data/quiz';
import PageHeader from '../components/PageHeader';

export default function Team() {
  const { t } = useLanguage();
  const { state, update } = usePlan();
  const navigate = useNavigate();
  const named = state.members.filter((m) => m.name.trim());
  const names = named.map((m) => m.name.trim().toLowerCase());
  const duplicate = names.length !== new Set(names).size;
  const canContinue = named.length >= MIN_MEMBERS && !duplicate;

  const setMember = (id, name) => update((s) => ({ ...s, members: s.members.map((m) => (m.id === id ? { ...m, name: name.slice(0, 30) } : m)) }));
  const addMember = () => update((s) => ({ ...s, members: [...s.members, { id: newId(), name: '', answers: {} }] }));
  const removeMember = (id) => update((s) => ({ ...s, members: s.members.filter((m) => m.id !== id) }));

  const next = () => {
    // Drop blank rows, then go to the quiz. Results are recalculated if the team changed.
    update((s) => {
      const members = s.members.filter((m) => m.name.trim()).map((m) => ({ ...m, name: m.name.trim() }));
      const quizStillValid = s.quizDone && members.every((m) => Object.keys(m.answers).length > 0) && members.length === s.roles.length;
      return { ...s, members, quizDone: quizStillValid, roles: quizStillValid ? s.roles : [] };
    });
    navigate('/quiz');
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <PageHeader icon={Users} title={t('team.title')} subtitle={t('team.subtitle')} />
      <div className="card space-y-5 p-6 sm:p-8">
        <div>
          <label htmlFor="teamName" className="mb-1.5 block text-sm font-semibold text-slate-700">{t('team.teamName')}</label>
          <input id="teamName" className="input" value={state.teamName} maxLength={40} placeholder={t('team.teamNamePlaceholder')} onChange={(e) => update((s) => ({ ...s, teamName: e.target.value }))} />
        </div>
        <div className="space-y-3">
          {state.members.map((m, i) => (
            <div key={m.id}>
              <label htmlFor={`m-${m.id}`} className="mb-1.5 block text-sm font-semibold text-slate-700">{t('team.member', { n: i + 1 })}</label>
              <div className="flex gap-2">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">{m.name.trim() ? m.name.trim()[0].toUpperCase() : i + 1}</span>
                <input id={`m-${m.id}`} className="input" value={m.name} maxLength={30} placeholder={t('team.memberPlaceholder')} onChange={(e) => setMember(m.id, e.target.value)} autoComplete="off" />
                {state.members.length > MIN_MEMBERS && (
                  <button type="button" onClick={() => removeMember(m.id)} className="btn-ghost btn px-3" aria-label={t('team.remove')}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        {state.members.length < MAX_MEMBERS && (
          <button type="button" onClick={addMember} className="btn-secondary btn w-full border-dashed">
            <Plus className="h-4 w-4" /> {t('team.add')}
          </button>
        )}
        {duplicate && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">{t('team.duplicate')}</p>}
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <p className="text-sm text-slate-500">{named.length < MIN_MEMBERS ? t('team.needMore') : ''}</p>
          <button type="button" onClick={next} disabled={!canContinue} className="btn-primary btn">
            {t('team.startQuiz')} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

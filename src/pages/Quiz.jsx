import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users, User, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlan } from '../context/PlanContext';
import { GROUP_QUESTIONS, PERSONAL_QUESTIONS } from '../data/quiz';
import { assignRoles } from '../lib/scoring';

/** Builds the full list of quiz screens: group intro, group questions, then per member a hand-over screen and their questions. */
function buildScreens(members) {
  const screens = [{ kind: 'intro' }];
  for (const q of GROUP_QUESTIONS) screens.push({ kind: 'group', q });
  for (const m of members) {
    screens.push({ kind: 'handover', member: m });
    for (const q of PERSONAL_QUESTIONS) screens.push({ kind: 'personal', q, member: m });
  }
  return screens;
}

const answered = (screen, state) => {
  if (screen.kind === 'group') return state.groupAnswers[screen.q.id] !== undefined;
  if (screen.kind === 'personal') {
    const a = state.members.find((m) => m.id === screen.member.id)?.answers[screen.q.id];
    return screen.q.kind === 'text' ? a !== undefined : a !== undefined && a !== '';
  }
  return false;
};

export default function Quiz() {
  const { t } = useLanguage();
  const { state, update } = usePlan();
  const navigate = useNavigate();
  const members = state.members.filter((m) => m.name.trim());
  const screens = useMemo(() => buildScreens(members), [members]);

  // Resume at the first unanswered question (or the screen just before it).
  const [index, setIndex] = useState(() => {
    if (state.quizDone) return 0;
    const first = screens.findIndex((s, i) => (s.kind === 'group' || s.kind === 'personal') && !answered(s, state) && i > 0);
    if (first <= 1) return 0;
    return screens[first - 1].kind === 'handover' ? first - 1 : first;
  });
  const advanceTimer = useRef(null);
  // Always reads the latest saved answers, even from inside a delayed auto-advance.
  const answeredNow = useRef(null);
  useLayoutEffect(() => {
    answeredNow.current = (s) => answered(s, state);
  });

  if (members.length < 2) return <Navigate to="/team" replace />;

  const screen = screens[Math.min(index, screens.length - 1)];
  const questionScreens = screens.filter((s) => s.kind === 'group' || s.kind === 'personal');
  const qNumber = questionScreens.indexOf(screen) + 1;
  const isLast = index === screens.length - 1;

  const finish = () => {
    update((s) => {
      const ms = s.members.filter((m) => m.name.trim());
      const { assignments } = assignRoles(ms);
      return { ...s, quizDone: true, roles: assignments };
    });
    navigate('/results');
  };

  // Moves to an explicit screen (not "current + 1") so a double tap can never skip a question.
  const goFrom = (from) => {
    clearTimeout(advanceTimer.current);
    if (from < screens.length - 1) {
      setIndex(from + 1);
      return;
    }
    // On the last screen: only finish when every question has an answer, otherwise jump to the gap.
    const gap = screens.findIndex((s) => (s.kind === 'group' || (s.kind === 'personal' && s.q.kind !== 'text')) && !answeredNow.current(s));
    if (gap === -1) finish();
    else setIndex(gap);
  };
  const goNext = () => goFrom(index);
  const goBack = () => {
    clearTimeout(advanceTimer.current);
    if (index === 0) navigate('/team');
    else setIndex(index - 1);
  };

  const setAnswer = (value, autoAdvance) => {
    if (screen.kind === 'group') update((s) => ({ ...s, groupAnswers: { ...s.groupAnswers, [screen.q.id]: value } }));
    else update((s) => ({ ...s, members: s.members.map((m) => (m.id === screen.member.id ? { ...m, answers: { ...m.answers, [screen.q.id]: value } } : m)) }));
    if (autoAdvance) {
      const from = index;
      clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => goFrom(from), 280);
    }
  };

  const current = screen.kind === 'group' ? state.groupAnswers[screen.q?.id] : screen.kind === 'personal' ? state.members.find((m) => m.id === screen.member.id)?.answers[screen.q.id] : undefined;
  const base = screen.kind === 'group' ? `quiz.group.${screen.q.id}` : screen.kind === 'personal' ? `quiz.personal.${screen.q.id}` : '';

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm font-medium text-slate-500">
          <span>{qNumber > 0 ? t('quiz.questionOf', { n: qNumber, total: questionScreens.length }) : ' '}</span>
          <span>{Math.round((index / (screens.length - 1)) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500" animate={{ width: `${(index / (screens.length - 1)) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="card p-6 sm:p-10">
          {screen.kind === 'intro' && (
            <Interstitial icon={Users} title={t('quiz.groupIntro.title')} desc={t('quiz.groupIntro.desc')} cta={t('quiz.groupIntro.start')} onGo={goNext} />
          )}
          {screen.kind === 'handover' && (
            <Interstitial
              icon={User}
              title={t('quiz.passTo.title', { name: screen.member.name })}
              desc={t('quiz.passTo.desc', { name: screen.member.name })}
              cta={t('quiz.passTo.start', { name: screen.member.name })}
              onGo={goNext}
              avatar={screen.member.name[0]?.toUpperCase()}
            />
          )}
          {(screen.kind === 'group' || screen.kind === 'personal') && (
            <div>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${screen.kind === 'group' ? 'bg-accent-100 text-brand-800' : 'bg-gold-500/15 text-amber-800'}`}>
                {screen.kind === 'group' ? <Users className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                {screen.kind === 'group' ? t('quiz.together') : t('quiz.personalBadge', { name: screen.member.name })}
              </span>
              <h2 className="mt-4 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{t(`${base}.q`)}</h2>

              {(screen.kind === 'group' || screen.q.kind === 'choice') && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {screen.q.options.map((o) => {
                    const selected = current === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setAnswer(o.id, true)}
                        aria-pressed={selected}
                        className={`flex items-center justify-between gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-[15px] font-medium transition focus-ring ${selected ? 'border-brand-600 bg-brand-50 text-brand-900' : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-slate-50'}`}
                      >
                        {t(`${base}.options.${o.id}`)}
                        {selected && <Check className="h-5 w-5 shrink-0 text-brand-600" />}
                      </button>
                    );
                  })}
                </div>
              )}

              {screen.kind === 'personal' && screen.q.kind === 'scale' && (
                <div className="mt-8">
                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setAnswer(n, true)} aria-pressed={current === n} className={`aspect-square rounded-2xl border-2 text-xl font-bold transition focus-ring sm:text-2xl ${current === n ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-brand-300'}`}>
                        {n}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-slate-500">
                    <span>{t('quiz.scaleLow')}</span>
                    <span>{t('quiz.scaleHigh')}</span>
                  </div>
                </div>
              )}

              {screen.kind === 'personal' && screen.q.kind === 'text' && (
                <div className="mt-6">
                  <textarea className="input min-h-28" maxLength={300} value={current || ''} placeholder={t('quiz.textPlaceholder')} onChange={(e) => setAnswer(e.target.value, false)} />
                  <p className="mt-2 text-sm text-slate-500">{t('quiz.optionalHint')}</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex justify-between">
        <button type="button" onClick={goBack} className="btn-ghost btn">
          <ArrowLeft className="h-4 w-4" /> {t('nav.back')}
        </button>
        {(screen.kind === 'group' || screen.kind === 'personal') && (
          <button type="button" onClick={goNext} disabled={screen.q.kind !== 'text' && current === undefined} className="btn-primary btn">
            {isLast ? t('quiz.seeResults') : screen.q.kind === 'text' && !current ? t('nav.skip') : t('nav.next')} <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Interstitial({ icon: Icon, title, desc, cta, onGo, avatar }) {
  return (
    <div className="py-6 text-center">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 text-3xl font-black text-white shadow-lg shadow-brand-600/30">
        {avatar || <Icon className="h-9 w-9" />}
      </span>
      <h2 className="mt-6 text-2xl font-extrabold text-slate-900 sm:text-3xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-slate-600">{desc}</p>
      <button type="button" onClick={onGo} className="btn-primary btn mt-8 px-7 py-3 text-base">
        {cta} <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

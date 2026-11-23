import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { storage } from '../lib/storage';
import { SECTIONS } from '../data/sections';

const PlanContext = createContext(null);
const KEY = 'nae-bizplan:v1';

let idCounter = 0;
export const newId = () => `${Date.now().toString(36)}${(idCounter++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

const emptyRow = (columns) => Object.fromEntries(columns.map((c) => [c.name, '']));

/** Blank plan with every table pre-sized to its minimum number of rows. */
export function emptyPlan() {
  const plan = { brandColor: '#0b2447', brandIcon: 'briefcase', strategies: [], funding: [], team: [], finance: { fixedCosts: '', unitsPerMonth: '', growth: '10', avgPrice: '', avgUnitCost: '' } };
  for (const s of SECTIONS) {
    for (const f of s.fields) {
      if (f.kind === 'table') plan[f.name] = Array.from({ length: f.minRows }, () => emptyRow(f.columns));
      else if (!(f.name in plan) && ['text', 'textarea', 'select', 'money'].includes(f.kind)) plan[f.name] = '';
    }
  }
  return plan;
}

export function initialState() {
  return {
    version: 1,
    teamName: '',
    members: [
      { id: newId(), name: '', answers: {} },
      { id: newId(), name: '', answers: {} },
      { id: newId(), name: '', answers: {} },
    ],
    groupAnswers: {},
    quizDone: false,
    chosenIdea: null,
    customIdea: '',
    roles: [],
    planStarted: false,
    currency: 'MYR',
    plan: emptyPlan(),
  };
}

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

/**
 * Loads saved progress. The saved value is only ever data this app wrote, but it is still checked:
 * anything that is not the expected shape is dropped and replaced by defaults.
 */
function load() {
  const raw = storage.get(KEY);
  if (!raw) return initialState();
  try {
    const saved = JSON.parse(raw);
    if (!isObj(saved) || saved.version !== 1) return initialState();
    const base = initialState();
    const members = Array.isArray(saved.members)
      ? saved.members.filter(isObj).slice(0, 5).map((m) => ({ id: typeof m.id === 'string' ? m.id : newId(), name: typeof m.name === 'string' ? m.name : '', answers: isObj(m.answers) ? m.answers : {} }))
      : base.members;
    return {
      ...base,
      teamName: typeof saved.teamName === 'string' ? saved.teamName : '',
      members: members.length ? members : base.members,
      groupAnswers: isObj(saved.groupAnswers) ? saved.groupAnswers : {},
      quizDone: saved.quizDone === true,
      chosenIdea: typeof saved.chosenIdea === 'string' ? saved.chosenIdea : null,
      customIdea: typeof saved.customIdea === 'string' ? saved.customIdea : '',
      roles: Array.isArray(saved.roles) ? saved.roles.filter((r) => typeof r === 'string') : [],
      planStarted: saved.planStarted === true,
      currency: typeof saved.currency === 'string' ? saved.currency : 'MYR',
      plan: isObj(saved.plan) ? { ...base.plan, ...saved.plan, finance: { ...base.plan.finance, ...(isObj(saved.plan.finance) ? saved.plan.finance : {}) } } : base.plan,
    };
  } catch {
    return initialState();
  }
}

export function PlanProvider({ children }) {
  const [state, setState] = useState(load);
  const [saveStatus, setSaveStatus] = useState('saved');
  const timer = useRef(null);

  // Debounced autosave so typing stays smooth.
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSaveStatus(storage.set(KEY, JSON.stringify(state)) ? 'saved' : 'unsaved');
    }, 400);
    return () => clearTimeout(timer.current);
  }, [state]);

  const update = useCallback((fn) => setState((s) => fn(s)), []);
  const setPlanField = useCallback((name, value) => setState((s) => ({ ...s, plan: { ...s.plan, [name]: value } })), []);
  const reset = useCallback(() => {
    storage.remove(KEY);
    setState(initialState());
  }, []);

  const value = useMemo(() => ({ state, update, setPlanField, reset, saveStatus }), [state, update, setPlanField, reset, saveStatus]);
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePlan = () => useContext(PlanContext);

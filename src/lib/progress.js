import { SECTIONS } from '../data/sections';
import { financeModel } from './finance';

// Columns a row can leave blank and still count as filled in.
const OPTIONAL_COLUMNS = new Set(['source', 'description']);

const filled = (v) => typeof v === 'string' ? v.trim() !== '' : v !== null && v !== undefined;

export function rowComplete(row, columns) {
  return columns.every((c) => c.kind === 'computed' || OPTIONAL_COLUMNS.has(c.name) || filled(row[c.name]));
}

/** True when one required field has enough in it to count as done. */
export function fieldComplete(field, plan) {
  const v = plan[field.name];
  switch (field.kind) {
    case 'chips':
      return Array.isArray(v) && v.length >= (field.min || 1);
    case 'table':
      return Array.isArray(v) && v.filter((r) => rowComplete(r, field.columns)).length >= field.minRows;
    case 'team':
      return Array.isArray(plan.team) && plan.team.length > 0 && plan.team.every((m) => filled(m.name) && filled(m.role) && filled(m.responsibilities));
    case 'finance': {
      const m = financeModel(plan);
      return m.ready && m.contribution !== undefined;
    }
    case 'color':
    case 'icon':
      return true;
    default:
      return filled(v);
  }
}

/** Progress for one section: required fields done / total, and a status. */
export function sectionProgress(section, plan) {
  const required = section.fields.filter((f) => f.required);
  const done = required.filter((f) => fieldComplete(f, plan));
  const missing = required.filter((f) => !fieldComplete(f, plan)).map((f) => f.name);
  const status = done.length === required.length ? 'complete' : done.length > 0 ? 'inProgress' : 'notStarted';
  return { done: done.length, total: required.length, missing, status };
}

export function planProgress(plan) {
  const per = SECTIONS.map((s) => ({ section: s, ...sectionProgress(s, plan) }));
  const done = per.reduce((a, p) => a + p.done, 0);
  const total = per.reduce((a, p) => a + p.total, 0);
  return { per, done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

import { CATEGORIES, GROUP_QUESTIONS, PERSONAL_QUESTIONS, ROLES } from '../data/quiz';
import { IDEAS } from '../data/ideas';

const optionFor = (question, answerId) => question.options?.find((o) => o.id === answerId);

/** Totals interest-category points and collects style preferences from the group answers. */
export function groupProfile(groupAnswers = {}) {
  const cats = Object.fromEntries(CATEGORIES.map((c) => [c, 0]));
  const style = {};
  for (const q of GROUP_QUESTIONS) {
    const opt = optionFor(q, groupAnswers[q.id]);
    if (!opt) continue;
    for (const [c, pts] of Object.entries(opt.cats || {})) cats[c] += pts;
    Object.assign(style, opt.style || {});
  }
  return { cats, style };
}

/**
 * Ranks every idea against the group profile.
 * Interest fit is the main driver; style mismatches (type, where, time, budget) subtract points.
 * Returns ideas sorted best first, each with a 0–100 match and the categories that drove it.
 */
export function rankIdeas(groupAnswers) {
  const { cats, style } = groupProfile(groupAnswers);
  const maxCat = Math.max(1, ...Object.values(cats));

  const scored = IDEAS.map((idea) => {
    let fit = 0;
    let fitMax = 0;
    for (const [c, w] of Object.entries(idea.cats)) {
      fit += w * (cats[c] / maxCat);
      fitMax += w;
    }
    let score = fitMax ? fit / fitMax : 0; // 0–1 interest fit
    // Ideas spread across several strong categories get a small boost.
    score = score * 0.85 + Math.min(fit / 6, 1) * 0.15;

    if (style.type && style.type !== idea.type) score -= 0.15;
    if (style.type === 'product' && style.handmade !== undefined && idea.handmade !== undefined && style.handmade !== idea.handmade) score -= 0.05;
    if (style.mode && style.mode !== 'both' && idea.mode !== 'both' && style.mode !== idea.mode) score -= 0.1;
    if (style.effort && idea.effort > style.effort) score -= 0.08 * (idea.effort - style.effort);
    if (style.cost && idea.cost > style.cost) score -= 0.08 * (idea.cost - style.cost);

    const reasons = Object.entries(idea.cats)
      .filter(([c]) => cats[c] > 0)
      .sort((a, b) => cats[b[0]] * b[1] - cats[a[0]] * a[1])
      .slice(0, 2)
      .map(([c]) => c);

    return { idea, match: Math.round(Math.max(0, Math.min(1, score)) * 100), reasons };
  });

  return scored.sort((a, b) => b.match - a.match || a.idea.id.localeCompare(b.idea.id));
}

/** Role scores (role -> points) for one member's personal answers. */
export function roleScores(answers = {}) {
  const scores = Object.fromEntries(ROLES.map((r) => [r, 0]));
  for (const q of PERSONAL_QUESTIONS) {
    const a = answers[q.id];
    if (q.kind === 'choice') {
      const opt = optionFor(q, a);
      for (const [r, pts] of Object.entries(opt?.roles || {})) scores[r] += pts;
    } else if (q.kind === 'scale' && Number.isFinite(a)) {
      // 1–5 scale centred on 3, so a low rating counts against the role.
      for (const [r, w] of Object.entries(q.roles)) scores[r] += (a - 3) * w;
    }
  }
  return scores;
}

function* permutations(items, k, prefix = []) {
  if (prefix.length === k) {
    yield prefix;
    return;
  }
  for (const item of items) {
    if (!prefix.includes(item)) yield* permutations(items, k, [...prefix, item]);
  }
}

/**
 * Gives each member a different role so the team's total fit is as high as possible.
 * Exhaustive search: at most 5 members and 5 roles, so 120 combinations.
 * The CEO role is always filled. Ties keep the earlier member order, so results are stable.
 * Returns { assignments: [roleId per member], unfilled: [roleIds nobody holds] }.
 */
export function assignRoles(members) {
  const n = Math.min(members.length, ROLES.length);
  if (n === 0) return { assignments: [], unfilled: [...ROLES] };
  const scores = members.map((m) => roleScores(m.answers));

  let best = null;
  let bestTotal = -Infinity;
  for (const perm of permutations(ROLES, n)) {
    if (!perm.includes('ceo')) continue;
    const total = perm.reduce((sum, role, i) => sum + scores[i][role], 0);
    if (total > bestTotal) {
      bestTotal = total;
      best = perm;
    }
  }
  return { assignments: best, unfilled: ROLES.filter((r) => !best.includes(r)) };
}

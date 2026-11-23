import { Plus, Trash2, Check, Crown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlan } from '../context/PlanContext';
import { BRAND_COLORS, BRAND_ICONS } from '../data/sections';
import { ROLES } from '../data/quiz';
import { BRAND_ICON_COMPONENTS } from './icons';
import { currencyByCode, formatMoney, parseMoney, productMargin, startupTotal, financeModel } from '../lib/finance';

const TEXT_MAX = 3000;
// Static class names so Tailwind can see them.
const GRID_COLS = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 xl:grid-cols-4', 5: 'sm:grid-cols-2' };

export const wordCount = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;
// CJK text has no spaces, so count characters and convert roughly to words for the pitch timer.
const spokenUnits = (s) => {
  const text = s || '';
  const cjk = (text.match(/[぀-ヿ㐀-鿿가-힯]/g) || []).length;
  return cjk > text.length / 3 ? cjk / 2.2 : wordCount(text);
};

function Label({ htmlFor, label, required }) {
  const { t } = useLanguage();
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-baseline justify-between gap-3">
      <span className="text-[15px] font-semibold text-slate-800">{label}</span>
      <span className={`shrink-0 text-xs font-medium ${required ? 'text-brand-600' : 'text-slate-400'}`}>{required ? t('plan.required') : t('plan.optional')}</span>
    </label>
  );
}

export function Field({ section, field }) {
  const { t, tv } = useLanguage();
  const { state, setPlanField } = usePlan();
  const base = `plan.sections.${section.id}.fields.${field.name}`;
  const label = t(`${base}.label`);
  const help = tv(`${base}.help`);
  const placeholder = tv(`${base}.placeholder`) || '';
  const value = state.plan[field.name];
  const id = `f-${field.name}`;
  const set = (v) => setPlanField(field.name, v);

  let control;
  switch (field.kind) {
    case 'text':
      control = <input id={id} className="input" value={value || ''} maxLength={field.max || 200} placeholder={placeholder} onChange={(e) => set(e.target.value)} />;
      break;
    case 'money':
      control = <MoneyInput id={id} value={value} onChange={set} currency={currencyByCode(state.currency)} />;
      break;
    case 'textarea':
      control = (
        <div>
          <textarea id={id} className="input min-h-32 leading-relaxed" value={value || ''} maxLength={TEXT_MAX} placeholder={placeholder} onChange={(e) => set(e.target.value)} />
          <div className="mt-1 flex justify-between text-xs text-slate-400">
            <span>{field.pitch ? t('plan.pitchTarget') : ''}</span>
            <span>
              {t('plan.words', { n: wordCount(value) })}
              {field.pitch && value ? ` · ${t('plan.pitchTime', { n: Math.round((spokenUnits(value) / 140) * 60) })}` : ''}
            </span>
          </div>
        </div>
      );
      break;
    case 'select':
      control = (
        <select id={id} className="input" value={value || ''} onChange={(e) => set(e.target.value)}>
          <option value="">{t('plan.choose')}</option>
          {field.options.map((o) => (
            <option key={o} value={o}>{t(`plan.options.${field.name}.${o}`)}</option>
          ))}
        </select>
      );
      break;
    case 'chips':
      control = <Chips field={field} value={value || []} onChange={set} />;
      break;
    case 'color':
      control = <ColorPicker value={value} onChange={set} />;
      break;
    case 'icon':
      control = <IconPicker value={value} color={state.plan.brandColor} onChange={set} />;
      break;
    case 'table':
      control = <TableField field={field} rows={value || []} onChange={set} />;
      break;
    case 'team':
      control = <TeamField />;
      break;
    case 'finance':
      control = <FinanceField />;
      break;
    default:
      control = null;
  }

  return (
    <div>
      <Label htmlFor={id} label={label} required={field.required} />
      {typeof help === 'string' && <p className="-mt-0.5 mb-2.5 text-sm leading-relaxed text-slate-500">{help}</p>}
      {control}
    </div>
  );
}

function MoneyInput({ id, value, onChange, currency, compact }) {
  const invalid = value !== '' && value !== undefined && parseMoney(value) === null;
  return (
    <div className={`relative ${compact ? '' : 'max-w-xs'}`}>
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-semibold text-slate-400">{currency.symbol.trim()}</span>
      <input
        id={id}
        inputMode="decimal"
        className={`input pl-10 ${invalid ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}`}
        value={value || ''}
        maxLength={12}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, ''))}
        aria-invalid={invalid}
      />
    </div>
  );
}

function Chips({ field, value, onChange }) {
  const { t } = useLanguage();
  const toggle = (o) => {
    if (value.includes(o)) onChange(value.filter((v) => v !== o));
    else if (value.length < field.max) onChange([...value, o]);
  };
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {field.options.map((o) => {
          const on = value.includes(o);
          const disabled = !on && value.length >= field.max;
          return (
            <button key={o} type="button" onClick={() => toggle(o)} disabled={disabled} aria-pressed={on} className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition focus-ring ${on ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-brand-400'} disabled:opacity-40`}>
              {on && <Check className="h-3.5 w-3.5" />}
              {t(`plan.options.${field.name}.${o}`)}
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-slate-500">
        {t('plan.chooseUpTo', { min: field.min, max: field.max })} · {t('plan.selected', { n: value.length })}
      </p>
    </div>
  );
}

function ColorPicker({ value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {BRAND_COLORS.map((c) => (
        <button key={c} type="button" onClick={() => onChange(c)} aria-label={c} aria-pressed={value === c} className={`grid h-10 w-10 place-items-center rounded-full ring-offset-2 transition focus-ring ${value === c ? 'ring-2 ring-slate-900' : 'hover:scale-110'}`} style={{ background: c }}>
          {value === c && <Check className="h-5 w-5 text-white" />}
        </button>
      ))}
      <label className="relative grid h-10 w-10 cursor-pointer place-items-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 text-lg text-slate-400" title="Custom">
        +
        <input type="color" value={/^#[0-9a-f]{6}$/i.test(value || '') ? value : '#0b2447'} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
      </label>
    </div>
  );
}

function IconPicker({ value, color, onChange }) {
  return (
    <div className="grid grid-cols-6 gap-2 sm:grid-cols-11">
      {BRAND_ICONS.map((name) => {
        const Icon = BRAND_ICON_COMPONENTS[name];
        const on = value === name;
        return (
          <button key={name} type="button" onClick={() => onChange(name)} aria-label={name} aria-pressed={on} className={`grid aspect-square place-items-center rounded-xl border-2 transition focus-ring ${on ? 'text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-400'}`} style={on ? { background: color, borderColor: color } : undefined}>
            <Icon className="h-5 w-5" />
          </button>
        );
      })}
    </div>
  );
}

function TableField({ field, rows, onChange }) {
  const { t } = useLanguage();
  const { state } = usePlan();
  const currency = currencyByCode(state.currency);
  const members = state.members.filter((m) => m.name.trim());
  const blank = () => Object.fromEntries(field.columns.map((c) => [c.name, '']));
  const setCell = (i, col, v) => onChange(rows.map((r, j) => (j === i ? { ...r, [col]: v } : r)));
  const inputCols = field.columns;

  const renderCell = (row, i, c) => {
    const aria = `${t(`plan.columns.${c.name}`)} ${i + 1}`;
    switch (c.kind) {
      case 'money':
        return <MoneyInput compact value={row[c.name]} onChange={(v) => setCell(i, c.name, v)} currency={currency} />;
      case 'computed': {
        const m = productMargin(row);
        return <div className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${m && m.profit < 0 ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-700'}`}>{m ? `${formatMoney(m.profit, currency)} (${Math.round(m.percent)}%)` : '–'}</div>;
      }
      case 'level':
        return (
          <select className="input" aria-label={aria} value={row[c.name] || ''} onChange={(e) => setCell(i, c.name, e.target.value)}>
            <option value="">{t('plan.choose')}</option>
            {['low', 'medium', 'high'].map((l) => (
              <option key={l} value={l}>{t(`plan.level.${l}`)}</option>
            ))}
          </select>
        );
      case 'member':
        return (
          <select className="input" aria-label={aria} value={row[c.name] || ''} onChange={(e) => setCell(i, c.name, e.target.value)}>
            <option value="">{t('plan.choose')}</option>
            {members.map((m) => (
              <option key={m.id} value={m.name}>{m.name}</option>
            ))}
            <option value="*">{state.teamName || t('nav.team')}</option>
          </select>
        );
      case 'date':
        return <input type="date" className="input" aria-label={aria} value={row[c.name] || ''} onChange={(e) => setCell(i, c.name, e.target.value)} />;
      default:
        return <input className="input" aria-label={aria} value={row[c.name] || ''} maxLength={200} onChange={(e) => setCell(i, c.name, e.target.value)} />;
    }
  };

  const total = field.total ? startupTotal(state.plan) : null;
  const budget = parseMoney(state.plan.budget);

  return (
    <div className="space-y-3">
      {rows.map((row, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-bold text-slate-600 ring-1 ring-slate-200">{i + 1}</span>
            {rows.length > field.minRows && (
              <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="btn-ghost btn px-2 py-1 text-xs" aria-label={t('plan.removeRow')}>
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className={`grid gap-3 ${GRID_COLS[inputCols.length] || 'sm:grid-cols-2'}`}>
            {inputCols.map((c) => (
              <div key={c.name}>
                <span className="mb-1 block text-xs font-semibold text-slate-500">{t(`plan.columns.${c.name}`)}</span>
                {renderCell(row, i, c)}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {rows.length < field.maxRows ? (
          <button type="button" onClick={() => onChange([...rows, blank()])} className="btn-secondary btn border-dashed">
            <Plus className="h-4 w-4" /> {t('plan.addRow')}
          </button>
        ) : (
          <span />
        )}
        {total !== null && (
          <div className="text-right text-sm">
            <span className="font-semibold text-slate-600">{t('plan.total')}: </span>
            <span className="text-lg font-bold text-slate-900">{formatMoney(total, currency)}</span>
            {budget !== null && (
              <span className={`ml-3 font-semibold ${budget - total < 0 ? 'text-red-600' : 'text-emerald-700'}`}>
                {t('plan.left')}: {formatMoney(budget - total, currency)}
              </span>
            )}
          </div>
        )}
      </div>
      {total !== null && budget !== null && total > budget && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{t('plan.overBudget', { amount: formatMoney(total - budget, currency) })}</p>
      )}
    </div>
  );
}

function TeamField() {
  const { t } = useLanguage();
  const { state, setPlanField } = usePlan();
  const team = state.plan.team || [];
  const setRow = (i, key, v) => setPlanField('team', team.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  return (
    <div className="space-y-3">
      <p className="rounded-xl bg-accent-100/60 px-4 py-2.5 text-sm text-brand-900">{t('plan.teamFromQuiz')}</p>
      {team.map((row, i) => (
        <div key={row.memberId || i} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500 font-black text-white">{row.name?.[0]?.toUpperCase()}</span>
            <span className="font-bold text-slate-900">{row.name}</span>
            {row.role === 'ceo' && <Crown className="h-4 w-4 text-gold-500" />}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <span className="mb-1 block text-xs font-semibold text-slate-500">{t('plan.columns.role')}</span>
              <select className="input" value={row.role} onChange={(e) => setRow(i, 'role', e.target.value)}>
                <option value="">{t('plan.choose')}</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{t(`roles.${r}.name`)}</option>
                ))}
              </select>
            </div>
            <div>
              <span className="mb-1 block text-xs font-semibold text-slate-500">{t('plan.columns.skills')}</span>
              <input className="input" value={row.skills || ''} maxLength={200} onChange={(e) => setRow(i, 'skills', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <span className="mb-1 block text-xs font-semibold text-slate-500">{t('plan.columns.responsibilities')}</span>
              <textarea className="input min-h-20" value={row.responsibilities || ''} maxLength={600} onChange={(e) => setRow(i, 'responsibilities', e.target.value)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FinanceField() {
  const { t } = useLanguage();
  const { state, setPlanField } = usePlan();
  const currency = currencyByCode(state.currency);
  const f = state.plan.finance || {};
  const set = (k, v) => setPlanField('finance', { ...f, [k]: v });
  const m = financeModel(state.plan);
  const tableAvg = financeModel({ ...state.plan, finance: { ...f, avgPrice: '', avgUnitCost: '' } });

  const input = (k, label, hint, isPercent) => (
    <div>
      <label htmlFor={`fin-${k}`} className="mb-1 block text-sm font-semibold text-slate-700">{label}</label>
      {isPercent ? (
        <input id={`fin-${k}`} inputMode="decimal" className="input max-w-xs" value={f[k] || ''} maxLength={5} onChange={(e) => set(k, e.target.value.replace(/[^\d.]/g, ''))} />
      ) : (
        <MoneyInput id={`fin-${k}`} value={f[k]} onChange={(v) => set(k, v)} currency={k === 'unitsPerMonth' ? { symbol: '#' } : currency} />
      )}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-600">{t('plan.finance.intro')}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        {input('avgPrice', t('plan.finance.avgPrice'), t('plan.finance.avgPriceHint', { amount: formatMoney(tableAvg.price, currency) }))}
        {input('avgUnitCost', t('plan.finance.avgUnitCost'), t('plan.finance.avgUnitCostHint', { amount: formatMoney(tableAvg.unitCost, currency) }))}
        {input('fixedCosts', t('plan.finance.fixedCosts'), t('plan.finance.fixedCostsHint'))}
        {input('unitsPerMonth', t('plan.finance.unitsPerMonth'))}
        {input('growth', t('plan.finance.growth'), null, true)}
      </div>

      {m.price === null || m.unitCost === null ? (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">{t('plan.finance.needProducts')}</p>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label={t('plan.finance.contribution')} value={formatMoney(m.contribution, currency)} tone={m.contribution > 0 ? 'good' : 'bad'} />
            <Stat label={t('plan.finance.breakEven')} value={m.breakEvenUnits !== null ? t('plan.finance.breakEvenValue', { n: m.breakEvenUnits }) : '–'} tone={m.breakEvenUnits !== null ? 'neutral' : 'bad'} />
            <Stat label={t('plan.finance.startup')} value={formatMoney(m.startup, currency)} />
            <Stat label={t('plan.finance.payback')} value={m.ready && m.startup > 0 ? (m.paybackMonth ? t('plan.finance.paybackValue', { n: m.paybackMonth }) : t('plan.finance.paybackNever')) : '–'} tone={m.paybackMonth ? 'good' : 'neutral'} />
          </div>
          {m.contribution <= 0 && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{t('plan.finance.neverBreakEven')}</p>}
          <p className="text-xs text-slate-500">{t('plan.finance.formula')}</p>
          {m.ready && <ForecastTable model={m} currency={currency} />}
        </>
      )}
    </div>
  );
}

function Stat({ label, value, tone = 'neutral' }) {
  const tones = { good: 'text-emerald-700', bad: 'text-red-600', neutral: 'text-slate-900' };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className={`mt-1 text-lg font-bold ${tones[tone]}`}>{value}</p>
    </div>
  );
}

export function ForecastTable({ model, currency }) {
  const { t } = useLanguage();
  const cols = ['sold', 'revenue', 'costs', 'profit', 'cumulative'];
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <p className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-800">{t('plan.finance.forecastTitle')}</p>
      <table className="w-full min-w-[520px] text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-500">
            <th className="px-4 py-2 font-semibold">{t('plan.finance.month')}</th>
            {cols.map((c) => (
              <th key={c} className="px-4 py-2 text-right font-semibold">{t(`plan.finance.${c}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {model.months.map((row) => (
            <tr key={row.month} className="border-t border-slate-100">
              <td className="px-4 py-2 font-semibold text-slate-700">{row.month}</td>
              <td className="px-4 py-2 text-right tabular-nums">{row.sold}</td>
              {['revenue', 'costs', 'profit', 'cumulative'].map((k) => (
                <td key={k} className={`px-4 py-2 text-right tabular-nums ${(k === 'profit' || k === 'cumulative') && row[k] < 0 ? 'text-red-600' : ''}`}>{formatMoney(row[k], currency)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

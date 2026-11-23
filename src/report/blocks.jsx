// Builds the PDF business plan as a list of small "blocks". The paginator measures each block and packs
// them onto A4 pages, so long answers flow onto the next page instead of being cut off.
// Inline styles only (no Tailwind classes) so the captured pages look identical in every browser.

import { BRAND_ICON_COMPONENTS } from '../components/icons';
import { currencyByCode, financeModel, formatMoney, parseMoney, productMargin, startupTotal } from '../lib/finance';
import { rowComplete } from '../lib/progress';
import { sectionById } from '../data/sections';

export const PAGE_W = 794; // A4 at 96 dpi
export const PAGE_H = 1123;
export const MARGIN_X = 60;
export const CONTENT_W = PAGE_W - MARGIN_X * 2;
export const CONTENT_TOP = 84;
export const CONTENT_BOTTOM = 70;
export const CONTENT_H = PAGE_H - CONTENT_TOP - CONTENT_BOTTOM;

export const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans", "Noto Sans SC", "Noto Sans KR", sans-serif';
export const INK = '#0f172a';
export const MUTED = '#475569';
export const LINE = '#e2e8f0';

export const safeColor = (c) => (/^#[0-9a-f]{6}$/i.test(c || '') ? c : '#0b2447');
export const tint = (hex, a) => {
  const n = parseInt(safeColor(hex).slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

// The order sections appear in the PDF: summary first, as in a real business plan.
export const PDF_ORDER = ['pitch', 'team', 'overview', 'brand', 'customers', 'competitors', 'swot', 'products', 'marketing', 'operations', 'costs', 'finance', 'risks', 'milestones'];

const MAX_CHUNK = 850;

/** Splits long text into paragraph-sized pieces so no single block is taller than a page. */
function chunkText(text) {
  const paras = String(text || '').split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean);
  const out = [];
  for (const p of paras) {
    if (p.length <= MAX_CHUNK) {
      out.push(p);
      continue;
    }
    // Split on sentence ends (Latin and CJK punctuation), then pack sentences up to the limit.
    const sentences = p.match(/[^.!?。！？]+[.!?。！？]*\s*/g) || [p];
    let cur = '';
    for (const s of sentences) {
      if ((cur + s).length > MAX_CHUNK && cur) {
        out.push(cur.trim());
        cur = '';
      }
      if (s.length > MAX_CHUNK) {
        for (let i = 0; i < s.length; i += MAX_CHUNK) out.push(s.slice(i, i + MAX_CHUNK));
      } else cur += s;
    }
    if (cur.trim()) out.push(cur.trim());
  }
  return out;
}

const text = (s) => (typeof s === 'string' ? s.trim() : '');

export function buildReport({ state, t }) {
  const plan = state.plan;
  const brand = safeColor(plan.brandColor);
  const currency = currencyByCode(state.currency);
  const money = (v) => formatMoney(v, currency);
  const NP = <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>{t('pdf.notProvided')}</span>;
  const fieldLabel = (sid, name) => t(`plan.sections.${sid}.fields.${name}.label`);

  const blocks = [];
  const add = (key, node, opts = {}) => blocks.push({ key, node, ...opts });

  const label = (s) => <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: brand, marginBottom: 6 }}>{s}</div>;
  const para = (s) => <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.65, color: INK, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{s}</p>;

  /** A labelled answer, split into as many blocks as it needs. */
  const answer = (key, lbl, value) => {
    const chunks = chunkText(value);
    if (!chunks.length) {
      add(key, <div style={{ paddingBottom: 18 }}>{label(lbl)}{para(NP)}</div>);
      return;
    }
    chunks.forEach((c, i) =>
      add(`${key}-${i}`, <div style={{ paddingBottom: i === chunks.length - 1 ? 18 : 8 }}>{i === 0 && label(lbl)}{para(c)}</div>),
    );
  };

  const kv = (key, pairs) =>
    add(
      key,
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, paddingBottom: 18 }}>
        {pairs.map(([k, v]) => (
          <div key={k} style={{ flex: '1 1 140px', background: tint(brand, 0.06), border: `1px solid ${tint(brand, 0.18)}`, borderRadius: 10, padding: '10px 12px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: MUTED }}>{k}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginTop: 3 }}>{v || '–'}</div>
          </div>
        ))}
      </div>,
    );

  const chips = (key, lbl, ids, optKey) =>
    add(
      key,
      <div style={{ paddingBottom: 18 }}>
        {label(lbl)}
        {ids?.length ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {ids.map((id) => (
              <span key={id} style={{ fontSize: 12, fontWeight: 600, color: brand, background: tint(brand, 0.1), borderRadius: 999, padding: '4px 10px' }}>{t(`plan.options.${optKey}.${id}`)}</span>
            ))}
          </div>
        ) : (
          para(NP)
        )}
      </div>,
    );

  /** A table split into groups of rows, repeating the header on each piece. */
  const table = (key, columns, rows, { footer, widths } = {}) => {
    const th = { textAlign: 'left', fontSize: 10.5, fontWeight: 700, color: '#ffffff', background: brand, padding: '7px 8px' };
    const td = { fontSize: 12, color: INK, padding: '7px 8px', borderBottom: `1px solid ${LINE}`, verticalAlign: 'top', wordBreak: 'break-word', lineHeight: 1.45 };
    const groups = [];
    for (let i = 0; i < Math.max(rows.length, 1); i += 9) groups.push(rows.slice(i, i + 9));
    groups.forEach((g, gi) =>
      add(
        `${key}-${gi}`,
        <div style={{ paddingBottom: gi === groups.length - 1 ? 18 : 6 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
              {columns.map((c, i) => (
                <col key={c.key} style={{ width: widths?.[i] }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {columns.map((c, i) => (
                  <th key={c.key} style={{ ...th, textAlign: c.align || 'left', borderTopLeftRadius: i === 0 ? 6 : 0, borderTopRightRadius: i === columns.length - 1 ? 6 : 0 }}>{c.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.length === 0 && (
                <tr>
                  <td style={td} colSpan={columns.length}>{NP}</td>
                </tr>
              )}
              {g.map((r, ri) => (
                <tr key={ri} style={{ background: ri % 2 ? '#f8fafc' : '#ffffff' }}>
                  {columns.map((c) => (
                    <td key={c.key} style={{ ...td, textAlign: c.align || 'left' }}>{c.render ? c.render(r) : r[c.key] || '–'}</td>
                  ))}
                </tr>
              ))}
              {gi === groups.length - 1 && footer}
            </tbody>
          </table>
        </div>,
      ),
    );
  };

  const filledRows = (name) => {
    const f = Object.values(sectionByIdFields).find((x) => x.name === name);
    return (plan[name] || []).filter((r) => (f ? rowComplete(r, f.columns) || Object.values(r).some((v) => text(v)) : true));
  };

  // ---- Sections -------------------------------------------------------------------------------
  const builders = {
    pitch() {
      answer('exec', fieldLabel('pitch', 'executiveSummary'), plan.executiveSummary);
      const m = financeModel(plan);
      kv('facts', [
        [t('pdf.startupTotal'), money(startupTotal(plan))],
        [t('pdf.breakEven'), m.breakEvenUnits != null ? t('plan.finance.breakEvenValue', { n: m.breakEvenUnits }) : '–'],
        [t('pdf.pricing'), plan.pricingStrategy ? t(`plan.options.pricingStrategy.${plan.pricingStrategy}`).split(' (')[0].split('（')[0] : '–'],
        [t('pdf.funding'), (plan.funding || []).map((f) => t(`plan.options.funding.${f}`)).join(', ')],
      ]);
      const pitch = chunkText(plan.elevatorPitch);
      add(
        'pitch',
        <div style={{ paddingBottom: 18 }}>
          {label(fieldLabel('pitch', 'elevatorPitch'))}
          <div style={{ borderLeft: `4px solid ${brand}`, background: tint(brand, 0.06), borderRadius: '0 10px 10px 0', padding: '14px 18px', fontSize: 15, lineHeight: 1.6, fontStyle: 'italic', color: INK, whiteSpace: 'pre-wrap' }}>
            {pitch.length ? pitch.join('\n\n') : NP}
          </div>
        </div>,
      );
    },
    team() {
      const team = plan.team || [];
      for (let i = 0; i < team.length; i += 2) {
        add(
          `team-${i}`,
          <div style={{ display: 'flex', gap: 12, paddingBottom: 12 }}>
            {team.slice(i, i + 2).map((m) => (
              <div key={m.memberId || m.name} style={{ flex: 1, border: `1px solid ${LINE}`, borderTop: `4px solid ${brand}`, borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: brand, color: '#fff', fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{(m.name || '?')[0].toUpperCase()}</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{m.name}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: brand }}>{m.role ? t(`roles.${m.role}.name`) : '–'}</div>
                  </div>
                </div>
                {text(m.skills) && <div style={{ fontSize: 11.5, color: MUTED, marginTop: 10 }}><b>{t('plan.columns.skills')}:</b> {m.skills}</div>}
                <div style={{ fontSize: 12, color: INK, marginTop: 8, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>{text(m.responsibilities) || NP}</div>
              </div>
            ))}
            {team.slice(i, i + 2).length === 1 && <div style={{ flex: 1 }} />}
          </div>,
        );
      }
      if (!team.length) add('team-empty', para(NP));
    },
    overview() {
      if (plan.businessType) kv('type', [[fieldLabel('overview', 'businessType'), t(`plan.options.businessType.${plan.businessType}`)]]);
      answer('desc', fieldLabel('overview', 'description'), plan.description);
      answer('problem', fieldLabel('overview', 'problem'), plan.problem);
      answer('mission', fieldLabel('overview', 'mission'), plan.mission);
    },
    brand() {
      const Icon = BRAND_ICON_COMPONENTS[plan.brandIcon] || BRAND_ICON_COMPONENTS.briefcase;
      add(
        'swatch',
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: brand, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon color="#ffffff" size={32} strokeWidth={2} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: brand }}>{text(plan.businessName) || '–'}</div>
            <div style={{ fontSize: 12, color: MUTED }}>{brand.toUpperCase()}</div>
          </div>
        </div>,
      );
      answer('words', fieldLabel('brand', 'brandWords'), plan.brandWords);
      answer('logo', fieldLabel('brand', 'logoIdea'), plan.logoIdea);
    },
    customers() {
      ['targetCustomer', 'customerNeeds', 'marketSize', 'surveyFindings'].forEach((f) => answer(f, fieldLabel('customers', f), plan[f]));
    },
    competitors() {
      const cols = ['name', 'product', 'price', 'strengths', 'weaknesses'].map((k) => ({ key: k, title: t(`plan.columns.${k}`) }));
      table('comp', cols, filledRows('competitors'), { widths: ['18%', '22%', '14%', '23%', '23%'] });
      answer('usp', fieldLabel('competitors', 'usp'), plan.usp);
    },
    swot() {
      const cell = (k, title, bg) => (
        <div style={{ flex: 1, background: bg, borderRadius: 10, padding: '12px 14px' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: INK, marginBottom: 6 }}>{title}</div>
          <div style={{ fontSize: 12, lineHeight: 1.55, color: INK, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{text(plan[k]).slice(0, 900) || NP}</div>
        </div>
      );
      add('swot-1', <div style={{ display: 'flex', gap: 10, paddingBottom: 10 }}>{cell('swotStrengths', t('pdf.strengths'), '#dcfce7')}{cell('swotWeaknesses', t('pdf.weaknesses'), '#fee2e2')}</div>);
      add('swot-2', <div style={{ display: 'flex', gap: 10, paddingBottom: 18 }}>{cell('swotOpportunities', t('pdf.opportunities'), '#dbeafe')}{cell('swotThreats', t('pdf.threats'), '#fef3c7')}</div>);
    },
    products() {
      const m = (r) => {
        const x = productMargin(r);
        return x ? `${money(x.profit)} (${Math.round(x.percent)}%)` : '–';
      };
      const cols = [
        { key: 'name', title: t('plan.columns.name') },
        { key: 'description', title: t('plan.columns.description') },
        { key: 'unitCost', title: t('plan.columns.unitCost'), align: 'right', render: (r) => money(parseMoney(r.unitCost)) },
        { key: 'price', title: t('plan.columns.price'), align: 'right', render: (r) => money(parseMoney(r.price)) },
        { key: 'margin', title: t('plan.columns.margin'), align: 'right', render: m },
      ];
      table('products', cols, filledRows('products'), { widths: ['20%', '32%', '16%', '14%', '18%'] });
      if (plan.pricingStrategy) kv('strategy', [[fieldLabel('products', 'pricingStrategy'), t(`plan.options.pricingStrategy.${plan.pricingStrategy}`)]]);
      answer('reason', fieldLabel('products', 'pricingReason'), plan.pricingReason);
    },
    marketing() {
      chips('strategies', fieldLabel('marketing', 'strategies'), plan.strategies, 'strategies');
      answer('mdetails', fieldLabel('marketing', 'marketingDetails'), plan.marketingDetails);
      answer('launch', fieldLabel('marketing', 'launchPlan'), plan.launchPlan);
      if (text(plan.firstPost))
        add(
          'post',
          <div style={{ paddingBottom: 18 }}>
            {label(fieldLabel('marketing', 'firstPost'))}
            <div style={{ border: `1px solid ${LINE}`, borderRadius: 12, padding: 14, maxWidth: 420 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div style={{ width: 26, height: 26, borderRadius: 13, background: brand }} />
                <b style={{ fontSize: 12.5, color: INK }}>{text(plan.businessName) || '–'}</b>
              </div>
              <div style={{ fontSize: 12.5, lineHeight: 1.55, color: INK, whiteSpace: 'pre-wrap' }}>{text(plan.firstPost).slice(0, 700)}</div>
            </div>
          </div>,
        );
    },
    operations() {
      kv('ops', [
        [fieldLabel('operations', 'premises'), plan.premises ? t(`plan.options.premises.${plan.premises}`) : '–'],
        [fieldLabel('operations', 'openingHours'), text(plan.openingHours) || '–'],
      ]);
      ['premisesDetails', 'suppliers', 'equipment', 'process'].forEach((f) => answer(f, fieldLabel('operations', f), plan[f]));
    },
    costs() {
      const total = startupTotal(plan);
      const budget = parseMoney(plan.budget);
      kv('budget', [
        [fieldLabel('costs', 'budget'), money(budget)],
        [t('plan.total'), money(total)],
        [t('plan.left'), budget !== null ? money(budget - total) : '–'],
      ]);
      const cols = [
        { key: 'item', title: t('plan.columns.item') },
        { key: 'source', title: t('plan.columns.source') },
        { key: 'cost', title: t('plan.columns.cost'), align: 'right', render: (r) => money(parseMoney(r.cost)) },
      ];
      const footer = (
        <tr>
          <td colSpan={2} style={{ fontSize: 12.5, fontWeight: 800, padding: '8px', color: INK }}>{t('plan.total')}</td>
          <td style={{ fontSize: 12.5, fontWeight: 800, padding: '8px', textAlign: 'right', color: INK }}>{money(total)}</td>
        </tr>
      );
      table('costs', cols, filledRows('startupCosts'), { footer, widths: ['40%', '40%', '20%'] });
      chips('funding', fieldLabel('costs', 'funding'), plan.funding, 'funding');
      answer('fdetails', fieldLabel('costs', 'fundingDetails'), plan.fundingDetails);
    },
    finance() {
      const m = financeModel(plan);
      kv('fin1', [
        [t('plan.finance.avgPrice'), money(m.price)],
        [t('plan.finance.avgUnitCost'), money(m.unitCost)],
        [t('plan.finance.fixedCosts'), money(m.fixed)],
      ]);
      kv('fin2', [
        [t('plan.finance.contribution'), m.contribution !== undefined ? money(m.contribution) : '–'],
        [t('plan.finance.breakEven'), m.breakEvenUnits != null ? t('plan.finance.breakEvenValue', { n: m.breakEvenUnits }) : '–'],
        [t('plan.finance.payback'), m.ready && m.startup > 0 ? (m.paybackMonth ? t('plan.finance.paybackValue', { n: m.paybackMonth }) : t('plan.finance.paybackNever')) : '–'],
      ]);
      if (m.ready) {
        const cols = [
          { key: 'month', title: t('plan.finance.month') },
          { key: 'sold', title: t('plan.finance.sold'), align: 'right', render: (r) => String(r.sold) },
          ...['revenue', 'costs', 'profit', 'cumulative'].map((k) => ({ key: k, title: t(`plan.finance.${k}`), align: 'right', render: (r) => <span style={{ color: r[k] < 0 ? '#dc2626' : INK }}>{money(r[k])}</span> })),
        ];
        add('forecast-title', <div style={{ paddingBottom: 2 }}>{label(t('plan.finance.forecastTitle'))}</div>, { keepWithNext: true });
        table('forecast', cols, m.months, { widths: ['12%', '14%', '19%', '19%', '17%', '19%'] });
        add('chart', <ProfitChart months={m.months} brand={brand} money={money} t={t} />);
      }
      answer('fnotes', fieldLabel('finance', 'financeNotes'), plan.financeNotes);
    },
    risks() {
      const lvl = (v) => (v ? t(`plan.level.${v}`) : '–');
      const cols = [
        { key: 'risk', title: t('plan.columns.risk') },
        { key: 'likelihood', title: t('plan.columns.likelihood'), render: (r) => lvl(r.likelihood) },
        { key: 'impact', title: t('plan.columns.impact'), render: (r) => lvl(r.impact) },
        { key: 'plan', title: t('plan.columns.plan') },
      ];
      table('risks', cols, filledRows('risks'), { widths: ['30%', '14%', '14%', '42%'] });
      answer('legal', fieldLabel('risks', 'legal'), plan.legal);
      answer('sust', fieldLabel('risks', 'sustainability'), plan.sustainability);
    },
    milestones() {
      const rows = [...filledRows('milestones')].sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'));
      const cols = [
        { key: 'task', title: t('plan.columns.task') },
        { key: 'owner', title: t('plan.columns.owner'), render: (r) => (r.owner === '*' ? state.teamName || t('nav.team') : r.owner || '–') },
        { key: 'deadline', title: t('plan.columns.deadline'), render: (r) => (r.deadline ? new Date(`${r.deadline}T00:00:00`).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '–') },
      ];
      table('ms', cols, rows, { widths: ['56%', '22%', '22%'] });
      answer('success', fieldLabel('milestones', 'successMeasures'), plan.successMeasures);
    },
  };

  const sectionStarts = [];
  PDF_ORDER.forEach((sid, i) => {
    const start = blocks.length;
    builders[sid]();
    // Attach the section heading to the first block so a heading never sits alone at a page bottom.
    const first = blocks[start];
    const heading = (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: start === 0 ? 0 : 10, paddingBottom: 16 }}>
        <div style={{ width: 34, height: 34, borderRadius: 9, background: brand, color: '#fff', fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
        <div style={{ flex: 1, fontSize: 21, fontWeight: 800, color: INK, borderBottom: `2px solid ${tint(brand, 0.25)}`, paddingBottom: 6 }}>{t(`plan.sections.${sid}.title`)}</div>
      </div>
    );
    blocks[start] = { ...first, key: `h-${sid}`, node: <div>{heading}{first.node}</div>, sectionStart: sid };
    sectionStarts.push(sid);
  });

  return { blocks, sections: sectionStarts };
}

// Field definitions by name, used to decide which table rows have content.
const sectionByIdFields = Object.fromEntries(
  ['competitors', 'products', 'costs', 'risks', 'milestones'].flatMap((sid) => sectionById(sid).fields.filter((f) => f.kind === 'table').map((f) => [f.name, f])),
);

/** Simple bar chart of monthly profit, drawn as plain boxes so it captures cleanly. */
function ProfitChart({ months, brand, money, t }) {
  const max = Math.max(1, ...months.map((m) => Math.abs(m.profit)));
  const hasNeg = months.some((m) => m.profit < 0);
  const H = 110;
  return (
    <div style={{ paddingBottom: 18 }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: brand, marginBottom: 8 }}>{t('plan.finance.profit')}</div>
      <div style={{ display: 'flex', alignItems: hasNeg ? 'center' : 'flex-end', gap: 14, height: hasNeg ? H * 2 : H, borderBottom: hasNeg ? 'none' : `1px solid ${LINE}`, position: 'relative' }}>
        {hasNeg && <div style={{ position: 'absolute', left: 0, right: 0, top: H, borderTop: `1px solid ${LINE}` }} />}
        {months.map((m) => {
          const h = Math.max(2, (Math.abs(m.profit) / max) * (H - 18));
          return (
            <div key={m.month} style={{ flex: 1, height: hasNeg ? H * 2 : H, display: 'flex', flexDirection: 'column', justifyContent: hasNeg ? 'flex-start' : 'flex-end', alignItems: 'center' }}>
              {hasNeg ? (
                <>
                  <div style={{ height: H, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                    {m.profit >= 0 && <><div style={{ fontSize: 9.5, color: MUTED, marginBottom: 2 }}>{money(m.profit)}</div><div style={{ width: '70%', height: h, background: brand, borderRadius: '4px 4px 0 0' }} /></>}
                  </div>
                  <div style={{ height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    {m.profit < 0 && <><div style={{ width: '70%', height: h, background: '#ef4444', borderRadius: '0 0 4px 4px' }} /><div style={{ fontSize: 9.5, color: '#dc2626', marginTop: 2 }}>{money(m.profit)}</div></>}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 9.5, color: MUTED, marginBottom: 2 }}>{money(m.profit)}</div>
                  <div style={{ width: '70%', height: h, background: brand, borderRadius: '4px 4px 0 0' }} />
                </>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 4 }}>
        {months.map((m) => (
          <div key={m.month} style={{ flex: 1, textAlign: 'center', fontSize: 10.5, color: MUTED }}>{t('plan.finance.month')} {m.month}</div>
        ))}
      </div>
    </div>
  );
}

/**
 * Packs measured blocks onto pages. heights[i] is block i's rendered height in px.
 * A block marked keepWithNext moves to the next page with the block after it.
 */
export function paginate(blocks, heights) {
  const pages = [[]];
  let used = 0;
  for (let i = 0; i < blocks.length; i++) {
    const h = heights[i] || 0;
    const need = blocks[i].keepWithNext && i + 1 < blocks.length ? h + (heights[i + 1] || 0) : h;
    if (used > 0 && used + need > CONTENT_H) {
      pages.push([]);
      used = 0;
    }
    pages[pages.length - 1].push(i);
    used += h;
  }
  return pages;
}

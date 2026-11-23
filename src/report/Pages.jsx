import { BRAND_ICON_COMPONENTS } from '../components/icons';
import { CONTENT_BOTTOM, CONTENT_TOP, CONTENT_W, FONT, INK, LINE, MARGIN_X, MUTED, PAGE_H, PAGE_W, safeColor, tint } from './blocks';

const pageStyle = { width: PAGE_W, height: PAGE_H, background: '#ffffff', position: 'relative', overflow: 'hidden', fontFamily: FONT, color: INK, boxSizing: 'border-box' };

export function CoverPage({ state, t, dateText }) {
  const plan = state.plan;
  const brand = safeColor(plan.brandColor);
  const Icon = BRAND_ICON_COMPONENTS[plan.brandIcon] || BRAND_ICON_COMPONENTS.briefcase;
  const team = plan.team || [];
  return (
    <div style={pageStyle} data-pdf-page>
      <div style={{ position: 'absolute', inset: 0, height: 640, background: brand }} />
      <div style={{ position: 'absolute', right: -140, top: -140, width: 460, height: 460, borderRadius: 230, background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', left: -80, top: 420, width: 300, height: 300, borderRadius: 150, background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', left: MARGIN_X, right: MARGIN_X, top: 175, color: '#ffffff' }}>
        <div style={{ width: 96, height: 96, borderRadius: 24, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.18)' }}>
          <Icon color={brand} size={52} strokeWidth={2} />
        </div>
        <div style={{ marginTop: 34, fontSize: 52, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.02em', wordBreak: 'break-word' }}>{plan.businessName?.trim() || t('pdf.docTitle')}</div>
        {plan.tagline?.trim() && <div style={{ marginTop: 14, fontSize: 20, fontWeight: 500, opacity: 0.92 }}>{plan.tagline.trim()}</div>}
        <div style={{ marginTop: 26, display: 'inline-block', fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: '1.5px solid rgba(255,255,255,0.6)', borderRadius: 999, padding: '7px 16px' }}>{t('pdf.docTitle')}</div>
      </div>

      <div style={{ position: 'absolute', left: MARGIN_X, right: MARGIN_X, top: 690 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: brand }}>{t('pdf.preparedBy')}</div>
        {state.teamName?.trim() && <div style={{ fontSize: 20, fontWeight: 800, marginTop: 6 }}>{state.teamName.trim()}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
          {team.map((m) => (
            <div key={m.memberId || m.name} style={{ flex: '1 1 200px', border: `1px solid ${LINE}`, borderRadius: 10, padding: '10px 14px' }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{m.name}</div>
              <div style={{ fontSize: 12, color: brand, fontWeight: 600, marginTop: 2 }}>{m.role ? t(`roles.${m.role}.name`) : ''}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', left: MARGIN_X, right: MARGIN_X, bottom: 44, display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: MUTED, borderTop: `1px solid ${LINE}`, paddingTop: 12 }}>
        <span>{t('pdf.date')}: {dateText}</span>
        <span>{t('brand.product')}</span>
      </div>
    </div>
  );
}

function Chrome({ state, t, pageNo, total, children }) {
  const brand = safeColor(state.plan.brandColor);
  return (
    <div style={pageStyle} data-pdf-page>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: PAGE_H, background: brand }} />
      <div style={{ position: 'absolute', left: MARGIN_X, right: MARGIN_X, top: 34, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11.5, borderBottom: `1px solid ${LINE}`, paddingBottom: 10 }}>
        <span style={{ fontWeight: 800, color: brand }}>{state.plan.businessName?.trim() || t('pdf.docTitle')}</span>
        <span style={{ color: MUTED }}>{t('pdf.docTitle')}</span>
      </div>
      <div style={{ position: 'absolute', left: MARGIN_X, top: CONTENT_TOP, width: CONTENT_W }}>{children}</div>
      <div style={{ position: 'absolute', left: MARGIN_X, right: MARGIN_X, bottom: CONTENT_BOTTOM - 46, display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: MUTED, borderTop: `1px solid ${LINE}`, paddingTop: 10 }}>
        <span>{state.teamName?.trim()}</span>
        <span>{t('pdf.page', { n: pageNo, total })}</span>
      </div>
    </div>
  );
}

export function ContentsPage({ state, t, entries, total }) {
  const brand = safeColor(state.plan.brandColor);
  return (
    <Chrome state={state} t={t} pageNo={2} total={total}>
      <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 24 }}>{t('pdf.contents')}</div>
      {entries.map((e, i) => (
        <div key={e.id} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '11px 0', borderBottom: `1px solid ${LINE}` }}>
          <span style={{ width: 28, height: 28, borderRadius: 8, background: tint(brand, 0.12), color: brand, fontWeight: 800, fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
          <span style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>{e.title}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: MUTED }}>{e.page}</span>
        </div>
      ))}
    </Chrome>
  );
}

export function ContentPage({ state, t, pageNo, total, nodes }) {
  return (
    <Chrome state={state} t={t} pageNo={pageNo} total={total}>
      {nodes}
    </Chrome>
  );
}

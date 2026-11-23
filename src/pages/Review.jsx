import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Download, FileText, CheckCircle2, AlertTriangle, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlan } from '../context/PlanContext';
import { planProgress } from '../lib/progress';
import PageHeader from '../components/PageHeader';
import { buildReport, paginate, CONTENT_W, PAGE_W, PAGE_H } from '../report/blocks';
import { CoverPage, ContentsPage, ContentPage } from '../report/Pages';

function usePreviewScale() {
  const calc = () => Math.min(0.62, Math.max(0.3, (window.innerWidth - 48) / PAGE_W));
  const [scale, setScale] = useState(calc);
  useEffect(() => {
    const on = () => setScale(calc());
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return scale;
}

export default function Review() {
  const { t, tv, language } = useLanguage();
  const { state } = usePlan();
  const progress = planProgress(state.plan);
  const scale = usePreviewScale();
  const measureRef = useRef(null);
  const captureRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const [busy, setBusy] = useState(null); // { n, total } while generating
  const [error, setError] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const report = useMemo(() => (state.planStarted ? buildReport({ state, t, tv }) : null), [state, language]);

  // Measure every block, then pack them onto pages.
  useLayoutEffect(() => {
    if (!report || !measureRef.current) return;
    const heights = [...measureRef.current.children].map((el) => el.getBoundingClientRect().height);
    setLayout(paginate(report.blocks, heights));
  }, [report]);

  if (!state.planStarted) return <Navigate to="/results" replace />;

  const dateText = new Date().toLocaleDateString(language === 'zh' ? 'zh-CN' : language, { day: 'numeric', month: 'long', year: 'numeric' });
  const contentPages = layout || [];
  const total = 2 + contentPages.length;
  const entries = report.sections.map((sid) => ({
    id: sid,
    title: t(`plan.sections.${sid}.title`),
    page: 3 + contentPages.findIndex((p) => p.some((bi) => report.blocks[bi].sectionStart === sid)),
  }));

  const pages = layout
    ? [
        <CoverPage key="cover" state={state} t={t} dateText={dateText} />,
        <ContentsPage key="contents" state={state} t={t} entries={entries} total={total} />,
        ...contentPages.map((idxs, i) => <ContentPage key={`p${i}`} state={state} t={t} pageNo={i + 3} total={total} nodes={idxs.map((bi) => <div key={report.blocks[bi].key}>{report.blocks[bi].node}</div>)} />),
      ]
    : [];

  const download = async () => {
    setError(false);
    const els = [...captureRef.current.querySelectorAll('[data-pdf-page]')];
    setBusy({ n: 0, total: els.length });
    try {
      const [{ jsPDF }, { default: html2canvas }] = await Promise.all([import('jspdf'), import('html2canvas-pro')]);
      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });
      for (let i = 0; i < els.length; i++) {
        setBusy({ n: i + 1, total: els.length });
        const canvas = await html2canvas(els[i], { scale: 2, backgroundColor: '#ffffff', logging: false, useCORS: false, width: PAGE_W, height: PAGE_H, windowWidth: PAGE_W });
        if (i > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }
      pdf.setProperties({ title: `${state.plan.businessName?.trim() || t('pdf.docTitle')} – ${t('pdf.docTitle')}`, creator: t('brand.product') });
      const base = (state.plan.businessName || '').trim().replace(/[^\p{L}\p{N} _-]/gu, '').replace(/\s+/g, '-').slice(0, 50) || 'business-plan';
      pdf.save(`${base}-business-plan.pdf`);
    } catch (e) {
      console.error('PDF generation failed', e);
      setError(true);
    } finally {
      setBusy(null);
    }
  };

  const missing = progress.per.filter((p) => p.missing.length);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <PageHeader icon={FileText} title={t('review.title')} subtitle={t('review.subtitle')}>
        <div className="flex flex-wrap gap-2">
          <Link to="/plan/pitch" className="btn-secondary btn">
            <ArrowLeft className="h-4 w-4" /> {t('review.backToPlan')}
          </Link>
          <button type="button" onClick={download} disabled={!layout || !!busy} className="btn-primary btn px-6">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            {busy ? t('review.generating', { n: busy.n, total: busy.total }) : t('review.download')}
          </button>
        </div>
      </PageHeader>

      {error && <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{t('review.failed')}</p>}

      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="min-w-0 space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">{t('plan.sectionsTitle')}</span>
              <span className="text-2xl font-extrabold text-brand-700">{progress.percent}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-500" style={{ width: `${progress.percent}%` }} />
            </div>
          </div>
          {missing.length === 0 ? (
            <div className="card flex items-center gap-3 border-emerald-200 bg-emerald-50 p-5 text-emerald-800">
              <CheckCircle2 className="h-6 w-6 shrink-0" />
              <span className="font-semibold">{t('review.ready')}</span>
            </div>
          ) : (
            <div className="card p-5">
              <h2 className="flex items-center gap-2 font-bold text-slate-900">
                <AlertTriangle className="h-5 w-5 text-gold-500" /> {t('review.missingTitle')}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{t('review.missingIntro')}</p>
              <ul className="mt-4 space-y-2">
                {missing.map(({ section, missing: fields }) => (
                  <li key={section.id}>
                    <Link to={`/plan/${section.id}`} className="group block rounded-xl border border-slate-200 px-3.5 py-2.5 transition hover:border-brand-300 hover:bg-brand-50/50 focus-ring">
                      <span className="flex items-center justify-between text-sm font-semibold text-slate-800">
                        {t(`plan.sections.${section.id}.title`)}
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-brand-600" />
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">{fields.map((f) => tv(`plan.sections.${section.id}.fields.${f}.label`) || t(`plan.sections.${section.id}.title`)).join(' · ')}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <section className="min-w-0">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-slate-500">{t('review.preview')}</h2>
          <div className="flex flex-wrap gap-5">
            {pages.map((p, i) => (
              <div key={i} className="overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-slate-200" style={{ width: PAGE_W * scale * (scale > 0.45 ? 0.75 : 1), height: PAGE_H * scale * (scale > 0.45 ? 0.75 : 1) }}>
                <div style={{ transform: `scale(${scale * (scale > 0.45 ? 0.75 : 1)})`, transformOrigin: 'top left', width: PAGE_W, height: PAGE_H }}>{p}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Hidden: block measurement, and full-size pages used for the PDF capture. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: -20000, top: 0, width: CONTENT_W, visibility: 'hidden' }} ref={measureRef}>
        {report.blocks.map((b) => (
          <div key={b.key}>{b.node}</div>
        ))}
      </div>
      <div aria-hidden="true" ref={captureRef} style={{ position: 'fixed', left: -20000, top: 0, width: PAGE_W, pointerEvents: 'none' }}>
        {pages}
      </div>
    </div>
  );
}

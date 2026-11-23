import {
  BadgeCheck, Banknote, BookOpen, CalendarDays, Check, ChevronDown, ChevronRight, CircleAlert,
  ClipboardCheck, Coins, HandCoins, HeartHandshake, Lightbulb, ListChecks, Megaphone, MessageCircle,
  Package, Palette, Pencil, Search, ShieldCheck, ShoppingBag, Sparkles, Store, Tag, Target, Truck,
  Users, Wallet, Wrench,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DIAGRAMS = {
  team: { icons: [Users, ClipboardCheck, BadgeCheck] },
  overview: { icons: [CircleAlert, Lightbulb, Users], flow: true },
  brand: { icons: [MessageCircle, Palette, Tag] },
  customers: { icons: [Target, MessageCircle, ClipboardCheck], flow: true },
  competitors: { icons: [Search, Tag, Sparkles], flow: true },
  swot: { icons: [Check, Wrench, Lightbulb, CircleAlert] },
  products: { icons: [Package, Tag, Coins] },
  marketing: { icons: [Users, Megaphone, ShoppingBag] },
  operations: { icons: [Truck, Package, ShoppingBag], flow: true },
  costs: { icons: [Search, Wallet, HandCoins], flow: true },
  finance: { icons: [Store, Coins, Target] },
  risks: { icons: [CircleAlert, ShieldCheck, HeartHandshake] },
  milestones: { icons: [ListChecks, Users, CalendarDays] },
  pitch: { icons: [Lightbulb, Banknote, Megaphone] },
};

function LessonDiagram({ sectionId, labels }) {
  const { icons, flow } = DIAGRAMS[sectionId];
  const grid = icons.length === 4 ? 'grid-cols-2' : 'grid-cols-1 min-[420px]:grid-cols-3';
  const List = flow ? 'ol' : 'ul';

  return (
    <List role="list" className={`grid ${grid} gap-2.5 rounded-xl bg-brand-100/70 p-2.5`}>
      {icons.map((Icon, index) => (
        <li key={index} className="relative flex min-w-0 items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm leading-snug font-semibold text-brand-900 min-[420px]:flex-col min-[420px]:items-start">
          <Icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
          <span className="wrap-break-word">{labels[index]}</span>
          {flow && index < icons.length - 1 && (
            <ChevronRight className="absolute top-4 -right-3 z-10 hidden h-4 w-4 rounded-full bg-brand-100 text-brand-700 min-[420px]:block" aria-hidden="true" />
          )}
        </li>
      ))}
    </List>
  );
}

export default function SectionLesson({ sectionId }) {
  const { t, tv } = useLanguage();
  const lesson = tv(`learn.sections.${sectionId}`);

  return (
    <details className="group/lesson mt-5">
      <summary className="focus-ring flex min-h-11 w-fit cursor-pointer list-none items-center gap-2.5 rounded-xl bg-brand-700 px-4 py-2.5 text-base font-bold text-white shadow-sm hover:bg-brand-800 [&::-webkit-details-marker]:hidden">
        <BookOpen className="h-5 w-5 shrink-0" aria-hidden="true" />
        {t('learn.open')}
        <ChevronDown className="h-4 w-4 shrink-0 transition group-open/lesson:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
      </summary>
      <div className="mt-3 space-y-4 rounded-2xl border border-brand-100 bg-brand-50 p-4 sm:p-5">
        <div>
          <h2 className="text-lg leading-snug font-extrabold text-brand-900">{lesson.title}</h2>
          <p className="mt-1.5 leading-relaxed text-slate-800">{lesson.overview}</p>
        </div>
        <LessonDiagram sectionId={sectionId} labels={lesson.visual} />
        <div>
          <h3 className="flex items-center gap-2 font-bold text-brand-900">
            <Lightbulb className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            {t('learn.example')}
          </h3>
          <p className="mt-1 leading-relaxed text-slate-800">{lesson.example}</p>
        </div>
        <div className="rounded-xl border border-brand-100 bg-white p-3.5">
          <h3 className="flex items-center gap-2 font-bold text-brand-900">
            <Pencil className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
            {t('learn.tryIt')}
          </h3>
          <p className="mt-1 leading-relaxed text-slate-800">{lesson.task}</p>
        </div>
      </div>
    </details>
  );
}

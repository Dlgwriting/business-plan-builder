// Quiz structure. All wording lives in the language files under quiz.group.<id> / quiz.personal.<id>.
// Group answers score interest categories and business style; personal answers score team roles.

export const CATEGORIES = ['food', 'tech', 'creative', 'fashion', 'wellbeing', 'green', 'media', 'service'];

// Each option: { id, cats?: {category: points}, style?: {key: value} }
export const GROUP_QUESTIONS = [
  {
    id: 'weekend',
    options: [
      { id: 'cook', cats: { food: 3 } },
      { id: 'code', cats: { tech: 3 } },
      { id: 'draw', cats: { creative: 3 } },
      { id: 'style', cats: { fashion: 3 } },
      { id: 'sport', cats: { wellbeing: 3 } },
      { id: 'garden', cats: { green: 3 } },
      { id: 'video', cats: { media: 3 } },
      { id: 'help', cats: { service: 3 } },
    ],
  },
  {
    id: 'club',
    options: [
      { id: 'cooking', cats: { food: 3 } },
      { id: 'robotics', cats: { tech: 3 } },
      { id: 'art', cats: { creative: 3 } },
      { id: 'fashion', cats: { fashion: 3 } },
      { id: 'fitness', cats: { wellbeing: 3 } },
      { id: 'eco', cats: { green: 3 } },
      { id: 'film', cats: { media: 3 } },
      { id: 'tutoring', cats: { service: 3 } },
    ],
  },
  {
    id: 'problem',
    options: [
      { id: 'snacks', cats: { food: 2, wellbeing: 2 } },
      { id: 'gadgets', cats: { tech: 3 } },
      { id: 'waste', cats: { green: 3 } },
      { id: 'boring', cats: { fashion: 2, creative: 2 } },
      { id: 'bored', cats: { media: 2, service: 1 } },
      { id: 'homework', cats: { service: 3 } },
    ],
  },
  {
    id: 'proud',
    options: [
      { id: 'food', cats: { food: 3 } },
      { id: 'app', cats: { tech: 3 } },
      { id: 'designs', cats: { creative: 2, fashion: 2 } },
      { id: 'waste', cats: { green: 3 } },
      { id: 'healthy', cats: { wellbeing: 3 } },
      { id: 'audience', cats: { media: 3 } },
      { id: 'helped', cats: { service: 3 } },
    ],
  },
  {
    id: 'word',
    options: [
      { id: 'tasty', cats: { food: 2 } },
      { id: 'smart', cats: { tech: 2 } },
      { id: 'beautiful', cats: { creative: 2 } },
      { id: 'stylish', cats: { fashion: 2 } },
      { id: 'active', cats: { wellbeing: 2 } },
      { id: 'green', cats: { green: 2 } },
      { id: 'fun', cats: { media: 2 } },
      { id: 'helpful', cats: { service: 2 } },
    ],
  },
  {
    id: 'trend',
    options: [
      { id: 'ai', cats: { tech: 2 } },
      { id: 'sustainable', cats: { green: 2 } },
      { id: 'healthy', cats: { wellbeing: 2, food: 1 } },
      { id: 'creators', cats: { media: 2 } },
      { id: 'handmade', cats: { creative: 2, fashion: 1 } },
      { id: 'foodTrends', cats: { food: 2 } },
    ],
  },
  {
    id: 'type',
    options: [
      { id: 'make', style: { type: 'product', handmade: true } },
      { id: 'resell', style: { type: 'product', handmade: false } },
      { id: 'service', style: { type: 'service' } },
      { id: 'unsure', style: {} },
    ],
  },
  {
    id: 'where',
    options: [
      { id: 'online', style: { mode: 'online' } },
      { id: 'inperson', style: { mode: 'inperson' } },
      { id: 'both', style: { mode: 'both' } },
      { id: 'unsure', style: {} },
    ],
  },
  {
    id: 'time',
    options: [
      { id: 'low', style: { effort: 1 } },
      { id: 'medium', style: { effort: 2 } },
      { id: 'high', style: { effort: 3 } },
    ],
  },
  {
    id: 'budget',
    options: [
      { id: 'low', style: { cost: 1 } },
      { id: 'medium', style: { cost: 2 } },
      { id: 'high', style: { cost: 3 } },
    ],
  },
];

export const ROLES = ['ceo', 'marketing', 'finance', 'operations', 'product'];

// Personal questions. 'choice' options score roles; 'scale' maps 1–5 onto role weights; 'text' is free entry.
export const PERSONAL_QUESTIONS = [
  { id: 'skills', kind: 'text' },
  {
    id: 'groupWork',
    kind: 'choice',
    options: [
      { id: 'lead', roles: { ceo: 3, operations: 1 } },
      { id: 'ideas', roles: { product: 3, marketing: 1 } },
      { id: 'numbers', roles: { finance: 3 } },
      { id: 'deadlines', roles: { operations: 3 } },
      { id: 'present', roles: { marketing: 3, ceo: 1 } },
    ],
  },
  {
    id: 'job',
    kind: 'choice',
    options: [
      { id: 'strategy', roles: { ceo: 3 } },
      { id: 'ads', roles: { marketing: 3 } },
      { id: 'money', roles: { finance: 3 } },
      { id: 'organise', roles: { operations: 3 } },
      { id: 'design', roles: { product: 3 } },
    ],
  },
  {
    id: 'friends',
    kind: 'choice',
    options: [
      { id: 'leader', roles: { ceo: 2 } },
      { id: 'creative', roles: { product: 2 } },
      { id: 'organised', roles: { operations: 2 } },
      { id: 'careful', roles: { finance: 2 } },
      { id: 'outgoing', roles: { marketing: 2 } },
    ],
  },
  { id: 'speaking', kind: 'scale', roles: { marketing: 1, ceo: 0.6 } },
  { id: 'numbersScale', kind: 'scale', roles: { finance: 1.2 } },
  { id: 'planning', kind: 'scale', roles: { operations: 1, ceo: 0.4 } },
];

export const MIN_MEMBERS = 2;
export const MAX_MEMBERS = 5;

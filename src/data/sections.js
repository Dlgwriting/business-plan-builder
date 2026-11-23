// Business plan sections. Wording (titles, labels, help, tips, examples) lives in the language files
// under plan.sections.<sectionId>. Site names in links are brand names and are not translated;
// each link's short description is under plan.links.<linkId>.
//
// Field kinds: text | textarea | select | chips | color | icon | table | team | finance
// required: counts towards the section being complete.

export const BRAND_COLORS = ['#0b2447', '#2259b5', '#00a3e0', '#0f9d76', '#65a30d', '#e8a33d', '#ea580c', '#dc2626', '#db2777', '#7c3aed', '#334155', '#111827'];
export const BRAND_ICONS = ['briefcase', 'store', 'utensils', 'cake', 'coffee', 'shirt', 'palette', 'camera', 'gamepad', 'music', 'dumbbell', 'leaf', 'sprout', 'laptop', 'wrench', 'book', 'heart', 'paw', 'gift', 'sparkles', 'rocket', 'globe'];

const L = (id, url, region) => ({ id, url, region });

export const SECTIONS = [
  {
    id: 'team',
    icon: 'users',
    fields: [{ name: 'team', kind: 'team', required: true }],
    links: [L('sixteen', 'https://www.16personalities.com/')],
  },
  {
    id: 'overview',
    icon: 'lightbulb',
    fields: [
      { name: 'businessName', kind: 'text', required: true, max: 60 },
      { name: 'tagline', kind: 'text', max: 90 },
      { name: 'description', kind: 'textarea', required: true },
      { name: 'problem', kind: 'textarea', required: true },
      { name: 'mission', kind: 'textarea' },
      { name: 'businessType', kind: 'select', options: ['schoolEnterprise', 'soleTrader', 'partnership', 'limitedCompany', 'socialEnterprise'] },
    ],
    links: [L('ssm', 'https://www.ssm.com.my/', 'MY'), L('govukStructure', 'https://www.gov.uk/set-up-business', 'UK')],
  },
  {
    id: 'brand',
    icon: 'palette',
    fields: [
      { name: 'brandColor', kind: 'color' },
      { name: 'brandIcon', kind: 'icon' },
      { name: 'brandWords', kind: 'text', required: true, max: 80 },
      { name: 'logoIdea', kind: 'textarea' },
    ],
    links: [L('canva', 'https://www.canva.com/'), L('coolors', 'https://coolors.co/'), L('googleFonts', 'https://fonts.google.com/')],
  },
  {
    id: 'customers',
    icon: 'target',
    fields: [
      { name: 'targetCustomer', kind: 'textarea', required: true },
      { name: 'customerNeeds', kind: 'textarea', required: true },
      { name: 'marketSize', kind: 'textarea' },
      { name: 'surveyFindings', kind: 'textarea' },
    ],
    links: [L('googleForms', 'https://forms.google.com/'), L('googleTrends', 'https://trends.google.com/'), L('dosm', 'https://open.dosm.gov.my/', 'MY'), L('worldBank', 'https://data.worldbank.org/'), L('statista', 'https://www.statista.com/')],
  },
  {
    id: 'competitors',
    icon: 'search',
    fields: [
      {
        name: 'competitors',
        kind: 'table',
        required: true,
        minRows: 3,
        maxRows: 6,
        columns: [
          { name: 'name', kind: 'text' },
          { name: 'product', kind: 'text' },
          { name: 'price', kind: 'text' },
          { name: 'strengths', kind: 'text' },
          { name: 'weaknesses', kind: 'text' },
        ],
      },
      { name: 'usp', kind: 'textarea', required: true },
    ],
    links: [L('googleMaps', 'https://www.google.com/maps'), L('shopee', 'https://shopee.com.my/', 'MY'), L('lazada', 'https://www.lazada.com.my/', 'MY'), L('amazon', 'https://www.amazon.com/')],
  },
  {
    id: 'swot',
    icon: 'grid',
    fields: [
      { name: 'swotStrengths', kind: 'textarea', required: true },
      { name: 'swotWeaknesses', kind: 'textarea', required: true },
      { name: 'swotOpportunities', kind: 'textarea', required: true },
      { name: 'swotThreats', kind: 'textarea', required: true },
    ],
  },
  {
    id: 'products',
    icon: 'tag',
    fields: [
      {
        name: 'products',
        kind: 'table',
        required: true,
        minRows: 1,
        maxRows: 8,
        columns: [
          { name: 'name', kind: 'text' },
          { name: 'description', kind: 'text' },
          { name: 'unitCost', kind: 'money' },
          { name: 'price', kind: 'money' },
          { name: 'margin', kind: 'computed' },
        ],
      },
      { name: 'pricingStrategy', kind: 'select', required: true, options: ['costPlus', 'competitive', 'premium', 'penetration', 'bundle'] },
      { name: 'pricingReason', kind: 'textarea', required: true },
    ],
    links: [L('alibaba', 'https://www.alibaba.com/'), L('aliexpress', 'https://www.aliexpress.com/'), L('shopee', 'https://shopee.com.my/', 'MY'), L('amazon', 'https://www.amazon.com/')],
  },
  {
    id: 'marketing',
    icon: 'megaphone',
    fields: [
      { name: 'strategies', kind: 'chips', required: true, min: 2, max: 4, options: ['social', 'posters', 'wordOfMouth', 'influencer', 'assembly', 'launchOffer', 'website', 'newsletter', 'popUp', 'partnership', 'loyalty', 'samples'] },
      { name: 'marketingDetails', kind: 'textarea', required: true },
      { name: 'launchPlan', kind: 'textarea' },
      { name: 'firstPost', kind: 'textarea' },
    ],
    links: [L('canva', 'https://www.canva.com/')],
  },
  {
    id: 'operations',
    icon: 'factory',
    fields: [
      { name: 'premises', kind: 'select', required: true, options: ['online', 'schoolStall', 'home', 'market', 'rented', 'shared'] },
      { name: 'premisesDetails', kind: 'textarea', required: true },
      { name: 'suppliers', kind: 'textarea', required: true },
      { name: 'equipment', kind: 'textarea' },
      { name: 'process', kind: 'textarea', required: true },
      { name: 'openingHours', kind: 'text' },
    ],
    links: [
      L('propertyGuru', 'https://www.propertyguru.com.my/', 'MY'),
      L('iproperty', 'https://www.iproperty.com.my/', 'MY'),
      L('mudah', 'https://www.mudah.my/', 'MY'),
      L('rightmoveCommercial', 'https://www.rightmove.co.uk/commercial-property-to-let.html', 'UK'),
      L('googleMaps', 'https://www.google.com/maps'),
      L('ikea', 'https://www.ikea.com/'),
      L('mrdiy', 'https://www.mrdiy.com/', 'MY'),
      L('alibaba', 'https://www.alibaba.com/'),
    ],
  },
  {
    id: 'costs',
    icon: 'wallet',
    fields: [
      { name: 'budget', kind: 'money', required: true },
      {
        name: 'startupCosts',
        kind: 'table',
        required: true,
        minRows: 1,
        maxRows: 15,
        total: 'cost',
        columns: [
          { name: 'item', kind: 'text' },
          { name: 'source', kind: 'text' },
          { name: 'cost', kind: 'money' },
        ],
      },
      { name: 'funding', kind: 'chips', required: true, min: 1, max: 4, options: ['savings', 'family', 'schoolGrant', 'preOrders', 'crowdfunding', 'sponsor', 'pitch'] },
      { name: 'fundingDetails', kind: 'textarea' },
    ],
    links: [L('shopee', 'https://shopee.com.my/', 'MY'), L('lazada', 'https://www.lazada.com.my/', 'MY'), L('amazon', 'https://www.amazon.com/'), L('aliexpress', 'https://www.aliexpress.com/'), L('canvaPrint', 'https://www.canva.com/print/'), L('xe', 'https://www.xe.com/currencyconverter/')],
  },
  {
    id: 'finance',
    icon: 'chart',
    fields: [{ name: 'finance', kind: 'finance', required: true }, { name: 'financeNotes', kind: 'textarea' }],
    links: [L('googleSheets', 'https://sheets.google.com/'), L('xe', 'https://www.xe.com/currencyconverter/')],
  },
  {
    id: 'risks',
    icon: 'shield',
    fields: [
      {
        name: 'risks',
        kind: 'table',
        required: true,
        minRows: 2,
        maxRows: 8,
        columns: [
          { name: 'risk', kind: 'text' },
          { name: 'likelihood', kind: 'level' },
          { name: 'impact', kind: 'level' },
          { name: 'plan', kind: 'text' },
        ],
      },
      { name: 'legal', kind: 'textarea', required: true },
      { name: 'sustainability', kind: 'textarea', required: true },
    ],
    links: [L('foodSafetyMY', 'https://fsq.moh.gov.my/', 'MY'), L('foodSafetyUK', 'https://www.gov.uk/guidance/starting-a-food-business', 'UK'), L('pdpMY', 'https://www.pdp.gov.my/', 'MY'), L('sdgs', 'https://sdgs.un.org/goals')],
  },
  {
    id: 'milestones',
    icon: 'calendar',
    fields: [
      {
        name: 'milestones',
        kind: 'table',
        required: true,
        minRows: 3,
        maxRows: 15,
        columns: [
          { name: 'task', kind: 'text' },
          { name: 'owner', kind: 'member' },
          { name: 'deadline', kind: 'date' },
        ],
      },
      { name: 'successMeasures', kind: 'textarea' },
    ],
    links: [L('trello', 'https://trello.com/'), L('googleCalendar', 'https://calendar.google.com/')],
  },
  {
    id: 'pitch',
    icon: 'mic',
    fields: [
      { name: 'executiveSummary', kind: 'textarea', required: true },
      { name: 'elevatorPitch', kind: 'textarea', required: true, pitch: true },
    ],
  },
];

export const sectionById = (id) => SECTIONS.find((s) => s.id === id);

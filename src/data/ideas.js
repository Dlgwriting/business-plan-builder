// Business idea catalogue. Names, descriptions and starter text live in the language files under ideas.<id>.
// cats: interest fit (0–3). type: product | service. mode: online | inperson | both.
// cost / effort: 1 (low) – 3 (high) start-up money and weekly time.
// handmade: the group makes the product itself.

export const IDEAS = [
  { id: 'bakery', cats: { food: 3, creative: 1 }, type: 'product', mode: 'inperson', cost: 2, effort: 2, handmade: true },
  { id: 'snackBoxes', cats: { food: 2, wellbeing: 2 }, type: 'product', mode: 'both', cost: 2, effort: 2, handmade: true },
  { id: 'drinksStall', cats: { food: 3, wellbeing: 1 }, type: 'product', mode: 'inperson', cost: 2, effort: 2, handmade: true },
  { id: 'techHelp', cats: { tech: 3, service: 2 }, type: 'service', mode: 'inperson', cost: 1, effort: 2 },
  { id: 'websites', cats: { tech: 3, creative: 1 }, type: 'service', mode: 'online', cost: 1, effort: 3 },
  { id: 'stickers', cats: { creative: 3, fashion: 1 }, type: 'product', mode: 'both', cost: 2, effort: 2, handmade: true },
  { id: 'printedMerch', cats: { fashion: 3, creative: 2 }, type: 'product', mode: 'both', cost: 2, effort: 2, handmade: true },
  { id: 'upcycled', cats: { fashion: 2, green: 3, creative: 1 }, type: 'product', mode: 'both', cost: 1, effort: 2, handmade: true },
  { id: 'jewellery', cats: { creative: 2, fashion: 2 }, type: 'product', mode: 'both', cost: 1, effort: 2, handmade: true },
  { id: 'sportsCoaching', cats: { wellbeing: 3, service: 2 }, type: 'service', mode: 'inperson', cost: 1, effort: 2 },
  { id: 'soap', cats: { wellbeing: 2, green: 2, creative: 1 }, type: 'product', mode: 'both', cost: 2, effort: 3, handmade: true },
  { id: 'plants', cats: { green: 3, creative: 1 }, type: 'product', mode: 'inperson', cost: 2, effort: 1, handmade: false },
  { id: 'ecoProducts', cats: { green: 3, wellbeing: 1 }, type: 'product', mode: 'both', cost: 2, effort: 1, handmade: false },
  { id: 'gamingEvents', cats: { media: 3, tech: 1, service: 1 }, type: 'service', mode: 'inperson', cost: 2, effort: 2 },
  { id: 'photoVideo', cats: { media: 3, creative: 2 }, type: 'service', mode: 'both', cost: 1, effort: 2 },
  { id: 'tutoring', cats: { service: 3, tech: 1 }, type: 'service', mode: 'both', cost: 1, effort: 2 },
  { id: 'events', cats: { service: 3, creative: 1, food: 1 }, type: 'service', mode: 'inperson', cost: 2, effort: 3 },
  { id: 'petCare', cats: { service: 2, wellbeing: 1, green: 1 }, type: 'service', mode: 'inperson', cost: 1, effort: 2 },
  { id: 'digitalArt', cats: { creative: 3, tech: 1, media: 1 }, type: 'product', mode: 'online', cost: 1, effort: 2, handmade: true },
  { id: 'giftBoxes', cats: { creative: 1, food: 1, fashion: 1 }, type: 'product', mode: 'both', cost: 2, effort: 2, handmade: false },
];

export const ideaById = (id) => IDEAS.find((i) => i.id === id);

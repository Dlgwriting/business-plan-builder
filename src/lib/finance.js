// Money helpers and the break-even / forecast model used by the Finance section and the PDF.

/** Parses a typed amount ("1,200.50", "12") into a non-negative number, or null if it is not one. */
export function parseMoney(value) {
  if (value === null || value === undefined) return null;
  const cleaned = String(value).replace(/[,\s]/g, '');
  if (cleaned === '' || !/^\d*\.?\d+$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function formatMoney(amount, currency) {
  if (amount === null || amount === undefined || !Number.isFinite(amount)) return '–';
  const digits = currency.decimals ?? 2;
  const sign = amount < 0 ? '-' : '';
  const body = Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  return `${sign}${currency.symbol}${body}`;
}

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

export function startupTotal(plan) {
  return (plan.startupCosts || []).reduce((sum, row) => sum + (parseMoney(row.cost) ?? 0), 0);
}

/** Margin for one product row: profit per unit and percentage of price. */
export function productMargin(row) {
  const cost = parseMoney(row.unitCost);
  const price = parseMoney(row.price);
  if (cost === null || price === null || price === 0) return null;
  return { profit: price - cost, percent: ((price - cost) / price) * 100 };
}

/**
 * Break-even and a 6-month forecast.
 * Average price and unit cost come from the product table unless the team overrides them.
 * Growth is the expected month-on-month rise in units sold, as a percentage.
 */
export function financeModel(plan) {
  const f = plan.finance || {};
  const products = (plan.products || []).filter((p) => parseMoney(p.price) !== null);
  const price = parseMoney(f.avgPrice) ?? mean(products.map((p) => parseMoney(p.price)));
  const unitCost = parseMoney(f.avgUnitCost) ?? mean(products.map((p) => parseMoney(p.unitCost) ?? 0));
  const fixed = parseMoney(f.fixedCosts) ?? 0;
  const units = parseMoney(f.unitsPerMonth);
  const growth = (parseMoney(f.growth) ?? 0) / 100;
  const startup = startupTotal(plan);

  if (price === null || unitCost === null) return { ready: false, price, unitCost, fixed, units, startup };

  const contribution = price - unitCost;
  const breakEvenUnits = contribution > 0 ? Math.ceil(fixed / contribution) : null;
  const months = [];
  let cumulative = -startup;
  let paybackMonth = null;
  for (let m = 1; m <= 6; m++) {
    const sold = units === null ? 0 : Math.round(units * (1 + growth) ** (m - 1));
    const revenue = sold * price;
    const costs = sold * unitCost + fixed;
    const profit = revenue - costs;
    cumulative += profit;
    if (paybackMonth === null && cumulative >= 0 && startup > 0) paybackMonth = m;
    months.push({ month: m, sold, revenue, costs, profit, cumulative });
  }
  return { ready: units !== null, price, unitCost, fixed, units, growth, startup, contribution, breakEvenUnits, months, paybackMonth };
}

export const CURRENCIES = [
  { code: 'MYR', symbol: 'RM', decimals: 2 },
  { code: 'USD', symbol: '$', decimals: 2 },
  { code: 'GBP', symbol: '£', decimals: 2 },
  { code: 'EUR', symbol: '€', decimals: 2 },
  { code: 'CNY', symbol: '¥', decimals: 2 },
  { code: 'HKD', symbol: 'HK$', decimals: 2 },
  { code: 'SGD', symbol: 'S$', decimals: 2 },
  { code: 'KRW', symbol: '₩', decimals: 0 },
  { code: 'RUB', symbol: '₽', decimals: 2 },
  { code: 'THB', symbol: '฿', decimals: 2 },
  { code: 'VND', symbol: '₫', decimals: 0 },
  { code: 'AED', symbol: 'AED ', decimals: 2 },
  { code: 'CHF', symbol: 'CHF ', decimals: 2 },
];
export const currencyByCode = (code) => CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];

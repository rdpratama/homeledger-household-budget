// Hartono Home Ledger — seed data and state.
// One ledger, one source of truth: every page computes its figures from these
// transactions, so the dashboard, budget bars and insights always agree.
// November 2026, US dollars. Income $5,870. Spending $3,033.64 (excluding
// the $800 savings transfer). Remaining $2,036.36.

export const CATEGORIES = [
  { name: 'Housing', color: '#1e5c46', budget: 1450 },
  { name: 'Groceries', color: '#2f7d6d', budget: 620 },
  { name: 'Transport', color: '#2f5d8a', budget: 280 },
  { name: 'Dining Out', color: '#d98e1f', budget: 240 },
  { name: 'Utilities', color: '#6b7a72', budget: 310 },
  { name: 'Entertainment', color: '#8a5a9e', budget: 150 },
  { name: 'Health', color: '#b23a2e', budget: 180 },
  { name: 'Kids', color: '#4a90a4', budget: 220 },
  { name: 'Shopping', color: '#a4713a', budget: 200 },
  { name: 'Savings', color: '#143d2f', budget: 800 },
];

export const SEED_TRANSACTIONS = [
  { id: 't01', date: '2026-11-01', desc: "Dana's salary", cat: 'Income', type: 'income', amount: 3400 },
  { id: 't02', date: '2026-11-01', desc: 'Monthly rent', cat: 'Housing', type: 'expense', amount: 1450 },
  { id: 't03', date: '2026-11-01', desc: 'Transfer to savings', cat: 'Savings', type: 'expense', amount: 800 },
  { id: 't04', date: '2026-11-01', desc: 'Gym — Dana', cat: 'Health', type: 'expense', amount: 35 },
  { id: 't05', date: '2026-11-02', desc: 'Family dinner — warteg', cat: 'Dining Out', type: 'expense', amount: 34.5 },
  { id: 't06', date: '2026-11-03', desc: 'Weekly shop — Super Indo', cat: 'Groceries', type: 'expense', amount: 86.4 },
  { id: 't07', date: '2026-11-03', desc: 'Streaming — Netflix', cat: 'Entertainment', type: 'expense', amount: 15.99 },
  { id: 't08', date: '2026-11-04', desc: 'Fuel — Pertamina', cat: 'Transport', type: 'expense', amount: 42 },
  { id: 't09', date: '2026-11-05', desc: "Maya's salary", cat: 'Income', type: 'income', amount: 2150 },
  { id: 't10', date: '2026-11-05', desc: 'Internet — IndiHome', cat: 'Utilities', type: 'expense', amount: 59 },
  { id: 't11', date: '2026-11-06', desc: 'Metro cards top-up', cat: 'Transport', type: 'expense', amount: 18 },
  { id: 't12', date: '2026-11-06', desc: 'School lunch money', cat: 'Kids', type: 'expense', amount: 22 },
  { id: 't13', date: '2026-11-07', desc: 'Weekly shop — Super Indo', cat: 'Groceries', type: 'expense', amount: 74.25 },
  { id: 't14', date: '2026-11-07', desc: 'Mobile phones — Telkomsel', cat: 'Utilities', type: 'expense', amount: 45 },
  { id: 't15', date: '2026-11-08', desc: 'Lunch out — Maya', cat: 'Dining Out', type: 'expense', amount: 28.75 },
  { id: 't16', date: '2026-11-09', desc: 'Parking — mall', cat: 'Transport', type: 'expense', amount: 12 },
  { id: 't17', date: '2026-11-09', desc: 'School supplies', cat: 'Kids', type: 'expense', amount: 38.75 },
  { id: 't18', date: '2026-11-10', desc: 'Weekly shop — farmers market', cat: 'Groceries', type: 'expense', amount: 92.1 },
  { id: 't19', date: '2026-11-10', desc: 'Electricity — PLN', cat: 'Utilities', type: 'expense', amount: 96.4 },
  { id: 't20', date: '2026-11-11', desc: 'Pharmacy — vitamins', cat: 'Health', type: 'expense', amount: 27.4 },
  { id: 't21', date: '2026-11-12', desc: 'Fuel — Pertamina', cat: 'Transport', type: 'expense', amount: 38.5 },
  { id: 't22', date: '2026-11-12', desc: 'Water — PAM Jaya', cat: 'Utilities', type: 'expense', amount: 34.8 },
  { id: 't23', date: '2026-11-13', desc: 'Cinema — family movie', cat: 'Entertainment', type: 'expense', amount: 32 },
  { id: 't24', date: '2026-11-14', desc: 'Freelance design work', cat: 'Income', type: 'income', amount: 320 },
  { id: 't25', date: '2026-11-14', desc: 'Weekly shop — Super Indo', cat: 'Groceries', type: 'expense', amount: 68.75 },
  { id: 't26', date: '2026-11-15', desc: 'Pizza night', cat: 'Dining Out', type: 'expense', amount: 41.2 },
  { id: 't27', date: '2026-11-15', desc: 'Clothes — Maya', cat: 'Shopping', type: 'expense', amount: 62.4 },
  { id: 't28', date: '2026-11-16', desc: 'Cooking gas refill', cat: 'Utilities', type: 'expense', amount: 28.5 },
  { id: 't29', date: '2026-11-17', desc: "Books — kids' reading", cat: 'Entertainment', type: 'expense', amount: 18.5 },
  { id: 't30', date: '2026-11-18', desc: 'Weekly shop — Super Indo', cat: 'Groceries', type: 'expense', amount: 81.3 },
  { id: 't31', date: '2026-11-18', desc: 'Dentist — Maya check-up', cat: 'Health', type: 'expense', amount: 85 },
  { id: 't32', date: '2026-11-19', desc: 'Metro cards top-up', cat: 'Transport', type: 'expense', amount: 18 },
  { id: 't33', date: '2026-11-20', desc: 'Fuel — Pertamina', cat: 'Transport', type: 'expense', amount: 45.2 },
  { id: 't34', date: '2026-11-21', desc: 'Weekly shop — farmers market', cat: 'Groceries', type: 'expense', amount: 77.9 },
  { id: 't35', date: '2026-11-21', desc: "Kids' shoes — Raka", cat: 'Kids', type: 'expense', amount: 54.9 },
  { id: 't36', date: '2026-11-22', desc: 'Sunday brunch', cat: 'Dining Out', type: 'expense', amount: 36.8 },
  { id: 't37', date: '2026-11-23', desc: 'Household — new curtains', cat: 'Shopping', type: 'expense', amount: 43.2 },
  { id: 't38', date: '2026-11-25', desc: 'Weekly shop — Super Indo', cat: 'Groceries', type: 'expense', amount: 64.55 },
  { id: 't39', date: '2026-11-26', desc: 'Coffee & cake', cat: 'Dining Out', type: 'expense', amount: 24.6 },
];

export const SEED_GOALS = [
  { id: 'g1', name: 'Emergency fund', target: 5000, saved: 3200, note: '6 months of essentials, for peace of mind.' },
  { id: 'g2', name: 'Family holiday', target: 1800, saved: 950, note: 'A week in Bali next school break.' },
  { id: 'g3', name: 'New fridge', target: 650, saved: 410, note: 'The old one hums like a motorbike.' },
];

export const SEED_BILLS = [
  { name: 'Rent', due: '1 Dec 2026', amount: 1450 },
  { name: 'Internet — IndiHome', due: '5 Dec 2026', amount: 59 },
  { name: 'Mobile phones — Telkomsel', due: '7 Dec 2026', amount: 45 },
  { name: 'Electricity — PLN', due: '10 Dec 2026', amount: 96.4 },
  { name: 'Water — PAM Jaya', due: '12 Dec 2026', amount: 34.8 },
];

// Monthly spending (excluding savings transfers), Jun–Nov 2026.
export const TREND = [
  { month: 'Jun', spent: 2780 },
  { month: 'Jul', spent: 2940 },
  { month: 'Aug', spent: 3120 },
  { month: 'Sep', spent: 2860 },
  { month: 'Oct', spent: 3010 },
  { month: 'Nov', spent: 3033.64 },
];

const KEY = 'hartono-home-ledger-v1';

function freshState() {
  return {
    transactions: SEED_TRANSACTIONS.map((t) => ({ ...t })),
    budgets: Object.fromEntries(CATEGORIES.map((c) => [c.name, c.budget])),
    goals: SEED_GOALS.map((g) => ({ ...g })),
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return freshState();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.transactions) || !Array.isArray(parsed.goals)) return freshState();
    return parsed;
  } catch {
    return freshState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetState() {
  localStorage.removeItem(KEY);
  return freshState();
}

/** Money helpers. */
export const money = (n) => `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const round2 = (n) => Math.round(n * 100) / 100;

export function totals(state) {
  const income = round2(state.transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0));
  const saved = round2(state.transactions.filter((t) => t.cat === 'Savings').reduce((s, t) => s + t.amount, 0));
  const spending = round2(
    state.transactions.filter((t) => t.type === 'expense' && t.cat !== 'Savings').reduce((s, t) => s + t.amount, 0),
  );
  const out = round2(spending + saved);
  return { income, spending, saved, out, remaining: round2(income - out) };
}

export function spentByCategory(state) {
  const out = {};
  for (const c of CATEGORIES) out[c.name] = 0;
  for (const t of state.transactions) {
    if (t.type === 'expense' && Object.hasOwn(out, t.cat)) out[t.cat] = round2(out[t.cat] + t.amount);
  }
  return out;
}

export function daysLeftInMonth(now = new Date()) {
  const last = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return Math.max(1, last - now.getDate() + 1);
}

export function categoryColor(name) {
  return CATEGORIES.find((c) => c.name === name)?.color ?? '#6b7a72';
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

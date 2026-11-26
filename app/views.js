// Hartono Home Ledger — page renderers: dashboard, transactions, budget,
// goals, insights. Each returns HTML; main.js wires the controls after render.
import { CATEGORIES, SEED_BILLS, TREND, categoryColor, daysLeftInMonth, esc, money, round2, spentByCategory, totals } from './store.js';
import { drawBars, drawDonut } from './charts.js';

function budgetBarRow(cat, spent, limit, headRight = null) {
  const pct = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0;
  const cls = spent > limit ? 'over' : pct >= 85 ? 'warn' : '';
  const flag = spent > limit
    ? '<span class="pill over">Over budget</span>'
    : pct >= 85 ? '<span class="pill">Nearly there</span>' : '<span class="pill ok">On track</span>';
  const right = headRight ?? `<span>${money(spent)} of ${money(limit)}</span>`;
  return `<div class="budget-row">
    <div class="row-head"><strong><span class="cat-dot" style="background:${cat.color}"></span>${esc(cat.name)}</strong>
    ${right}</div>
    <div class="bar" role="img" aria-label="${esc(cat.name)} ${pct}% of budget used"><span class="${cls}" style="width:${pct}%"></span></div>
    <div class="row-foot"><span>${pct}% used</span><span>${flag} ${money(round2(limit - spent))} left</span></div>
  </div>`;
}

export function renderDashboard(state) {
  const t = totals(state);
  const spent = spentByCategory(state);
  const days = daysLeftInMonth();
  const perDay = money(round2(t.remaining / days));
  const slices = CATEGORIES.filter((c) => c.name !== 'Savings' && spent[c.name] > 0)
    .map((c) => ({ label: c.name, value: spent[c.name], color: c.color }));
  const topCats = [...CATEGORIES].filter((c) => c.name !== 'Savings')
    .sort((a, b) => spent[b.name] - spent[a.name]).slice(0, 5);
  return `
  <div class="page-head">
    <h1>November at a glance</h1>
    <p>Income, spending and what is left — all from one ledger of ${state.transactions.length} transactions.
    ${days} day${days === 1 ? '' : 's'} left in November.</p>
  </div>
  <div class="grid grid-3">
    <section class="card stat"><div class="label">Income</div><div class="value pos">${money(t.income)}</div>
      <div class="note">Salaries $5,550 + freelance $320</div></section>
    <section class="card stat"><div class="label">Spending</div><div class="value">${money(t.spending)}</div>
      <div class="note">Across 9 categories, savings excluded</div></section>
    <section class="card stat"><div class="label">Saved this month</div><div class="value pos">${money(t.saved)}</div>
      <div class="note">${Math.round((t.saved / t.income) * 100)}% of income set aside</div></section>
  </div>
  <div class="grid grid-main" style="margin-top:16px">
    <section class="card">
      <h2>Where the money went</h2>
      <p class="sub">Spending by category, November 2026</p>
      <div class="chart-wrap">
        <canvas id="donut" width="220" height="220" role="img" aria-label="Donut chart of spending by category"></canvas>
        <div class="legend">${slices.map((s) => `<span><span class="cat-dot" style="background:${s.color}"></span>${esc(s.label)} · ${money(s.value)}</span>`).join('')}</div>
      </div>
    </section>
    <section class="card stat">
      <div class="label">Money left</div>
      <div class="value">${money(t.remaining)}</div>
      <div class="note">Income minus everything out (${money(t.out)})</div>
      <div class="kv" style="margin-top:12px"><span>Safe to spend per day</span><span>${perDay}</span></div>
      <div class="kv"><span>Days left in November</span><span>${days}</span></div>
      <div class="kv"><span>Biggest expense</span><span>Rent · $1,450.00</span></div>
      <p style="margin-top:12px"><a class="btn-ghost" href="#/transactions" style="text-decoration:none;display:inline-block">See every transaction →</a></p>
    </section>
  </div>
  <div class="grid grid-main" style="margin-top:16px">
    <section class="card">
      <h2>Budget watch</h2>
      <p class="sub">The five categories closest to their limit</p>
      ${topCats.map((c) => budgetBarRow(c, spent[c.name], state.budgets[c.name])).join('')}
      <p style="margin-top:12px"><a href="#/budget">Open the full budget →</a></p>
    </section>
    <div class="grid" style="grid-template-columns:1fr">
      <section class="card">
        <h2>Upcoming bills</h2>
        <p class="sub">December, in due order</p>
        ${SEED_BILLS.map((b) => `<div class="bill"><span>${esc(b.name)}<span class="due"> · due ${esc(b.due)}</span></span><strong>${money(b.amount)}</strong></div>`).join('')}
      </section>
      <section class="card">
        <h2>Savings goals</h2>
        <p class="sub">${state.goals.reduce((s, g) => s + g.saved, 0) > 0 ? money(state.goals.reduce((s, g) => s + g.saved, 0)) + ' saved across ' + state.goals.length + ' goals' : ''}</p>
        ${state.goals.map((g) => {
          const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
          return `<div class="goal"><div class="goal-head"><strong>${esc(g.name)}</strong><span>${money(g.saved)} of ${money(g.target)}</span></div>
          <div class="bar"><span style="width:${pct}%"></span></div><div class="goal-foot"><span>${pct}% there</span></div></div>`;
        }).join('')}
        <p style="margin-top:12px"><a href="#/goals">Add money to a goal →</a></p>
      </section>
    </div>
  </div>`;
}

export function afterDashboard() {
  const canvas = document.getElementById('donut');
  if (!canvas) return;
  const state = window.__ledgerState;
  const spent = spentByCategory(state);
  const slices = CATEGORIES.filter((c) => c.name !== 'Savings' && spent[c.name] > 0)
    .map((c) => ({ label: c.name, value: spent[c.name], color: c.color }));
  drawDonut(canvas, slices);
}

function txRow(t) {
  const sign = t.type === 'income' ? '+' : '−';
  const cls = t.type === 'income' ? 'amount-in' : 'amount-out';
  return `<tr>
    <td class="hide-phone">${esc(t.date)}</td>
    <td>${esc(t.desc)}<span class="cat">${esc(t.cat)}</span></td>
    <td class="num ${cls}">${sign}${money(t.amount)}</td>
    <td><button type="button" class="btn-ghost btn-small btn-danger" data-delete="${esc(t.id)}">Delete</button></td>
  </tr>`;
}

export function renderTransactions(state, filter = {}) {
  const cats = CATEGORIES.map((c) => c.name);
  let list = [...state.transactions].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  if (filter.cat) list = list.filter((t) => t.cat === filter.cat);
  if (filter.type) list = list.filter((t) => t.type === filter.type);
  if (filter.q) {
    const q = filter.q.toLowerCase();
    list = list.filter((t) => t.desc.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q));
  }
  const t = totals(state);
  return `
  <div class="page-head">
    <h1>Transactions</h1>
    <p>${state.transactions.length} entries in November. Income ${money(t.income)}, spending ${money(t.spending)},
    savings ${money(t.saved)}. Add one below and every total on the site updates at once.</p>
  </div>
  <section class="card">
    <div class="toolbar">
      <div class="field grow"><label for="f-q">Search</label><input id="f-q" type="search" placeholder="e.g. rent, groceries…" value="${esc(filter.q ?? '')}"></div>
      <div class="field"><label for="f-cat">Category</label><select id="f-cat"><option value="">All categories</option>
        <option value="Income" ${filter.cat === 'Income' ? 'selected' : ''}>Income</option>
        ${cats.map((c) => `<option ${filter.cat === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div>
      <div class="field"><label for="f-type">Type</label><select id="f-type"><option value="">All</option>
        <option value="income" ${filter.type === 'income' ? 'selected' : ''}>Income</option>
        <option value="expense" ${filter.type === 'expense' ? 'selected' : ''}>Expenses</option></select></div>
    </div>
    ${list.length === 0
      ? '<p class="empty">No transactions match. Clear the filters to see the whole ledger.</p>'
      : `<table><thead><tr><th class="hide-phone">Date</th><th>Description</th><th class="num">Amount</th><th><span class="muted">Action</span></th></tr></thead>
      <tbody>${list.map(txRow).join('')}</tbody></table>`}
  </section>
  <section class="card" style="margin-top:16px">
    <h2>Add a transaction</h2>
    <p class="sub">It is saved on this device and counts in every total immediately.</p>
    <form id="add-tx">
      <div class="form-row">
        <div class="field"><label for="tx-date">Date</label><input id="tx-date" type="date" value="2026-11-26" required></div>
        <div class="field"><label for="tx-amount">Amount (USD)</label><input id="tx-amount" type="number" min="0.01" step="0.01" placeholder="25.00" required></div>
      </div>
      <div class="field"><label for="tx-desc">Description</label><input id="tx-desc" type="text" maxlength="80" placeholder="e.g. Weekly shop — Super Indo" required></div>
      <div class="form-row">
        <div class="field"><label for="tx-cat">Category</label><select id="tx-cat">
          <option value="Income">Income</option>${cats.map((c) => `<option>${esc(c)}</option>`).join('')}</select></div>
        <div class="field"><label for="tx-type">Type</label><select id="tx-type"><option value="expense">Expense</option><option value="income">Income</option></select></div>
      </div>
      <button class="btn" type="submit">Add transaction</button>
    </form>
  </section>`;
}

export function renderBudget(state) {
  const spent = spentByCategory(state);
  const t = totals(state);
  const needsCats = ['Housing', 'Groceries', 'Transport', 'Utilities', 'Health', 'Kids'];
  const wantsCats = ['Dining Out', 'Entertainment', 'Shopping'];
  const needs = round2(needsCats.reduce((s, c) => s + spent[c], 0));
  const wants = round2(wantsCats.reduce((s, c) => s + spent[c], 0));
  const totalBudget = CATEGORIES.reduce((s, c) => s + state.budgets[c.name], 0);
  const pct = (n) => (t.out > 0 ? Math.round((n / t.out) * 100) : 0);
  return `
  <div class="page-head">
    <h1>Budget for November</h1>
    <p>Monthly limits per category. Total budget ${money(totalBudget)} against ${money(t.out)} spent so far.
    Edit any limit inline — the bars and the 50/30/20 split update at once.</p>
  </div>
  <div class="grid grid-main">
    <section class="card">
      <h2>Category limits</h2>
      ${CATEGORIES.map((c) => budgetBarRow(c, spent[c.name], state.budgets[c.name],
        `<span>${money(spent[c.name])} of <label class="muted" for="limit-${esc(c.name)}">limit</label>
        <input id="limit-${esc(c.name)}" data-limit="${esc(c.name)}" type="number" min="0" step="10" value="${state.budgets[c.name]}" style="width:96px;display:inline-block;padding:5px 8px" aria-label="Monthly limit for ${esc(c.name)}"></span>`)).join('')}
    </section>
    <div class="grid" style="grid-template-columns:1fr">
      <section class="card">
        <h2>The 50/30/20 rule</h2>
        <p class="sub">How November's ${money(t.out)} actually splits</p>
        <div class="kv"><span>Needs — ${pct(needs)}% (aim 50%)</span><span>${money(needs)}</span></div>
        <div class="kv"><span>Wants — ${pct(wants)}% (aim 30%)</span><span>${money(wants)}</span></div>
        <div class="kv"><span>Savings — ${pct(t.saved)}% (aim 20%)</span><span>${money(t.saved)}</span></div>
        <p style="margin-top:10px">Needs run high this month because rent is a fixed $1,450.
        Wants are well under the 30% guide, which is why the family still saved ${money(t.saved)}.</p>
      </section>
      <section class="card">
        <h2>Over or nearly over</h2>
        <p class="sub">Categories at 85% of their limit or more</p>
        ${CATEGORIES.filter((c) => state.budgets[c.name] > 0 && spent[c.name] / state.budgets[c.name] >= 0.85)
          .map((c) => `<div class="kv"><span>${esc(c.name)}</span><span>${Math.round((spent[c.name] / state.budgets[c.name]) * 100)}% · ${money(spent[c.name])} of ${money(state.budgets[c.name])}</span></div>`).join('')
          || '<p class="empty">Nothing is near its limit.</p>'}
      </section>
    </div>
  </div>`;
}

export function renderGoals(state) {
  const totalSaved = state.goals.reduce((s, g) => s + g.saved, 0);
  const totalTarget = state.goals.reduce((s, g) => s + g.target, 0);
  return `
  <div class="page-head">
    <h1>Savings goals</h1>
    <p>${money(totalSaved)} saved toward ${money(totalTarget)} across ${state.goals.length} goals.
    Add money to any goal — the progress bar moves right away.</p>
  </div>
  <div class="grid grid-2">
    ${state.goals.map((g) => {
      const pct = Math.min(100, Math.round((g.saved / g.target) * 100));
      const left = round2(g.target - g.saved);
      return `<section class="card">
        <div class="goal-head"><h2>${esc(g.name)}</h2><span>${money(g.saved)} of ${money(g.target)}</span></div>
        <p class="sub">${esc(g.note)}</p>
        <div class="bar" role="img" aria-label="${esc(g.name)} ${pct}% funded"><span style="width:${pct}%"></span></div>
        <div class="goal-foot"><span>${pct}% funded · ${left > 0 ? money(left) + ' to go' : 'Fully funded!'}</span></div>
        <form class="add-money" data-goal="${esc(g.id)}" style="margin-top:12px;display:flex;gap:8px">
          <input type="number" min="1" step="1" placeholder="Amount" required aria-label="Amount to add to ${esc(g.name)}" style="flex:1">
          <button class="btn btn-small" type="submit">Add money</button>
        </form>
      </section>`;
    }).join('')}
  </div>
  <section class="card" style="margin-top:16px">
    <h2>Start a new goal</h2>
    <form id="add-goal">
      <div class="form-row">
        <div class="field"><label for="goal-name">Goal name</label><input id="goal-name" type="text" maxlength="60" placeholder="e.g. New washing machine" required></div>
        <div class="field"><label for="goal-target">Target (USD)</label><input id="goal-target" type="number" min="1" step="1" placeholder="500" required></div>
      </div>
      <button class="btn" type="submit">Create goal</button>
    </form>
  </section>`;
}

export function renderInsights(state) {
  const spent = spentByCategory(state);
  const t = totals(state);
  const top = [...CATEGORIES].filter((c) => c.name !== 'Savings')
    .sort((a, b) => spent[b.name] - spent[a.name]);
  const biggest = [...state.transactions].filter((x) => x.type === 'expense')
    .sort((a, b) => b.amount - a.amount)[0];
  const daysElapsed = 26;
  const groceryProj = round2((spent.Groceries / daysElapsed) * 30);
  const groceryPct = Math.round((spent.Groceries / state.budgets.Groceries) * 100);
  const avgMonth = round2(TREND.slice(0, 5).reduce((s, d) => s + d.spent, 0) / 5);
  const tips = [
    `<strong>Groceries are at ${groceryPct}% of budget.</strong> At the current pace they project to ${money(groceryProj)} for the month — ${groceryProj > state.budgets.Groceries ? money(round2(groceryProj - state.budgets.Groceries)) + ' over the limit' : 'just inside the limit'}. Cooking two more nights a week instead of ordering in saves roughly $46.`,
    `<strong>Housing is the anchor: ${money(spent.Housing)} of ${money(t.spending)} spending (${Math.round((spent.Housing / t.spending) * 100)}%).</strong> It is fixed, so the levers are the flexible categories: dining, shopping and entertainment together are only ${money(round2(spent['Dining Out'] + spent.Entertainment + spent.Shopping))}.`,
    `<strong>November is running ${money(round2(t.spending - avgMonth))} above the Jun–Oct average of ${money(avgMonth)}.</strong> The gap is mostly the dentist visit ($85) and the kids' shoes ($54.90) — one-off costs, not a new habit.`,
    `<strong>Savings rate ${Math.round((t.saved / t.income) * 100)}%.</strong> The $800 transfer plus ${money(t.remaining)} still unspent means the family can move another ${money(round2(t.remaining * 0.5))} to the emergency fund and still keep ${money(round2(t.remaining * 0.5))} as a cushion.`,
  ];
  return `
  <div class="page-head">
    <h1>Insights</h1>
    <p>What six months of spending actually say — computed from the ledger, not guessed.</p>
  </div>
  <section class="card">
    <h2>Spending trend — last 6 months</h2>
    <p class="sub">Monthly spending, savings transfers excluded. November is the amber bar.</p>
    <canvas id="trend" width="560" height="240" role="img" aria-label="Bar chart of monthly spending, June to November"></canvas>
  </section>
  <div class="grid grid-main" style="margin-top:16px">
    <section class="card">
      <h2>Top categories in November</h2>
      ${top.slice(0, 5).map((c, i) => `<div class="kv"><span>${i + 1}. ${esc(c.name)}</span><span>${money(spent[c.name])} · ${Math.round((spent[c.name] / t.spending) * 100)}%</span></div>`).join('')}
      <div class="kv"><span>Biggest single expense</span><span>${esc(biggest.desc)} · ${money(biggest.amount)}</span></div>
      <div class="kv"><span>Average transaction</span><span>${money(round2(t.spending / state.transactions.filter((x) => x.type === 'expense' && x.cat !== 'Savings').length))}</span></div>
    </section>
    <section class="card">
      <h2>What to do next</h2>
      ${tips.map((tip) => `<div class="tip">${tip}</div>`).join('')}
    </section>
  </div>`;
}

export function afterInsights() {
  const canvas = document.getElementById('trend');
  if (!canvas) return;
  drawBars(canvas, TREND);
}

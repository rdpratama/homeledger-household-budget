// Hartono Home Ledger — bootstrap and hash router.
// Routes: #/dashboard, #/transactions, #/budget, #/goals, #/insights.
// State lives in localStorage; every change re-renders the current page.
import { loadState, resetState, saveState } from './store.js';
import { afterDashboard, afterInsights, renderBudget, renderDashboard, renderGoals, renderInsights, renderTransactions } from './views.js';

let state = loadState();
window.__ledgerState = state;
let txFilter = {};

const view = document.getElementById('view');

function setActive(route) {
  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route);
  });
}

function render() {
  const hash = location.hash || '#/dashboard';
  const route = hash.replace(/^#\//, '').split('?')[0] || 'dashboard';
  setActive(route);
  if (route === 'transactions') {
    view.innerHTML = renderTransactions(state, txFilter);
    wireTransactions();
  } else if (route === 'budget') {
    view.innerHTML = renderBudget(state);
    wireBudget();
  } else if (route === 'goals') {
    view.innerHTML = renderGoals(state);
    wireGoals();
  } else if (route === 'insights') {
    view.innerHTML = renderInsights(state);
    afterInsights();
  } else {
    view.innerHTML = renderDashboard(state);
    afterDashboard();
  }
  view.focus({ preventScroll: true });
}

function persist() {
  saveState(state);
  window.__ledgerState = state;
  render();
}

function wireTransactions() {
  const q = document.getElementById('f-q');
  const cat = document.getElementById('f-cat');
  const type = document.getElementById('f-type');
  const apply = () => {
    txFilter = { q: q.value.trim(), cat: cat.value, type: type.value };
    view.innerHTML = renderTransactions(state, txFilter);
    wireTransactions();
    document.getElementById('f-q').focus();
  };
  q.addEventListener('input', apply);
  cat.addEventListener('change', apply);
  type.addEventListener('change', apply);
  view.querySelectorAll('[data-delete]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.transactions = state.transactions.filter((t) => t.id !== btn.dataset.delete);
      persist();
    });
  });
  const form = document.getElementById('add-tx');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const amount = Number(document.getElementById('tx-amount').value);
    const desc = document.getElementById('tx-desc').value.trim();
    const catValue = document.getElementById('tx-cat').value;
    const typeValue = document.getElementById('tx-type').value;
    const date = document.getElementById('tx-date').value;
    if (!amount || amount <= 0 || !desc || !date) return;
    state.transactions.push({
      id: `u${Date.now()}`,
      date,
      desc,
      cat: catValue,
      type: typeValue,
      amount: Math.round(amount * 100) / 100,
    });
    txFilter = {};
    persist();
  });
}

function wireBudget() {
  view.querySelectorAll('[data-limit]').forEach((input) => {
    input.addEventListener('change', () => {
      const value = Number(input.value);
      if (Number.isFinite(value) && value >= 0) {
        state.budgets[input.dataset.limit] = value;
        persist();
      }
    });
  });
}

function wireGoals() {
  view.querySelectorAll('.add-money').forEach((form) => {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const input = form.querySelector('input');
      const amount = Number(input.value);
      if (!amount || amount <= 0) return;
      const goal = state.goals.find((g) => g.id === form.dataset.goal);
      if (goal) goal.saved = Math.round((goal.saved + amount) * 100) / 100;
      persist();
    });
  });
  const form = document.getElementById('add-goal');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = document.getElementById('goal-name').value.trim();
    const target = Number(document.getElementById('goal-target').value);
    if (!name || !target || target <= 0) return;
    state.goals.push({ id: `g${Date.now()}`, name, target, saved: 0, note: 'A new goal — every dollar counts.' });
    persist();
  });
}

document.getElementById('reset-demo').addEventListener('click', () => {
  state = resetState();
  txFilter = {};
  persist();
});

window.addEventListener('hashchange', render);
render();

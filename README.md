# Hartono Home Ledger — Household Budget

[![make.fun · best-household-budget-site-20261126-1457](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/rdpratama/homeledger-household-budget/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/rdpratama/homeledger-household-budget/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457?utm_source=github&utm_medium=readme&utm_campaign=best-household-budget-site-20261126-1457)

A working household budget site for the Hartono family (2 adults, 2 kids),
November 2026, in US dollars. Everything runs offline from static files —
no framework, no network requests, hand-drawn canvas charts, state saved in
localStorage.

## Pages (hash routes)

- **#/dashboard** — the month at a glance: income, spending, saved,
  remaining, money left per day, a spending donut, budget bars, upcoming
  bills and savings-goal progress.
- **#/transactions** — the full ledger: filter by category or type, search,
  add a transaction, delete a row. 39 seeded transactions.
- **#/budget** — monthly limits per category with spent / remaining /
  progress bars, inline limit editing, over-budget flags, and the 50/30/20
  rule breakdown.
- **#/goals** — three savings goals with progress bars, add-money buttons
  and a new-goal form.
- **#/insights** — a 6-month spending trend, top categories, computed tips
  and the biggest single expense.

## The numbers (November 2026)

Income $5,870 (Dana $3,400 + Maya $2,150 + freelance $320). Spending
$3,033.64 across 10 categories, savings transfer $800, leaving $2,036.36
unspent. Every figure on the site is computed from the same seed ledger, so
the dashboard, budget bars and insights always agree.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

## Hand in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Built for the make.fun bounty
[best-household-budget-site-20261126-1457](https://make.fun/bounty/best-household-budget-site-20261126-1457).

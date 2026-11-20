// ── THEME ─────────────────────────────────────────────────────────────────────
function applyTheme() { const h = new Date().getHours(); document.body.classList.toggle('night', h < 6 || h >= 20); }
applyTheme(); setInterval(applyTheme, 60000);

// ── PROTOCOL (locked — execute, don't redesign) ───────────────────────────────
const PROTOCOL = {
  name: 'Fat Loss Protocol — DePaul Foxworth',
  measured: 'Nov 20, 2026',
  start: { weight: 226.2, waist: 38, shoulders: 52.5, bf: 27.1, height: "6'0\"", sex: 'Male', age: 'early 30s' },
  goal: { waist: 32, shoulders: 52, cutEnd: '186–188', settle: 195, bfCut: '9–10%', bfSettle: '12–15%' },
  proteinFloor: 170,
  stepsTarget: 15000,
  sleepTarget: 9,
  water: '3–3.5 L',
  cardioBpm: '140–150',
  cardioKcal: '200–300',
};

const BREAKFAST = {
  label: 'Protein shake (only shake of the day)',
  detail: 'Dymatize ISO 100 Chocolate Peanut Butter — 2 scoops (64 g) + frozen blueberries 5 oz + baby spinach 35 g + psyllium husk 1 Tbsp',
  kcal: 341, protein: 51,
  rules: 'Never more than 2 scoops. Never a second shake.',
};

const PREWORKOUT = {
  label: 'Pre-workout rice (lifting days only)',
  detail: 'Jasmine rice 6.7 oz / 190 g cooked — eat 60–90 min before training',
  kcal: 250,
};

const MEALS = {
  Monday: {
    lift: true, label: 'Lift — Incline chest + arms',
    lunch: { name: 'Teriyaki chicken thighs', detail: '9 oz cooked + jasmine rice 4 oz cooked + broccoli 3.5 oz' },
    dinner: { name: 'Ribeye steak', detail: '5 oz cooked + white potato 4 oz cooked + broccoli 3.5 oz' },
    totals: { kcal: 1581, protein: 173 },
  },
  Tuesday: {
    lift: false, label: 'Movement day',
    lunch: { name: 'Thai basil beef', detail: 'Whole dish 255 g cooked + jasmine rice 6 oz cooked' },
    dinner: { name: 'Shrimp', detail: '12 oz cooked + jasmine rice 6 oz cooked + stir-fry veg 7 oz + sesame oil 1 tsp' },
    totals: { kcal: 1541, protein: 177 },
  },
  Wednesday: {
    lift: true, label: 'Lift — Legs',
    lunch: { name: 'Teriyaki thighs', detail: '6 oz cooked + jasmine rice 6 oz cooked' },
    dinner: { name: 'Thai basil beef', detail: 'Whole dish 405 g cooked + white potato 6 oz cooked' },
    totals: { kcal: 1625, protein: 177 },
  },
  Thursday: {
    lift: false, label: 'Movement day',
    lunch: { name: 'Thai basil beef', detail: 'Whole dish 275 g cooked + jasmine rice 4 oz cooked + broccoli 3.5 oz' },
    dinner: { name: 'Ribeye steak', detail: '8 oz cooked + white potato 4 oz cooked + broccoli 3.5 oz' },
    totals: { kcal: 1656, protein: 170 },
  },
  Friday: {
    lift: true, label: 'Lift — Shoulders + back',
    lunch: { name: 'Teriyaki thighs', detail: '6 oz cooked + jasmine rice 6 oz cooked' },
    dinner: { name: 'Shrimp', detail: '10 oz cooked + jasmine rice 6 oz cooked + stir-fry veg 7 oz + sesame oil 1 tsp' },
    totals: { kcal: 1523, protein: 174 },
  },
  Saturday: {
    lift: false, label: 'Movement day',
    lunch: { name: 'Thai basil beef', detail: 'Whole dish 255 g cooked + jasmine rice 6 oz cooked + broccoli 3.5 oz' },
    dinner: { name: 'Teriyaki thighs', detail: '9 oz cooked + sweet potato 6 oz cooked + broccoli 3.5 oz' },
    totals: { kcal: 1622, protein: 175 },
  },
  Sunday: {
    lift: false, label: 'Movement day · Prep B (Mon–Wed)',
    lunch: { name: 'Teriyaki thighs', detail: '6 oz cooked + jasmine rice 6 oz cooked' },
    dinner: { name: 'Shrimp', detail: '10 oz cooked + jasmine rice 6 oz cooked + stir-fry veg 7 oz + sesame oil 1 tsp' },
    totals: { kcal: 1523, protein: 174 },
    prep: 'Prep B: pack Mon–Wed tubs. Freeze Day-4 tubs.',
  },
};

// Wednesday prep note
MEALS.Wednesday.prep = 'Prep A: pack Thu–Sun tubs. Freeze Day-4 tubs.';

const LIFT_PROGRAM = {
  Monday: {
    title: 'Incline chest + arms',
    note: '3 warm-up sets before incline press. Lift BEFORE cardio. Log every top set.',
    exercises: [
      { name: 'Incline Bench', scheme: '4–6, 6–8, 8–10 (RPT)', alt: 'Incline DB Bench 6–8, 8–10, 8–10', top: true },
      { name: 'Flat Barbell Bench or Weighted Dips', scheme: '6–8, 8–10 (RPT)', top: true },
      { name: 'Incline DB Curls', scheme: '4–6, 6–8, 6–8 (RPT)', top: true },
      { name: 'Incline DB Triceps or Skull Crushers', scheme: '6–8, 8–10, 8–10 (RPT)', top: true },
      { name: 'Face Pulls', scheme: '12–15 + 4–6, 4–6, 4–6 (Rest Pause)', top: false },
    ],
  },
  Wednesday: {
    title: 'Legs',
    note: 'Straight sets. Lift BEFORE cardio. Log every top set.',
    exercises: [
      { name: 'Front Squats or Bulgarian Split Squats', scheme: '4 × 6–8', top: true },
      { name: 'Romanian Deadlifts or Nordic Curls', scheme: '3 × 10–12 (or 3 × 4–6)', top: true },
      { name: 'Leg Extensions or Sissy Squats', scheme: '3 × 8–12', top: false },
      { name: 'Seated Calf Raises', scheme: '3 × 12–15', top: false },
      { name: 'Trap Bar Shrugs', scheme: '3 × 10–12', top: false },
    ],
  },
  Friday: {
    title: 'Shoulders + back',
    note: '3 warm-up sets before standing press. Lift BEFORE cardio. Log every top set.',
    exercises: [
      { name: 'Standing Press or DB Shoulder Press', scheme: '4–6, 6–8, 8–10 (RPT)', top: true },
      { name: 'Weighted Pull-ups', scheme: '5, 6 (RPT)', alt: 'Pendlay Rows 4 × 8–10', top: true },
      { name: 'Side-to-Side Push-ups or Flye Press', scheme: '3 × 6–8/side or 3 × 8–12', top: false },
      { name: 'Hammer Curls', scheme: '3 × 8–12', top: false },
      { name: 'Lateral Raises', scheme: '12–15 + 4–6, 4–6, 4–6 (Rest Pause)', top: false },
    ],
  },
};

const TAPER = [
  { id: 'A', label: 'Front-load', when: '226 → ~205 lb (7-day avg)', base: '1,500–1,580', lift: '1,775–1,900', under: 999 },
  { id: 'B', label: '+250 kcal', when: 'Under ~205 lb', base: '~1,750', lift: 'lift carbs still earned', under: 205 },
  { id: 'C', label: '+250 kcal again', when: 'Under ~195 lb', base: '~2,000', lift: 'lift carbs still earned', under: 195 },
  { id: 'D', label: 'Hold & finish', when: '~195 → 186–188 lb', base: '~2,000', lift: 'movement finishes it · ~1 lb/week', under: 188 },
];

const REVERSE = [
  { week: 1, kcal: 2250, note: 'Add fats back first — hormone recovery' },
  { week: 2, kcal: 2500, note: 'Fats first' },
  { week: 3, kcal: 2750, note: 'Carbs enter, pre-workout only' },
  { week: 4, kcal: 3000, note: 'Maintenance. Settle ~195 lb.' },
];

const SAFETY_STOPS = [
  'Unusual fatigue (the kind that changes what you can do in a day)',
  'Dizziness or near-fainting',
  'Palpitations — racing, pounding, or fluttering you can feel',
  'Strength dropping across 3+ lifting sessions',
  'Sleep collapsing despite the 9-hour target',
  'Getting sick repeatedly',
];

const FOOD_RULES = [
  'ALL portion weights are COOKED. Never weigh raw.',
  'Cook ONLY with spray, never oil — except 1 tsp sesame oil on shrimp nights.',
  'Ground beef is 93/7. Proteins stay separate — never mixed in one tub.',
  'Sweet potato swaps: 1:1 for white potato by cooked weight; 1.5× for rice (6 oz rice = 9 oz sweet potato).',
  'No food after dinner. No alcohol in this phase.',
  'Fiber: if stools get hard, second Tbsp psyllium in water before dinner.',
  'Water 3–3.5 L/day. Don\'t cut sodium.',
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const ADONIS_TARGETS = { shoulders: 52, waist: 32, chest: 44, neck: 16.5, arms: 16, forearms: 13, thighs: 24, calves: 15.5, hips: 37, abdomen: 31 };

let weekOffset = 0, currentPage = 'today', openDays = {};

// ── STATE ─────────────────────────────────────────────────────────────────────
function loadState() { try { return JSON.parse(localStorage.getItem('msb_state') || '{}'); } catch { return {}; } }
function saveState(k, v) { const s = loadState(); s[k] = v; localStorage.setItem('msb_state', JSON.stringify(s)); }
function getS(k, d) { return loadState()[k] ?? d; }

// ── HELPERS ───────────────────────────────────────────────────────────────────
function weekStart(o) { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - d.getDay() + o * 7); return d; }
function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function weekKey(o) { return dateKey(weekStart(o)); }
function todayDate() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function todayName() { return DAYS[todayDate().getDay()]; }
function sk(wk, day, kpi) { return `${wk}|${day}|${kpi}`; }
function fmt(d) { return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }
function toast(msg) { const t = document.getElementById('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2500); }

function dayCfg(day) {
  const m = MEALS[day];
  const lift = m.lift;
  const base = m.totals.kcal;
  const withLift = lift ? base + PREWORKOUT.kcal : base;
  return { ...m, type: lift ? 'lift' : 'move', kcal: withLift, baseKcal: base, protein: m.totals.protein };
}

function getDayTarget(day) {
  const cfg = dayCfg(day);
  const phase = currentTaperPhase();
  let cal = cfg.kcal;
  // Taper adds to base; lift days still earn pre-workout rice
  if (phase.id === 'B') cal = (cfg.lift ? 1750 + PREWORKOUT.kcal : 1750);
  else if (phase.id === 'C' || phase.id === 'D') cal = (cfg.lift ? 2000 + PREWORKOUT.kcal : 2000);
  else if (phase.id === 'R') cal = getS('reverse_kcal', 2250);
  return { cal, prot: PROTOCOL.proteinFloor, phase };
}

function weightLog() { return getS('daily_weights', {}); }
function setWeight(dateStr, lbs) {
  const w = weightLog();
  if (lbs === '' || lbs == null || isNaN(lbs)) delete w[dateStr];
  else w[dateStr] = parseFloat(lbs);
  saveState('daily_weights', w);
}

function sevenDayAvg(asOf = todayDate()) {
  const w = weightLog();
  const vals = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(asOf); d.setDate(asOf.getDate() - i);
    const v = w[dateKey(d)];
    if (v != null) vals.push(v);
  }
  // Seed with starting weight if no logs yet
  if (!vals.length) {
    const checkins = getS('checkins', []);
    if (checkins[0]?.weight) return { avg: checkins[0].weight, n: 1, seeded: true };
    return { avg: PROTOCOL.start.weight, n: 0, seeded: true };
  }
  return { avg: Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10, n: vals.length, seeded: false };
}

function currentTaperPhase() {
  if (getS('in_reverse', false)) return { id: 'R', label: 'Reverse diet', when: 'Exit phase', base: String(getS('reverse_kcal', 2250)), lift: 'per reverse week' };
  const { avg } = sevenDayAvg();
  if (avg < 188) return TAPER[3];
  if (avg < 195) return TAPER[2];
  if (avg < 205) return TAPER[1];
  return TAPER[0];
}

function buildKPIs(day) {
  const cfg = dayCfg(day);
  const tgt = getDayTarget(day);
  const k = [
    { id: 'morning', label: 'Morning sequence (Bible → clothes → shake → lift)', meta: 'phone down' },
    { id: 'meals', label: 'Meals as written (breakfast + Tub 1 + Tub 2)', meta: 'zero decisions' },
    { id: 'protein', label: `${PROTOCOL.proteinFloor}g+ protein`, meta: tgt.prot + 'g floor' },
    { id: 'calories', label: `Calories on template — ~${tgt.cal} kcal`, meta: 'as written' },
    { id: 'supps', label: 'Supplements (multi · fish oil · D · creatine 5g · electrolytes)', meta: 'daily' },
    { id: 'water', label: `Water ${PROTOCOL.water}`, meta: 'don\'t cut sodium' },
    { id: 'cardio', label: `Cardio ${PROTOCOL.cardioBpm} bpm · ${PROTOCOL.cardioKcal} kcal`, meta: 'never 160+' },
    { id: 'steps', label: `${PROTOCOL.stepsTarget.toLocaleString()} steps`, meta: '7 days / week' },
    { id: 'sleep', label: `${PROTOCOL.sleepTarget} hours sleep · same sleep/wake`, meta: 'magnesium PM' },
    { id: 'cutoff', label: 'No food after dinner · no alcohol', meta: 'hard rule' },
  ];
  if (cfg.lift) {
    k.splice(2, 0, { id: 'prewo', label: 'Pre-workout rice 6.7 oz cooked (60–90 min before)', meta: '+250 kcal' });
    k.splice(3, 0, { id: 'lift', label: `Lift — ${LIFT_PROGRAM[day].title}`, meta: 'before cardio' });
  }
  if (cfg.prep) k.push({ id: 'prep', label: cfg.prep, meta: 'prep day' });
  return k;
}

// ── STREAK ────────────────────────────────────────────────────────────────────
function calcStreak() {
  let streak = 0;
  for (let i = 1; i <= 52; i++) {
    const wk = weekKey(-i), state = getS('checks_' + wk, {});
    let total = 0, hit = 0;
    DAYS.forEach(day => {
      const kpis = buildKPIs(day);
      total += kpis.length;
      hit += kpis.filter(k => state[sk(wk, day, k.id)]).length;
    });
    if (total > 0 && (hit / total) >= 0.8) streak++; else break;
  }
  return streak;
}

function calcProjectedDate() {
  const checkins = getS('checkins', []);
  if (checkins.length < 2) return null;
  const recent = checkins.find(c => c.waist), older = checkins.slice(1).find(c => c.waist);
  if (!recent || !older) return null;
  const weeklyLoss = older.waist - recent.waist;
  if (weeklyLoss <= 0) return null;
  const weeksNeeded = Math.ceil((recent.waist - 32) / weeklyLoss);
  if (weeksNeeded <= 0 || weeksNeeded > 200) return null;
  const projDate = new Date(); projDate.setDate(projDate.getDate() + weeksNeeded * 7);
  return { date: projDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }), weeks: weeksNeeded, weeklyLoss: weeklyLoss.toFixed(2) };
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
function requestNotificationPermission() {
  if (!('Notification' in window)) { toast('Notifications not supported'); return; }
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') { saveState('notif_enabled', true); toast('Monday reminders enabled'); scheduleMondayCheck(); }
    else toast('Permission denied — enable in browser settings');
  });
}
function scheduleMondayCheck() {
  setInterval(() => {
    const now = new Date(), enabled = getS('notif_enabled', false), lastNotif = getS('last_monday_notif', ''), todayKey = now.toISOString().slice(0, 10);
    if (enabled && now.getDay() === 1 && now.getHours() >= 7 && now.getHours() < 9 && lastNotif !== todayKey && Notification.permission === 'granted') {
      new Notification('Lifestyle Body', { body: 'Monday check-in — weigh in, waist, photos. Judge progress in 14-day blocks.', icon: '/icon-192.png' });
      saveState('last_monday_notif', todayKey);
    }
  }, 30 * 60 * 1000);
}
if (getS('notif_enabled', false) && typeof Notification !== 'undefined' && Notification.permission === 'granted') scheduleMondayCheck();

// ── RENDER SHELL ──────────────────────────────────────────────────────────────
function render() {
  applyTheme();
  const pages = [
    ['today', 'Today'],
    ['week', 'Week'],
    ['review', 'Review'],
    ['progress', 'Progress'],
    ['plan', 'Plan'],
    ['coach', 'Coach'],
  ];
  document.getElementById('app').innerHTML = `
    <div class="nav">
      <div class="nav-brand"><div class="nav-title">Lifestyle <span>Body</span></div></div>
      <div style="display:flex;align-items:center;gap:8px" id="nav-wc"></div>
    </div>
    <div class="page-tabs">
      ${pages.map(([p, l]) => `<button class="ptab ${currentPage === p ? 'active' : ''}" onclick="switchPage('${p}')">${l}</button>`).join('')}
    </div>
    ${pages.map(([p]) => `<div class="page ${currentPage === p ? 'active' : ''}" id="page-${p}"></div>`).join('')}
    <div class="toast" id="toast"></div>`;
  renderWeekControls();
  ({
    today: renderTodayPage,
    week: renderWeekPage,
    review: renderReviewPage,
    progress: renderProgressPage,
    plan: renderPlanPage,
    coach: renderCoachPage,
  })[currentPage]?.();
}
function switchPage(p) { currentPage = p; render(); }
function changeWeek(d) { weekOffset += d; openDays = {}; render(); }

function openWeekPicker() {
  const existing = document.getElementById('week-picker-overlay'); if (existing) { existing.remove(); return; }
  const overlay = document.createElement('div');
  overlay.id = 'week-picker-overlay';
  overlay.className = 'overlay';
  overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };
  const panel = document.createElement('div');
  panel.className = 'picker-panel';
  const hdr = document.createElement('div');
  hdr.className = 'picker-hdr';
  hdr.innerHTML = `<div style="font-size:16px;font-weight:700">Jump to Week</div><span style="cursor:pointer;font-size:18px;color:var(--muted);padding:4px 8px" onclick="document.getElementById('week-picker-overlay').remove()">✕</span>`;
  panel.appendChild(hdr);
  const list = document.createElement('div'); list.style.cssText = 'overflow-y:auto;flex:1';
  let lastMonth = '';
  for (let i = 0; i >= -52; i--) {
    const ws = weekStart(i), we = new Date(ws); we.setDate(ws.getDate() + 6);
    const monthLabel = ws.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (monthLabel !== lastMonth) {
      const mhdr = document.createElement('div');
      mhdr.className = 'picker-month';
      mhdr.textContent = monthLabel; list.appendChild(mhdr); lastMonth = monthLabel;
    }
    const isCurrent = i === weekOffset, isThisWeek = i === 0;
    const row = document.createElement('div');
    row.className = 'picker-row' + (isCurrent ? ' current' : '');
    const dateSpan = document.createElement('span');
    dateSpan.className = 'picker-date' + (isCurrent ? ' on' : '');
    dateSpan.textContent = `${fmt(ws)} – ${fmt(we)}`;
    const badge = document.createElement('span');
    badge.className = 'picker-badge';
    if (isThisWeek) { badge.classList.add('now'); badge.textContent = 'NOW'; }
    else if (isCurrent) { badge.classList.add('view'); badge.textContent = 'VIEWING'; }
    row.appendChild(dateSpan); row.appendChild(badge);
    const offset = i;
    row.onclick = () => { weekOffset = offset; openDays = {}; overlay.remove(); render(); };
    list.appendChild(row);
  }
  panel.appendChild(list); overlay.appendChild(panel); document.body.appendChild(overlay);
}

function renderWeekControls() {
  const el = document.getElementById('nav-wc');
  if (currentPage !== 'week') { el.innerHTML = ''; return; }
  const ws = weekStart(weekOffset), we = new Date(ws); we.setDate(ws.getDate() + 6);
  el.innerHTML = `
    <button class="week-btn" onclick="changeWeek(-1)">&#8592;</button>
    <button class="week-jump" onclick="openWeekPicker()">
      ${fmt(ws)} – ${fmt(we)}<span style="font-size:9px;color:var(--muted)">▾</span>
    </button>
    <button class="week-btn" onclick="changeWeek(1)" ${weekOffset === 0 ? 'disabled style="opacity:.3;cursor:not-allowed"' : ''}>&#8594;</button>`;
}

// ── TODAY PAGE ────────────────────────────────────────────────────────────────
function renderTodayPage() {
  const day = todayName();
  const cfg = dayCfg(day);
  const tgt = getDayTarget(day);
  const phase = currentTaperPhase();
  const avg = sevenDayAvg();
  const dk = dateKey(todayDate());
  const wk = weekKey(0);
  const state = getS('checks_' + wk, {});
  const kpis = buildKPIs(day);
  const done = kpis.filter(k => state[sk(wk, day, k.id)]).length;
  const loggedW = weightLog()[dk];
  const lift = LIFT_PROGRAM[day];
  const identity = getS('identity_line', 'What would the 195-lb version of me do right now?');

  let html = `
  <div class="today-hero">
    <div class="today-kicker">${day} · ${fmt(todayDate())}</div>
    <div class="today-title">${cfg.label}</div>
    <div class="today-meta">
      <span>~${tgt.cal} kcal</span>
      <span>${cfg.protein}g P built-in</span>
      <span>Phase ${phase.id}: ${phase.label}</span>
    </div>
    <div class="today-progress">
      <div class="today-progress-bar"><div style="width:${Math.round((done / kpis.length) * 100)}%"></div></div>
      <div class="today-progress-label">${done}/${kpis.length} locked in</div>
    </div>
  </div>

  <div class="identity-strip">${identity}</div>

  <div class="card tight">
    <div class="card-title">Morning weigh-in <span class="badge-sm badge-navy">7-day avg arbitrates</span></div>
    <div class="weight-row">
      <input id="today-weight" type="number" step="0.1" placeholder="${PROTOCOL.start.weight}" value="${loggedW ?? ''}" inputmode="decimal">
      <button class="li-btn" onclick="saveTodayWeight()">Log</button>
    </div>
    <div class="weight-avg">7-day average: <strong>${avg.avg} lb</strong>${avg.seeded ? ' (seeded — keep logging)' : ` · ${avg.n}/7 days`} · taper gate: ${phase.when}</div>
  </div>

  <div class="card tight">
    <div class="card-title">Eat this · no deciding</div>
    <div class="meal-block">
      <div class="meal-tag">Breakfast</div>
      <div class="meal-name">${BREAKFAST.label}</div>
      <div class="meal-detail">${BREAKFAST.detail}</div>
      <div class="meal-macros">${BREAKFAST.kcal} kcal · ${BREAKFAST.protein}g P · ${BREAKFAST.rules}</div>
    </div>
    ${cfg.lift ? `<div class="meal-block accent">
      <div class="meal-tag">Pre-workout</div>
      <div class="meal-name">${PREWORKOUT.label}</div>
      <div class="meal-detail">${PREWORKOUT.detail}</div>
      <div class="meal-macros">${PREWORKOUT.kcal} kcal · carbs earned by training</div>
    </div>` : ''}
    <div class="meal-block">
      <div class="meal-tag">Lunch · Tub 1</div>
      <div class="meal-name">${cfg.lunch.name}</div>
      <div class="meal-detail">${cfg.lunch.detail}</div>
    </div>
    <div class="meal-block">
      <div class="meal-tag">Dinner · Tub 2</div>
      <div class="meal-name">${cfg.dinner.name}</div>
      <div class="meal-detail">${cfg.dinner.detail}</div>
    </div>
    <div class="meal-day-total">Day template: ${cfg.baseKcal} kcal / ${cfg.protein}g P${cfg.lift ? ` · with pre-WO ≈ ${cfg.kcal} kcal` : ''}</div>
    ${cfg.prep ? `<div class="prep-callout">${cfg.prep}</div>` : ''}
  </div>`;

  if (lift) {
    const ll = getS('lifts_' + wk + '_' + day, {});
    html += `<div class="card tight">
      <div class="card-title">Lift · ${lift.title}</div>
      <div class="lift-note">${lift.note}</div>`;
    lift.exercises.forEach((ex, i) => {
      const log = ll[i] || {};
      html += `<div class="ex-row ${ex.top ? 'top-set' : ''}">
        <div class="ex-main">
          <div class="ex-name">${ex.name}${ex.top ? ' <span class="top-badge">LOG TOP</span>' : ''}</div>
          <div class="ex-scheme">${ex.scheme}${ex.alt ? ` · or ${ex.alt}` : ''}</div>
        </div>
        ${ex.top ? `<div class="ex-log">
          <input class="li-sm" id="top-${i}" type="text" placeholder="top set e.g. 185×5" value="${log.top || ''}" onchange="saveTopSet('${wk}','${day}',${i})">
        </div>` : ''}
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div class="card tight">
    <div class="card-title">Today's checklist</div>`;
  kpis.forEach(kpi => {
    const chk = state[sk(wk, day, kpi.id)] || false;
    html += `<div class="krow" onclick="toggleKPI('${wk}','${day}','${kpi.id}')">
      <div class="cb ${chk ? 'on' : ''}"><div class="ck"></div></div>
      <span class="ktext ${chk ? 'done' : ''}">${kpi.label}</span>
      <span class="kmeta">${kpi.meta}</span>
    </div>`;
  });
  html += `</div>

  <div class="safety-strip">
    <div class="safety-title">Safety — say it plainly</div>
    <div class="safety-body">Prior ablation · low hemoglobin follow-up open. Stop the aggressive phase and check in with care team if unusual fatigue, dizziness, palpitations, strength dropping 3+ sessions, sleep collapsing, or repeated illness.</div>
  </div>`;

  document.getElementById('page-today').innerHTML = html;
}

function saveTodayWeight() {
  const v = parseFloat(document.getElementById('today-weight')?.value);
  if (isNaN(v)) { toast('Enter a weight'); return; }
  setWeight(dateKey(todayDate()), v);
  toast('Weight logged');
  renderTodayPage();
}

function saveTopSet(wk, day, i) {
  const val = document.getElementById('top-' + i)?.value.trim() || '';
  const ll = getS('lifts_' + wk + '_' + day, {});
  ll[i] = { ...(ll[i] || {}), top: val, name: LIFT_PROGRAM[day].exercises[i].name };
  saveState('lifts_' + wk + '_' + day, ll);
  toast('Top set logged');
}

// ── WEEK PAGE ─────────────────────────────────────────────────────────────────
function renderWeekPage() {
  const wk = weekKey(weekOffset), state = getS('checks_' + wk, {});
  let prot = 0, lifts = 0, steps = 0, cardio = 0;
  DAYS.forEach(d => {
    if (state[sk(wk, d, 'protein')]) prot++;
    if (state[sk(wk, d, 'lift')]) lifts++;
    if (state[sk(wk, d, 'steps')]) steps++;
    if (state[sk(wk, d, 'cardio')]) cardio++;
  });
  const g = n => n > 0 ? 'gold' : '';
  const streak = calcStreak(), proj = calcProjectedDate(), phase = currentTaperPhase(), avg = sevenDayAvg();

  let html = `
  <div class="streak-bar">
    <div class="streak-left">
      <div class="streak-num ${streak > 0 ? 'gold' : ''}">${streak}<span style="font-size:14px;font-family:'DM Sans',sans-serif;font-weight:500"> wk streak</span></div>
      <div class="streak-sub">Phase ${phase.id}: ${phase.label} · 7-day avg ${avg.avg} lb</div>
    </div>
    ${proj ? `<div class="streak-right"><div class="streak-proj-label">Goal waist est.</div><div class="streak-proj-date">${proj.date}</div><div class="streak-proj-sub">${proj.weeks} wk · ${proj.weeklyLoss}" / wk</div></div>` : ''}
  </div>
  <div class="kpi-grid">
    <div class="kpi-tile"><div class="big ${g(prot)}">${prot}<span style="font-size:14px;color:var(--faint)">/7</span></div><div class="lbl">Protein</div></div>
    <div class="kpi-tile"><div class="big ${g(lifts)}">${lifts}<span style="font-size:14px;color:var(--faint)">/3</span></div><div class="lbl">Lifts</div></div>
    <div class="kpi-tile"><div class="big ${g(steps)}">${steps}<span style="font-size:14px;color:var(--faint)">/7</span></div><div class="lbl">15k Steps</div></div>
    <div class="kpi-tile"><div class="big ${g(cardio)}">${cardio}<span style="font-size:14px;color:var(--faint)">/7</span></div><div class="lbl">Cardio</div></div>
  </div>`;

  const ws = weekStart(weekOffset);
  DAYS.forEach((day, idx) => {
    const cfg = dayCfg(day), tgt = getDayTarget(day);
    const dayDate = new Date(ws); dayDate.setDate(ws.getDate() + idx);
    const kpis = buildKPIs(day), total = kpis.length;
    const done = kpis.filter(k => state[sk(wk, day, k.id)]).length;
    const isOpen = openDays[wk + '|' + day] || false;
    const isToday = weekOffset === 0 && day === todayName();
    const dot = cfg.lift ? 'var(--green)' : 'var(--muted)';
    const bc = cfg.lift ? 'b-high' : 'b-low';
    const uploads = getS('uploads_' + wk + '_' + day, {});
    const aiSt = getS('aistatus_' + wk + '_' + day, {});
    html += `<div class="day-card ${isToday ? 'is-today' : ''}">
      <div class="day-hdr" onclick="toggleDay('${day}')">
        <div class="day-left">
          <div class="day-dot" style="background:${dot}"></div>
          <div>
            <div class="day-name">${day}${isToday ? ' · today' : ''}</div>
            <div class="day-date">${dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · ${cfg.lunch.name} / ${cfg.dinner.name}</div>
          </div>
        </div>
        <div class="day-right">
          <span class="dbadge ${bc}">${cfg.lift ? 'Lift' : 'Move'} · ~${tgt.cal}</span>
          <span class="day-score">${done}/${total}</span>
        </div>
      </div>
      <div class="day-body ${isOpen ? 'open' : ''}" id="body-${day}">
        <div class="meal-mini">
          <div><strong>B:</strong> shake</div>
          ${cfg.lift ? `<div><strong>Pre:</strong> rice 6.7 oz</div>` : ''}
          <div><strong>L:</strong> ${cfg.lunch.detail}</div>
          <div><strong>D:</strong> ${cfg.dinner.detail}</div>
          <div class="meal-macros">${cfg.baseKcal} kcal / ${cfg.protein}g P</div>
        </div>
        <div class="sec-label">Daily KPIs</div>`;
    kpis.forEach(kpi => {
      const chk = state[sk(wk, day, kpi.id)] || false, st = aiSt[kpi.id];
      html += `<div class="krow" onclick="toggleKPI('${wk}','${day}','${kpi.id}')">
        <div class="cb ${chk ? 'on' : ''}"><div class="ck"></div></div>
        <span class="ktext ${chk ? 'done' : ''}">${kpi.label}</span>
        ${st ? `<span class="kstatus ${st.cls}">${st.val}</span>` : ''}
        <span class="kmeta">${kpi.meta}</span>
      </div>`;
    });
    const hasAny = Object.keys(uploads).length > 0;
    html += `<div class="upload-zone">
      <div class="sec-label" style="padding:0 0 8px">Log from Screenshot</div>
      <div class="upload-grid">
        <label class="upload-tile ${uploads.mfp ? 'has' : ''}">
          <input type="file" accept="image/*" onchange="handleUpload(event,'${wk}','${day}','mfp')">
          <div class="ui">MFP</div><div class="ul">${uploads.mfp ? 'Diary ✓' : 'Diary'}</div>
        </label>
        <label class="upload-tile ${uploads.steps ? 'has' : ''}">
          <input type="file" accept="image/*" onchange="handleUpload(event,'${wk}','${day}','steps')">
          <div class="ui">Steps</div><div class="ul">${uploads.steps ? 'Count ✓' : 'Count'}</div>
        </label>
        <label class="upload-tile ${uploads.workout ? 'has' : ''}">
          <input type="file" accept="image/*" onchange="handleUpload(event,'${wk}','${day}','workout')">
          <div class="ui">Lift</div><div class="ul">${uploads.workout ? 'Log ✓' : 'Log'}</div>
        </label>
      </div>
      <button class="proc-btn" id="proc-${day}" onclick="processScreenshots('${wk}','${day}')" ${!hasAny ? 'disabled' : ''}>
        Read Screenshots &amp; Auto-Log
      </button>
      <div class="ai-out" id="aiout-${day}"></div>
    </div>`;
    if (cfg.lift) {
      const program = LIFT_PROGRAM[day];
      const ll = getS('lifts_' + wk + '_' + day, {});
      html += `<div class="lift-log">
        <div class="sec-label" style="padding:0 0 8px">Top-set log · ${program.title}</div>`;
      program.exercises.filter(e => e.top).forEach((ex) => {
        const idx = program.exercises.indexOf(ex);
        const log = ll[idx] || {};
        html += `<div class="ex-row top-set">
          <div class="ex-main"><div class="ex-name">${ex.name}</div><div class="ex-scheme">${ex.scheme}</div></div>
          <input class="li-sm" id="wtop-${day}-${idx}" type="text" placeholder="top set" value="${log.top || ''}" onchange="saveWeekTop('${wk}','${day}',${idx})">
        </div>`;
      });
      html += `</div>`;
    }
    html += `</div></div>`;
  });
  document.getElementById('page-week').innerHTML = html;
}

function saveWeekTop(wk, day, i) {
  const val = document.getElementById(`wtop-${day}-${i}`)?.value.trim() || '';
  const ll = getS('lifts_' + wk + '_' + day, {});
  ll[i] = { ...(ll[i] || {}), top: val, name: LIFT_PROGRAM[day].exercises[i].name };
  saveState('lifts_' + wk + '_' + day, ll);
  toast('Top set logged');
}

function toggleDay(day) {
  const wk = weekKey(weekOffset), k = wk + '|' + day, isOpen = openDays[k];
  DAYS.forEach(d => { openDays[wk + '|' + d] = false; document.getElementById('body-' + d)?.classList.remove('open'); });
  if (!isOpen) { openDays[k] = true; document.getElementById('body-' + day)?.classList.add('open'); }
}
function toggleKPI(wk, day, id) {
  const s = getS('checks_' + wk, {});
  s[sk(wk, day, id)] = !s[sk(wk, day, id)];
  saveState('checks_' + wk, s);
  if (currentPage === 'today') renderTodayPage();
  else renderWeekPage();
}

function handleUpload(ev, wk, day, type) {
  const f = ev.target.files[0]; if (!f) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX = 1200;
      let w = img.width, h = img.height;
      if (w > h) { if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; } }
      else { if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; } }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const b64 = canvas.toDataURL('image/jpeg', 0.82).split(',')[1];
      const u = getS('uploads_' + wk + '_' + day, {});
      u[type] = { b64, mime: 'image/jpeg' };
      saveState('uploads_' + wk + '_' + day, u);
      renderWeekPage();
      setTimeout(() => { openDays[wk + '|' + day] = true; renderWeekPage(); }, 50);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(f);
}

async function processScreenshots(wk, day) {
  const uploads = getS('uploads_' + wk + '_' + day, {}); if (!Object.keys(uploads).length) return;
  const tgt = getDayTarget(day), btn = document.getElementById('proc-' + day), out = document.getElementById('aiout-' + day);
  if (!btn || !out) return;
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>Reading screenshots…';
  out.className = 'ai-out show'; out.textContent = 'Analyzing…';
  const content = [];
  Object.entries(uploads).forEach(([type, img]) => {
    content.push({ type: 'text', text: `Image: ${type}` });
    content.push({ type: 'image', source: { type: 'base64', media_type: img.mime, data: img.b64 } });
  });
  const yr = new Date().getFullYear();
  content.push({
    type: 'text',
    text: `Analyze these fitness screenshots for ${day}. Year is ${yr}.

Locked protocol targets: ~${tgt.cal} kcal (meals as written), ${PROTOCOL.proteinFloor}g+ protein, ${PROTOCOL.stepsTarget} steps.

STEPS: look for a large bold step count.
MFP: Protein / Carbs / Fat totals.
Workout: exercise names, sets × reps × weight.

Output:
KPI STATUS:
- Calories: [number] / ${tgt.cal}
- Protein: [number]g / ${PROTOCOL.proteinFloor}g
- Steps: [number] / ${PROTOCOL.stepsTarget}

VERDICTS:
PROTEIN_HIT: true/false  (true if protein >= ${PROTOCOL.proteinFloor})
CALORIES_HIT: true/false (true if within ~100 of template OR clearly following written meals)
STEPS_HIT: true/false    (true if >= ${PROTOCOL.stepsTarget})
LIFT_LOGGED: true/false
CARDIO_HIT: true/false

If unreadable: IMAGE_ERROR: true`,
  });
  try {
    const apiKey1 = getS('api_key', '');
    const resp = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(apiKey1 ? { 'x-api-key': apiKey1 } : {}) },
      body: JSON.stringify({ messages: [{ role: 'user', content }] }),
    });
    const data = await resp.json();
    const text = data.content?.map(c => c.text || '').join('') || data.error || 'No response.';
    out.textContent = text;
    const s = getS('checks_' + wk, {});
    if (/PROTEIN_HIT:\s*true/i.test(text)) s[sk(wk, day, 'protein')] = true;
    if (/CALORIES_HIT:\s*true/i.test(text)) { s[sk(wk, day, 'calories')] = true; s[sk(wk, day, 'meals')] = true; }
    if (/STEPS_HIT:\s*true/i.test(text)) s[sk(wk, day, 'steps')] = true;
    if (/LIFT_LOGGED:\s*true/i.test(text)) s[sk(wk, day, 'lift')] = true;
    if (/CARDIO_HIT:\s*true/i.test(text)) s[sk(wk, day, 'cardio')] = true;
    saveState('checks_' + wk, s);
    const aiSt = {};
    const cm = text.match(/(\d{3,4})\s*(kcal|cal)/i);
    if (cm) {
      const lg = parseInt(cm[1]), diff = tgt.cal - lg;
      aiSt.calories = { cls: lg > tgt.cal + 100 ? 'bad' : Math.abs(diff) <= 100 ? 'ok' : 'warn', val: lg > tgt.cal ? `+${Math.abs(diff)}` : `${diff} under` };
    }
    const pm = text.match(/protein[:\s]+(\d+)g/i);
    if (pm) { const p = parseInt(pm[1]); aiSt.protein = { cls: p >= PROTOCOL.proteinFloor ? 'ok' : 'bad', val: p + 'g' }; }
    const sm = text.match(/([\d,]+)\s*steps/i);
    if (sm) { const st = parseInt(sm[1].replace(/,/g, '')); aiSt.steps = { cls: st >= PROTOCOL.stepsTarget ? 'ok' : 'bad', val: st.toLocaleString() }; }
    saveState('aistatus_' + wk + '_' + day, aiSt);
    toast('Screenshots logged');
    renderWeekPage();
    setTimeout(() => { openDays[wk + '|' + day] = true; renderWeekPage(); }, 50);
  } catch (err) { out.textContent = 'Error: ' + err.message; }
  btn.disabled = false; btn.innerHTML = 'Read Screenshots &amp; Auto-Log';
}

// ── REVIEW PAGE (14-day block + Monday check-in) ──────────────────────────────
function renderReviewPage() {
  const checkins = getS('checkins', []), photos = getS('checkin_photos_draft', {});
  const scanReady = ['scale', 'measurements'].some(k => { const p = photos[k]; return p && (typeof p === 'object' ? p.b64 : p); });
  const avg = sevenDayAvg();
  const reviews = getS('reviews_14d', []);
  const lastCoachDate = getS('last_coach_date', '');

  let html = `
  <div class="card tight">
    <div class="card-title">14-day review block <span class="badge-sm badge-gold">How progress is judged</span></div>
    <div class="review-grid">
      <div class="review-stat"><div class="rs-label">7-day avg weight</div><div class="rs-val">${avg.avg} lb</div></div>
      <div class="review-stat"><div class="rs-label">Latest waist</div><div class="rs-val">${checkins[0]?.waist ? checkins[0].waist + '"' : '—'}</div></div>
      <div class="review-stat"><div class="rs-label">Shoulders</div><div class="rs-val">${checkins[0]?.shoulders ? checkins[0].shoulders + '"' : PROTOCOL.start.shoulders + '"'}</div></div>
      <div class="review-stat"><div class="rs-label">Taper phase</div><div class="rs-val">${currentTaperPhase().id}</div></div>
    </div>
    <div style="font-size:13px;color:var(--muted);line-height:1.7;margin-top:8px">
      Never judge by one morning. Flat scale for days is usually water — waist + trend arbitrate.
      Stall rule: if 7-day average hasn't moved in 2 full weeks, audit tracking accuracy first. One variable at a time.
    </div>
  </div>

  <div class="card tight">
    <div class="card-title">Log a 14-day review</div>
    <div class="meas-grid">
      <div class="mfield"><label>Sleep (1–10)</label><input id="r-sleep" type="number" min="1" max="10" placeholder="7"></div>
      <div class="mfield"><label>Energy (1–10)</label><input id="r-energy" type="number" min="1" max="10" placeholder="7"></div>
      <div class="mfield"><label>Strength trend</label><input id="r-strength" type="text" placeholder="holding / up / down"></div>
      <div class="mfield"><label>Waist (in)</label><input id="r-waist" type="number" step="0.25" placeholder="38"></div>
    </div>
    <div class="mfield" style="margin-bottom:12px">
      <label>Notes (tracking accuracy? stop signs?)</label>
      <input id="r-notes" type="text" placeholder="portion creep, weekends, safety…" style="width:100%">
    </div>
    <button class="save-btn btn-gold" onclick="save14DayReview()">Save 14-Day Review</button>
  </div>`;

  if (reviews.length) {
    html += `<div class="card tight"><div class="card-title">Review history</div>`;
    reviews.slice(0, 8).forEach(r => {
      html += `<div class="h-entry"><div class="h-date">${r.date}</div>
        <div class="h-stats">
          <div class="h-stat">Avg wt<span>${r.avgWeight} lb</span></div>
          <div class="h-stat">Waist<span>${r.waist || '—'}"</span></div>
          <div class="h-stat">Sleep<span>${r.sleep || '—'}</span></div>
          <div class="h-stat">Energy<span>${r.energy || '—'}</span></div>
          <div class="h-stat">Strength<span>${r.strength || '—'}</span></div>
          <div class="h-stat">Phase<span>${r.phase || '—'}</span></div>
        </div>
        ${r.notes ? `<div style="font-size:12px;color:var(--muted);margin-top:6px">${r.notes}</div>` : ''}
      </div>`;
    });
    html += `</div>`;
  }

  html += `
  ${lastCoachDate ? `<div class="coach-banner" onclick="switchPage('coach')">Last coach analysis: ${lastCoachDate} — open Coach ›</div>` : ''}

  <div class="card">
    <div class="card-title">AI Photo Scan <span class="badge-sm badge-gold">Snap &amp; Auto-Fill</span></div>
    <div style="font-size:13px;color:var(--muted);margin-bottom:14px;line-height:1.7">
      Upload scale + measurement screenshots. Numbers fill the check-in below.
    </div>
    <div class="upload-grid" style="margin-bottom:10px">
      <label class="upload-tile ${photos.scale && (typeof photos.scale === 'object' ? photos.scale.b64 : photos.scale) ? 'has' : ''}">
        <input type="file" accept="image/*" onchange="handleCheckinScan(event,'scale')">
        <div class="ui">Scale</div><div class="ul">${photos.scale && (typeof photos.scale === 'object' ? photos.scale.b64 : photos.scale) ? '✓' : 'Photo'}</div>
      </label>
      <label class="upload-tile ${photos.measurements && (typeof photos.measurements === 'object' ? photos.measurements.b64 : photos.measurements) ? 'has' : ''}">
        <input type="file" accept="image/*" onchange="handleCheckinScan(event,'measurements')">
        <div class="ui">Tape</div><div class="ul">${photos.measurements && (typeof photos.measurements === 'object' ? photos.measurements.b64 : photos.measurements) ? '✓' : 'Measures'}</div>
      </label>
      <label class="upload-tile ${photos.bodyfat && (typeof photos.bodyfat === 'object' ? photos.bodyfat.b64 : photos.bodyfat) ? 'has' : ''}">
        <input type="file" accept="image/*" onchange="handleCheckinScan(event,'bodyfat')">
        <div class="ui">Extra</div><div class="ul">${photos.bodyfat && (typeof photos.bodyfat === 'object' ? photos.bodyfat.b64 : photos.bodyfat) ? '✓' : 'Stats'}</div>
      </label>
    </div>
    <button class="proc-btn" id="scan-btn" onclick="runCheckinScan()" ${!scanReady ? 'disabled' : ''}>
      Scan Photos &amp; Auto-Fill
    </button>
    <div class="ai-out" id="scan-out"></div>
  </div>

  <div class="card">
    <div class="card-title">Measurement check-in <span class="badge-sm badge-amber">Weekly or 14-day</span></div>
    <div class="meas-grid">
      <div class="mfield"><label>Weight (lbs)</label><input id="ci-weight" type="number" step="0.1" placeholder="${PROTOCOL.start.weight}"></div>
      <div class="mfield"><label>Body Fat %</label><input id="ci-bf" type="number" step="0.1" placeholder="${PROTOCOL.start.bf}"></div>
      <div class="mfield"><label>Waist (in)</label><input id="ci-waist" type="number" step="0.25" placeholder="${PROTOCOL.start.waist}"></div>
      <div class="mfield"><label>Shoulders (in)</label><input id="ci-shoulders" type="number" step="0.25" placeholder="${PROTOCOL.start.shoulders}"></div>
      <div class="mfield"><label>Chest (in)</label><input id="ci-chest" type="number" step="0.25" placeholder="44"></div>
      <div class="mfield"><label>Neck (in)</label><input id="ci-neck" type="number" step="0.25" placeholder="16"></div>
      <div class="mfield"><label>Arms L/R avg (in)</label><input id="ci-arms" type="number" step="0.25" placeholder="15.75"></div>
      <div class="mfield"><label>Forearms (in)</label><input id="ci-forearms" type="number" step="0.25" placeholder="13"></div>
      <div class="mfield"><label>Abdomen (in)</label><input id="ci-abdomen" type="number" step="0.25" placeholder="38"></div>
      <div class="mfield"><label>Hips (in)</label><input id="ci-hips" type="number" step="0.25" placeholder="42.7"></div>
      <div class="mfield"><label>Thighs (in)</label><input id="ci-thighs" type="number" step="0.25" placeholder="24"></div>
      <div class="mfield"><label>Calves (in)</label><input id="ci-calves" type="number" step="0.25" placeholder="15.25"></div>
    </div>
    <div class="card-title" style="margin-top:4px">Progress Photos</div>
    <div class="photo-grid">
      <label class="photo-tile ${photos.front ? 'has' : ''}"><input type="file" accept="image/*" onchange="handleProgressPhoto(event,'front')">${photos.front ? `<img src="${photos.front}" alt="front">` : '<div class="pi">Front</div>'}</label>
      <label class="photo-tile ${photos.back ? 'has' : ''}"><input type="file" accept="image/*" onchange="handleProgressPhoto(event,'back')">${photos.back ? `<img src="${photos.back}" alt="back">` : '<div class="pi">Back</div>'}</label>
      <label class="photo-tile ${photos.side ? 'has' : ''}"><input type="file" accept="image/*" onchange="handleProgressPhoto(event,'side')">${photos.side ? `<img src="${photos.side}" alt="side">` : '<div class="pi">Side</div>'}</label>
      <label class="photo-tile ${photos.flex ? 'has' : ''}"><input type="file" accept="image/*" onchange="handleProgressPhoto(event,'flex')">${photos.flex ? `<img src="${photos.flex}" alt="flex">` : '<div class="pi">Flexed</div>'}</label>
    </div>
    <button class="save-btn btn-gold" onclick="saveCheckin()">Save Check-In</button>
  </div>`;

  if (checkins.length > 0) {
    html += `<div class="card"><div class="card-title">History</div>`;
    checkins.slice(0, 12).forEach(c => {
      html += `<div class="h-entry"><div class="h-date">${c.date}</div><div class="h-stats">
        ${['weight', 'waist', 'shoulders', 'bf', 'chest', 'arms', 'neck', 'thighs', 'calves', 'hips', 'abdomen'].map(f => c[f] ? `<div class="h-stat">${f.charAt(0).toUpperCase() + f.slice(1)}<span>${c[f]}${f === 'weight' ? ' lbs' : f === 'bf' ? '%' : '"'}</span></div>` : '').join('')}
      </div>`;
      if (c.photos && ['front', 'back', 'side', 'flex'].some(k => c.photos[k])) {
        html += `<div class="h-photos">`;
        ['front', 'back', 'side', 'flex'].forEach(k => { if (c.photos[k]) html += `<img class="h-photo" src="${c.photos[k]}" alt="${k}">`; });
        html += `</div>`;
      }
      html += `</div>`;
    });
    html += `</div>`;
  }
  document.getElementById('page-review').innerHTML = html;
}

function save14DayReview() {
  const avg = sevenDayAvg();
  const entry = {
    date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }),
    avgWeight: avg.avg,
    waist: parseFloat(document.getElementById('r-waist')?.value) || getS('checkins', [])[0]?.waist || null,
    sleep: document.getElementById('r-sleep')?.value || '',
    energy: document.getElementById('r-energy')?.value || '',
    strength: document.getElementById('r-strength')?.value.trim() || '',
    notes: document.getElementById('r-notes')?.value.trim() || '',
    phase: currentTaperPhase().id,
  };
  const reviews = getS('reviews_14d', []);
  reviews.unshift(entry);
  saveState('reviews_14d', reviews);
  toast('14-day review saved');
  renderReviewPage();
}

function handleCheckinScan(ev, slot) {
  const f = ev.target.files[0]; if (!f) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX = 1200;
      let w = img.width, h = img.height;
      if (w > h) { if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; } }
      else { if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; } }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      const b64 = dataUrl.split(',')[1];
      const p = getS('checkin_photos_draft', {});
      p[slot] = { b64, mime: 'image/jpeg' };
      saveState('checkin_photos_draft', p);
      renderReviewPage();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(f);
}
function handleProgressPhoto(ev, slot) {
  const f = ev.target.files[0]; if (!f) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => {
      const MAX = 600;
      let w = img.width, h = img.height;
      if (w > h) { if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; } }
      else { if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; } }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const compressed = canvas.toDataURL('image/jpeg', 0.72);
      const p = getS('checkin_photos_draft', {});
      p[slot] = compressed;
      saveState('checkin_photos_draft', p);
      renderReviewPage();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(f);
}

async function runCheckinScan() {
  const photos = getS('checkin_photos_draft', {}), btn = document.getElementById('scan-btn'), out = document.getElementById('scan-out');
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>Reading your stats…';
  out.className = 'ai-out show'; out.textContent = 'Scanning…';
  const content = [];
  ['scale', 'measurements', 'bodyfat'].forEach(type => {
    if (photos[type]) {
      const img = photos[type], b64 = typeof img === 'object' ? img.b64 : img, mime = typeof img === 'object' ? img.mime : 'image/jpeg';
      content.push({ type: 'text', text: `Image: ${type}` });
      content.push({ type: 'image', source: { type: 'base64', media_type: mime, data: b64 } });
    }
  });
  content.push({ type: 'text', text: `Read all fitness measurement data. Output ONLY:\n\nWEIGHT: [number] lbs\nBODY_FAT: [number] %\nWAIST: [number] in\nSHOULDERS: [number] in\nCHEST: [number] in\nNECK: [number] in\nARMS: [number] in\nFOREARMS: [number] in\nABDOMEN: [number] in\nHIPS: [number] in\nTHIGHS: [number] in\nCALVES: [number] in\n\nSkip fields not visible. Bilateral → average.\nSUMMARY: [one line]` });
  try {
    const apiKey2 = getS('api_key', '');
    const resp = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(apiKey2 ? { 'x-api-key': apiKey2 } : {}) }, body: JSON.stringify({ messages: [{ role: 'user', content }] }) });
    const data = await resp.json(); const text = data.content?.map(c => c.text || '').join('') || 'No response.';
    out.textContent = text;
    const map = { WEIGHT: 'weight', BODY_FAT: 'bf', WAIST: 'waist', SHOULDERS: 'shoulders', CHEST: 'chest', NECK: 'neck', ARMS: 'arms', FOREARMS: 'forearms', ABDOMEN: 'abdomen', HIPS: 'hips', THIGHS: 'thighs', CALVES: 'calves' };
    let filled = 0;
    Object.entries(map).forEach(([key, id]) => {
      const m = text.match(new RegExp(key + ':\\s*([\\d.]+)', 'i'));
      if (m) { const el = document.getElementById('ci-' + id); if (el) { el.value = parseFloat(m[1]); filled++; } }
    });
    const wm = text.match(/WEIGHT:\s*([\d.]+)/i);
    if (wm) setWeight(dateKey(todayDate()), parseFloat(wm[1]));
    toast(`${filled} fields auto-filled — review & save`);
  } catch (err) { out.textContent = 'Error: ' + err.message; }
  btn.disabled = false; btn.innerHTML = 'Scan Photos &amp; Auto-Fill';
}

function saveCheckin() {
  const fields = ['weight', 'bf', 'waist', 'shoulders', 'chest', 'neck', 'arms', 'forearms', 'abdomen', 'hips', 'thighs', 'calves'];
  const entry = { date: new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) };
  fields.forEach(f => { const v = parseFloat(document.getElementById('ci-' + f)?.value); if (!isNaN(v)) entry[f] = v; });
  if (entry.weight) setWeight(dateKey(todayDate()), entry.weight);
  const allPhotos = getS('checkin_photos_draft', {}); entry.photos = {};
  ['front', 'back', 'side', 'flex'].forEach(k => { if (allPhotos[k] && typeof allPhotos[k] === 'string') entry.photos[k] = allPhotos[k]; });
  const checkins = getS('checkins', []); checkins.unshift(entry);
  saveState('checkins', checkins); saveState('checkin_photos_draft', {});
  toast('Check-in saved');
  renderReviewPage();
}

// ── PROGRESS PAGE ─────────────────────────────────────────────────────────────
function renderProgressPage() {
  const checkins = getS('checkins', []);
  const weeklyData = [];
  for (let i = 7; i >= 0; i--) {
    const wk = weekKey(-i), state = getS('checks_' + wk, {});
    let total = 0, hit = 0;
    DAYS.forEach(day => {
      const kpis = buildKPIs(day);
      total += kpis.length; hit += kpis.filter(k => state[sk(wk, day, k.id)]).length;
    });
    weeklyData.push({ label: fmt(weekStart(-i)), pct: total > 0 ? Math.round((hit / total) * 100) : 0 });
  }
  const monthWeeks = weeklyData.slice(4);
  const avgC = monthWeeks.length ? Math.round(monthWeeks.reduce((a, w) => a + w.pct, 0) / monthWeeks.length) : 0;
  const streak = calcStreak(), proj = calcProjectedDate(), phase = currentTaperPhase(), avg = sevenDayAvg();
  const latest = checkins[0] || {};
  const sw = latest.shoulders || PROTOCOL.start.shoulders, wt = latest.waist || PROTOCOL.start.waist;
  const ratio = (sw / wt).toFixed(3), rNum = parseFloat(ratio);
  const rColor = rNum >= 1.6 ? 'var(--green)' : rNum >= 1.5 ? 'var(--amber)' : 'var(--red)';

  function spark(pts, color, w, h) {
    if (pts.length < 2) return `<text x="${w / 2}" y="${h / 2 + 4}" text-anchor="middle" font-size="10" fill="var(--faint)">log more check-ins</text>`;
    const mn = Math.min(...pts) * 0.97, mx = Math.max(...pts) * 1.03, range = mx - mn || 1;
    const coords = pts.map((v, i) => `${Math.round((i / (pts.length - 1)) * w)},${Math.round(h - ((v - mn) / range) * (h - 14) - 7)}`);
    const last = coords[coords.length - 1].split(',');
    return `<polyline points="${coords.join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${last[0]}" cy="${last[1]}" r="3.5" fill="${color}"/>
      <text x="${last[0]}" y="${Math.max(12, parseInt(last[1]) - 8)}" text-anchor="middle" font-size="10" font-family="DM Mono,monospace" fill="${color}">${pts[pts.length - 1]}</text>`;
  }

  let barSvg = `<svg viewBox="0 0 320 90" style="width:100%;height:90px">`;
  weeklyData.forEach((w, i) => {
    const x = i * 40 + 4, bh = Math.round((w.pct / 100) * 65), by = 70 - bh;
    const col = w.pct >= 80 ? 'var(--green)' : w.pct >= 60 ? 'var(--amber)' : 'var(--red)';
    barSvg += `<rect x="${x}" y="${by}" width="32" height="${Math.max(bh, 2)}" rx="3" fill="${col}" opacity="0.75"/>`;
    if (w.pct > 0) barSvg += `<text x="${x + 16}" y="${by - 4}" text-anchor="middle" font-size="8" font-family="DM Mono,monospace" fill="${col}">${w.pct}%</text>`;
    barSvg += `<text x="${x + 16}" y="83" text-anchor="middle" font-size="7" font-family="DM Sans,sans-serif" fill="var(--faint)">${w.label.split(' ')[1] || w.label}</text>`;
  });
  barSvg += `</svg>`;

  function trendCard(label, pts, color, unit, goal, inverse) {
    const latestP = pts[pts.length - 1], prev = pts[pts.length - 2];
    const chg = latestP != null && prev != null ? parseFloat((latestP - prev).toFixed(1)) : null;
    const onTrack = inverse ? (latestP != null && latestP <= goal) : (latestP != null && latestP >= goal);
    return `<div class="trend-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
        <div>
          <div style="font-size:10px;color:var(--muted);letter-spacing:.07em;text-transform:uppercase;font-weight:600;margin-bottom:4px">${label}</div>
          <div class="stat-num" style="color:${onTrack ? 'var(--green)' : 'var(--gold)'}">${latestP != null ? latestP + unit : '—'}</div>
          ${chg != null ? `<div style="font-size:11px;font-family:'DM Mono',monospace;margin-top:4px;color:${(inverse ? chg < 0 : chg > 0) ? 'var(--green)' : 'var(--red)'}">${chg > 0 ? '+' : ''}${chg}${unit} vs prior</div>` : ''}
        </div>
        <div style="text-align:right">
          <div style="font-size:10px;color:var(--muted);margin-bottom:3px;font-weight:600;letter-spacing:.05em;text-transform:uppercase">Goal</div>
          <div style="font-size:20px;font-weight:700;color:var(--green)">${goal}${unit}</div>
        </div>
      </div>
      <svg viewBox="0 0 280 55" style="width:100%;height:55px">${spark(pts, color, 280, 55)}</svg>
    </div>`;
  }

  const rc = checkins.slice(0, 10).reverse();
  const wp = rc.map(c => c.weight).filter(Boolean);
  const wsp = rc.map(c => c.waist).filter(Boolean);
  const shp = rc.map(c => c.shoulders).filter(Boolean);
  const bfp = rc.map(c => c.bf).filter(Boolean);

  const measures = [
    { key: 'shoulders', label: 'Shoulders', target: 52 },
    { key: 'waist', label: 'Waist', target: 32, inv: true },
    { key: 'chest', label: 'Chest', target: 44 },
    { key: 'arms', label: 'Arms', target: 16 },
    { key: 'neck', label: 'Neck', target: 16.5 },
    { key: 'thighs', label: 'Thighs', target: 24 },
    { key: 'calves', label: 'Calves', target: 15.5 },
    { key: 'hips', label: 'Hips', target: 37, inv: true },
    { key: 'abdomen', label: 'Abdomen', target: 31, inv: true },
  ];

  let html = `
  <div class="card tight">
    <div class="card-title">Route status</div>
    <div class="route-line">
      <div><span class="route-lab">Now</span><strong>${avg.avg} lb</strong></div>
      <div class="route-arrow">→</div>
      <div><span class="route-lab">Cut end</span><strong>${PROTOCOL.goal.cutEnd}</strong></div>
      <div class="route-arrow">→</div>
      <div><span class="route-lab">Settle</span><strong>${PROTOCOL.goal.settle}</strong></div>
    </div>
    <div style="font-size:12px;color:var(--muted);margin-top:10px;font-family:'DM Mono',monospace">
      Phase ${phase.id}: ${phase.label} · base ${phase.base} · mission is waist + V-taper, not the scale
    </div>
  </div>

  <div class="card">
    <div class="card-title">V-taper · shoulders ÷ waist</div>
    <div class="ratio-hero">
      <div><div class="ratio-label">Current</div><div class="ratio-val" style="color:${rColor}">${ratio}</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:4px;font-family:'DM Mono',monospace">${sw}" ÷ ${wt}"</div>
      </div>
      <div style="text-align:right"><div class="ratio-label">Target</div><div class="ratio-val" style="color:#6fcf97">1.625</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:4px;font-family:'DM Mono',monospace">52 ÷ 32</div>
      </div>
    </div>
    <div class="adonis-grid">`;
  measures.forEach(m => {
    const cur = latest[m.key] || (m.key === 'shoulders' ? PROTOCOL.start.shoulders : m.key === 'waist' ? PROTOCOL.start.waist : 0);
    const pct = cur ? Math.min(100, Math.round(m.inv ? (m.target / cur) * 100 : (cur / m.target) * 100)) : 0;
    const col = pct >= 95 ? 'var(--green)' : pct >= 75 ? 'var(--amber)' : 'var(--red)';
    const diff = cur ? Math.abs(parseFloat((m.inv ? cur - m.target : m.target - cur).toFixed(2))) : null;
    html += `<div class="adonis-tile"><div class="at-label">${m.label}</div><div class="at-row"><div class="at-cur" style="color:${cur ? col : 'var(--faint)'}">${cur ? cur + '"' : '—'}</div><div class="at-target">goal ${m.target}"</div></div>${diff && diff > 0.05 ? `<div style="font-size:10px;font-family:'DM Mono',monospace;color:${col};margin-top:3px">${m.inv ? diff + '" to lose' : diff + '" to gain'}</div>` : ''}<div class="at-bar"><div class="at-fill" style="width:${pct}%;background:${col}"></div></div></div>`;
  });
  html += `</div></div>

  <div class="card">
    <div class="card-title">Compliance · 8 weeks</div>
    <div class="kpi-grid" style="margin-bottom:12px">
      <div class="kpi-tile"><div class="big ${avgC >= 80 ? 'green' : avgC >= 60 ? 'amber' : 'red'}">${avgC}<span style="font-size:14px;color:var(--faint)">%</span></div><div class="lbl">Avg</div></div>
      <div class="kpi-tile"><div class="big gold">${streak}</div><div class="lbl">Wk Streak</div></div>
      <div class="kpi-tile"><div class="big" style="font-size:18px;color:var(--gold)">${phase.id}</div><div class="lbl">Phase</div></div>
      <div class="kpi-tile"><div class="big" style="font-size:16px">${avg.avg}</div><div class="lbl">7d Avg</div></div>
    </div>
    ${barSvg}
    ${proj ? `<div style="margin-top:12px;font-size:12px;color:var(--muted);font-family:'DM Mono',monospace">Projected 32" waist: ${proj.date} · ${proj.weeks} weeks · ${proj.weeklyLoss}" / wk</div>` : ''}
  </div>`;

  if (checkins.length >= 2) {
    html += trendCard('Weight', wp, 'var(--blue)', ' lbs', 188, true);
    html += trendCard('Waist', wsp, 'var(--red)', '"', 32, true);
    html += trendCard('Shoulders', shp, 'var(--green)', '"', 52, false);
    if (bfp.length >= 2) html += trendCard('Body Fat %', bfp, 'var(--amber)', '%', 10, true);
  } else {
    html += `<div class="card" style="text-align:center;padding:28px"><div style="font-size:13px;color:var(--muted)">Log 2+ check-ins to unlock trend graphs. Mission is waist + mirror, not one weigh-in.</div></div>`;
  }

  document.getElementById('page-progress').innerHTML = html;
}

// ── PLAN PAGE (protocol reference) ────────────────────────────────────────────
function renderPlanPage() {
  const phase = currentTaperPhase();
  const apiKey = getS('api_key', '');
  let html = `
  <div class="card tight">
    <div class="card-title">The system in one line</div>
    <p class="plan-lead">Same boring meals every day, ~1,500-calorie template, 170g+ protein, lift 3×/week, daily cardio and 15,000 steps, no weekends off — front-load the deficit while fat is highest, then slow down as you get leaner.</p>
    <div class="plan-goal">Goal: ${PROTOCOL.goal.waist}" waist · ~${PROTOCOL.goal.shoulders}" shoulders kept · cut to ~${PROTOCOL.goal.cutEnd} lb · reverse to ~${PROTOCOL.goal.settle} lb</div>
  </div>

  <div class="card tight">
    <div class="card-title">Taper <span class="badge-sm badge-amber">Phase ${phase.id} active</span></div>
    <div class="taper-list">`;
  TAPER.forEach(t => {
    const on = t.id === phase.id;
    html += `<div class="taper-row ${on ? 'on' : ''}">
      <div class="taper-id">${t.id}</div>
      <div><div class="taper-when">${t.when}</div><div class="taper-base">Base ${t.base}${t.lift ? ` · ${t.lift}` : ''}</div></div>
      ${on ? '<div class="taper-now">NOW</div>' : ''}
    </div>`;
  });
  html += `</div>
    <div style="font-size:12px;color:var(--muted);margin-top:10px;line-height:1.6">Protein stays ~170g at every stage. Stall: audit tracking 2 full weeks before changing anything.</div>
    <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">
      <button class="save-btn btn-navy" style="width:auto;padding:10px 14px" onclick="toggleReverse(false)">On cut (auto taper)</button>
      <button class="save-btn btn-gold" style="width:auto;padding:10px 14px" onclick="startReverse()">Start reverse diet</button>
    </div>
  </div>

  <div class="card tight">
    <div class="card-title">Reverse diet (exit)</div>
    <div class="taper-list">`;
  REVERSE.forEach(r => {
    html += `<div class="taper-row"><div class="taper-id">W${r.week}</div><div><div class="taper-when">${r.kcal} kcal</div><div class="taper-base">${r.note}</div></div></div>`;
  });
  html += `</div>
    <div style="font-size:12px;color:var(--muted);margin-top:10px">No celebratory eating. Scale bumps in weeks 3–4 are glycogen/water.</div>
  </div>

  <div class="card tight">
    <div class="card-title">Weekly meal chart</div>`;
  DAYS.forEach(day => {
    const m = MEALS[day];
    html += `<div class="plan-meal-day">
      <div class="pmd-name">${day.slice(0, 3)}${m.lift ? ' · lift' : ''}</div>
      <div class="pmd-body"><strong>L</strong> ${m.lunch.detail}<br><strong>D</strong> ${m.dinner.detail}<br><span class="meal-macros">${m.totals.kcal} / ${m.totals.protein}g P${m.lift ? ' + pre-WO rice' : ''}</span></div>
    </div>`;
  });
  html += `<div class="meal-macros" style="margin-top:8px">Breakfast every day: ${BREAKFAST.detail}</div></div>

  <div class="card tight">
    <div class="card-title">Food rules (non-negotiable)</div>
    <ul class="rule-list">${FOOD_RULES.map(r => `<li>${r}</li>`).join('')}</ul>
  </div>

  <div class="card tight">
    <div class="card-title">Training · Movie Star Body</div>
    <div style="font-size:13px;color:var(--muted);margin-bottom:10px">Mon / Wed / Fri · ~1 hour · always lift BEFORE cardio · progressive overload · logbook is a health instrument</div>`;
  ['Monday', 'Wednesday', 'Friday'].forEach(d => {
    const p = LIFT_PROGRAM[d];
    html += `<div class="plan-lift"><div class="pmd-name">${d} · ${p.title}</div><ul class="rule-list compact">${p.exercises.map(e => `<li>${e.name} — ${e.scheme}</li>`).join('')}</ul></div>`;
  });
  html += `</div>

  <div class="card tight">
    <div class="card-title">Movement · every day</div>
    <ul class="rule-list">
      <li>Steady-state cardio ${PROTOCOL.cardioBpm} bpm (never 160+), burning ${PROTOCOL.cardioKcal} kcal</li>
      <li>${PROTOCOL.stepsTarget.toLocaleString()} steps/day — post-meal walks help</li>
      <li>Chaotic-week floor: 3–4 formal cardio sessions. No weekend version of this plan.</li>
    </ul>
  </div>

  <div class="card tight">
    <div class="card-title">Mindset</div>
    <ul class="rule-list">
      <li>Be → Do → Have. Act as the man who already lives lean.</li>
      <li>Question in hard moments: “What would the 195-lb version of me do right now?”</li>
      <li>I am a man who keeps his word to himself.</li>
      <li>Boring is the point — decision fatigue is the known bottleneck.</li>
      <li>First week is the hardest. Don’t judge the plan by week one.</li>
      <li>Progress in 14-day blocks: 7-day avg weight, weekly waist, strength, sleep/energy.</li>
    </ul>
  </div>

  <div class="safety-strip">
    <div class="safety-title">Safety — part of the plan</div>
    <div class="safety-body" style="margin-bottom:10px">Prior cardiac ablation · low hemoglobin reading · no medical clearance on file · hemoglobin follow-up open. You directed this aggressive plan and stated your heart is good. Helpers: if you see a stop sign, say so plainly and immediately.</div>
    <ul class="rule-list" style="color:inherit">${SAFETY_STOPS.map(s => `<li>${s}</li>`).join('')}</ul>
  </div>

  <div class="card">
    <div class="card-title">Settings</div>
    <div class="mfield" style="margin-bottom:12px">
      <label>Anthropic API Key (screenshot + coach)</label>
      <input id="api-key-input" type="password" placeholder="sk-ant-…" value="${apiKey}" style="background:var(--surface2);border:1px solid var(--border2);border-radius:8px;padding:10px 11px;color:var(--text);font-size:13px;font-family:'DM Mono',monospace;width:100%">
    </div>
    <button class="save-btn btn-green" onclick="saveApiKey()" style="margin-bottom:12px">Save API Key</button>
    <div style="font-size:12px;color:var(--muted);font-family:'DM Mono',monospace;margin-bottom:12px">
      Monday reminder: <span style="color:${getS('notif_enabled', false) && ('Notification' in window) && Notification.permission === 'granted' ? 'var(--green)' : 'var(--amber)'}">${getS('notif_enabled', false) && ('Notification' in window) && Notification.permission === 'granted' ? 'Enabled' : 'Not enabled'}</span>
    </div>
    <button class="save-btn btn-navy" onclick="requestNotificationPermission()">Enable Monday Reminders</button>
  </div>

  <div class="card tight">
    <div class="card-title">How to help me</div>
    <ul class="rule-list">
      <li>Hold me to the plan as written — don’t soften or redesign without my explicit word.</li>
      <li>Review every 14 days: 7-day avg weight, waist, strength log, sleep, energy. Recommend ONE adjustment at a time.</li>
      <li>If I stall, audit tracking accuracy before touching calories or training.</li>
      <li>Remind me of the identity, not just the numbers.</li>
    </ul>
  </div>`;

  document.getElementById('page-plan').innerHTML = html;
}

function toggleReverse(on) {
  saveState('in_reverse', !!on);
  if (!on) toast('Back on cut — taper follows 7-day average');
  render();
}
function startReverse() {
  saveState('in_reverse', true);
  saveState('reverse_kcal', 2250);
  saveState('reverse_week', 1);
  toast('Reverse diet Week 1 · 2,250 kcal · fats first');
  render();
}
function saveApiKey() {
  saveState('api_key', document.getElementById('api-key-input').value.trim());
  toast('API key saved');
}

// ── COACH PAGE ────────────────────────────────────────────────────────────────
function renderCoachPage() {
  const last = getS('last_coach_analysis', ''), date = getS('last_coach_date', '');
  document.getElementById('page-coach').innerHTML = `
    <div class="card">
      <div class="card-title">Accountability coach <span class="badge-sm badge-gold">Holds the line</span></div>
      <div style="font-size:13px;color:var(--muted);margin-bottom:16px;line-height:1.7">
        Reviews compliance against the locked protocol. Does <strong>not</strong> redesign meals, macros, or training unless you explicitly ask.
        Stall → audit tracking first. At most ONE recommended adjustment.
      </div>
      <button class="save-btn btn-purple" id="analyze-btn" onclick="runCoachAnalysis()" style="margin-bottom:12px">
        Review My Execution
      </button>
      <div class="coach-out ${last ? 'show' : ''}" id="coach-out">${last || ''}</div>
      ${date ? `<div style="font-size:10px;color:var(--faint);margin-top:10px;font-family:'DM Mono',monospace">Last reviewed: ${date}</div>` : ''}
    </div>
    <div class="identity-strip">I am a man who keeps his word to himself.</div>`;
}

function buildCoachPrompt() {
  const wk = weekKey(0), state = getS('checks_' + wk, {}), checkins = getS('checkins', []);
  const latest = checkins[0] || {}, prev = checkins[1] || {};
  const avg = sevenDayAvg(), phase = currentTaperPhase();
  const reviews = getS('reviews_14d', []);
  let sum = `WEEK: ${wk}\n7-DAY AVG WEIGHT: ${avg.avg} lb (${avg.n}/7 logged)\nTAPER PHASE: ${phase.id} — ${phase.when} · base ${phase.base}\n\nKPI COMPLIANCE:\n`;
  DAYS.forEach(day => {
    const cfg = dayCfg(day), kpis = buildKPIs(day), done = kpis.filter(k => state[sk(wk, day, k.id)]);
    sum += `${day} (${cfg.label}): ${done.length}/${kpis.length} — ${done.map(k => k.id).join(', ') || 'none'}\n`;
  });
  // Strength log snapshot
  sum += `\nTOP-SET LOGS THIS WEEK:\n`;
  ['Monday', 'Wednesday', 'Friday'].forEach(day => {
    const ll = getS('lifts_' + wk + '_' + day, {});
    const entries = Object.values(ll).filter(x => x && x.top);
    sum += entries.length ? `${day}: ${entries.map(e => `${e.name} ${e.top}`).join('; ')}\n` : `${day}: (none logged)\n`;
  });
  if (latest.weight) {
    const f = ['weight', 'bf', 'waist', 'shoulders', 'chest', 'arms', 'neck', 'abdomen', 'hips', 'thighs', 'calves'];
    sum += `\nLATEST CHECK-IN (${latest.date || 'recent'}):\n`;
    f.forEach(x => { if (latest[x]) sum += `${x}: ${latest[x]}${x === 'weight' ? ' lbs' : x === 'bf' ? '%' : '"'}\n`; });
  }
  if (prev.weight && latest.weight) {
    sum += `\nCHANGES vs PRIOR CHECK-IN:\n`;
    if (latest.weight && prev.weight) sum += `Weight: ${prev.weight}→${latest.weight}\n`;
    if (latest.waist && prev.waist) sum += `Waist: ${prev.waist}"→${latest.waist}"\n`;
    if (latest.shoulders && prev.shoulders) sum += `Shoulders: ${prev.shoulders}"→${latest.shoulders}"\n`;
  }
  if (reviews[0]) sum += `\nLATEST 14-DAY REVIEW: sleep ${reviews[0].sleep}, energy ${reviews[0].energy}, strength ${reviews[0].strength}, notes: ${reviews[0].notes || '—'}\n`;

  return `You are the accountability partner for DePaul Foxworth's LOCKED fat-loss protocol. Your job is to help him EXECUTE the plan as written — not redesign it.

CLIENT: Male, early 30s, 6'0". Start (Nov 20, 2026): 226.2 lb, 38" waist, 52.5" shoulders, ~27% BF.
GOAL: 32" waist, keep ~52" shoulders, visible abs. Cut once to ~186–188 lb (~9–10% BF), reverse-diet, settle ~195 lb (12–15%) on ~3,000 kcal.
SYSTEM: Identical weekly meals (~1,582 kcal avg, 174g P), lift Mon/Wed/Fri (Movie Star Body / Kinobody), daily cardio 140–150 bpm + 15,000 steps, 9h sleep, no weekends off.
PROTEIN FLOOR: 170g every day. Only shake: breakfast ISO 100 × 2 scoops. All other protein is real food.
TAPER: 226→205 full template; under 205 +250; under 195 +250 to ~2000; 195→186–188 hold ~2000. Stall: audit tracking 2 weeks before changing anything.
SAFETY (say plainly if present): unusual fatigue, dizziness/near-fainting, palpitations, strength drop across 3+ sessions, sleep collapse, repeated illness. History: cardiac ablation, low hemoglobin follow-up open.
IDENTITY: Be→Do→Have. "What would the 195-lb version of me do right now?" Man who keeps his word to himself. Boring is the point.

RULES FOR YOUR RESPONSE:
1. Do NOT change meals, macros, or training structure unless he explicitly asked in the data to redesign.
2. If stalled, demand a tracking audit before any calorie/training change.
3. Recommend at most ONE adjustment, and only if clearly warranted.
4. Judge progress by 7-day avg weight, waist, strength trend, sleep/energy — never one morning.
5. Remind him of identity, not just numbers.
6. If any safety stop-sign appears in the data, lead with STOP AND CHECK IN WITH CARE TEAM.

${sum}

Provide:
━━━ EXECUTION SCORECARD ━━━
Score /100, one-line verdict on fidelity to the written plan.

━━━ WHAT HE KEPT ━━━
Specific wins — meals, steps, lifts, sleep, identity follow-through.

━━━ LEAKS ━━━
Where he negotiated with the plan. Be direct.

━━━ MEASUREMENT READ ━━━
7-day avg, waist, shoulders/V-taper, strength log. Water vs fat if scale is flat.

━━━ SAFETY CHECK ━━━
Clear / or flag stop signs.

━━━ ONE ADJUSTMENT (or NONE) ━━━
At most one. Prefer "none — keep executing" when fidelity is the issue.

━━━ IDENTITY ━━━
One sentence that puts him back in the man who keeps his word.`;
}

async function buildAndRunCoach() {
  const prompt = buildCoachPrompt();
  const apiKey3 = getS('api_key', '');
  const resp = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(apiKey3 ? { 'x-api-key': apiKey3 } : {}) },
    body: JSON.stringify({ messages: [{ role: 'user', content: [{ type: 'text', text: prompt }] }], max_tokens: 2000 }),
  });
  const data = await resp.json();
  return data.content?.map(c => c.text || '').join('') || data.error || null;
}

async function runCoachAnalysis() {
  const btn = document.getElementById('analyze-btn'), out = document.getElementById('coach-out');
  if (!btn || !out) return;
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>Reviewing execution…';
  out.className = 'coach-out show'; out.textContent = 'Checking fidelity to the locked plan…';
  try {
    const text = await buildAndRunCoach();
    if (text) {
      out.textContent = text;
      saveState('last_coach_analysis', text);
      saveState('last_coach_date', new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    }
  } catch (err) { out.textContent = 'Error: ' + err.message; }
  btn.disabled = false; btn.innerHTML = 'Review My Execution';
}

// ── BOOT ──────────────────────────────────────────────────────────────────────
render();

# Lifestyle Body — Fat Loss Protocol Tracker

Execution app for **DePaul Foxworth’s locked fat-loss protocol**.  
Hand this to a coach, accountability partner, or AI: help execute the plan; don’t redesign it.

---

## What this app does

| Tab | Job |
|-----|-----|
| **Today** | Exactly what to eat, lift, and check off — zero decisions |
| **Week** | 7-day compliance + meal preview + screenshot auto-log |
| **Review** | 14-day review block, measurements, photos |
| **Progress** | V-taper, taper phase, weight/waist trends |
| **Plan** | Full protocol reference — meals, rules, taper, reverse, safety |
| **Coach** | Holds you to the written plan (does not rewrite macros) |

---

## Protocol (summary)

- **Mission:** Fat loss + muscle kept. 32" waist · ~52" shoulders. Not the scale.
- **Route:** Cut 226 → ~186–188 lb once → reverse diet → settle ~195 lb.
- **Nutrition:** Same weekly meal chart · ~1,500–1,580 base · 170g+ protein · lift-day pre-WO rice.
- **Training:** Movie Star Body (Kinobody) Mon / Wed / Fri · lift before cardio.
- **Movement:** Cardio 140–150 bpm · 15,000 steps · 7 days/week.
- **Judgment:** 14-day blocks (7-day avg weight, waist, strength, sleep, energy).

Full detail lives in the **Plan** tab inside the app.

---

## Deploy (Vercel + GitHub)

1. Push this repo to GitHub.
2. Import the repo in [vercel.com](https://vercel.com) (sign in with GitHub).
3. Deploy with defaults.
4. Optional: Project → Settings → Environment Variables → `ANTHROPIC_API_KEY` (for screenshot reading + Coach). Or paste the key in **Plan → Settings**.

### Add to iPhone home screen

1. Open the live URL in **Safari**.
2. Share → **Add to Home Screen**.

---

## How to use (day one)

1. Open **Today** — log morning weight, eat the listed meals, check the boxes.
2. Lift days (Mon/Wed/Fri): log every **top set** (health instrument + muscle retention).
3. Sunday / Wednesday: follow the prep callouts (Prep B / Prep A).
4. Every ~14 days: **Review** tab — sleep, energy, strength trend, waist.
5. **Coach** only audits execution against the locked plan; one adjustment max.

---

## Safety

Prior cardiac ablation and a low hemoglobin reading are on record. No medical clearance is on file; hemoglobin follow-up remains open.  
**Stop the aggressive phase and check in with care team** if: unusual fatigue, dizziness/near-fainting, palpitations, strength dropping across 3+ sessions, sleep collapsing, or repeated illness.  
Helpers: if you see a stop sign, say so plainly and immediately.

---

## Data

Everything stores in the browser (`localStorage`). Clearing site data clears history.  
API keys saved in-app stay on-device unless you also set `ANTHROPIC_API_KEY` on Vercel.

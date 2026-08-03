import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="bg" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#c9a84c" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#c9a84c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="0" fill="url(#bg)"/>
  <rect width="512" height="512" rx="0" fill="url(#glow)"/>
  <path d="M256 108 C256 108 210 118 188 138 C172 152 168 170 168 188 L168 210 C168 210 158 218 152 234 C146 250 148 268 148 268 L158 268 C158 268 156 252 162 240 C166 232 172 228 172 228 L172 290 C172 290 164 298 160 314 C156 330 158 360 158 360 L172 360 C172 360 170 334 174 320 C177 310 184 304 184 304 L184 370 L196 370 L196 304 C196 304 200 320 202 340 C204 356 204 370 204 370 L216 370 C216 370 215 354 213 336 C211 318 208 302 208 290 L220 290 C228 290 234 284 234 276 L234 240 C238 244 242 248 244 254 L244 290 C244 290 240 302 238 318 C236 334 236 370 236 370 L248 370 C248 370 248 336 250 320 C252 306 256 296 256 296 C256 296 260 306 262 320 C264 336 264 370 264 370 L276 370 C276 370 276 334 274 318 C272 302 268 290 268 290 L268 254 C270 248 274 244 278 240 L278 276 C278 284 284 290 292 290 L304 290 C304 302 301 318 299 336 C297 354 296 370 296 370 L308 370 C308 370 308 356 310 340 C312 320 316 304 316 304 L316 370 L328 370 L328 304 C328 304 335 310 338 320 C342 334 340 360 340 360 L354 360 C354 360 356 330 352 314 C348 298 340 290 340 290 L340 228 C340 228 346 232 350 240 C356 252 354 268 354 268 L364 268 C364 268 366 250 360 234 C354 218 344 210 344 210 L344 188 C344 170 340 152 324 138 C302 118 256 108 256 108 Z" fill="#c9a84c" fill-opacity="0.92"/>
  <rect x="240" y="82" width="32" height="32" rx="8" fill="#c9a84c" fill-opacity="0.92"/>
  <ellipse cx="256" cy="66" rx="26" ry="28" fill="#c9a84c" fill-opacity="0.92"/>
  <line x1="180" y1="400" x2="332" y2="400" stroke="#c9a84c" stroke-opacity="0.3" stroke-width="1"/>
  <text x="256" y="430" text-anchor="middle" font-family="Georgia,serif" font-size="38" font-weight="700" letter-spacing="12" fill="#c9a84c" fill-opacity="0.95">LB</text>
  <text x="256" y="458" text-anchor="middle" font-family="Georgia,serif" font-size="12" letter-spacing="4" fill="#c9a84c" fill-opacity="0.45">LIFESTYLE BODY</text>
</svg>`;
  res.send(svg);
}

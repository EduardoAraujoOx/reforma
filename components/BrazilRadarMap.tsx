"use client";

import { T } from "./tokens";

const PATH =
  "M 178 38 C 200 28, 230 30, 250 42 C 274 38, 296 46, 308 60 C 330 56, 360 70, 366 92 " +
  "C 390 96, 412 116, 414 138 C 432 150, 446 174, 442 198 C 458 214, 466 240, 458 264 " +
  "C 472 286, 470 314, 454 332 C 462 358, 450 384, 426 396 C 422 422, 402 442, 376 446 " +
  "C 364 470, 340 484, 314 480 C 294 502, 264 510, 240 498 C 218 514, 188 514, 168 498 " +
  "C 142 506, 114 494, 102 470 C 78 466, 60 444, 60 420 C 40 410, 30 386, 36 364 " +
  "C 22 346, 22 320, 36 304 C 26 282, 34 256, 56 244 C 52 220, 64 198, 84 188 " +
  "C 84 162, 100 142, 124 138 C 130 112, 152 92, 178 92 C 178 70, 178 50, 178 38 Z";

const DOTS: [number, number][] = [
  [120,90],[160,82],[200,80],[240,88],[280,96],[320,108],[350,128],
  [110,130],[150,128],[190,130],[230,132],[270,138],[310,148],[350,160],[380,180],
  [85,170],[125,172],[165,174],[205,178],[245,184],[285,190],[325,200],[365,214],[400,232],
  [70,210],[110,214],[150,218],[190,224],[230,230],[270,238],[310,248],[350,260],[390,278],[420,300],
  [60,250],[100,254],[140,260],[180,266],[220,274],[260,282],[300,292],[340,304],[380,318],[418,338],
  [70,290],[110,294],[150,300],[190,308],[230,316],[270,326],[310,338],[348,352],[386,370],
  [90,330],[130,336],[170,344],[210,354],[250,364],[290,376],[326,390],[362,404],
  [110,370],[150,378],[190,388],[230,400],[268,412],[304,424],[340,436],
  [130,410],[170,420],[210,432],[248,444],[284,456],
  [160,448],[200,460],[238,470],
];

const ESX = 412, ESY = 292;

interface Props {
  size?: number;
  sweepSpeed?: number;
  line?: string;
  dot?: string;
}

export default function BrazilRadarMap({
  size = 320,
  sweepSpeed = 9,
  line = "rgba(180,218,226,0.45)",
  dot = "rgba(180,218,226,0.32)",
}: Props) {
  return (
    <svg viewBox="0 0 500 550" width={size} height={size * 1.1}
      style={{ display: "block", overflow: "visible" }} aria-hidden>
      <defs>
        <radialGradient id="br-sweep" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
          gradientTransform={`translate(${ESX} ${ESY}) scale(360)`}>
          <stop offset="0%"   stopColor={T.GOLD} stopOpacity="0.55" />
          <stop offset="40%"  stopColor={T.GOLD} stopOpacity="0.22" />
          <stop offset="80%"  stopColor={T.GOLD} stopOpacity="0.05" />
          <stop offset="100%" stopColor={T.GOLD} stopOpacity="0" />
        </radialGradient>
        <clipPath id="br-clip">
          <path d={PATH} />
        </clipPath>
      </defs>

      {/* Rings centered on ES */}
      <g style={{ opacity: 0.35 }}>
        {[80, 160, 240, 320].map(r => (
          <circle key={r} cx={ESX} cy={ESY} r={r} fill="none"
            stroke={line} strokeWidth="0.6" strokeDasharray="2 6" />
        ))}
        <line x1={ESX - 340} y1={ESY} x2={ESX + 40} y2={ESY}
          stroke={line} strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1={ESX} y1={ESY - 340} x2={ESX} y2={ESY + 340}
          stroke={line} strokeWidth="0.5" strokeDasharray="2 4" />
      </g>

      {/* Dot grid + sweep clipped to silhouette */}
      <g clipPath="url(#br-clip)">
        {DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.6} fill={dot} />
        ))}
        <g style={{
          transformOrigin: `${ESX}px ${ESY}px`,
          animation: `radarSpin ${sweepSpeed}s linear infinite`,
        }}>
          <path
            d={`M ${ESX} ${ESY} L ${ESX - 340} ${ESY - 90} A 360 360 0 0 0 ${ESX - 340} ${ESY + 90} Z`}
            fill="url(#br-sweep)"
          />
          <line x1={ESX} y1={ESY} x2={ESX - 340} y2={ESY}
            stroke={T.GOLD} strokeWidth="1" opacity="0.8" />
        </g>
      </g>

      {/* Outline */}
      <path d={PATH} fill="none" stroke={line} strokeWidth="1.2" />

      {/* ES marker */}
      <circle cx={ESX} cy={ESY} r="14" fill="none" stroke={T.GOLD_LIGHT} strokeWidth="1" opacity="0.4">
        <animate attributeName="r" values="6;18;6" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <circle cx={ESX} cy={ESY} r="5" fill={T.GOLD_LIGHT} />
      <circle cx={ESX} cy={ESY} r="2.2" fill="#fff" />
      <text x={ESX + 12} y={ESY - 8} fill={T.GOLD_LIGHT}
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="11" letterSpacing="1.4" fontWeight="600">ES</text>
    </svg>
  );
}

"use client";

import { T } from "./tokens";

const BRAZIL_COORDS: [number, number][] = [
  [-51.7,4.2],[-51.0,3.8],[-50.9,1.8],[-50.2,0.8],[-49.5,0.5],
  [-49.3,-0.5],[-49.0,-1.0],[-48.0,-1.5],[-46.5,-1.0],[-44.4,-2.5],
  [-42.8,-2.8],[-41.8,-3.0],[-38.5,-3.7],[-37.0,-4.9],[-35.2,-5.4],
  [-34.8,-7.1],[-35.0,-8.1],[-35.7,-9.6],[-37.1,-11.0],[-38.5,-13.0],
  [-39.0,-14.8],[-39.1,-16.4],[-39.3,-17.7],[-39.8,-18.8],[-40.3,-20.3],
  [-41.0,-21.5],[-41.8,-22.4],[-43.1,-22.9],[-44.3,-23.0],[-46.3,-24.0],
  [-47.5,-24.5],[-48.5,-25.5],[-48.5,-27.6],[-49.8,-29.3],[-51.1,-30.0],
  [-52.1,-32.0],[-53.4,-33.7],[-53.7,-33.5],[-55.0,-32.0],[-56.0,-30.8],
  [-58.1,-30.2],[-57.6,-29.5],[-55.8,-28.2],[-54.5,-26.3],[-55.8,-22.0],
  [-57.5,-18.0],[-58.5,-15.5],[-60.5,-14.0],[-62.0,-12.0],[-65.0,-10.5],
  [-68.0,-11.0],[-70.5,-9.5],[-73.0,-9.0],[-73.5,-7.0],[-72.5,-4.5],
  [-70.0,-2.5],[-68.0,-2.0],[-70.0,1.0],[-67.5,2.0],[-64.0,3.5],
  [-62.0,4.0],[-60.2,5.3],[-59.9,4.5],[-59.5,3.5],[-60.0,2.5],
  [-58.0,1.5],[-52.7,2.3],[-51.7,4.2],
];

const STATES = [
  {id:"RR",lon:-61.4,lat:2.0},{id:"AP",lon:-51.9,lat:1.4},
  {id:"AM",lon:-64.6,lat:-4.1},{id:"PA",lon:-52.9,lat:-3.9},
  {id:"MA",lon:-44.4,lat:-4.9},{id:"PI",lon:-42.8,lat:-7.7},
  {id:"CE",lon:-39.3,lat:-5.1},{id:"RN",lon:-36.7,lat:-5.8},
  {id:"PB",lon:-36.8,lat:-7.2},{id:"PE",lon:-37.9,lat:-8.4},
  {id:"AL",lon:-36.6,lat:-9.7},{id:"SE",lon:-37.4,lat:-10.6},
  {id:"BA",lon:-41.7,lat:-13.3},{id:"TO",lon:-48.3,lat:-10.2},
  {id:"RO",lon:-63.6,lat:-10.8},{id:"AC",lon:-70.5,lat:-9.0},
  {id:"MT",lon:-55.9,lat:-12.6},{id:"GO",lon:-49.6,lat:-16.0},
  {id:"DF",lon:-47.9,lat:-15.8},{id:"MG",lon:-44.5,lat:-18.5},
  {id:"MS",lon:-54.7,lat:-20.4},{id:"RJ",lon:-43.2,lat:-22.5},
  {id:"SP",lon:-48.5,lat:-22.3},{id:"PR",lon:-51.6,lat:-24.7},
  {id:"SC",lon:-50.0,lat:-27.3},{id:"RS",lon:-53.1,lat:-30.2},
];

const W = 400, H = 480;

function buildProjection(coords: [number, number][], w: number, h: number) {
  const toMX = (lon: number) => lon * Math.PI / 180;
  const toMY = (lat: number) => -Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
  let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
  for (const [lon, lat] of coords) {
    const mx = toMX(lon), my = toMY(lat);
    if (mx < xMin) xMin = mx; if (mx > xMax) xMax = mx;
    if (my < yMin) yMin = my; if (my > yMax) yMax = my;
  }
  const scale = 0.95 * Math.min(w / (xMax - xMin), h / (yMax - yMin));
  const tx = w / 2 - scale * (xMin + xMax) / 2;
  const ty = h / 2 - scale * (yMin + yMax) / 2;
  return (lon: number, lat: number): [number, number] => [
    scale * toMX(lon) + tx,
    scale * toMY(lat) + ty,
  ];
}

const project = buildProjection(BRAZIL_COORDS, W, H);
const brazilPath = "M " + BRAZIL_COORDS.map(([lon, lat]) => {
  const [x, y] = project(lon, lat);
  return `${x.toFixed(1)},${y.toFixed(1)}`;
}).join(" L ") + " Z";

const [CX, CY] = project(-52.5, -14.5);
const [ESX, ESY] = project(-40.3, -20.3);
const R = 155;
const SIN45 = Math.sin(Math.PI / 4);
const COS45 = Math.cos(Math.PI / 4);
const statePts = STATES.map((s, i) => ({
  ...s,
  xy: project(s.lon, s.lat),
  delay: (i * 0.31).toFixed(2),
}));

export default function BrazilRadarMap() {
  const cx = CX.toFixed(1), cy = CY.toFixed(1);
  const esx = ESX.toFixed(1), esy = ESY.toFixed(1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sweepG" cx={cx} cy={cy} r={R} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={T.GOLD} stopOpacity={0} />
          <stop offset="60%" stopColor={T.GOLD} stopOpacity={0.14} />
          <stop offset="100%" stopColor={T.GOLD} stopOpacity={0.58} />
        </radialGradient>
        <radialGradient id="esGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={T.GOLD} stopOpacity={0.45} />
          <stop offset="100%" stopColor={T.GOLD} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Brazil outline */}
      <path d={brazilPath} fill="#4AABB8" fillOpacity="0.09"
        stroke="#4AABB8" strokeWidth="1.4" strokeOpacity="0.45" strokeLinejoin="round" />

      {/* Radar rings */}
      {[R, R * 0.74, R * 0.48, R * 0.24].map((r, i) => (
        <circle key={i} cx={CX} cy={CY} r={r} fill="none"
          stroke="#4AABB8" strokeWidth="0.6" opacity="0.28" />
      ))}

      {/* Radar crosshairs */}
      {[0, 45, 90, 135].map(a => {
        const rad = a * Math.PI / 180;
        const dx = (R + 6) * Math.cos(rad), dy = (R + 6) * Math.sin(rad);
        return <line key={a} x1={CX - dx} y1={CY - dy} x2={CX + dx} y2={CY + dy}
          stroke="#4AABB8" strokeWidth="0.4" opacity="0.2" />;
      })}

      <circle cx={CX} cy={CY} r="3.5" fill="#4AABB8" opacity="0.45" />

      {/* Spinning sweep */}
      <g style={{ animation: "radarSpin 7s linear infinite", transformOrigin: `${cx}px ${cy}px` }}>
        <path d={`M${cx},${cy} L${cx},${(CY - R).toFixed(1)} A${R},${R} 0 0 1 ${(CX + R * SIN45).toFixed(1)},${(CY - R * COS45).toFixed(1)} Z`}
          fill="url(#sweepG)" opacity=".95" />
        <line x1={cx} y1={cy} x2={cx} y2={(CY - R).toFixed(1)}
          stroke={T.GOLD} strokeWidth="1.5" opacity=".8" />
      </g>

      {/* State dots */}
      {statePts.map(s => (
        <circle key={s.id} cx={s.xy[0].toFixed(1)} cy={s.xy[1].toFixed(1)} r="3"
          fill="#5BC8D4" opacity="0.28"
          style={{ animation: `dotBlink 6s ${s.delay}s ease-in-out infinite` }} />
      ))}

      {/* ES highlight */}
      <ellipse cx={esx} cy={esy} rx="22" ry="22" fill="url(#esGlow)" />
      <circle cx={esx} cy={esy} r="10" fill="none" stroke={T.GOLD} strokeWidth="1.2" opacity="0">
        <animate attributeName="r" values="10;28" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx={esx} cy={esy} r="7.5" fill="none" stroke={T.GOLD} strokeWidth="0.9" opacity="0.38" />
      <circle className="es-dot" cx={esx} cy={esy} r="5" fill={T.GOLD} opacity="0.95" />
      <text x={(ESX + 9).toFixed(1)} y={(ESY - 3).toFixed(1)}
        fontSize="9" fill={T.GOLD} opacity="0.95"
        fontFamily="system-ui" fontWeight="700" letterSpacing="0.06em">ES</text>
    </svg>
  );
}

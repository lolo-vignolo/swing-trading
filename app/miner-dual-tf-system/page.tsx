"use client";

import { useState } from "react";

// ─────────────────────────────────────────────────────────
// DATA GENERATION
// ─────────────────────────────────────────────────────────

function ema(data: number[], period: number) {
  const k = 2 / (period + 1);
  const result = [data[0]];
  for (let i = 1; i < data.length; i += 1) {
    result.push(data[i] * k + result[i - 1] * (1 - k));
  }
  return result;
}

function calcMACD(prices: number[]) {
  const ema12 = ema(prices, 12);
  const ema26 = ema(prices, 26);
  const macdLine = ema12.map((v, i) => v - ema26[i]);
  const signal = ema(macdLine, 9);
  const hist = macdLine.map((v, i) => v - signal[i]);
  return { macdLine, signal, hist };
}

function sma(data: number[], period: number) {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / period;
  });
}

// Scenarios: impulso, retroceso, fin_tendencia
const SCENARIOS = {
  impulso: {
    label: "ENTRADA EN IMPULSO ③",
    color: "#00e5a0",
    subtitle: "Ambos TF alcistas → señal de alta probabilidad",
    verdict: "OPERAR LARGO",
    verdictColor: "#00e5a0",
    verdictIcon: "▲",
    description:
      "MM30 (30m) apunta arriba → tendencia alcista confirmada.\nMACD (3m) cruza al alza desde cero → momentum confirma.\nEstamos en onda ③, la más fuerte. Máxima probabilidad.",
    waves30m: [
      { x: 0, y: 195 },
      { x: 60, y: 130 },
      { x: 95, y: 155 },
      { x: 185, y: 65 },
      { x: 235, y: 110 },
      { x: 340, y: 30 },
      { x: 390, y: 75 },
      { x: 450, y: 40 },
    ],
    waveLabels: [
      { x: 60, y: 130, label: "①", above: true, alert: false },
      { x: 95, y: 155, label: "②", above: false, alert: false },
      { x: 185, y: 65, label: "③", above: true, alert: false },
      { x: 235, y: 110, label: "④", above: false, alert: false },
      { x: 340, y: 30, label: "⑤", above: true, alert: false },
    ],
    entryX: 235,
    entryY: 110,
    macdSignal: "bullish_cross",
    superposition: false,
    ceil1: undefined,
  },
  retroceso: {
    label: "ESPERAR EN RETROCESO ④",
    color: "#ffd166",
    subtitle: "TF 30m alcista, TF 3m bajista → NO operar aún",
    verdict: "ESPERAR",
    verdictColor: "#ffd166",
    verdictIcon: "◆",
    description:
      "MM30 (30m) sigue apuntando arriba → tendencia intacta.\nMACD (3m) en negativo → momentum a la baja.\nEstamos en onda ④. Esperar cruce alcista del MACD en 3m.",
    waves30m: [
      { x: 0, y: 195 },
      { x: 60, y: 130 },
      { x: 95, y: 155 },
      { x: 185, y: 65 },
      { x: 265, y: 118 },
      { x: 350, y: 50 },
    ],
    waveLabels: [
      { x: 60, y: 130, label: "①", above: true, alert: false },
      { x: 95, y: 155, label: "②", above: false, alert: false },
      { x: 185, y: 65, label: "③", above: true, alert: false },
      { x: 265, y: 118, label: "④", above: false, alert: false },
    ],
    entryX: 265,
    entryY: 118,
    macdSignal: "bearish",
    superposition: false,
    ceil1: undefined,
  },
  fin: {
    label: "ALERTA: FIN DE TENDENCIA",
    color: "#ff5566",
    subtitle: "Superposición ④→① + divergencia MACD → cambio probable",
    verdict: "NO OPERAR / CERRAR",
    verdictColor: "#ff5566",
    verdictIcon: "✕",
    description:
      "MM30 (30m) girando a la baja → tendencia perdiendo fuerza.\nMACD (3m) con divergencia bajista → momentum agotado.\nOnda ④ superpone con ① → patrón de Moner activado.",
    waves30m: [
      { x: 0, y: 195 },
      { x: 60, y: 130 },
      { x: 95, y: 162 },
      { x: 185, y: 72 },
      { x: 275, y: 145 },
      { x: 330, y: 175 },
      { x: 420, y: 210 },
    ],
    waveLabels: [
      { x: 60, y: 130, label: "①", above: true, alert: false },
      { x: 95, y: 162, label: "②", above: false, alert: false },
      { x: 185, y: 72, label: "③", above: true, alert: false },
      { x: 275, y: 145, label: "④", above: false, alert: true },
    ],
    entryX: 275,
    entryY: 145,
    macdSignal: "divergence",
    superposition: true,
    ceil1: 130,
  },
} as const;

// ─────────────────────────────────────────────────────────
// 30m CHART
// ─────────────────────────────────────────────────────────

function Chart30m({ scenario }: { scenario: keyof typeof SCENARIOS }) {
  const s = SCENARIOS[scenario];
  const pts = s.waves30m;

  // Build path
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  // SMA-like smooth curve over the points
  const maY = pts.map((p, i) => {
    const window = pts.slice(Math.max(0, i - 3), i + 1);
    return window.reduce((a, b) => a + b.y, 0) / window.length;
  });

  const maPath = maY.map((y, i) => `${i === 0 ? "M" : "L"}${pts[i].x},${y}`).join(" ");

  // MM30 color: below price = bullish (amber), above = bearish
  const maColor = scenario === "fin" ? "#ff9966" : "#f0a500";

  // Superposition zone
  const sup = scenario === "fin" && s.ceil1;

  const wave1 = s.waveLabels.find((w) => w.label === "①");

  return (
    <svg viewBox="0 0 460 230" width="100%" style={{ display: "block" }}>
      {/* Background bands */}
      <defs>
        <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={s.color} stopOpacity={0.12} />
          <stop offset="100%" stopColor={s.color} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="maGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={maColor} stopOpacity={0.08} />
          <stop offset="100%" stopColor={maColor} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Grid */}
      {[50, 100, 150, 200].map((y) => (
        <line key={y} x1={0} y1={y} x2={460} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}

      {/* Superposición zone */}
      {sup && (
        <>
          <rect
            x={s.entryX - 60}
            y={sup}
            width={130}
            height={s.entryY - sup}
            fill="rgba(255,85,102,0.15)"
            stroke="rgba(255,85,102,0.45)"
            strokeWidth={1}
            strokeDasharray="5 3"
          />
          <text x={s.entryX + 5} y={(sup + s.entryY) / 2 + 4} fill="#ff5566" fontSize={8} fontFamily="monospace" fontWeight="700">
            SUPERPOSICIÓN
          </text>
        </>
      )}

      {/* Techo onda 1 */}
      {wave1 && (
        <line
          x1={wave1.x}
          y1={wave1.y}
          x2={s.entryX + 60}
          y2={wave1.y}
          stroke="#ffd166"
          strokeWidth={1}
          strokeDasharray="6 4"
          opacity={0.4}
        />
      )}

      {/* Price fill */}
      <path d={path + ` L${pts[pts.length - 1].x},230 L${pts[0].x},230 Z`} fill="url(#priceGrad)" />

      {/* MM30 fill */}
      <path d={maPath + ` L${pts[pts.length - 1].x},230 L${pts[0].x},230 Z`} fill="url(#maGrad)" />

      {/* MM30 line */}
      <path
        d={maPath}
        fill="none"
        stroke={maColor}
        strokeWidth={2}
        strokeLinejoin="round"
        opacity={0.9}
        strokeDasharray={scenario === "fin" ? "8 3" : "none"}
      />

      {/* MM30 label */}
      <rect x={pts[pts.length - 1].x + 4} y={maY[maY.length - 1] - 8} width={38} height={14} rx={3} fill={`${maColor}22`} stroke={`${maColor}55`} strokeWidth={1} />
      <text x={pts[pts.length - 1].x + 23} y={maY[maY.length - 1] + 3} textAnchor="middle" fill={maColor} fontSize={8} fontFamily="monospace">
        MM30
      </text>

      {/* Price line */}
      <path d={path} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinejoin="round" />

      {/* Entry arrow */}
      {scenario !== "fin" && (
        <g>
          <polygon points={`${s.entryX},${s.entryY + 28} ${s.entryX - 8},${s.entryY + 44} ${s.entryX + 8},${s.entryY + 44}`} fill={s.color} opacity={0.9} />
          <text x={s.entryX} y={s.entryY + 58} textAnchor="middle" fill={s.color} fontSize={8} fontFamily="monospace" fontWeight="700">
            {scenario === "impulso" ? "ENTRADA" : "ESPERAR"}
          </text>
        </g>
      )}

      {/* Wave labels */}
      {s.waveLabels.map((w, i) => {
        const above = w.above;
        const color = w.alert ? "#ff5566" : s.color;
        return (
          <g key={i}>
            <circle cx={w.x} cy={w.y} r={5} fill={color} opacity={0.9} />
            <rect x={w.x - 10} y={above ? w.y - 28 : w.y + 8} width={20} height={18} rx={4} fill="rgba(4,8,18,0.95)" stroke={color} strokeWidth={1.5} />
            <text x={w.x} y={above ? w.y - 15 : w.y + 21} textAnchor="middle" fill={color} fontSize={11} fontFamily="monospace" fontWeight="700">
              {w.label}
            </text>
          </g>
        );
      })}

      {/* Momentum label top-right */}
      <rect
        x={340}
        y={8}
        width={110}
        height={22}
        rx={4}
        fill={scenario === "fin" ? "rgba(255,85,102,0.1)" : "rgba(0,229,160,0.1)"}
        stroke={scenario === "fin" ? "rgba(255,85,102,0.3)" : "rgba(0,229,160,0.3)"}
        strokeWidth={1}
      />
      <text x={395} y={23} textAnchor="middle" fill={scenario === "fin" ? "#ff5566" : "#00e5a0"} fontSize={9} fontFamily="monospace" fontWeight="700">
        {scenario === "fin" ? "MOMENTUM ↓" : "MOMENTUM ↑"}
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// MACD CHART (3m)
// ─────────────────────────────────────────────────────────

function MACDChart({ signal }: { signal: "bullish_cross" | "bearish" | "divergence" }) {
  // Simulated MACD shapes per scenario
  const configs = {
    bullish_cross: {
      // MACD crosses above signal from below zero
      bars: [-4, -5, -3, -1, 0, 2, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
      macd: [-3, -4, -2, 0, 1, 3, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2],
      sig: [-1, -2, -1, 0, 1, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 1],
      crossAt: 4,
      label: "Cruce alcista ✓",
      color: "#00e5a0",
    },
    bearish: {
      // MACD below signal, negative histogram
      bars: [3, 2, 1, 0, -1, -2, -4, -5, -4, -3, -2, -1, 0, -1, -2, -3],
      macd: [2, 1, 0, -1, -2, -3, -4, -5, -4, -3, -2, -1, 0, -1, -2, -3],
      sig: [3, 2, 1, 0, -1, -2, -3, -4, -4, -3, -3, -2, -1, -1, -1, -2],
      crossAt: null,
      label: "MACD negativo — esperar",
      color: "#ffd166",
    },
    divergence: {
      // Price makes higher high but MACD lower high → divergence
      bars: [3, 5, 4, 3, 2, 1, -1, -3, -2, -1, -2, -3, -4, -5, -6, -7],
      macd: [4, 5, 4, 3, 2, 1, -1, -2, -2, -2, -3, -4, -5, -6, -7, -8],
      sig: [3, 4, 4, 3, 2, 1, 0, -1, -1, -2, -3, -4, -5, -5, -6, -7],
      crossAt: null,
      divergenceAt: [2, 10],
      label: "Divergencia bajista ✗",
      color: "#ff5566",
    },
  } as const;

  const c = configs[signal];
  const N = c.bars.length;
  const W2 = 460;
  const H2 = 120;
  const midY = H2 / 2;
  const scale = 7;
  const barW = (W2 - 40) / N;

  const toX = (i: number) => 20 + i * barW + barW / 2;
  const toY = (v: number) => midY - v * scale;

  const macdPath = c.macd.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const sigPath = c.sig.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W2} ${H2}`} width="100%" style={{ display: "block" }}>
      <defs>
        <linearGradient id="histPos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00e5a0" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#00e5a0" stopOpacity={0.2} />
        </linearGradient>
        <linearGradient id="histNeg" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#ff5566" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#ff5566" stopOpacity={0.2} />
        </linearGradient>
      </defs>

      {/* Zero line */}
      <line x1={10} y1={midY} x2={W2 - 10} y2={midY} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
      <text x={12} y={midY - 4} fill="rgba(255,255,255,0.25)" fontSize={7} fontFamily="monospace">
        0
      </text>

      {/* Histogram bars */}
      {c.bars.map((v, i) => {
        const x = toX(i) - barW * 0.35;
        const y = v >= 0 ? toY(v) : midY;
        const h = Math.abs(v) * scale;
        const fill = v >= 0 ? "url(#histPos)" : "url(#histNeg)";
        return <rect key={i} x={x} y={y} width={barW * 0.7} height={Math.max(h, 1)} fill={fill} rx={1} />;
      })}

      {/* Cruce marker */}
      {c.crossAt !== null && (
        <>
          <line x1={toX(c.crossAt)} y1={10} x2={toX(c.crossAt)} y2={H2 - 10} stroke="#00e5a0" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
          <text x={toX(c.crossAt) + 4} y={20} fill="#00e5a0" fontSize={7} fontFamily="monospace" fontWeight="700">
            CRUCE
          </text>
        </>
      )}

      {/* Divergence arrows */}
      {signal === "divergence" && (
        <>
          <line x1={toX(2)} y1={toY(c.macd[2]) - 4} x2={toX(10)} y2={toY(c.macd[10]) - 4} stroke="#ff5566" strokeWidth={1.5} strokeDasharray="4 3" />
          <text x={(toX(2) + toX(10)) / 2} y={toY(c.macd[2]) - 10} textAnchor="middle" fill="#ff5566" fontSize={7} fontFamily="monospace" fontWeight="700">
            divergencia ↓
          </text>
        </>
      )}

      {/* MACD line */}
      <path d={macdPath} fill="none" stroke="#5599ff" strokeWidth={1.5} />

      {/* Signal line */}
      <path d={sigPath} fill="none" stroke="#ff9900" strokeWidth={1.5} strokeDasharray="4 3" />

      {/* Legend */}
      <g transform={`translate(${W2 - 130}, ${H2 - 20})`}>
        <line x1={0} y1={5} x2={14} y2={5} stroke="#5599ff" strokeWidth={1.5} />
        <text x={18} y={9} fill="#8899aa" fontSize={7} fontFamily="monospace">
          MACD
        </text>
        <line x1={55} y1={5} x2={69} y2={5} stroke="#ff9900" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={73} y={9} fill="#8899aa" fontSize={7} fontFamily="monospace">
          Señal
        </text>
      </g>

      {/* Status badge */}
      <rect x={10} y={8} width={c.label.length * 5.5 + 12} height={16} rx={4} fill={`${c.color}18`} stroke={`${c.color}45`} strokeWidth={1} />
      <text x={16} y={20} fill={c.color} fontSize={8} fontFamily="monospace" fontWeight="700">
        {c.label}
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────
// VERDICT PANEL
// ─────────────────────────────────────────────────────────
function VerdictPanel({ scenario }: { scenario: keyof typeof SCENARIOS }) {
  const s = SCENARIOS[scenario];
  return (
    <div
      style={{
        background: `${s.verdictColor}0c`,
        border: `1px solid ${s.verdictColor}35`,
        borderRadius: 8,
        padding: "12px 16px",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          flexShrink: 0,
          background: `${s.verdictColor}18`,
          border: `1px solid ${s.verdictColor}50`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: s.verdictColor,
          fontFamily: "monospace",
        }}
      >
        {s.verdictIcon}
      </div>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
          <span
            style={{
              color: s.verdictColor,
              fontSize: 11,
              fontWeight: 700,
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: 1,
            }}
          >
            {s.verdict}
          </span>
          <span
            style={{
              background: `${s.verdictColor}18`,
              border: `1px solid ${s.verdictColor}30`,
              borderRadius: 3,
              padding: "1px 6px",
              color: s.verdictColor,
              fontSize: 8,
              fontFamily: "monospace",
            }}
          >
            MINER DUAL TF
          </span>
        </div>
        <div
          style={{
            color: "#7a8a9a",
            fontSize: 10,
            lineHeight: 1.75,
            fontFamily: "'IBM Plex Mono', monospace",
            whiteSpace: "pre-line",
          }}
        >
          {s.description}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SIGNAL MATRIX
// ─────────────────────────────────────────────────────────
function SignalMatrix({ scenario }: { scenario: keyof typeof SCENARIOS }) {
  const rows = [
    {
      label: "MM30 en 30m",
      impulso: { val: "▲ Alcista", ok: true },
      retroceso: { val: "▲ Alcista", ok: true },
      fin: { val: "↘ Girando", ok: false },
    },
    {
      label: "Onda Elliott",
      impulso: { val: "③ Impulso", ok: true },
      retroceso: { val: "④ Retroceso", ok: null },
      fin: { val: "④ Superpos.", ok: false },
    },
    {
      label: "MACD en 3m",
      impulso: { val: "Cruce ↑", ok: true },
      retroceso: { val: "Negativo", ok: false },
      fin: { val: "Divergencia", ok: false },
    },
    {
      label: "Probabilidad",
      impulso: { val: "ALTA ✓", ok: true },
      retroceso: { val: "ESPERAR", ok: null },
      fin: { val: "BAJA ✕", ok: false },
    },
  ];

  const colColors = { impulso: "#00e5a0", retroceso: "#ffd166", fin: "#ff5566" } as const;
  const cols = ["impulso", "retroceso", "fin"] as const;
  const colLabels = { impulso: "IMPULSO ③", retroceso: "RETROCESO ④", fin: "FIN TENDENCIA" } as const;

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "6px 10px", textAlign: "left", color: "#5a6a80", fontWeight: 400, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              Indicador
            </th>
            {cols.map((col) => (
              <th
                key={col}
                style={{
                  padding: "6px 10px",
                  textAlign: "center",
                  color: scenario === col ? colColors[col] : "#3a4a5a",
                  fontWeight: scenario === col ? 700 : 400,
                  borderBottom: `2px solid ${scenario === col ? colColors[col] + "60" : "rgba(255,255,255,0.06)"}`,
                  background: scenario === col ? `${colColors[col]}08` : "transparent",
                  borderRadius: "4px 4px 0 0",
                }}
              >
                {colLabels[col]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <td style={{ padding: "7px 10px", color: "#5a6a80" }}>{row.label}</td>
              {cols.map((col) => {
                const cell = row[col];
                const c = cell.ok === true ? "#00e5a0" : cell.ok === false ? "#ff5566" : "#ffd166";
                return (
                  <td
                    key={col}
                    style={{
                      padding: "7px 10px",
                      textAlign: "center",
                      color: c,
                      fontWeight: 600,
                      background: scenario === col ? `${colColors[col]}05` : "transparent",
                    }}
                  >
                    {cell.val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────
export default function Page() {
  const [scenario, setScenario] = useState<keyof typeof SCENARIOS>("impulso");
  const s = SCENARIOS[scenario];

  const scenarioButtons = [
    { id: "impulso", label: "Impulso ③", color: "#00e5a0" },
    { id: "retroceso", label: "Retroceso ④", color: "#ffd166" },
    { id: "fin", label: "Fin de tendencia", color: "#ff5566" },
  ] as const;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#04080f",
        color: "#c8d8f0",
        fontFamily: "'IBM Plex Mono', monospace",
        padding: "20px 18px",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "#3a5a7a", fontSize: 9, letterSpacing: 3, marginBottom: 4 }}>
            MINER · DUAL TIMEFRAME MOMENTUM · ELLIOTT WAVES
          </div>
          <h1 style={{ margin: "0 0 2px", fontSize: 18, color: "#e0ecff", fontWeight: 700, letterSpacing: -0.3 }}>
            Sistema de alta probabilidad
          </h1>
          <p style={{ margin: 0, color: "#3a5a7a", fontSize: 10 }}>MM30 en 30m · MACD en 3m · Ondas de impulso y ABC</p>
        </div>

        {/* SCENARIO SELECTOR */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 16,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 8,
            padding: 5,
            width: "fit-content",
          }}
        >
          {scenarioButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setScenario(btn.id)}
              style={{
                padding: "8px 18px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 10,
                letterSpacing: 0.5,
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 700,
                transition: "all 0.2s",
                background: scenario === btn.id ? `${btn.color}18` : "transparent",
                color: scenario === btn.id ? btn.color : "#3a5a7a",
                boxShadow: scenario === btn.id ? `inset 0 0 0 1px ${btn.color}50` : "none",
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Scenario title */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            padding: "5px 14px",
            background: `${s.color}10`,
            border: `1px solid ${s.color}35`,
            borderRadius: 20,
          }}
        >
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: s.color,
              boxShadow: `0 0 5px ${s.color}`,
            }}
          />
          <span style={{ color: s.color, fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>{s.label}</span>
          <span style={{ color: "#3a5a7a", fontSize: 9 }}>·</span>
          <span style={{ color: "#5a7a9a", fontSize: 9 }}>{s.subtitle}</span>
        </div>

        {/* DUAL CHART LAYOUT */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          {/* 30m Chart */}
          <div
            style={{
              background: "rgba(6,12,24,0.95)",
              border: `1px solid ${s.color}20`,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 14px 6px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ color: "#3a5a7a", fontSize: 8, letterSpacing: 2 }}>TIMEFRAME</span>
                <div style={{ color: "#e0ecff", fontSize: 12, fontWeight: 700 }}>30 minutos</div>
              </div>
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  fontSize: 9,
                  background: scenario === "fin" ? "rgba(255,85,102,0.1)" : "rgba(0,229,160,0.1)",
                  border: `1px solid ${scenario === "fin" ? "rgba(255,85,102,0.25)" : "rgba(0,229,160,0.25)"}`,
                  color: scenario === "fin" ? "#ff5566" : "#00e5a0",
                  fontWeight: 700,
                }}
              >
                MM30 {scenario === "fin" ? "↘ bajando" : "↗ subiendo"}
              </div>
            </div>
            <div style={{ padding: "10px 8px 6px" }}>
              <Chart30m scenario={scenario} />
            </div>
          </div>

          {/* 3m MACD Chart */}
          <div
            style={{
              background: "rgba(6,12,24,0.95)",
              border: `1px solid rgba(85,153,255,0.15)`,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "10px 14px 6px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <span style={{ color: "#3a5a7a", fontSize: 8, letterSpacing: 2 }}>TIMEFRAME</span>
                <div style={{ color: "#e0ecff", fontSize: 12, fontWeight: 700 }}>3 minutos · MACD</div>
              </div>
              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  fontSize: 9,
                  background:
                    s.macdSignal === "bullish_cross"
                      ? "rgba(0,229,160,0.1)"
                      : s.macdSignal === "divergence"
                      ? "rgba(255,85,102,0.1)"
                      : "rgba(255,209,102,0.1)",
                  border: `1px solid ${
                    s.macdSignal === "bullish_cross"
                      ? "rgba(0,229,160,0.25)"
                      : s.macdSignal === "divergence"
                      ? "rgba(255,85,102,0.25)"
                      : "rgba(255,209,102,0.25)"
                  }`,
                  color: s.macdSignal === "bullish_cross" ? "#00e5a0" : s.macdSignal === "divergence" ? "#ff5566" : "#ffd166",
                  fontWeight: 700,
                }}
              >
                {s.macdSignal === "bullish_cross" ? "Confirmación ✓" : s.macdSignal === "divergence" ? "Divergencia ✗" : "Sin confirmar"}
              </div>
            </div>
            <div style={{ padding: "16px 8px 8px" }}>
              <MACDChart signal={s.macdSignal} />
            </div>

            {/* Conector visual TF */}
            <div
              style={{
                margin: "0 14px 10px",
                padding: "8px 10px",
                background: "rgba(85,153,255,0.05)",
                border: "1px solid rgba(85,153,255,0.12)",
                borderRadius: 6,
                fontSize: 9,
                color: "#4a6a8a",
                lineHeight: 1.6,
              }}
            >
              <span style={{ color: "#5599ff" }}>Regla: </span>
              Operar en 3m solo cuando el MACD cruza a favor de la dirección que marca la MM30 en 30m.
            </div>
          </div>
        </div>

        {/* VERDICT */}
        <div style={{ marginBottom: 12 }}>
          <VerdictPanel scenario={scenario} />
        </div>

        {/* SIGNAL MATRIX */}
        <div
          style={{
            background: "rgba(6,12,24,0.95)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              color: "#3a5a7a",
              fontSize: 8,
              letterSpacing: 2,
            }}
          >
            MATRIZ DE SEÑALES — LOS TRES ESCENARIOS
          </div>
          <div style={{ padding: "8px 6px" }}>
            <SignalMatrix scenario={scenario} />
          </div>
        </div>

        {/* FOOTER RULE */}
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            borderRadius: 6,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            fontSize: 9,
            color: "#3a5a7a",
            lineHeight: 1.8,
            textAlign: "center",
          }}
        >
          <span style={{ color: "#00e5a0" }}>✓ ALTA PROB</span> = MM30↑ en 30m + MACD cruce↑ en 3m + onda impulsiva (③ o ⑤) &nbsp;&nbsp;|&nbsp;&nbsp;
          <span style={{ color: "#ff5566" }}>✕ EVITAR</span> = Superposición ④→① + MACD divergencia + MM30 girando
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

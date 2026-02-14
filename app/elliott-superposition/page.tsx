"use client";

import { useState } from "react";

const W = 500;
const H = 260;

// ── Escenario A: SIN superposición (corrección sana) ──
const scenarioA = {
  label: "CORRECCIÓN SANA",
  color: "#00ffa3",
  subtitle: "Onda 4 NO invade onda 1 → tendencia viva",
  points: [
    { x: 30, y: 220, wave: null },
    { x: 90, y: 120, wave: "1" },
    { x: 140, y: 165, wave: "2" },
    { x: 240, y: 55, wave: "3" },
    { x: 300, y: 135, wave: "4" },
    { x: 420, y: 30, wave: "5" },
  ],
  zoneTop: 120,
  zoneBot: 165,
  zone4: { y: 135 },
};

// ── Escenario B: CON superposición (cambio de tendencia) ──
const scenarioB = {
  label: "CAMBIO DE TENDENCIA",
  color: "#ff4444",
  subtitle: "Onda 4 INVADE onda 1 → estructura rota",
  points: [
    { x: 30, y: 220, wave: null },
    { x: 90, y: 120, wave: "1" },
    { x: 140, y: 175, wave: "2" },
    { x: 240, y: 70, wave: "3" },
    { x: 310, y: 145, wave: "4" },
    { x: 400, y: 180, wave: "5" },
  ],
  zoneTop: 120,
  zoneBot: 175,
  zone4: { y: 145 },
};

function Chart({ scenario }: { scenario: typeof scenarioA }) {
  const pts = scenario.points;
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const ceilWave1 = scenario.zoneTop;

  // zona de superposición: entre y=ceilWave1 y y=zone4.y (solo si hay solapamiento)
  const hasOverlap = scenario.color === "#ff4444";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
      {/* Grid lines */}
      {[50, 100, 150, 200].map((y) => (
        <line key={y} x1={20} y1={y} x2={W - 10} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
      ))}

      {/* Zona de superposición (roja semitransparente) */}
      {hasOverlap && (
        <>
          <rect
            x={pts[4].x - 60}
            y={ceilWave1}
            width={120}
            height={pts[4].y - ceilWave1}
            fill="rgba(255,68,68,0.15)"
            stroke="rgba(255,68,68,0.5)"
            strokeWidth={1}
            strokeDasharray="5 3"
          />
          <text
            x={pts[4].x}
            y={(ceilWave1 + pts[4].y) / 2 + 4}
            textAnchor="middle"
            fill="#ff4444"
            fontSize={9}
            fontFamily="monospace"
            fontWeight="700"
          >
            SUPERPOSICIÓN
          </text>
        </>
      )}

      {/* Línea horizontal techo onda 1 */}
      <line
        x1={pts[1].x}
        y1={ceilWave1}
        x2={hasOverlap ? pts[4].x + 60 : pts[5].x}
        y2={ceilWave1}
        stroke={scenario.color}
        strokeWidth={1}
        strokeDasharray="6 4"
        opacity={0.5}
      />
      <text
        x={hasOverlap ? pts[4].x + 65 : pts[5].x + 5}
        y={ceilWave1 + 4}
        fill={scenario.color}
        fontSize={9}
        fontFamily="monospace"
        opacity={0.8}
      >
        techo ①
      </text>

      {/* Flecha indicando dirección onda 4 */}
      {hasOverlap && <text x={pts[3].x + 15} y={pts[4].y - 8} fill="#ff4444" fontSize={18} fontFamily="monospace">↓</text>}
      {!hasOverlap && <text x={pts[3].x + 15} y={pts[4].y + 20} fill="#00ffa3" fontSize={18} fontFamily="monospace">↑</text>}

      {/* Línea de precio */}
      <path d={pathD} fill="none" stroke={scenario.color} strokeWidth={2.5} strokeLinejoin="round" />

      {/* Puntos y etiquetas de onda */}
      {pts.map(
        (p, i) =>
          p.wave && (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={5} fill={scenario.color} opacity={0.9} />
              <rect x={p.x - 9} y={p.y - 26} width={18} height={18} rx={3} fill="rgba(0,0,0,0.7)" stroke={scenario.color} strokeWidth={1} />
              <text x={p.x} y={p.y - 13} textAnchor="middle" fill={scenario.color} fontSize={11} fontFamily="monospace" fontWeight="700">
                {p.wave}
              </text>
            </g>
          )
      )}

      {/* Etiqueta zona segura / zona peligro */}
      {!hasOverlap && (
        <text x={pts[4].x} y={pts[4].y + 30} textAnchor="middle" fill="#00ffa3" fontSize={9} fontFamily="monospace">
          ④ respeta zona ✓
        </text>
      )}
    </svg>
  );
}

export default function Page() {
  const [mode, setMode] = useState("both");

  const scenarios = mode === "A" ? [scenarioA] : mode === "B" ? [scenarioB] : [scenarioA, scenarioB];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080e1c",
        color: "#c8d8f0",
        fontFamily: "'IBM Plex Mono', monospace",
        padding: "24px 20px",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "#5599ff", fontSize: 9, letterSpacing: 3, marginBottom: 6 }}>
            ONDAS DE ELLIOTT · MONER
          </div>
          <h1 style={{ margin: 0, fontSize: 20, color: "#fff", fontWeight: 700 }}>Patrón de Superposición</h1>
          <p style={{ margin: "4px 0 0", color: "#5a6a80", fontSize: 11 }}>La onda ④ y su relación con el techo de la onda ①</p>
        </div>

        {/* Toggle */}
        <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
          {[
            { id: "both", label: "Ambos" },
            { id: "A", label: "Corrección" },
            { id: "B", label: "Cambio tendencia" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 10,
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600,
                background: mode === opt.id ? "rgba(85,153,255,0.15)" : "transparent",
                color: mode === opt.id ? "#5599ff" : "#5a6a80",
                boxShadow: mode === opt.id ? "inset 0 0 0 1px rgba(85,153,255,0.4)" : "none",
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Charts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: scenarios.length === 2 ? "1fr 1fr" : "1fr",
            gap: 16,
          }}
        >
          {scenarios.map((s, i) => (
            <div
              key={i}
              style={{
                background: "rgba(8,14,28,0.9)",
                border: `1px solid ${s.color}30`,
                borderRadius: 10,
                padding: "16px",
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    color: s.color,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    background: `${s.color}15`,
                    border: `1px solid ${s.color}40`,
                    borderRadius: 4,
                    padding: "3px 10px",
                  }}
                >
                  {s.label}
                </span>
                <p style={{ margin: "8px 0 0", color: "#8899aa", fontSize: 10 }}>{s.subtitle}</p>
              </div>
              <Chart scenario={s} />
              <div
                style={{
                  marginTop: 12,
                  padding: "10px 12px",
                  background: `${s.color}08`,
                  border: `1px solid ${s.color}20`,
                  borderRadius: 6,
                  fontSize: 10,
                  color: "#8899aa",
                  lineHeight: 1.6,
                }}
              >
                {s.color === "#00ffa3"
                  ? "④ se detiene ANTES del techo de ①. Los rangos no se solapan → estructura impulsiva válida → buscar entrada larga."
                  : "④ cae POR DEBAJO del techo de ①. Los rangos SE SOLAPAN → regla de Elliott violada → posible cambio de tendencia."}
              </div>
            </div>
          ))}
        </div>

        {/* Regla clave */}
        <div
          style={{
            marginTop: 16,
            padding: "12px 16px",
            background: "rgba(85,153,255,0.05)",
            border: "1px solid rgba(85,153,255,0.2)",
            borderRadius: 8,
            fontSize: 11,
            color: "#8899aa",
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: "#5599ff", fontWeight: 700 }}>Regla de Elliott: </span>
          La onda ④ nunca debe entrar en el territorio de precio de la onda ①. Si lo hace →{" "}
          <span style={{ color: "#ff4444" }}>superposición</span> → la onda que creías ①–②–③ probablemente no lo era, o la tendencia ha cambiado.
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

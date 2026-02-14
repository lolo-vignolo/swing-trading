"use client";

import { useState } from "react";

const W = 620;
const H = 300;

// Ciclo completo 1-2-3-4-5 + A-B-C
const allPoints = [
  { x: 30, y: 260, label: null },
  { x: 100, y: 160, label: "①", type: "impulse", desc: "Impulso" },
  { x: 155, y: 200, label: "②", type: "corrective", desc: "Corrección (no >100% de ①)" },
  { x: 270, y: 55, label: "③", type: "impulse", desc: "Impulso más largo" },
  { x: 335, y: 130, label: "④", type: "corrective", desc: "Corrección (NO entra en ①)" },
  { x: 445, y: 40, label: "⑤", type: "impulse", desc: "Impulso final (a veces débil)" },
  // ABC corrección
  { x: 510, y: 130, label: "A", type: "abc", desc: "Bajada correctiva" },
  { x: 555, y: 90, label: "B", type: "abc", desc: "Rebote (trampa)" },
  { x: 600, y: 200, label: "C", type: "abc", desc: "Bajada final" },
];

// Colores por tipo
const colors = {
  impulse: "#00ffa3",
  corrective: "#ffd700",
  abc: "#ff7744",
  fail: "#ff4444",
};

// Techo de onda 1 para zona de superposición
const CEIL_W1 = 160; // y de punto ①

function getColor(type?: string) {
  return colors[type as keyof typeof colors] || "#888";
}

// Segmento coloreado
function ColoredPath({ points }: { points: typeof allPoints }) {
  const segments = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i];
    const b = points[i + 1];
    const color = getColor(b.type);
    segments.push(
      <line
        key={i}
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    );
  }
  return <>{segments}</>;
}

// Etiquetas de onda
function WaveLabels({ points }: { points: typeof allPoints }) {
  return (
    <>
      {points
        .filter((p) => p.label)
        .map((p, i) => {
          const color = getColor(p.type);
          const above = p.type === "impulse" || p.label === "B";
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={5} fill={color} opacity={0.9} />
              <rect
                x={p.x - 10}
                y={above ? p.y - 28 : p.y + 8}
                width={20}
                height={18}
                rx={4}
                fill="rgba(6,10,24,0.95)"
                stroke={color}
                strokeWidth={1}
              />
              <text
                x={p.x}
                y={above ? p.y - 15 : p.y + 21}
                textAnchor="middle"
                fill={color}
                fontSize={11}
                fontFamily="monospace"
                fontWeight="700"
              >
                {p.label}
              </text>
            </g>
          );
        })}
    </>
  );
}

// ── Vista 1: Ciclo completo ──────────────────────────────────────────────────
function FullCycle() {
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", cursor: "crosshair" }}>
        {/* Grid */}
        {[60, 120, 180, 240].map((y) => (
          <line
            key={y}
            x1={20}
            y1={y}
            x2={W - 5}
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />
        ))}

        {/* Separador fase impulsiva / correctiva */}
        <line
          x1={445}
          y1={20}
          x2={445}
          y2={H - 20}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={1}
          strokeDasharray="6 4"
        />
        <text
          x={350}
          y={16}
          textAnchor="middle"
          fill="rgba(0,255,163,0.5)"
          fontSize={8}
          fontFamily="monospace"
          letterSpacing={2}
        >
          FASE IMPULSIVA (tendencia)
        </text>
        <text
          x={540}
          y={16}
          textAnchor="middle"
          fill="rgba(255,119,68,0.5)"
          fontSize={8}
          fontFamily="monospace"
          letterSpacing={2}
        >
          FASE ABC
        </text>

        {/* Línea punteada techo ④ vs techo ① */}
        <line
          x1={100}
          y1={CEIL_W1}
          x2={370}
          y2={CEIL_W1}
          stroke="#ffd700"
          strokeWidth={1}
          strokeDasharray="5 4"
          opacity={0.5}
        />
        <text x={108} y={CEIL_W1 - 5} fill="#ffd700" fontSize={8} fontFamily="monospace" opacity={0.8}>
          techo ① (④ debe quedarse encima)
        </text>

        {/* Zona correctiva sombreada entre ④ y ① */}
        <rect
          x={285}
          y={CEIL_W1}
          width={90}
          height={allPoints[4].y - CEIL_W1}
          fill="rgba(255,215,0,0.07)"
          stroke="rgba(255,215,0,0.2)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />

        {/* Flechas de ciclo bajo el gráfico */}
        <rect
          x={30}
          y={H - 22}
          width={415}
          height={12}
          rx={3}
          fill="rgba(0,255,163,0.08)"
          stroke="rgba(0,255,163,0.2)"
          strokeWidth={1}
        />
        <text x={237} y={H - 13} textAnchor="middle" fill="#00ffa3" fontSize={8} fontFamily="monospace">
          5 ondas impulsivas (a favor de la tendencia mayor)
        </text>
        <rect
          x={448}
          y={H - 22}
          width={155}
          height={12}
          rx={3}
          fill="rgba(255,119,68,0.08)"
          stroke="rgba(255,119,68,0.2)"
          strokeWidth={1}
        />
        <text x={525} y={H - 13} textAnchor="middle" fill="#ff7744" fontSize={8} fontFamily="monospace">
          3 ondas ABC (contra la tendencia)
        </text>

        {/* Segmentos coloreados */}
        <ColoredPath points={allPoints} />

        {/* Puntos y etiquetas */}
        <WaveLabels points={allPoints} />
      </svg>

      {/* Leyenda interactiva */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
        {[
          { color: "#00ffa3", label: "Ondas impulsivas (1, 3, 5)" },
          { color: "#ffd700", label: "Correcciones internas (2, 4)" },
          { color: "#ff7744", label: "Corrección ABC (fase completa)" },
        ].map((l, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 10,
              color: "#8899aa",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
          >
            <div style={{ width: 24, height: 2, background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Vista 2: Zoom ABC ────────────────────────────────────────────────────────
const abcZoom = [
  { x: 40, y: 60, label: "⑤", type: "impulse", note: "Fin del impulso" },
  { x: 160, y: 180, label: "A", type: "abc", note: "Onda A: 1er tramo bajista (3 sub-ondas)" },
  { x: 230, y: 110, label: "B", type: "abc", note: "Onda B: rebote (NO supera ⑤)" },
  { x: 370, y: 250, label: "C", type: "abc", note: "Onda C: 2º tramo bajista (5 sub-ondas)" },
];

const abcFib = { top: 60, bot: 250 };

function ABCZoom() {
  const [sel, setSel] = useState<number | null>(null);

  const fibLevels = [
    { pct: 0.382, label: "38.2%", color: "#9966ff" },
    { pct: 0.5, label: "50%", color: "#5599ff" },
    { pct: 0.618, label: "61.8%", color: "#ff9900" },
  ];

  const range = abcFib.bot - abcFib.top;

  return (
    <div>
      <svg viewBox="0 0 420 280" width="100%" style={{ display: "block" }}>
        {/* Niveles Fibonacci desde top de ⑤ */}
        {fibLevels.map((f) => {
          const fy = abcFib.top + range * f.pct;
          return (
            <g key={f.label}>
              <line x1={30} y1={fy} x2={390} y2={fy} stroke={f.color} strokeWidth={1} strokeDasharray="5 4" opacity={0.5} />
              <text x={393} y={fy + 4} fill={f.color} fontSize={8} fontFamily="monospace">
                {f.label}
              </text>
            </g>
          );
        })}

        {/* Zona B trampa */}
        <rect
          x={190}
          y={abcFib.top - 5}
          width={80}
          height={abcZoom[2].y - abcFib.top + 10}
          fill="rgba(255,68,68,0.07)"
          stroke="rgba(255,68,68,0.2)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <text x={230} y={abcFib.top + 12} textAnchor="middle" fill="#ff4444" fontSize={8} fontFamily="monospace">
          trampa
        </text>

        {/* Anotación: C ≈ A en extensión */}
        <line x1={160} y1={180} x2={370} y2={180} stroke="rgba(255,119,68,0.3)" strokeWidth={1} strokeDasharray="4 3" />
        <line x1={40} y1={60} x2={370} y2={60} stroke="rgba(255,119,68,0.3)" strokeWidth={1} strokeDasharray="4 3" />
        {/* Flecha doble indicando que C ≈ tamaño de A */}
        <line x1={375} y1={60} x2={375} y2={250} stroke="rgba(255,119,68,0.5)" strokeWidth={1} />
        <text x={385} y={155} textAnchor="middle" fill="#ff7744" fontSize={8} fontFamily="monospace" transform="rotate(90, 385, 155)">
          C ≈ 100% de A
        </text>

        {/* Segmentos */}
        {abcZoom.map((p, i) => {
          if (i === 0) return null;
          const prev = abcZoom[i - 1];
          return (
            <line
              key={i}
              x1={prev.x}
              y1={prev.y}
              x2={p.x}
              y2={p.y}
              stroke={getColor(p.type)}
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Puntos y etiquetas */}
        {abcZoom.map((p, i) => {
          const color = getColor(p.type);
          const above = p.label === "⑤" || p.label === "B";
          return (
            <g
              key={i}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setSel(i)}
              onMouseLeave={() => setSel(null)}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={sel === i ? 8 : 6}
                fill={color}
                opacity={0.9}
                style={{ transition: "r 0.15s" }}
              />
              <rect
                x={p.x - 10}
                y={above ? p.y - 30 : p.y + 8}
                width={20}
                height={18}
                rx={4}
                fill="rgba(6,10,24,0.95)"
                stroke={color}
                strokeWidth={1}
              />
              <text
                x={p.x}
                y={above ? p.y - 17 : p.y + 21}
                textAnchor="middle"
                fill={color}
                fontSize={11}
                fontFamily="monospace"
                fontWeight="700"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip info */}
      <div
        style={{
          minHeight: 36,
          padding: "8px 12px",
          background: "rgba(8,14,28,0.8)",
          border: "1px solid rgba(85,153,255,0.15)",
          borderRadius: 6,
          fontSize: 11,
          color: sel !== null ? "#c8d8f0" : "#3a4a60",
          fontFamily: "'IBM Plex Mono', monospace",
          marginTop: 8,
          transition: "color 0.2s",
        }}
      >
        {sel !== null ? `→ ${abcZoom[sel].note}` : "Pasa el cursor sobre un punto..."}
      </div>
    </div>
  );
}

// ── Vista 3: Superposición en contexto ──────────────────────────────────────
function SuperpositionContext() {
  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#8899aa" }}>
      <svg viewBox="0 0 620 220" width="100%" style={{ display: "block" }}>
        {/* === CASO VÁLIDO === */}
        {/* ondas */}
        {[
          [
            [30, 190],
            [90, 120],
            [130, 155],
            [220, 50],
            [270, 110],
            [360, 30],
          ],
        ].map((pts) =>
          pts.map((p, i) =>
            i === 0 ? null : (
              <line
                key={`v${i}`}
                x1={pts[i - 1][0]}
                y1={pts[i - 1][1]}
                x2={p[0]}
                y2={p[1]}
                stroke={i % 2 === 1 ? "#00ffa3" : "#ffd700"}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            )
          )
        )}
        {/* techo onda 1 válido */}
        <line x1={90} y1={120} x2={300} y2={120} stroke="#ffd700" strokeWidth={1} strokeDasharray="5 3" opacity={0.5} />
        <text x={305} y={124} fill="#ffd700" fontSize={8} fontFamily="monospace">
          techo①
        </text>
        {/* ④ queda encima */}
        <circle cx={270} cy={110} r={5} fill="#ffd700" />
        <text x={270} y={100} textAnchor="middle" fill="#ffd700" fontSize={10} fontFamily="monospace" fontWeight="700">
          ④
        </text>
        <text x={270} y={88} textAnchor="middle" fill="#00ffa3" fontSize={8} fontFamily="monospace">
          ✓ encima
        </text>
        {/* labels */}
        {[
          [90, 120, "①"],
          [130, 155, "②"],
          [220, 50, "③"],
          [360, 30, "⑤"],
        ].map(([x, y, l], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={4} fill="#00ffa3" />
            <text
              x={x}
              y={l === "②" ? Number(y) + 18 : Number(y) - 10}
              textAnchor="middle"
              fill="#00ffa3"
              fontSize={10}
              fontFamily="monospace"
              fontWeight="700"
            >
              {l}
            </text>
          </g>
        ))}
        <text
          x={195}
          y={12}
          textAnchor="middle"
          fill="rgba(0,255,163,0.6)"
          fontSize={9}
          fontFamily="monospace"
          letterSpacing={1}
        >
          SIN SUPERPOSICIÓN ✓
        </text>

        {/* Divisor */}
        <line x1={310} y1={10} x2={310} y2={210} stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="6 4" />

        {/* === CASO INVÁLIDO === */}
        {[
          [
            [330, 190],
            [390, 120],
            [430, 165],
            [510, 55],
            [570, 145],
            [605, 185],
          ],
        ].map((pts) =>
          pts.map((p, i) =>
            i === 0 ? null : (
              <line
                key={`inv${i}`}
                x1={pts[i - 1][0]}
                y1={pts[i - 1][1]}
                x2={p[0]}
                y2={p[1]}
                stroke={i === 4 || i === 5 ? "#ff4444" : i % 2 === 1 ? "#00ffa3" : "#ffd700"}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            )
          )
        )}
        {/* techo onda 1 inválido */}
        <line x1={390} y1={120} x2={600} y2={120} stroke="#ffd700" strokeWidth={1} strokeDasharray="5 3" opacity={0.5} />
        <text x={390} y={112} fill="#ffd700" fontSize={8} fontFamily="monospace">
          techo①
        </text>
        {/* zona superposición */}
        <rect x={520} y={120} width={70} height={25} fill="rgba(255,68,68,0.2)" stroke="rgba(255,68,68,0.5)" strokeWidth={1} strokeDasharray="4 3" />
        <text x={555} y={134} textAnchor="middle" fill="#ff4444" fontSize={8} fontFamily="monospace" fontWeight="700">
          SOLAPA
        </text>
        {/* ④ cruza */}
        <circle cx={570} cy={145} r={5} fill="#ff4444" />
        <text x={570} y={162} textAnchor="middle" fill="#ff4444" fontSize={10} fontFamily="monospace" fontWeight="700">
          ④
        </text>
        {/* labels */}
        {[
          [390, 120, "①"],
          [430, 165, "②"],
          [510, 55, "③"],
        ].map(([x, y, l], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={4} fill={l === "②" ? "#ffd700" : "#00ffa3"} />
            <text
              x={x}
              y={l === "②" ? Number(y) + 18 : Number(y) - 10}
              textAnchor="middle"
              fill={l === "②" ? "#ffd700" : "#00ffa3"}
              fontSize={10}
              fontFamily="monospace"
              fontWeight="700"
            >
              {l}
            </text>
          </g>
        ))}
        <circle cx={605} cy={185} r={4} fill="#ff4444" />
        <text x={605} y={200} textAnchor="middle" fill="#ff4444" fontSize={10} fontFamily="monospace" fontWeight="700">
          ⑤
        </text>
        <text
          x={490}
          y={12}
          textAnchor="middle"
          fill="rgba(255,68,68,0.7)"
          fontSize={9}
          fontFamily="monospace"
          letterSpacing={1}
        >
          CON SUPERPOSICIÓN ✗
        </text>
      </svg>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────────────────────
const tabs = [
  { id: "full", label: "Ciclo completo 5+ABC" },
  { id: "abc", label: "Zoom onda ABC" },
  { id: "super", label: "Superposición" },
];

export default function Page() {
  const [tab, setTab] = useState("full");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060b18",
        color: "#c8d8f0",
        fontFamily: "'IBM Plex Mono', monospace",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ color: "#5599ff", fontSize: 9, letterSpacing: 3, marginBottom: 4 }}>
            ELLIOTT WAVES · MONER
          </div>
          <h1 style={{ margin: 0, fontSize: 19, color: "#fff", fontWeight: 700 }}>
            Los 5 impulsos + ABC + Superposición
          </h1>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "7px 14px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 10,
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 600,
                background: tab === t.id ? "rgba(85,153,255,0.15)" : "transparent",
                color: tab === t.id ? "#5599ff" : "#5a6a80",
                boxShadow: tab === t.id ? "inset 0 0 0 1px rgba(85,153,255,0.4)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          style={{
            background: "rgba(8,14,28,0.9)",
            border: "1px solid rgba(85,153,255,0.15)",
            borderRadius: 10,
            padding: "18px",
            marginBottom: 14,
          }}
        >
          {tab === "full" && <FullCycle />}
          {tab === "abc" && <ABCZoom />}
          {tab === "super" && <SuperpositionContext />}
        </div>

        {/* Cuadro resumen */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {[
            { color: "#00ffa3", title: "Ondas impulsivas", body: "1 · 3 · 5\nA favor de la\ntendencia mayor" },
            { color: "#ffd700", title: "Ondas correctivas", body: "2 · 4 · (B)\nContra la tendencia\nson oportunidades" },
            { color: "#ff7744", title: "Corrección ABC", body: "A · B · C\nCierra el ciclo\nantes del siguiente" },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                background: `${c.color}08`,
                border: `1px solid ${c.color}25`,
                borderRadius: 8,
                padding: "12px",
              }}
            >
              <div style={{ color: c.color, fontSize: 10, fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: "#8899aa", fontSize: 10, lineHeight: 1.7, whiteSpace: "pre-line" }}>{c.body}</div>
            </div>
          ))}
        </div>

        {/* Regla de superposición */}
        <div
          style={{
            padding: "12px 16px",
            background: "rgba(255,68,68,0.05)",
            border: "1px solid rgba(255,68,68,0.2)",
            borderRadius: 8,
            fontSize: 11,
            color: "#8899aa",
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: "#ff4444", fontWeight: 700 }}>Regla de superposición: </span>
          La ④ no puede entrar en el rango de precios de la ①. Si lo hace, el conteo es inválido o la
          tendencia ha terminado. El patrón de Moner usa esta señal como alerta de cambio de tendencia.
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

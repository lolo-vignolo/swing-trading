"use client";

import { useState } from "react";

const C = {
  bg: "#04080f",
  panel: "rgba(8,16,32,0.98)",
  green: "#00e5a0",
  gold: "#f0c040",
  red: "#ff5566",
  blue: "#5599ff",
  orange: "#ff9944",
  purple: "#cc88ff",
  text: "#ddeeff",
  muted: "#4a6a8a",
  soft: "#8899aa",
  border: "rgba(255,255,255,0.08)",
};

// ─── PASO 1: QUÉ ES UN RETROCESO INTERNO ─────────────────────────────────────
function Step1() {
  const [nivel, setNivel] = useState<number | null>(null);

  // El precio sube de 100 a 200. ¿Cuánto puede bajar y seguir siendo corrección?
  const base = 220;
  const top = 40;
  const rango = base - top; // 180px

  const fibs = [
    { pct: 0.236, precio: 176, label: "23.6%", color: "#aabbcc", ok: true, msg: "Corrección muy leve → tendencia muy fuerte" },
    { pct: 0.382, precio: 162, label: "38.2%", color: C.green, ok: true, msg: "✓ Zona ideal de entrada — tendencia fuerte" },
    { pct: 0.5, precio: 150, label: "50.0%", color: C.blue, ok: true, msg: "✓ Zona ideal de entrada — muy respetada" },
    { pct: 0.618, precio: 138, label: "61.8%", color: C.gold, ok: true, msg: "✓ Última oportunidad — si aguanta, entra" },
    { pct: 0.786, precio: 121, label: "78.6%", color: C.orange, ok: false, msg: "⚠ Peligro — casi cambio de tendencia" },
    { pct: 1.0, precio: 100, label: "100%", color: C.red, ok: false, msg: "✕ La tendencia ha muerto — no entrar" },
  ];

  // Precio real del ejemplo: baja al 50%
  const realRetY = top + rango * 0.5;

  return (
    <div>
      {/* Analogía */}
      <div
        style={{
          padding: "12px 16px",
          marginBottom: 14,
          background: "rgba(0,229,160,0.06)",
          border: "1px solid rgba(0,229,160,0.2)",
          borderRadius: 8,
          fontSize: 12,
          color: C.soft,
          lineHeight: 1.8,
        }}
      >
        <span style={{ color: C.green, fontWeight: 700 }}>Imagínalo así: </span>
        El precio sube de <b style={{ color: C.text }}>100€ a 200€</b>. Luego baja un poco. El retroceso interno te dice{" "}
        <b style={{ color: C.text }}>hasta dónde puede bajar y seguir siendo una corrección normal</b>. Si baja demasiado → ya no es corrección, es cambio de tendencia.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Gráfico */}
        <div>
          <svg viewBox="0 0 300 280" width="100%" style={{ display: "block" }}>
            <defs>
              <linearGradient id="okZone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={C.green} stopOpacity={0.12} />
                <stop offset="100%" stopColor={C.gold} stopOpacity={0.12} />
              </linearGradient>
            </defs>

            {/* Zona verde de entrada */}
            <rect x={60} y={top + rango * 0.382} width={160} height={rango * 0.618 - rango * 0.382} fill="url(#okZone)" stroke="rgba(0,229,160,0.2)" strokeWidth={1} rx={2} />
            <text x={140} y={top + rango * 0.382 - 5} textAnchor="middle" fill={C.green} fontSize={9} fontFamily="monospace">
              ZONA DE ENTRADA ✓
            </text>

            {/* Niveles fib */}
            {fibs.map((f, i) => {
              const fy = top + rango * f.pct;
              const active = nivel === i;
              return (
                <g key={i} style={{ cursor: "pointer" }} onMouseEnter={() => setNivel(i)} onMouseLeave={() => setNivel(null)}>
                  <rect x={10} y={fy - 10} width={230} height={20} rx={2} fill={active ? `${f.color}15` : "transparent"} />
                  <line x1={60} y1={fy} x2={220} y2={fy} stroke={f.color} strokeWidth={active ? 2 : 1} strokeDasharray={active ? "none" : "6 4"} opacity={active ? 1 : 0.6} />
                  <rect x={222} y={fy - 9} width={40} height={16} rx={3} fill={`${f.color}20`} stroke={`${f.color}55`} strokeWidth={1} />
                  <text x={242} y={fy + 4} textAnchor="middle" fill={f.color} fontSize={9} fontFamily="monospace" fontWeight="700">
                    {f.label}
                  </text>
                  {/* Precio */}
                  <text x={55} y={fy + 4} textAnchor="end" fill={f.color} fontSize={9} fontFamily="monospace">
                    {f.precio}€
                  </text>
                </g>
              );
            })}

            {/* Subida */}
            <line x1={80} y1={base} x2={80} y2={top} stroke={C.green} strokeWidth={3} strokeLinecap="round" />
            <polygon points={`80,${top - 2} 74,${top + 14} 86,${top + 14}`} fill={C.green} />
            <text x={80} y={base + 16} textAnchor="middle" fill={C.green} fontSize={10} fontFamily="monospace" fontWeight="700">
              100€
            </text>
            <text x={80} y={top - 12} textAnchor="middle" fill={C.green} fontSize={10} fontFamily="monospace" fontWeight="700">
              200€
            </text>

            {/* Retroceso real */}
            <line x1={80} y1={top} x2={160} y2={realRetY} stroke={C.gold} strokeWidth={2.5} strokeLinecap="round" />
            <circle cx={160} cy={realRetY} r={6} fill={C.blue} stroke={C.blue} strokeWidth={2} />
            <text x={175} y={realRetY + 4} fill={C.blue} fontSize={10} fontFamily="monospace" fontWeight="700">
              ← AQUÍ
            </text>
            <text x={175} y={realRetY + 16} fill={C.blue} fontSize={9} fontFamily="monospace">
              baja el precio
            </text>
          </svg>
        </div>

        {/* Panel info */}
        <div>
          <div style={{ marginBottom: 10, color: C.soft, fontSize: 11, lineHeight: 1.7 }}>
            <b style={{ color: C.text }}>Pasa el cursor</b> sobre cada nivel para ver qué significa:
          </div>
          {fibs.map((f, i) => (
            <div
              key={i}
              onMouseEnter={() => setNivel(i)}
              onMouseLeave={() => setNivel(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "7px 10px",
                marginBottom: 4,
                borderRadius: 6,
                cursor: "pointer",
                background: nivel === i ? `${f.color}12` : "transparent",
                border: `1px solid ${nivel === i ? f.color + "40" : "transparent"}`,
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: f.color,
                }}
              />
              <span style={{ color: f.color, fontWeight: 700, fontSize: 12, width: 52, flexShrink: 0 }}>{f.label}</span>
              <span style={{ color: f.ok ? C.soft : C.red, fontSize: 11, lineHeight: 1.4 }}>{f.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PASO 2: QUÉ ES UN RETROCESO EXTERNO ─────────────────────────────────────
function Step2() {
  const [paso, setPaso] = useState(0);

  const steps = [
    {
      title: "1. El precio cae — esta es la onda A",
      desc: "Mides cuánto cae. Eso es tu 'regla de medida'.",
      highlight: "A",
    },
    {
      title: "2. Rebota un poco — esta es la onda B",
      desc: "El rebote es parcial. No recupera todo lo perdido. Es una trampa — NO entres.",
      highlight: "B",
    },
    {
      title: "3. Vuelve a caer — esta es la onda C",
      desc: "¿Dónde termina C? Usas la longitud de A y la proyectas HACIA ABAJO desde B.",
      highlight: "C",
    },
    {
      title: "4. Los objetivos probables de C",
      desc: "C = 100% de A (igual tamaño), 127.2% de A (algo más), o 161.8% de A (mucho más).",
      highlight: "targets",
    },
  ];

  const sx = 50;
  const sy = 60; // inicio
  const ax = 160;
  const ay = 180; // fin de A
  const bx = 230;
  const by = 110; // fin de B
  const aRange = ay - sy;

  const targets = [
    { y: by + aRange * 1.0, label: "100% de A", color: C.gold, desc: "Lo más frecuente" },
    { y: by + aRange * 1.272, label: "127.2%", color: C.orange, desc: "Mercado débil" },
    { y: by + aRange * 1.618, label: "161.8%", color: C.red, desc: "Mercado muy débil" },
  ];

  return (
    <div>
      <div
        style={{
          padding: "12px 16px",
          marginBottom: 14,
          background: "rgba(255,85,102,0.06)",
          border: "1px solid rgba(255,85,102,0.2)",
          borderRadius: 8,
          fontSize: 12,
          color: C.soft,
          lineHeight: 1.8,
        }}
      >
        <span style={{ color: C.red, fontWeight: 700 }}>Imagínalo así: </span>
        El precio cae <b style={{ color: C.text }}>100€</b>. Esa distancia es tu <b style={{ color: C.text }}>&quot;regla&quot;</b>. Cuando el precio rebota y luego vuelve a caer (onda C), usas esa regla para proyectar <b style={{ color: C.text }}>hacia abajo desde el rebote</b> y estimar dónde parará.
      </div>

      {/* Pasos */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setPaso(i)}
            style={{
              padding: "6px 14px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700,
              background: paso === i ? "rgba(85,153,255,0.15)" : "rgba(255,255,255,0.04)",
              color: paso === i ? C.blue : C.muted,
              boxShadow: paso === i ? "inset 0 0 0 1px rgba(85,153,255,0.4)" : "none",
            }}
          >
            Paso {i + 1}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <svg viewBox="0 0 320 290" width="100%" style={{ display: "block" }}>
          {/* Flecha medida A */}
          {paso >= 0 && (
            <>
              <line x1={sx - 18} y1={sy} x2={sx - 18} y2={ay} stroke={C.red} strokeWidth={1.5} />
              <line x1={sx - 24} y1={sy} x2={sx - 12} y2={sy} stroke={C.red} strokeWidth={1} />
              <line x1={sx - 24} y1={ay} x2={sx - 12} y2={ay} stroke={C.red} strokeWidth={1} />
              <text
                x={sx - 26}
                y={(sy + ay) / 2 + 4}
                textAnchor="middle"
                fill={C.red}
                fontSize={9}
                fontFamily="monospace"
                fontWeight="700"
                transform={`rotate(-90,${sx - 26},${(sy + ay) / 2})`}
              >
                A = regla
              </text>
            </>
          )}

          {/* Onda A */}
          {paso >= 0 && (
            <>
              <circle cx={sx} cy={sy} r={5} fill={C.red} />
              <text x={sx + 10} y={sy + 4} fill={C.red} fontSize={12} fontFamily="monospace" fontWeight="700">
                inicio
              </text>
              <line x1={sx} y1={sy} x2={ax} y2={ay} stroke={C.red} strokeWidth={3} strokeLinecap="round" />
              <circle cx={ax} cy={ay} r={5} fill={C.red} />
              <text x={ax + 8} y={ay + 4} fill={C.red} fontSize={14} fontFamily="monospace" fontWeight="700">
                A
              </text>
            </>
          )}

          {/* Onda B */}
          {paso >= 1 && (
            <>
              <line x1={ax} y1={ay} x2={bx} y2={by} stroke={C.gold} strokeWidth={3} strokeLinecap="round" />
              <circle cx={bx} cy={by} r={5} fill={C.gold} />
              <text x={bx + 8} y={by + 4} fill={C.gold} fontSize={14} fontFamily="monospace" fontWeight="700">
                B
              </text>
              <text x={bx + 8} y={by + 18} fill={C.gold} fontSize={9} fontFamily="monospace">
                ⚠ trampa
              </text>
            </>
          )}

          {/* Onda C bajando */}
          {paso >= 2 && (
            <>
              <line x1={bx} y1={by} x2={240} y2={by + aRange * 1.0} stroke={C.red} strokeWidth={3} strokeLinecap="round" strokeDasharray="8 4" />
              <text x={248} y={by + aRange * 1.0 + 4} fill={C.red} fontSize={14} fontFamily="monospace" fontWeight="700">
                C
              </text>
              <text x={248} y={by + aRange * 1.0 + 18} fill={C.soft} fontSize={9} fontFamily="monospace">
                ¿hasta aquí?
              </text>
            </>
          )}

          {/* Targets */}
          {paso >= 3 &&
            targets.map((t, i) => (
              <g key={i}>
                <line x1={bx} y1={t.y} x2={300} y2={t.y} stroke={t.color} strokeWidth={1} strokeDasharray="5 3" opacity={0.8} />
                <circle cx={240} cy={t.y} r={5} fill="rgba(4,8,15,0.9)" stroke={t.color} strokeWidth={2} />
                <text x={248} y={t.y + 4} fill={t.color} fontSize={9} fontFamily="monospace" fontWeight="700">
                  {t.label}
                </text>
              </g>
            ))}

          {/* Proyección desde B */}
          {paso >= 3 && (
            <>
              <line x1={bx - 16} y1={by} x2={bx - 16} y2={by + aRange} stroke={C.orange} strokeWidth={1} strokeDasharray="4 3" />
              <text
                x={bx - 20}
                y={by + aRange / 2 + 4}
                textAnchor="middle"
                fill={C.orange}
                fontSize={9}
                fontFamily="monospace"
                transform={`rotate(-90,${bx - 20},${by + aRange / 2})`}
              >
                proyección desde B
              </text>
            </>
          )}
        </svg>

        {/* Explicación del paso */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              padding: "14px",
              borderRadius: 8,
              background: "rgba(85,153,255,0.07)",
              border: "1px solid rgba(85,153,255,0.2)",
            }}
          >
            <div style={{ color: C.blue, fontSize: 11, fontWeight: 700, marginBottom: 8 }}>{steps[paso].title}</div>
            <div style={{ color: C.soft, fontSize: 12, lineHeight: 1.8 }}>{steps[paso].desc}</div>
          </div>

          {paso === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {targets.map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 12px",
                    borderRadius: 6,
                    background: `${t.color}0c`,
                    border: `1px solid ${t.color}30`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: t.color, fontWeight: 700, fontSize: 11 }}>{t.label}</span>
                  <span style={{ color: C.soft, fontSize: 11 }}>{t.desc}</span>
                </div>
              ))}
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 6,
                  background: "rgba(204,136,255,0.08)",
                  border: "1px solid rgba(204,136,255,0.25)",
                  fontSize: 11,
                  color: C.soft,
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: C.purple, fontWeight: 700 }}>Truco: </span>
                Si un nivel externo coincide con un soporte previo → altísima probabilidad de giro.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PASO 3: CONFLUENCIA ──────────────────────────────────────────────────────
function Step3() {
  const [show, setShow] = useState(false);

  const baseY = 240;
  const topY = 40;
  const rango = baseY - topY; // 200px

  // La onda sube (onda 1-3 combinada)
  const subirDe = { x: 30, y: baseY };
  const subirA = { x: 130, y: topY };

  // Retrocede (onda B o corrección)
  const retrA = { x: 130, y: topY };
  const retrB = { x: 200, y: topY + rango * 0.4 }; // B al 40%

  // Nivel interno: 61.8% de la subida completa
  const internalLevel = topY + rango * 0.618;

  // Nivel externo: 100% de A desde B (hacemos que sea similar)
  const externalLevel = retrB.y + (retrB.y - topY) * 1.0;

  // Confluencia aproximada
  const confLevel = (internalLevel + externalLevel) / 2;

  // C endpoint
  const cEnd = { x: 300, y: confLevel };

  return (
    <div>
      <div
        style={{
          padding: "12px 16px",
          marginBottom: 14,
          background: "rgba(204,136,255,0.06)",
          border: "1px solid rgba(204,136,255,0.2)",
          borderRadius: 8,
          fontSize: 12,
          color: C.soft,
          lineHeight: 1.8,
        }}
      >
        <span style={{ color: C.purple, fontWeight: 700 }}>La idea más poderosa: </span>
        Un solo nivel de Fibonacci te da una pista. <b style={{ color: C.text }}>Dos métodos apuntando al mismo precio</b> te dan convicción real. Eso es la <b style={{ color: C.purple }}>confluencia</b>.
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <svg viewBox="0 0 360 270" width="100%" style={{ display: "block" }}>
          {/* Zona de confluencia */}
          {show && (
            <>
              <rect x={20} y={confLevel - 12} width={320} height={24} fill="rgba(204,136,255,0.15)" stroke="rgba(204,136,255,0.5)" strokeWidth={1.5} rx={3} />
              <text x={180} y={confLevel + 5} textAnchor="middle" fill={C.purple} fontSize={10} fontFamily="monospace" fontWeight="700">
                ★ ZONA DE CONFLUENCIA ★
              </text>
            </>
          )}

          {/* Nivel interno */}
          {show && (
            <>
              <line x1={20} y1={internalLevel} x2={175} y2={internalLevel} stroke={C.gold} strokeWidth={1.5} strokeDasharray="6 3" opacity={0.8} />
              <rect x={175} y={internalLevel - 10} width={80} height={16} rx={3} fill={`${C.gold}20`} stroke={`${C.gold}55`} strokeWidth={1} />
              <text x={215} y={internalLevel + 3} textAnchor="middle" fill={C.gold} fontSize={9} fontFamily="monospace" fontWeight="700">
                61.8% interno
              </text>
            </>
          )}

          {/* Nivel externo */}
          {show && (
            <>
              <line x1={195} y1={externalLevel} x2={340} y2={externalLevel} stroke={C.orange} strokeWidth={1.5} strokeDasharray="6 3" opacity={0.8} />
              <rect x={258} y={externalLevel - 10} width={80} height={16} rx={3} fill={`${C.orange}20`} stroke={`${C.orange}55`} strokeWidth={1} />
              <text x={298} y={externalLevel + 3} textAnchor="middle" fill={C.orange} fontSize={9} fontFamily="monospace" fontWeight="700">
                100% externo
              </text>
            </>
          )}

          {/* Precio sube */}
          <line x1={subirDe.x} y1={subirDe.y} x2={subirA.x} y2={subirA.y} stroke={C.green} strokeWidth={3} strokeLinecap="round" />
          <circle cx={subirA.x} cy={subirA.y} r={5} fill={C.green} />
          <text x={subirA.x} y={subirA.y - 12} textAnchor="middle" fill={C.green} fontSize={9} fontFamily="monospace" fontWeight="700">
            MAX
          </text>

          {/* Precio retrocede → B */}
          <line x1={retrA.x} y1={retrA.y} x2={retrB.x} y2={retrB.y} stroke={C.gold} strokeWidth={2.5} strokeLinecap="round" />
          <circle cx={retrB.x} cy={retrB.y} r={5} fill={C.gold} />
          <text x={retrB.x + 10} y={retrB.y + 4} fill={C.gold} fontSize={12} fontFamily="monospace" fontWeight="700">
            B
          </text>

          {/* C cae hasta confluencia */}
          <line x1={retrB.x} y1={retrB.y} x2={cEnd.x} y2={cEnd.y} stroke={C.red} strokeWidth={2.5} strokeLinecap="round" strokeDasharray={show ? "none" : "8 4"} />

          {/* Punto C */}
          <circle cx={cEnd.x} cy={cEnd.y} r={show ? 9 : 6} fill="rgba(4,8,15,0.95)" stroke={show ? C.purple : C.red} strokeWidth={show ? 3 : 2} />
          <text x={cEnd.x} y={cEnd.y + 4} textAnchor="middle" fill={show ? C.purple : C.red} fontSize={show ? 13 : 11} fontFamily="monospace" fontWeight="700">
            C
          </text>

          {/* Flecha de rebote post-confluencia */}
          {show && (
            <>
              <line x1={cEnd.x} y1={cEnd.y - 10} x2={cEnd.x + 40} y2={cEnd.y - 60} stroke={C.green} strokeWidth={2.5} strokeLinecap="round" />
              <polygon points={`${cEnd.x + 40},${cEnd.y - 62} ${cEnd.x + 34},${cEnd.y - 46} ${cEnd.x + 46},${cEnd.y - 46}`} fill={C.green} />
              <text x={cEnd.x + 48} y={cEnd.y - 55} fill={C.green} fontSize={9} fontFamily="monospace" fontWeight="700">
                ▲ GIRO
              </text>
            </>
          )}
        </svg>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              padding: "14px",
              borderRadius: 8,
              background: "rgba(204,136,255,0.06)",
              border: "1px solid rgba(204,136,255,0.2)",
            }}
          >
            <div style={{ color: C.purple, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>¿Cómo funciona?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { color: C.gold, icon: "↩", text: "Calculas el 61.8% INTERNO del movimiento alcista" },
                { color: C.orange, icon: "↪", text: "Calculas el 100% EXTERNO de la onda A desde B" },
                { color: C.purple, icon: "★", text: "Si ambos dan el mismo precio → CONFLUENCIA → entras" },
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      flexShrink: 0,
                      background: `${r.color}18`,
                      border: `1px solid ${r.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: r.color,
                      fontSize: 12,
                    }}
                  >
                    {r.icon}
                  </div>
                  <span style={{ color: C.soft, fontSize: 11, lineHeight: 1.6, marginTop: 3 }}>{r.text}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShow(!show)}
            style={{
              padding: "12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              fontWeight: 700,
              background: show ? "rgba(204,136,255,0.15)" : "rgba(204,136,255,0.08)",
              color: C.purple,
              boxShadow: "inset 0 0 0 1px rgba(204,136,255,0.3)",
              transition: "all 0.2s",
            }}
          >
            {show ? "✓ Confluencia visible — clic para ocultar" : "★ Ver la confluencia"}
          </button>

          {show && (
            <div
              style={{
                padding: "12px",
                borderRadius: 8,
                background: "rgba(204,136,255,0.08)",
                border: "1px solid rgba(204,136,255,0.25)",
                fontSize: 11,
                color: C.soft,
                lineHeight: 1.7,
              }}
            >
              <span style={{ color: C.purple, fontWeight: 700 }}>Resultado: </span>
              Los dos niveles señalan la misma zona. Cuando el precio llega ahí, buscas una vela de giro en el gráfico de 3m con el MACD cruzando al alza →{" "}
              <span style={{ color: C.green }}>entrada de alta probabilidad.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── RESUMEN RÁPIDO ───────────────────────────────────────────────────────────
function Resumen() {
  const cards = [
    {
      pregunta: "¿El precio está corrigiendo?",
      herramienta: "INTERNO",
      accion: "Mira si para en el 38.2%, 50% o 61.8% del movimiento previo. Ahí buscas entrada.",
      color: C.green,
      icon: "↩",
    },
    {
      pregunta: "¿El ABC ha acabado? ¿Dónde está C?",
      herramienta: "EXTERNO",
      accion: "Mides la onda A y la proyectas desde B hacia abajo: 100%, 127.2%, 161.8%.",
      color: C.red,
      icon: "↪",
    },
    {
      pregunta: "¿Dónde termina la onda ⑤?",
      herramienta: "EXTERNO",
      accion: "Mides la onda ① y la proyectas desde ④ hacia arriba: 61.8% o 100% de ①.",
      color: C.orange,
      icon: "⑤",
    },
    {
      pregunta: "¿Cuándo tengo más convicción?",
      herramienta: "CONFLUENCIA",
      accion: "Cuando el interno y el externo señalan el mismo precio. Esa es tu zona de máxima probabilidad.",
      color: C.purple,
      icon: "★",
    },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {cards.map((c, i) => (
        <div
          key={i}
          style={{
            padding: "14px",
            borderRadius: 8,
            background: `${c.color}08`,
            border: `1px solid ${c.color}25`,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                flexShrink: 0,
                background: `${c.color}18`,
                border: `1px solid ${c.color}45`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: c.color,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              {c.icon}
            </div>
            <span
              style={{
                fontSize: 10,
                letterSpacing: 1.5,
                color: c.color,
                fontWeight: 700,
                background: `${c.color}15`,
                border: `1px solid ${c.color}35`,
                padding: "2px 8px",
                borderRadius: 3,
              }}
            >
              {c.herramienta}
            </span>
          </div>
          <div style={{ color: C.text, fontSize: 12, fontWeight: 700, marginBottom: 6, lineHeight: 1.4 }}>{c.pregunta}</div>
          <div style={{ color: C.soft, fontSize: 11, lineHeight: 1.7 }}>{c.accion}</div>
        </div>
      ))}
    </div>
  );
}

// ─── ONDAS 1-5 vs ABC ────────────────────────────────────────────────────────
function OndasVsABC() {
  const [seccion, setSeccion] = useState<"ondas" | "abc">("ondas");
  const [waveHover, setWaveHover] = useState<number | null>(null);
  const [abcHover, setAbcHover] = useState<number | null>(null);

  const waveInfo = [
    {
      label: "①",
      color: C.green,
      tipo: "IMPULSO",
      donde: "Primer movimiento a favor de la tendencia",
      que: "El mercado empieza a moverse. Pocos lo ven. Volumen moderado.",
      fib: "Referencia: usarás su tamaño para proyectar ⑤ y medir ②",
    },
    {
      label: "②",
      color: C.gold,
      tipo: "CORRECCIÓN",
      donde: "Baja después de ①, pero NO supera el inicio de ①",
      que: "El mercado 'descansa'. Parece que va a caer. Es una trampa alcista.",
      fib: "Fibonacci interno: busca que pare en 38.2%–61.8% de ①",
    },
    {
      label: "③",
      color: C.green,
      tipo: "IMPULSO",
      donde: "El movimiento más fuerte y largo de todos",
      que: "Todo el mundo entra. Gran volumen. La tendencia es obvia.",
      fib: "Suele ser 1.618× la longitud de ①. La más rentable.",
    },
    {
      label: "④",
      color: C.gold,
      tipo: "CORRECCIÓN",
      donde: "Baja después de ③, pero NO entra en el rango de ①",
      que: "Otro descanso. Más lateral que ②. Paciencia.",
      fib: "Fibonacci interno: para en 38.2%–50% de ③. Entrada más segura que ②",
    },
    {
      label: "⑤",
      color: C.green,
      tipo: "IMPULSO",
      donde: "Último movimiento alcista. Suele ser más débil que ③",
      que: "El precio sube pero el momentum baja (divergencia MACD). Ojo: trampa bajista al final.",
      fib: "Externo: suele igualar a ① (100%) o recorrer 61.8% de ①+③",
    },
  ];

  const abcInfo = [
    {
      label: "A",
      color: C.red,
      tipo: "BAJADA",
      donde: "Primera caída fuerte después del final de ⑤",
      que: "El mercado gira. Muchos piensan que es una corrección de ①–⑤. Volumen alto.",
      fib: "Mide esta onda: es tu 'regla' para proyectar C con retroceso externo",
    },
    {
      label: "B",
      color: C.orange,
      tipo: "REBOTE TRAMPA",
      donde: "Sube después de A, pero NO supera el máximo de ⑤",
      que: "Parece que el mercado vuelve a subir. Es una trampa. NO entres largo.",
      fib: "Retroceso interno de A: suele parar en 38.2%–61.8% de A. Punto de partida para proyectar C.",
    },
    {
      label: "C",
      color: C.red,
      tipo: "BAJADA FINAL",
      donde: "Segunda caída, suele ser igual o mayor que A",
      que: "Confirma que es una corrección mayor. Aquí termina el ABC y puede empezar un nuevo ciclo.",
      fib: "Externo desde B: 100%, 127.2% o 161.8% de A. Aquí buscas entrada larga si hay confluencia.",
    },
  ];

  // Puntos del gráfico completo
  const fullPts = [
    { x: 20, y: 230, wave: null },
    { x: 80, y: 140, wave: "①" },
    { x: 115, y: 168, wave: "②" },
    { x: 220, y: 55, wave: "③" },
    { x: 270, y: 110, wave: "④" },
    { x: 360, y: 40, wave: "⑤" },
    { x: 415, y: 115, wave: "A" },
    { x: 450, y: 82, wave: "B" },
    { x: 500, y: 185, wave: "C" },
  ] as const;

  const waveColors: Record<string, string> = { "①": C.green, "②": C.gold, "③": C.green, "④": C.gold, "⑤": C.green, A: C.red, B: C.orange, C: C.red };
  const waveAbove: Record<string, boolean> = { "①": true, "②": false, "③": true, "④": false, "⑤": true, A: false, B: true, C: false };

  return (
    <div>
      {/* Intro */}
      <div
        style={{
          padding: "12px 16px",
          marginBottom: 16,
          background: "rgba(85,153,255,0.05)",
          border: "1px solid rgba(85,153,255,0.18)",
          borderRadius: 8,
          fontSize: 12,
          color: C.soft,
          lineHeight: 1.8,
        }}
      >
        <span style={{ color: C.blue, fontWeight: 700 }}>La idea central de Elliott: </span>
        El mercado se mueve en ciclos. Primero <b style={{ color: C.green }}>5 ondas a favor de la tendencia</b> (impulso), luego <b style={{ color: C.red }}>3 ondas en contra</b> (corrección ABC). Después, todo se repite.
      </div>

      {/* Gráfico completo con el ciclo */}
      <div
        style={{
          background: "rgba(4,8,20,0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 8,
          padding: "12px 8px 4px",
          marginBottom: 16,
        }}
      >
        <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2, marginBottom: 6, paddingLeft: 8 }}>CICLO COMPLETO — pasa el cursor sobre cada onda</div>
        <svg viewBox="0 0 540 250" width="100%" style={{ display: "block" }}>
          {/* Fondo zonas */}
          <rect x={15} y={10} width={360} height={230} rx={4} fill="rgba(0,229,160,0.03)" stroke="rgba(0,229,160,0.08)" strokeWidth={1} />
          <rect x={395} y={10} width={135} height={230} rx={4} fill="rgba(255,85,102,0.03)" stroke="rgba(255,85,102,0.08)" strokeWidth={1} />
          <text x={195} y={24} textAnchor="middle" fill="rgba(0,229,160,0.35)" fontSize={9} fontFamily="monospace" letterSpacing={2}>
            5 ONDAS IMPULSIVAS
          </text>
          <text x={462} y={24} textAnchor="middle" fill="rgba(255,85,102,0.35)" fontSize={9} fontFamily="monospace" letterSpacing={1}>
            ABC
          </text>

          {/* Segmentos */}
          {fullPts.map((p, i) => {
            if (i === 0) return null;
            const prev = fullPts[i - 1];
            const col = p.wave ? waveColors[p.wave] : C.green;
            const isHovered =
              (seccion === "ondas" && waveHover !== null && ["①", "②", "③", "④", "⑤"].indexOf(p.wave ?? "") === waveHover) ||
              (seccion === "abc" && abcHover !== null && ["A", "B", "C"].indexOf(p.wave ?? "") === abcHover);
            return (
              <line
                key={i}
                x1={prev.x}
                y1={prev.y}
                x2={p.x}
                y2={p.y}
                stroke={col}
                strokeWidth={isHovered ? 4 : 2.5}
                strokeLinecap="round"
                opacity={isHovered ? 1 : 0.75}
                style={{ transition: "stroke-width 0.15s" }}
              />
            );
          })}

          {/* Puntos y etiquetas */}
          {fullPts
            .filter((p) => p.wave)
            .map((p, i) => {
              const col = p.wave ? waveColors[p.wave] : C.green;
              const isImpulse = ["①", "②", "③", "④", "⑤"].includes(p.wave ?? "");
              const idx = isImpulse ? ["①", "②", "③", "④", "⑤"].indexOf(p.wave ?? "") : ["A", "B", "C"].indexOf(p.wave ?? "");
              const isHov = isImpulse ? seccion === "ondas" && waveHover === idx : seccion === "abc" && abcHover === idx;
              return (
                <g
                  key={i}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => {
                    if (isImpulse) {
                      setSeccion("ondas");
                      setWaveHover(idx);
                    } else {
                      setSeccion("abc");
                      setAbcHover(idx);
                    }
                  }}
                  onMouseLeave={() => {
                    setWaveHover(null);
                    setAbcHover(null);
                  }}
                >
                  <circle cx={p.x} cy={p.y} r={isHov ? 9 : 6} fill="rgba(4,8,20,0.95)" stroke={col} strokeWidth={isHov ? 2.5 : 1.5} style={{ transition: "r 0.15s" }} />
                  <text x={p.x} y={p.y + 4} textAnchor="middle" fill={col} fontSize={isHov ? 12 : 10} fontFamily="monospace" fontWeight="700">
                    {p.wave}
                  </text>
                </g>
              );
            })}
        </svg>
      </div>

      {/* Toggle Ondas / ABC */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 14,
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 8,
          padding: 4,
          width: "fit-content",
        }}
      >
        {[
          { id: "ondas", label: "① ② ③ ④ ⑤ — Ondas impulsivas", color: C.green },
          { id: "abc", label: "A B C — Corrección", color: C.red },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              setSeccion(opt.id as "ondas" | "abc");
              setWaveHover(null);
              setAbcHover(null);
            }}
            style={{
              padding: "8px 18px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700,
              background: seccion === opt.id ? `${opt.color}15` : "transparent",
              color: seccion === opt.id ? opt.color : C.muted,
              boxShadow: seccion === opt.id ? `inset 0 0 0 1px ${opt.color}50` : "none",
              transition: "all 0.2s",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── SECCIÓN ONDAS ── */}
      {seccion === "ondas" && (
        <div>
          <div
            style={{
              padding: "10px 14px",
              marginBottom: 12,
              background: "rgba(0,229,160,0.05)",
              border: "1px solid rgba(0,229,160,0.15)",
              borderRadius: 8,
              fontSize: 11,
              color: C.soft,
              lineHeight: 1.7,
            }}
          >
            Las <b style={{ color: C.green }}>ondas impulsivas</b> se mueven <b style={{ color: C.text }}>a favor de la tendencia principal</b>. Son las que quieres{" "}
            <b style={{ color: C.green }}>operar a favor</b>. Las correcciones (② y ④) son las zonas donde <b style={{ color: C.text }}>esperas para entrar</b>.
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {waveInfo.map((w, i) => (
              <div
                key={i}
                onMouseEnter={() => setWaveHover(i)}
                onMouseLeave={() => setWaveHover(null)}
                style={{
                  padding: "12px 10px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: waveHover === i ? `${w.color}12` : `${w.color}06`,
                  border: `1px solid ${waveHover === i ? w.color + "55" : w.color + "20"}`,
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      flexShrink: 0,
                      background: `${w.color}20`,
                      border: `1px solid ${w.color}50`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: w.color,
                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    {w.label}
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      color: w.color,
                      fontWeight: 700,
                      letterSpacing: 1,
                      background: `${w.color}15`,
                      borderRadius: 3,
                      padding: "1px 5px",
                      border: `1px solid ${w.color}30`,
                    }}
                  >
                    {w.tipo}
                  </span>
                </div>
                <div style={{ color: C.text, fontSize: 11, fontWeight: 700, marginBottom: 5, lineHeight: 1.4 }}>{w.donde}</div>
                <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.6, marginBottom: 6 }}>{w.que}</div>
                <div
                  style={{
                    color: w.color,
                    fontSize: 10,
                    lineHeight: 1.5,
                    background: `${w.color}0a`,
                    borderRadius: 4,
                    padding: "5px 7px",
                    border: `1px solid ${w.color}18`,
                  }}
                >
                  📐 {w.fib}
                </div>
              </div>
            ))}
          </div>

          {/* Reglas de oro */}
          <div
            style={{
              marginTop: 12,
              padding: "12px 14px",
              background: "rgba(0,229,160,0.04)",
              border: "1px solid rgba(0,229,160,0.12)",
              borderRadius: 8,
            }}
          >
            <div style={{ color: C.green, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, marginBottom: 8 }}>LAS 3 REGLAS QUE NUNCA SE ROMPEN</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { txt: "② NUNCA retrocede más del 100% de ①", icon: "✗" },
                { txt: "③ NUNCA es la onda más corta", icon: "✗" },
                { txt: "④ NUNCA entra en el rango de ①", icon: "✗" },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 6,
                    background: "rgba(255,85,102,0.06)",
                    border: "1px solid rgba(255,85,102,0.15)",
                    fontSize: 11,
                    color: C.soft,
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: C.red, fontWeight: 700, marginRight: 5 }}>{r.icon}</span>
                  {r.txt}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SECCIÓN ABC ── */}
      {seccion === "abc" && (
        <div>
          <div
            style={{
              padding: "10px 14px",
              marginBottom: 12,
              background: "rgba(255,85,102,0.05)",
              border: "1px solid rgba(255,85,102,0.15)",
              borderRadius: 8,
              fontSize: 11,
              color: C.soft,
              lineHeight: 1.7,
            }}
          >
            El <b style={{ color: C.red }}>ABC</b> viene <b style={{ color: C.text }}>después de las 5 ondas</b> y va <b style={{ color: C.text }}>en contra de la tendencia principal</b>. No intentes operar a favor de ①–⑤ dentro del ABC: irás contra la corriente. El ABC <b style={{ color: C.green }}>termina con C</b>, y ahí puede empezar un nuevo ciclo ①–⑤.
          </div>

          {/* Comparación visual A B C */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
            {abcInfo.map((w, i) => (
              <div
                key={i}
                onMouseEnter={() => setAbcHover(i)}
                onMouseLeave={() => setAbcHover(null)}
                style={{
                  padding: "14px",
                  borderRadius: 8,
                  cursor: "pointer",
                  background: abcHover === i ? `${w.color}12` : `${w.color}06`,
                  border: `1px solid ${abcHover === i ? w.color + "55" : w.color + "20"}`,
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      flexShrink: 0,
                      background: `${w.color}20`,
                      border: `1px solid ${w.color}55`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: w.color,
                      fontSize: 18,
                      fontWeight: 700,
                    }}
                  >
                    {w.label}
                  </div>
                  <div>
                    <div style={{ color: w.color, fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>{w.tipo}</div>
                    <div style={{ color: C.muted, fontSize: 9, marginTop: 1 }}>onda {w.label}</div>
                  </div>
                </div>
                <div style={{ color: C.text, fontSize: 11, fontWeight: 700, marginBottom: 6, lineHeight: 1.4 }}>{w.donde}</div>
                <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.6, marginBottom: 8 }}>{w.que}</div>
                <div
                  style={{
                    color: w.color,
                    fontSize: 10,
                    lineHeight: 1.5,
                    background: `${w.color}0a`,
                    borderRadius: 4,
                    padding: "6px 8px",
                    border: `1px solid ${w.color}18`,
                  }}
                >
                  📐 {w.fib}
                </div>
              </div>
            ))}
          </div>

          {/* Mini gráfico ABC con labels */}
          <div
            style={{
              background: "rgba(4,8,20,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 8,
              padding: "10px 8px 4px",
              marginBottom: 10,
            }}
          >
            <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2, marginBottom: 4, paddingLeft: 8 }}>ZOOM ABC — estructura detallada</div>
            <svg viewBox="0 0 520 200" width="100%" style={{ display: "block" }}>
              {/* Puntos */}
              {(() => {
                const ap = [
                  { x: 40, y: 30, label: "fin ⑤", sub: "máximo" },
                  { x: 160, y: 145, label: "A", col: C.red, above: false, note: "caída fuerte\nalto volumen" },
                  { x: 260, y: 80, label: "B", col: C.orange, above: true, note: "rebote trampa\nbajo volumen" },
                  { x: 420, y: 170, label: "C", col: C.red, above: false, note: "caída final\nnuevo ciclo aquí" },
                ];
                return (
                  <>
                    {/* Líneas */}
                    <line x1={ap[0].x} y1={ap[0].y} x2={ap[1].x} y2={ap[1].y} stroke={C.red} strokeWidth={3} strokeLinecap="round" />
                    <line x1={ap[1].x} y1={ap[1].y} x2={ap[2].x} y2={ap[2].y} stroke={C.orange} strokeWidth={3} strokeLinecap="round" />
                    <line x1={ap[2].x} y1={ap[2].y} x2={ap[3].x} y2={ap[3].y} stroke={C.red} strokeWidth={3} strokeLinecap="round" />

                    {/* Max line */}
                    <line x1={ap[2].x} y1={ap[0].y} x2={ap[3].x} y2={ap[0].y} stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="5 4" />
                    <text x={ap[3].x + 5} y={ap[0].y + 4} fill="rgba(255,255,255,0.3)" fontSize={8} fontFamily="monospace">
                      MAX ⑤ — B no lo supera ✓
                    </text>

                    {/* Medida A */}
                    <line x1={ap[0].x - 14} y1={ap[0].y} x2={ap[0].x - 14} y2={ap[1].y} stroke={C.red} strokeWidth={1} />
                    <line x1={ap[0].x - 18} y1={ap[0].y} x2={ap[0].x - 10} y2={ap[0].y} stroke={C.red} strokeWidth={1} />
                    <line x1={ap[0].x - 18} y1={ap[1].y} x2={ap[0].x - 10} y2={ap[1].y} stroke={C.red} strokeWidth={1} />
                    <text
                      x={ap[0].x - 22}
                      y={(ap[0].y + ap[1].y) / 2 + 4}
                      fill={C.red}
                      fontSize={8}
                      fontFamily="monospace"
                      textAnchor="middle"
                      transform={`rotate(-90,${ap[0].x - 22},${(ap[0].y + ap[1].y) / 2})`}
                    >
                      mide A = regla
                    </text>

                    {/* Objetivo C */}
                    <line
                      x1={ap[2].x}
                      y1={ap[1].y + (ap[1].y - ap[0].y) * 1}
                      x2={ap[3].x + 20}
                      y2={ap[1].y + (ap[1].y - ap[0].y) * 1}
                      stroke={C.red}
                      strokeWidth={1}
                      strokeDasharray="5 3"
                      opacity={0.6}
                    />
                    <text
                      x={ap[3].x + 24}
                      y={ap[1].y + (ap[1].y - ap[0].y) * 1 + 4}
                      fill={C.red}
                      fontSize={8}
                      fontFamily="monospace"
                      opacity={0.7}
                    >
                      100% A → obj C
                    </text>

                    {/* Puntos y labels */}
                    {ap.map((p, i) => (
                      <g key={i}>
                        <circle cx={p.x} cy={p.y} r={6} fill="rgba(4,8,20,0.95)" stroke={p.col || "rgba(255,255,255,0.3)"} strokeWidth={2} />
                        <text x={p.x} y={p.y + 4} textAnchor="middle" fill={p.col || "rgba(255,255,255,0.5)"} fontSize={p.col ? 12 : 9} fontFamily="monospace" fontWeight="700">
                          {p.label}
                        </text>
                        {p.note && (
                          <text
                            x={p.col === "B" ? p.x : p.x + 10}
                            y={p.above ? p.y - 14 : p.y + 18}
                            textAnchor={p.label === "B" ? "middle" : "start"}
                            fill={p.col}
                            fontSize={8}
                            fontFamily="monospace"
                            opacity={0.8}
                          >
                            {p.note.split("\n").map((line, li) => (
                              <tspan key={li} x={p.label === "B" ? p.x : p.x + 10} dy={li === 0 ? 0 : 11}>
                                {line}
                              </tspan>
                            ))}
                          </text>
                        )}
                      </g>
                    ))}

                    {/* Nuevo ciclo ① desde C */}
                    <line x1={ap[3].x} y1={ap[3].y} x2={ap[3].x + 60} y2={ap[3].y - 80} stroke={C.green} strokeWidth={2} strokeLinecap="round" strokeDasharray="6 4" />
                    <text x={ap[3].x + 65} y={ap[3].y - 78} fill={C.green} fontSize={9} fontFamily="monospace" fontWeight="700">
                      nuevo ①
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>

          {/* Aviso B trampa */}
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(255,153,68,0.07)",
              border: "1px solid rgba(255,153,68,0.25)",
              borderRadius: 8,
              fontSize: 11,
              color: C.soft,
              lineHeight: 1.7,
            }}
          >
            <span style={{ color: C.orange, fontWeight: 700 }}>⚠ La trampa más común: </span>
            Cuando el precio hace la onda B todos piensan que la caída terminó y compran. Error. <b style={{ color: C.text }}>B es un rebote con poco volumen y no supera el máximo de ⑤.</b> C viene después y es la caída final. No compres en B — espera a que C llegue a su objetivo Fibonacci.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: "ondas", label: "① ② ③ ④ ⑤ vs ABC", sub: "empieza aquí" },
  { id: "step1", label: "↩ Interno", sub: "¿dónde entrar?" },
  { id: "step2", label: "↪ Externo", sub: "¿dónde llega C?" },
  { id: "step3", label: "★ Confluencia", sub: "la clave" },
  { id: "resumen", label: "◈ Resumen", sub: "cheat sheet" },
] as const;

export default function Page() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("ondas");

  return (
    <div
      className="fibo-page"
      style={{
        minHeight: "100vh",
        background: C.bg,
        color: C.text,
        fontFamily: "'IBM Plex Mono', monospace",
        padding: "24px 20px",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: C.muted, fontSize: 10, letterSpacing: 3, marginBottom: 6 }}>MINER · CAP. 5 · VERSIÓN SIMPLIFICADA</div>
          <h1 style={{ margin: "0 0 6px", fontSize: 20, color: "#e8f0ff", fontWeight: 700 }}>Fibonacci explicado sin complicaciones</h1>
          <p style={{ margin: 0, color: C.muted, fontSize: 11 }}>Solo 3 preguntas: ¿dónde entrar? · ¿dónde llega C? · ¿dónde termina ⑤?</p>
        </div>

        {/* TABS */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 16,
            background: "rgba(255,255,255,0.025)",
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: 4,
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'IBM Plex Mono', monospace",
                transition: "all 0.2s",
                background: tab === t.id ? "rgba(85,153,255,0.15)" : "transparent",
                color: tab === t.id ? C.blue : C.muted,
                boxShadow: tab === t.id ? "inset 0 0 0 1px rgba(85,153,255,0.4)" : "none",
                lineHeight: 1.4,
              }}
            >
              <div>{t.label}</div>
              <div style={{ fontSize: 9, fontWeight: 400, opacity: 0.75 }}>{t.sub}</div>
            </button>
          ))}
        </div>

        {/* PANEL */}
        <div
          style={{
            background: C.panel,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "18px",
            marginBottom: 14,
          }}
        >
          {tab === "ondas" && <OndasVsABC />}
          {tab === "step1" && <Step1 />}
          {tab === "step2" && <Step2 />}
          {tab === "step3" && <Step3 />}
          {tab === "resumen" && <Resumen />}
        </div>

        {/* PIE */}
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 6,
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${C.border}`,
            fontSize: 10,
            color: C.muted,
            textAlign: "center",
            lineHeight: 1.8,
          }}
        >
          <span style={{ color: C.green }}>INTERNO</span> = dónde retrocede dentro del movimiento (zonas de entrada) · <span style={{ color: C.orange }}>EXTERNO</span> = hasta dónde se extiende (objetivos de C y ⑤) · <span style={{ color: C.purple }}>CONFLUENCIA</span> = cuando ambos coinciden → máxima probabilidad
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

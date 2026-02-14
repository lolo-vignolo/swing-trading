"use client";
import { useState } from "react";

// Define BadgeProps interface
interface BadgeProps {
  color: string;
  children: React.ReactNode;
  size?: number;
}

const C = {
  bg:     "#030712",
  panel:  "rgba(5,12,26,0.98)",
  border: "rgba(255,255,255,0.07)",
  green:  "#00e5a0",
  gold:   "#f0c040",
  red:    "#ff4d6a",
  blue:   "#4d9fff",
  orange: "#ff9944",
  purple: "#bb88ff",
  teal:   "#00d4cc",
  text:   "#ddeeff",
  muted:  "#3a5a7a",
  soft:   "#7a9ab8",
  price:  "#00e5a0",
  time:   "#4d9fff",
  mom:    "#bb88ff",
};

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function Badge({ color, children, size = 9 }: BadgeProps) {
  return (
    <span style={{
      background: `${color}18`,
      border: `1px solid ${color}45`,
      borderRadius: 4,
      padding: "2px 8px",
      color,
      fontSize: size,
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: 0.8,
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

interface CardProps {
  color?: string;
  title?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function Card({ color = C.blue, title, children, style = {} }: CardProps) {
  return (
    <div style={{
      background: `${color}07`,
      border: `1px solid ${color}25`,
      borderRadius: 8,
      padding: "14px 14px",
      ...style,
    }}>
      {title && <div style={{ color, fontSize: 9, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>{title}</div>}
      {children}
    </div>
  );
}

interface InfoBoxProps {
  color?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function InfoBox({ color = C.blue, icon, children }: InfoBoxProps) {
  return (
    <div style={{
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      padding: "11px 14px",
      borderRadius: 8,
      background: `${color}07`,
      border: `1px solid ${color}22`,
    }}>
      {icon && <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{icon}</span>}
      <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 – LA PREGUNTA CORRECTA
// ─────────────────────────────────────────────────────────────────────────────
function TabPregunta() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* La pregunta */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
      }}>
        <div style={{
          padding: "20px", borderRadius: 10,
          background: "rgba(255,77,106,0.06)", border: "1px solid rgba(255,77,106,0.2)",
        }}>
          <div style={{ color: C.red, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            LO QUE HACEN LA MAYORÍA
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 10 }}>
            ¿A qué precio<br/>girará el mercado?
          </div>
          <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.8 }}>
            Solo miran el precio. Ponen los niveles Fibonacci de precio y esperan
            a que el precio llegue. Cuando llega, entran… y a veces el mercado
            sigue cayendo otro 20% más.
          </div>
          <div style={{ marginTop: 12, padding: "8px 10px", borderRadius: 6,
            background: "rgba(255,77,106,0.08)", border: "1px solid rgba(255,77,106,0.2)",
            color: C.red, fontSize: 9, fontWeight: 700 }}>
            ✕ Falta el cuándo → errores de timing
          </div>
        </div>

        <div style={{
          padding: "20px", borderRadius: 10,
          background: "rgba(0,229,160,0.06)", border: "1px solid rgba(0,229,160,0.2)",
        }}>
          <div style={{ color: C.green, fontSize: 10, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            LO QUE HACE MINER
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 10 }}>
            ¿Cuándo Y a qué<br/>precio girará?
          </div>
          <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.8 }}>
            Combina <b style={{ color: C.price }}>Fibonacci de precio</b> (eje vertical)
            con <b style={{ color: C.time }}>Fibonacci de tiempo</b> (eje horizontal).
            Solo actúa cuando ambos coinciden Y el momentum confirma.
          </div>
          <div style={{ marginTop: 12, padding: "8px 10px", borderRadius: 6,
            background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)",
            color: C.green, fontSize: 9, fontWeight: 700 }}>
            ✓ Precio + Tiempo + Momentum = alta probabilidad
          </div>
        </div>
      </div>

      {/* Los 3 pilares */}
      <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2, marginTop: 4 }}>LOS 3 PILARES DEL MÉTODO</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          {
            num: "01", color: C.price, label: "PRECIO",
            title: "¿Dónde?",
            desc: "Fibonacci aplicado al eje vertical. Te dice en qué nivel de precio es probable el giro. Ej: retroceso del 61.8%.",
            icon: "⬆",
            tools: "Retrocesos internos (38.2–61.8%) · Proyecciones externas (100–161.8%)",
          },
          {
            num: "02", color: C.time, label: "TIEMPO",
            title: "¿Cuándo?",
            desc: "Fibonacci aplicado al eje horizontal. Te dice en qué barra o día es probable el giro. Ej: al 61.8% del tiempo del impulso.",
            icon: "⏱",
            tools: "Time Retracements · Time Projections · Time Clusters",
          },
          {
            num: "03", color: C.mom, label: "MOMENTUM",
            title: "¿Ahora?",
            desc: "El oscilador que confirma que el giro ya está ocurriendo. No entras hasta que gira. Es el gatillo de la operación.",
            icon: "⚡",
            tools: "MM30 en 30m (dirección) · MACD en 3m (gatillo)",
          },
        ].map((p, i) => (
          <div key={i} style={{
            padding: "14px", borderRadius: 8,
            background: `${p.color}08`, border: `1px solid ${p.color}25`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${p.color}18`, border: `1px solid ${p.color}45`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16,
              }}>{p.icon}</div>
              <span style={{ color: p.color, fontSize: 22, fontWeight: 800, opacity: 0.2 }}>{p.num}</span>
            </div>
            <Badge color={p.color}>{p.label}</Badge>
            <div style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: "8px 0 6px" }}>{p.title}</div>
            <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.7, marginBottom: 10 }}>{p.desc}</div>
            <div style={{
              fontSize: 9, color: p.color, lineHeight: 1.6,
              background: `${p.color}0a`, borderRadius: 4, padding: "6px 8px",
              border: `1px solid ${p.color}18`,
            }}>{p.tools}</div>
          </div>
        ))}
      </div>

      {/* Flujo de decisión */}
      <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2 }}>FLUJO DE DECISIÓN</div>
      <div style={{ display: "flex", alignItems: "center", gap: 0, overflowX: "auto" }}>
        {[
          { label: "Price Cluster", sub: "Precio en zona Fib", color: C.price, icon: "⬆" },
          { arrow: "→" },
          { label: "Time Cluster", sub: "Ventana temporal activa", color: C.time, icon: "⏱" },
          { arrow: "→" },
          { label: "ALERTA SETUP", sub: "Precio + Tiempo coinciden", color: C.gold, icon: "⚠" },
          { arrow: "→" },
          { label: "Momentum gira", sub: "MACD cruza / MM30 confirma", color: C.mom, icon: "⚡" },
          { arrow: "→" },
          { label: "ENTRADA", sub: "El gatillo se activa", color: C.green, icon: "✓" },
        ].map((s, i) => s.arrow ? (
          <div key={i} style={{ color: C.muted, fontSize: 18, padding: "0 6px", flexShrink: 0 }}>→</div>
        ) : (
          <div key={i} style={{
            padding: "10px 12px", borderRadius: 7, flexShrink: 0,
            background: `${s.color}10`, border: `1px solid ${s.color}35`,
            textAlign: "center", minWidth: 110,
          }}>
            <div style={{ fontSize: 14, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 9, fontWeight: 700 }}>{s.label}</div>
            <div style={{ color: C.muted, fontSize: 8, marginTop: 3, lineHeight: 1.4 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 – FIBONACCI DE PRECIO (configuración)
// ─────────────────────────────────────────────────────────────────────────────
function TabFibPrecio() {
  const [modo, setModo] = useState("interno");

  // Chart interno: sube de y=230 a y=40, luego retrocede
  const py0 = 230, py1 = 42, pRange = py0 - py1;
  const interno = [
    { pct: 0.236, color: "#aabbcc", label: "23.6%", uso: "Mínimo retroceso — tendencia muy fuerte", cuando: "Correcciones de ② en mercados muy alcistas" },
    { pct: 0.382, color: C.green,   label: "38.2%", uso: "Corrección normal — tendencia fuerte",    cuando: "Ondas ② y ④ típicas. Primera zona de entrada." },
    { pct: 0.500, color: C.blue,    label: "50.0%", uso: "Retroceso medio — nivel psicológico",     cuando: "Muy respetado. Si rompe el 38.2% busca el 50%." },
    { pct: 0.618, color: C.gold,    label: "61.8%", uso: "Máximo retroceso sano — número áureo",    cuando: "Última defensa de la tendencia. Clave de Miner." },
    { pct: 0.786, color: C.orange,  label: "78.6%", uso: "Peligro — corrección profunda",           cuando: "Si llega aquí la onda ② → ojo con la superposición." },
    { pct: 1.000, color: C.red,     label: "100%",  uso: "Tendencia muerta — cambio de estructura", cuando: "Si rompe el 100% → la onda ya no es válida." },
  ];
  const externo = [
    { pct: 1.000, color: C.gold,   label: "100%",   uso: "C = A en tamaño — más frecuente",       cuando: "La onda C iguala a A. Primera zona de giro." },
    { pct: 1.272, color: C.orange, label: "127.2%", uso: "C > A — mercado débil",                  cuando: "Extensión frecuente. Busca confluencia con soporte." },
    { pct: 1.618, color: C.red,    label: "161.8%", uso: "C >> A — mercado muy débil",             cuando: "Extensión extrema. Pánico o capitulación." },
    { pct: 2.000, color: "#990022",label: "200%",   uso: "Extensión máxima",                       cuando: "Raro. Mercados en caída libre." },
  ];

  const [hovPrc, setHovPrc] = useState<number | null>(null);
  const [hovExt, setHovExt] = useState<number | null>(null);

  const internalLevels = interno;
  const externalLevels = externo;

  // Retroceso real al 61.8%
  const retY = py1 + pRange * 0.618;
  const retX = 200;

  // Para externo: A baja de sy=50 a ay=180, B sube a by=100
  const sx=40,sy=52, ax=160,ay=185, bx=240,by=100;
  const aRange = ay - sy;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <InfoBox color={C.price} icon="⬆">
        <b style={{color:C.price}}>Fibonacci de Precio</b> se aplica al eje vertical del gráfico.
        Hay dos usos: <b style={{color:C.text}}>Retroceso Interno</b> (cuánto retrocede dentro de una onda, para entrar)
        y <b style={{color:C.text}}>Proyección Externa</b> (cuánto se extiende más allá, para estimar objetivos).
      </InfoBox>

      {/* Toggle */}
      <div style={{ display: "flex", gap: 6 }}>
        {[
          { id: "interno", label: "↩ Retroceso Interno", sub: "ondas 2, 4, B → zonas de entrada", color: C.green },
          { id: "externo", label: "↪ Proyección Externa", sub: "onda C y ⑤ → objetivos de precio", color: C.orange },
        ].map(opt => (
          <button key={opt.id} onClick={() => setModo(opt.id)} style={{
            padding: "9px 18px", borderRadius: 7, border: "none", cursor: "pointer",
            fontSize: 10, fontFamily: "monospace", fontWeight: 700,
            background: modo === opt.id ? `${opt.color}15` : "rgba(255,255,255,0.03)",
            color: modo === opt.id ? opt.color : C.muted,
            boxShadow: modo === opt.id ? `inset 0 0 0 1px ${opt.color}50` : "none",
          }}>
            {opt.label}
            <div style={{ fontSize: 8, fontWeight: 400, opacity: 0.7, marginTop: 2 }}>{opt.sub}</div>
          </button>
        ))}
      </div>

      {modo === "interno" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* Gráfico interno */}
          <div>
            <div style={{ color: C.muted, fontSize: 8, letterSpacing: 2, marginBottom: 6 }}>EJEMPLO: precio sube 100€→200€, luego corrige</div>
            <svg viewBox="0 0 320 270" width="100%" style={{display:"block",
              background:"rgba(3,7,18,0.8)", borderRadius:8, border:"1px solid rgba(255,255,255,0.06)"}}>
              <defs>
                <linearGradient id="entryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.green} stopOpacity={0.12}/>
                  <stop offset="100%" stopColor={C.gold} stopOpacity={0.12}/>
                </linearGradient>
              </defs>

              {/* Zona entrada */}
              <rect x={70} y={py1+pRange*0.382} width={185} height={pRange*0.618-pRange*0.382}
                fill="url(#entryGrad)"
                stroke={`${C.green}30`} strokeWidth={1} rx={2}/>
              <text x={162} y={py1+pRange*0.382-5} textAnchor="middle"
                fill={C.green} fontSize={7.5} fontFamily="monospace">ZONA DE ENTRADA ÓPTIMA</text>

              {/* Niveles */}
              {internalLevels.map((f, i) => {
                const fy = py1 + pRange * f.pct;
                if (fy > 248) return null;
                const hov = hovPrc === i;
                return (
                  <g key={i} style={{cursor:"pointer"}}
                    onMouseEnter={() => setHovPrc(i)}
                    onMouseLeave={() => setHovPrc(null)}>
                    <rect x={10} y={fy-10} width={290} height={20} fill={hov?`${f.color}0c`:"transparent"} rx={2}/>
                    <line x1={70} y1={fy} x2={255} y2={fy}
                      stroke={f.color} strokeWidth={hov?2:1}
                      strokeDasharray={hov?"none":"6 4"} opacity={hov?1:0.6}/>
                    <text x={62} y={fy+4} textAnchor="end"
                      fill={f.color} fontSize={8} fontFamily="monospace">
                      {Math.round(200 - (200-100)*f.pct)}€
                    </text>
                    <rect x={257} y={fy-9} width={40} height={16} rx={3}
                      fill={`${f.color}20`} stroke={`${f.color}55`} strokeWidth={1}/>
                    <text x={277} y={fy+4} textAnchor="middle"
                      fill={f.color} fontSize={8} fontFamily="monospace" fontWeight="700">{f.label}</text>
                  </g>
                );
              })}

              {/* Impulso */}
              <line x1={80} y1={py0} x2={80} y2={py1}
                stroke={C.green} strokeWidth={3} strokeLinecap="round"/>
              <polygon points={`80,${py1} 74,${py1+14} 86,${py1+14}`} fill={C.green}/>
              <text x={80} y={py0+14} textAnchor="middle" fill={C.green} fontSize={8} fontFamily="monospace" fontWeight="700">100€</text>
              <text x={80} y={py1-8} textAnchor="middle" fill={C.green} fontSize={8} fontFamily="monospace" fontWeight="700">200€</text>

              {/* Retroceso */}
              <line x1={80} y1={py1} x2={retX} y2={retY}
                stroke={C.gold} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="7 3"/>
              <circle cx={retX} cy={retY} r={6}
                fill="rgba(3,7,18,0.9)" stroke={C.gold} strokeWidth={2}/>
              <text x={retX+12} y={retY+4} fill={C.gold} fontSize={9} fontFamily="monospace" fontWeight="700">138€</text>
              <text x={retX+12} y={retY+15} fill={C.gold} fontSize={7.5} fontFamily="monospace">61.8% → entrada</text>

              {/* Rebote */}
              <line x1={retX} y1={retY} x2={270} y2={retY - 50}
                stroke={C.green} strokeWidth={2} strokeLinecap="round" strokeDasharray="5 3"/>
              <polygon points={`270,${retY-52} 264,${retY-38} 276,${retY-38}`} fill={C.green}/>
            </svg>
          </div>

          {/* Lista niveles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ color: C.muted, fontSize: 8, letterSpacing: 2, marginBottom: 2 }}>
              PASA EL CURSOR SOBRE CADA NIVEL →
            </div>
            {internalLevels.map((f, i) => (
              <div key={i}
                onMouseEnter={() => setHovPrc(i)}
                onMouseLeave={() => setHovPrc(null)}
                style={{
                  padding: "9px 12px", borderRadius: 6, cursor: "pointer",
                  background: hovPrc===i ? `${f.color}12` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hovPrc===i ? f.color+"40" : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.15s",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:f.color,flexShrink:0}}/>
                  <span style={{color:f.color, fontWeight:700, fontSize:11, width:44}}>{f.label}</span>
                  <span style={{color:C.soft, fontSize:10}}>{f.uso}</span>
                </div>
                {hovPrc===i && (
                  <div style={{color:C.muted, fontSize:9, paddingLeft:16, lineHeight:1.6}}>
                    → {f.cuando}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {modo === "externo" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {/* Gráfico externo */}
          <div>
            <div style={{ color: C.muted, fontSize: 8, letterSpacing: 2, marginBottom: 6 }}>
              EJEMPLO: Onda A baja 100px, proyectamos C desde B
            </div>
            <svg viewBox="0 0 340 280" width="100%" style={{display:"block",
              background:"rgba(3,7,18,0.8)", borderRadius:8, border:"1px solid rgba(255,255,255,0.06)"}}>

              {/* Medida A */}
              <line x1={sx-16} y1={sy} x2={sx-16} y2={ay}
                stroke={C.red} strokeWidth={1}/>
              <line x1={sx-21} y1={sy} x2={sx-11} y2={sy} stroke={C.red} strokeWidth={1}/>
              <line x1={sx-21} y1={ay} x2={sx-11} y2={ay} stroke={C.red} strokeWidth={1}/>
              <text x={sx-22} y={(sy+ay)/2+4} textAnchor="middle"
                fill={C.red} fontSize={7.5} fontFamily="monospace"
                transform={`rotate(-90,${sx-22},${(sy+ay)/2})`}>MIDE A</text>

              {/* Proyección externa desde B */}
              {externalLevels.map((f, i) => {
                const fy = by + aRange * f.pct;
                if (fy > 270) return null;
                const hov = hovExt === i;
                return (
                  <g key={i} style={{cursor:"pointer"}}
                    onMouseEnter={() => setHovExt(i)}
                    onMouseLeave={() => setHovExt(null)}>
                    <line x1={bx} y1={fy} x2={310} y2={fy}
                      stroke={f.color} strokeWidth={hov?1.8:1}
                      strokeDasharray="6 4" opacity={hov?1:0.65}/>
                    <rect x={312} y={fy-9} width={44} height={16} rx={3}
                      fill={`${f.color}20`} stroke={`${f.color}55`} strokeWidth={1}/>
                    <text x={334} y={fy+4} textAnchor="middle"
                      fill={f.color} fontSize={8} fontFamily="monospace" fontWeight="700">{f.label}</text>
                  </g>
                );
              })}

              {/* Proyección desde B hacia abajo (la C) */}
              <line x1={bx-14} y1={by} x2={bx-14} y2={by+aRange}
                stroke={C.orange} strokeWidth={1} strokeDasharray="4 3" opacity={0.6}/>
              <text x={bx-18} y={by+aRange/2+4} textAnchor="middle"
                fill={C.orange} fontSize={7.5} fontFamily="monospace"
                transform={`rotate(-90,${bx-18},${by+aRange/2})`}>proyección desde B</text>

              {/* Onda A */}
              <circle cx={sx} cy={sy} r={5} fill={C.red}/>
              <text x={sx+8} y={sy+4} fill={C.red} fontSize={8} fontFamily="monospace">inicio</text>
              <line x1={sx} y1={sy} x2={ax} y2={ay}
                stroke={C.red} strokeWidth={3} strokeLinecap="round"/>
              <circle cx={ax} cy={ay} r={5} fill={C.red}/>
              <text x={ax+8} y={ay+4} fill={C.red} fontSize={14} fontFamily="monospace" fontWeight="700">A</text>

              {/* Onda B */}
              <line x1={ax} y1={ay} x2={bx} y2={by}
                stroke={C.gold} strokeWidth={2.5} strokeLinecap="round"/>
              <circle cx={bx} cy={by} r={5} fill={C.gold}/>
              <text x={bx+8} y={by+4} fill={C.gold} fontSize={14} fontFamily="monospace" fontWeight="700">B</text>
              <text x={bx+8} y={by+17} fill={C.gold} fontSize={7.5} fontFamily="monospace">⚠ trampa</text>

              {/* Onda C hasta 127.2% */}
              <line x1={bx} y1={by} x2={260} y2={by+aRange*1.272}
                stroke={C.red} strokeWidth={2.5} strokeLinecap="round" strokeDasharray="7 3"/>
              <circle cx={260} cy={by+aRange*1.272} r={7}
                fill="rgba(3,7,18,0.95)" stroke={C.orange} strokeWidth={2.5}/>
              <text x={260} y={by+aRange*1.272+4} textAnchor="middle"
                fill={C.orange} fontSize={10} fontFamily="monospace" fontWeight="700">C</text>
              <text x={268} y={by+aRange*1.272+18}
                fill={C.orange} fontSize={7.5} fontFamily="monospace">127.2% → objetivo</text>
            </svg>
          </div>

          {/* Lista niveles externos */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ color: C.muted, fontSize: 8, letterSpacing: 2, marginBottom: 2 }}>
              PROYECCIONES EXTERNAS — OBJETIVOS DE C Y ⑤
            </div>
            {externalLevels.map((f, i) => (
              <div key={i}
                onMouseEnter={() => setHovExt(i)}
                onMouseLeave={() => setHovExt(null)}
                style={{
                  padding: "10px 12px", borderRadius: 6, cursor: "pointer",
                  background: hovExt===i ? `${f.color}12` : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hovExt===i ? f.color+"40" : "rgba(255,255,255,0.06)"}`,
                  transition: "all 0.15s",
                }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:f.color,flexShrink:0}}/>
                  <span style={{color:f.color, fontWeight:700, fontSize:11, width:48}}>{f.label}</span>
                  <span style={{color:C.soft, fontSize:10}}>{f.uso}</span>
                </div>
                {hovExt===i && (
                  <div style={{color:C.muted, fontSize:9, paddingLeft:16, lineHeight:1.6}}>
                    → {f.cuando}
                  </div>
                )}
              </div>
            ))}

            <InfoBox color={C.purple} icon="💡">
              <b style={{color:C.purple}}>Truco: </b>
              Si la proyección externa (ej. 127.2%) cae en el mismo precio que
              el retroceso interno del movimiento mayor (ej. 61.8%) →
              <b style={{color:C.text}}> Confluencia de precio</b>. Máxima probabilidad.
            </InfoBox>
          </div>
        </div>
      )}

      {/* Configuración */}
      <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2, marginTop: 4 }}>⚙ CÓMO CONFIGURAR LOS FIBONACCI EN TU PLATAFORMA</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Card color={C.green} title="FIBONACCI INTERNO">
          <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.8 }}>
            1. Selecciona la herramienta <b style={{color:C.text}}>Fibonacci Retroceso</b><br/>
            2. Clic en el <b style={{color:C.text}}>inicio del movimiento</b> (mínimo de la onda)<br/>
            3. Clic en el <b style={{color:C.text}}>fin del movimiento</b> (máximo de la onda)<br/>
            4. Los niveles se trazan automáticamente hacia abajo<br/>
            <br/>
            <b style={{color:C.green}}>Niveles a activar:</b> 23.6 · 38.2 · 50 · 61.8 · 78.6 · 100
          </div>
        </Card>
        <Card color={C.orange} title="FIBONACCI EXTERNO (proyección)">
          <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.8 }}>
            1. Selecciona <b style={{color:C.text}}>Fibonacci Extension</b> o <b style={{color:C.text}}>Proyección</b><br/>
            2. Clic en el <b style={{color:C.text}}>inicio de A</b><br/>
            3. Clic en el <b style={{color:C.text}}>fin de A</b> (máximo retroceso)<br/>
            4. Clic en el <b style={{color:C.text}}>inicio de C</b> (punto B)<br/>
            5. Los objetivos se proyectan desde B<br/>
            <br/>
            <b style={{color:C.orange}}>Niveles a activar:</b> 100 · 127.2 · 161.8 · 200
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 – FIBONACCI DE TIEMPO
// ─────────────────────────────────────────────────────────────────────────────
function TabFibTiempo() {
  const [tipo, setTipo] = useState("retrac");

  // Barras del gráfico de precio base
  const bars = 52;
  const W = 560, H = 200;

  // Precio base para visualización (onda 1 + corrección onda 2)
  function wavePts(scenario: string) {
    if (scenario === "retrac") {
      // Impulso dura 20 barras (0→20), luego corrección
      // Retrocesos temporales al 38.2%=7.6, 61.8%=12.4, 100%=20 desde barra 20
      const pts = [];
      for (let i = 0; i <= 20; i++) pts.push({ x: i, y: 180 - i * 7 });
      for (let i = 21; i <= 42; i++) pts.push({ x: i, y: pts[20].y + (i-20)*3.5 });
      return pts;
    } else {
      // Onda 1 dura 15 barras. Onda 2 = 8 barras. Onda 3 proyectada.
      const pts = [];
      for (let i = 0; i <= 15; i++) pts.push({ x: i, y: 175 - i*8 });
      for (let i = 16; i <= 24; i++) pts.push({ x: i, y: pts[15].y + (i-15)*5 });
      for (let i = 25; i <= 46; i++) pts.push({ x: i, y: pts[24].y - (i-24)*8 });
      return pts;
    }
  }

  const pts = wavePts(tipo);
  const scaleX = (x: number) => 20 + x * (W - 40) / bars;
  const scaleY = (y: number) => Math.max(10, Math.min(H - 10, y));

  const pathD = pts.map((p,i) => `${i===0?"M":"L"}${scaleX(p.x)},${scaleY(p.y)}`).join(" ");

  // Para retracción: impulso 0→20, corrección desde 20
  const impulseEnd = tipo === "retrac" ? 20 : 15;
  const impulseLen = impulseEnd; // barras

  const retracLevels = [
    { pct: 0.382, color: C.green, label: "38.2%" },
    { pct: 0.500, color: C.blue, label: "50%" },
    { pct: 0.618, color: C.gold, label: "61.8%" },
    { pct: 1.000, color: C.orange, label: "100%" },
  ];
  const projLevels = [
    { pct: 0.618, color: C.green, label: "61.8% de ①" },
    { pct: 1.000, color: C.gold, label: "100% de ①" },
    { pct: 1.618, color: C.orange, label: "161.8% de ①" },
  ];

  const levels = tipo === "retrac" ? retracLevels : projLevels;
  const fromBar = tipo === "retrac" ? impulseEnd : 24; // desde donde proyectamos

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <InfoBox color={C.time} icon="⏱">
        <b style={{color:C.time}}>Fibonacci de Tiempo</b> se aplica al eje <b style={{color:C.text}}>horizontal</b> del gráfico.
        En lugar de niveles de precio, creas <b style={{color:C.text}}>ventanas temporales</b> donde es probable que ocurra el giro.
        Son líneas verticales, no horizontales.
      </InfoBox>

      {/* Toggle */}
      <div style={{ display: "flex", gap: 6 }}>
        {[
          { id: "retrac", label: "↩ Retracción de Tiempo", sub: "¿cuándo termina la corrección?", color: C.gold },
          { id: "proyec", label: "↪ Proyección de Tiempo", sub: "¿cuándo termina la próxima onda?", color: C.blue },
        ].map(opt => (
          <button key={opt.id} onClick={() => setTipo(opt.id)} style={{
            padding: "9px 18px", borderRadius: 7, border: "none", cursor: "pointer",
            fontSize: 10, fontFamily: "monospace", fontWeight: 700,
            background: tipo === opt.id ? `${opt.color}15` : "rgba(255,255,255,0.03)",
            color: tipo === opt.id ? opt.color : C.muted,
            boxShadow: tipo === opt.id ? `inset 0 0 0 1px ${opt.color}50` : "none",
          }}>
            {opt.label}
            <div style={{ fontSize: 8, fontWeight: 400, opacity: 0.7, marginTop: 2 }}>{opt.sub}</div>
          </button>
        ))}
      </div>

      {/* Ejemplo práctico en texto */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Card color={C.time} title={tipo==="retrac" ? "RETRACCIÓN DE TIEMPO — CÓMO SE CALCULA" : "PROYECCIÓN DE TIEMPO — CÓMO SE CALCULA"}>
          <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.85 }}>
            {tipo === "retrac" ? <>
              <b style={{color:C.text}}>1. Mide el tiempo del impulso previo</b><br/>
              Ej: La onda ① duró <b style={{color:C.gold}}>20 barras</b> (de lunes a viernes siguiente)<br/><br/>
              <b style={{color:C.text}}>2. Desde el fin del impulso, proyecta hacia adelante:</b><br/>
              • 38.2% de 20 = <b style={{color:C.green}}>7.6 barras</b> → barra 27–28<br/>
              • 61.8% de 20 = <b style={{color:C.gold}}>12.4 barras</b> → barra 32–33<br/>
              • 100% de 20 = <b style={{color:C.orange}}>20 barras</b> → barra 40<br/><br/>
              <b style={{color:C.text}}>3. Esas son tus ventanas temporales.</b><br/>
              Cuando el precio llega a una zona de precio Fibonacci
              EN UNA de esas barras → setup activo.
            </> : <>
              <b style={{color:C.text}}>1. Mide el tiempo de la onda de referencia</b><br/>
              Ej: La onda ① duró <b style={{color:C.gold}}>15 barras</b><br/><br/>
              <b style={{color:C.text}}>2. Desde el inicio de la nueva onda, proyecta:</b><br/>
              • 61.8% de 15 = <b style={{color:C.green}}>9.3 barras</b> → onda corta<br/>
              • 100% de 15 = <b style={{color:C.gold}}>15 barras</b> → misma duración<br/>
              • 161.8% de 15 = <b style={{color:C.orange}}>24.3 barras</b> → onda ③ larga (típico)<br/><br/>
              <b style={{color:C.text}}>3. Proyecta desde el inicio de ③ para estimar</b><br/>
              cuándo puede terminar ③. Ahí buscas el setup de salida.
            </>}
          </div>
        </Card>
        <Card color={C.blue} title="CÓMO CONFIGURAR EN TU PLATAFORMA">
          <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.85 }}>
            <b style={{color:C.text}}>En TradingView / MT4 / Sierra Chart:</b><br/><br/>
            1. Busca la herramienta <b style={{color:C.text}}>Fibonacci Time Zones</b><br/>
            2. Clic en el <b style={{color:C.text}}>inicio del movimiento</b> (primera barra)<br/>
            3. Clic en el <b style={{color:C.text}}>fin del movimiento</b> (última barra)<br/>
            4. Las líneas verticales aparecen automáticamente<br/><br/>
            <b style={{color:C.text}}>Niveles a activar:</b><br/>
            <span style={{color:C.green}}>0.382</span> · <span style={{color:C.blue}}>0.5</span> · <span style={{color:C.gold}}>0.618</span> · <span style={{color:C.orange}}>1.0</span> · <span style={{color:C.red}}>1.618</span><br/><br/>
            <b style={{color:C.gold}}>💡 Truco de Miner:</b> El tiempo de Fibonacci
            se aplica igual en <b style={{color:C.text}}>cualquier timeframe</b>:
            en el gráfico de 30m mides barras de 30m,
            en el de 3m mides barras de 3m.
          </div>
        </Card>
      </div>

      {/* Gráfico visual */}
      <div style={{ color: C.muted, fontSize: 8, letterSpacing: 2 }}>
        {tipo === "retrac"
          ? "VISUALIZACIÓN: IMPULSO DE 20 BARRAS → RETROCESOS TEMPORALES DE LA CORRECCIÓN"
          : "VISUALIZACIÓN: ONDA ① DE 15 BARRAS → PROYECCIÓN DE DURACIÓN DE ONDA ③"}
      </div>
      <div style={{ background: "rgba(3,7,18,0.8)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: "12px 8px 8px" }}>
        <svg viewBox={`0 0 ${W} ${H+50}`} width="100%" style={{display:"block"}}>
          {/* Grid H */}
          {[40,80,120,160].map(y => (
            <line key={y} x1={20} y1={y} x2={W-10} y2={y}
              stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
          ))}

          {/* Barra de tiempo abajo */}
          <line x1={20} y1={H} x2={W-10} y2={H}
            stroke="rgba(255,255,255,0.1)" strokeWidth={1}/>
          {/* Marcas de barra */}
          {Array.from({length: bars+1}, (_,i) => i % 5 === 0 ? (
            <g key={i}>
              <line x1={scaleX(i)} y1={H} x2={scaleX(i)} y2={H+5}
                stroke="rgba(255,255,255,0.2)" strokeWidth={1}/>
              <text x={scaleX(i)} y={H+15} textAnchor="middle"
                fill={C.muted} fontSize={7} fontFamily="monospace">{i}</text>
            </g>
          ) : null)}
          <text x={W/2} y={H+28} textAnchor="middle"
            fill={C.muted} fontSize={8} fontFamily="monospace" letterSpacing={1}>BARRAS →</text>

          {/* Línea impulso */}
          <line x1={scaleX(0)} y1={H} x2={scaleX(0)} y2={H-8}
            stroke={C.green} strokeWidth={1.5}/>
          <text x={scaleX(0)} y={H+14} textAnchor="middle"
            fill={C.green} fontSize={7.5} fontFamily="monospace" fontWeight="700">
            {tipo==="retrac"?"inicio ①":"inicio ①"}
          </text>

          {/* Fin impulso */}
          <line x1={scaleX(impulseEnd)} y1={H+2} x2={scaleX(impulseEnd)} y2={H-8}
            stroke={C.green} strokeWidth={1.5}/>
          <text x={scaleX(impulseEnd)} y={H+14} textAnchor="middle"
            fill={C.green} fontSize={7.5} fontFamily="monospace" fontWeight="700">
            {tipo==="retrac"?"fin ①":"fin ②"}
          </text>

          {/* Flechas de duración */}
          <line x1={scaleX(0)} y1={H-4} x2={scaleX(impulseEnd)} y2={H-4}
            stroke={C.green} strokeWidth={1.5}/>
          <text x={scaleX(impulseEnd/2)} y={H-8} textAnchor="middle"
            fill={C.green} fontSize={7} fontFamily="monospace">
            {tipo==="retrac" ? "20 barras (referencia)" : "15 barras (onda ①)"}
          </text>

          {/* Líneas verticales temporales */}
          {levels.map((l, i) => {
            const barPos = fromBar + impulseLen * l.pct;
            const lx = scaleX(barPos);
            return (
              <g key={i}>
                <line x1={lx} y1={10} x2={lx} y2={H+2}
                  stroke={l.color} strokeWidth={1.5}
                  strokeDasharray="6 4" opacity={0.8}/>
                <rect x={lx-22} y={H-22} width={44} height={16} rx={3}
                  fill={`${l.color}22`} stroke={`${l.color}55`} strokeWidth={1}/>
                <text x={lx} y={H-11} textAnchor="middle"
                  fill={l.color} fontSize={7.5} fontFamily="monospace" fontWeight="700">
                  {l.label}
                </text>
                <text x={lx} y={H+14} textAnchor="middle"
                  fill={l.color} fontSize={7} fontFamily="monospace">
                  barra {Math.round(barPos)}
                </text>
              </g>
            );
          })}

          {/* Precio */}
          <path d={pathD} fill="none" stroke={C.green} strokeWidth={2.5} strokeLinejoin="round"/>

          {/* Zona de impulso sombreada */}
          <rect x={scaleX(0)} y={10} width={scaleX(impulseEnd)-scaleX(0)} height={H-10}
            fill="rgba(0,229,160,0.04)" stroke="rgba(0,229,160,0.1)" strokeWidth={1} rx={2}/>
          <text x={(scaleX(0)+scaleX(impulseEnd))/2} y={22}
            textAnchor="middle" fill="rgba(0,229,160,0.35)"
            fontSize={8} fontFamily="monospace" letterSpacing={1}>
            {tipo==="retrac" ? "IMPULSO ①" : "①+②"}
          </text>

          {/* Zona proyección */}
          {tipo === "retrac" && (
            <rect x={scaleX(fromBar)} y={10} width={scaleX(fromBar+impulseLen*1.0)-scaleX(fromBar)} height={H-10}
              fill="rgba(77,159,255,0.04)" stroke="rgba(77,159,255,0.08)" strokeWidth={1} rx={2}/>
          )}
          {tipo === "proyec" && (
            <rect x={scaleX(fromBar)} y={10} width={scaleX(fromBar+impulseLen*1.618)-scaleX(fromBar)} height={H-10}
              fill="rgba(77,159,255,0.04)" stroke="rgba(77,159,255,0.08)" strokeWidth={1} rx={2}/>
          )}
        </svg>
      </div>

      <InfoBox color={C.gold} icon="📌">
        <b style={{color:C.gold}}>Recuerda: </b>
        Las líneas verticales de tiempo no te dicen <i>qué precio</i> habrá, sino <i>cuándo</i> hay más probabilidad de giro.
        Combinadas con los niveles de precio Fibonacci crean el <b style={{color:C.text}}>setup de alta probabilidad</b>.
        Si el precio llega a una zona de precio Y estás en una ventana temporal → máxima atención.
      </InfoBox>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 4 – TIME CLUSTER
// ─────────────────────────────────────────────────────────────────────────────
function TabCluster() {
  const [step, setStep] = useState(0);
  const W = 580, H = 190;

  // Escenario: 3 proyecciones de tiempo convergen cerca de la barra 32-34
  const projections = [
    {
      label: "Retracción 61.8% de ①",
      color: C.gold,
      bar: 32.4,
      desc: "① duró 20 barras → 61.8% = 12.4 → desde barra 20 = barra 32.4",
    },
    {
      label: "Proyección 100% de ②",
      color: C.blue,
      bar: 33.5,
      desc: "② duró 8 barras → 100% = 8 → desde inicio de ② en barra 25.5 = 33.5",
    },
    {
      label: "Retracción 50% del impulso mayor",
      color: C.purple,
      bar: 34.2,
      desc: "Movimiento mayor duró 28 barras → 50% = 14 → desde barra 20 = barra 34",
    },
  ];

  // Precio simulado
  const pricePts = [];
  for (let i = 0; i <= 20; i++) pricePts.push({ x: i, y: 175 - i * 7 });
  for (let i = 21; i <= 34; i++) pricePts.push({ x: i, y: pricePts[20].y + (i-20)*3.2 });
  for (let i = 35; i <= 50; i++) pricePts.push({ x: i, y: pricePts[34].y - (i-34)*6 });

  const maxBars = 52;
  const sx = (x:number ) => 20 + x * (W-40) / maxBars;
  const sy = (y:number ) => Math.min(H-10, Math.max(10, y));
  const pathD = pricePts.map((p,i) => `${i===0?"M":"L"}${sx(p.x)},${sy(p.y)}`).join(" ");

  // Zona cluster (barras 32-34.5)
  const clusterX1 = sx(32);
  const clusterX2 = sx(34.5);

  const visibleProjs = projections.slice(0, step + 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <InfoBox color={C.teal} icon="🎯">
        <b style={{color:C.teal}}>Time Cluster</b> = cuando 2 o 3 proyecciones temporales distintas
        caen dentro de un margen de <b style={{color:C.text}}>1 a 3 barras</b>.
        Esa zona es tu <b style={{color:C.text}}>ventana de oportunidad</b> temporal.
        Miner dice: una sola línea de tiempo es una pista; un cluster de 3 es una señal potente.
      </InfoBox>

      {/* Paso a paso */}
      <div>
        <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2, marginBottom: 8 }}>
          CONSTRUYE EL TIME CLUSTER PASO A PASO
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
          {["Añadir proyección 1", "Añadir proyección 2", "Añadir proyección 3"].map((label, i) => (
            <button key={i} onClick={() => setStep(i)} style={{
              padding: "7px 16px", borderRadius: 6, border: "none", cursor: "pointer",
              fontSize: 10, fontFamily: "monospace", fontWeight: 700,
              background: step >= i ? `${projections[i].color}18` : "rgba(255,255,255,0.03)",
              color: step >= i ? projections[i].color : C.muted,
              boxShadow: step >= i ? `inset 0 0 0 1px ${projections[i].color}45` : "none",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* Gráfico */}
      <div style={{ background: "rgba(3,7,18,0.85)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: "10px 8px 8px" }}>
        <svg viewBox={`0 0 ${W} ${H+40}`} width="100%" style={{display:"block"}}>
          {/* Grid */}
          {[40,80,120,160].map(y => (
            <line key={y} x1={20} y1={y} x2={W-10} y2={y}
              stroke="rgba(255,255,255,0.04)" strokeWidth={1}/>
          ))}

          {/* Time axis */}
          <line x1={20} y1={H} x2={W-10} y2={H}
            stroke="rgba(255,255,255,0.1)" strokeWidth={1}/>
          {Array.from({length:maxBars+1},(_,i) => i%5===0 ? (
            <g key={i}>
              <line x1={sx(i)} y1={H} x2={sx(i)} y2={H+4}
                stroke="rgba(255,255,255,0.2)" strokeWidth={1}/>
              <text x={sx(i)} y={H+14} textAnchor="middle"
                fill={C.muted} fontSize={7} fontFamily="monospace">{i}</text>
            </g>
          ) : null)}

          {/* Zona cluster si hay 2+ proyecciones */}
          {step >= 1 && (
            <>
              <rect x={clusterX1} y={8} width={clusterX2-clusterX1} height={H-8}
                fill="rgba(0,212,204,0.1)"
                stroke="rgba(0,212,204,0.45)" strokeWidth={1.5}
                strokeDasharray="5 3" rx={2}/>
              <text x={(clusterX1+clusterX2)/2} y={22}
                textAnchor="middle" fill={C.teal}
                fontSize={step>=2 ? 9 : 8} fontFamily="monospace" fontWeight="700">
                {step >= 2 ? "★ TIME CLUSTER" : "posible cluster"}
              </text>
            </>
          )}

          {/* Proyecciones */}
          {visibleProjs.map((p, i) => (
            <g key={i}>
              <line x1={sx(p.bar)} y1={10} x2={sx(p.bar)} y2={H}
                stroke={p.color} strokeWidth={2}
                strokeDasharray="7 4" opacity={0.9}/>
              <rect x={sx(p.bar)-22} y={H-22} width={44} height={15} rx={3}
                fill={`${p.color}25`} stroke={`${p.color}60`} strokeWidth={1}/>
              <text x={sx(p.bar)} y={H-11} textAnchor="middle"
                fill={p.color} fontSize={7} fontFamily="monospace" fontWeight="700">
                barra {Math.round(p.bar)}
              </text>
            </g>
          ))}

          {/* Precio */}
          <path d={pathD} fill="none" stroke={C.green} strokeWidth={2.5} strokeLinejoin="round"/>

          {/* Rebote en cluster */}
          {step >= 2 && (
            <>
              <circle cx={sx(34)} cy={sy(pricePts[34].y)} r={8}
                fill="rgba(3,7,18,0.9)" stroke={C.teal} strokeWidth={2.5}/>
              <text x={sx(34)+14} y={sy(pricePts[34].y)+4}
                fill={C.teal} fontSize={9} fontFamily="monospace" fontWeight="700">
                GIRO AQUÍ
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Explicación de cada proyección */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {projections.map((p, i) => (
          <div key={i} style={{
            padding: "10px 14px", borderRadius: 7,
            background: step >= i ? `${p.color}08` : "rgba(255,255,255,0.02)",
            border: `1px solid ${step >= i ? p.color+"30" : "rgba(255,255,255,0.05)"}`,
            opacity: step >= i ? 1 : 0.4,
            transition: "all 0.3s",
          }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%",
                background: p.color, flexShrink: 0,
              }}/>
              <span style={{ color: p.color, fontWeight: 700, fontSize: 10 }}>{p.label}</span>
              <Badge color={p.color}>barra {Math.round(p.bar)}</Badge>
            </div>
            <div style={{ color: C.soft, fontSize: 9.5, lineHeight: 1.6, paddingLeft: 18 }}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>

      {step >= 2 && (
        <div style={{
          padding: "14px 16px", borderRadius: 8,
          background: "rgba(0,212,204,0.07)",
          border: "1px solid rgba(0,212,204,0.3)",
        }}>
          <div style={{ color: C.teal, fontWeight: 700, fontSize: 10, marginBottom: 6 }}>
            ★ TIME CLUSTER IDENTIFICADO — barras 32 a 34
          </div>
          <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.8 }}>
            Las 3 proyecciones caen dentro de <b style={{color:C.text}}>3 barras</b>. Eso es tu ventana temporal.
            Ahora miras el precio: ¿está en una zona de Fibonacci de precio también?
            Si sí → <b style={{color:C.teal}}>setup activado</b>. Solo falta el gatillo del momentum.
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 5 – LA COMBINACIÓN COMPLETA
// ─────────────────────────────────────────────────────────────────────────────
function TabCombo() {
  const [fase, setFase] = useState(0);

  const fases = [
    {
      id: 0,
      label: "1. Price Cluster",
      color: C.price,
      icon: "⬆",
      title: "El precio llega a una zona Fibonacci",
      desc: "La onda ② ha retrocedido hasta el 61.8% del movimiento de ①. Es una zona de precio conocida donde puede haber soporte.",
      estado: "ALERTA PRECIO",
      accion: "Marcar la zona. No hacer nada más.",
    },
    {
      id: 1,
      label: "2. Time Cluster",
      color: C.time,
      icon: "⏱",
      title: "Coincide con una ventana temporal",
      desc: "La barra actual cae dentro del Time Cluster que calculaste antes (61.8% del tiempo de ①). Precio + Tiempo coinciden.",
      estado: "SETUP ACTIVADO",
      accion: "Ponerse en máxima alerta. Aún no entrar.",
    },
    {
      id: 2,
      label: "3. Momentum gira",
      color: C.mom,
      icon: "⚡",
      title: "El oscilador confirma el giro",
      desc: "En el gráfico de 30m: la MM30 sigue apuntando arriba. En el gráfico de 3m: el MACD cruza al alza. El momentum confirma.",
      estado: "GATILLO ACTIVADO",
      accion: "ENTRAR. Stop debajo del mínimo de la zona.",
    },
  ];

  // Gráfico completo de ejemplo
  const priceY = [230,130,170,58,115,40];  // ondas 1-4
  const priceX = [20,90,130,220,275,370];
  const W2=500, H2=200;

  // Zona precio (61.8% de la onda 1)
  const w1High = priceY[1], w1Low = priceY[0];
  const zonePriceY = w1High + (w1Low - w1High) * 0.618; // y del 61.8%

  // Zona tiempo (simulada en x)
  const zoneTimeX1 = priceX[3] + 10, zoneTimeX2 = priceX[3] + 75;

  // Precio en ④ ≈ 61.8%
  // const w4X = priceX[3], w4Y = priceY[3] + (priceY[0]-priceY[3])*0.618;

  const pathD2 = priceX.map((x,i) => `${i===0?"M":"L"}${x},${priceY[i]}`).join(" ");

  // MACD simulado
  const macdBars = [-3,-5,-4,-2,-1,0,1,2,4,5,4,3];
  const macdW=500, macdH=60;
  const crossAt = 5; // índice donde cruza

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <InfoBox color={C.green} icon="🏆">
        <b style={{color:C.green}}>La regla de oro de Miner: </b>
        El <b style={{color:C.price}}>Precio</b> y el <b style={{color:C.time}}>Tiempo</b> te dicen
        <i> dónde y cuándo</i> vigilar. El <b style={{color:C.mom}}>Momentum</b> te da el
        <b style={{color:C.text}}> gatillo para entrar</b>.
        Nunca entres solo por precio. Nunca solo por tiempo. Necesitas los tres.
      </InfoBox>

      {/* Fases */}
      <div style={{ display: "flex", gap: 6 }}>
        {fases.map(f => (
          <button key={f.id} onClick={() => setFase(f.id)} style={{
            flex: 1, padding: "10px 8px", borderRadius: 7, border: "none", cursor: "pointer",
            fontSize: 10, fontFamily: "monospace", fontWeight: 700, lineHeight: 1.4,
            background: fase >= f.id ? `${f.color}15` : "rgba(255,255,255,0.03)",
            color: fase >= f.id ? f.color : C.muted,
            boxShadow: fase === f.id ? `inset 0 0 0 1.5px ${f.color}60` : "none",
          }}>
            <div style={{ fontSize: 16 }}>{f.icon}</div>
            <div>{f.label}</div>
          </button>
        ))}
      </div>

      {/* Info fase */}
      <div style={{
        padding: "14px 16px", borderRadius: 8,
        background: `${fases[fase].color}08`,
        border: `1px solid ${fases[fase].color}30`,
        display: "flex", gap: 14, alignItems: "flex-start",
      }}>
        <div style={{
          padding: "6px 12px", borderRadius: 20, flexShrink: 0, marginTop: 2,
          background: `${fases[fase].color}18`,
          border: `1px solid ${fases[fase].color}45`,
          color: fases[fase].color, fontSize: 9, fontWeight: 700, letterSpacing: 1,
        }}>{fases[fase].estado}</div>
        <div>
          <div style={{ color: C.text, fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{fases[fase].title}</div>
          <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.8, marginBottom: 8 }}>{fases[fase].desc}</div>
          <div style={{
            color: fases[fase].color, fontSize: 10, fontWeight: 700,
            background: `${fases[fase].color}10`,
            border: `1px solid ${fases[fase].color}25`,
            borderRadius: 5, padding: "5px 10px", display: "inline-block",
          }}>→ {fases[fase].accion}</div>
        </div>
      </div>

      {/* Gráfico precio */}
      <div style={{ background: "rgba(3,7,18,0.85)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: "10px 8px 6px" }}>
        <div style={{ color: C.muted, fontSize: 8, letterSpacing: 2, marginBottom: 4, paddingLeft: 8 }}>
          GRÁFICO 30 MIN — PRECIO + ZONAS
        </div>
        <svg viewBox={`0 0 ${W2} ${H2}`} width="100%" style={{display:"block"}}>
          {/* Zona precio Fib 61.8% */}
          {fase >= 0 && (
            <>
              <rect x={20} y={zonePriceY-12} width={W2-30} height={24}
                fill="rgba(0,229,160,0.08)"
                stroke="rgba(0,229,160,0.35)" strokeWidth={1} strokeDasharray="6 3" rx={2}/>
              <text x={W2-35} y={zonePriceY+4} textAnchor="end"
                fill={C.green} fontSize={8} fontFamily="monospace" fontWeight="700">61.8% precio</text>
            </>
          )}

          {/* Zona tiempo cluster */}
          {fase >= 1 && (
            <>
              <rect x={zoneTimeX1} y={10} width={zoneTimeX2-zoneTimeX1} height={H2-20}
                fill="rgba(77,159,255,0.08)"
                stroke="rgba(77,159,255,0.4)" strokeWidth={1} strokeDasharray="5 3" rx={2}/>
              <text x={(zoneTimeX1+zoneTimeX2)/2} y={22}
                textAnchor="middle" fill={C.blue} fontSize={8} fontFamily="monospace" fontWeight="700">
                TIME CLUSTER
              </text>
            </>
          )}

          {/* Intersección: ambas zonas */}
          {fase >= 1 && (
            <rect x={zoneTimeX1} y={zonePriceY-12} width={zoneTimeX2-zoneTimeX1} height={24}
              fill="rgba(0,212,204,0.25)"
              stroke="rgba(0,212,204,0.7)" strokeWidth={2} rx={3}/>
          )}

          {/* MM30 */}
          <path
            d={`M20,185 C80,170 130,155 220,80 S310,62 370,55 S440,50 490,44`}
            fill="none" stroke={C.gold} strokeWidth={1.5} strokeDasharray="8 4" opacity={0.7}/>
          <text x={W2-15} y={46} fill={C.gold} fontSize={7.5} fontFamily="monospace">MM30↑</text>

          {/* Precio */}
          <path d={pathD2} fill="none" stroke={C.green} strokeWidth={2.5} strokeLinejoin="round"/>

          {/* Labels ondas */}
          {[{x:90,y:130,l:"①"},{x:130,y:170,l:"②"},{x:220,y:58,l:"③"},{x:275,y:115,l:"④"},{x:370,y:40,l:"⑤"}].map((p,i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={5} fill="rgba(3,7,18,0.9)"
                stroke={i%2===0?C.green:C.gold} strokeWidth={1.5}/>
              <text x={p.x} y={p.y+4} textAnchor="middle"
                fill={i%2===0?C.green:C.gold} fontSize={9} fontFamily="monospace" fontWeight="700">{p.l}</text>
            </g>
          ))}

          {/* Punto de entrada */}
          {fase >= 2 && (
            <>
              <circle cx={zoneTimeX1+10} cy={zonePriceY} r={8}
                fill="rgba(3,7,18,0.9)" stroke={C.teal} strokeWidth={2.5}/>
              <text x={zoneTimeX1+24} y={zonePriceY+4}
                fill={C.teal} fontSize={9} fontFamily="monospace" fontWeight="700">ENTRADA</text>
            </>
          )}
        </svg>
      </div>

      {/* MACD 3m */}
      <div style={{ background: "rgba(3,7,18,0.85)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: "10px 8px 6px" }}>
        <div style={{ color: C.muted, fontSize: 8, letterSpacing: 2, marginBottom: 4, paddingLeft: 8 }}>
          GRÁFICO 3 MIN — MACD (GATILLO)
        </div>
        <svg viewBox={`0 0 ${macdW} ${macdH+20}`} width="100%" style={{display:"block"}}>
          {/* Zero line */}
          <line x1={20} y1={macdH/2} x2={macdW-10} y2={macdH/2}
            stroke="rgba(255,255,255,0.12)" strokeWidth={1}/>

          {/* Barras */}
          {macdBars.map((v, i) => {
            const bw = (macdW-40) / macdBars.length;
            const bx = 20 + i*bw + bw*0.15;
            const by = v >= 0 ? macdH/2 - v*5 : macdH/2;
            const bh = Math.abs(v)*5;
            const col = v >= 0 ? C.green : C.red;
            const isGatillo = i === crossAt && fase >= 2;
            return (
              <rect key={i} x={bx} y={by} width={bw*0.7} height={Math.max(bh,1)}
                fill={col} rx={1} opacity={isGatillo ? 1 : 0.6}/>
            );
          })}

          {/* Cruce MACD */}
          {fase >= 2 && (
            <>
              <line x1={20 + crossAt*(macdW-40)/macdBars.length} y1={5}
                x2={20 + crossAt*(macdW-40)/macdBars.length} y2={macdH+10}
                stroke={C.mom} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.9}/>
              <text x={20 + crossAt*(macdW-40)/macdBars.length + 5} y={18}
                fill={C.mom} fontSize={8} fontFamily="monospace" fontWeight="700">
                ⚡ CRUCE → GATILLO
              </text>
            </>
          )}

          {fase < 2 && (
            <text x={macdW/2} y={macdH/2+4} textAnchor="middle"
              fill={C.muted} fontSize={9} fontFamily="monospace">
              Espera el cruce alcista del MACD en 3m…
            </text>
          )}
        </svg>
      </div>

      {/* Resumen visual */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { color: C.price, icon: "⬆", label: "PRECIO", val: "61.8%", sub: "zona de soporte Fib", check: fase>=0 },
          { color: C.time,  icon: "⏱", label: "TIEMPO", val: "Barra 32-34", sub: "Time Cluster activo", check: fase>=1 },
          { color: C.mom,   icon: "⚡", label: "MOMENTUM", val: "MACD ↑ en 3m", sub: "MM30 ↑ en 30m", check: fase>=2 },
        ].map((r, i) => (
          <div key={i} style={{
            padding: "12px 12px", borderRadius: 7,
            background: r.check ? `${r.color}10` : "rgba(255,255,255,0.02)",
            border: `1px solid ${r.check ? r.color+"40" : "rgba(255,255,255,0.07)"}`,
            transition: "all 0.3s",
          }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 14 }}>{r.icon}</span>
              <Badge color={r.check ? r.color : C.muted}>{r.label}</Badge>
              {r.check && <span style={{ color: r.color, fontSize: 14, marginLeft: "auto" }}>✓</span>}
            </div>
            <div style={{ color: r.check ? C.text : C.muted, fontSize: 12, fontWeight: 700, marginBottom: 3 }}>{r.val}</div>
            <div style={{ color: r.check ? C.soft : C.muted, fontSize: 9 }}>{r.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 6 – TU SETUP (MM30 + MACD)
// ─────────────────────────────────────────────────────────────────────────────
function TabTuSetup() {
  const scenarios = {
    entrada: {
      label: "Entrada en onda ②",
      verdict: "ENTRAR LARGO",
      color: C.green,
      mm30: "↑ Apunta arriba — tendencia alcista confirmada",
      macd30m: "Precio en 61.8% de ①  — zona de soporte",
      macd3m: "Cruce alcista del MACD — gatillo activado",
      fib: "Precio en 61.8% interno + Time Cluster 61.8% del tiempo de ①",
      stop: "Por debajo del mínimo de la zona",
      target: "Extensión 161.8% de ① desde el fondo de ②",
    },
    espera: {
      label: "En plena onda ② (MACD aún bajista)",
      verdict: "ESPERAR",
      color: C.gold,
      mm30: "↑ Sigue alcista — tendencia intacta",
      macd30m: "Precio se acerca al 61.8% — no ha llegado aún",
      macd3m: "MACD en negativo — momentum bajista — NO entrar",
      fib: "Precio aún no en zona. Time Cluster activo pero falta confirmación.",
      stop: "—",
      target: "—",
    },
    fin: {
      label: "Fin de tendencia (onda ⑤ con divergencia)",
      verdict: "CERRAR / NO ENTRAR",
      color: C.red,
      mm30: "↘ Empieza a girar — señal de debilidad",
      macd30m: "Divergencia bajista: precio hace nuevo máximo, MACD no",
      macd3m: "MACD cruza a la baja — momentum negativo",
      fib: "④ superpone con ① (patrón de Miner). Time Cluster al 100% del tiempo de ①+③.",
      stop: "—",
      target: "Objetivo bajista: 61.8% del movimiento alcista completo",
    },
  } as const;
  type ScenarioKey = keyof typeof scenarios;

  const [scenario, setScenario] = useState<ScenarioKey>("entrada");
  const s = scenarios[scenario];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <InfoBox color={C.mom} icon="🔧">
        Tu setup combina <b style={{color:C.text}}>MM30 en 30 minutos</b> (para la dirección y el contexto de precio/tiempo)
        con <b style={{color:C.text}}>MACD en 3 minutos</b> (para el gatillo exacto de entrada).
        Esto implementa exactamente la metodología dual timeframe de Miner.
      </InfoBox>

      {/* Diagrama del sistema */}
      <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2 }}>TU SISTEMA — FLUJO COMPLETO</div>
      <div style={{ background: "rgba(3,7,18,0.85)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr auto 1fr", gap: 4, alignItems: "center" }}>
          {[
            { label: "GRÁFICO 30m", sub: "Contexto", items: ["Identificas ①②③④⑤", "Marcas zonas Fib precio", "Calculas Time Cluster", "MM30 confirma tendencia"], color: C.gold },
            null,
            { label: "SETUP", sub: "Precio + Tiempo", items: ["Precio en zona Fib", "Time Cluster activo", "MM30 apunta a favor", "Sin señal aún → espera"], color: C.teal },
            null,
            { label: "GRÁFICO 3m", sub: "Gatillo", items: ["Zoom en la zona del setup", "Esperas cruce MACD", "Confirma dirección MM30", "Vela de confirmación"], color: C.blue },
            null,
            { label: "ENTRADA", sub: "Gatillo activado", items: ["Stop bajo mínimo zona", "Target = Fib externo", "Ratio R/R mínimo 2:1", "Gestión del trade"], color: C.green },
            null,
            { label: "GESTIÓN", sub: "Post-entrada", items: ["Mueve stop al BE", "Parcial en 61.8%", "Salida en Time Cluster⑤", "Cierra en divergencia"], color: C.purple },
          ].map((col, i) => col === null ? (
            <div key={i} style={{ color: C.muted, fontSize: 20, textAlign: "center" }}>→</div>
          ) : (
            <div key={i} style={{
              padding: "10px 10px", borderRadius: 7,
              background: `${col.color}08`, border: `1px solid ${col.color}25`,
              minHeight: 130,
            }}>
              <div style={{ color: col.color, fontSize: 8, fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>{col.label}</div>
              <div style={{ color: C.muted, fontSize: 7.5, marginBottom: 8 }}>{col.sub}</div>
              {col.items.map((item, j) => (
                <div key={j} style={{ color: C.soft, fontSize: 8.5, lineHeight: 1.7, paddingLeft: 8, borderLeft: `2px solid ${col.color}30` }}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Escenarios */}
      <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2 }}>ESCENARIOS PRÁCTICOS</div>
      <div style={{ display: "flex", gap: 6 }}>
        {(Object.entries(scenarios) as [ScenarioKey, (typeof scenarios)[ScenarioKey]][]).map(([id, sc]) => (
          <button key={id} onClick={() => setScenario(id)} style={{
            flex: 1, padding: "9px 10px", borderRadius: 7, border: "none", cursor: "pointer",
            fontSize: 10, fontFamily: "monospace", fontWeight: 700,
            background: scenario===id ? `${sc.color}15` : "rgba(255,255,255,0.03)",
            color: scenario===id ? sc.color : C.muted,
            boxShadow: scenario===id ? `inset 0 0 0 1px ${sc.color}50` : "none",
          }}>{sc.label}</button>
        ))}
      </div>

      <div style={{
        padding: "16px", borderRadius: 8,
        background: `${s.color}07`, border: `1px solid ${s.color}25`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{
            padding: "6px 14px", borderRadius: 20,
            background: `${s.color}18`, border: `1px solid ${s.color}50`,
            color: s.color, fontWeight: 700, fontSize: 10, letterSpacing: 1,
          }}>{s.verdict}</div>
          <span style={{ color: C.soft, fontSize: 10 }}>{s.label}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { label: "MM30 en 30m", val: s.mm30, color: C.gold, icon: "📊" },
            { label: "Fibonacci precio + tiempo", val: s.fib, color: C.teal, icon: "📐" },
            { label: "MACD 30m (contexto)", val: s.macd30m, color: C.blue, icon: "📈" },
            { label: "MACD 3m (gatillo)", val: s.macd3m, color: C.mom, icon: "⚡" },
          ].map((r, i) => (
            <div key={i} style={{
              padding: "10px 12px", borderRadius: 7,
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 5 }}>
                <span>{r.icon}</span>
                <span style={{ color: r.color, fontSize: 8.5, fontWeight: 700, letterSpacing: 1 }}>{r.label}</span>
              </div>
              <div style={{ color: C.text, fontSize: 10, lineHeight: 1.6 }}>{r.val}</div>
            </div>
          ))}
        </div>

        {scenario === "entrada" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
            <div style={{ padding: "8px 12px", borderRadius: 6,
              background: "rgba(255,77,106,0.08)", border: "1px solid rgba(255,77,106,0.2)",
              fontSize: 10, color: C.soft }}>
              <span style={{color:C.red, fontWeight:700}}>Stop: </span>{s.stop}
            </div>
            <div style={{ padding: "8px 12px", borderRadius: 6,
              background: "rgba(0,229,160,0.08)", border: "1px solid rgba(0,229,160,0.2)",
              fontSize: 10, color: C.soft }}>
              <span style={{color:C.green, fontWeight:700}}>Target: </span>{s.target}
            </div>
          </div>
        )}
      </div>

      {/* Checklist operativa */}
      <div style={{ color: C.muted, fontSize: 9, letterSpacing: 2 }}>CHECKLIST ANTES DE ENTRAR</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { group: "CONTEXTO (30m)", color: C.gold, items: [
            "¿Puedo identificar claramente las ondas ①②③④⑤?",
            "¿La MM30 apunta en la dirección que quiero operar?",
            "¿He calculado los retrocesos Fib de precio (38.2–61.8%)?",
            "¿He calculado el Time Cluster (2 o más proyecciones)?",
            "¿El precio está en zona Fib Y en ventana temporal?",
          ]},
          { group: "GATILLO (3m)", color: C.blue, items: [
            "¿El MACD en 3m está cruzando al alza (si opero largo)?",
            "¿Hay divergencia que contradiga mi idea? Si hay → no entrar",
            "¿La vela de gatillo tiene buen cuerpo y poco sombra?",
            "¿He calculado el stop y el target? ¿R/R ≥ 2:1?",
            "¿El riesgo por operación es ≤ 1-2% del capital?",
          ]},
        ].map((g, gi) => (
          <Card key={gi} color={g.color} title={g.group}>
            {g.items.map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 8, alignItems: "flex-start",
                padding: "5px 0",
                borderBottom: i < g.items.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 3, flexShrink: 0, marginTop: 1,
                  border: `1px solid ${g.color}40`,
                  background: `${g.color}0a`,
                }}/>
                <span style={{ color: C.soft, fontSize: 9.5, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB – LOS 3 MÉTODOS DE TIEMPO (detalle)
// ─────────────────────────────────────────────────────────────────────────────
function Tab3Metodos() {
  const [metodo, setMetodo] = useState("ret618");
  const [clusterStep, setClusterStep] = useState(0);

  const W = 560, H = 180;
  const maxB = 60;
  const bx = (b:number) => 20 + b * (W - 40) / maxB;
  const py = (v:number) => Math.max(8, Math.min(H - 8, v));

  // ── Método 1: Retroceso 61.8% ──────────────────────────────────
  // Tendencia: 0→20 (sube). Corrección desde 20. 61.8% de 20 = 12.4 → barra 32.
  const ret618Pts = [];
  for (let i = 0; i <= 20; i++) ret618Pts.push({ x: i, y: 170 - i * 6 });
  for (let i = 21; i <= 44; i++) ret618Pts.push({ x: i, y: ret618Pts[20].y + (i - 20) * 2.8 });
  for (let i = 45; i <= 58; i++) ret618Pts.push({ x: i, y: ret618Pts[44].y - (i - 44) * 5 });
  const ret618Path = ret618Pts.map((p,i) => `${i===0?"M":"L"}${bx(p.x)},${py(p.y)}`).join(" ");

  // ── Método 2: PTA 100% ─────────────────────────────────────────
  // Onda 1: 0→15 barras. Onda 3 empieza en barra 22. PTA 100% = barra 22+15=37.
  const ptaPts : { x: number; y: number }[] = [];
  for (let i = 0; i <= 15; i++) ptaPts.push({ x: i, y: 165 - i * 7 });
  for (let i = 16; i <= 22; i++) ptaPts.push({ x: i, y: ptaPts[15].y + (i-15)*5.5 });
  for (let i = 23; i <= 37; i++) ptaPts.push({ x: i, y: ptaPts[22].y - (i-22)*8 });
  for (let i = 38; i <= 55; i++) ptaPts.push({ x: i, y: ptaPts[37].y + (i-37)*3 });
  const ptaPath = ptaPts.map((p,i) => `${i===0?"M":"L"}${bx(p.x)},${py(p.y)}`).join(" ");

  // ── Método 3: Máximo-Máximo ────────────────────────────────────
  // Max1 en barra 10, Max2 en barra 40 → distancia 30. Max3 proyectado en 70 (fuera), usamos 60 relativo.
  const mmPts = [];
  for (let i = 0; i <= 10; i++) mmPts.push({ x: i, y: 170 - i * 8 });
  for (let i = 11; i <= 20; i++) mmPts.push({ x: i, y: mmPts[10].y + (i-10)*7.5 });
  for (let i = 21; i <= 40; i++) mmPts.push({ x: i, y: mmPts[20].y - (i-20)*5.5 });
  for (let i = 41; i <= 55; i++) mmPts.push({ x: i, y: mmPts[40].y + (i-40)*6 });
  const mmPath = mmPts.map((p,i) => `${i===0?"M":"L"}${bx(p.x)},${py(p.y)}`).join(" ");

  // ── Cluster ejemplo ────────────────────────────────────────────
  // Ret 61.8% → viernes (barra 32), PTA 100% → jueves (barra 31), MaxMax → viernes (barra 32.5)
  const clusterPts = [];
  for (let i = 0; i <= 20; i++) clusterPts.push({ x: i, y: 165 - i * 5.5 });
  for (let i = 21; i <= 32; i++) clusterPts.push({ x: i, y: clusterPts[20].y + (i-20)*3.5 });
  for (let i = 33; i <= 50; i++) clusterPts.push({ x: i, y: clusterPts[32].y - (i-32)*5 });
  const clusterPath = clusterPts.map((p,i) => `${i===0?"M":"L"}${bx(p.x)},${py(p.y)}`).join(" ");

  const clusterLines = [
    { bar: 31, color: C.blue,   label: "PTA 100%",     dia: "jueves" },
    { bar: 32, color: C.gold,   label: "Ret 61.8%",    dia: "viernes" },
    { bar: 32.5, color: C.purple, label: "Max-Max 100%", dia: "viernes" },
  ];

  const metodos = [
    { id: "ret618", label: "1. Retroceso 61.8%", color: C.gold,   icon: "↩" },
    { id: "pta100", label: "2. PTA 100%",         color: C.blue,   icon: "→" },
    { id: "maxmax", label: "3. Máximo-Máximo",    color: C.purple, icon: "⟳" },
    { id: "cluster3", label: "★ Cluster completo", color: C.teal,   icon: "🎯" },
  ];

  // Move ChartBase component outside of Tab3Metodos


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ padding: "11px 14px", borderRadius: 8, background: "rgba(0,212,204,0.06)", border: "1px solid rgba(0,212,204,0.2)", fontSize: 10, color: C.soft, lineHeight: 1.8 }}>
        <b style={{color:C.teal}}>Miner usa 3 tipos de proyección temporal</b> distintos y los superpone para encontrar el Time Cluster.
        Cada uno mide una cosa diferente. Combinados, eliminan la ambigüedad de actuar solo con uno.
      </div>

      {/* Selector */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {metodos.map(m => (
          <button key={m.id} onClick={() => setMetodo(m.id)} style={{
            padding: "8px 16px", borderRadius: 7, border: "none", cursor: "pointer",
            fontSize: 10, fontFamily: "monospace", fontWeight: 700,
            background: metodo === m.id ? `${m.color}18` : "rgba(255,255,255,0.03)",
            color: metodo === m.id ? m.color : C.muted,
            boxShadow: metodo === m.id ? `inset 0 0 0 1px ${m.color}55` : "none",
          }}>
            <span style={{ marginRight: 5 }}>{m.icon}</span>{m.label}
          </button>
        ))}
      </div>

      {/* ── MÉTODO 1: Retroceso 61.8% ── */}
      {metodo === "ret618" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Card color={C.gold} title="¿QUÉ MIDE?">
              <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.85 }}>
                Mide <b style={{color:C.text}}>cuánto debería durar una corrección</b> en relación con
                la tendencia que la precede. Es la versión temporal del retroceso de precio del 61.8%.<br/><br/>
                <b style={{color:C.gold}}>Se aplica a:</b> onda ② respecto a ①, onda ④ respecto a ③,
                onda B respecto al impulso previo.
              </div>
            </Card>
            <Card color={C.gold} title="CÁLCULO PASO A PASO">
              <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.9 }}>
                <b style={{color:"#aabb55"}}>A</b> = inicio de la tendencia (barra 0)<br/>
                <b style={{color:C.gold}}>B</b> = fin de la tendencia (barra 20)<br/>
                Duración A→B = <b style={{color:C.text}}>20 barras</b><br/><br/>
                20 × 0.618 = <b style={{color:C.gold}}>12.4 barras</b><br/><br/>
                Desde la barra 20 → cuenta 12 barras adelante<br/>
                <b style={{color:C.gold}}>Resultado: barra 32</b> = ventana de giro<br/><br/>
                Si el precio llega a un soporte Fib <i>justo en barra 32</i> → setup de alta prob.
              </div>
            </Card>
          </div>
          <ChartBase pathD={ret618Path} color={C.gold}>
            {/* Tendencia referencia */}
            <rect x={bx(0)} y={8} width={bx(20)-bx(0)} height={H-8}
              fill="rgba(0,229,160,0.05)" stroke="rgba(0,229,160,0.12)" strokeWidth={1} rx={2}/>
            <text x={(bx(0)+bx(20))/2} y={22} textAnchor="middle"
              fill="rgba(0,229,160,0.4)" fontSize={8} fontFamily="monospace">TENDENCIA (20 barras)</text>
            {/* Barra inicio tendencia */}
            <line x1={bx(0)} y1={8} x2={bx(0)} y2={H} stroke={C.green} strokeWidth={1.5} strokeDasharray="5 3"/>
            <text x={bx(0)} y={H+14} textAnchor="middle" fill={C.green} fontSize={7} fontFamily="monospace">A</text>
            {/* Fin tendencia */}
            <line x1={bx(20)} y1={8} x2={bx(20)} y2={H} stroke={C.green} strokeWidth={1.5} strokeDasharray="5 3"/>
            <text x={bx(20)} y={H+14} textAnchor="middle" fill={C.green} fontSize={7} fontFamily="monospace">B fin ①</text>
            {/* Flecha duración */}
            <line x1={bx(0)} y1={H-4} x2={bx(20)} y2={H-4} stroke={C.green} strokeWidth={1}/>
            <text x={(bx(0)+bx(20))/2} y={H-8} textAnchor="middle" fill={C.green} fontSize={7} fontFamily="monospace">20 barras</text>
            {/* Corrección zona */}
            <rect x={bx(20)} y={8} width={bx(44)-bx(20)} height={H-8}
              fill="rgba(240,192,64,0.04)" stroke="rgba(240,192,64,0.1)" strokeWidth={1} rx={2}/>
            <text x={(bx(20)+bx(44))/2} y={22} textAnchor="middle"
              fill="rgba(240,192,64,0.4)" fontSize={8} fontFamily="monospace">CORRECCIÓN</text>
            {/* 61.8% = barra 32 */}
            <line x1={bx(32.4)} y1={8} x2={bx(32.4)} y2={H}
              stroke={C.gold} strokeWidth={2} strokeDasharray="7 4"/>
            <rect x={bx(32.4)-28} y={H-22} width={56} height={16} rx={3}
              fill={`${C.gold}25`} stroke={`${C.gold}60`} strokeWidth={1}/>
            <text x={bx(32.4)} y={H-11} textAnchor="middle"
              fill={C.gold} fontSize={7.5} fontFamily="monospace" fontWeight="700">61.8% → barra 32</text>
            {/* 100% = barra 40 */}
            <line x1={bx(40)} y1={8} x2={bx(40)} y2={H}
              stroke={C.orange} strokeWidth={1.5} strokeDasharray="6 4" opacity={0.6}/>
            <text x={bx(40)} y={H+14} textAnchor="middle"
              fill={C.orange} fontSize={7} fontFamily="monospace">100% b.40</text>
            {/* Círculo giro */}
            <circle cx={bx(32.4)} cy={py(ret618Pts[32]?.y||120)} r={7}
              fill="rgba(3,7,18,0.9)" stroke={C.gold} strokeWidth={2}/>
            <text x={bx(32.4)+14} y={py(ret618Pts[32]?.y||120)+4}
              fill={C.gold} fontSize={8} fontFamily="monospace" fontWeight="700">GIRO ESPERADO</text>
          </ChartBase>
         
        </div>
      )}

      {/* ── MÉTODO 2: PTA 100% ── */}
      {metodo === "pta100" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Card color={C.blue} title="¿QUÉ MIDE?">
              <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.85 }}>
                Compara ondas que van <b style={{color:C.text}}>en la misma dirección</b>.
                Proyecta la duración de la onda ① sobre la onda ③ para estimar cuándo terminará ③.<br/><br/>
                <b style={{color:C.blue}}>Se aplica a:</b> ① vs ③, ③ vs ⑤, A vs C (si van en la misma dirección).<br/><br/>
                Uso más frecuente: saber cuándo <b style={{color:C.text}}>cerrar la posición</b> en un impulso fuerte.
              </div>
            </Card>
            <Card color={C.blue} title="CÁLCULO PASO A PASO">
              <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.9 }}>
                Onda ① duró <b style={{color:C.text}}>15 barras</b> (barra 0 → barra 15)<br/>
                Onda ② terminó en <b style={{color:C.text}}>barra 22</b> (inicio de ③)<br/><br/>
                PTA 100% = inicio ③ + duración ①<br/>
                = 22 + 15 = <b style={{color:C.blue}}>barra 37</b><br/><br/>
                En la barra 37, si el precio está en una zona de resistencia Fib
                → <b style={{color:C.text}}>cierra la posición</b> o reduce tamaño.<br/><br/>
                Variaciones: PTA 61.8% (barra 22+9.3=31.3) y PTA 161.8% (barra 22+24.3=46.3)
              </div>
            </Card>
          </div>
          <ChartBase pathD={ptaPath} color={C.green}>
            {/* Onda 1 sombreada */}
            <rect x={bx(0)} y={8} width={bx(15)-bx(0)} height={H-8}
              fill="rgba(0,229,160,0.06)" stroke="rgba(0,229,160,0.15)" strokeWidth={1} rx={2}/>
            <text x={(bx(0)+bx(15))/2} y={22} textAnchor="middle"
              fill="rgba(0,229,160,0.4)" fontSize={8} fontFamily="monospace">① = 15 barras</text>
            {/* Marcadores clave */}
            <line x1={bx(0)} y1={8} x2={bx(0)} y2={H} stroke={C.green} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.6}/>
            <text x={bx(0)} y={H+14} textAnchor="middle" fill={C.green} fontSize={7} fontFamily="monospace">inicio ①</text>
            <line x1={bx(15)} y1={8} x2={bx(15)} y2={H} stroke={C.green} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.6}/>
            <text x={bx(15)} y={H+14} textAnchor="middle" fill={C.green} fontSize={7} fontFamily="monospace">fin ①</text>
            <line x1={bx(22)} y1={8} x2={bx(22)} y2={H} stroke={C.gold} strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7}/>
            <text x={bx(22)} y={H+14} textAnchor="middle" fill={C.gold} fontSize={7} fontFamily="monospace">inicio ③</text>
            {/* Flecha PTA */}
            <line x1={bx(22)} y1={H-6} x2={bx(37)} y2={H-6} stroke={C.blue} strokeWidth={1.5}/>
            <polygon points={`${bx(37)},${H-6} ${bx(37)-6},${H-10} ${bx(37)-6},${H-2}`} fill={C.blue}/>
            <text x={(bx(22)+bx(37))/2} y={H-10} textAnchor="middle"
              fill={C.blue} fontSize={7.5} fontFamily="monospace" fontWeight="700">15 barras = 100% de ①</text>
            {/* PTA 100% vertical */}
            <line x1={bx(37)} y1={8} x2={bx(37)} y2={H}
              stroke={C.blue} strokeWidth={2} strokeDasharray="7 4" opacity={0.7}/>
            <rect x={bx(37)-28} y={H-22} width={60} height={16} rx={3}
              fill={`${C.blue}20`} stroke={`${C.blue}50`} strokeWidth={1}/>
            <text x={bx(37)} y={H-11} textAnchor="middle"
              fill={C.blue} fontSize={7.5} fontFamily="monospace" fontWeight="700">PTA 100% → barra 37</text>
            {/* Punto objetivo */}
            <circle cx={bx(37)} cy={py(ptaPts[37]?.y||45)} r={7}
              fill="rgba(3,7,18,0.9)" stroke={C.blue} strokeWidth={2}/>
            <text x={bx(37)+14} y={py(ptaPts[37]?.y||45)+4}
              fill={C.blue} fontSize={8} fontFamily="monospace" fontWeight="700">CERRAR POSICIÓN</text>
            {/* Labels ondas */}
            {[{x:7,y:120,l:"①",c:C.green},{x:18,y:125,l:"②",c:C.gold},{x:30,y:45,l:"③",c:C.green}].map((p,i)=>(
              <g key={i}>
                <circle cx={bx(p.x)} cy={py(ptaPts[Math.min(p.x,ptaPts.length-1)]?.y||p.y)} r={4}
                  fill="rgba(3,7,18,0.9)" stroke={p.c} strokeWidth={1.5}/>
                <text x={bx(p.x)+10} y={py(ptaPts[Math.min(p.x,ptaPts.length-1)]?.y||p.y)+4}
                  fill={p.c} fontSize={10} fontFamily="monospace" fontWeight="700">{p.l}</text>
              </g>
            ))}
          </ChartBase>
        </div>
      )}

      {/* ── MÉTODO 3: Máximo-Máximo ── */}
      {metodo === "maxmax" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Card color={C.purple} title="¿QUÉ MIDE?">
              <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.85 }}>
                Identifica <b style={{color:C.text}}>la ciclicidad del mercado</b>. No mide la onda actual,
                sino el <b style={{color:C.text}}>ritmo histórico</b> entre picos (o entre valles).<br/><br/>
                El mercado tiende a repetir sus ciclos. Si dos picos estuvieron separados por 30 días,
                el siguiente pico probablemente ocurrirá ~30 días después del segundo.<br/><br/>
                <b style={{color:C.purple}}>Variantes:</b> Máximo-Máximo, Mínimo-Mínimo, y también Máximo-Mínimo.
              </div>
            </Card>
            <Card color={C.purple} title="CÁLCULO PASO A PASO">
              <div style={{ fontSize: 10, color: C.soft, lineHeight: 1.9 }}>
                Máx 1 ocurrió en la <b style={{color:C.text}}>barra 10</b><br/>
                Máx 2 ocurrió en la <b style={{color:C.text}}>barra 40</b><br/>
                Distancia = <b style={{color:C.purple}}>30 barras</b><br/><br/>
                Proyección 100% desde Máx 2:<br/>
                40 + 30 = <b style={{color:C.purple}}>barra 70</b> → Máx 3 estimado<br/><br/>
                También puedes proyectar:<br/>
                • 61.8% de 30 = 18.5 → barra 58.5 (giro intermedio)<br/>
                • 161.8% de 30 = 48.5 → barra 88.5 (extensión)
              </div>
            </Card>
          </div>
          <ChartBase pathD={mmPath} color={C.green}>
            {/* Max 1 */}
            <line x1={bx(10)} y1={8} x2={bx(10)} y2={H} stroke={C.purple} strokeWidth={1.5} strokeDasharray="5 3"/>
            <circle cx={bx(10)} cy={py(mmPts[10].y)} r={6}
              fill="rgba(3,7,18,0.9)" stroke={C.purple} strokeWidth={2}/>
            <text x={bx(10)} y={py(mmPts[10].y)-12} textAnchor="middle"
              fill={C.purple} fontSize={9} fontFamily="monospace" fontWeight="700">MÁX 1</text>
            <text x={bx(10)} y={H+14} textAnchor="middle" fill={C.purple} fontSize={7} fontFamily="monospace">b.10</text>
            {/* Max 2 */}
            <line x1={bx(40)} y1={8} x2={bx(40)} y2={H} stroke={C.purple} strokeWidth={1.5} strokeDasharray="5 3"/>
            <circle cx={bx(40)} cy={py(mmPts[40].y)} r={6}
              fill="rgba(3,7,18,0.9)" stroke={C.purple} strokeWidth={2}/>
            <text x={bx(40)} y={py(mmPts[40].y)-12} textAnchor="middle"
              fill={C.purple} fontSize={9} fontFamily="monospace" fontWeight="700">MÁX 2</text>
            <text x={bx(40)} y={H+14} textAnchor="middle" fill={C.purple} fontSize={7} fontFamily="monospace">b.40</text>
            {/* Flecha distancia */}
            <line x1={bx(10)} y1={H-6} x2={bx(40)} y2={H-6} stroke={C.purple} strokeWidth={1.5}/>
            <text x={(bx(10)+bx(40))/2} y={H-10} textAnchor="middle"
              fill={C.purple} fontSize={7.5} fontFamily="monospace" fontWeight="700">30 barras</text>
            {/* Max 3 proyectado */}
            <line x1={bx(40)} y1={H-6} x2={Math.min(bx(55),W-20)} y2={H-6}
              stroke={C.purple} strokeWidth={1.5} strokeDasharray="6 3" opacity={0.7}/>
            <polygon points={`${Math.min(bx(55),W-20)},${H-6} ${Math.min(bx(55),W-20)-6},${H-10} ${Math.min(bx(55),W-20)-6},${H-2}`}
              fill={C.purple} opacity={0.7}/>
            <text x={(bx(40)+Math.min(bx(55),W-20))/2} y={H-10} textAnchor="middle"
              fill={C.purple} fontSize={7.5} fontFamily="monospace" opacity={0.8}>+30 barras (proyección)</text>
            <line x1={Math.min(bx(55),W-20)} y1={8} x2={Math.min(bx(55),W-20)} y2={H}
              stroke={C.purple} strokeWidth={2} strokeDasharray="7 4" opacity={0.7}/>
            <rect x={Math.min(bx(55),W-20)-28} y={H-22} width={62} height={16} rx={3}
              fill={`${C.purple}20`} stroke={`${C.purple}50`} strokeWidth={1}/>
            <text x={Math.min(bx(55),W-20)} y={H-11} textAnchor="middle"
              fill={C.purple} fontSize={7.5} fontFamily="monospace" fontWeight="700">MÁX 3 estimado</text>
          </ChartBase>
        </div>
      )}

      {/* ── CLUSTER COMPLETO ── */}
      {metodo === "cluster3" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ padding: "11px 14px", borderRadius: 8, background: "rgba(0,212,204,0.07)", border: "1px solid rgba(0,212,204,0.25)", fontSize: 10, color: C.soft, lineHeight: 1.8 }}>
            <b style={{color:C.teal}}>Ejemplo real de Time Cluster con los 3 métodos.</b>{" "}
            Miner combina las 3 proyecciones y busca que coincidan en 1-3 barras.
            Aquí el jueves y el viernes son la ventana. Con precio en zona Fib → setup máxima probabilidad.
          </div>

          {/* Construcción paso a paso */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Ver Ret 61.8%", "Añadir PTA 100%", "Añadir Máx-Máx", "Ver el Cluster"].map((l, i) => (
              <button key={i} onClick={() => setClusterStep(i)} style={{
                padding: "7px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                fontSize: 10, fontFamily: "monospace", fontWeight: 700,
                background: clusterStep >= i ? `${clusterLines[Math.min(i,2)].color}18` : "rgba(255,255,255,0.03)",
                color: clusterStep >= i ? clusterLines[Math.min(i,2)].color : C.muted,
                boxShadow: clusterStep >= i ? `inset 0 0 0 1px ${clusterLines[Math.min(i,2)].color}45` : "none",
              }}>{l}</button>
            ))}
          </div>

          <ChartBase pathD={clusterPath} color={C.green}>
            {/* Zona cluster */}
            {clusterStep >= 1 && (
              <>
                <rect x={bx(30.5)} y={8} width={bx(33)-bx(30.5)} height={H-8}
                  fill="rgba(0,212,204,0.12)"
                  stroke="rgba(0,212,204,0.5)" strokeWidth={1.5} strokeDasharray="5 3" rx={2}/>
                {clusterStep >= 3 && (
                  <text x={(bx(30.5)+bx(33))/2} y={22} textAnchor="middle"
                    fill={C.teal} fontSize={9} fontFamily="monospace" fontWeight="700">★ CLUSTER</text>
                )}
              </>
            )}

            {/* Líneas proyecciones */}
            {clusterLines.slice(0, clusterStep + 1).map((l, i) => (
              <g key={i}>
                <line x1={bx(l.bar)} y1={8} x2={bx(l.bar)} y2={H}
                  stroke={l.color} strokeWidth={2} strokeDasharray="7 4" opacity={0.9}/>
                <rect x={bx(l.bar)-28} y={H-22} width={56} height={16} rx={3}
                  fill={`${l.color}25`} stroke={`${l.color}60`} strokeWidth={1}/>
                <text x={bx(l.bar)} y={H-11} textAnchor="middle"
                  fill={l.color} fontSize={7} fontFamily="monospace" fontWeight="700">{l.label}</text>
                <text x={bx(l.bar)} y={H+14} textAnchor="middle"
                  fill={l.color} fontSize={7} fontFamily="monospace">{l.dia}</text>
              </g>
            ))}

            {/* Zona precio Fib (horizontal) */}
            {clusterStep >= 3 && (
              <>
                <rect x={20} y={py(clusterPts[32].y)-10} width={W-30} height={20}
                  fill="rgba(0,229,160,0.1)" stroke="rgba(0,229,160,0.4)" strokeWidth={1} strokeDasharray="6 3" rx={2}/>
                <text x={W-25} y={py(clusterPts[32].y)+4} textAnchor="end"
                  fill={C.green} fontSize={8} fontFamily="monospace" fontWeight="700">61.8% precio</text>
                <circle cx={bx(32)} cy={py(clusterPts[32].y)} r={8}
                  fill="rgba(3,7,18,0.9)" stroke={C.teal} strokeWidth={2.5}/>
                <text x={bx(32)+18} y={py(clusterPts[32].y)+4}
                  fill={C.teal} fontSize={9} fontFamily="monospace" fontWeight="700">HIGH PROB SETUP</text>
              </>
            )}
          </ChartBase>

          {/* Tabla resumen */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {clusterLines.map((l, i) => (
              <div key={i} style={{
                padding: "10px 12px", borderRadius: 7,
                background: clusterStep >= i ? `${l.color}09` : "rgba(255,255,255,0.02)",
                border: `1px solid ${clusterStep >= i ? l.color+"30" : "rgba(255,255,255,0.06)"}`,
                opacity: clusterStep >= i ? 1 : 0.4, transition: "all 0.3s",
              }}>
                <div style={{ color: l.color, fontSize: 9, fontWeight: 700, marginBottom: 5 }}>{l.label}</div>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 3 }}>{l.dia}</div>
                <div style={{ color: C.muted, fontSize: 8.5 }}>barra {l.bar}</div>
              </div>
            ))}
          </div>

          {clusterStep >= 3 && (
            <div style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(0,212,204,0.07)", border: "1px solid rgba(0,212,204,0.3)" }}>
              <div style={{ color: C.teal, fontWeight: 700, fontSize: 10, marginBottom: 6 }}>★ RESULTADO: Time Cluster jueves-viernes</div>
              <div style={{ color: C.soft, fontSize: 10, lineHeight: 1.8 }}>
                Las 3 proyecciones caen en un margen de <b style={{color:C.text}}>2 barras</b> (jueves-viernes).
                El precio llega al <b style={{color:C.green}}>61.8% de Fibonacci de precio</b> en la misma ventana.
                → <b style={{color:C.teal}}>Setup de alta probabilidad activado.</b>
                Solo falta el cruce del MACD en 3m para entrar.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const TABS = [
  { id: "pregunta", label: "La pregunta",     icon: "❓", sub: "por qué Miner es diferente" },
  { id: "precio",   label: "Fib de Precio",   icon: "⬆", sub: "interno y externo" },
  { id: "tiempo",   label: "Fib de Tiempo",   icon: "⏱", sub: "retracción y proyección" },
  { id: "3metodos", label: "Los 3 Métodos",   icon: "📐", sub: "61.8% · PTA · Máx-Máx" },
  { id: "cluster",  label: "Time Cluster",    icon: "🎯", sub: "convergencia temporal" },
  { id: "combo",    label: "Precio+Tiempo+Mom", icon: "⚡", sub: "la combinación completa" },
  { id: "setup",    label: "Tu Setup",        icon: "🔧", sub: "MM30 + MACD aplicados" },
];

export default function App() {
  const [tab, setTab] = useState("pregunta");

  return (
    <div style={{
      minHeight: "100vh", background: C.bg,
      color: C.text, fontFamily: "'IBM Plex Mono', monospace",
      padding: "20px 18px",
    }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: C.muted, fontSize: 9, letterSpacing: 3, marginBottom: 4 }}>
            MINER · CAPÍTULO 5 · METODOLOGÍA COMPLETA
          </div>
          <h1 style={{ margin: "0 0 4px", fontSize: 20, color: "#e8f4ff", fontWeight: 700, letterSpacing: -0.5 }}>
            Precio · Tiempo · Momentum
          </h1>
          <p style={{ margin: 0, color: C.muted, fontSize: 10 }}>
            Fibonacci aplicado en 3 dimensiones: cuánto, cuándo y la confirmación del giro
          </p>
        </div>

        {/* TABS */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap",
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${C.border}`,
          borderRadius: 10, padding: 5,
        }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "9px 14px", borderRadius: 7, border: "none",
              cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 700, transition: "all 0.18s", lineHeight: 1.4,
              background: tab === t.id ? "rgba(77,159,255,0.15)" : "transparent",
              color: tab === t.id ? C.blue : C.muted,
              boxShadow: tab === t.id ? "inset 0 0 0 1px rgba(77,159,255,0.45)" : "none",
            }}>
              <div style={{ fontSize: 14, marginBottom: 2 }}>{t.icon}</div>
              <div style={{ fontSize: 9.5 }}>{t.label}</div>
              <div style={{ fontSize: 7.5, fontWeight: 400, opacity: 0.65, marginTop: 1 }}>{t.sub}</div>
            </button>
          ))}
        </div>

        {/* PANEL */}
        <div style={{
          background: C.panel,
          border: `1px solid ${C.border}`,
          borderRadius: 12, padding: "20px",
          marginBottom: 14,
        }}>
          {tab === "pregunta"  && <TabPregunta />}
          {tab === "precio"    && <TabFibPrecio />}
          {tab === "tiempo"    && <TabFibTiempo />}
          {tab === "3metodos"  && <Tab3Metodos />}
          {tab === "cluster"   && <TabCluster />}
          {tab === "combo"     && <TabCombo />}
          {tab === "setup"     && <TabTuSetup />}
        </div>

        {/* PIE */}
        <div style={{
          padding: "10px 16px", borderRadius: 7,
          background: "rgba(255,255,255,0.015)",
          border: `1px solid ${C.border}`,
          fontSize: 9, color: C.muted, textAlign: "center", lineHeight: 2,
        }}>
          <span style={{color:C.price}}>PRECIO</span> = fibonacci vertical · zonas de soporte/resistencia
          &nbsp;·&nbsp;
          <span style={{color:C.time}}>TIEMPO</span> = fibonacci horizontal · ventanas de giro
          &nbsp;·&nbsp;
          <span style={{color:C.mom}}>MOMENTUM</span> = confirmación del giro · gatillo de entrada
          &nbsp;·&nbsp;
          <span style={{color:C.teal}}>CLUSTER</span> = convergencia = máxima probabilidad
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; }
        button { transition: all 0.18s; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #03071200; }
        ::-webkit-scrollbar-thumb { background: rgba(77,159,255,0.2); border-radius: 2px; }
      `}</style>
    </div>
  );
}

  function ChartBase({
  pathD,
  children,
  color,
}: {
  pathD: string;
  children: React.ReactNode;
  color: string;
}) {
  // Base del SVG (no son defaults de props; es el “contrato” del ChartBase)
  const W = 500;
  const H = 180;     // deja 20px aprox para etiquetas abajo (H+28 existe en tu UI)
  const maxB = 60;

  const bx = (b: number) => 20 + (b * (W - 40)) / maxB;

  return (
    <div
      style={{
        background: "rgba(3,7,18,0.85)",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "8px 6px 4px",
      }}
    >
      <svg viewBox="0 0 500 200" style={{ width: "100%" }}>
        {[40, 80, 120, 160].map((y) => (
          <line
            key={y}
            x1={20}
            y1={y}
            x2={W - 10}
            y2={y}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={1}
          />
        ))}

        <line
          x1={20}
          y1={H}
          x2={W - 10}
          y2={H}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1}
        />

        {Array.from({ length: maxB + 1 }, (_, i) =>
          i % 5 === 0 ? (
            <g key={i}>
              <line
                x1={bx(i)}
                y1={H}
                x2={bx(i)}
                y2={H + 4}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth={1}
              />
              <text
                x={bx(i)}
                y={H + 14}
                textAnchor="middle"
                fill={C.muted}
                fontSize={7}
                fontFamily="monospace"
              >
                {i}
              </text>
            </g>
          ) : null
        )}

        <text
          x={W / 2}
          y={H + 28}
          textAnchor="middle"
          fill={C.muted}
          fontSize={7.5}
          fontFamily="monospace"
          letterSpacing={1}
        >
          BARRAS →
        </text>

        <path d={pathD} fill="none" stroke={color} strokeWidth={2} />

        {children}
      </svg>
    </div>
  );
}
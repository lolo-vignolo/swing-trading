import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060b18] text-[#c8d8f0]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col gap-4">
          <div className="text-[10px] font-semibold tracking-[0.35em] text-[#5599ff]">
            ELLIOTT WAVES · MONER
          </div>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Biblioteca visual de patrones
          </h1>
          <p className="max-w-2xl text-sm text-[#8ea1c2] sm:text-base">
            Accede a las visualizaciones interactivas para estudiar la estructura de
            ondas impulsivas, la corrección ABC y la regla de superposición.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-4">
          <Link
            href="/elliott-full-cycle"
            className="group rounded-2xl border border-[#22335a] bg-gradient-to-br from-[#0c1326] to-[#0a1022] p-6 transition hover:border-[#3b5aa5]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a3f73] bg-[#0f1a36] px-3 py-1 text-[11px] font-semibold text-[#7fb2ff]">
              Vista completa
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              5 impulsos + ABC + Superposición
            </h2>
            <p className="text-sm text-[#8ea1c2]">
              Navega por el ciclo completo de Elliott, el zoom de la fase ABC y la
              regla clave de no superposición.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#6aa6ff]">
              Abrir pantalla
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </Link>

          <Link
            href="/elliott-superposition"
            className="group rounded-2xl border border-[#2b1f2a] bg-gradient-to-br from-[#140b14] to-[#1a0d12] p-6 transition hover:border-[#6e2f49]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4a2c3a] bg-[#1a0e16] px-3 py-1 text-[11px] font-semibold text-[#ff7aa2]">
              Regla crítica
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Patrón de superposición
            </h2>
            <p className="text-sm text-[#bfa7b4]">
              Compara escenarios con y sin solapamiento de la onda ④ sobre la onda ①
              para validar o invalidar el conteo.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#ff7aa2]">
              Abrir pantalla
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </Link>

          <Link
            href="/miner-dual-tf-system"
            className="group rounded-2xl border border-[#1c2a3b] bg-gradient-to-br from-[#0b111b] to-[#091019] p-6 transition hover:border-[#2e4968]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a3f55] bg-[#0e1724] px-3 py-1 text-[11px] font-semibold text-[#7fb2ff]">
              Sistema dual TF
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Miner Dual TF Momentum
            </h2>
            <p className="text-sm text-[#8ea1c2]">
              Comparación 30m vs 3m con MM30, MACD y Elliott para decidir entradas.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#7fb2ff]">
              Abrir pantalla
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </Link>

          <Link
            href="/fibonacci-dummies"
            className="group rounded-2xl border border-[#1c2a3b] bg-gradient-to-br from-[#0b111b] to-[#091019] p-6 transition hover:border-[#2e4968]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a3f55] bg-[#0e1724] px-3 py-1 text-[11px] font-semibold text-[#7fb2ff]">
              Fibonacci
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Fibonacci para Dummies
            </h2>
            <p className="text-sm text-[#8ea1c2]">
              Explicación completa de Fibonacci en trading sin complicaciones.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#7fb2ff]">
              Abrir pantalla
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </Link>

          <Link
            href="/miner-cap5-completo"
            className="group rounded-2xl border border-[#2b1f2a] bg-gradient-to-br from-[#140b14] to-[#1a0d12] p-6 transition hover:border-[#6e2f49]"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4a2c3a] bg-[#1a0e16] px-3 py-1 text-[11px] font-semibold text-[#ff7aa2]">
              Sistema completo
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Miner Fibonacci Completo
            </h2>
            <p className="text-sm text-[#bfa7b4]">
              Guía completa de Fibonacci de precio, tiempo y momentum con tabs interactivos.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#ff7aa2]">
              Abrir pantalla
              <span className="transition group-hover:translate-x-1">→</span>
            </div>
          </Link>
        </section>

        <section className="rounded-2xl border border-[#233054] bg-[#0b1326] p-6 text-sm text-[#8ea1c2]">
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#6aa6ff]">
            Guía rápida
          </div>
          Explora primero la vista completa para entender el ciclo y luego contrasta
          la regla de superposición en el módulo dedicado.
        </section>
      </main>
    </div>
  );
}

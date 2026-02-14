"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/elliott-full-cycle", label: "Ciclo 5+ABC" },
  { href: "/elliott-superposition", label: "Superposición" },
  { href: "/miner-dual-tf-system", label: "Dual TF" },
  { href: "/fibonacci-dummies", label: "Fibonacci" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050912]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-xs font-semibold tracking-[0.3em] text-[#7fb2ff]">
          MONER LAB
        </Link>

        <div className="hidden items-center gap-2 text-xs font-semibold text-[#9fb3cf] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-transparent px-3 py-2 transition hover:border-[#2a3f6a] hover:bg-[#0b1426] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-[#0b1426] px-3 py-2 text-[11px] font-semibold text-[#9fb3cf] transition hover:border-[#2a3f6a] hover:text-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      <div id="mobile-nav" className={`${open ? "block" : "hidden"} border-t border-white/10 bg-[#070c18] md:hidden`}>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-4 text-xs font-semibold text-[#9fb3cf]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg border border-transparent px-3 py-2 transition hover:border-[#2a3f6a] hover:bg-[#0b1426] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

// -----------------------------------------------------------------------------
// src/components/SiteFooter.jsx
// Rodapé institucional: logo + descrição + redes sociais, coluna de
// navegação, coluna de contato, e barra de direitos autorais no final.
// Fica dentro da Home, logo abaixo da faixa de marcas (BrandsMarquee).
// -----------------------------------------------------------------------------

import React from "react";
import { Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import {
  STORE_PHONES,
  STORE_EMAIL,
  STORE_ADDRESS,
  STORE_TAGLINE,
  INSTAGRAM_URL,
} from "../config/store";
import { buildWhatsAppLink, ATTENDANT_MESSAGE } from "../config/whatsapp";

const NAV_LINKS = [
  { key: "home", label: "Início" },
  { key: "products", label: "Produtos" },
  { key: "about", label: "Sobre nós" },
  { key: "contact", label: "Contato" },
];

export default function SiteFooter({ onNavigate, aboutRef, contactRef }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 mt-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Coluna 1: marca + redes sociais */}
        <div ref={aboutRef}>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/images/brand/samuka-store-logo.jpg"
              alt="Samuka Store"
              className="w-9 h-9 rounded-lg object-cover shrink-0"
            />
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-base text-white">SAMUKA</span>
              <span className="text-[9px] tracking-[0.2em] text-gold">
                STORE
              </span>
            </div>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-xs mb-4">
            {STORE_TAGLINE}
          </p>
          <div className="flex gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-gold transition-colors"
            >
              <span className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center">
                <Instagram size={16} />
              </span>
              <span className="text-[10px]">Instagram</span>
            </a>
            <a
              href={buildWhatsAppLink(ATTENDANT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 text-zinc-400 hover:text-gold transition-colors"
            >
              <span className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center">
                <MessageCircle size={16} />
              </span>
              <span className="text-[10px]">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Coluna 2: navegação */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-white mb-4">
            NAVEGAÇÃO
          </p>
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className="text-left text-sm text-zinc-400 hover:text-gold transition-colors w-fit"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Coluna 3: contato */}
        <div ref={contactRef}>
          <p className="text-xs font-semibold tracking-widest text-white mb-4">
            CONTATO
          </p>
          <div className="flex flex-col gap-3">
            {STORE_PHONES.map((phone) => (
              <div
                key={phone}
                className="flex items-center gap-2 text-sm text-zinc-400"
              >
                <Phone size={14} className="text-gold shrink-0" />
                {phone}
              </div>
            ))}
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Mail size={14} className="text-gold shrink-0" />
              {STORE_EMAIL}
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <MapPin size={14} className="text-gold shrink-0" />
              {STORE_ADDRESS}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-5">
        <p className="text-center text-xs text-zinc-600">
          © {year} Samuka Store — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

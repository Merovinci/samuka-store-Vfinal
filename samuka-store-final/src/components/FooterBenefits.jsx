// -----------------------------------------------------------------------------
// src/components/FooterBenefits.jsx
// Seção de rodapé com os 4 diferenciais da marca.
// -----------------------------------------------------------------------------

import React from "react";
import { Crown, Gem, ShieldCheck, Truck } from "lucide-react";

const BENEFITS = [
  {
    icon: Crown,
    title: "Qualidade Premium",
    text: "Peças selecionadas com materiais de alta qualidade e acabamento impecável.",
  },
  {
    icon: Gem,
    title: "Estilo Único",
    text: "Design exclusivo para quem valoriza atitude e autenticidade.",
  },
  {
    icon: ShieldCheck,
    title: "Compra Segura",
    text: "Ambiente 100% seguro e diversas formas de pagamento.",
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    text: "Receba seu pedido com agilidade e acompanhe tudo pelo app.",
  },
];

export default function FooterBenefits() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 px-4 md:px-8 py-10 md:py-14 border-t border-zinc-800 mt-4">
      {BENEFITS.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex flex-col gap-2">
          <Icon size={22} className="text-gold" strokeWidth={1.5} />
          <p className="text-xs font-semibold text-white">{title}</p>
          <p className="text-[11px] text-zinc-500 leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  );
}

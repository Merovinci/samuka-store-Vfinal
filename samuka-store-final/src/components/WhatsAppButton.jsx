// -----------------------------------------------------------------------------
// src/components/WhatsAppButton.jsx
// Botão flutuante "Precisa de ajuda? Falar com um atendente" — visível em
// todas as telas (exceto a splash), fixo no canto inferior direito da
// viewport. Padrão comum de e-commerce, funciona igual em mobile e desktop.
// -----------------------------------------------------------------------------

import React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, ATTENDANT_MESSAGE } from "../config/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsAppLink(ATTENDANT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-lg shadow-black/50 rounded-full px-4 py-3 transition-transform hover:scale-105"
      aria-label="Falar com um atendente pelo WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline text-sm font-semibold">
        Precisa de ajuda?
      </span>
    </a>
  );
}

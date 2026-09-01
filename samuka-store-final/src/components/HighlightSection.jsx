// -----------------------------------------------------------------------------
// src/components/HighlightSection.jsx
// Faixa horizontal reutilizável usada tanto em "Destaques da Semana" quanto
// em "Mais Vendidos" — só muda o título, o texto de destaque (kicker) e a
// lista de produtos que recebe.
// -----------------------------------------------------------------------------
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductHighlightCard from "./ProductHighlightCard";

export default function HighlightSection({
  kicker,
  title,
  products,
  onOpenDetail,
}) {
  const scrollRef = useRef(null);

  if (!products || products.length === 0) return null;

  // Função para rolar o carrossel lateralmente
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320; // Distância em pixels para rolar
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-end justify-between px-4 md:px-8 mb-4">
        <div>
          {kicker && (
            <p className="text-amber-500 text-xs font-semibold tracking-wide mb-1">
              {kicker}
            </p>
          )}
          <h3 className="text-xl md:text-2xl font-serif text-white">
            {title}
          </h3>
        </div>

        {/* Setas de navegação para rolar lateralmente */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="p-1.5 rounded-full border border-zinc-700 text-zinc-400 hover:text-gold hover:border-gold transition-colors"
            aria-label="Rolar para esquerda"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="p-1.5 rounded-full border border-zinc-700 text-zinc-400 hover:text-gold hover:border-gold transition-colors"
            aria-label="Rolar para direita"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Contêiner de produtos com suporte à rolagem suave */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar px-4 md:px-8 pb-1 scroll-smooth"
      >
        {products.map((product) => (
          <ProductHighlightCard
            key={product.id}
            product={product}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// src/components/HighlightSection.jsx
// Faixa horizontal reutilizável usada tanto em "Destaques da Semana" quanto
// em "Mais Vendidos" — só muda o título, o texto de destaque (kicker) e a
// lista de produtos que recebe.
// -----------------------------------------------------------------------------

import React from "react";
import { ArrowRight } from "lucide-react";
import ProductHighlightCard from "./ProductHighlightCard";

export default function HighlightSection({
  kicker,
  title,
  products,
  onOpenDetail,
  onSeeAll,
}) {
  if (!products || products.length === 0) return null;

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
        <button
          onClick={onSeeAll}
          className="hidden sm:flex items-center gap-1 text-xs text-zinc-400 hover:text-gold transition-colors shrink-0"
        >
          Nossos Produtos <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar px-4 md:px-8 pb-1">
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

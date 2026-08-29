// -----------------------------------------------------------------------------
// src/components/ProductHighlightCard.jsx
// Card usado nas faixas horizontais "Destaques da Semana" e "Mais Vendidos":
// imagem com selo (MAIS VENDIDO / LANÇAMENTO), categoria, nome, preço e
// parcelamento — mesmo padrão visual do print de referência.
// -----------------------------------------------------------------------------

import React from "react";
import { CATEGORIES, BADGE_LABELS, formatBRL } from "../data/products";
import ProductImage from "./ProductImage";

export default function ProductHighlightCard({ product, onOpenDetail }) {
  const categoryLabel =
    CATEGORIES.find((c) => c.id === product.category)?.label ?? "";
  const installment = formatBRL(product.price / 12);

  return (
    <button
      onClick={() => onOpenDetail(product)}
      className="text-left bg-bg-soft border border-zinc-800 rounded-2xl overflow-hidden hover:border-gold/50 transition-colors shrink-0 w-[190px] sm:w-[220px]"
    >
      <div className="relative">
        <ProductImage product={product} className="aspect-square" />
        {product.badge && (
          <span className="absolute top-2 left-2 bg-black/85 text-white text-[9px] font-semibold px-2 py-1 rounded-md tracking-wide">
            {BADGE_LABELS[product.badge]}
          </span>
        )}
      </div>
      <div className="p-3">
        <p className="text-[10px] text-gold uppercase tracking-wide mb-1">
          {categoryLabel}
        </p>
        <p className="text-xs text-white leading-snug mb-2 line-clamp-2">
          {product.name}
        </p>
        <p className="text-sm font-semibold text-white">
          {formatBRL(product.price)}
        </p>
        <p className="text-[10px] text-zinc-500">
          ou 12x de {installment}
        </p>
      </div>
    </button>
  );
}

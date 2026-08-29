// -----------------------------------------------------------------------------
// src/components/ProductDetail.jsx
// View completa da Página de Detalhes do Produto (PDP): imagem real
// expandida (sincronizada com a cor selecionada), avaliação, seletor de
// cor/tamanho e CTA "Adicionar ao Carrinho".
//
// Responsivo: no celular é uma coluna só (imagem em cima, infos embaixo,
// como um app). A partir do "md" (tablet/desktop) vira duas colunas lado a
// lado — imagem à esquerda (fixa ao rolar), informações à direita — pra
// aproveitar telas largas em vez de deixar tudo espremido no centro.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { ChevronLeft, Share2, Heart, Star, Check } from "lucide-react";
import { COLOR_PALETTE, formatBRL } from "../data/products";
import ProductImage from "./ProductImage";

export default function ProductDetail({
  product,
  isFavorite,
  onToggleFavorite,
  onBack,
  onAddToCart,
}) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(
    product.sizes[Math.floor(product.sizes.length / 2)]
  );
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({ ...product, color, size });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto md:pt-6">
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
        <div className="flex items-center gap-3">
          <Share2 size={18} className="text-white" />
          <button onClick={() => onToggleFavorite(product.id)}>
            <Heart
              size={18}
              className={isFavorite ? "text-gold" : "text-white"}
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      <div className="md:flex md:gap-10 md:items-start md:px-8">
        {/* Imagem real da PDP — troca junto com a cor selecionada ao lado.
            No desktop fica fixa (sticky) enquanto o usuário rola as infos. */}
        <ProductImage
          product={product}
          selectedColor={color}
          className="w-full aspect-square mx-auto md:w-[45%] md:rounded-2xl md:sticky md:top-24"
          iconSize={64}
        />

        <div className="px-4 md:px-0 py-5 md:py-2 md:flex-1 md:max-w-lg">
          <h2 className="text-lg md:text-2xl font-semibold text-white">
            {product.name}
          </h2>

          <div className="flex items-center justify-between mt-1 mb-3">
            <p className="text-gold text-xl md:text-2xl font-bold">
              {formatBRL(product.price)}
            </p>
            <div className="flex items-center gap-1">
              <div className="flex text-gold">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={
                      i <= Math.round(product.rating) ? "currentColor" : "none"
                    }
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-500">
                ({product.reviews})
              </span>
            </div>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed mb-5">
            {product.description}
          </p>

          <p className="text-xs text-zinc-500 mb-2 tracking-wide">
            COR: <span className="text-white">{color}</span>
          </p>
          <div className="flex gap-2 mb-5">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ backgroundColor: COLOR_PALETTE[c] }}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === c ? "border-gold" : "border-zinc-700"
                }`}
                title={c}
              />
            ))}
          </div>

          <p className="text-xs text-zinc-500 mb-2 tracking-wide">TAMANHO</p>
          <div className="flex gap-2 mb-8 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1.5 rounded-lg text-xs border ${
                  size === s
                    ? "bg-gold text-black border-gold font-semibold"
                    : "border-zinc-700 text-zinc-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-gold hover:bg-gold-light transition-colors text-black font-semibold py-3 rounded-full flex items-center justify-center gap-2"
          >
            {added ? (
              <>
                <Check size={18} /> Adicionado!
              </>
            ) : (
              "Adicionar ao Carrinho"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

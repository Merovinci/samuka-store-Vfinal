// -----------------------------------------------------------------------------
// src/components/ProductImage.jsx
// Componente único de imagem de produto, reutilizado em ProductCard,
// ProductDetail e no item do carrinho (App.jsx) — antes essa lógica estava
// duplicada em 3 lugares como uma div com gradiente.
//
// Comportamento:
// - Se product.images[selectedColor] existir E carregar com sucesso -> mostra a foto real.
// - Se não existir, ou o arquivo der 404/erro -> cai no fallback elegante
//   (gradiente + ícone), sem nunca deixar um "ícone de imagem quebrada"
//   aparecer para o usuário.
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { Shirt } from "lucide-react";

export default function ProductImage({
  product,
  selectedColor,
  className = "",
  iconSize = 38,
}) {
  const color = selectedColor || product.colors?.[0];
  const src = product.images?.[color];
  const [failed, setFailed] = useState(false);

  // Reseta o estado de erro sempre que a cor (e portanto a URL) muda,
  // pra dar chance da nova foto tentar carregar.
  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showRealImage = Boolean(src) && !failed;

  if (showRealImage) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={src}
          alt={`${product.name} - ${color}`}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Fallback: gradiente premium + ícone (mesma identidade visual de antes)
  return (
    <div
      className={`bg-gradient-to-br ${
        product.fallbackGradient || "from-zinc-800 to-zinc-950"
      } flex items-center justify-center ${className}`}
    >
      <Shirt className="text-gold/70" size={iconSize} strokeWidth={1.25} />
    </div>
  );
}

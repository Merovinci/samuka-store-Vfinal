// -----------------------------------------------------------------------------
// src/components/BrandsMarquee.jsx
// Faixa rotativa do rodapé — rolagem horizontal infinita, em CSS puro
// (sem lib de animação): duplicamos a lista uma vez e animamos de 0% até
// -50% da largura (que é exatamente uma cópia da lista original), criando
// um loop perfeito e sem "salto" visível. Pausa ao passar o mouse.
//
// Cada item tenta mostrar a logo real (public/images/brands/<slug>.png);
// se o arquivo não existir, cai automaticamente no nome em texto.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { brands } from "../data/brands";

function BrandLogo({ brand }) {
  const [failed, setFailed] = useState(false);

  if (!failed) {
    return (
      <img
        src={`/images/brands/${brand.slug}.png`}
        alt={brand.name}
        onError={() => setFailed(true)}
        className="h-20 md:h-20 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale"
      />
    );
  }

  return (
    <span className="text-zinc-500 text-lg md:text-xl font-serif tracking-wide whitespace-nowrap">
      {brand.name}
    </span>
  );
}

export default function BrandsMarquee() {
  // Duplicado pra dar continuidade ao loop (ver explicação acima)
  const track = [...brands, ...brands];

  return (
    <div className="border-t border-zinc-800 py-8">
      <p className="text-center text-[11px] tracking-[0.3em] text-zinc-500 mb-6">
        NOSSAS MARCAS
      </p>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex items-center gap-14 w-max animate-[marquee_22s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((brand, i) => (
            <BrandLogo key={`${brand.slug}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </div>
  );
}

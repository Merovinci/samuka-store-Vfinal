// -----------------------------------------------------------------------------
// src/components/HeroBanner.jsx
// Banner rotativo da Home: troca de slide sozinho a cada 3 segundos, com
// setas de navegação manual e bolinhas indicadoras (clicáveis). Pausa
// automaticamente enquanto o usuário passa o mouse por cima.
//
// Se o slide tiver uma foto real (public/images/banners/...) ela é usada;
// se a foto ainda não existir, cai no gradiente premium — igual ao sistema
// já usado nos cards de produto, então nada quebra visualmente.
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { banners } from "../data/banners";

const AUTO_PLAY_MS = 3000;

export default function HeroBanner({ onSelectCategory }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failedImages, setFailedImages] = useState({});

  // Auto-play: avança um slide a cada 3s, a menos que esteja pausado
  // (mouse em cima) ou que só exista um slide.
  useEffect(() => {
    if (paused || banners.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const goTo = (i) => setIndex((i + banners.length) % banners.length);

  const slide = banners[index];
  const showImage = Boolean(slide.image) && !failedImages[slide.id];

  return (
    <div
      className="relative mx-4 md:mx-8 mt-4 rounded-2xl overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] w-full ${
          showImage ? "" : `bg-gradient-to-br ${slide.fallbackGradient}`
        }`}
      >
        {showImage && (
          <img
            src={slide.image}
            alt={slide.title}
            onError={() =>
              setFailedImages((prev) => ({ ...prev, [slide.id]: true }))
            }
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Escurece a base da imagem pra garantir legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <span className="inline-block w-fit text-[10px] tracking-widest text-gold border border-gold/40 rounded-full px-2 py-0.5 mb-3">
            {slide.tag}
          </span>
          <h2 className="text-2xl md:text-4xl font-serif text-white leading-tight mb-1 max-w-md">
            {slide.title}
          </h2>
          <p className="text-xs md:text-sm text-zinc-300 mb-4 max-w-xs md:max-w-md">
            {slide.subtitle}
          </p>
          <button
            onClick={() => onSelectCategory(slide.ctaCategory)}
            className="bg-gold hover:bg-gold-light transition-colors text-black text-xs md:text-sm font-semibold px-4 py-2 rounded-full w-fit"
          >
            {slide.ctaLabel}
          </button>
        </div>
      </div>

      {/* Setas de navegação manual */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Slide anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Próximo slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <ChevronRight size={18} className="text-white" />
          </button>

          {/* Indicadores (bolinhas) clicáveis */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {banners.map((b, i) => (
              <button
                key={b.id}
                onClick={() => goTo(i)}
                aria-label={`Ir para o slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-gold" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

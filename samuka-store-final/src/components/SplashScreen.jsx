// -----------------------------------------------------------------------------
// src/components/SplashScreen.jsx
// Tela de abertura premium: logo oficial em destaque, com animação suave de
// entrada (fade + scale), seguida do slogan, e transição automática para a
// Home. Puro CSS/Tailwind (sem lib de animação) — leve e rápido.
//
// A splash é renderizada como um overlay (position: fixed) por cima do app,
// que já carregou normalmente por trás — então a transição pra Home é
// instantânea e nada trava o carregamento do site.
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";

const AUTO_EXIT_MS = 3000; // início do fade-out
const AUTO_FINISH_MS = 3500; // remove a splash da árvore (após o fade)

export default function SplashScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), AUTO_EXIT_MS);
    const finishTimer = setTimeout(onFinish, AUTO_FINISH_MS);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  const skip = () => {
    setExiting(true);
    setTimeout(onFinish, 400);
  };

  return (
    <div
      onClick={skip}
      className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center px-8 cursor-pointer transition-opacity duration-500 ease-out ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/25 via-black to-black" />

      <img
        src="/images/brand/samuka-store-logo.jpg"
        alt="Samuka Store"
        className="relative w-44 sm:w-56 md:w-64 rounded-2xl opacity-0 animate-[logoIntro_1.1s_ease-out_forwards]"
      />

      <p className="relative mt-7 text-[11px] sm:text-xs tracking-[0.3em] text-zinc-400 text-center opacity-0 animate-[taglineIntro_0.9s_ease-out_1s_forwards]">
        ESTILO QUE IMPÕE. QUALIDADE QUE FICA.
      </p>

      <p className="relative mt-12 text-[10px] text-zinc-600 opacity-0 animate-[taglineIntro_0.9s_ease-out_1.8s_forwards]">
        toque para continuar
      </p>
    </div>
  );
}

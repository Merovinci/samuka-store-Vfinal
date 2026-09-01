// -----------------------------------------------------------------------------
// src/components/CategoryFilter.jsx
// Barra de categorias em formato de bolinha com foto (estilo "destaques"),
// e, quando "Acessórios" está ativo, uma segunda barra com as subcategorias
// (Bonés, Correntes, Óculos, Pulseiras, Cintos). Alterna dinamicamente os
// produtos exibidos via callbacks controlados pelo componente pai (App.jsx).
//
// Cada categoria pode ter uma foto real (product.image). Se o arquivo ainda
// não existir, cai automaticamente no ícone + fundo escuro — mesma lógica
// de fallback usada em ProductImage/HeroBanner, só que simplificada aqui.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
// 1. Importamos o LayoutGrid (ícone de bloquinhos)
import { Shirt, Layers, Gem, LayoutGrid } from "lucide-react";
import { CATEGORIES, ACCESSORY_SUBCATEGORIES } from "../data/products";

// Ícone de fallback por categoria
const CATEGORY_ICONS = {
  todas: LayoutGrid, // 2. Definido para o ícone de bloquinhos empilhados!
  camisetas: Shirt,
  moletons: Shirt,
  calcas: Layers,
  jaquetas: Shirt,
  acessorios: Gem,
};

function CategoryCircle({ category, isActive, onClick }) {
  const [imgFailed, setImgFailed] = useState(false);
  const Icon = CATEGORY_ICONS[category.id] || Shirt;
  const showImage = Boolean(category.image) && !imgFailed;

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 shrink-0 w-16"
    >
      <div
        className={`w-14 h-14 rounded-full overflow-hidden flex items-center justify-center transition-all ${
          isActive
            ? "ring-2 ring-gold"
            : "ring-1 ring-zinc-700"
        } ${showImage ? "" : "bg-bg-soft"}`}
      >
        {showImage ? (
          <img
            src={category.image}
            alt={category.label}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <Icon size={22} className="text-gold" strokeWidth={1.5} />
        )}
      </div>
      <span
        className={`text-[11px] text-center leading-tight ${
          isActive ? "text-gold font-semibold" : "text-zinc-400"
        }`}
      >
        {category.label}
      </span>
    </button>
  );
}

export default function CategoryFilter({
  activeCategory,
  onSelectCategory,
  activeSubcategory,
  onSelectSubcategory,
}) {
  return (
    <div>
      {/* Categorias principais — bolinhas com foto */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 md:px-8 pb-4">
        <CategoryCircle
          category={{ id: "todas", label: "Todas" }}
          isActive={!activeCategory}
          onClick={() => {
            onSelectCategory(null);
            onSelectSubcategory(null);
          }}
        />
        {CATEGORIES.map((c) => (
          <CategoryCircle
            key={c.id}
            category={c}
            isActive={activeCategory === c.id}
            onClick={() => {
              onSelectCategory(c.id);
              onSelectSubcategory(null);
            }}
          />
        ))}
      </div>

      {/* Subcategorias de acessórios — mantidas como pills de texto */}
      {activeCategory === "acessorios" && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 md:px-8 pb-4">
          <button
            onClick={() => onSelectSubcategory(null)}
            className={`px-3 py-1 rounded-full text-[11px] shrink-0 border transition-colors ${
              !activeSubcategory
                ? "border-gold text-gold"
                : "border-zinc-800 text-zinc-500"
            }`}
          >
            Todos
          </button>
          {ACCESSORY_SUBCATEGORIES.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectSubcategory(s.id)}
              className={`px-3 py-1 rounded-full text-[11px] shrink-0 border transition-colors ${
                activeSubcategory === s.id
                  ? "border-gold text-gold"
                  : "border-zinc-800 text-zinc-500"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

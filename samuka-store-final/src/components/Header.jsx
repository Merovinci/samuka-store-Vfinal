// -----------------------------------------------------------------------------
// src/components/Header.jsx
// Barra superior fixa: logo "SAMUKA STORE" (com imagem), links de navegação
// (desktop), busca expansível, favoritos/carrinho com contadores e o botão
// de destaque "Comprar Agora".
//
// Tudo que já existia (busca, favoritos, carrinho) continua igual — só foi
// adicionada a logo, a navegação e o botão novo.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import { Search, Heart, ShoppingBag, X } from "lucide-react";

const NAV_LINKS = [
  { key: "home", label: "Início" },
  { key: "products", label: "Produtos" },
  { key: "about", label: "Sobre" },
  { key: "contact", label: "Contato" },
];

export default function Header({
  onLogoClick,
  onCartClick,
  onFavoritesClick,
  onNavigate,
  cartCount,
  favoritesCount,
  searchQuery,
  onSearchChange,
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="sticky top-0 z-20 bg-black/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3 gap-3">
        {searchOpen ? (
          <div className="flex-1 flex items-center gap-2">
            <Search size={16} className="text-zinc-500 shrink-0" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar produtos..."
              className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                onSearchChange("");
              }}
            >
              <X size={18} className="text-zinc-500" />
            </button>
          </div>
        ) : (
          <>
            {/* Logo + wordmark */}
            <button
              onClick={onLogoClick}
              className="flex items-center gap-2 shrink-0"
            >
              <img
                src="/images/brand/samuka-store-logo.jpg"
                alt="Samuka Store"
                className="w-9 h-9 rounded-lg object-cover"
              />
              <span className="flex items-baseline gap-1">
                <span className="font-serif text-lg tracking-wide text-white">
                  SAMUKA
                </span>
                <span className="text-[10px] tracking-[0.2em] text-gold">
                  STORE
                </span>
              </span>
            </button>

            {/* Navegação — só a partir do desktop, pra não apertar o mobile */}
            {onNavigate && (
              <nav className="hidden md:flex items-center gap-8 mx-auto">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.key}
                    onClick={() => onNavigate(link.key)}
                    className="text-sm text-zinc-300 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-4 md:ml-0 ml-auto">
              <button onClick={() => setSearchOpen(true)}>
                <Search size={20} className="text-white" />
              </button>

              <button onClick={onFavoritesClick} className="relative">
                <Heart size={20} className="text-white" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              <button onClick={onCartClick} className="relative">
                <ShoppingBag size={20} className="text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Botão de destaque — visível a partir do "sm" pra não
                  apertar telas muito pequenas (o ícone do carrinho acima
                  já cobre a ação no mobile) */}
              <button
                onClick={onCartClick}
                className="hidden sm:flex items-center gap-2 bg-white text-black text-xs font-semibold px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors relative"
              >
                Comprar Agora
                {cartCount > 0 && (
                  <span className="bg-gold text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// src/App.jsx
// Componente principal: centraliza os estados (currentScreen, selectedCategory,
// cart, favorites, selectedProduct) e integra Header, CategoryFilter,
// ProductCard, ProductDetail, FooterBenefits, SplashScreen e WhatsAppButton
// em uma navegação por estado (SPA), sem reload de página.
// -----------------------------------------------------------------------------

import React, { useMemo, useRef, useState } from "react";
import { ShoppingBag, Heart, X, Minus, Plus, MessageCircle } from "lucide-react";
import { products } from "./data/products";
import { buildWhatsAppLink, buildCartMessage } from "./config/whatsapp";

import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import HighlightSection from "./components/HighlightSection";
import CategoryFilter from "./components/CategoryFilter";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import ProductImage from "./components/ProductImage";
import FooterBenefits from "./components/FooterBenefits";
import BrandsMarquee from "./components/BrandsMarquee";
import SiteFooter from "./components/SiteFooter";
import SplashScreen from "./components/SplashScreen";
import WhatsAppButton from "./components/WhatsAppButton";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedSubcategory && p.subcategory !== selectedSubcategory)
        return false;
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedSubcategory, searchQuery]);

  // Lógica de Destaques: ajuste a quantidade máxima por categoria aqui abaixo
  const featuredProductsList = useMemo(() => {
    const categoryLimits = {
      camisetas: 2,  // Aparecem até 2 camisetas
      tenis: 1,      // Apenas 1 tênis
      jaquetas: 1,   // Apenas 1 jaqueta
      moletons: 1,   // Apenas 1 moletom
      acessorios: 1, // Apenas 1 acessório
    };

    const categoryCounts = {};

    return products.filter((product) => {
      if (!product.featured) return false;

      const cat = product.category;
      // Se a categoria não estiver listada no objeto acima, o limite padrão será 1
      const maxAllowed = categoryLimits[cat] ?? 1;

      categoryCounts[cat] = categoryCounts[cat] || 0;

      if (categoryCounts[cat] < maxAllowed) {
        categoryCounts[cat] += 1;
        return true;
      }

      return false;
    });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addToCart = (item) => {
    const key = `${item.id}-${item.color}-${item.size}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, key, qty: 1 }];
    });
  };

  const updateCartQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (key) =>
    setCart((prev) => prev.filter((item) => item.key !== key));

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentScreen("product");
  };

  const handleBannerCta = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
  };

  const catalogRef = useRef(null);
  const footerAboutRef = useRef(null);
  const footerContactRef = useRef(null);

  const handleNavigate = (target) => {
    setCurrentScreen("home");

    if (target === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const refByTarget = {
      products: catalogRef,
      about: footerAboutRef,
      contact: footerContactRef,
    };
    const ref = refByTarget[target];
    setTimeout(() => {
      ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const confirmOrderSent = () => {
    setCart([]);
    setCurrentScreen("home");
  };

  const favoriteProducts = products.filter((p) => favorites.has(p.id));
  const bestSellerProducts = products.filter((p) => p.badge === "bestseller");
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans relative">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <Header
        onLogoClick={() => setCurrentScreen("home")}
        onCartClick={() => setCurrentScreen("cart")}
        onFavoritesClick={() => setCurrentScreen("favorites")}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        favoritesCount={favorites.size}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentScreen("home");
        }}
      />

      <div className="flex-1 pb-20">
        {/* ---------------- HOME ---------------- */}
        {currentScreen === "home" && (
          <div className="max-w-7xl mx-auto">
            <HeroBanner onSelectCategory={handleBannerCta} />

            <HighlightSection
              kicker="🔥 EM ALTA"
              title="Destaques da Semana"
              products={featuredProductsList}
              onOpenDetail={openProductDetail}
              onSeeAll={() => handleBannerCta(null)}
            />

            <HighlightSection
              kicker="DESTAQUES"
              title="Mais Vendidos"
              products={bestSellerProducts}
              onOpenDetail={openProductDetail}
              onSeeAll={() => handleBannerCta(null)}
            />

            <div className="pt-4" ref={catalogRef}>
              <CategoryFilter
                activeCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                activeSubcategory={selectedSubcategory}
                onSelectSubcategory={setSelectedSubcategory}
              />
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-zinc-500 text-sm py-16">
                Nenhum produto encontrado.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-5 px-4 md:px-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.has(product.id)}
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                    onOpenDetail={openProductDetail}
                  />
                ))}
              </div>
            )}

            <FooterBenefits />
            <BrandsMarquee />
            <SiteFooter
              onNavigate={handleNavigate}
              aboutRef={footerAboutRef}
              contactRef={footerContactRef}
            />
          </div>
        )}

        {/* ---------------- PRODUTO (PDP) ---------------- */}
        {currentScreen === "product" && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            isFavorite={favorites.has(selectedProduct.id)}
            onToggleFavorite={toggleFavorite}
            onBack={() => setCurrentScreen("home")}
            onAddToCart={addToCart}
          />
        )}

        {/* ---------------- CARRINHO ---------------- */}
        {currentScreen === "cart" && (
          <div className="max-w-2xl mx-auto px-4 md:px-8 py-4">
            <h2 className="text-lg font-semibold text-white mb-4">
              Meu Carrinho
            </h2>
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag size={36} className="text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm">
                  Seu carrinho está vazio.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.key}
                      className="flex gap-3 bg-bg-soft border border-zinc-800 rounded-2xl p-3"
                    >
                      <ProductImage
                        product={item}
                        selectedColor={item.color}
                        className="w-16 h-16 rounded-xl shrink-0"
                        iconSize={20}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-sm text-white truncate">
                            {item.name}
                          </p>
                          <button onClick={() => removeFromCart(item.key)}>
                            <X size={16} className="text-zinc-500" />
                          </button>
                        </div>
                        <p className="text-[11px] text-zinc-500 mb-2">
                          {item.color} · {item.size}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-black rounded-full px-2 py-1">
                            <button onClick={() => updateCartQty(item.key, -1)}>
                              <Minus size={12} className="text-zinc-400" />
                            </button>
                            <span className="text-xs text-white w-4 text-center">
                              {item.qty}
                            </span>
                            <button onClick={() => updateCartQty(item.key, 1)}>
                              <Plus size={12} className="text-zinc-400" />
                            </button>
                          </div>
                          <p className="text-gold text-sm font-semibold">
                            {(item.price * item.qty).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-base font-semibold text-white mb-5">
                  <span>Total</span>
                  <span className="text-gold">
                    {cartTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>

                <a
                  href={buildWhatsAppLink(buildCartMessage(cart))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe5b] transition-colors text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2"
                >
                  <MessageCircle size={18} /> Finalizar pedido pelo WhatsApp
                </a>

                <button
                  onClick={confirmOrderSent}
                  className="w-full mt-3 text-xs text-zinc-500 underline underline-offset-4"
                >
                  Já enviei meu pedido? Esvaziar carrinho
                </button>
              </>
            )}
          </div>
        )}

        {/* ---------------- FAVORITOS ---------------- */}
        {currentScreen === "favorites" && (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <h2 className="text-lg font-semibold text-white mb-4">
              Favoritos
            </h2>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-20">
                <Heart size={36} className="text-zinc-700 mx-auto mb-3" />
                <p className="text-zinc-500 text-sm">
                  Você ainda não favoritou nenhum produto.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
                {favoriteProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite
                    onToggleFavorite={toggleFavorite}
                    onAddToCart={addToCart}
                    onOpenDetail={openProductDetail}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <WhatsAppButton />
    </div>
  );
}

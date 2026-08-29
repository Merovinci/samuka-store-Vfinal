# Samuka Store

E-commerce SPA (React + Vite + Tailwind CSS) da marca **Samuka Store** — "Estilo que impõe. Qualidade que fica."

## 📁 Estrutura

```
samuka-store/
├── src/
│   ├── data/
│   │   └── products.js          # catálogo mockado + categorias
│   ├── components/
│   │   ├── Header.jsx           # logo, busca, carrinho/favoritos
│   │   ├── CategoryFilter.jsx   # filtro de categorias/subcategorias
│   │   ├── ProductCard.jsx      # card com seletor rápido de cor
│   │   ├── ProductDetail.jsx    # PDP completa
│   │   └── FooterBenefits.jsx   # 4 diferenciais da marca
│   ├── App.jsx                  # estados globais e navegação (SPA)
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🚀 Como executar localmente

```bash
git clone <url-do-seu-repositorio>
cd samuka-store
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## 🧠 Estados principais (`App.jsx`)

| Estado | Função |
|---|---|
| `currentScreen` | `"home" \| "product" \| "cart" \| "favorites"` |
| `selectedCategory` / `selectedSubcategory` | filtros ativos passados ao `CategoryFilter` |
| `selectedProduct` | produto exibido na PDP |
| `cart` | array de itens `{ ...produto, color, size, qty, key }` |
| `favorites` | `Set` de ids favoritados |

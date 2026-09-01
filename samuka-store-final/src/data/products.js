// -----------------------------------------------------------------------------
// src/data/products.js
// Catálogo mockado da Samuka Store: vestuário + acessórios.
//
// SISTEMA DE IMAGENS (NOVO)
// Cada produto tem `images`: um objeto { NomeDaCor: "/caminho/da/foto.jpg" }.
// A pasta oficial das fotos fica em: public/images/products/<slug>/<cor>.jpg
// (tudo minúsculo, sem acento — ex: "preto.jpg", "dourado.jpg").
//
// Se a foto de uma cor ainda não existir (arquivo 404) ou o campo `images`
// estiver vazio, o componente <ProductImage> cai automaticamente no
// `fallbackGradient` + ícone — por isso está OK deixar produtos sem foto
// por enquanto, o app não quebra.
//
// COMO ADICIONAR UMA FOTO NOVA:
// 1. Salve o arquivo em public/images/products/<slug-do-produto>/<cor>.jpg
// 2. Não precisa mexer neste arquivo se o produto já foi criado com
//    imagesFor(slug, colors) — o caminho já está previsto. Basta colocar
//    o arquivo na pasta certa com o nome certo.
// -----------------------------------------------------------------------------

// `image`: foto real da categoria (círculo abaixo do banner). Segue o
// mesmo esquema dos produtos — se o arquivo ainda não existir em
// public/images/categories/<id>.jpg, o CategoryFilter cai automaticamente
// no ícone + fundo escuro como fallback (nada quebra visualmente).
export const CATEGORIES = [
  { id: "camisetas", label: "Camisetas", image: "/images/categories/camisetas.jpg" },
  { id: "moletons", label: "Moletons", image: "/images/categories/moletons.jpg" },
  { id: "calcas", label: "Calças", image: "/images/categories/calcas.jpg" },
  { id: "jaquetas", label: "Jaquetas", image: "/images/categories/jaquetas.jpg" },
  { id: "acessorios", label: "Acessórios", image: "/images/categories/acessorios.jpg" },
  { id: "tenis", label: "Tênis", image: "/images/categories/tenis.jpg" },
];

export const ACCESSORY_SUBCATEGORIES = [
  { id: "bones", label: "Bonés" },
  { id: "correntes", label: "Correntes" },
  { id: "oculos", label: "Óculos" },
  { id: "pulseiras", label: "Pulseiras" },
  { id: "cintos", label: "Cintos" },
];

// Rótulo exibido no selo do card conforme o campo `badge` do produto
// ("bestseller" | "new"). Produtos sem `badge` simplesmente não mostram selo.
export const BADGE_LABELS = {
  bestseller: "MAIS VENDIDO",
  new: "LANÇAMENTO",
};

export const COLOR_PALETTE = {
  Preto: "#1a1a1a",
  Branco: "#f2f2f2",
  Cinza: "#7d7d7d",
  Dourado: "#c9a227",
  Prata: "#c0c0c0",
  Verde: "#22543d",
  Bege: "#d8c7a8",
  Azul: "#0000FF",
};

// Gera o mapa { Cor: "/images/products/slug/cor.jpg" } automaticamente,
// seguindo sempre a mesma convenção de pastas/nomes.
export const imagesFor = (slug, colors) =>
  Object.fromEntries(
    colors.map((color) => [
      color,
      `/images/products/${slug}/${color.toLowerCase()}.jpg`,
    ])
  );

export const products = [
  // CAMISETAS
  {
    id: 1,
    name: "Camiseta Nike",
    slug: "camiseta-essential",
    badge: "bestseller",
    featured: true,
    category: "camisetas",
    price: 89.9,
    images: imagesFor("camiseta-essential", ["Preto", "Branco", "Cinza"]),
    fallbackGradient: "from-zinc-800 to-zinc-950",
    colors: ["Preto", "Branco", "Cinza"],
    sizes: ["P", "M", "G", "GG", "XG"],
    description:
      "Confeccionada em algodão premium. Toque macio, caimento perfeito e acabamento de alto padrão.",
    rating: 4.8,
    reviews: 128,
  },
  {
    id: 2,
    name: "Camiseta Clean",
    slug: "camiseta-clean",
    category: "camisetas",
    price: 159.9,
    images: imagesFor("camiseta-clean", ["Branco", "Bege"]),
    fallbackGradient: "from-stone-200 to-stone-400",
    colors: ["Branco", "Bege"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Corte reto minimalista com tecido respirável. Ideal para o dia a dia com estilo.",
    rating: 4.7,
    reviews: 94,
  },
  {
    id: 3,
    name: "Camiseta Oversized",
    slug: "camiseta-oversized",
    badge: "bestseller",
    featured: true,
    category: "camisetas",
    price: 169.9,
    images: imagesFor("camiseta-oversized", ["Preto", "Bege"]),
    fallbackGradient: "from-amber-700 to-zinc-900",
    colors: ["Preto", "Bege"],
    sizes: ["P", "M", "G", "GG", "XG"],
    description:
      "Modelagem oversized street style, ombro caído e malha encorpada.",
    rating: 4.9,
    reviews: 201,
  },
  {
    id: 4,
    name: "Camiseta Signature",
    slug: "camiseta-signature",
    badge: "bestseller",
    featured: true,
    category: "camisetas",
    price: 179.9,
    images: imagesFor("camiseta-signature", ["Preto", "Cinza"]),
    fallbackGradient: "from-zinc-700 to-zinc-950",
    colors: ["Preto", "Cinza"],
    sizes: ["M", "G", "GG", "XG"],
    description:
      "Bordado dourado exclusivo Samuka. Peça de assinatura, edição limitada.",
    rating: 5.0,
    reviews: 63,
  },
  // MOLETONS
  {
    id: 5,
    name: "Moletom Premium",
    slug: "moletom-premium",
    category: "moletons",
    price: 299.9,
    images: imagesFor("moletom-premium", ["Preto", "Cinza"]),
    fallbackGradient: "from-zinc-800 to-black",
    colors: ["Preto", "Cinza"],
    sizes: ["P", "M", "G", "GG", "XG"],
    description:
      "Moletom flanelado por dentro, capuz forrado e cordão emborrachado.",
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 6,
    name: "Moletom Oversized Hoodie",
    slug: "moletom-oversized-hoodie",
    category: "moletons",
    price: 319.9,
    images: imagesFor("moletom-oversized-hoodie", ["Branco", "Bege"]),
    fallbackGradient: "from-stone-300 to-stone-500",
    colors: ["Branco", "Bege"],
    sizes: ["M", "G", "GG", "XG"],
    description: "Hoodie oversized com bolso canguru e punhos reforçados.",
    rating: 4.8,
    reviews: 88,
  },
  {
    id: 7,
    name: "Moletom Zip Classic",
    slug: "moletom-zip-classic",
    category: "moletons",
    price: 289.9,
    images: imagesFor("moletom-zip-classic", ["Verde", "Preto"]),
    fallbackGradient: "from-emerald-800 to-zinc-950",
    colors: ["Verde", "Preto"],
    sizes: ["P", "M", "G", "GG"],
    description: "Modelo com zíper frontal e detalhes bordados em dourado.",
    rating: 4.6,
    reviews: 71,
  },
  // CALÇAS
  {
    id: 8,
    name: "Calça Cargo Street",
    slug: "calca-cargo-street",
    category: "calcas",
    price: 219.9,
    images: imagesFor("calca-cargo-street", ["Preto", "Bege"]),
    fallbackGradient: "from-zinc-700 to-zinc-900",
    colors: ["Preto", "Bege"],
    sizes: ["38", "40", "42", "44"],
    description:
      "Calça cargo com bolsos utilitários e cordão de ajuste no cós.",
    rating: 4.7,
    reviews: 112,
  },
  {
    id: 9,
    name: "Calça Jogger Premium",
    slug: "calca-jogger-premium",
    category: "calcas",
    price: 199.9,
    images: imagesFor("calca-jogger-premium", ["Preto", "Cinza"]),
    fallbackGradient: "from-zinc-800 to-black",
    colors: ["Preto", "Cinza"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Jogger confortável com punho elastizado, ideal para o streetwear.",
    rating: 4.8,
    reviews: 97,
  },
  {
    id: 10,
    name: "Calça Alfaiataria Slim",
    slug: "calca-alfaiataria-slim",
    category: "calcas",
    price: 249.9,
    images: imagesFor("calca-alfaiataria-slim", ["Preto", "Cinza"]),
    fallbackGradient: "from-stone-600 to-zinc-900",
    colors: ["Preto", "Cinza"],
    sizes: ["38", "40", "42", "44"],
    description:
      "Corte slim em tecido premium, para um visual alinhado com atitude.",
    rating: 4.9,
    reviews: 54,
  },
  // JAQUETAS
  {
    id: 11,
    name: "Jaqueta Bomber Gold",
    slug: "jaqueta-bomber-gold",
    badge: "new",
    featured: true,
    category: "jaquetas",
    price: 349.9,
    images: imagesFor("jaqueta-bomber-gold", ["Preto", "Dourado"]),
    fallbackGradient: "from-amber-600 to-zinc-950",
    colors: ["Preto", "Dourado"],
    sizes: ["P", "M", "G", "GG"],
    description:
      "Bomber premium com forro acetinado e zíper metálico dourado.",
    rating: 4.9,
    reviews: 79,
  },
  {
    id: 12,
    name: "Corta-Vento Tech",
    slug: "corta-vento-tech",
    category: "jaquetas",
    price: 289.9,
    images: imagesFor("corta-vento-tech", ["Verde", "Preto"]),
    fallbackGradient: "from-emerald-700 to-zinc-950",
    colors: ["Verde", "Preto"],
    sizes: ["P", "M", "G", "GG", "XG"],
    description:
      "Tecido impermeável leve, ideal para o clima instável com muito estilo.",
    rating: 4.6,
    reviews: 45,
  },
  {
    id: 13,
    name: "Puffer Premium",
    slug: "puffer-premium",
    category: "jaquetas",
    price: 399.9,
    images: imagesFor("puffer-premium", ["Preto", "Cinza"]),
    fallbackGradient: "from-zinc-900 to-black",
    colors: ["Preto", "Cinza"],
    sizes: ["M", "G", "GG"],
    description:
      "Acolchoado premium para dias frios, sem abrir mão da atitude.",
    rating: 5.0,
    reviews: 38,
  },
  // ACESSÓRIOS
  {
    id: 14,
    name: "Boné Classic",
    slug: "bone-classic",
    category: "acessorios",
    subcategory: "bones",
    price: 129.9,
    images: imagesFor("bone-classic", ["Preto", "Branco"]),
    fallbackGradient: "from-zinc-800 to-black",
    colors: ["Preto", "Branco"],
    sizes: ["Único"],
    description: "Boné estruturado com logo bordado Samuka e fecho ajustável.",
    rating: 4.8,
    reviews: 143,
  },
  {
    id: 15,
    name: "Boné Aba Reta Gold",
    slug: "bone-aba-reta-gold",
    category: "acessorios",
    subcategory: "bones",
    price: 139.9,
    images: imagesFor("bone-aba-reta-gold", ["Preto", "Dourado"]),
    fallbackGradient: "from-amber-700 to-zinc-900",
    colors: ["Preto", "Dourado"],
    sizes: ["Único"],
    description:
      "Aba reta com detalhes dourados, para fechar o look com atitude.",
    rating: 4.7,
    reviews: 66,
  },
  {
    id: 16,
    name: "Corrente Prata 925",
    slug: "corrente-prata-925",
    category: "acessorios",
    subcategory: "correntes",
    price: 249.9,
    images: imagesFor("corrente-prata-925", ["Prata"]),
    fallbackGradient: "from-stone-300 to-stone-500",
    colors: ["Prata"],
    sizes: ["Único"],
    description: "Corrente em prata 925 com elos maciços, acabamento polido.",
    rating: 4.9,
    reviews: 51,
  },
  {
    id: 17,
    name: "Corrente Ouro Cuban",
    slug: "corrente-ouro-cuban",
    badge: "bestseller",
    category: "acessorios",
    subcategory: "correntes",
    price: 329.9,
    images: imagesFor("corrente-ouro-cuban", ["Dourado"]),
    fallbackGradient: "from-amber-500 to-amber-800",
    colors: ["Dourado"],
    sizes: ["Único"],
    description: "Elo cubano banhado a ouro 18k, peça statement da coleção.",
    rating: 5.0,
    reviews: 40,
  },
  {
    id: 18,
    name: "Óculos Aviador Signature",
    slug: "oculos-aviador-signature",
    category: "acessorios",
    subcategory: "oculos",
    price: 179.9,
    images: imagesFor("oculos-aviador-signature", ["Prata", "Preto"]),
    fallbackGradient: "from-zinc-700 to-zinc-950",
    colors: ["Prata", "Preto"],
    sizes: ["Único"],
    description: "Armação metálica leve com lentes espelhadas UV400.",
    rating: 4.8,
    reviews: 82,
  },
  {
    id: 19,
    name: "Pulseira Elos Premium",
    slug: "pulseira-elos-premium",
    category: "acessorios",
    subcategory: "pulseiras",
    price: 99.9,
    images: imagesFor("pulseira-elos-premium", ["Prata", "Dourado"]),
    fallbackGradient: "from-stone-400 to-stone-600",
    colors: ["Prata", "Dourado"],
    sizes: ["Único"],
    description: "Pulseira de elos com fecho reforçado, unissex.",
    rating: 4.6,
    reviews: 35,
  },
  {
    id: 20,
    name: "Cinto Couro Legítimo",
    slug: "cinto-couro-legitimo",
    category: "acessorios",
    subcategory: "cintos",
    price: 149.9,
    images: imagesFor("cinto-couro-legitimo", ["Preto", "Bege"]),
    fallbackGradient: "from-amber-900 to-zinc-950",
    colors: ["Preto", "Bege"],
    sizes: ["P/M", "G/GG"],
    description:
      "Cinto em couro legítimo com fivela metálica gravada Samuka.",
    rating: 4.7,
    reviews: 58,
  },
  //TENIS
  {
  id: 21,
  name: "Tênis Mizuno Pro 15",
  slug: "tenis-urban-street",
  badge: "new",
  featured: true,
  category: "tenis",
  price: 449.9,
  images: imagesFor("tenis-urban-street", ["Preto", "Branco"]),
  fallbackGradient: "from-zinc-800 to-zinc-950",
  colors: ["Preto", "Branco"],
  sizes: ["38", "39", "40", "41", "42","43"],
  description: "Tênis casual leve e confortável para o dia a dia.",
  rating: 5.0,
  reviews: 1,
},
{id: 22,
  name: "Tênis New Balance 2000",
  slug: "tenis-urban-street",
  badge: "new",
  featured: true,
  category: "tenis",
  price: 449.9,
  images: imagesFor("tenis-new-balance-2000", ["Preto", "Branco","Azul"]),
  fallbackGradient: "from-zinc-800 to-zinc-950",
  colors: ["Preto", "Branco","Azul"],
  sizes: ["38", "39", "40", "41", "42","43"],
  description: "Tênis casual leve e confortável para o dia a dia.",
  rating: 5.0,
  reviews: 1,
},
];

export const formatBRL = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default products;

// -----------------------------------------------------------------------------
// src/data/banners.js
// Slides do banner rotativo da Home (HeroBanner).
//
// Mesmo esquema dos produtos: `image` aponta pra uma foto real em
// public/images/banners/<slug>.jpg. Se o arquivo ainda não existir, o
// <HeroBanner> cai automaticamente no `fallbackGradient` — não precisa ter
// as fotos prontas pra isso já funcionar.
//
// `ctaCategory`: para qual categoria o botão do slide leva ao ser clicado
// (use null para "ver tudo").
// -----------------------------------------------------------------------------

export const banners = [
  {
    id: 1,
    slug: "nova-colecao",
    image: "/images/banners/nova-colecao.jpg",
    fallbackGradient: "from-emerald-950 via-zinc-900 to-black",
    tag: "NOVA COLEÇÃO",
    title: "ELEVE SEU ESTILO",
    subtitle: "Peças exclusivas para quem valoriza o melhor.",
    ctaLabel: "Ver Coleção",
    ctaCategory: null,
  },
  {
    id: 2,
    slug: "acessorios-premium",
    image: "/images/banners/acessorios-premium.jpg",
    fallbackGradient: "from-amber-800 via-zinc-900 to-black",
    tag: "DETALHES QUE IMPÕEM",
    title: "ACESSÓRIOS PREMIUM",
    subtitle: "Correntes, bonés e óculos para fechar o look.",
    ctaLabel: "Ver Acessórios",
    ctaCategory: "acessorios",
  },
  {
    id: 3,
    slug: "jaquetas-inverno",
    image: "/images/banners/jaquetas-inverno.jpg",
    fallbackGradient: "from-zinc-700 via-zinc-900 to-black",
    tag: "TEMPORADA",
    title: "JAQUETAS & MOLETONS",
    subtitle: "Conforto e atitude para os dias mais frios.",
    ctaLabel: "Ver Jaquetas",
    ctaCategory: "jaquetas",
  },
];

export default banners;

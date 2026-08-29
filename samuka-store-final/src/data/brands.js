// -----------------------------------------------------------------------------
// src/data/brands.js
// Itens exibidos na faixa rotativa do rodapé (BrandsMarquee).
//
// Cada marca tem um `slug` — é o nome do arquivo de logo esperado em
// public/images/brands/<slug>.png (PNG com fundo transparente funciona
// melhor aqui, já que a faixa rola sobre o fundo escuro).
//
// Se o arquivo de logo não existir ainda, a faixa usa automaticamente o
// nome em texto no lugar — não precisa ter todas as logos prontas pra isso
// já funcionar. Basta colocar o PNG na pasta certa quando tiver.
// -----------------------------------------------------------------------------

export const brands = [
  { name: "ALEXANDER MCQUEEN", slug: "alexander-mcqueen" },
  { name: "AMIRI", slug: "amiri" },
  { name: "ARMANI", slug: "armani" },
  { name: "ASICS", slug: "asics" },
  { name: "BALMAIN", slug: "balmain" },
  { name: "BROOKSFIELD", slug: "brooksfield" },
  { name: "BURBERRY", slug: "burberry" },
  { name: "CALVIN KLEIN", slug: "calvin-klein" },
  { name: "CASABLANCA", slug: "casablanca" },
  { name: "DIESEL", slug: "diesel" },
  { name: "FRED PERRY", slug: "fred-perry" },
  { name: "GUCCI", slug: "gucci" },
  { name: "HERMÈS", slug: "hermes" },
  { name: "HUGO BOSS", slug: "hugo-boss" },
];

export default brands;

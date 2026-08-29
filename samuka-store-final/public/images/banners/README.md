# Fotos do banner (Home)

Salve as fotos aqui seguindo o padrão:

```
public/images/banners/<slug-do-slide>.jpg
```

Os slugs atuais (definidos em `src/data/banners.js`):

```
public/images/banners/nova-colecao.jpg
public/images/banners/acessorios-premium.jpg
public/images/banners/jaquetas-inverno.jpg
```

Enquanto a foto não existir, o slide usa automaticamente um gradiente
premium no lugar — nada quebra. Pra adicionar um slide novo, copie um
objeto em `src/data/banners.js` e ajuste `image`, `tag`, `title`,
`subtitle`, `ctaLabel` e `ctaCategory`.

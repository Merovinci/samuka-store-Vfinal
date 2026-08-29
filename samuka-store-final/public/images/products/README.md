# Fotos dos produtos

Salve as fotos aqui seguindo o padrão:

```
public/images/products/<slug-do-produto>/<cor-em-minusculo>.jpg
```

Exemplo (Camiseta Essential, id 1, cores Preto/Branco/Cinza):

```
public/images/products/camiseta-essential/preto.jpg
public/images/products/camiseta-essential/branco.jpg
public/images/products/camiseta-essential/cinza.jpg
```

O `slug` de cada produto está no arquivo `src/data/products.js` (campo `slug`).
Não precisa editar o `products.js` para adicionar uma foto de um produto que
já existe — o caminho já foi gerado automaticamente pela função `imagesFor`.
Basta colocar o arquivo .jpg na pasta certa, com o nome certo, e a foto
aparece sozinha (o app já espera por ela).

// -----------------------------------------------------------------------------
// src/config/whatsapp.js
// Configuração central do WhatsApp da loja + montagem das mensagens
// automáticas (checkout do carrinho e contato com atendente).
//
// >>> TROQUE O NÚMERO ABAIXO PELO NÚMERO OFICIAL DA SAMUKA STORE <<<
// Formato: código do país + DDD + número, só dígitos, sem espaços/traços/parênteses.
// Exemplo real: "5511987654321" (55 = Brasil, 11 = DDD, resto = número)
// -----------------------------------------------------------------------------

export const WHATSAPP_NUMBER = "5500000000000"; // PLACEHOLDER — substitua pelo número real

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Monta a mensagem de checkout dinamicamente a partir dos itens reais do carrinho.
export function buildCartMessage(cart) {
  const itemLines = cart.map((item) => {
    const subtotal = (item.price * item.qty).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return `${item.qty}x ${item.name}\nCor: ${item.color}\nTamanho: ${item.size}\nValor: ${subtotal}`;
  });

  const total = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return [
    "Olá! Gostaria de finalizar meu pedido na Samuka Store.",
    "",
    "🛍️ PEDIDO",
    "",
    itemLines.join("\n\n"),
    "",
    "----------------------------",
    "",
    `💰 TOTAL: ${total}`,
    "",
    "Gostaria de receber as opções de pagamento e concluir minha compra.",
  ].join("\n");
}

export const ATTENDANT_MESSAGE =
  "Olá! Estou navegando pela Samuka Store e gostaria de falar com um atendente.";

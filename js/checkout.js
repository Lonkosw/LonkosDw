document.addEventListener("DOMContentLoaded", () => {
  const resumo = document.getElementById("resumo-pedido");
  const comanda = JSON.parse(localStorage.getItem("comanda")) || [];

  if (comanda.length === 0) {
    resumo.innerHTML = "<p>Nenhum pedido encontrado.</p>";
    return;
  }

  let totalPedido = 0;

  comanda.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "resumo-item";

    // Calcula o preço total da pizza
    const precoPizza = item.sabores.reduce((total, sabor) => total + sabor.preco, 0);
    totalPedido += precoPizza;

    div.innerHTML = `
      <p>Pizza ${i + 1}: ${item.tamanho} - ${item.sabores.map(s => s.nome).join(" + ")}</p>
      <p class="preco">R$ ${precoPizza.toFixed(2)}</p>
    `;

    resumo.appendChild(div);
  });

  // Exibe o total do pedido
  const totalDiv = document.createElement("div");
  totalDiv.className = "resumo-item";
  totalDiv.innerHTML = `<p><strong>Total do Pedido:</strong></p><p class="preco">R$ ${totalPedido.toFixed(2)}</p>`;
  resumo.appendChild(totalDiv);

  // Listener do botão "Concluir Pedido"
  document.getElementById("btn-concluir").addEventListener("click", () => {
    alert("Pedido finalizado! Obrigado pela preferência.");
    localStorage.clear();
    window.location.href = "index.html";
  });
});

function pagarComCartao() {
  const area = document.getElementById("area-pagamento");
  area.innerHTML = `<p>Insira ou aproxime o cartão no terminal...</p>`;
  setTimeout(() => {
    alert("Pagamento aprovado! Pedido finalizado.");
    localStorage.clear();
    window.location.href = "index.html";
  }, 3000);
}

function pagarComPix() {
  const area = document.getElementById("area-pagamento");
  area.innerHTML = `<p>Escaneie o QR Code com seu app de banco:</p>`;
  document.getElementById("qr-code-container").style.display = "block"; // Exibe o QR Code
  
  setTimeout(() => {
    alert("Pagamento confirmado via Pix!");
    localStorage.clear();
    window.location.href = "index.html";
  }, 5000);
}

function pagarComDinheiro() {
  const area = document.getElementById("area-pagamento");
  area.innerHTML = `
    <p>Você precisa de troco?</p>
    <input type="text" id="valorTroco" placeholder="Ex: Para R$ 100,00">
    <button onclick="confirmarDinheiro()">Confirmar</button>
  `;
}

function confirmarDinheiro() {
  const valor = document.getElementById("valorTroco").value.trim();
  if (valor !== "") {
    alert("Troco registrado. Vá até o caixa.");
  } else {
    alert("Pagamento sem troco registrado. Vá até o caixa.");
  }
  localStorage.clear();
  window.location.href = "index.html";
}

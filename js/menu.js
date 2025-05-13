let comanda = [];
let saboresSelecionados = [];
let limiteSabores = 0;

// Habilita montagem e bloqueia os campos
function montarPizza() {
  const qtdSabores = parseInt(document.getElementById("quantidadeSabores").value);
  const tamanho = document.getElementById("tamanhoPizza").value;

  if (!tamanho || !qtdSabores) {
    alert("Selecione o tamanho e a quantidade de sabores.");
    return;
  }

  // Travar os campos
  document.getElementById("tamanhoPizza").disabled = true;
  document.getElementById("quantidadeSabores").disabled = true;

  saboresSelecionados = [];
  limiteSabores = qtdSabores;

  document.getElementById("finalizarPizzaBtn").disabled = true;
  document.getElementById("excluirUltimoSaborBtn").disabled = false;

  // Ativa todos os cards novamente
  const cards = document.querySelectorAll(".sabor");
  cards.forEach(card => {
    card.classList.remove("desabilitado");
    card.addEventListener("click", onCardClick);
  });

  atualizarPreComanda();
}

// Ação de clique em cada card
function onCardClick(event) {
  const card = event.currentTarget;

  const nome = card.querySelector("p").innerText;
  const precoText = card.querySelector("span").innerText.replace("R$ ", "").replace(",", ".");
  const preco = parseFloat(precoText);

  if (saboresSelecionados.length < limiteSabores) {
    saboresSelecionados.push({ nome, preco });
    atualizarPreComanda();
  }

  if (saboresSelecionados.length === limiteSabores) {
    document.getElementById("finalizarPizzaBtn").disabled = false;

    // Desabilita todos os cards após atingir o limite
    const cards = document.querySelectorAll(".sabor");
    cards.forEach(card => {
      card.classList.add("desabilitado");
      card.removeEventListener("click", onCardClick);
    });
  }
}

// Atualiza a visualização da pizza atual sendo montada
function atualizarPreComanda() {
  const total = saboresSelecionados.reduce((sum, item) => sum + item.preco, 0);
  const nomes = saboresSelecionados.map(item => item.nome).join(" + ");
  document.getElementById("pre-comanda").innerText = `${nomes} - R$ ${total.toFixed(2).replace(".", ",")}`;
}

// Remove último sabor
function excluirUltimoSabor() {
  if (saboresSelecionados.length > 0) {
    saboresSelecionados.pop();
    document.getElementById("finalizarPizzaBtn").disabled = true;

    // Reabilita os cards
    const cards = document.querySelectorAll(".sabor");
    cards.forEach(card => {
      card.classList.remove("desabilitado");
      card.addEventListener("click", onCardClick);
    });

    atualizarPreComanda();
  }
}

// Finaliza uma pizza e adiciona à comanda
function finalizarPizza() {
  const tamanho = document.getElementById("tamanhoPizza").value;
  if (!tamanho || saboresSelecionados.length === 0) return;

  comanda.push({ tamanho, sabores: [...saboresSelecionados] });
  atualizarComanda();
  saboresSelecionados = [];
  atualizarPreComanda();
  document.getElementById("finalizarPizzaBtn").disabled = true;
  document.getElementById("excluirUltimoSaborBtn").disabled = true;

  // Desbloqueia montagem novamente
  document.getElementById("tamanhoPizza").disabled = false;
  document.getElementById("quantidadeSabores").disabled = false;

  // Reativa todos os cards
  const cards = document.querySelectorAll(".sabor");
  cards.forEach(card => {
    card.classList.remove("desabilitado");
    card.removeEventListener("click", onCardClick);
  });
}

// Exibe todas as pizzas adicionadas à comanda
function atualizarComanda() {
  const lista = document.getElementById("comanda-lista");
  lista.innerHTML = "";
  comanda.forEach((item, index) => {
    const total = item.sabores.reduce((soma, s) => soma + s.preco, 0);
    const sabores = item.sabores.map(s => s.nome).join(" + ");
    const linha = document.createElement("p");
    linha.textContent = `Pizza ${index + 1}: ${item.tamanho} - ${sabores} - R$ ${total.toFixed(2).replace(".", ",")}`;
    lista.appendChild(linha);
  });
}

// Finaliza o pedido
function finalizarPedido() {
  if (comanda.length === 0) {
    alert("Adicione ao menos uma pizza à comanda.");
    return;
  }
  localStorage.setItem("comanda", JSON.stringify(comanda));
  window.location.href = "checkout.html";
}

// Reinicia o sistema
function reiniciarPedido() {
  localStorage.removeItem("comanda");
  window.location.href = "index.html";
}

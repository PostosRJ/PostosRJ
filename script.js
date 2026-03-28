let dados = [
  {
    nome: "Posto Shell",
    tipo: "Gasolina Comum",
    preco: 5.29,
    atualizado: "Hoje"
  },
  {
    nome: "Posto Ipiranga",
    tipo: "Gasolina Comum",
    preco: 5.39,
    atualizado: "Hoje"
  },
  {
    nome: "Posto BR",
    tipo: "Gasolina Comum",
    preco: 5.49,
    atualizado: "Ontem"
  }
];

const container = document.getElementById("postos");
const busca = document.getElementById("busca");

function render(lista) {
  container.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="info">
        <div class="nome">${p.nome}</div>
        <div class="tipo">${p.tipo}</div>
        <div class="atualizado">Atualizado: ${p.atualizado}</div>
      </div>
      <div class="preco">R$ ${p.preco.toFixed(2)}</div>
    `;

    container.appendChild(div);
  });
}

function ordenar() {
  dados.sort((a, b) => a.preco - b.preco);
  render(dados);
}

busca.addEventListener("input", () => {
  const termo = busca.value.toLowerCase();

  const filtrado = dados.filter(p =>
    p.nome.toLowerCase().includes(termo)
  );

  render(filtrado);
});

render(dados);

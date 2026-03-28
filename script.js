let dados = [
  { nome: "Posto Shell Centro", cidade: "Rio", preco: 5.49 },
  { nome: "Posto Ipiranga Copacabana", cidade: "Rio", preco: 5.29 },
  { nome: "Posto BR Barra", cidade: "Rio", preco: 5.59 }
];

const container = document.getElementById("postos");
const busca = document.getElementById("busca");

function render(lista) {
  container.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div>
        <div class="nome">${p.nome}</div>
        <div class="cidade">${p.cidade}</div>
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
    p.nome.toLowerCase().includes(termo) ||
    p.cidade.toLowerCase().includes(termo)
  );

  render(filtrado);
});

render(dados);

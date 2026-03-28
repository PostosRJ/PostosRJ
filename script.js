let dados = [
  {
    nome: "Posto Copacabana",
    preco: 5.29,
    lat: -22.9711,
    lng: -43.1822
  },
  {
    nome: "Posto Centro",
    preco: 5.49,
    lat: -22.9035,
    lng: -43.2096
  }
];

// MAPA
const map = L.map('map').setView([-22.97, -43.18], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

// MARCADORES
dados.forEach(p => {
  L.marker([p.lat, p.lng])
    .addTo(map)
    .bindPopup(`${p.nome} <br> R$ ${p.preco}`);
});

// LISTA
const container = document.getElementById("postos");

function render(lista) {
  container.innerHTML = "";

  lista.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <span>${p.nome}</span>
      <span class="preco">R$ ${p.preco}</span>
    `;

    container.appendChild(div);
  });
}

function ordenar() {
  dados.sort((a, b) => a.preco - b.preco);
  render(dados);
}

render(dados);
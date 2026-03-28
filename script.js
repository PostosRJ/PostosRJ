let minhaLat = null;
let minhaLng = null;
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
    const distanciaKm = p.distancia ? (p.distancia * 111).toFixed(2) : "--";

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <span>
        ${p.nome} <br>
        📍 ${distanciaKm} km
      </span>
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
// SUA LOCALIZAÇÃO
navigator.geolocation.getCurrentPosition(
  function(pos) {
    minhaLat = pos.coords.latitude;
    minhaLng = pos.coords.longitude;

    map.setView([minhaLat, minhaLng], 13);

    L.marker([minhaLat, minhaLng])
      .addTo(map)
      .bindPopup("📍 Você está aqui")
      .openPopup();

    calcularDistancias();
    ordenarPorDistancia();
  },
  function(error) {
    console.log("Erro ao pegar localização");
  }
);
function calcularDistancias() {
  dados.forEach(p => {
    const dx = p.lat - minhaLat;
    const dy = p.lng - minhaLng;

    p.distancia = Math.sqrt(dx * dx + dy * dy);
  });
}

function ordenarPorDistancia() {
  dados.sort((a, b) => a.distancia - b.distancia);
  render(dados);
}

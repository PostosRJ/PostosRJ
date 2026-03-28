let minhaLat = null;
let minhaLng = null;

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

// CRIAR MAPA
const map = L.map('map').setView([-22.97, -43.18], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

// FUNÇÃO DE RENDER
const container = document.getElementById("postos");

function render(lista) {
  container.innerHTML = "";

  const maisBarato = encontrarMaisBarato();

lista.forEach(p => {
    const distanciaKm = p.distancia ? (p.distancia * 111).toFixed(2) : "--";

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div>
  ${p.nome}
  ${p === maisBarato ? "🔥" : ""}
  <br>
  📍 ${distanciaKm} km
</div>
<span class="preco">R$ ${p.preco}</span>

    container.appendChild(div);
  });
}

// CALCULAR DISTÂNCIA
function calcularDistancias() {
  dados.forEach(p => {
    const dx = p.lat - minhaLat;
    const dy = p.lng - minhaLng;
    p.distancia = Math.sqrt(dx * dx + dy * dy);
  });
}

// ORDENAR
function ordenarPorDistancia() {
  dados.sort((a, b) => a.distancia - b.distancia);
  render(dados);
}

// LOCALIZAÇÃO
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
    destacarMaisBarato();
  },
  function(error) {
    console.log("Erro ao pegar localização");
    render(dados); // fallback
  }
);

// MARCADORES DOS POSTOS
dados.forEach(p => {
  L.marker([p.lat, p.lng])
    .addTo(map)
    .bindPopup(`${p.nome} <br> R$ ${p.preco}`);
});

// PRIMEIRO RENDER
render(dados);
function encontrarMaisBarato() {
  if (!dados.length) return;

  let maisBarato = dados[0];

  dados.forEach(p => {
    if (p.preco < maisBarato.preco) {
      maisBarato = p;
    }
  });

  return maisBarato;
}
function destacarMaisBarato() {
  const p = encontrarMaisBarato();

  if (!p) return;

  L.marker([p.lat, p.lng])
    .addTo(map)
    .bindPopup(`🔥 MAIS BARATO<br>${p.nome}<br>R$ ${p.preco}`)
    .openPopup();
}

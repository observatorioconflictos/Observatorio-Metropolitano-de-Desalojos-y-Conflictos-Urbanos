/* =========================================
   DATOS SIMULADOS (GeoJSON)
   ========================================= */

// Base de Datos 1: DESALOJOS
var datosDesalojos = [
    { coords: [-12.046, -77.042], titulo: "Desalojo Centro Histórico" },
    { coords: [-12.055, -77.030], titulo: "Desalojo Barrios Altos" },
    { coords: [-12.035, -77.050], titulo: "Desalojo Zona Industrial" },
    { coords: [-11.980, -77.080], titulo: "Desalojo San Martín" }, 
    { coords: [-12.060, -77.040], titulo: "Intento de Desalojo" }
];

// Base de Datos 2: CONFLICTOS
var datosConflictos = [
    { coords: [-12.110, -77.030], titulo: "Conflicto Vial Pardo" },
    { coords: [-12.090, -77.020], titulo: "Protesta Vecinal" },
    { coords: [-12.120, -77.040], titulo: "Disputa Zonificación" },
    { coords: [-12.130, -77.010], titulo: "Conflicto Barranco" }
];

// Configuración Global
var centroLima = [-12.060, -77.040]; 
var zoomInit = 12;

// =========================================
// FUNCIÓN: SATÉLITE HÍBRIDO (ALTO CONTRASTE)
// =========================================
function crearCapaBase(mapaObjetivo) {
    // 1. CAPA INFERIOR: Foto Satelital (Esri World Imagery)
    var satelite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri'
    });

    // 2. CAPA SUPERIOR: Etiquetas de Referencia (Esri Boundaries & Places)
    // Estas etiquetas tienen borde negro y relleno blanco. Se ven SIEMPRE.
    var etiquetas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
        attribution: ''
    });

    satelite.addTo(mapaObjetivo);
    etiquetas.addTo(mapaObjetivo);
}

// =========================================
// 1. MAPA GENERAL
// =========================================
var mapGeneral = L.map('map-general').setView(centroLima, zoomInit);
crearCapaBase(mapGeneral);

// MARCADORES ELEGANTES (Borde Blanco)

// Desalojos (Rojo con borde Blanco)
datosDesalojos.forEach(function(item) {
    L.circleMarker(item.coords, {
        color: '#ffffff',       // Borde Blanco (Elegante)
        weight: 2,              // Grosor medio
        fillColor: '#d60000',   // Rojo intenso (más oscuro para contraste)
        fillOpacity: 1,         // Opacidad al 100% para que se vea sólido
        radius: 8
    }).addTo(mapGeneral).bindPopup("<b>Desalojo:</b> " + item.titulo);
});

// Conflictos (Azul con borde Blanco)
datosConflictos.forEach(function(item) {
    L.circleMarker(item.coords, {
        color: '#ffffff',       // Borde Blanco
        weight: 2,
        fillColor: '#0066ff',   // Azul Eléctrico
        fillOpacity: 1,         // Sólido
        radius: 8
    }).addTo(mapGeneral).bindPopup("<b>Conflicto:</b> " + item.titulo);
});


// =========================================
// 2. MAPA ESPECÍFICO: DESALOJOS
// =========================================
var mapDesalojos = L.map('map-desalojos').setView([-12.045, -77.040], 13);
crearCapaBase(mapDesalojos);

datosDesalojos.forEach(function(item) {
    L.circleMarker(item.coords, {
        color: '#ffffff',
        weight: 2,
        fillColor: '#d60000',
        fillOpacity: 1,
        radius: 10
    }).addTo(mapDesalojos).bindPopup(item.titulo);
});


// =========================================
// 3. MAPA ESPECÍFICO: CONFLICTOS
// =========================================
var mapConflictos = L.map('map-conflictos').setView([-12.110, -77.030], 13);
crearCapaBase(mapConflictos);

datosConflictos.forEach(function(item) {
    L.circleMarker(item.coords, {
        color: '#ffffff',
        weight: 2,
        fillColor: '#0066ff',
        fillOpacity: 1,
        radius: 10
    }).addTo(mapConflictos).bindPopup(item.titulo);
});

// Ajuste técnico
setTimeout(function(){ 
    mapGeneral.invalidateSize(); 
    mapDesalojos.invalidateSize(); 
    mapConflictos.invalidateSize(); 
}, 500);
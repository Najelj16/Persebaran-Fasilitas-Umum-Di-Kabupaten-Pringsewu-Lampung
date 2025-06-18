// script.js

// Membuat peta dan mengatur posisi awal
var map = L.map('map').setView([-5.3569, 104.9791], 11);

// Menambahkan layer dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Fungsi membuat marker dengan warna khusus dan popup
function createLayer(url, color, label) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const geojson = L.geoJSON(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, {
                        radius: 7,
                        fillColor: color,
                        color: '#000',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                },
                onEachFeature: function (feature, layer) {
                    const name = feature.properties.NAMA || feature.properties.name || label;
                    layer.bindPopup(`<strong>${label}</strong><br>${name}`);
                }
            }).addTo(map);
            layerControl.addOverlay(geojson, label);
        });
}

// Layer control
const layerControl = L.control.layers(null, null, { collapsed: false }).addTo(map);

// Daftar fasilitas umum dengan warna dan file GeoJSON
const fasilitas = [
    { url: 'AdministrasiKabTgs.geojson', color: '#888', label: 'Administrasi Kabupaten' },
    { url: 'SekolahTgs.geojson', color: '#f6e21d', label: 'Sekolah' },
    { url: 'RumahSakitTgs.geojson', color: '#4caf50', label: 'Rumah Sakit' },
    { url: 'SPBUTgs.geojson', color: '#c62828', label: 'SPBU' },
    { url: 'TerminalBusTgs.geojson', color: '#0d47a1', label: 'Terminal Bus' },
    { url: 'KantorPosTgs.geojson', color: '#f57c00', label: 'Kantor Pos' },
    { url: 'AreaOlahragaTgs.geojson', color: '#9c27b0', label: 'Area Olahraga' },
    { url: 'SaranaIbadahTgs.geojson', color: '#00bcd4', label: 'Sarana Ibadah' }
];

// Tambahkan semua layer ke peta
fasilitas.forEach(f => createLayer(f.url, f.color, f.label));
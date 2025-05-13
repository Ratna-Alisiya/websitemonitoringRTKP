
const dataDummy = {
    "RTK-001": { ph: 5.6, mikroba: 2000, suhu: 7 },
    "RTK-002": { ph: 5.9, mikroba: 22000, suhu: 10 },
    "RTK-003": { ph: 6.2, mikroba: 58000, suhu: 15 },
    "RTK-004": { ph: 6.7, mikroba: 500000, suhu: 20 },
    "RTK-005": { ph: 7.1, mikroba: 3000000, suhu: 25 }
};

function isiOtomatis() {
    const selector = document.getElementById("sampelSelector");
    const selected = selector.value;
    if (dataDummy[selected]) {
        document.getElementById("ph").value = dataDummy[selected].ph;
        document.getElementById("mikroba").value = dataDummy[selected].mikroba;
        document.getElementById("suhu").value = dataDummy[selected].suhu;
        cekKelayakan();
        tampilkanGrafik(dataDummy[selected]);
    }
}

function cekKelayakan() {
    const ph = parseFloat(document.getElementById("ph").value);
    const mikroba = parseInt(document.getElementById("mikroba").value);
    const suhu = parseFloat(document.getElementById("suhu").value);

    let hasil = "";
    if (ph <= 5.8 && mikroba <= 3200 && suhu <= 7) {
        hasil = "Sangat Layak";
    } else if (ph <= 6.2 && mikroba <= 58000 && suhu <= 15) {
        hasil = "Layak";
    } else if (ph <= 6.8 && mikroba <= 1100000 && suhu <= 22) {
        hasil = "Batas Layak";
    } else {
        hasil = "Tidak Layak";
    }

    document.getElementById("hasilKelayakan").innerText = "Status: " + hasil;
}

function tampilkanGrafik(data) {
    const ctx = document.getElementById('grafik').getContext('2d');
    if (window.grafikInstance) window.grafikInstance.destroy();

    window.grafikInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sampel'],
            datasets: [
                {
                    label: 'pH',
                    data: [data.ph],
                    borderColor: 'blue',
                    borderWidth: 2
                },
                {
                    label: 'Mikroba (1e6)',
                    data: [data.mikroba / 1e6],
                    borderColor: 'red',
                    borderWidth: 2
                },
                {
                    label: 'Suhu (°C)',
                    data: [data.suhu],
                    borderColor: 'green',
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

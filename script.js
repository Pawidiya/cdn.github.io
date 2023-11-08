const peri = "@I Putu Peri Awidiya Surya - 2301010055";
        const periElement = document.getElementById('peri'); // Mengambil elemen dengan id 'peri'
        periElement.innerHTML = peri; // Mengubah innerHTML dari elemen

if (peri != "@I Putu Peri Awidiya Surya - 2301010055") {
    window.location.replace('https://www.youtube.com/shorts/IVzhvRSRKLw'); // Mengarahkan ke URL jika innerHTML sesuai
}


    

  // Fungsi untuk mengambil data JSON dari API GitHub
  async function getDataFromGitHubAPI() {
    const url = 'https://api.github.com/repos/Pawidiya/pawidiya/contents/Data.json'; // Ganti dengan URL API GitHub yang sesuai
    try {
        const response = await fetch(url);
        const data = await response.json();
        const content = atob(data.content); // Decode konten yang diambil dari GitHub
        return JSON.parse(content);
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

// Fungsi untuk menampilkan data ke dalam elemen HTML
async function renderData(searchText) {
    const dataContainer = document.getElementById("data-container");
    const jsonData = await getDataFromGitHubAPI();

    if (jsonData) {
        dataContainer.innerHTML = ''; // Hapus konten sebelum menampilkan hasil pencarian baru

        const searchLower = searchText.toLowerCase(); // Ubah teks pencarian menjadi huruf kecil

        jsonData.forEach(item => {
            const descLower = item.desc.toLowerCase(); // Ubah deskripsi item menjadi huruf kecil
            // Cek apakah deskripsi (desc) mengandung teks pencarian (case-insensitive)
            if (descLower.includes(searchLower)) {
                const card = document.createElement("div");
                card.className = "bg-white p-4 rounded-lg shadow-lg";
                card.innerHTML = `
                    <img src="${item.img}" class="w-full h-48 object-cover mb-2">
                    <h2 class="text-xl font-semibold">${item.judul}</h2>
                    <p class="text-gray-600">${item.desc}</p>
                    <a href="${item.link}" class="text-blue-500 hover:underline button-30" target="_blank">Selengkapnya..</a>
                `;
                dataContainer.appendChild(card);
            }
        });

        if (searchText === '') {
            // Tampilkan semua data jika teks pencarian kosong
            jsonData.forEach(item => {
                const card = document.createElement("div");
                card.className = "bg-white p-4 rounded-lg shadow-lg";
                card.innerHTML = `
                    <img src="${item.img}" class="w-full h-48 object-cover mb-2">
                    <h2 class="text-xl font-semibold">${item.judul}</h2>
                    <p class="text-gray-600">${item.desc}</p>
                    <a href="${item.link}" class="text-blue-500 hover:underline button-30" target="_blank">Selengkapnya..</a>
                `;
                dataContainer.appendChild(card);
            });
        }
    }
}

// Tangani pengiriman formulir pencarian
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document.querySelector("input[name='search']");
    const searchText = searchInput.value;
    renderData(searchText);
});

// Tangani perubahan input teks
const searchInput = document.querySelector("input[name='search']");
searchInput.addEventListener("input", function () {
    const searchText = searchInput.value;
    renderData(searchText);
});

// Memanggil renderData() untuk menampilkan semua data saat halaman dimuat
renderData('');

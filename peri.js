 document.getElementById('content').innerHTML = `<div class="container mx-auto">
            <header class="bg-transparent text-dark py-0">
                <div class="container mx-auto flex justify-between mr-10 items-center">
                    <!-- Logo -->
                    <div class="flex items-center mx-2 ml-3">
                        <img src="https://i.pinimg.com/originals/40/eb/08/40eb08d0268f7df4e2083039d0608a92.jpg" alt="Logo Anda" class="h-10 w-10 mr-2 rounded-full">
                        <h1 class="text-2xl font-semibold text-white">MLBB SKIN FANNY</h1>
                    </div>
                    <div class="flex items-center justify-center">
                        <div class="bg-white p-0 rounded-md shadow-md w-30">
                            <form action="#" method="GET" class="flex items-center " id="search-form">
                                <input type="text" name="search" placeholder="Ayo cari skin favorit kamu" class="py-1 px-2 w-64 rounded focus:outline-none focus:ring focus:ring-indigo-300">
                            </form>                                            
                        </div>
                    </div>
                    <nav class="mr-3">
                        <ul class="flex pl-0 space-x-5 mx-2 bottom-2 py-5">
                            <li><a href="#" class="hover:text-blue-700 button-30 w-24">Home</a></li>
                            <li><a href="#" class="hover:text-blue-700 button-30 w-24">About</a></li>
                            <li><a href="#" class="hover:text-blue-700 button-30 w-24">Service</a></li>
                            <li><a href="#" class="hover:text-blue-700 button-30 w-24">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
        
        <div class="container px-5">
            <div id="data-container" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>
        </div>
    
    
        <footer class="bg-transparent text-black relative bottom-0 w-full">
            <div class="container mx-auto">
                <p id="peri"></p>
            </div>
        </footer>
    `;

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

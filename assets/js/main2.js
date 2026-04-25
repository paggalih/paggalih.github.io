document.addEventListener("DOMContentLoaded", function() {
    // Cek apakah cloud quotes sudah ada, jika belum buat elemen secara otomatis
    if (!document.getElementById("quotesCloud")) {
        let cloudHTML = `
            <div id="quotesOverlay">
                <div id="quotesCloud" class="cloud-container">
                    <p id="cloudText">Memuat quotes...</p>
                    <button id="closeQuotes" class="btn btn-danger btn-sm">Close</button>
                </div>
            </div>
        `;

        // Tambahkan cloud ke dalam body
        document.body.insertAdjacentHTML("afterbegin", cloudHTML);
    }

    // Ambil quotes dari `https://paggalih.github.io/speaker/quotes/`
    fetch("https://paggalih.github.io/speaker/quotes/")
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, "text/html");

            // Hanya ambil elemen dengan class "header-quotes"
            let quotes = doc.querySelectorAll(".header-quotes");

            // Jika ada elemen dengan class "header-quotes", pilih secara acak
            if (quotes.length > 0) {
                let randomQuote = quotes[Math.floor(Math.random() * quotes.length)].innerText;
                document.getElementById("cloudText").textContent = randomQuote;
            } else {
                // Jika tidak ada, coba cek apakah ada konstanta `quotes` di halaman
                let pageQuotes = window.quotes || [];
                if (pageQuotes.length > 0) {
                    let randomQuote = pageQuotes[Math.floor(Math.random() * pageQuotes.length)];
                    document.getElementById("cloudText").textContent = randomQuote;
                } else {
                    document.getElementById("cloudText").textContent = "Quotes tidak ditemukan.";
                }
            }
        })
        // .catch(error => {
            // console.error("Gagal memuat quotes:", error);

            // Coba gunakan quotes dari variabel `quotes` di halaman jika tersedia
            // let pageQuotes = window.quotes || [];
            // if (pageQuotes.length > 0) {
                // let randomQuote = pageQuotes[Math.floor(Math.random() * pageQuotes.length)];
                // document.getElementById("cloudText").textContent = randomQuote;
            // } else {
                // document.getElementById("cloudText").textContent = "Gagal memuat quotes.";
            // }
        // });

    // Event: Klik tombol close untuk menutup quotes
    document.getElementById("closeQuotes").addEventListener("click", function(event) {
        event.stopPropagation(); // Mencegah klik di luar menutup overlay
        document.getElementById("quotesOverlay").style.display = "none";
    });

    document.getElementById("quotesCloud").addEventListener("click", function() {
        window.location.href = "https://paggalih.github.io/reflection/";
    });

    document.getElementById("quotesOverlay").addEventListener("click", function() {
        document.getElementById("quotesOverlay").style.display = "none";
    });
		
});

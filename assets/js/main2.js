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

        // Create the container div
        const container = document.createElement('div');
        container.className = 'container';

        // Create and append the h3 element
        const h3 = document.createElement('h3');
        h3.textContent = 'Galih Pradananta';
        container.appendChild(h3);

        // Create and append the paragraph element
        const paragraph = document.createElement('p');
        paragraph.textContent = 'You just have to live for this one minute.';
        container.appendChild(paragraph);

        // Create the social links div
        const socialLinks = document.createElement('div');
        socialLinks.className = 'social-links';

        // Function to create a link with an icon and tooltip
        function createLink(href, className, iconClass, tooltipText) {
        const link = document.createElement('a');
        link.href = href;
        link.target = '_blank';
        link.className = className;

        // Add tooltip attributes
        link.setAttribute('data-bs-toggle', 'tooltip');
        link.setAttribute('data-bs-placement', 'top');
        link.setAttribute('title', tooltipText);

        const icon = document.createElement('i');
        icon.className = iconClass;
        link.appendChild(icon);

        return link;
        }

        // Append social links with tooltips
        socialLinks.appendChild(createLink('https://paggalih.github.io', 'home', 'bx bx-home', 'Home'));
        socialLinks.appendChild(createLink('https://www.facebook.com/paggalih', 'facebook', 'bx bxl-facebook', 'Facebook'));
        socialLinks.appendChild(createLink('https://www.instagram.com/paggalih/', 'instagram-alt', 'bx bxl-instagram-alt', 'Instagram'));
        socialLinks.appendChild(createLink('https://www.youtube.com/channel/UCG43eEqx6Rk-Q6AeLlip1MA', 'youtube', 'bx bxl-youtube', 'YouTube'));
        socialLinks.appendChild(createLink('https://dosenuin.github.io', '', 'bi bi-at', 'Website'));
        socialLinks.appendChild(createLink('https://orcid.org/0000-0002-0082-4654', '', 'bi bi-1-circle', 'OrcID'));
        socialLinks.appendChild(createLink('https://www.scopus.com/authid/detail.uri?authorId=57222808932', '', 'bi bi-2-circle','Scopus'));
        socialLinks.appendChild(createLink('https://sinta.kemdiktisaintek.go.id/authors/profile/6762635', '', 'bi bi-3-circle', 'SINTA'));

        // Append Google Scholar link separately due to different structure
        const scholarLink = document.createElement('a');
        scholarLink.href = 'https://scholar.google.com/citations?user=02ef424AAAAJ&hl=en';
        scholarLink.target = '_blank';
        scholarLink.setAttribute('data-bs-toggle', 'tooltip');
        scholarLink.setAttribute('data-bs-placement', 'top');
        scholarLink.setAttribute('title', 'Google Scholar');

        const scholarIcon = document.createElement('span');
        scholarIcon.className = 'material-symbols-outlined';
        scholarIcon.style.fontSize = '18px';
        scholarIcon.textContent = 'school';

        scholarLink.appendChild(scholarIcon);
        socialLinks.appendChild(scholarLink);

        container.appendChild(socialLinks);

        // Create and append the flag counter link
        const flagCounterLink = document.createElement('a');
        flagCounterLink.href = 'http://s01.flagcounter.com/more/rFMs';
        flagCounterLink.target = '_blank';
        flagCounterLink.className = 'flag-counter';

        const flagCounterImg = document.createElement('img');
        flagCounterImg.src = 'https://s01.flagcounter.com/count/rFMs/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_15/viewers_3/labels_1/pageviews_1/flags_1/percent_0/';
        flagCounterImg.alt = 'Free counters!';
        flagCounterImg.border = '0';

        flagCounterLink.appendChild(flagCounterImg);
        container.appendChild(flagCounterLink);

        // Create credits section
        const creditsSection = document.createElement('div');
        creditsSection.className = 'credits';

        // const creditsTitle = document.createElement('h5');
        // creditsTitle.textContent = 'My Best Regards';
        // creditsSection.appendChild(creditsTitle);

        const creditsList = document.createElement('ul');

        const creditItems = [
        { name: 'Mermaid.JS', url: 'https://mermaid.js.org' },
        { name: 'Chart.JS', url: 'https://www.chartjs.org/' },
        { name: 'UpMath', url: 'https://i.upmath.me' },
        { name: 'Bootstrap', url: 'https://getbootstrap.com' },
        { name: 'MathJax', url: 'https://www.mathjax.org' },
        { name: 'CodeMirror', url: 'https://codemirror.net/' },
        { name: 'SplitJS', url: 'https://split.js.org/' },
        { name: 'Gemini', url: 'https://gemini.google.com' },
        { name: 'ChatGPT', url: 'https://chatgpt.com' },
        { name: 'Deepseek', url: 'https://deepseek.com' },
        ];

        creditItems.forEach(item => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.url;
        link.target = '_blank';
        link.textContent = item.name;
        listItem.appendChild(link);
        creditsList.appendChild(listItem);
        });

        creditsSection.appendChild(creditsList);
        container.appendChild(creditsSection);

        // Append the container to the footer
        document.querySelector('footer').appendChild(container);

        // Initialize Bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
        });

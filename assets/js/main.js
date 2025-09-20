/**
* Template Name: MyResume
* Updated: Jun 13 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

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
        socialLinks.appendChild(createLink('https://www.tiktok.com/@galihagpradananta', 'tiktok', 'bx bxl-tiktok', 'YouTube'));
        socialLinks.appendChild(createLink('https://dosenuin.github.io', '', 'bi bi-at', 'Website'));

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
        
        const creditsTitle = document.createElement('h5');
        creditsTitle.textContent = 'My Best Regards';
        creditsSection.appendChild(creditsTitle);
        
        const creditsList = document.createElement('ul');
        
        const creditItems = [
            { name: 'Mermaid JS', url: 'https://mermaid.js.org' },
            { name: 'UpMath', url: 'https://i.upmath.me' },
            { name: 'Bootstrap', url: 'https://getbootstrap.com' },
            { name: 'MathJax', url: 'https://www.mathjax.org' },
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
        document.getElementById('footer').appendChild(container);

        // Initialize Bootstrap tooltips
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

// Function to load multiple stylesheets
function loadStylesheets(urls) {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  });
}

// List of stylesheets to load
const stylesheets = [
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
  // 'path/to/your/second/stylesheet.css',
];

// Load the stylesheets
loadStylesheets(stylesheets);

// const html = document.querySelector('html')
// html.setAttribute("data-bs-theme", "auto");

/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/bootstrap-auto-dark-mode
 * License: MIT, see file 'LICENSE'
 */

// ;(function () {
    // const htmlElement = document.querySelector("html")
    // if(htmlElement.getAttribute("data-bs-theme") === 'auto') {
        // function updateTheme() {
            // document.querySelector("html").setAttribute("data-bs-theme",
                // window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        // }

        // window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
        // updateTheme()
    // }
// })()

// ============================================
document.addEventListener("DOMContentLoaded", function () {
    const repoOwner = "paggalih"; // Username GitHub Anda
    const repoName = "paggalih.github.io"; // Nama repository Anda
    const branch = "main"; // Branch utama
    let currentPath = window.location.pathname;
    let pathParts = currentPath.split('/').filter(part => part !== "");

    if (pathParts.length < 2) {
        document.getElementById("folder-list").innerHTML = "Tidak dapat mendeteksi direktori.";
        return;
    }

    let folderPath = pathParts.slice(0, -1).join('/'); // Ambil satu tingkat di atas

    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let folderList = document.getElementById("folder-list");
            folderList.innerHTML = "";

            data.forEach(item => {
                if (item.type === "dir") { // Hanya menampilkan folder
                    let button = document.createElement("a");
                    button.href = `../${item.name}/`; // Link ke folder
                    button.id = "baca_juga"; // Ganti class dengan id
                    button.className = "btn btn-outline-primary w-auto";
                    // button.textContent = item.name;
                    button.textContent = item.name.replace(/-/g, ' ').toUpperCase();
                    folderList.appendChild(button);
                }
            });
        })
        .catch(error => {
            console.error("Error fetching folder list:", error);
            document.getElementById("folder-list").innerHTML = "Gagal memuat daftar folder.";
        });
});

// ========================================
			var date = new Date(document.lastModified);
			date1 = date.toLocaleDateString('id-ID',{weekday:'long',year: 'numeric', month: 'long', day: 'numeric' });
			jam1 = date.toLocaleTimeString('id-ID');
			document.getElementById("tanggal").innerHTML = "Halaman ini terakhir diubah pada "+date1+" Pukul "+jam1;
			
window.MathJax = {
  tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
  svg: { fontCache: 'global' }
};

MathJax = {
		tex: {
				inlineMath: [
						['$', '$'],
						['\\(', '\\)']
				]
		}
};

// ==================================================
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
        document.body.insertAdjacentHTML("beforeend", cloudHTML);
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

document.addEventListener("DOMContentLoaded", () => {
  const tabel_kotak = document.querySelectorAll(".tabel-kotak");
  tabel_kotak.forEach(table => {
    const rows = table.rows.length;
    const cols = table.rows[0].cells.length;
    const totalWidth = table.offsetWidth;
    const cellSize = totalWidth / cols;
    [...table.rows].forEach(row => {
      row.style.height = `${cellSize}px`;
    });
  });
});

    $('.datatable').DataTable({
      paging: true,
      searching: true,
      scrollX: true
    });

// MODE KOREKSI
document.addEventListener('DOMContentLoaded', function() {
    let hiddenTime;
    let timeoutId;
    const refreshAfter = 4*60*1000; // 1 menit dalam milidetik (60 * 1000)
    
    function handleVisibilityChange() {
        if (document.hidden) {
            // Tab menjadi tidak terlihat, catat waktu
            hiddenTime = Date.now();
            // Set timeout untuk refresh
            timeoutId = setTimeout(() => {
                window.location.reload();
            }, refreshAfter);
        } else {
            // Tab kembali terlihat, clear timeout jika ada
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }
    }
    
    // Tambahkan event listener untuk visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Juga handle kasus ketika halaman sudah dalam keadaan hidden saat load
    if (document.hidden) {
        handleVisibilityChange();
    }
});


// FUNGSI READ MORE
// function RM() {
//     var dots = document.getElementById("dots1");
//     var moreText = document.getElementById("more");
//     var btnText = document.getElementById("RMBtn");
  
//     if (dots.style.display === "none") {
//       dots.style.display = "inline";
//       btnText.innerHTML = "Perlihatkan"; 
//       moreText.style.display = "none";
//     } else {
//       dots.style.display = "none";
//       btnText.innerHTML = "Sembunyikan"; 
//       moreText.style.display = "inline";
//     }
//   }

function RM(x) {
    let dots = document.querySelector(`.card[data-x="${x}"] .dots`);
    let moreText = document.querySelector(`.card[data-x="${x}"] .more`); 
    let btnText = document.querySelector(`.card[data-x="${x}"] .RMBtn`);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.textContent = "Perlihatkan";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.textContent = "---Sembunyikan---"; 
        moreText.style.display = "inline";
    }
}
function RM1(x) {
    let dots = document.querySelector(`.card[data-x="${x}"] .dots1`);
    let moreText = document.querySelector(`.card[data-x="${x}"] .more1`); 
    let btnText = document.querySelector(`.card[data-x="${x}"] .RMBtn1`);

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.textContent = "Perlihatkan";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.textContent = "---Sembunyikan---"; 
        moreText.style.display = "inline";
    }
}

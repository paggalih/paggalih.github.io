
var datamap = new Map([
    [document.getElementById("myBtn1"), document.getElementById("myModal1")],
    [document.getElementById("myBtn2"), document.getElementById("myModal2")],
    [document.getElementById("myBtn3"), document.getElementById("myModal3")],
    [document.getElementById("myBtn4"), document.getElementById("myModal4")]
]);

datamap.forEach((value, key) => {
    doModal(key, value);
});

function doModal(anchor, popupbox) {

    // Get the <span> element that closes the modal
    var span = popupbox.getElementsByClassName("close")[0];

    anchor.addEventListener("click", function (event) {
        popupbox.style.display = "block";
    });

    span.addEventListener("click", function (event) {
        popupbox.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target == popupbox) {
            popupbox.style.display = "none";
        }
    });
}

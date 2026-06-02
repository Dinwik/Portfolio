const canvas = document.getElementById("canvas");

const xoff = document.getElementById("posx");
const yoff = document.getElementById("posy");

const iter = document.getElementById("iter");
const iterDisplay = document.getElementById("iterations");

iterDisplay.innerText = iter.value;
iter.addEventListener("input", function() {
    iterDisplay.innerText = iter.value;
    draw()
});


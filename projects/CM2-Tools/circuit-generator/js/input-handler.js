const bits = document.getElementById("bits");

const type = document.getElementById("type");
const memoryOptions = document.getElementById("memoryOptions");
const size = document.getElementById("memorySize");
const dual = document.getElementById("dual");

bits.addEventListener("change", function() {
    bits.value = Math.min(Math.max(bits.value, 1), 64);
});

type.addEventListener("change", function() {

    if (type.value == "memory") {
        memoryOptions.classList.remove("hidden");
    } else {
        memoryOptions.classList.add("hidden");
    }
});

size.addEventListener("change", function() {
    size.value = Math.min(Math.max(size.value, 1), 64);
});

const bits = document.getElementById("bits");

bits.addEventListener("change", function() {
    bits.value = Math.min(Math.max(bits.value, 1), 64);
});
const bits = document.getElementById("bits");
const type = document.getElementById("type");

const memoryOptions = document.getElementById("memoryOptions");
const size = document.getElementById("memorySize");
const dual = document.getElementById("dual");
memoryOptions.classList.add("hidden");

const rcaOptions = document.getElementById("rcaOptions");
const vertical = document.getElementById("vertical");
const synchronized = document.getElementById("synchronized");

bits.addEventListener("change", function() {
    bits.value = Math.min(Math.max(bits.value, 1), 64);
});

type.addEventListener("change", function() {
    
    memoryOptions.classList.add("hidden");
    rcaOptions.classList.add("hidden");

    switch(type.value) {
        case "memory":
            memoryOptions.classList.remove("hidden");
            break;
        case "rca":
            rcaOptions.classList.remove("hidden");
            break;
    }
});

size.addEventListener("change", function() {
    size.value = Math.min(Math.max(size.value, 1), 64);
});

const message = document.getElementById("message");

let preset = Math.floor(Math.random()*3);
switch (preset) {
    case 0:
        message.textContent = '12345';
        break;
    case 1:
        message.textContent = 'HELLO WORLD';
        break;
    case 2:
        message.textContent = 'Hello, World!';
        break;
}

const forceMinVersion = document.getElementById("forceMinVersion");
const minVersion = document.getElementById("minVersion");

const forceMaskPattern = document.getElementById("forceMaskPattern");
const maskPattern = document.getElementById("maskPattern");

const errorCorrectionLevel = document.getElementById("errorCorrectionLevel");

const infoOutput = document.getElementById("info-output");
infoOutput.textContent = '\n\n';


errorCorrectionLevel.addEventListener("input", function() {
    errorCorrectionLevel.value = Math.min(Math.max(errorCorrectionLevel.value, 1), 4);
});

forceMinVersion.addEventListener("input", function() {
    minVersion.value = 1;
    minVersion.disabled = !this.checked;
});

minVersion.addEventListener("input", function() {
    minVersion.value = Math.min(Math.max(minVersion.value, 1), 40);
});


forceMaskPattern.addEventListener("input", function() {
    maskPattern.disabled = !this.checked;
});

maskPattern.addEventListener("input", function() {
    maskPattern.value = Math.min(Math.max(maskPattern.value, 0), 7);
});
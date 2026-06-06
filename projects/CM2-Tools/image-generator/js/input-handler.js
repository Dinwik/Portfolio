const file_input = document.getElementById("file_input");
const drop = document.getElementById("drop");
const preview = document.getElementById("inputImage");
const ictx = preview.getContext("2d");

const vertical = document.getElementById("vertical")

const maxBlocks = document.getElementById("max");
maxBlocks.addEventListener("change", function() {
    maxBlocks.value = Math.min(Math.max(maxBlocks.value, 10), 150);
});

const tolerance = document.getElementById("tolerance");
tolerance.addEventListener("change", function() {
    tolerance.value = Math.min(Math.max(tolerance.value, 1), 64);
});

let input;

function displayInput(file) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
        preview.width = img.width;
        preview.height = img.height;
        ictx.drawImage(img, 0, 0);
        URL.revokeObjectURL(img.src);
    };
}

drop.addEventListener("click", () => file_input.click());

file_input.addEventListener("change", (e) => {
    const files = e.target.files;
    
    if (files.length > 0) {
        const file = files[0];
        
        if (file.type.startsWith('image/')) {
            input = file;
            displayInput(file);
        }
    }
});

drop.addEventListener("dragover", (e) => {
    e.preventDefault();
    drop.classList.add("dragover");
});

drop.addEventListener("dragleave", () => {
    drop.classList.remove("dragover");
});

drop.addEventListener('drop', (e) => {
    e.preventDefault();
    drop.classList.remove('dragover');

    const files = e.dataTransfer.files;

    if (files.length > 0) {
        const file = files[0];

        if (file.type.startsWith('image/')) {
            input = file;
            displayInput(file);
            
            const dt = new DataTransfer();
            dt.items.add(file);
            file_input.files = dt.files;
        }
    }
});

file_input.addEventListener('click', (e) => {
    e.target.value = '';
});
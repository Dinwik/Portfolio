const file_input = document.getElementById("file_input");
const drop = document.getElementById("drop");
const fileName = document.getElementById("filename");

let input;

function setFile(file) {
    if (file && /\.midi?$/i.test(file.name)) input = file;
    fileName.innerHTML = `Chosen file: ${file.name}`
}

drop.addEventListener("click", () => file_input.click());
file_input.addEventListener("change", () => setFile(file_input.files[0]));

drop.addEventListener("dragover", (e) => {
    e.preventDefault();
    drop.classList.add("dragover");
});

drop.addEventListener("dragleave", () => drop.classList.remove("dragover"));

drop.addEventListener("drop", (e) => {
    e.preventDefault();
    drop.classList.remove("dragover");
    setFile(e.dataTransfer.files[0]);
});
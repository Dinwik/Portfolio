const copyfail = document.getElementById("copyfail");

async function copy(messege) {
    copyfail.innerHTML = "";

    try {
        await navigator.clipboard.writeText(messege);
    } catch {
        const p = document.createElement("p");
        p.textContent = "Couldn't automatically copy to clipboard. Instead, copy it manually from here:";

        const text = document.createElement("textarea");
        text.value = messege;
        text.readOnly = true;

        copyfail.appendChild(p);
        copyfail.appendChild(text);
    }
}
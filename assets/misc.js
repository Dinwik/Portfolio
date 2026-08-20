const last_update = "Last update: 20 August 2026";
document.getElementById("last_update").textContent = last_update;

document.addEventListener('keydown', function(event) {
    if (event.target.tagName === 'TEXTAREA' && 
        event.target.getAttribute('tabfix') === 'true' && 
        event.key === 'Tab') {
        
        event.preventDefault();
        
        const textarea = event.target;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        textarea.value = textarea.value.substring(0, start) + "\t" + textarea.value.substring(end);

        textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
});
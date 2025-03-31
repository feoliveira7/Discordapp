document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("usernameID");
    
    input.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z0-9_]/g, "");
    });
});

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild("loader");
    })

    knop = document.querySelector("button");

    knop.onclick = function() {
        this.innerHTML = "Wait a moment...";
        this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        setTimeout(() => {
            this.innerHTML = "Submitting playlists...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },3000);
        setTimeout(() => {
            this.innerHTML = "Loading results...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },6000);
        setTimeout(() => {
            this.innerHTML = "Almost ready...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },10000);
        setTimeout(() => {
            this.innerHTML = "Loading code page...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },15000);
    }
})

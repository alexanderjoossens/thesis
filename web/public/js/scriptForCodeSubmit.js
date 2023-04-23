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
            this.innerHTML = "Submitting code...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },3000);
        setTimeout(() => {
            this.innerHTML = "Fetching your friends playlists...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },6000);
        setTimeout(() => {
            this.innerHTML = "Loading songs...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },9000);
        setTimeout(() => {
            this.innerHTML = "Exploring your music interests...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },12000);
        setTimeout(() => {
            this.innerHTML = "Finding matching interests...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },15000);
        setTimeout(() => {
            this.innerHTML = "Creating characteristic vectors...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },18000);
        setTimeout(() => {
            this.innerHTML = "Searching for new recommended songs...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },21000);
        setTimeout(() => {
            this.innerHTML = "Retreiving recommended songs...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },25000);
        setTimeout(() => {
            this.innerHTML = "Generating your new playlist...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },29000);
        setTimeout(() => {
            this.innerHTML = "Rendering final playlist page...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },35000);
        setTimeout(() => {
            this.innerHTML = "Almost ready...";
            this.style = "background: #f1f5f4; color: #333; pointer-events: none";
        },41000);
    }
})

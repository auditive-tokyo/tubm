document.addEventListener("DOMContentLoaded", function () {
    var links = document.querySelectorAll(".youtube-popup");
    var overlay = document.createElement("div");
    overlay.className = "youtube-popup-overlay";
    overlay.innerHTML = '<div class="youtube-popup-content"><span class="youtube-popup-close">&times;</span><iframe src="" frameborder="0" allowfullscreen></iframe></div>';
    document.body.appendChild(overlay);

    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            var videoId = this.getAttribute("data-video-id");
            var iframe = overlay.querySelector("iframe");
            iframe.src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
            overlay.style.display = "flex";
        });
    });

    overlay.querySelector(".youtube-popup-close").addEventListener("click", function () {
        overlay.style.display = "none";
        overlay.querySelector("iframe").src = "";
    });

    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.style.display = "none";
            overlay.querySelector("iframe").src = "";
        }
    });
});
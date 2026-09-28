
/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    menuBtn.textContent =
        navMenu.classList.contains("open") ? "✕" : "☰";
});


/* Close mobile menu after clicking a link */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");
        menuBtn.textContent = "☰";

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================
   FOOTER YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(link => {

        link.style.color = "";

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.style.color = "white";
        }

    });

});


/* =========================
   MEDIA LIGHTBOX
========================= */

const mediaModal = document.getElementById("mediaModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");

const mediaItems =
    document.querySelectorAll(".clickable-media");


mediaItems.forEach(item => {

    item.addEventListener("click", () => {

        modalContent.innerHTML = "";

        const type = item.dataset.type;

        if (type === "image") {

            const image = document.createElement("img");

            image.src = item.src;
            image.alt = item.alt || "Portfolio image";

            modalContent.appendChild(image);

        }

        if (type === "video") {

            const video = item.cloneNode(true);

            video.controls = true;
            video.autoplay = true;
            video.removeAttribute("poster");

            modalContent.appendChild(video);

        }

        mediaModal.classList.add("active");
        document.body.style.overflow = "hidden";

    });

});


/* CLOSE MODAL */

function closeMediaModal() {

    mediaModal.classList.remove("active");

    document.body.style.overflow = "";

    modalContent.innerHTML = "";

}


modalClose.addEventListener("click", closeMediaModal);


/* CLICK OUTSIDE */

mediaModal.addEventListener("click", event => {

    if (event.target === mediaModal) {
        closeMediaModal();
    }

});


/* ESC KEY */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMediaModal();
    }

});

/* =========================
   DYNAMIC ISLAND MUSIC
========================= */

const siteAudio = document.getElementById("siteAudio");
const playBtn = document.getElementById("playBtn");
const musicIsland = document.getElementById("musicIsland");
const trackStatus = document.getElementById("trackStatus");

playBtn.addEventListener("click", async () => {

    try {

        if (siteAudio.paused) {

            await siteAudio.play();

            playBtn.textContent = "❚❚";
            trackStatus.textContent = "Now playing";

            musicIsland.classList.add("playing");

        } else {

            siteAudio.pause();

            playBtn.textContent = "▶";
            trackStatus.textContent = "Paused";

            musicIsland.classList.remove("playing");

        }

    } catch (error) {

        console.error("Audio error:", error);
        trackStatus.textContent = "Could not play audio";

    }

});

/* =========================
   JOSTYCOON WEBSITE SCRIPT
========================= */

// Automatic copyright year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Social media link protection
document.querySelectorAll(".social-link").forEach(link => {

    link.addEventListener("click", function(event) {

        const url = this.getAttribute("href");

        if (!url || url === "#") {
            event.preventDefault();
            alert("Link media sosial belum tersedia.");
        }

    });

});

// Profile image fallback
const profileImage = document.querySelector(".profile-image img");

if (profileImage) {

    profileImage.addEventListener("error", function() {

        this.src = "https://placehold.co/300x300/111827/ffffff?text=J";

    });

}


/* ==================================
   JOSTYCOON INTERACTIVE SYSTEM
================================== */

// COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


/* ==================================
   PARTICLE ANIMATION
================================== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let width = 0;
let height = 0;

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

function resizeCanvas() {

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticles();
}

function createParticles() {

    particles = [];

    const amount = Math.min(
        85,
        Math.floor((width * height) / 10000)
    );

    for (let i = 0; i < amount; i++) {

        particles.push({

            x: Math.random() * width,
            y: Math.random() * height,

            size: Math.random() * 2 + 0.5,

            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,

            opacity: Math.random() * 0.7 + 0.2

        });
    }
}

function drawParticles() {

    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) {
            p.speedX *= -1;
        }

        if (p.y < 0 || p.y > height) {
            p.speedY *= -1;
        }

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(168, 130, 255, ${p.opacity})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = "#a855f7";

        ctx.fill();

    });

    ctx.shadowBlur = 0;

    // Connect nearby particles

    for (let i = 0; i < particles.length; i++) {

        for (let j = i + 1; j < particles.length; j++) {

            const p1 = particles[i];
            const p2 = particles[j];

            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 110) {

                ctx.beginPath();

                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);

                ctx.strokeStyle =
                    `rgba(139, 92, 246, ${0.15 * (1 - distance / 110)})`;

                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {

    drawParticles();

    if (!reduceMotion) {
        requestAnimationFrame(animateParticles);
    }
}

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

if (reduceMotion) {
    drawParticles();
} else {
    animateParticles();
}


/* ==================================
   BACKGROUND MUSIC PLAYER
================================== */

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicToggle");
const volumeControl = document.getElementById("volumeControl");

const musicIcon = musicButton.querySelector("i");

music.volume = 0.5;

// PLAY / PAUSE

musicButton.addEventListener("click", async () => {

    if (music.paused) {

        try {

            await music.play();

            musicIcon.className = "fa-solid fa-pause";
            musicButton.setAttribute("aria-label", "Pause music");

        } catch (error) {

            console.error("Music playback failed:", error);

            alert(
                "Musik tidak dapat diputar. Periksa file assets/music.mp3."
            );
        }

    } else {

        music.pause();

        musicIcon.className = "fa-solid fa-play";
        musicButton.setAttribute("aria-label", "Play music");
    }

});

// VOLUME CONTROL

volumeControl.addEventListener("input", () => {

    music.volume = Number(volumeControl.value);

});

// UPDATE ICON IF MUSIC ENDS OR PLAYBACK STOPS

music.addEventListener("pause", () => {

    musicIcon.className = "fa-solid fa-play";
    musicButton.setAttribute("aria-label", "Play music");

});

music.addEventListener("play", () => {

    musicIcon.className = "fa-solid fa-pause";
    musicButton.setAttribute("aria-label", "Pause music");

});

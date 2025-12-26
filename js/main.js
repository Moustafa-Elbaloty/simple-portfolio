/* ===============================
   ELEMENTS
================================ */
const body = document.body;

const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const progressBar = document.getElementById("scroll-progress");

const translatableElements = document.querySelectorAll("[data-en]");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

/* ===============================
   STATE
================================ */
let currentLang = localStorage.getItem("lang") || "en";

/* ===============================
   INIT (LOAD SAVED SETTINGS)
================================ */
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.remove("dark", "light");
    body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "☀" : "🌙";
}

applyLanguage();

/* ===============================
   SCROLL EFFECTS
================================ */
window.addEventListener("scroll", () => {
    /* Navbar shadow */
    body.classList.toggle("scrolled", window.scrollY > 50);

    /* Scroll progress */
    const scrollTop = window.scrollY;
    const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / docHeight) * 100;
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    /* Active nav link */
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollTop >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

/* ===============================
   THEME TOGGLE
================================ */
themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    body.classList.toggle("light");

    const theme = body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);

    themeToggle.textContent = theme === "dark" ? "☀" : "🌙";
});

/* ===============================
   LANGUAGE TOGGLE
================================ */
function applyLanguage() {
    translatableElements.forEach(el => {
        el.textContent = el.dataset[currentLang];
    });

    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
    langToggle.textContent = currentLang === "en" ? "AR" : "EN";

    localStorage.setItem("lang", currentLang);
}

langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    applyLanguage();
});

/* ===============================
   MOBILE MENU
================================ */
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    menuToggle.textContent =
        mobileMenu.classList.contains("active") ? "✕" : "☰";
});

/* Close menu when clicking a link */
mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuToggle.textContent = "☰";
    });
});

/* Close menu on resize */
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        mobileMenu.classList.remove("active");
        menuToggle.textContent = "☰";
    }
});

/* ===============================
   SCROLL ANIMATIONS
================================ */
const animatedItems = document.querySelectorAll(
    ".section, .skill-card, .project-card, .testimonial-card, .contact-card"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

animatedItems.forEach(item => {
    item.classList.add("fade-up");
    observer.observe(item);
});

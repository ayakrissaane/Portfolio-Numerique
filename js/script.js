
document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       1. MOBILE NAVIGATION
    ===================================== */

    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (toggle && nav) {

        toggle.addEventListener("click", function () {

            const isOpen = nav.classList.toggle("open");

            toggle.setAttribute("aria-expanded", String(isOpen));
            toggle.textContent = isOpen ? "✕" : "☰";

        });

        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("open");

                toggle.setAttribute("aria-expanded", "false");
                toggle.textContent = "☰";

            });

        });

    }


    /* =====================================
       2. LIGHT / DARK MODE
    ===================================== */

    const themeButton = document.querySelector(".theme-toggle");

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }

    if (themeButton) {

        themeButton.addEventListener("click", function () {

            document.body.classList.toggle("dark");

            const isDark = document.body.classList.contains("dark");

            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );

            themeButton.setAttribute(
                "aria-label",
                isDark ? "Activer le mode clair" : "Activer le mode nuit"
            );

        });

    }


    /* =====================================
       3. AUTOMATIC FOOTER YEAR
    ===================================== */

    document.querySelectorAll("[data-year]").forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });

});

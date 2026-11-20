
document.addEventListener("DOMContentLoaded", function () {

    // Menu mobile
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (toggle && nav) {

        toggle.addEventListener("click", function () {

            const isOpen = nav.classList.toggle("open");

            toggle.setAttribute("aria-expanded", String(isOpen));

            toggle.textContent = isOpen ? "✕" : "☰";

        });

        // Fermer le menu après le clic sur un lien
        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("open");

                toggle.setAttribute("aria-expanded", "false");

                toggle.textContent = "☰";

            });

        });

    }

    // Année automatique dans le footer
    document.querySelectorAll("[data-year]").forEach(function (element) {

        element.textContent = new Date().getFullYear();

    });

});



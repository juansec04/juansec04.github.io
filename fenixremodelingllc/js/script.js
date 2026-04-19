document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");

    if (menuToggle && navList) {
        menuToggle.addEventListener("click", function () {
            navList.classList.toggle("show");
        });
    }

    const contactForm = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (contactForm && formMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const service = document.getElementById("service").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !phone || !service || !message) {
                formMessage.textContent = "Please fill out all fields before submitting.";
                formMessage.style.color = "red";
                return;
            }

            formMessage.textContent = "Your request has been submitted successfully.";
            formMessage.style.color = "green";
            contactForm.reset();
        });
    }
});
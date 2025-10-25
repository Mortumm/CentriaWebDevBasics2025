// index.js
// Author: Nuno Mendes
// Date: 2025-10-22

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");
    const table = document.getElementById("timetable").querySelector("tbody");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll(".error").forEach(el => el.textContent = "");

        const timestamp = new Date().toISOString();
        document.getElementById("timestamp").value = timestamp;

        const fullName = form.fullName.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const birthDate = form.birthDate.value;
        const termsAccepted = form.terms.checked;

        let isValid = true;

        // Sanitize output to prevent XSS
        function sanitizeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
        }

        // Full Name validation
        if (fullName.length < 3) {
            showError("fullName", "Full name must be at least 3 characters.");
            isValid = false;
        }

        // Email validation, regex done with the help of ChatGPT
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError("email", "Please enter a valid email address.");
            isValid = false;
        }

        // Finnish phone validation, regex done with the help of ChatGPT
        const finnishPhoneRegex = /^(?:\+358|0)(?:[4-5]\d{1}|50)\d{6,7}$/;
        if (!finnishPhoneRegex.test(phone)) {
            showError("phone", "Enter a valid Finnish phone number (e.g. +358401234567 or 0401234567).");
            isValid = false;
        }

        // Birth date validation
        if (!birthDate || new Date(birthDate) >= new Date()) {
            showError("birthDate", "Birth date must be in the past.");
            isValid = false;
        }

        // Terms checkbox
        if (!termsAccepted) {
            showError("terms", "Terms need to be accepted to continue.");
            isValid = false;
        }

        if (isValid) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
              <td>${sanitizeHTML(fullName)}</td>
              <td>${sanitizeHTML(email)}</td>
              <td>${sanitizeHTML(phone)}</td>
              <td>${sanitizeHTML(birthDate)}</td>
              <td>${termsAccepted ? "✔️" : "❌"}</td>
            `;
            table.appendChild(newRow);
            form.reset();
        }
    });

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }
});
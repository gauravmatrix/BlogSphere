document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.querySelector("button");
    const inputs = document.querySelectorAll("input, textarea, select");

    // 🔥 Submit Button Hover Effect
    submitButton.addEventListener("mouseover", function () {
        this.classList.add("hover-effect");
    });

    submitButton.addEventListener("mouseout", function () {
        this.classList.remove("hover-effect");
    });

    // 🔥 Input Focus & Blur Effects
    inputs.forEach(input => {
        input.addEventListener("focus", function () {
            this.classList.add("input-focus");
        });

        input.addEventListener("blur", function () {
            this.classList.remove("input-focus");
        });
    });

    // 🔥 Form Validation
    form.addEventListener("submit", function (event) {
        let valid = true;

        inputs.forEach(input => {
            if (input.value.trim() === "") {
                valid = false;
                input.classList.add("input-error");
            } else {
                input.classList.remove("input-error");
            }
        });

        if (!valid) {
            event.preventDefault();
            alert("⚠️ Please fill all required fields!");
        }
    });
});

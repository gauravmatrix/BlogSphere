document.addEventListener("DOMContentLoaded", function () {
    // Typing Animation
    const text = "Your one-stop destination to explore and share amazing blogs.";
    let index = 0;
    
    function typeEffect() {
        if (index <= text.length) {  // '=' ensure karega ki last character bhi aaye
            document.getElementById("typing-text").textContent = text.substring(0, index); 
            index++;
            setTimeout(typeEffect, 50);
        }
    }
    
    typeEffect();
    
    // Smooth Scroll Effect on Load
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Scroll Reveal Effect
    const elements = document.querySelectorAll(".scroll-reveal");

    function revealOnScroll() {
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Run once in case elements are already in view
});

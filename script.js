// Dark mode toggle
document.getElementById("toggleDarkMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Scroll to top button logic
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    if (document.documentElement.scrollTop > 100) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

// Scroll to top functionality
scrollTopBtn.addEventListener("click", function() {
    document.documentElement.scrollTop = 0;
});

// Dynamic greeting based on the time of day
window.onload = function() {
    const greeting = document.getElementById("greeting");
    const hours = new Date().getHours();

    if (hours < 12) {
        greeting.innerHTML = "Good Morning!";
    } else if (hours < 18) {
        greeting.innerHTML = "Good Afternoon!";
    } else {
        greeting.innerHTML = "Good Evening!";
    }
};
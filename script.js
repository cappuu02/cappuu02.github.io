const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const header = document.querySelector('header');
const textContainers = document.querySelectorAll('.text-container');
const footer = document.querySelector('footer');

// Function to toggle dark mode
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');
    textContainers.forEach(container => container.classList.toggle('dark-mode'));
    footer.classList.toggle('dark-mode');

    // Change the button text to reflect the current mode
    if (body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '🌞'; // Switch to light mode symbol
    } else {
        themeToggleBtn.textContent = '🌙'; // Switch to dark mode symbol
    }
}

// Add event listener to toggle dark mode on button click
themeToggleBtn.addEventListener('click', toggleDarkMode);

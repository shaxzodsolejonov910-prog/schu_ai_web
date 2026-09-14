// Dark / Light mode almashtirish
const darkModeToggle = document.getElementById('darkModeToggle');

function applyIcon(isDark) {
    if (!darkModeToggle) return;
    darkModeToggle.classList.toggle('bi-moon', !isDark);
    darkModeToggle.classList.toggle('bi-sun', isDark);
}

if (darkModeToggle) {
    // 1. Sahifa yuklanganda — avval saqlangan holatni tekshiramiz
    const saved = localStorage.getItem('darkMode') === 'on';
    document.body.classList.toggle('dark-mode', saved);
    applyIcon(saved);

    // 2. Tugma bosilganda — klassni o'zgartiramiz VA localStorage'ga yozamiz
    darkModeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'on' : 'off');
        applyIcon(isDark);
    });
}

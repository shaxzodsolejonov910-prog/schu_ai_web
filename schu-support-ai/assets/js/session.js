// Login paytida saqlangan sessiya ma'lumotini "Hello, ..." qismida ko'rsatamiz
// va Log Out havolasini bosilganda sessiyani tozalaymiz.
(function () {
    const id = localStorage.getItem('schu_id');
    const greetingEl = document.getElementById('userGreetingText');

    if (id && greetingEl) {
        greetingEl.textContent = `Hello, ${id}!`;
    }

    document.querySelectorAll('a[href="login.html"]').forEach(link => {
        if (link.textContent.toLowerCase().includes('log out')) {
            link.addEventListener('click', () => {
                localStorage.removeItem('schu_role');
                localStorage.removeItem('schu_id');
            });
        }
    });
})();
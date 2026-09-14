const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Backend hali ulanmagani uchun demo tarzda muvaffaqiyat xabarini ko'rsatamiz
        contactSuccess.classList.add('show');
        contactForm.reset();

        window.setTimeout(() => {
            contactSuccess.classList.remove('show');
        }, 5000);
    });
}

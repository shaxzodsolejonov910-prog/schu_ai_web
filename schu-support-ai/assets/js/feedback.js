const starRating = document.getElementById('starRating');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');
let selectedRating = 0;

if (starRating) {
    const stars = starRating.querySelectorAll('i');

    function paintStars(value) {
        stars.forEach(star => {
            star.classList.toggle('filled', Number(star.getAttribute('data-value')) <= value);
        });
    }

    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = Number(star.getAttribute('data-value'));
            paintStars(selectedRating);
        });
        star.addEventListener('mouseenter', () => paintStars(Number(star.getAttribute('data-value'))));
    });

    starRating.addEventListener('mouseleave', () => paintStars(selectedRating));
}

if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Backend hali ulanmagani uchun demo tarzda muvaffaqiyat xabarini ko'rsatamiz
        feedbackSuccess.classList.add('show');
        feedbackForm.reset();
        selectedRating = 0;
        if (starRating) {
            starRating.querySelectorAll('i').forEach(s => s.classList.remove('filled'));
        }

        window.setTimeout(() => {
            feedbackSuccess.classList.remove('show');
        }, 5000);
    });
}

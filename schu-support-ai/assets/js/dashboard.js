// Bosh sahifa (student-dashboard.html) uchun xos mantiq.
// Hamburger menyu, submenu ochish-yopish va "active" holat endi
// assets/js/sidebar.js faylida — barcha sahifalarda umumiy ishlatiladi.

// "Try asking" chiplarini bosganda qidiruv maydoniga matnni joylaymiz
const chips = document.querySelectorAll('.chip');
const heroSearchInput = document.getElementById('heroSearchInput');

chips.forEach(chip => {
    chip.addEventListener('click', () => {
        if (!heroSearchInput) return;
        heroSearchInput.value = chip.textContent.trim();
        heroSearchInput.focus();
    });
});

// Bosh sahifadagi qidiruv qutisidan Enter bosilsa, Search sahifasiga o'sha so'rov bilan o'tkazamiz
if (heroSearchInput) {
    heroSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && heroSearchInput.value.trim() !== '') {
            window.location.href = `search.html?q=${encodeURIComponent(heroSearchInput.value.trim())}`;
        }
    });
}

const heroSendBtn = document.querySelector('.hero-text .send-btn');
if (heroSendBtn && heroSearchInput) {
    heroSendBtn.addEventListener('click', () => {
        if (heroSearchInput.value.trim() !== '') {
            window.location.href = `search.html?q=${encodeURIComponent(heroSearchInput.value.trim())}`;
        }
    });
}

// Popular Topics kartalari bosilganda tegishli bo'limga yo'naltirish
const topicLinks = {
    'topic-dorm': 'guides.html?cat=dormitory',
    'topic-acad': 'guides.html?cat=academic',
    'topic-visa': 'guides.html?cat=visa',
    'topic-schol': 'services.html?cat=scholarship',
    'topic-health': 'services.html?cat=health'
};

document.querySelectorAll('.topic-card').forEach(card => {
    const key = Object.keys(topicLinks).find(cls => card.classList.contains(cls));
    if (key) {
        card.addEventListener('click', () => {
            window.location.href = topicLinks[key];
        });
    }
});

// "Latest Notices" qatorlari bosilganda Notices sahifasiga o'tkazamiz
document.querySelectorAll('.card-panel .notice-row').forEach(row => {
    row.addEventListener('click', () => {
        window.location.href = 'notices.html';
    });
});

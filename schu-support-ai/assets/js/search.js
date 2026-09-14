// Demo ma'lumotlar (keyinchalik backend/API bilan almashtirilishi mumkin)
const searchData = [
    { category: 'Dormitory', title: 'Dormitory Application Guide', link: 'guides.html' },
    { category: 'Dormitory', title: '2026-2nd Semester Dormitory Application Notice', link: 'notices.html' },
    { category: 'Visa', title: 'Visa Extension Process', link: 'guides.html' },
    { category: 'Visa', title: 'D-10 Visa Application Guide', link: 'notices.html' },
    { category: 'Scholarship', title: 'Global Korea Scholarship Info', link: 'services.html' },
    { category: 'Scholarship', title: 'TOPIK Score Submission for Scholarship', link: 'notices.html' },
    { category: 'Academic', title: 'Course Registration Steps', link: 'guides.html' },
    { category: 'Academic', title: 'Summer Session Course Registration', link: 'notices.html' },
    { category: 'Health', title: 'Health Insurance Enrollment', link: 'services.html' },
    { category: 'Life', title: 'Public Transportation Guide', link: 'life-in-korea.html' },
    { category: 'Life', title: 'Opening a Bank Account', link: 'life-in-korea.html' },
    { category: 'Life', title: 'Korean Culture & Etiquette', link: 'life-in-korea.html' }
];

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

function renderResults(query) {
    if (!searchResults) return;

    if (query.trim() === '') {
        searchResults.innerHTML = '<p class="text-muted mb-0">Start typing to search...</p>';
        return;
    }

    const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
        searchResults.innerHTML = '<p class="text-muted mb-0">No results found. Try the AI Chat Assistant for a direct answer.</p>';
        return;
    }

    searchResults.innerHTML = '';
    filtered.forEach(item => {
        const row = document.createElement('a');
        row.href = item.link;
        row.className = 'notice-row';
        row.innerHTML = `
            <span class="tag tag-notice">${item.category}</span>
            <span class="notice-title">${item.title}</span>
            <i class="bi bi-chevron-right" style="color:#c3cad6;"></i>
        `;
        searchResults.appendChild(row);
    });
}

if (searchInput) {
    // Boshqa sahifadan ?q= bilan kelingan bo'lsa avtomatik qidiramiz
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q');
    if (initialQuery) {
        searchInput.value = initialQuery;
        renderResults(initialQuery);
    }

    searchInput.addEventListener('input', () => {
        renderResults(searchInput.value);
    });
}

if (searchBtn) {
    searchBtn.addEventListener('click', () => {
        renderResults(searchInput.value);
    });
}

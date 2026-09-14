const articlesData = [
    { icon: 'bi-people', cat: 'Culture', tagClass: 'thumb-culture', title: 'Korean Culture & Etiquette', excerpt: 'Learn about Korean culture, etiquette, and daily life.', date: '2026.08.24' },
    { icon: 'bi-train-front', cat: 'Transportation', tagClass: 'thumb-transportation', title: 'Public Transportation Guide', excerpt: 'How to use subway, bus, and T-money card.', date: '2026.08.20' },
    { icon: 'bi-egg-fried', cat: 'Food', tagClass: 'thumb-food', title: 'Must-Try Korean Food', excerpt: 'Discover popular Korean dishes and restaurant tips.', date: '2026.08.18' },
    { icon: 'bi-house-heart', cat: 'Housing', tagClass: 'thumb-housing', title: 'Living in Korea Tips', excerpt: 'Tips for shopping, banking, and daily life.', date: '2026.08.15' },
    { icon: 'bi-camera', cat: 'Recreation', tagClass: 'thumb-recreation', title: 'Best Places to Visit', excerpt: 'Recommended travel spots in Korea.', date: '2026.08.10' },
    { icon: 'bi-shield-check', cat: 'Safety', tagClass: 'thumb-safety', title: 'Staying Safe as a Student', excerpt: 'Emergency numbers and everyday safety tips for international students.', date: '2026.08.05' },
    { icon: 'bi-bank', cat: 'Housing', tagClass: 'thumb-housing', title: 'Opening a Bank Account', excerpt: 'Step-by-step guide to opening your first Korean bank account.', date: '2026.07.30' },
    { icon: 'bi-controller', cat: 'Recreation', tagClass: 'thumb-recreation', title: 'Weekend Trip Ideas', excerpt: 'Easy day trips from Asan for students on a budget.', date: '2026.07.22' }
];

const articleGrid = document.getElementById('articleGrid');
const lifeChips = document.getElementById('lifeChips');
const lifeSearchInput = document.getElementById('lifeSearchInput');
const lifeSearchBtn = document.getElementById('lifeSearchBtn');
const lifeViewAll = document.getElementById('lifeViewAll');

const urlParams = new URLSearchParams(window.location.search);
const catMap = { transportation: 'Transportation', housing: 'Housing', culture: 'Culture' };
let activeCategory = catMap[urlParams.get('cat')] || 'All';
let searchTerm = '';
let showAll = false;

function render() {
    if (!articleGrid) return;

    let filtered = articlesData;
    if (activeCategory !== 'All') {
        filtered = filtered.filter(a => a.cat === activeCategory);
    }
    if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q));
    }
    if (!showAll) {
        filtered = filtered.slice(0, 5);
    }

    if (filtered.length === 0) {
        articleGrid.innerHTML = '<p class="text-muted mb-0">No articles found.</p>';
        return;
    }

    articleGrid.innerHTML = filtered.map(a => `
        <div class="article-card">
            <div class="thumb ${a.tagClass}">
                <i class="bi ${a.icon}"></i>
                <span class="cat-tag">${a.cat}</span>
            </div>
            <div class="body">
                <h3>${a.title}</h3>
                <p>${a.excerpt}</p>
                <div class="art-date">${a.date}</div>
            </div>
        </div>
    `).join('');
}

if (lifeChips) {
    lifeChips.querySelectorAll('.filter-chip').forEach(chip => {
        if (chip.getAttribute('data-cat') === activeCategory) chip.classList.add('active');
        chip.addEventListener('click', () => {
            lifeChips.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.getAttribute('data-cat');
            render();
        });
    });
    if (!lifeChips.querySelector('.filter-chip.active')) {
        lifeChips.querySelector('.filter-chip[data-cat="All"]').classList.add('active');
    }
}

if (lifeSearchInput) {
    lifeSearchInput.addEventListener('input', () => { searchTerm = lifeSearchInput.value; render(); });
}
if (lifeSearchBtn && lifeSearchInput) {
    lifeSearchBtn.addEventListener('click', () => { searchTerm = lifeSearchInput.value; render(); });
}
if (lifeViewAll) {
    lifeViewAll.addEventListener('click', () => {
        showAll = true;
        lifeViewAll.style.display = 'none';
        render();
    });
}

render();

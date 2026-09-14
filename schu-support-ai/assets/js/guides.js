const guidesData = [
    { icon: 'bi-file-earmark-person', category: 'Admission', title: 'How to Apply for Dormitory', excerpt: 'Detailed information about dormitory application process, documents, and schedules.', date: '2026.08.24' },
    { icon: 'bi-mortarboard', category: 'Academic', title: 'Course Registration Guide', excerpt: 'Step-by-step guide for course registration (for new and continuing students).', date: '2026.08.20' },
    { icon: 'bi-file-earmark-text', category: 'Visa', title: 'Visa Extension Guide (D-2)', excerpt: 'Required documents, application process, and important notes for visa extension.', date: '2026.08.16' },
    { icon: 'bi-cash-coin', category: 'Dormitory', title: 'Tuition Payment Guide', excerpt: 'How to make virtual account payment and important information.', date: '2026.08.15' },
    { icon: 'bi-clipboard-check', category: 'Academic', title: 'TOPIK Registration Guide', excerpt: 'How to register for TOPIK exam and important dates.', date: '2026.08.10' },
    { icon: 'bi-house-door', category: 'Dormitory', title: 'Dormitory Move-in Checklist', excerpt: 'What to bring and what is provided in your dorm room.', date: '2026.08.02' },
    { icon: 'bi-shield-check', category: 'Visa', title: 'Alien Registration Card (ARC) Guide', excerpt: 'Where and how to apply for your Alien Registration Card after arrival.', date: '2026.07.28' },
    { icon: 'bi-award', category: 'Scholarship', title: 'Global Korea Scholarship Guide', excerpt: 'Eligibility, required documents and the yearly application timeline.', date: '2026.07.20' }
];

const guideList = document.getElementById('guideList');
const guideChips = document.getElementById('guideChips');
const guideSearchInput = document.getElementById('guideSearchInput');
const guideSearchBtn = document.getElementById('guideSearchBtn');

const urlParams = new URLSearchParams(window.location.search);
const catMap = { visa: 'Visa', dormitory: 'Dormitory', academic: 'Academic', scholarship: 'Scholarship', admission: 'Admission' };
let activeCategory = catMap[urlParams.get('cat')] || 'All';
let searchTerm = '';

function render() {
    if (!guideList) return;

    let filtered = guidesData;
    if (activeCategory !== 'All') {
        filtered = filtered.filter(g => g.category === activeCategory);
    }
    if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(g => g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
        guideList.innerHTML = '<p class="text-muted text-center py-4 mb-0">No guides found.</p>';
        return;
    }

    guideList.innerHTML = filtered.map(g => `
        <div class="list-row">
            <div class="row-icon"><i class="bi ${g.icon}"></i></div>
            <div class="row-body">
                <div class="row-title">${g.title}</div>
                <div class="row-sub">${g.excerpt}</div>
            </div>
            <div class="row-date">${g.date}</div>
            <i class="bi bi-chevron-right" style="color:#c3cad6;"></i>
        </div>
    `).join('');
}

if (guideChips) {
    guideChips.querySelectorAll('.filter-chip').forEach(chip => {
        if (chip.getAttribute('data-cat') === activeCategory) chip.classList.add('active');
        chip.addEventListener('click', () => {
            guideChips.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.getAttribute('data-cat');
            render();
        });
    });
    if (!guideChips.querySelector('.filter-chip.active')) {
        guideChips.querySelector('.filter-chip[data-cat="All"]').classList.add('active');
    }
}

if (guideSearchInput) {
    guideSearchInput.addEventListener('input', () => { searchTerm = guideSearchInput.value; render(); });
}
if (guideSearchBtn && guideSearchInput) {
    guideSearchBtn.addEventListener('click', () => { searchTerm = guideSearchInput.value; render(); });
}

render();

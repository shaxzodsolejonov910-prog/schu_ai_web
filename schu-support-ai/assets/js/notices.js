// Notices sahifasi uchun demo ma'lumotlar bazasi
const notices = [
    { tag: 'new', label: 'NEW', category: 'Dormitory', title: '2026-2nd Semester Dormitory Application Notice', excerpt: 'Dormitory application schedule, required documents, and important information for 2026-2 semester.', date: '2026.09.05' },
    { tag: 'notice', label: 'NOTICE', category: 'Academic', title: 'Summer Session Course Registration 안내', excerpt: 'Information about summer course registration period and procedures.', date: '2026.08.28' },
    { tag: 'notice', label: 'NOTICE', category: 'Scholarship', title: 'TOPIK Score Submission for Scholarship', excerpt: 'Scholarship applicants must submit their TOPIK score within the period.', date: '2026.08.25' },
    { tag: 'new', label: 'NEW', category: 'Dormitory', title: 'Global Village Clean Day 안내', excerpt: 'Monthly cleaning inspection schedule for Global Village.', date: '2026.08.20' },
    { tag: 'notice', label: 'NOTICE', category: 'Visa', title: 'D-10 Visa Application Guide', excerpt: 'Required documents and procedures for D-10 visa application.', date: '2026.08.15' },
    { tag: 'new', label: 'NEW', category: 'Events', title: 'Dokdo Trip Recruitment', excerpt: 'Recruitment for the Dokdo exploration trip (Sep 16-18, 2026).', date: '2026.08.12' },
    { tag: 'important', label: 'IMPORTANT', category: 'Health', title: 'Mandatory Health Checkup for New Students', excerpt: 'All newly admitted international students must complete the health checkup by the deadline.', date: '2026.08.05' },
    { tag: 'notice', label: 'NOTICE', category: 'Academic', title: 'Academic Calendar for 2026 Fall Semester', excerpt: 'Key academic dates including add/drop period, exam weeks, and holidays.', date: '2026.07.30' }
];

const categories = ['Academic', 'Dormitory', 'Visa', 'Scholarship', 'Health', 'Events'];

const noticeList = document.getElementById('noticeList');
const noticeCount = document.getElementById('noticeCount');
const categoryFilterList = document.getElementById('categoryFilterList');
const noticeChips = document.getElementById('noticeChips');
const noticeSearchInput = document.getElementById('noticeSearchInput');
const noticeSearchBtn = document.getElementById('noticeSearchBtn');

let activeCategory = 'All';
let checkedCategories = new Set(categories);
let searchTerm = '';

function categoryToTagClass(tag) {
    return `tag-${tag}`;
}

function render() {
    if (!noticeList) return;

    let filtered = notices.filter(n => checkedCategories.has(n.category));

    if (activeCategory !== 'All') {
        filtered = filtered.filter(n => n.category === activeCategory);
    }

    if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(n =>
            n.title.toLowerCase().includes(q) ||
            n.excerpt.toLowerCase().includes(q) ||
            n.category.toLowerCase().includes(q)
        );
    }

    noticeCount.textContent = `Total ${filtered.length} results`;

    if (filtered.length === 0) {
        noticeList.innerHTML = '<p class="text-muted text-center py-4 mb-0">No notices match your filters.</p>';
        return;
    }

    noticeList.innerHTML = filtered.map(n => `
        <div class="list-row">
            <div class="row-icon"><i class="bi bi-file-earmark-text"></i></div>
            <div class="row-body">
                <div class="row-title"><span class="tag ${categoryToTagClass(n.tag)}" style="margin-right:8px;">${n.label}</span>${n.title}</div>
                <div class="row-sub">${n.excerpt}</div>
            </div>
            <div class="row-date">${n.date}</div>
            <i class="bi bi-chevron-right" style="color:#c3cad6;"></i>
        </div>
    `).join('');
}

function renderCategoryFilter() {
    if (!categoryFilterList) return;

    const allRow = `
        <label class="cf-row">
            <span><input type="checkbox" id="cfAll" ${checkedCategories.size === categories.length ? 'checked' : ''}> All</span>
            <span class="cf-count">${notices.length}</span>
        </label>`;

    const rows = categories.map(cat => {
        const count = notices.filter(n => n.category === cat).length;
        return `
        <label class="cf-row">
            <span><input type="checkbox" class="cf-cat" value="${cat}" ${checkedCategories.has(cat) ? 'checked' : ''}> ${cat === 'Visa' ? 'Visa & Immigration' : cat === 'Health' ? 'Health & Insurance' : cat}</span>
            <span class="cf-count">${count}</span>
        </label>`;
    }).join('');

    categoryFilterList.innerHTML = allRow + rows;

    document.getElementById('cfAll').addEventListener('change', (e) => {
        checkedCategories = e.target.checked ? new Set(categories) : new Set();
        renderCategoryFilter();
        render();
    });

    document.querySelectorAll('.cf-cat').forEach(cb => {
        cb.addEventListener('change', (e) => {
            if (e.target.checked) {
                checkedCategories.add(e.target.value);
            } else {
                checkedCategories.delete(e.target.value);
            }
            renderCategoryFilter();
            render();
        });
    });
}

if (noticeChips) {
    noticeChips.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            noticeChips.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.getAttribute('data-cat');
            render();
        });
    });
}

if (noticeSearchInput) {
    noticeSearchInput.addEventListener('input', () => {
        searchTerm = noticeSearchInput.value;
        render();
    });
}

if (noticeSearchBtn && noticeSearchInput) {
    noticeSearchBtn.addEventListener('click', () => {
        searchTerm = noticeSearchInput.value;
        render();
    });
}

renderCategoryFilter();
render();

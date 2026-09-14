const servicesData = [
    { icon: 'bi-building', category: 'Dormitory', title: 'Dormitory', desc: 'Application, move-in, rules and more', link: 'guides.html?cat=dormitory' },
    { icon: 'bi-book', category: 'Academic', title: 'Academic', desc: 'Course registration, grades, transcript', link: 'guides.html?cat=academic' },
    { icon: 'bi-file-earmark-text', category: 'Visa', title: 'Visa & Immigration', desc: 'Visa extension, alien registration', link: 'guides.html?cat=visa' },
    { icon: 'bi-mortarboard', category: 'Academic', title: 'Scholarships', desc: 'Global Korea, SCHU scholarships', link: 'services.html?cat=academic' },
    { icon: 'bi-heart', category: 'Health', title: 'Health & Insurance', desc: 'Insurance, clinic, health checkup', link: '#' },
    { icon: 'bi-cash-coin', category: 'Others', title: 'Financial Services', desc: 'Tuition, virtual account, refund', link: '#' },
    { icon: 'bi-people', category: 'Others', title: 'Student Support', desc: 'Counseling, mentoring, student affairs', link: 'contact-us.html' },
    { icon: 'bi-building-gear', category: 'Others', title: 'Useful Facilities', desc: 'Library, computer lab, career center', link: '#' },
    { icon: 'bi-three-dots', category: 'Others', title: 'Others', desc: 'Lost & found, documents, other inquiries', link: 'contact-us.html' }
];

const serviceGrid = document.getElementById('serviceGrid');
const serviceChips = document.getElementById('serviceChips');
const serviceSearchInput = document.getElementById('serviceSearchInput');
const serviceSearchBtn = document.getElementById('serviceSearchBtn');

const urlParams = new URLSearchParams(window.location.search);
const catMap = { dormitory: 'Dormitory', academic: 'Academic', visa: 'Visa', scholarship: 'Academic', health: 'Health' };
let activeCategory = catMap[urlParams.get('cat')] || 'All';
let searchTerm = '';

function render() {
    if (!serviceGrid) return;

    let filtered = servicesData;
    if (activeCategory !== 'All') {
        filtered = filtered.filter(s => s.category === activeCategory);
    }
    if (searchTerm.trim() !== '') {
        const q = searchTerm.toLowerCase();
        filtered = filtered.filter(s => s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
        serviceGrid.innerHTML = '<p class="text-muted mb-0">No services found.</p>';
        return;
    }

    serviceGrid.innerHTML = filtered.map(s => `
        <a class="service-card" href="${s.link}" style="text-decoration:none;">
            <div class="icon-wrap"><i class="bi ${s.icon}"></i></div>
            <h3>${s.title}</h3>
            <p>${s.desc}</p>
        </a>
    `).join('');
}

if (serviceChips) {
    serviceChips.querySelectorAll('.filter-chip').forEach(chip => {
        if (chip.getAttribute('data-cat') === activeCategory) chip.classList.add('active');
        chip.addEventListener('click', () => {
            serviceChips.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.getAttribute('data-cat');
            render();
        });
    });
    if (!serviceChips.querySelector('.filter-chip.active')) {
        serviceChips.querySelector('.filter-chip[data-cat="All"]').classList.add('active');
    }
}

if (serviceSearchInput) {
    serviceSearchInput.addEventListener('input', () => { searchTerm = serviceSearchInput.value; render(); });
}
if (serviceSearchBtn && serviceSearchInput) {
    serviceSearchBtn.addEventListener('click', () => { searchTerm = serviceSearchInput.value; render(); });
}

render();

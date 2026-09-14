// ============================================================
// admin.js — Admin Dashboard uchun barcha interaktivlik:
// mobil hamburger menyu, submenu ochish-yopish, jonli sana,
// Conversation Statistics uchun SVG chiziqli grafik, Recent
// Notices / Recent Chat Logs ro'yxatlarini render qilish.
// ============================================================

// ---------- Mobil hamburger menyu ----------
(function () {
    const hamburgerBtn = document.getElementById('aHamburgerBtn');
    const sidebar = document.getElementById('aSidebar');
    const overlay = document.getElementById('aSidebarOverlay');

    if (!hamburgerBtn || !sidebar || !overlay) return;

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
    }
    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    }

    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
    });
    overlay.addEventListener('click', closeSidebar);
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) closeSidebar();
    });
})();

// ---------- Submenu (Knowledge Base / Users / Settings) ----------
document.querySelectorAll('.a-nav-item.has-submenu').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-target');
        const submenu = document.getElementById(targetId);
        if (!submenu) return;
        const willOpen = !submenu.classList.contains('open');
        trigger.classList.toggle('open', willOpen);
        submenu.classList.toggle('open', willOpen);
    });
});

// ---------- Jonli sana ----------
(function () {
    const dateChip = document.getElementById('aDateChip');
    if (!dateChip) return;

    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    let h = now.getHours();
    const min = String(now.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;

    dateChip.textContent = `${y}.${m}.${d} (${days[now.getDay()]}) ${h}:${min} ${ampm}`;
})();

// ---------- Sessiyadan admin ID ko'rsatish ----------
(function () {
    const role = localStorage.getItem('schu_role');
    const id = localStorage.getItem('schu_id');
    const emailEl = document.getElementById('adminEmail');
    if (role === 'admin' && id && emailEl) {
        emailEl.textContent = id;
    }

    const logoutLink = document.getElementById('adminLogout');
    if (logoutLink) {
        logoutLink.addEventListener('click', () => {
            localStorage.removeItem('schu_role');
            localStorage.removeItem('schu_id');
        });
    }
})();

// ---------- Conversation Statistics — SVG chiziqli grafik ----------
(function () {
    const container = document.getElementById('conversationChart');
    if (!container) return;

    // Demo ma'lumotlar (kunlar bo'yicha suhbatlar soni)
    const labels = ['05.01', '05.06', '05.11', '05.16', '05.21', '05.24'];
    const thisMonth = [60, 130, 165, 210, 260, 320];
    const lastMonth = [40, 90, 120, 150, 185, 210];

    const width = 640;
    const height = 220;
    const padding = { top: 10, right: 10, bottom: 24, left: 34 };
    const maxVal = Math.max(...thisMonth, ...lastMonth) * 1.15;

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    function pointsFor(series) {
        return series.map((v, i) => {
            const x = padding.left + (i / (series.length - 1)) * chartW;
            const y = padding.top + chartH - (v / maxVal) * chartH;
            return [x, y];
        });
    }

    function toPath(points) {
        return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    }

    const thisPoints = pointsFor(thisMonth);
    const lastPoints = pointsFor(lastMonth);

    // Grid chiziqlari (gorizontal, 4 ta bo'lak)
    let gridLines = '';
    const gridCount = 4;
    for (let i = 0; i <= gridCount; i++) {
        const y = padding.top + (chartH / gridCount) * i;
        const val = Math.round(maxVal - (maxVal / gridCount) * i);
        gridLines += `<line x1="${padding.left}" y1="${y.toFixed(1)}" x2="${width - padding.right}" y2="${y.toFixed(1)}" stroke="#eef1f7" stroke-width="1"/>`;
        gridLines += `<text x="4" y="${(y + 4).toFixed(1)}" font-size="10" fill="#9aa3b3" font-family="Inter, sans-serif">${val}</text>`;
    }

    // X o'qi labellari
    let xLabels = '';
    thisPoints.forEach((p, i) => {
        xLabels += `<text x="${p[0].toFixed(1)}" y="${height - 6}" font-size="10" fill="#9aa3b3" font-family="Inter, sans-serif" text-anchor="middle">${labels[i]}</text>`;
    });

    // Nuqtalar (faqat "This Month" chizig'ida, hover uchun)
    let dots = '';
    thisPoints.forEach((p, i) => {
        dots += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.5" fill="#1b57c9">
            <title>${labels[i]}: This Month ${thisMonth[i]}, Last Month ${lastMonth[i]}</title>
        </circle>`;
    });

    const svg = `
        <svg viewBox="0 0 ${width} ${height}" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
            ${gridLines}
            <path d="${toPath(lastPoints)}" fill="none" stroke="#c7d1e0" stroke-width="2" stroke-dasharray="5 5"/>
            <path d="${toPath(thisPoints)}" fill="none" stroke="#1b57c9" stroke-width="2.5"/>
            ${dots}
            ${xLabels}
        </svg>
    `;

    container.innerHTML = svg;
})();

// ---------- Recent Notices ----------
(function () {
    const list = document.getElementById('recentNoticesList');
    if (!list) return;

    const data = [
        { tag: 'IMPORTANT', cls: 'badge-important', title: '2026-2학기 기숙사 신청 안내', date: '2026.05.24', status: 'Published' },
        { tag: 'NOTICE', cls: 'badge-notice', title: '여름 계절학기 수강신청 안내', date: '2026.05.23', status: 'Published' },
        { tag: 'NOTICE', cls: 'badge-notice', title: 'TOPIK 성적 제출 안내(장학금)', date: '2026.05.21', status: 'Published' },
        { tag: 'EVENT', cls: 'badge-event', title: 'Global Village Clean Day 안내', date: '2026.05.20', status: 'Published' },
        { tag: 'NOTICE', cls: 'badge-notice', title: '비자 연장 서류 제출 안내', date: '2026.05.19', status: 'Draft' }
    ];

    list.innerHTML = data.map(n => `
        <div class="a-table-row">
            <span class="badge-tag ${n.cls}">${n.tag}</span>
            <span class="row-title">${n.title}</span>
            <span class="row-date">${n.date}</span>
            <span class="status-pill ${n.status === 'Published' ? 'status-published' : 'status-draft'}">${n.status}</span>
        </div>
    `).join('');
})();

// ---------- Recent Chat Logs ----------
(function () {
    const list = document.getElementById('recentChatLogsList');
    if (!list) return;

    const data = [
        { flag: '🇺🇿', color: '#1eb53a', user: 'User (20251709)', msg: 'Yotoqxona arizasi qachongacha?', time: '10:28 AM', tag: 'Dormitory' },
        { flag: '🇨🇳', color: '#de2910', user: 'User (20251822)', msg: 'How can I extend my visa?', time: '10:25 AM', tag: 'Visa' },
        { flag: '🇷🇺', color: '#0039a6', user: 'User (20251645)', msg: 'Где я могу найти информацию о стипендии?', time: '10:20 AM', tag: 'Scholarship' },
        { flag: '🇻🇳', color: '#da251d', user: 'User (20251888)', msg: '课程注册什么时候开始?', time: '10:18 AM', tag: 'Course' },
        { flag: '🇮🇩', color: '#ce1126', user: 'User (20251755)', msg: 'Asuransi kesehatan bagaimana cara daftarnya?', time: '10:15 AM', tag: 'Insurance' }
    ];

    list.innerHTML = data.map(c => `
        <div class="chatlog-row">
            <div class="flag-icon" style="background:${c.color};">${c.flag}</div>
            <div class="cl-body">
                <div class="cl-user">${c.user}</div>
                <div class="cl-msg">${c.msg}</div>
            </div>
            <span class="cl-time">${c.time}</span>
            <span class="badge-tag badge-notice" style="background:#eaf1fd;color:#1b57c9;">${c.tag}</span>
        </div>
    `).join('');
})();

// ---------- Quick action / Add Notice tugmalari (demo) ----------
document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        alert('This is a UI demo — connect a backend to make this action fully functional.');
    });
});

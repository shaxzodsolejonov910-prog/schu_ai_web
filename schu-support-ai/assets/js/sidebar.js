// ============================================================
// sidebar.js — barcha ichki sahifalarda ishlatiladigan umumiy
// sidebar mantiqi: mobil hamburger menyu + joriy sahifaga qarab
// "active" holatni belgilash + Guides/Services/Life in Korea
// submenularini ochish-yopish.
//
// Eslatma: oldin har bir sahifa "active" klassini FAQAT bosilgan
// nav-item'ga qo'shar edi (link bosilib, boshqa sahifaga o'tib
// ketguncha). Bu URL orqali to'g'ridan-to'g'ri kirilganda hech
// qanday nav-item belgilanmasligiga olib kelardi. Endi "active"
// holat joriy sahifa manziliga qarab avtomatik aniqlanadi.
// ============================================================

(function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    function openSidebar() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
    }

    function closeSidebar() {
        if (!sidebar || !sidebarOverlay) return;
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
    }

    // Hamburger tugmasi har doim ham mavjud bo'lavermaydi (masalan
    // ba'zi eski sahifalarda yo'q edi) — shu sababli mavjudligini
    // tekshirib keyin eventlarni ulaymiz, aks holda skript to'xtab
    // qolib, ostidagi barcha kod ishlamay qolardi.
    if (hamburgerBtn && sidebar && sidebarOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        sidebarOverlay.addEventListener('click', closeSidebar);

        // Ekran kengaytirilsa (desktopga o'tsa) sidebar avtomatik yopiq holatga qaytsin
        window.addEventListener('resize', () => {
            if (window.innerWidth > 992) closeSidebar();
        });
    }

    // ---------- Joriy sahifaga qarab "active" holatni belgilash ----------
    const currentPage = (window.location.pathname.split('/').pop() || 'student-dashboard.html');

    // Havoladagi "?cat=..." kabi query qismini olib tashlab, faqat fayl nomini solishtiramiz
    function linkPage(link) {
        return (link.getAttribute('href') || '').split('?')[0];
    }

    const navLinks = document.querySelectorAll('.nav-item[href]');

    navLinks.forEach((link) => {
        if (linkPage(link) === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Mobil holatda istalgan linkka bosilganda sidebar yopiladi
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) closeSidebar();
        });
    });

    // ---------- Submenu (Guides / Services / Life in Korea) ----------
    const submenuTriggers = document.querySelectorAll('.nav-item.has-submenu');

    submenuTriggers.forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            const submenu = document.getElementById(targetId);
            if (!submenu) return;

            const willOpen = !submenu.classList.contains('open');

            trigger.classList.toggle('open', willOpen);
            submenu.classList.toggle('open', willOpen);
        });

        // Agar shu submenu ichidagi bir sahifa hozir ochiq bo'lsa,
        // submenuni boshidanoq ochiq holatda ko'rsatamiz.
        const targetId = trigger.getAttribute('data-target');
        const submenu = document.getElementById(targetId);
        if (submenu) {
            const hasCurrentPage = Array.from(submenu.querySelectorAll('a[href]'))
                .some(a => linkPage(a) === currentPage);
            if (hasCurrentPage) {
                trigger.classList.add('open');
                submenu.classList.add('open');
                trigger.classList.add('active');
            }
        }
    });
})();

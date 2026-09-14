// Bildirishnoma va foydalanuvchi dropdown'lari
function setupDropdown(buttonId, menuId) {
    const button = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);

    if (!button || !menu) return;

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('show');
    });
}

setupDropdown('notifBellBtn', 'notifDropdown');
setupDropdown('userChipBtn', 'userDropdown');

// Tashqariga bosilganda barcha dropdown'lar yopiladi
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
    });
});

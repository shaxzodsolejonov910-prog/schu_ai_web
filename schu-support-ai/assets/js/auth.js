const tabButtons = document.querySelectorAll('.tab-btn');
const idLabel = document.getElementById('idLabel');
const loginIdInput = document.getElementById('loginId');
const signupRow = document.getElementById('signupRow');
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

let currentRole = 'student'; // dastlabki holat — Student tab active

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active')); // 1) Barcha tugmalardan "active" klassini olib tashlaymiz
        button.classList.add('active'); // 2) Faqat bosilgan tugmaga "active" qo'shamiz
        currentRole = button.getAttribute('data-role'); // 3) Qaysi rol tanlanganini eslab qolamiz
        updateFormForRole(currentRole); // 4) Shu rolga qarab forma ko'rinishini o'zgartiramiz
    });
});

function updateFormForRole(role) {
    if (role === 'admin') {
        idLabel.textContent = 'Admin ID';
        loginIdInput.placeholder = 'Enter your admin ID';
        signupRow.style.display = 'none';
    } else {
        idLabel.textContent = 'Student ID';
        loginIdInput.placeholder = 'Enter your student ID';
        signupRow.style.display = 'block';
    }
}

// ---------- Parolni ko'rsatish / yashirish (avval hech qanday JS ulanmagan edi) ----------
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        togglePassword.classList.toggle('fa-eye', !isHidden);
        togglePassword.classList.toggle('fa-eye-slash', isHidden);
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // sahifa qayta yuklanib ketmasligi uchun

        const enteredId = loginIdInput.value.trim();
        const enteredPassword = passwordInput.value.trim();

        // Backend ulanmagani uchun oddiy tekshiruv
        if (enteredId === '' || enteredPassword === '') {
            alert('Please complete all the fields!');
            return;
        }

        // Sessiya ma'lumotini saqlaymiz — dashboard/admin panel shu orqali
        // "Hello, ..." nomini va logout holatini boshqaradi.
        localStorage.setItem('schu_role', currentRole);
        localStorage.setItem('schu_id', enteredId);

        // Rolga qarab kerakli dashboardga yo'naltirish
        if (currentRole === 'admin') {
            window.location.href = 'admin-dashboard.html';
        } else {
            window.location.href = 'student-dashboard.html';
        }
    });
}

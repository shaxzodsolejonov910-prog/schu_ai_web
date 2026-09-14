// AI Chat sahifasi uchun xos mantiq.
// Hamburger menyu va "active" holat endi assets/js/sidebar.js da.

const chatInput = document.getElementById('chatInput');
const chatSendBtn = document.getElementById('chatSendBtn');
const chatMessages = document.getElementById('chatMessages');

// Oddiy demo-javoblar (real backend ulanmaguncha)
const botReplies = [
    { keywords: ['dormitory', 'dorm', 'yotoqxona'], reply: 'Dormitory application odatda semestr boshlanishidan 2 hafta oldin ochiladi. Batafsil ma\'lumot uchun Guides > Dormitory Guide bo\'limiga qarang.' },
    { keywords: ['visa', 'viza'], reply: 'Viza muddatini uzaytirish uchun D-2/D-4 hujjatlaringiz va pasportingiz kerak bo\'ladi. Immigration Office: 1345.' },
    { keywords: ['scholarship', 'stipendiya'], reply: 'SCHU bir nechta stipendiya turlarini taklif qiladi: Global Korea Scholarship va SCHU ichki stipendiyalari. Services > Scholarship bo\'limida batafsil.' },
    { keywords: ['course', 'registration', 'ro\'yxat'], reply: 'Kurslarga yozilish portali orqali amalga oshiriladi. Muddatlarni Academic Calendar bo\'limidan tekshiring.' }
];

function findBotReply(text) {
    const lower = text.toLowerCase();
    const match = botReplies.find(item => item.keywords.some(k => lower.includes(k)));
    return match ? match.reply : 'Rahmat! So\'rovingizni qabul qildim. Aniqroq javob uchun tegishli Guides yoki Services bo\'limiga ham qarab chiqishingiz mumkin.';
}

function addBubble(text, who) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${who}`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    addBubble(text, 'user');
    chatInput.value = '';

    // Bot "yozayapti..." effektisiz, sodda kechikish bilan javob beradi
    window.setTimeout(() => {
        addBubble(findBotReply(text), 'bot');
    }, 500);
}

if (chatInput && chatSendBtn && chatMessages) {
    chatSendBtn.addEventListener('click', sendMessage);

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Agar boshqa sahifadan "?q=" bilan kelingan bo'lsa (masalan chip orqali), avtomatik yuboramiz
const params = new URLSearchParams(window.location.search);
const initialQuery = params.get('q');
if (initialQuery && chatInput) {
    chatInput.value = initialQuery;
    sendMessage();
}

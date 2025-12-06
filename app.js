// Переключение вкладок
const tabButtons = document.querySelectorAll('.nav-btn');
const tabs = {
  home: document.getElementById('tab-home'),
  pricing: document.getElementById('tab-pricing'),
  discounts: document.getElementById('tab-discounts'),
  games: document.getElementById('tab-games'),
  faq: document.getElementById('tab-faq'),
  about: document.getElementById('tab-about'),
};

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tabTarget;
    // активная кнопка
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // активная вкладка
    Object.values(tabs).forEach(section => section.classList.remove('active'));
    const activeTab = tabs[target];
    if (activeTab) activeTab.classList.add('active');
    // скролл чуть вверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Скролл к блоку из кнопок
document.querySelectorAll('[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.scrollTo;
    const tab = tabs[targetId] || document.getElementById(targetId);
    if (!tab) return;
    // если это секция-вкладка — активируем её
    Object.entries(tabs).forEach(([key, section]) => {
      section.classList.toggle('active', section === tab);
      const nav = document.querySelector('.nav-btn[data-tab-target="' + key + '"]');
      if (nav) nav.classList.toggle('active', section === tab);
    });
    setTimeout(() => {
      tab.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  });
});

// Ротация фраз маскота
const phrases = document.querySelectorAll('.bubble-line');
let phraseIndex = 0;

function rotateMascotPhrase() {
  if (phrases.length === 0) return;
  phrases.forEach(p => p.classList.add('hidden'));
  phrases[phraseIndex].classList.remove('hidden');
  phraseIndex = (phraseIndex + 1) % phrases.length;
}
rotateMascotPhrase();
setInterval(rotateMascotPhrase, 4000);

// Калькулятор скидок
const amountInput = document.getElementById('rbxAmount');
const promoInput = document.getElementById('promoCode');
const calcBtn = document.getElementById('calcBtn');
const calcResult = document.getElementById('calcResult');

function basePricePerRobux(amount) {
  if (amount >= 10000) return 0.87;
  if (amount >= 5000) return 0.8;
  if (amount >= 1000) return 0.9;
  if (amount >= 500) return 1.0;
  return 1.2;
}

function promoDiscount(promo) {
  if (!promo) return 0;
  promo = promo.trim().toUpperCase();
  if (promo === 'ROMA10') return 0.10;
  if (promo === 'RBX5') return 0.05;
  return 0;
}

if (calcBtn && calcResult) {
  calcBtn.addEventListener('click', () => {
    const amount = parseInt(amountInput.value, 10);
    if (!amount || amount < 50) {
      calcResult.textContent = 'Введи количество от 50 Robux и выше.';
      return;
    }
    const base = basePricePerRobux(amount) * amount;
    const disc = promoDiscount(promoInput.value);
    const final = Math.round(base * (1 - disc));
    let text = `Примерная стоимость за ${amount} Robux: ~${final.toLocaleString('ru-RU')} ₽.`;
    if (disc > 0) {
      text += ` С учётом промокода скидка ${(disc * 100).toFixed(0)}%.`;
    } else if (promoInput.value.trim()) {
      text += ' Промокод не распознан, используется базовый курс.';
    }
    text += ' Точную цену подтвердит владелец в Telegram.';
    calcResult.textContent = text;
  });
}

// Подготовка заявки в Telegram
const nickInput = document.getElementById('nickInput');
const rbxOrderInput = document.getElementById('rbxForOrder');
const tgBtn = document.getElementById('tgOrderBtn');

if (tgBtn) {
  tgBtn.addEventListener('click', () => {
    const nick = (nickInput.value || '').trim();
    const amount = parseInt(rbxOrderInput.value, 10);
    if (!nick || !amount) {
      alert('Введи ник/ID и желаемое количество Robux.');
      return;
    }
    const text = `Привет! Хочу купить Robux через romashka.rbxmarket.%0A` +
                 `Ник/ID: ${encodeURIComponent(nick)}%0A` +
                 `Количество: ${amount} Robux%0A` +
                 `Сайт уже посмотрел, жду твоих условий.`;
    const url = `https://t.me/Exiletop_e?text=${text}`;
    window.location.href = url;
  });
}

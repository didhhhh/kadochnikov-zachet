// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Обработка форм
const feedbackForm = document.getElementById('feedbackForm');
const subscribeForm = document.getElementById('subscribeForm');

// Обработка отправки формы обратной связи
feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        message: this.querySelector('textarea').value
    };
    
    // Сохранение в localStorage
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push(formData);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    // Показ сообщения об успехе
    alert('Спасибо за ваш отзыв!');
    this.reset();
});

// Обработка отправки формы подписки
subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Сохранение в localStorage
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    subscribers.push(email);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
    // Показ сообщения об успехе
    alert('Спасибо за подписку!');
    this.reset();
});

// Настройки для анимации при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Создание наблюдателя за появлением элементов
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применение анимаций к секциям
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Создание мобильного меню
const createMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '☰';
    
    const mobileMenu = document.createElement('div');
    mobileMenu.classList.add('mobile-menu');
    mobileMenu.innerHTML = nav.querySelector('.nav-links').innerHTML;
    
    nav.appendChild(mobileMenuBtn);
    document.body.appendChild(mobileMenu);
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
};

// Инициализация мобильного меню для маленьких экранов
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-btn')) {
        createMobileMenu();
    }
});

// Модальное окно для покупки билета
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const ticketForm = document.getElementById('ticketForm');
let currentMovie = null;

// Открытие модального окна по клику на любую кнопку "Купить билет"
document.querySelectorAll('.movie-card .btn').forEach((btn, idx) => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        modalOverlay.classList.add('active');
        currentMovie = idx + 1; // Можно использовать для передачи названия фильма
    });
});

// Закрытие модального окна
closeModalBtn.addEventListener('click', function() {
    modalOverlay.classList.remove('active');
    ticketForm.reset();
});

// Закрытие по клику вне окна
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        ticketForm.reset();
    }
});

// Обработка отправки формы выбора билета
if (ticketForm) {
    ticketForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const row = document.getElementById('rowSelect').value;
        const seat = document.getElementById('seatSelect').value;
        alert(`Вы выбрали:\nФильм: ${currentMovie}\nРяд: ${row}\nМесто: ${seat}`);
        modalOverlay.classList.remove('active');
        ticketForm.reset();
    });
} 
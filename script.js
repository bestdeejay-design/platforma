// Функция переключения темы
(function() {
    const toggleBtn = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Сохранённая тема или тёмная по умолчанию
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    
    // Обновляем иконку только если элементы существуют
    if (toggleBtn && icon) {
        updateIcon(savedTheme);
    }

    function updateIcon(theme) {
        if (!icon || !toggleBtn) return;
        
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Тема';
        } else {
            icon.className = 'fas fa-sun';
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Тема';
        }
    }

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }
})();

// Презентационный режим с навигацией
let currentSlide = 0;
let slides = [];
let paginationContainer = null;
let progressBar = null;
let isMobileMode = false;

// Проверка мобильного устройства
function checkMobile() {
    return window.innerWidth <= 768;
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Отключаем презентационный режим на мобильных
    if (!checkMobile()) {
        initPresentationMode();
        initNavigationButtons();
    } else {
        isMobileMode = true;
        // На мобильных только скролл - ничего не инициализируем
    }
});

function initPresentationMode() {
    // Находим все слайды
    slides = Array.from(document.querySelectorAll('.slide'));
    if (slides.length === 0) return;

    // Восстанавливаем сохранённый слайд
    const savedSlide = localStorage.getItem('currentSlide');
    if (savedSlide !== null && parseInt(savedSlide) < slides.length) {
        currentSlide = parseInt(savedSlide);
    }

    // Создаем прогресс бар
    progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    // Создаем пагинацию (dots)
    paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'pagination-dot';
        dot.addEventListener('click', () => goToSlide(index));
        paginationContainer.appendChild(dot);
    });
    
    document.body.appendChild(paginationContainer);

    // Обновляем состояние
    updatePagination();
    updateProgressBar();

    // Обработка клавиатуры
    document.addEventListener('keydown', handleKeyboard);

    // Обработка swipe для мобильных - ОТКЛЮЧАЕМ!
    // Свайпы работают только на десктопе
}

function handleKeyboard(e) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
    }
}

// Функция удаления элементов презентации при ресайзе
function cleanupPresentationMode() {
    if (progressBar) {
        progressBar.remove();
        progressBar = null;
    }
    if (paginationContainer) {
        paginationContainer.remove();
        paginationContainer = null;
    }
    
    // Удаляем навигационные кнопки
    const navButtons = document.querySelector('.navigation-buttons');
    if (navButtons) {
        navButtons.remove();
    }
}

function initSwipeHandling() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].clientY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Свайп вверх - следующий слайд
                nextSlide();
            } else {
                // Свайп вниз - предыдущий слайд
                prevSlide();
            }
        }
    }
}

function goToSlide(index) {
    if (index < 0 || index >= slides.length) return;
    
    const exitingSlide = slides[currentSlide];
    const enteringSlide = slides[index];
    
    // Анимация выхода текущего слайда
    exitingSlide.classList.add('slide-exiting');
    
    // Анимация входа нового слайда
    setTimeout(() => {
        exitingSlide.classList.remove('slide-exiting');
        enteringSlide.classList.add('slide-entering');
        
        setTimeout(() => {
            enteringSlide.classList.remove('slide-entering');
        }, 600);
    }, 100);
    
    currentSlide = index;
    
    // Сохраняем текущий слайд
    localStorage.setItem('currentSlide', currentSlide.toString());
    
    // Прокрутка к целевой секции
    if (slides[currentSlide]) {
        // Если это первый слайд, прокручиваем к самому верху страницы
        if (currentSlide === 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            slides[currentSlide].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    updatePagination();
    updateProgressBar();
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

function updatePagination() {
    if (!paginationContainer) return;
    
    const dots = paginationContainer.querySelectorAll('.pagination-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function updateProgressBar() {
    if (!progressBar) return;
    
    const progress = ((currentSlide + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Навигационные кнопки
function initNavigationButtons() {
    // Создаем навигационные кнопки
    const navButtons = document.createElement('div');
    navButtons.className = 'navigation-buttons';
    navButtons.innerHTML = `
        <button class="nav-button" id="upButton" title="Вверх">
            <i class="fas fa-arrow-up"></i>
        </button>
        <button class="nav-button" id="downButton" title="Вниз">
            <i class="fas fa-arrow-down"></i>
        </button>
    `;
    document.body.appendChild(navButtons);

    // Получаем кнопки
    const upButton = document.getElementById('upButton');
    const downButton = document.getElementById('downButton');

    // Обработчики кликов
    upButton.addEventListener('click', () => {
        prevSlide();
    });

    downButton.addEventListener('click', () => {
        nextSlide();
    });
}

// Обработчик изменения размера окна для переключения режимов
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const wasMobile = isMobileMode;
        isMobileMode = checkMobile();
        
        // Если перешли с десктопа на мобильный
        if (isMobileMode && !wasMobile) {
            cleanupPresentationMode();
        }
        // Если перешли с мобильного на десктоп
        else if (!isMobileMode && wasMobile) {
            location.reload(); // Перезагружаем страницу для инициализации
        }
    }, 250);
});

// Мобильное меню
function initMobileMenu() {
    const menuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.nav');
    const overlay = document.getElementById('mobileMenuOverlay');
    const navLinks = document.querySelectorAll('.nav a');
    
    if (!menuToggle || !nav || !overlay) return;
    
    // Открытие/закрытие меню
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокируем скролл body когда меню открыто
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Закрытие при клике на overlay
    overlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Закрытие при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Переключатель темы в мобильном меню
function initMobileThemeToggle() {
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeIconMobile = document.getElementById('themeIconMobile');
    
    if (!themeToggleMobile || !themeIconMobile) return;
    
    themeToggleMobile.addEventListener('click', function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Обновляем иконку
        updateThemeIcon(newTheme, themeIconMobile);
        
        // Обновляем основной переключатель если есть
        const mainThemeIcon = document.getElementById('themeIcon');
        if (mainThemeIcon) {
            updateThemeIcon(newTheme, mainThemeIcon);
        }
    });
}

function updateThemeIcon(theme, iconElement) {
    if (!iconElement) return;
    
    if (theme === 'dark') {
        iconElement.className = 'fas fa-sun';
    } else {
        iconElement.className = 'fas fa-moon';
    }
}

// Инициализация мобильного меню
// Инициализация переключателя темы в мобильном меню
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initMobileThemeToggle();
});
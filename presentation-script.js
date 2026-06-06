// Презентация LOVII - Навигация по слайдам

let currentSlide = 1;
const totalSlides = 15;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateSlideCounter();
    updateProgressBar();
    initThemeToggle();
    initKeyboard();
    initTouch();
    initButtons();
});

// Переключение темы
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Загрузка сохранённой темы
    const savedTheme = localStorage.getItem('presentation-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('presentation-theme', newTheme);
    });
}

// Навигация по слайдам
function goToSlide(slideNum) {
    if (slideNum < 1 || slideNum > totalSlides) return;
    
    // Скрываем текущий слайд
    document.querySelector('.slide.active').classList.remove('active');
    
    // Показываем новый слайд
    document.querySelector(`.slide[data-slide="${slideNum}"]`).classList.add('active');
    
    currentSlide = slideNum;
    updateSlideCounter();
    updateProgressBar();
    
    // Прокрутка вверх
    document.querySelector('.slide.active').scrollTop = 0;
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
    }
}

// Обновление счётчика
function updateSlideCounter() {
    document.getElementById('currentSlideNum').textContent = currentSlide;
    document.getElementById('totalSlides').textContent = totalSlides;
}

// Обновление прогресс-бара
function updateProgressBar() {
    const progress = (currentSlide / totalSlides) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

// Клавиатурная навигация
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case 'PageDown':
            case ' ':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
        }
    });
}

// Сенсорная навигация (swipe)
function initTouch() {
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

// Кнопки навигации
function initButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
}

// Автоматическое скрытие кнопок на мобильных
function updateButtonVisibility() {
    const isMobile = window.innerWidth <= 768;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (isMobile) {
        prevBtn.style.display = currentSlide > 1 ? 'block' : 'none';
        nextBtn.style.display = currentSlide < totalSlides ? 'block' : 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

window.addEventListener('resize', updateButtonVisibility);
updateButtonVisibility();

// Боковое меню слайдов
function initSlidesMenu() {
    const toggle = document.getElementById('slidesMenuToggle');
    const menu = document.getElementById('slidesMenu');
    const close = document.getElementById('slidesMenuClose');
    const overlay = document.getElementById('slidesMenuOverlay');
    const menuItems = document.querySelectorAll('.slides-menu-item');
    
    function openMenu() {
        menu.classList.add('open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        menu.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }
    
    toggle.addEventListener('click', openMenu);
    close.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const slideNum = parseInt(item.dataset.slide);
            goToSlide(slideNum);
            closeMenu();
        });
    });
    
    // Обновление активного пункта меню
    const originalGoToSlide = goToSlide;
    const origUpdateSlideCounter = updateSlideCounter;
    
    const _updateMenuActive = () => {
        menuItems.forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.slide) === currentSlide);
        });
    };
    
    // Переопределяем updateSlideCounter для обновления меню
    const _origUpdateSlideCounter = updateSlideCounter;
    window.updateSlideCounter = function() {
        _origUpdateSlideCounter();
        _updateMenuActive();
    };
}

// Добавляем инициализацию
document.addEventListener('DOMContentLoaded', function() {
    initSlidesMenu();
    
    // Клик по лого — возврат на главный слайд
    const brandLogo = document.getElementById('brandLogo');
    if (brandLogo) {
        brandLogo.addEventListener('click', () => {
            goToSlide(1);
        });
    }
});

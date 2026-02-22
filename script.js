// Функция переключения темы
(function() {
    const toggleBtn = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Сохранённая тема или тёмная по умолчанию
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fas fa-moon';
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i> Тема';
        } else {
            icon.className = 'fas fa-sun';
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i> Тема';
        }
    }

    toggleBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
})();

// Функция для навигационных кнопок
document.addEventListener('DOMContentLoaded', function() {
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

    // Находим все секции
    const sections = [
        document.querySelector('.hero'),
        document.querySelector('.stats'),
        document.getElementById('products'),
        document.getElementById('partners'),
        document.getElementById('franchise'),
        document.getElementById('about'),
        document.getElementById('contact')
    ].filter(section => section !== null); // Убираем null значения

    // Проверяем, когда показывать кнопки (когда пользователь начинает прокручивать ко второй секции)
    function checkButtonsVisibility() {
        // Проверяем, если пользователь прокрутил дальше первой секции (героя)
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        // Кнопки появляются, когда нижняя часть героя исчезает сверху экрана
        const shouldShow = heroRect.bottom < 0;
        
        if (shouldShow) {
            navButtons.style.display = 'flex';
        } else {
            navButtons.style.display = 'none';
        }
    }

    // Функция прокрутки к следующей секции
    function scrollToNextSection(direction) {
        if (!sections.length) return;
        
        const currentScroll = window.scrollY;
        let targetIndex = -1;
        
        // Находим текущую видимую секцию
        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            const sectionTop = sections[i].offsetTop;
            const sectionBottom = sectionTop + sections[i].offsetHeight;
            
            if (currentScroll >= sectionTop - 100 && currentScroll <= sectionBottom - 100) {
                targetIndex = i;
                break;
            }
        }
        
        // Если не нашли текущую секцию, определяем по положению скролла
        if (targetIndex === -1) {
            for (let i = 0; i < sections.length; i++) {
                if (currentScroll < sections[i].offsetTop) {
                    targetIndex = i - 1;
                    break;
                }
            }
            if (targetIndex === -1 && currentScroll >= sections[sections.length - 1].offsetTop) {
                targetIndex = sections.length - 1;
            }
        }
        
        let nextIndex;
        if (direction === 'up') {
            nextIndex = Math.max(0, targetIndex - 1);
        } else { // direction === 'down'
            nextIndex = Math.min(sections.length - 1, targetIndex + 1);
        }
        
        // Прокручиваем к целевой секции
        if (nextIndex !== targetIndex && sections[nextIndex]) {
            sections[nextIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Обработчики кликов
    upButton.addEventListener('click', () => {
        scrollToNextSection('up');
    });

    downButton.addEventListener('click', () => {
        scrollToNextSection('down');
    });

    // Показываем/скрываем кнопки при скролле
    window.addEventListener('scroll', checkButtonsVisibility);
    
    // Проверяем видимость при загрузке
    checkButtonsVisibility();
});
# Описание сайта АО Платформа

## Общая информация

**АО Платформа** — технологический оператор SaaS-решений, программ лояльности и платёжных интеграций для малого бизнеса. Компания создает цифровую инфраструктуру локальной экономики.

## Дизайн и тема

Сайт использует **тёмную тему** по умолчанию, которая является эталонной и идеальной для восприятия. Цветовая палитра включает:

- Основной цвет: #D84FC6 (розовый)
- Вторичный цвет: #3ABE9A (мятный)
- Фон: #1A1A1A (тёмный)
- Карточки: #242424 (тёмно-серый)
- Текст основной: #E8D5C4 (бежевый)
- Текст заголовков: #F5EBE0 (светло-бежевый)

настройки темы 

/* ===== ТЁМНАЯ ТЕМА (по умолчанию, эталон) ===== */
:root {
    --color-primary: #D84FC6;
    --color-primary-hover: #B836A8;
    --color-primary-active: #9A268F;
    --color-primary-light: rgba(216, 79, 198, 0.1);
    --gradient-primary: linear-gradient(135deg, #D84FC6 0%, #B836A8 100%);

    --color-secondary: #3ABE9A;
    --color-secondary-hover: #2E9F80;
    --color-secondary-light: rgba(58, 190, 154, 0.1);

    --color-bg-dark: #1A1A1A;
    --color-bg-card: #242424;
    --color-bg-card-hover: #2C2C2C;
    --glass-dark: rgba(36, 36, 36, 0.7);
    --border-subtle: #2A2A2A;
    --border-strong: #404040;

    --color-text-primary: #E8D5C4;
    --color-text-secondary: #DDCBB8;
    --color-text-heading: #F5EBE0;
    --color-text-inverse: #1A1A1A;

    --color-success: #4ADE80;
    --color-success-bg: rgba(74, 222, 128, 0.12);
    --color-warning: #FBBF24;
    --color-warning-bg: rgba(251, 191, 36, 0.12);
    --color-error: #F87171;
    --color-error-bg: rgba(248, 113, 113, 0.12);

    --shadow-glow: 0 4px 20px rgba(216, 79, 198, 0.25);
    --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(216, 79, 198, 0.1);
    --shadow-card-hover: 0 25px 40px -15px rgba(216, 79, 198, 0.35), 0 0 0 1px rgba(216, 79, 198, 0.2);
    --gradient-hero: linear-gradient(145deg, #1A1A1A 0%, #2A1A28 50%, #1A1A1A 100%);
}

/* ===== СВЕТЛАЯ ТЕМА (глубокая, трендовая) ===== */
[data-theme="light"] {
    --color-bg-dark: #FCF8F3;
    background-image: 
        radial-gradient(circle at 10% 20%, rgba(216, 79, 198, 0.02) 0%, transparent 30%),
        radial-gradient(circle at 90% 70%, rgba(58, 190, 154, 0.02) 0%, transparent 40%),
        repeating-linear-gradient(45deg, rgba(0,0,0,0.01) 0px, rgba(0,0,0,0.01) 2px, transparent 2px, transparent 6px);
    background-blend-mode: overlay;

    --color-bg-card: rgba(255, 255, 255, 0.85);
    --color-bg-card-hover: rgba(255, 255, 255, 0.95);
    --glass-dark: rgba(255, 255, 255, 0.6);

    --border-subtle: rgba(216, 79, 198, 0.15);
    --border-strong: rgba(216, 79, 198, 0.3);

    --color-text-primary: #2E2A27;
    --color-text-secondary: #5F5A57;
    --color-text-heading: #1F1B18;
    --color-text-inverse: #FFFFFF;

    --color-primary-light: rgba(216, 79, 198, 0.2);
    --color-secondary-light: rgba(58, 190, 154, 0.2);
    --color-success-bg: rgba(74, 222, 128, 0.2);
    --color-warning-bg: rgba(251, 191, 36, 0.2);
    --color-error-bg: rgba(248, 113, 113, 0.2);

    --shadow-glow: 0 8px 25px rgba(216, 79, 198, 0.25);
    --shadow-card: 0 15px 35px -12px rgba(0, 0, 0, 0.1),
                   0 0 0 1px rgba(216, 79, 198, 0.1),
                   inset 0 1px 0 rgba(255,255,255,0.6);
    --shadow-card-hover: 0 25px 40px -15px rgba(216, 79, 198, 0.35),
                         0 0 0 1px rgba(216, 79, 198, 0.3),
                         inset 0 1px 0 rgba(255,255,255,0.8);
    --gradient-hero: linear-gradient(125deg, 
        rgba(255,255,255,0.9) 0%, 
        rgba(255,245,250,0.9) 40%, 
        rgba(255,255,255,0.9) 100%);
}


## Инструкции для AI-агента

1. Сохраняйте темную тему как основную, она практически идеальна
2. Не нагружайте светлую тему при изменениях
3. При демонстрации скрывайте информацию о внешних компаниях и партнёрах
4. Фокусируйтесь на продуктах и решениях АО Платформа
5. Поддерживайте высокий уровень визуального восприятия и UX

## Продукты и решения

- SaaS «Лови» - оператор лояльности для микробизнеса
- Цифровая витрина - виртуальная полка для локальных производителей
- City Franchise - запуск локальной экосистемы в вашем городе
- API для партнёров - интеграция с платформой «Лови»
- Финансовая инфраструктура - интеграция с банковскими платёжными агентами
- White Label - лицензирование технологии для регионов и сетей

## Франшиза City Franchise

- Старт - для городов от 10 000 жителей
- Бизнес - для городов от 50 000 жителей
- Премиум - для городов-миллионников

## Контактная информация

- Адрес: г. Санкт-Петербург, Измайловский проспект, 4
- Телефон: +7 812 928-74-78
- Email: hello@axiiom.ru
- Сайт: axiiom.ru

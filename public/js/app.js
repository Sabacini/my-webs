// Translations
const translations = {
    ru: {
        'nav.about': 'О нас',
        'nav.services': 'Услуги',
        'nav.advantages': 'Преимущества',
        'nav.testimonials': 'Отзывы',
        'nav.contact': 'Контакты',
        'hero.line1': 'Сайты,',
        'hero.line2': 'которые',
        'hero.line3': 'работают',
        'hero.subtitle': 'Полный цикл разработки и продвижения для малого бизнеса',
        'hero.cta': 'Оставить заявку',
        'hero.learn_more': 'Узнать больше',
        'about.title': 'О нас',
        'about.text1': 'DigAgRu — это микро-агентство, специализирующееся на создании эффективных веб-решений для малого бизнеса и частных предпринимателей. Мы понимаем, что каждый рубль на счету, поэтому предлагаем оптимальные решения без переплат.',
        'about.text2': 'Наша миссия — помочь малому бизнесу выйти в онлайн и получить новых клиентов. Мы работаем прозрачно, предоставляем отчётность и всегда на связи.',
        'about.stat1': 'Лет опыта',
        'about.stat2': 'Реализованных проектов',
        'about.stat3': 'Довольных клиентов',
        'services.title': 'Наши услуги',
        'services.subtitle': 'Комплексные решения для вашего бизнеса',
        'services.web_dev.title': 'Создание сайтов',
        'services.web_dev.desc': 'Разработка сайтов-визиток, лендингов и интернет-магазинов под ключ',
        'services.web_dev.feat1': 'Адаптивный дизайн',
        'services.web_dev.feat2': 'Современные технологии',
        'services.web_dev.feat3': 'Быстрая загрузка',
        'services.promotion.title': 'Продвижение',
        'services.promotion.desc': 'SEO-оптимизация, контекстная реклама и повышение конверсии',
        'services.promotion.feat1': 'SEO-оптимизация',
        'services.promotion.feat2': 'Контекстная реклама',
        'services.promotion.feat3': 'Аналитика и отчеты',
        'services.support.title': 'Поддержка сайтов',
        'services.support.desc': 'Техническая и контентная поддержка вашего сайта',
        'services.support.feat1': 'Обновление контента',
        'services.support.feat2': 'Исправление ошибок',
        'services.support.feat3': 'Резервное копирование',
        'services.crm.title': 'Автоматизация CRM',
        'services.crm.desc': 'Настройка и интеграция CRM-систем для управления клиентами',
        'services.crm.feat1': 'Интеграция с сайтом',
        'services.crm.feat2': 'Автоматические воронки',
        'services.crm.feat3': 'Отчётность',
        'services.bots.title': 'Telegram-боты',
        'services.bots.desc': 'Разработка ботов для автоматизации бизнеса в Telegram',
        'services.bots.feat1': 'Приём заказов',
        'services.bots.feat2': 'Автоматизация FAQ',
        'services.bots.feat3': 'Уведомления клиентам',
        'services.hosting.title': 'Хостинг и сопровождение',
        'services.hosting.desc': 'Размещение на серверах и техническое сопровождение',
        'services.hosting.feat1': 'Быстрые серверы',
        'services.hosting.feat2': 'SSL-сертификаты',
        'services.hosting.feat3': 'Мониторинг 24/7',
        'advantages.title': 'Наши преимущества',
        'advantages.individual.title': 'Индивидуальный подход',
        'advantages.individual.desc': 'Решение под ваши задачи и бюджет',
        'advantages.price.title': 'Простые решения',
        'advantages.price.desc': 'Без переплат и скрытых комиссий',
        'advantages.support.title': 'Поддержка',
        'advantages.support.desc': 'На всех этапах сотрудничества',
        'advantages.transparency.title': 'Прозрачность',
        'advantages.transparency.desc': 'Отчётность и контроль результатов',
        'testimonials.title': 'Отзывы клиентов',
        'contact.title': 'Связаться с нами',
        'contact.subtitle': 'Оставьте заявку, и мы свяжемся с вами в ближайшее время',
        'contact.form.name': 'Ваше имя',
        'contact.form.name_placeholder': 'Иван Иванов',
        'contact.form.contact': 'Email или телефон',
        'contact.form.contact_placeholder': 'ivan@example.com или +7 900 123-45-67',
        'contact.form.message': 'Сообщение',
        'contact.form.message_placeholder': 'Расскажите о вашем проекте...',
        'contact.form.privacy': 'Согласен на обработку персональных данных',
        'contact.form.submit': 'Отправить заявку',
        'footer.rights': 'Все права защищены',
        // Cookies
        'cookies.title': 'Мы используем cookies',
        'cookies.description': 'Этот сайт использует cookies для улучшения вашего опыта и аналитики. Продолжая использовать сайт, вы соглашаетесь с нашей политикой конфиденциальности.',
        'cookies.accept': 'Принять',
        'cookies.reject': 'Отклонить',
        // Calculator
        'calculator.title': 'Калькулятор стоимости',
        'calculator.subtitle': 'Рассчитайте примерную стоимость вашего проекта',
        'calculator.project_type': 'Тип проекта',
        'calculator.landing': 'Лендинг',
        'calculator.corporate': 'Корпоративный сайт',
        'calculator.ecommerce': 'Интернет-магазин',
        'calculator.pages': 'Количество страниц',
        'calculator.design': 'Сложность дизайна',
        'calculator.design_basic': 'Базовый',
        'calculator.design_basic_desc': 'Готовый шаблон',
        'calculator.design_custom': 'Кастомный',
        'calculator.design_premium': 'Премиум',
        'calculator.features': 'Дополнительные функции',
        'calculator.feat_seo': 'SEO-оптимизация (+20 000₽)',
        'calculator.feat_crm': 'Интеграция с CRM (+30 000₽)',
        'calculator.feat_multilang': 'Многоязычность (+25 000₽)',
        'calculator.feat_bot': 'Telegram-бот (+40 000₽)',
        'calculator.feat_analytics': 'Веб-аналитика (+15 000₽)',
        'calculator.feat_booking': 'Система онлайн-записи (+35 000₽)',
        'calculator.support': 'Техническая поддержка',
        'calculator.support_none': 'Без поддержки',
        'calculator.support_3mo': '3 месяца',
        'calculator.support_6mo': '6 месяцев',
        'calculator.support_12mo': '12 месяцев',
        'calculator.estimated_cost': 'Примерная стоимость проекта',
        'calculator.disclaimer': '* Окончательная стоимость определяется после детального обсуждения проекта',
        // FAQ
        'faq.title': 'Часто задаваемые вопросы',
        'faq.q1': 'Сколько времени занимает разработка сайта?',
        'faq.a1': 'Лендинг — 1-2 недели, корпоративный сайт — 3-4 недели, интернет-магазин — от 6 недель. Сроки зависят от сложности проекта и вашей готовности предоставить контент.',
        'faq.q2': 'Что входит в стоимость?',
        'faq.a2': 'Дизайн, разработка, адаптация под мобильные устройства, базовая SEO-оптимизация, размещение на хостинге, 1 месяц технической поддержки и обучение работе с сайтом.',
        'faq.q3': 'Нужно ли мне готовить контент?',
        'faq.a3': 'Идеально, если у вас есть готовые тексты и изображения. Но мы можем помочь с подготовкой контента за дополнительную плату или использовать временный контент для первого запуска.',
        'faq.q4': 'Какая система управления используется?',
        'faq.a4': 'Мы подбираем CMS под ваши задачи: WordPress для блогов и корпоративных сайтов, Shopify/WooCommerce для интернет-магазинов, или custom решения для особых требований.',
        'faq.q5': 'Как происходит оплата?',
        'faq.a5': '50% предоплата при подписании договора, 50% после завершения проекта и передачи всех материалов. Возможна рассрочка для крупных проектов.'
    },
    en: {
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.advantages': 'Advantages',
        'nav.testimonials': 'Testimonials',
        'nav.contact': 'Contact',
        'hero.line1': 'Websites',
        'hero.line2': 'that',
        'hero.line3': 'work',
        'hero.subtitle': 'Full cycle of development and promotion for small businesses',
        'hero.cta': 'Get Started',
        'hero.learn_more': 'Learn More',
        'about.title': 'About Us',
        'about.text1': 'DigAgRu is a micro-agency specializing in creating effective web solutions for small businesses and entrepreneurs. We understand that every dollar counts, so we offer optimal solutions without overpayments.',
        'about.text2': 'Our mission is to help small businesses go online and acquire new customers. We work transparently, provide reports, and are always in touch.',
        'about.stat1': 'Years of Experience',
        'about.stat2': 'Completed Projects',
        'about.stat3': 'Satisfied Clients',
        'services.title': 'Our Services',
        'services.subtitle': 'Comprehensive solutions for your business',
        'services.web_dev.title': 'Website Development',
        'services.web_dev.desc': 'Development of business cards, landing pages, and online stores turnkey',
        'services.web_dev.feat1': 'Responsive design',
        'services.web_dev.feat2': 'Modern technologies',
        'services.web_dev.feat3': 'Fast loading',
        'services.promotion.title': 'Promotion',
        'services.promotion.desc': 'SEO optimization, contextual advertising, and conversion rate optimization',
        'services.promotion.feat1': 'SEO optimization',
        'services.promotion.feat2': 'Contextual advertising',
        'services.promotion.feat3': 'Analytics and reports',
        'services.support.title': 'Website Support',
        'services.support.desc': 'Technical and content support for your website',
        'services.support.feat1': 'Content updates',
        'services.support.feat2': 'Bug fixes',
        'services.support.feat3': 'Backup',
        'services.crm.title': 'CRM Automation',
        'services.crm.desc': 'Setup and integration of CRM systems for customer management',
        'services.crm.feat1': 'Website integration',
        'services.crm.feat2': 'Automated funnels',
        'services.crm.feat3': 'Reporting',
        'services.bots.title': 'Telegram Bots',
        'services.bots.desc': 'Development of bots to automate business in Telegram',
        'services.bots.feat1': 'Order acceptance',
        'services.bots.feat2': 'FAQ automation',
        'services.bots.feat3': 'Customer notifications',
        'services.hosting.title': 'Hosting & Support',
        'services.hosting.desc': 'Server hosting and technical support',
        'services.hosting.feat1': 'Fast servers',
        'services.hosting.feat2': 'SSL certificates',
        'services.hosting.feat3': '24/7 monitoring',
        'advantages.title': 'Our Advantages',
        'advantages.individual.title': 'Individual Approach',
        'advantages.individual.desc': 'Solutions tailored to your tasks and budget',
        'advantages.price.title': 'Simple Solutions',
        'advantages.price.desc': 'No overpayments or hidden fees',
        'advantages.support.title': 'Support',
        'advantages.support.desc': 'At all stages of cooperation',
        'advantages.transparency.title': 'Transparency',
        'advantages.transparency.desc': 'Reporting and results control',
        'testimonials.title': 'Client Testimonials',
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Leave a request and we will contact you shortly',
        'contact.form.name': 'Your Name',
        'contact.form.name_placeholder': 'John Doe',
        'contact.form.contact': 'Email or Phone',
        'contact.form.contact_placeholder': 'john@example.com or +1 555 123-4567',
        'contact.form.message': 'Message',
        'contact.form.message_placeholder': 'Tell us about your project...',
        'contact.form.privacy': 'I agree to the processing of personal data',
        'contact.form.submit': 'Submit Request',
        'footer.rights': 'All rights reserved',
        // Cookies
        'cookies.title': 'We use cookies',
        'cookies.description': 'This site uses cookies to improve your experience and analytics. By continuing to use the site, you agree to our privacy policy.',
        'cookies.accept': 'Accept',
        'cookies.reject': 'Reject',
        // Calculator
        'calculator.title': 'Cost Calculator',
        'calculator.subtitle': 'Calculate the estimated cost of your project',
        'calculator.project_type': 'Project Type',
        'calculator.landing': 'Landing Page',
        'calculator.corporate': 'Corporate Website',
        'calculator.ecommerce': 'E-commerce',
        'calculator.pages': 'Number of Pages',
        'calculator.design': 'Design Complexity',
        'calculator.design_basic': 'Basic',
        'calculator.design_basic_desc': 'Ready template',
        'calculator.design_custom': 'Custom',
        'calculator.design_premium': 'Premium',
        'calculator.features': 'Additional Features',
        'calculator.feat_seo': 'SEO optimization (+20 000₽)',
        'calculator.feat_crm': 'CRM Integration (+30 000₽)',
        'calculator.feat_multilang': 'Multi-language (+25 000₽)',
        'calculator.feat_bot': 'Telegram Bot (+40 000₽)',
        'calculator.feat_analytics': 'Web Analytics (+15 000₽)',
        'calculator.feat_booking': 'Online Booking System (+35 000₽)',
        'calculator.support': 'Technical Support',
        'calculator.support_none': 'No support',
        'calculator.support_3mo': '3 months',
        'calculator.support_6mo': '6 months',
        'calculator.support_12mo': '12 months',
        'calculator.estimated_cost': 'Estimated Project Cost',
        'calculator.disclaimer': '* Final cost is determined after detailed project discussion',
        // FAQ
        'faq.title': 'Frequently Asked Questions',
        'faq.q1': 'How long does website development take?',
        'faq.a1': 'Landing page — 1-2 weeks, corporate website — 3-4 weeks, e-commerce — from 6 weeks. Timeframes depend on project complexity and your content readiness.',
        'faq.q2': 'What is included in the cost?',
        'faq.a2': 'Design, development, mobile adaptation, basic SEO optimization, hosting setup, 1 month of technical support, and training on how to use the website.',
        'faq.q3': 'Do I need to prepare content?',
        'faq.a3': 'Ideally, you have ready texts and images. But we can help with content preparation for an additional fee or use temporary content for the initial launch.',
        'faq.q4': 'What content management system is used?',
        'faq.a4': 'We choose CMS for your needs: WordPress for blogs and corporate sites, Shopify/WooCommerce for e-commerce, or custom solutions for special requirements.',
        'faq.q5': 'How does payment work?',
        'faq.a5': '50% prepayment upon contract signing, 50% after project completion and transfer of all materials. Installments available for large projects.'
    }
};

console.log('🚀 [ЗАГРУЗКА] app.js загружен');

// State
let currentLang = localStorage.getItem('lang') || 'ru';
let currentTheme = localStorage.getItem('theme') || 'light';

console.log('⚙️  [НАСТРОЙКИ] Язык:', currentLang, 'Тема:', currentTheme);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 [DOM] DOM загружен, начинаем инициализацию...');

    try {
        console.log('  1️⃣  Инициализация темы...');
        initTheme();

        console.log('  2️⃣  Инициализация языка...');
        initLanguage();

        console.log('  3️⃣  Инициализация мобильного меню...');
        initMobileMenu();

        console.log('  4️⃣  Инициализация формы контактов...');
        initContactForm();

        console.log('  5️⃣  Загрузка отзывов...');
        loadTestimonials();

        console.log('  6️⃣  Инициализация smooth scroll...');
        initSmoothScroll();

        console.log('✅ [ГОТОВО] Все компоненты инициализированы');
    } catch (error) {
        console.error('❌ [ОШИБКА] Ошибка при инициализации:', error);
    }
});

// Theme Management
function initTheme() {
    updateThemeIcons();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
}

function updateThemeIcons() {
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
        // Desktop icons
        document.getElementById('sunIcon').classList.remove('hidden');
        document.getElementById('moonIcon').classList.add('hidden');
        // Mobile icons
        document.getElementById('sunIconMobile').classList.remove('hidden');
        document.getElementById('moonIconMobile').classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        // Desktop icons
        document.getElementById('sunIcon').classList.add('hidden');
        document.getElementById('moonIcon').classList.remove('hidden');
        // Mobile icons
        document.getElementById('sunIconMobile').classList.add('hidden');
        document.getElementById('moonIconMobile').classList.remove('hidden');
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    updateThemeIcons();
}

// Language Management
function initLanguage() {
    updateLanguage();
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('langToggleMobile').addEventListener('click', toggleLanguage);
}

function toggleLanguage() {
    currentLang = currentLang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', currentLang);
    updateLanguage();
    loadTestimonials(); // Reload testimonials in new language
}

function updateLanguage() {
    const langLabel = currentLang === 'ru' ? 'EN' : 'RU';
    document.getElementById('langText').textContent = langLabel;
    document.getElementById('langTextMobile').textContent = langLabel;
    document.documentElement.lang = currentLang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            element.placeholder = translations[currentLang][key];
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close menu when clicking on links
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

// Load Testimonials
async function loadTestimonials() {
    try {
        const response = await fetch('/api/testimonials');
        const testimonials = await response.json();

        const container = document.getElementById('testimonialsContainer');
        container.innerHTML = '';

        testimonials.forEach((testimonial, index) => {
            const name = currentLang === 'ru' ? testimonial.name_ru : testimonial.name_en;
            const company = currentLang === 'ru' ? testimonial.company_ru : testimonial.company_en;
            const text = currentLang === 'ru' ? testimonial.text_ru : testimonial.text_en;

            const stars = '⭐'.repeat(testimonial.rating);

            const card = document.createElement('div');
            card.className = 'reveal card rounded-lg p-6';
            card.style.animationDelay = `${0.1 * (index + 1)}s`;
            card.innerHTML = `
                <div class="flex items-center mb-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg font-display" style="background-color: hsl(var(--primary) / 0.1); color: hsl(var(--primary))">
                        ${name.charAt(0)}
                    </div>
                    <div class="ml-4">
                        <h4 class="font-display font-semibold text-base">${name}</h4>
                        <p class="text-sm" style="color: hsl(var(--muted-foreground))">${company}</p>
                    </div>
                </div>
                <div class="mb-3">${stars}</div>
                <p class="text-sm leading-relaxed" style="color: hsl(var(--muted-foreground))">"${text}"</p>
            `;

            container.appendChild(card);

            // Trigger reveal animation
            setTimeout(() => {
                card.classList.add('active');
            }, 100 * (index + 1));
        });
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            contact: document.getElementById('contact').value,
            message: document.getElementById('message').value
        };

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = currentLang === 'ru' ? 'Отправка...' : 'Sending...';

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showMessage(
                    currentLang === 'ru'
                        ? 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.'
                        : 'Thank you! Your request has been received. We will contact you soon.',
                    'success'
                );
                form.reset();
            } else {
                throw new Error(result.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showMessage(
                currentLang === 'ru'
                    ? 'Произошла ошибка. Пожалуйста, попробуйте позже.'
                    : 'An error occurred. Please try again later.',
                'error'
            );
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = translations[currentLang]['contact.form.submit'];
        }
    });
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = type === 'success'
        ? 'mt-4 text-center p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg'
        : 'mt-4 text-center p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg';
    messageDiv.classList.remove('hidden');

    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

// Smooth scrolling for navigation links
function smoothScrollTo(targetPosition, duration = 800) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    console.log('🎬 [АНИМАЦИЯ] Старт:', startPosition, '→ Цель:', targetPosition, '| Дистанция:', distance, 'px');

    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function: easeInOutCubic
        const ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const newPosition = startPosition + (distance * ease);
        window.scrollTo(0, newPosition);

        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            console.log('✅ [АНИМАЦИЯ] Завершена. Финальная позиция:', window.pageYOffset);
        }
    }

    requestAnimationFrame(animation);
}

function initSmoothScroll() {
    console.log('🔧 [INIT] Инициализация кастомного smooth scroll');
    console.log('🔧 [INIT] Найдено навигационных ссылок:', document.querySelectorAll('a[href^="#"]').length);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🖱️  [КЛИК] Ссылка:', this.textContent.trim());

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }

            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                // Temporarily disable sticky positioning for smooth navigation
                const allSections = document.querySelectorAll('section');
                console.log('🔓 [STICKY] Отключаем sticky для навигации');

                allSections.forEach(section => {
                    section.style.position = 'relative';
                });

                // Wait a frame for position change to take effect
                requestAnimationFrame(() => {
                    // Get target position using getBoundingClientRect
                    const rect = target.getBoundingClientRect();
                    const absoluteTop = rect.top + window.pageYOffset;

                    const isMobile = window.innerWidth < 768;
                    const offset = isMobile ? 80 : 30;
                    const finalPosition = Math.max(0, absoluteTop - offset);

                    console.log('📊 [ДАННЫЕ]');
                    console.log('  Секция:', targetId);
                    console.log('  Текущая позиция:', window.pageYOffset);
                    console.log('  rect.top:', Math.round(rect.top));
                    console.log('  absoluteTop:', Math.round(absoluteTop));
                    console.log('  offset:', offset);
                    console.log('  finalPosition:', Math.round(finalPosition));
                    console.log('  Направление:', finalPosition < window.pageYOffset ? '⬆️ ВВЕРХ' : '⬇️ ВНИЗ');
                    console.log('  Расстояние:', Math.abs(Math.round(finalPosition - window.pageYOffset)), 'px');

                    smoothScrollTo(finalPosition);

                    // Re-enable sticky after scroll completes
                    setTimeout(() => {
                        console.log('🔒 [STICKY] Включаем sticky обратно');
                        allSections.forEach(section => {
                            section.style.position = 'sticky';
                        });
                    }, 1000); // 800ms animation + 200ms buffer
                });
            } else {
                console.error('❌ [ОШИБКА] Секция не найдена:', targetId);
            }
        });
    });
}

// Calculator functionality
function initCalculator() {
    const form = document.getElementById('calculatorForm');
    if (!form) return;

    const resultElement = document.getElementById('calculatorResult');

    function calculateTotal() {
        let total = 0;

        // Get project type price
        const projectType = form.querySelector('input[name="projectType"]:checked');
        if (projectType) {
            total += parseInt(projectType.dataset.price);
        }

        // Get pages price
        const pages = form.querySelector('input[name="pages"]:checked');
        if (pages) {
            total += parseInt(pages.dataset.price);
        }

        // Get design price
        const design = form.querySelector('input[name="design"]:checked');
        if (design) {
            total += parseInt(design.dataset.price);
        }

        // Add features prices
        const features = form.querySelectorAll('input[name="features"]:checked');
        features.forEach(feature => {
            total += parseInt(feature.dataset.price);
        });

        // Get support price
        const support = form.querySelector('input[name="support"]:checked');
        if (support) {
            total += parseInt(support.dataset.price);
        }

        // Format number with spaces
        const formatted = total.toLocaleString('ru-RU');
        resultElement.textContent = `${formatted}₽`;
    }

    // Listen to all changes
    form.addEventListener('change', calculateTotal);

    // Visual feedback for selected options
    form.querySelectorAll('.calc-option input').forEach(input => {
        input.addEventListener('change', function() {
            // Remove active class from all options in this group
            this.closest('.grid').querySelectorAll('.calc-option > div').forEach(div => {
                div.classList.remove('border-gold-500', 'bg-gold-50', 'dark:bg-gold-900/20');
                div.classList.add('border-gray-300', 'dark:border-gray-600');
            });

            // Add active class to selected option
            if (this.checked) {
                const div = this.nextElementSibling;
                div.classList.remove('border-gray-300', 'dark:border-gray-600');
                div.classList.add('border-gold-500', 'bg-gold-50', 'dark:bg-gold-900/20');
            }
        });

        // Initialize first checked radio
        if (input.checked && input.type === 'radio') {
            const div = input.nextElementSibling;
            div.classList.remove('border-gray-300', 'dark:border-gray-600');
            div.classList.add('border-gold-500', 'bg-gold-50', 'dark:bg-gold-900/20');
        }
    });
}

// FAQ functionality
function initFAQ() {
    const faqButtons = document.querySelectorAll('.faq-question');

    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('svg');
            const isOpen = !answer.classList.contains('hidden');

            // Close all other FAQs
            document.querySelectorAll('.faq-answer').forEach(a => {
                if (a !== answer) {
                    a.classList.add('hidden');
                }
            });
            document.querySelectorAll('.faq-question svg').forEach(i => {
                if (i !== icon) {
                    i.classList.remove('rotate-180');
                }
            });

            // Toggle current FAQ
            if (isOpen) {
                answer.classList.add('hidden');
                icon.classList.remove('rotate-180');
            } else {
                answer.classList.remove('hidden');
                icon.classList.add('rotate-180');
            }
        });
    });
}

// Initialize calculator and FAQ
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    initFAQ();
});

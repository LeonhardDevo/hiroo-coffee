document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Preloader ---------- */
    const preloader = document.getElementById('preloader');
    const hidePreloader = () => {
        preloader.classList.add('done');
        document.body.classList.remove('is-loading');
    };
    const minShow = reduceMotion ? 0 : 1900;
    const loadStart = performance.now();
    const finishLoading = () => setTimeout(hidePreloader, Math.max(0, minShow - (performance.now() - loadStart)));
    if (document.readyState === 'complete') {
        finishLoading();
    } else {
        window.addEventListener('load', finishLoading);
    }
    setTimeout(hidePreloader, 3500);

    /* ---------- Header, progress bar, back-to-top ---------- */
    const header = document.getElementById('main-header');
    const progressBar = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');
    const backToTopRing = document.getElementById('back-to-top-ring');
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? y / max : 0;

        header.classList.toggle('scrolled', y > 50);
        progressBar.style.transform = `scaleX(${progress})`;
        backToTop.classList.toggle('visible', y > window.innerHeight * 0.8);
        backToTopRing.style.strokeDashoffset = String(100 - progress * 100);

        if (!reduceMotion && window.innerWidth > 768) {
            parallaxEls.forEach(el => {
                const rect = el.getBoundingClientRect();
                const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * parseFloat(el.dataset.parallax);
                el.style.transform = `translateY(${offset.toFixed(1)}px)`;
            });
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    /* ---------- Mobile navigation ---------- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('main-nav-links');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    /* ---------- Active nav link on scroll ---------- */
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(sec => sectionObserver.observe(sec));

    /* ---------- Hero slideshow ---------- */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const SLIDE_MS = 6500;
    let currentSlide = 0;
    let slideTimer;

    document.documentElement.style.setProperty('--slide-duration', `${SLIDE_MS}ms`);

    function showSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        void dots[currentSlide].offsetWidth; // restart the progress animation
        dots[currentSlide].classList.add('active');
    }

    function startSlideshow() {
        clearInterval(slideTimer);
        if (reduceMotion) return;
        slideTimer = setInterval(() => showSlide(currentSlide + 1), SLIDE_MS);
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            startSlideshow();
        });
    });
    startSlideshow();

    /* ---------- Menu tabs ---------- */
    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const menuGrids = document.querySelectorAll('.menu-grid');
    const tabIndicator = document.getElementById('menu-tab-indicator');

    function moveIndicator(btn) {
        tabIndicator.style.width = `${btn.offsetWidth}px`;
        tabIndicator.style.transform = `translateX(${btn.offsetLeft}px)`;
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            tabButtons.forEach(btn => {
                btn.classList.toggle('active', btn === button);
                btn.setAttribute('aria-selected', btn === button);
            });
            menuGrids.forEach(grid => grid.classList.toggle('active', grid.id === `menu-grid-${category}`));
            moveIndicator(button);
            const tabsBar = button.parentElement;
            if (tabsBar.scrollWidth > tabsBar.clientWidth) {
                tabsBar.scrollTo({ left: button.offsetLeft - (tabsBar.clientWidth - button.offsetWidth) / 2, behavior: 'smooth' });
            }
        });
    });

    const refreshIndicator = () => moveIndicator(document.querySelector('.menu-tab-btn.active'));
    window.addEventListener('resize', refreshIndicator);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshIndicator);
    refreshIndicator();

    /* ---------- Reveal on scroll ---------- */
    const toReveal = document.querySelectorAll(
        '.section-title, .about-text, .about-stats, .about-gallery, .ritual-step, .experience-card, .gallery-item, .info-card, .map-wrapper, .reservation-box'
    );
    toReveal.forEach(el => el.classList.add('reveal-element'));

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal-element'));
            const delay = Math.min(siblings.indexOf(entry.target), 6) * 80;
            entry.target.style.transitionDelay = `${delay}ms`;
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    toReveal.forEach(el => revealObserver.observe(el));

    /* ---------- Counters ---------- */
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = reduceMotion ? 0 : 1600;
            const start = performance.now();
            const tick = now => {
                const t = duration ? Math.min((now - start) / duration, 1) : 1;
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.round(target * eased);
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.6 });
    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    /* ---------- Experience card spotlight ---------- */
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('pointermove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });
    });

    /* ---------- Gallery lightbox ---------- */
    const galleryItems = [...document.querySelectorAll('.gallery-item')];
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    let lightboxIndex = 0;

    function renderLightbox() {
        const item = galleryItems[lightboxIndex];
        const img = item.querySelector('img');
        lightboxImg.src = item.dataset.full || img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = item.querySelector('.gallery-item-title').textContent;
    }

    function openLightbox(index) {
        lightboxIndex = index;
        renderLightbox();
        lightbox.hidden = false;
        requestAnimationFrame(() => lightbox.classList.add('open'));
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { lightbox.hidden = true; }, 350);
    }

    function stepLightbox(delta) {
        lightboxIndex = (lightboxIndex + delta + galleryItems.length) % galleryItems.length;
        renderLightbox();
    }

    galleryItems.forEach((item, i) => {
        item.tabIndex = 0;
        item.addEventListener('click', () => openLightbox(i));
        item.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(i);
            }
        });
    });

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => stepLightbox(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => stepLightbox(1));
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') stepLightbox(-1);
        if (e.key === 'ArrowRight') stepLightbox(1);
    });

    /* ---------- Today's sunset on the terrace (Awaza, UTC+5) ---------- */
    function sunsetTime(date, lat, lng, tzHours) {
        const rad = Math.PI / 180;
        const dayOfYear = Math.floor((Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86400000);
        const g = (2 * Math.PI / 365) * (dayOfYear - 1 + 0.25);
        const eqTime = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
        const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g)
            + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
        const ha = Math.acos(Math.cos(90.833 * rad) / (Math.cos(lat * rad) * Math.cos(decl)) - Math.tan(lat * rad) * Math.tan(decl)) / rad;
        const minutes = ((720 - 4 * (lng - ha) - eqTime + tzHours * 60) % 1440 + 1440) % 1440;
        const h = Math.floor(minutes / 60);
        const m = Math.round(minutes % 60);
        return `${String(h).padStart(2, '0')}:${String(m === 60 ? 59 : m).padStart(2, '0')}`;
    }
    document.getElementById('sunset-time').textContent = sunsetTime(new Date(), 40.02, 52.97, 5);

    /* ---------- Reservation form ---------- */
    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');
    const bookingDesc = document.getElementById('booking-desc');
    const bookingHeading = document.getElementById('booking-heading');
    const formError = document.getElementById('form-error');
    const requiredFields = ['book-name', 'book-phone', 'book-date', 'book-time'].map(id => document.getElementById(id));

    requiredFields.forEach(field => {
        field.addEventListener('input', () => field.classList.remove('invalid'));
    });

    bookingForm.addEventListener('submit', e => {
        e.preventDefault();

        const invalid = requiredFields.filter(field => !field.value.trim() || !field.checkValidity());
        requiredFields.forEach(field => field.classList.toggle('invalid', invalid.includes(field)));
        if (invalid.length) {
            formError.hidden = false;
            invalid[0].focus();
            return;
        }
        formError.hidden = true;

        const booking = {
            name: requiredFields[0].value.trim(),
            phone: requiredFields[1].value.trim(),
            date: requiredFields[2].value,
            time: requiredFields[3].value,
            guests: document.getElementById('book-guests').value,
            zone: bookingForm.querySelector('input[name="zone"]:checked').value,
            requests: document.getElementById('book-requests').value.trim()
        };
        console.log('Reservation request', booking);

        bookingForm.hidden = true;
        bookingDesc.hidden = true;
        bookingHeading.hidden = true;
        bookingSuccess.hidden = false;
    });

    document.getElementById('booking-again').addEventListener('click', () => {
        bookingForm.reset();
        setDefaultDate();
        bookingSuccess.hidden = true;
        bookingForm.hidden = false;
        bookingDesc.hidden = false;
        bookingHeading.hidden = false;
    });

    const dateInput = document.getElementById('book-date');
    function setDefaultDate() {
        const now = new Date();
        const today = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }
    setDefaultDate();

    /* ---------- Translations (Turkmen is read from the HTML) ---------- */
    const translations = {
        ru: {
            nav_about: "О нас",
            nav_ritual: "Ритуал",
            nav_menu: "Меню",
            nav_gallery: "Галерея",
            nav_location: "Как найти",
            nav_book: "Забронировать",
            hero_tag: "Аваза · Каспийское побережье",
            hero_subtitle: "Дрип-кофе • Японская кухня • Морской бриз",
            hero_desc: "Каждая чашка начинается с одной капли. Кофе ручного заваривания, киотский колд-дрип, матча и японские завтраки — на берегу Каспия.",
            hero_btn_reserve: "Забронировать стол",
            hero_btn_menu: "Смотреть меню",
            hero_scroll: "Листайте",
            about_tag: "Философия одной капли",
            about_heading: "Медленный кофе. Тихое море.",
            about_p1: "Сидзуку (雫) по-японски — одна капля воды. Мы назвали кофейню в честь самого медленного и терпеливого момента в кофе — мгновения, когда капля проходит сквозь помол. Здесь, у кромки Каспия, мы завариваем так, как столетие варят в киотских киссатэн: вручную, по весам, по ощущению.",
            about_p2: "Павильон построен из обожжённого кедра шоу-суги-бан, необработанной известковой штукатурки и речного камня. Днём свет проходит сквозь ширмы из бумаги васи, вечером — сквозь бумажные фонари. Здесь ничего не кричит, поэтому слышно прибой.",
            stat_hours: "часов колд-дрипа",
            stat_origins: "моносорта зерна",
            stat_temp: "температура воды",
            stat_seats: "мест с видом на море",
            ritual_tag: "Четыре движения",
            ritual_heading: "Ритуал заваривания",
            ritual_1_t: "Помол",
            ritual_1_d: "Зерно мелется под каждую чашку — крупно, как морская соль, за секунды до заваривания.",
            ritual_2_t: "Цветение",
            ritual_2_d: "Первая порция воды 92°. Ждём тридцать секунд, пока кофе выдыхает углекислый газ.",
            ritual_3_t: "Пролив",
            ritual_3_d: "Медленные круги из чайника «гусиная шея» — тонкая непрерывная нить воды.",
            ritual_4_t: "Вкус",
            ritual_4_d: "Подаём в керамике ручной работы. Дайте чашке немного остыть — сладость раскрывается постепенно.",
            menu_tag: "Сезонное меню",
            menu_heading: "Меню",
            tab_coffee: "Кофе",
            tab_signature: "Авторские напитки",
            tab_kitchen: "Кухня",
            tab_sweets: "Сладости",
            m_drip_t: "Ручной пролив V60",
            m_drip_d: "Моносорт Эфиопия Гуджи, светлая обжарка. Жасмин, белый персик, бергамот.",
            m_cold_t: "Киотский колд-дрип",
            m_cold_d: "Ледяная вода капля за каплей проходит через помол двенадцать часов. Шелковистый, сладкий, почти винный.",
            m_capp_t: "Капучино",
            m_capp_d: "Сезонный эспрессо-бленд с бархатным молоком и тюльпаном латте-арта.",
            m_flat_t: "Флэт уайт",
            m_flat_d: "Двойной ристретто и тонкая микропена. Ноты молочного шоколада и жареного фундука.",
            m_yuzu_t: "Эспрессо-тоник с юдзу",
            m_yuzu_d: "Японский цитрус юдзу, крафтовый тоник и двойной эспрессо поверх льда. Яркий, как летнее утро на пляже.",
            m_kuro_t: "Латте куромицу",
            m_kuro_d: "Окинавский сироп из чёрного сахара, эспрессо и молоко, сверху — обжаренная соевая мука кинако.",
            m_matcha_t: "Матча-латте Удзи",
            m_matcha_d: "Церемониальная матча из Удзи, взбитая вручную бамбуковым венчиком часэн.",
            m_hoji_t: "Ходзича-латте",
            m_hoji_d: "Обжаренный зелёный чай с нотами карамели и поджаренного риса. Мало кофеина, тёплый и дымный.",
            m_set_t: "Завтрак итидзю-сансай",
            m_set_d: "Один суп и три закуски: мисо, каспийская рыба на гриле, тамагояки, цукэмоно и рис.",
            m_katsu_t: "Кацу-сандо",
            m_katsu_d: "Куриная котлета в панко, соус тонкацу и хрустящая капуста в мягком молочном хлебе.",
            m_don_t: "Сякэ-дон",
            m_don_d: "Рис для суши, слабосолёный лосось, икра, сисо и мягкий желток. Океан в миске.",
            m_hotcake_t: "Японские хоткейки",
            m_hotcake_d: "Высокие, мягкие как облако панкейки со сливочным маслом и тёмным кленовым сиропом. Готовим 20 минут.",
            m_cake_t: "Торт матча мильфей",
            m_cake_d: "Двенадцать слоёв блинчиков матча и лёгкого крема, сверху — пудра чая из Удзи.",
            m_dango_t: "Митараси данго",
            m_dango_d: "Тягучие рисовые шарики, слегка обжаренные на гриле, в глазури из сладкого соевого сиропа.",
            m_castella_t: "Медовая кастелла",
            m_castella_d: "Бисквит в стиле Нагасаки, медленно выпеченный с луговым мёдом.",
            m_dora_t: "Дораяки",
            m_dora_d: "Два медовых панкейка со сладкой пастой из фасоли адзуки. Токийская классика, печём каждое утро.",
            exp_tag: "В Shizuku",
            exp_heading: "Что вас ждёт",
            exp_sunset_t: "Терраса на закате",
            exp_sunset_d: "Низкие подушки и кедровый настил, обращённые на запад, к воде. Лучшее место в золотой час.",
            exp_bar_t: "Дрип-бар",
            exp_bar_d: "Садитесь за стойку и наблюдайте за каждым проливом. Наши бариста любят вопросы.",
            exp_tea_t: "Чайная церемония",
            exp_tea_d: "По субботам — церемония матча для шести гостей с нашим чайным мастером.",
            exp_vinyl_t: "Вечера винила",
            exp_vinyl_d: "Каждую пятницу после заката — сити-поп и джаз с нашей полки пластинок.",
            exp_ceramic_t: "Керамика ручной работы",
            exp_ceramic_d: "Каждую чашку делают местные гончары. Понравилась — заберите домой.",
            exp_beans_t: "Зерно с собой",
            exp_beans_d: "Наша обжарка в пачках по 250 г — смелем под вашу домашнюю заварку.",
            exp_quiet_t: "Тихий уголок",
            exp_quiet_d: "Зона без ноутбуков с библиотекой японских фотокниг и поэзии.",
            exp_family_t: "Для всей семьи",
            exp_family_d: "Детское меню, стульчики и песочница прямо у террасы.",
            gallery_tag: "Визуальный дневник",
            gallery_heading: "Моменты дня",
            gal_1: "Утренний свет",
            gal_2: "Ручной пролив",
            gal_3: "Чайная комната",
            gal_4: "Берег Каспия",
            gal_5: "Местная керамика",
            gal_6: "Данго на углях",
            gal_7: "Руки бариста",
            gal_8: "Тихая вода",
            gal_9: "Свежая обжарка",
            loc_tag: "Приходите",
            loc_heading: "У самого моря",
            sunset_label: "Закат сегодня",
            loc_contact_title: "Адрес и контакты",
            loc_address: "Аваза, Приморский бульвар, павильон 12, Туркменбашы",
            loc_hours: "Ежедневно: 08:00 – 23:00",
            loc_access_title: "Удобства",
            am_beach: "Выход к пляжу",
            am_terrace: "Открытая терраса",
            am_wifi: "Бесплатный Wi-Fi",
            am_parking: "Парковка",
            am_access: "Доступ для колясок",
            am_pets: "Можно с питомцами",
            am_veg: "Вегетарианские блюда",
            am_card: "Оплата картой",
            book_tag: "Бронирование",
            book_heading: "Столик у моря",
            book_desc: "Забронируйте место за дрип-баром, столик на террасе или участие в субботней чайной церемонии.",
            label_name: "Ваше имя",
            label_phone: "Телефон",
            label_date: "Дата",
            label_time: "Время",
            label_guests: "Гостей",
            label_zone: "Где сядете",
            zone_terrace: "Терраса",
            zone_bar: "Дрип-бар",
            zone_hall: "Зал",
            zone_tea: "Чайная церемония",
            label_requests: "Пожелания",
            ph_name: "Например: Анна",
            ph_requests: "День рождения, детский стульчик, аллергии…",
            guests_1: "1 человек",
            guests_2: "2 человека",
            guests_3: "3 человека",
            guests_4: "4 человека",
            guests_5: "5+ человек",
            form_error: "Заполните имя, телефон, дату и время.",
            book_btn: "Забронировать",
            book_success_t: "Заявка принята",
            book_success_d: "Мы перезвоним вам в ближайшее время, чтобы подтвердить столик.",
            book_again: "Новая бронь",
            footer_tagline: "Дрип-кофе и японская кухня на берегу Каспия",
            footer_nav_title: "Разделы",
            footer_hours_title: "Часы работы",
            footer_days: "Понедельник – Воскресенье",
            footer_kitchen: "Кухня работает до 22:00",
            footer_contact_title: "Контакты",
            footer_address: "Аваза, павильон 12",
            footer_copyright: "© 2026 SHIZUKU Coffee & Kitchen. Все права защищены.",
            footer_author: "каждая встреча неповторима",
            footer_credit: "Фото: Unsplash"
        },
        en: {
            nav_about: "About",
            nav_ritual: "Ritual",
            nav_menu: "Menu",
            nav_gallery: "Gallery",
            nav_location: "Visit",
            nav_book: "Book a Table",
            hero_tag: "Awaza · Caspian Shore",
            hero_subtitle: "Drip Coffee • Japanese Kitchen • Sea Breeze",
            hero_desc: "Every cup begins with a single drop. Hand-poured coffee, Kyoto cold drip, ceremonial matcha and Japanese breakfasts on the shore of the Caspian.",
            hero_btn_reserve: "Reserve a Table",
            hero_btn_menu: "View Menu",
            hero_scroll: "Scroll",
            about_tag: "The Philosophy of a Drop",
            about_heading: "Slow coffee. Quiet sea.",
            about_p1: "Shizuku (雫) is the Japanese word for a single drop of water. We named our café after the slowest, most patient moment in coffee — the instant a drop falls through the grounds. Here, on the edge of the Caspian, we brew the way Kyoto kissaten have for a century: by hand, by scale, by feel.",
            about_p2: "The pavilion is built from charred shou sugi ban cedar, raw lime plaster and river stone. Light comes through washi screens by day and paper lanterns by night. Nothing shouts — so you can hear the tide.",
            stat_hours: "hours of cold drip",
            stat_origins: "single origins",
            stat_temp: "brew temperature",
            stat_seats: "seats facing the sea",
            ritual_tag: "Four Movements",
            ritual_heading: "The Brewing Ritual",
            ritual_1_t: "Grind",
            ritual_1_d: "Beans are ground to order, coarse as sea salt, seconds before brewing.",
            ritual_2_t: "Bloom",
            ritual_2_d: "A first splash of 92° water. We wait thirty seconds while the coffee breathes out.",
            ritual_3_t: "Pour",
            ritual_3_d: "Slow concentric circles from a gooseneck kettle — a thin, unbroken thread of water.",
            ritual_4_t: "Taste",
            ritual_4_d: "Served in hand-thrown ceramics. Let it cool a little: sweetness opens as the cup settles.",
            menu_tag: "Seasonal Menu",
            menu_heading: "The Menu",
            tab_coffee: "Coffee",
            tab_signature: "Signature",
            tab_kitchen: "Kitchen",
            tab_sweets: "Sweets",
            m_drip_t: "Hand Drip V60",
            m_drip_d: "Single-origin Ethiopia Guji, light roast. Jasmine, white peach and bergamot.",
            m_cold_t: "Kyoto Cold Drip",
            m_cold_d: "Ice water falls drop by drop through the grounds for twelve hours. Silky, sweet, almost wine-like.",
            m_capp_t: "Cappuccino",
            m_capp_d: "Our seasonal espresso blend with velvety milk and a quiet tulip on top.",
            m_flat_t: "Flat White",
            m_flat_d: "Double ristretto, thin microfoam. Notes of milk chocolate and roasted hazelnut.",
            m_yuzu_t: "Yuzu Espresso Tonic",
            m_yuzu_d: "Japanese citrus, craft tonic and a double shot poured over ice. Bright as a summer morning on the beach.",
            m_kuro_t: "Kuromitsu Latte",
            m_kuro_d: "Okinawan black sugar syrup, espresso and steamed milk, finished with roasted kinako.",
            m_matcha_t: "Uji Matcha Latte",
            m_matcha_d: "Ceremonial-grade matcha from Uji, whisked by hand with a bamboo chasen.",
            m_hoji_t: "Hojicha Latte",
            m_hoji_d: "Roasted green tea with notes of caramel and toasted rice. Low caffeine, warm and smoky.",
            m_set_t: "Ichiju-Sansai Breakfast",
            m_set_d: "One soup, three sides: miso, grilled Caspian fish, tamagoyaki, pickles and steamed rice.",
            m_katsu_t: "Katsu Sando",
            m_katsu_d: "Panko-crusted chicken cutlet, tonkatsu sauce and crisp cabbage in pillowy milk bread.",
            m_don_t: "Salmon Don",
            m_don_d: "Sushi rice, cured salmon, ikura, shiso and a soft egg yolk. The ocean in a bowl.",
            m_hotcake_t: "Japanese Hotcakes",
            m_hotcake_d: "Tall, cloud-soft pancakes with cultured butter and dark maple. Made to order — allow 20 minutes.",
            m_cake_t: "Matcha Mille Crêpe",
            m_cake_d: "Twelve layers of matcha crêpe and light cream, finished with a dusting of Uji tea.",
            m_dango_t: "Mitarashi Dango",
            m_dango_d: "Chewy rice dumplings, lightly grilled and glazed with sweet soy syrup.",
            m_castella_t: "Honey Castella",
            m_castella_d: "Nagasaki-style sponge cake, baked low and slow with wildflower honey.",
            m_dora_t: "Dorayaki",
            m_dora_d: "Two honey pancakes around sweet azuki bean paste. A Tokyo classic, made each morning.",
            exp_tag: "At Shizuku",
            exp_heading: "What awaits you",
            exp_sunset_t: "Sunset Terrace",
            exp_sunset_d: "Low cushions and cedar decking facing west over the water. The best seat at golden hour.",
            exp_bar_t: "Drip Bar",
            exp_bar_d: "Sit at the counter and watch every pour. Our baristas love questions.",
            exp_tea_t: "Tea Ceremony",
            exp_tea_d: "Saturday matcha ceremonies for up to six guests, led by our tea master.",
            exp_vinyl_t: "Vinyl Evenings",
            exp_vinyl_d: "City pop and jazz from our record shelf every Friday after sunset.",
            exp_ceramic_t: "Handmade Ceramics",
            exp_ceramic_d: "Every cup is thrown by local potters. Find one you love? Take it home.",
            exp_beans_t: "Beans to Go",
            exp_beans_d: "Our roasts in 250 g bags, ground for your brewer at home.",
            exp_quiet_t: "Quiet Corner",
            exp_quiet_d: "A no-laptop zone with a library of Japanese photo books and poetry.",
            exp_family_t: "Family Friendly",
            exp_family_d: "Kids' menu, high chairs and a sandbox right by the terrace.",
            gallery_tag: "Visual Diary",
            gallery_heading: "Moments of the Day",
            gal_1: "Morning Light",
            gal_2: "The Pour",
            gal_3: "Tea Room",
            gal_4: "Caspian Shore",
            gal_5: "Local Ceramics",
            gal_6: "Charcoal Dango",
            gal_7: "Barista's Hands",
            gal_8: "Still Water",
            gal_9: "Fresh Roast",
            loc_tag: "Visit Us",
            loc_heading: "Right by the Sea",
            sunset_label: "Sunset today",
            loc_contact_title: "Address & Contact",
            loc_address: "Pavilion 12, Seaside Promenade, Awaza, Türkmenbaşy",
            loc_hours: "Daily: 08:00 – 23:00",
            loc_access_title: "Amenities",
            am_beach: "Beach access",
            am_terrace: "Open-air terrace",
            am_wifi: "Free Wi-Fi",
            am_parking: "Parking",
            am_access: "Wheelchair access",
            am_pets: "Pet friendly",
            am_veg: "Vegetarian dishes",
            am_card: "Card payments",
            book_tag: "Reservations",
            book_heading: "A Table by the Sea",
            book_desc: "Reserve a seat at the drip bar, a table on the terrace or a spot at the Saturday tea ceremony.",
            label_name: "Your name",
            label_phone: "Phone",
            label_date: "Date",
            label_time: "Time",
            label_guests: "Guests",
            label_zone: "Seating",
            zone_terrace: "Terrace",
            zone_bar: "Drip bar",
            zone_hall: "Hall",
            zone_tea: "Tea ceremony",
            label_requests: "Special requests",
            ph_name: "e.g. Anna",
            ph_requests: "Birthday, high chair, allergies…",
            guests_1: "1 guest",
            guests_2: "2 guests",
            guests_3: "3 guests",
            guests_4: "4 guests",
            guests_5: "5+ guests",
            form_error: "Please fill in your name, phone, date and time.",
            book_btn: "Reserve",
            book_success_t: "Request received",
            book_success_d: "We'll call you shortly to confirm your table.",
            book_again: "New booking",
            footer_tagline: "Drip coffee & Japanese kitchen on the Caspian shore",
            footer_nav_title: "Navigate",
            footer_hours_title: "Hours",
            footer_days: "Monday – Sunday",
            footer_kitchen: "Kitchen closes at 22:00",
            footer_contact_title: "Contact",
            footer_address: "Pavilion 12, Awaza",
            footer_copyright: "© 2026 SHIZUKU Coffee & Kitchen. All rights reserved.",
            footer_author: "every encounter happens only once",
            footer_credit: "Photos: Unsplash"
        }
    };

    // Turkmen is the source language: capture it from the markup.
    const tk = {};
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (!(key in tk)) tk[key] = el.textContent.trim();
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        tk[el.dataset.i18nPlaceholder] = el.getAttribute('placeholder');
    });
    translations.tk = tk;

    const langBtnDropdown = document.getElementById('lang-btn-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangCode = document.getElementById('current-lang-code');
    const langSelectorContainer = document.getElementById('lang-selector-container');
    const codeDisplayMap = { tk: "TKM", ru: "РУС", en: "ENG" };

    langBtnDropdown.addEventListener('click', e => {
        e.stopPropagation();
        langSelectorContainer.classList.toggle('open');
    });

    document.addEventListener('click', e => {
        if (!langSelectorContainer.contains(e.target)) {
            langSelectorContainer.classList.remove('open');
        }
    });

    function updateLanguage(lang) {
        const dict = translations[lang];
        if (!dict) return;

        try { localStorage.setItem('shizuku-lang', lang); } catch (err) { /* storage unavailable */ }
        document.documentElement.setAttribute('lang', lang);
        langOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));
        currentLangCode.textContent = codeDisplayMap[lang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const value = dict[el.dataset.i18n];
            if (value) el.textContent = value;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const value = dict[el.dataset.i18nPlaceholder];
            if (value) el.setAttribute('placeholder', value);
        });

        refreshIndicator();
    }

    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            updateLanguage(opt.dataset.lang);
            langSelectorContainer.classList.remove('open');
        });
    });

    let savedLang = 'tk';
    try { savedLang = localStorage.getItem('shizuku-lang') || 'tk'; } catch (err) { /* storage unavailable */ }
    updateLanguage(savedLang);
});

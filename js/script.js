document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('main-nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (e.target.closest('#lang-selector-container')) return;
            mobileToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    const tabButtons = document.querySelectorAll('.menu-tab-btn');
    const menuGrids = document.querySelectorAll('.menu-grid');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            menuGrids.forEach(grid => {
                grid.classList.remove('active');
                
                const targetId = `menu-grid-${category}`;
                if (grid.id === targetId) {
                    setTimeout(() => {
                        grid.classList.add('active');
                    }, 50);
                }
            });
        });
    });

    const sectionsToReveal = document.querySelectorAll('section');
    const cardsToReveal = document.querySelectorAll('.menu-card, .experience-card, .gallery-item, .info-card');
    
    sectionsToReveal.forEach(sec => {
        if (sec.id !== 'hero-section') {
            sec.classList.add('reveal-element');
        }
    });
    cardsToReveal.forEach(card => card.classList.add('reveal-element'));

    const revealObserverOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    const elementsToObserve = document.querySelectorAll('.reveal-element');
    elementsToObserve.forEach(el => revealObserver.observe(el));

    const bookingForm = document.getElementById('booking-form');
    const bookingSuccess = document.getElementById('booking-success');
    const bookingDesc = document.querySelector('.reservation-desc');
    const bookingHeading = document.getElementById('booking-heading');

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('book-name').value;
        const phone = document.getElementById('book-phone').value;
        const date = document.getElementById('book-date').value;
        const time = document.getElementById('book-time').value;
        const guests = document.getElementById('book-guests').value;
        const requests = document.getElementById('book-requests').value;
        
        console.log("=== Table Reservation ===");
        console.log(`Name: ${name}`);
        console.log(`Phone: ${phone}`);
        console.log(`Date: ${date}`);
        console.log(`Time: ${time}`);
        console.log(`Guests: ${guests}`);
        console.log(`Special Requests: ${requests}`);

        bookingForm.style.display = 'none';
        bookingDesc.style.display = 'none';
        bookingHeading.style.display = 'none';
        bookingSuccess.style.display = 'block';
    });

    const dateInput = document.getElementById('book-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }

    const translations = {
        tk: {
            nav_about: "Biz Barada",
            nav_menu: "Menýu",
            nav_experience: "Amatlyklar",
            nav_gallery: "Galereýa",
            nav_location: "Salgymyz",
            nav_book_table: "Stol Sargaň",
            hero_subtitle: "Ýörite Kofe • Branç • Restoran Tejirbesi",
            hero_description: "Şäheriň merkezinde ajaýyp kofe, ýörite taýýarlanylan ertirlikler, özboluşly desertler we ýyly şäher gurşawyny başdan geçiriň.",
            hero_btn_reserve: "Stol Sargaň",
            hero_btn_menu: "Menýuny Gör",
            about_tag: "WABI-SABI PELSEPESI",
            about_heading: "Asudalygyň we Arassa Tagamyň Oazisi",
            about_p1: "Tokionyň Hiroo etrabynyň inçe we ýakyn köçelerinden ylham alan HIROO Kofe & Kitchen, Aşgabadyň merkezine ýapon minimalizminiň we skandinaw rahatlygynyň ajaýyp garyndysyny getirýär. Biziň giňişligimiz Wabi-Sabi-niň esasy pelsepesi bolan - tebigy kemçiliklerde, çig mallarda we dymmaklykda gözelligi tapmak düşünjesine esaslanýar.",
            about_p2: "Abraýly Restaurant & Bar Design Awards baýragyna dalaşgär görkezilen binagärlik konsepsiýamyz sowuk we gaty betony, ýyly we tebigy agaç işlerini we ünsli hasaplanan çyralary birleşdirýär. Bu ýer, şäheriň galmagally sesinden uzaklaşyp, tagamyň, fakturanyň we pikirlenmegiň arassalygyna üns bermek üçün döredilen mukaddes ýerdir.",
            about_feat_coffee: "Ýokary hilli kofe däneleri",
            about_feat_baristas: "Baristalaryň ajaýyp işi",
            about_feat_breakfasts: "Täze taýýarlanylan ertirlikler",
            about_feat_rooftop: "Üçekde ýerleşýän orunlar",
            menu_tag: "ÝAPON REDAKTORLYK STILI",
            menu_heading: "Menýu Tejirbesi",
            menu_tab_coffee: "Kofe Ýygyndysy",
            menu_tab_signature: "Ýörite Içgiler",
            menu_tab_breakfast: "Ertirlik & Branç",
            menu_tab_desserts: "Özboluşly Desertler",
            menu_espresso_title: "Espresso",
            menu_espresso_desc: "Ýeke-täk gelip çykyşy bolan ýörite Arabika dänelerinden taýýarlanylan, janly turşulygy we goýy şokolad tagamly goşa espresso.",
            menu_cappuccino_title: "Kapuçino",
            menu_cappuccino_desc: "Ýyly we süýji süýt bilen garylan, silky mikrogöbükli goşa espresso. Ajaýyp latte art sungaty bilen bezelen.",
            menu_flat_white_title: "Flat White",
            menu_flat_white_desc: "Goşa ristretto şoty we inçe, ýumşak buglanan süýt bilen kofeniň güýçli tagamyny berýän içgi.",
            menu_latte_title: "Latte",
            menu_latte_desc: "Ýeňil mikrogöbük gatlagy bilen bezelen, goşa espresso we süýdüň amatly garyndysy.",
            menu_raf_title: "Raf Kofe",
            menu_raf_desc: "Goşa espresso, süýt we wanil şekeriniň bilelikde buglanmagy arkaly taýýarlanýan velvety garyndy.",
            menu_salted_caramel_title: "Duzly Karamel Latte",
            menu_salted_caramel_desc: "Hususy taýýarlanylan duzly karamel sousy we deňiz duzunyň owuntyklary bilen garylan goşa espresso we süýt.",
            menu_lavender_title: "Lawanda Latte",
            menu_lavender_desc: "Tebigy lawanda siropy we ajaýyp kofe köpürjigi bilen bezelen tagamly goşa espresso we buglanan süýt.",
            menu_shakshuka_title: "Şakşuka",
            menu_shakshuka_desc: "Kumin bilen lezzetlendirilen, pomidor we burç sousynda bişirilen iki sany poached ýumurtgasy we çörek dilimleri.",
            menu_croissant_title: "Kruassan & Skrembl",
            menu_croissant_desc: "Ýumşak we tagamly kruassanyň içinde taýýarlanan krem-skrembl ýumurtgasy we gök önümler, çeri pomidory bilen.",
            menu_potato_pancakes_title: "Kartoşkaly Guymak & Poached Ýumurtga",
            menu_potato_pancakes_desc: "Gyzgyn we gyzylymtyl bişirilen kartoşkaly hasbrown-lar, üstünde poached ýumurtgasy we gök önümler bilen.",
            menu_tiramisu_title: "Pistah Tiramisu",
            menu_tiramisu_desc: "Espresso siropynda ezilen biskwitler, pistahly maskarpone kremi we uşadylan pistah däneleri bilen bezelen.",
            menu_cheesecake_title: "Bask Çizkegi",
            menu_cheesecake_desc: "Daşy karamelize bolan we içi ýumşak, agzyňda ereýän meşhur Bask burnt çizkegi. Biziň iň meşhur desertimiz.",
            experience_tag: "GURŞAWYŇ ASUDALYGY",
            experience_heading: "HIROO Gurşawy",
            exp_coffee_title: "Ýörite Kofe",
            exp_coffee_desc: "Hususy saýlanan, gyzgyn we professional derejede taýýarlanylan Arabika kofe däneleri, ýörite elde taýýarlanan jamlarda hödürlenýär.",
            exp_desserts_title: "Özboluşly Desertler",
            exp_desserts_desc: "Biziň konditerlerimiz tarapyndan her gün täze taýýarlanýan häzirki zaman we ýapon görnüşli desertler.",
            exp_music_title: "Janly Çykyşlar",
            exp_music_desc: "Käbir agşamlarda biziň myhmanlarymyz üçin ýörite guralýan asuda, akustiki saz çykyşlary.",
            exp_rooftop_title: "Üçekdäki Ýerler",
            exp_rooftop_desc: "Aşgabadyň gijeki görnüşine seredip, açyk asmanyň astynda kofe we ertirlik başdan geçiriň.",
            exp_brunch_title: "Ertirlik & Branç",
            exp_brunch_desc: "Tebigy we arassa önümlerden taýýarlanylýan lezzetli we ýokumly ertilikler.",
            exp_wine_title: "Kokteyller & Şerap",
            exp_wine_desc: "Tokionyň gijeki durmuşyndan ylham alan awtorlyk kokteylleri we ýokary hilli şerap ýygyndysy.",
            exp_cozy_title: "Ýyly Gurşaw",
            exp_cozy_desc: "Minimalist mebeller, ýumşak oturgyçlar, beton gurluşy we soraýjy çyralar bilen rahatlygy başdan geçiriň.",
            exp_workspace_title: "Işlemek üçin Amatly",
            exp_workspace_desc: "Frilanserler, dizaýnerler we programmistler üçin ýokary tizlikli internet we asuda iş burçlary.",
            gallery_tag: "GALEREÝA HILI",
            gallery_heading: "Wizual Journal",
            gal_title_1: "Binagärlik Dalaşgär",
            gal_title_2: "Kofe Köpürjigi",
            gal_title_3: "Tebigy Çig Mallar",
            gal_title_4: "Bask Çizkegi",
            gal_title_5: "Açyk Bag Ýerleri",
            gal_title_6: "Taýýarlanylan Branç",
            gal_title_7: "Gijeki Gurşaw",
            location_tag: "BIZE GELIŇ",
            location_heading: "HIROO-a Geliň",
            loc_contact_title: "Salgymyz we Kontakt",
            loc_address: "9-njy mikroraýon, Oguz han köçesi, 5-nji geçelge, 7/4 jaý, Aşgabat",
            loc_phone: "+993 62 222775 / +993 862222775",
            loc_email: "hello@hiroocoffee.com",
            loc_hours: "Her gün: 09:00 - 22:00",
            loc_access_title: "Amatlyklar we Elýeterlilik",
            loc_wheelchair: "Maýyplar arabasy üçin giriş",
            loc_parking: "Göz öňünde tutulan awtoduralga",
            loc_seating: "Maýyplar arabasy üçin ýerler",
            loc_terrace: "Açyk terrasa",
            loc_rooftop: "Üçekde ýerler",
            loc_family: "Maşgala üçin",
            loc_tourist: "Syýahatçylar üçin",
            loc_free_parking: "Mugt duralga",
            loc_live_music: "Janly sazly agşamlar",
            book_tag: "HIROO TEJIRBESI",
            book_heading: "Stoluňyzy Sargaň",
            book_desc: "Ýörite kofe we ajaýyp branç üçin asuda we amatly stoly şu günden sargaň.",
            label_name: "Adyňyz",
            label_phone: "Telefon belgiňiz",
            label_date: "Senäni saýlaň",
            label_time: "Wagty saýlaň",
            label_guests: "Myhman sany",
            label_requests: "Ýörite islegleriňiz",
            placeholder_name: "Mysal üçin: Anton Wizzhachi",
            placeholder_phone: "+993 62 222775",
            placeholder_requests: "Üçekde ýer, maýyplar arabasy üçin ýer we ş.m.",
            guests_1: "1 Adam",
            guests_2: "2 Adam",
            guests_3: "3 Adam",
            guests_4: "4 Adam",
            guests_5: "5+ Adam",
            book_btn: "Stoly Sargamak",
            book_success_title: "Stol Üstünlikli Sargalandy",
            book_success_desc: "Bize gelmegiňize sabyrsyzlyk bilen garaşýarys. Sargyt maglumatlary telefon belgiňize SMS arkaly iberiler.",
            footer_tagline: "Ýapon Ýörite Kofesi • Branç • Naharhana",
            footer_nav_title: "Nawigasiýa",
            footer_link_story: "Biz barada",
            footer_link_menu: "Menýu",
            footer_link_amenities: "Amatlyklar",
            footer_link_gallery: "Surat Žurnaly",
            footer_link_location: "Bize Geliň",
            footer_hours_title: "Iş Wagtymyz",
            footer_days: "Duşenbe - Ýekşenbe",
            footer_kitchen: "Aşhana 21:30-da ýapylýar",
            footer_contact_title: "Habarlaşmak",
            footer_copyright: "© 2026 HIROO Coffee & Kitchen. Ähli hukuklar goralan.",
            footer_author: "Wabi-Sabi ruhunda dizaýn edilen"
        },
        ru: {
            nav_about: "О Нас",
            nav_menu: "Меню",
            nav_experience: "Атмосфера",
            nav_gallery: "Галерея",
            nav_location: "Контакты",
            nav_book_table: "Забронировать",
            hero_subtitle: "Спешелти Кофе • Бранч • Уникальный Обед",
            hero_description: "Попробуйте исключительный кофе, изысканные завтраки ручной работы, авторские десерты и окунитесь в теплую городскую атмосферу в самом сердце города.",
            hero_btn_reserve: "Забронировать Стол",
            hero_btn_menu: "Посмотреть Меню",
            about_tag: "ФИЛОСОФИЯ ВАБИ-САБИ",
            about_heading: "Оазис Спокойствия и Чистого Вкуса",
            about_p1: "Вдохновленная утонченными и уютными улочками района Хироо в Токио, HIROO Coffee & Kitchen привносит в Ашхабад изысканное сочетание японского минимализма и скандинавского комфорта. Наше пространство спроектировано вокруг философии Ваби-Саби — поиска красоты в естественном несовершенстве, простых текстурах и тишине.",
            about_p2: "Номинированная на престижную премию Restaurant & Bar Design Awards, наша архитектурная концепция сочетает в себе холодный фактурный бетон, теплое натуральное дерево и тщательно рассчитанное точечное освещение. Это место создано для того, чтобы отвлечься от городского шума и сосредоточиться на чистоте вкуса, текстур и созерцания.",
            about_feat_coffee: "Премиальные кофейные зерна",
            about_feat_baristas: "Бариста за работой",
            about_feat_breakfasts: "Свежие завтраки",
            about_feat_rooftop: "Места на крыше",
            menu_tag: "ЯПОНСКИЙ РЕДАКТОРСКИЙ СТИЛЬ",
            menu_heading: "Меню и Вкусы",
            menu_tab_coffee: "Классический Кофе",
            menu_tab_signature: "Авторские Напитки",
            menu_tab_breakfast: "Завтраки & Бранч",
            menu_tab_desserts: "Фирменные Десерты",
            menu_espresso_title: "Эспрессо",
            menu_espresso_desc: "Двойной эспрессо из моносорта спешелти Арабики с яркой кислотностью и оттенками темного шоколада.",
            menu_cappuccino_title: "Капучино",
            menu_cappuccino_desc: "Сбалансированный двойной эспрессо с нежным вспененным молоком и шелковистой микропеной, украшенный латте-артом.",
            menu_flat_white_title: "Флэт Уайт",
            menu_flat_white_desc: "Крепкий кофейный напиток на основе двойного ристретто с добавлением тонкого слоя бархатистого молока.",
            menu_latte_title: "Латте",
            menu_latte_desc: "Классический молочный кофе на основе порции эспрессо и пропаренного молока под легкой пенкой.",
            menu_raf_title: "Раф Кофе",
            menu_raf_desc: "Нежный сливочный напиток. Эспрессо, сливки и ванильный сахар взбиваются паром до текстуры суфле.",
            menu_salted_caramel_title: "Соленая Карамель",
            menu_salted_caramel_desc: "Латте с добавлением домашней соленой карамели, украшенный карамельным соусом и кристаллами морской соли.",
            menu_lavender_title: "Лавандовый Латте",
            menu_lavender_desc: "Ароматный кофе с добавлением натурального сиропа лаванды, украшенный нежной веточкой лаванды.",
            menu_shakshuka_title: "Шакшука",
            menu_shakshuka_desc: "Два яйца-пашот, запеченные в пряном соусе из спелых томатов и сладкого перца, подаются с хрустящими тостами.",
            menu_croissant_title: "Круассан со Скрэмблом",
            menu_croissant_desc: "Теплый маслянистый круассан с начинкой из нежного скрэмбла и свежей зелени, подается с томатами черри.",
            menu_potato_pancakes_title: "Драники с Яйцом Пашот",
            menu_potato_pancakes_desc: "Золотистые хрустящие картофельные драники с яйцом пашот, жидким желтком и свежей микрозеленью.",
            menu_tiramisu_title: "Фисташковый Тирамису",
            menu_tiramisu_desc: "Печенье савоярди, пропитанное эспрессо, с нежным кремом из маскарпоне, фисташковой пасты и тертой фисташки.",
            menu_cheesecake_title: "Баскский Чизкейк",
            menu_cheesecake_desc: "Знаменитый обожженный чизкейк Сан-Себастьян с карамельной корочкой и нежной кремовой текстурой внутри.",
            experience_tag: "ГЛУБИНА АТМОСФЕРЫ",
            experience_heading: "Философия HIROO",
            exp_coffee_title: "Спешелти Кофе",
            exp_coffee_desc: "Тщательно отобранные зерна свежей обжарки, заваренные с любовью и поданные в уникальной глиняной посуде.",
            exp_desserts_title: "Фирменные Десерты",
            exp_desserts_desc: "Утонченная выпечка и десерты с японским акцентом, приготовленные нашими кондитерами каждое утро.",
            exp_music_title: "Живая Музыка",
            exp_music_desc: "Приглушенный свет, негромкая живая акустическая музыка и инструментальные вечера по выходным.",
            exp_rooftop_title: "Терраса на Крыше",
            exp_rooftop_desc: "Наслаждайтесь любимым кофе под открытым небом с панорамным видом на вечерний Ашхабад.",
            exp_brunch_title: "Завтраки и Бранчи",
            exp_brunch_desc: "Сытные и полезные завтраки, приготовленные из свежих фермерских продуктов высшего качества.",
            exp_wine_title: "Коктейли и Вино",
            exp_wine_desc: "Вечернее меню авторских коктейлей, вдохновленное миксологией баров Токио, и винная карта.",
            exp_cozy_title: "Уютная Атмосфера",
            exp_cozy_desc: "Минималистичный дизайн, мягкие диваны, натуральные текстуры дерева и бетона для вашего отдыха.",
            exp_workspace_title: "Удобно для Работы",
            exp_workspace_desc: "Стабильный высокоскоростной интернет, тихие зоны и розетки у столов для комфортной работы фрилансеров.",
            gallery_tag: "ВИЗУАЛЬНЫЙ ЖУРНАЛ",
            gallery_heading: "Эстетика в Деталях",
            gal_title_1: "Номинант премии дизайна",
            gal_title_2: "Идеальная молочная пена",
            gal_title_3: "Фактурные материалы",
            gal_title_4: "Баскский чизкейк",
            gal_title_5: "Ландшафтный дворик",
            gal_title_6: "Свежеприготовленный бранч",
            gal_title_7: "Вечернее освещение",
            location_tag: "КАК НАС НАЙТИ",
            location_heading: "Ждем Вас в Гости",
            loc_contact_title: "Контакты и Адрес",
            loc_address: "Ашхабад, 9-й микрорайон, улица Огуз хана, 5-й проезд, дом 7/4",
            loc_phone: "+993 62 222775 / +993 862222775",
            loc_email: "hello@hiroocoffee.com",
            loc_hours: "Ежедневно: с 09:00 до 22:00",
            loc_access_title: "Удобства и Доступность",
            loc_wheelchair: "Вход для колясок",
            loc_parking: "Специальная парковка",
            loc_seating: "Места для колясок",
            loc_terrace: "Открытая терраса",
            loc_rooftop: "Места на крыше",
            loc_family: "Для всей семьи",
            loc_tourist: "Для туристов",
            loc_free_parking: "Бесплатная парковка",
            loc_live_music: "Вечера живой музыки",
            book_tag: "СТОЛЫ В HIROO",
            book_heading: "Забронировать Стол",
            book_desc: "Зарезервируйте столик сегодня, чтобы занять уютный уголок для дегустации кофе или неспешного бранча.",
            label_name: "Ваше Имя",
            label_phone: "Номер Телефона",
            label_date: "Выберите Дату",
            label_time: "Выберите Время",
            label_guests: "Количество Гостей",
            label_requests: "Особые Пожелания",
            placeholder_name: "Например: Антон Визжачий",
            placeholder_phone: "+993 62 222775",
            placeholder_requests: "Столик на крыше, место для коляски, тихая зона и т.д.",
            guests_1: "1 человек",
            guests_2: "2 человека",
            guests_3: "3 человека",
            guests_4: "4 человека",
            guests_5: "5+ человек",
            book_btn: "Забронировать Стол",
            book_success_title: "Столик успешно забронирован",
            book_success_desc: "Мы с нетерпением ждем вас в HIROO. Детали бронирования отправлены вам на указанный номер телефона.",
            footer_tagline: "Японский Спешелти Кофе • Бранч • Ужин",
            footer_nav_title: "Разделы",
            footer_link_story: "Наша История",
            footer_link_menu: "Меню",
            footer_link_amenities: "Удобства",
            footer_link_gallery: "Фотогалерея",
            footer_link_location: "Где мы",
            footer_hours_title: "Время работы",
            footer_days: "Понедельник - Воскресенье",
            footer_kitchen: "Кухня закрывается в 21:30",
            footer_contact_title: "Контакты",
            footer_copyright: "© 2026 HIROO Coffee & Kitchen. Все права защищены.",
            footer_author: "Создано в духе философии Ваби-Саби"
        },
        en: {
            nav_about: "About",
            nav_menu: "Menu",
            nav_experience: "Experience",
            nav_gallery: "Gallery",
            nav_location: "Location",
            nav_book_table: "Book Table",
            hero_subtitle: "Specialty Coffee • Brunch • Dining Experience",
            hero_description: "Experience exceptional coffee, handcrafted breakfasts, signature desserts and a warm urban atmosphere in the heart of the city.",
            hero_btn_reserve: "Reserve a Table",
            hero_btn_menu: "View Menu",
            about_tag: "WABI-SABI PHILOSOPHY",
            about_heading: "An Oasis of Calm & Pure Taste",
            about_p1: "Inspired by the refined, intimate alleys of the Hiroo district in Tokyo, HIROO Coffee & Kitchen brings a sophisticated fusion of Japanese minimalism and Scandinavian comfort to Ashgabat. Our space is designed around the core philosophy of Wabi-Sabi—finding beauty in natural imperfections, raw materials, and silence.",
            about_p2: "Nominated for the prestigious Restaurant & Bar Design Awards, the architectural concept blends cold textured concrete, warm authentic woodwork, and carefully calculated spot lighting. It is a sanctuary designed to shift your focus away from the chaotic urban noise and onto the purity of taste, textures, and contemplation.",
            about_feat_coffee: "Premium Coffee Beans",
            about_feat_baristas: "Baristas at Work",
            about_feat_breakfasts: "Fresh Breakfasts",
            about_feat_rooftop: "Rooftop Seating",
            menu_tag: "JAPANESE EDITORIAL STYLE",
            menu_heading: "The Menu Experience",
            menu_tab_coffee: "Coffee Collection",
            menu_tab_signature: "Signature Drinks",
            menu_tab_breakfast: "Breakfast & Brunch",
            menu_tab_desserts: "Signature Desserts",
            menu_espresso_title: "Espresso",
            menu_espresso_desc: "A double shot of espresso extracted from single-origin specialty Arabica beans, offering vibrant acidity and notes of dark chocolate.",
            menu_cappuccino_title: "Cappuccino",
            menu_cappuccino_desc: "Balanced double shot espresso combined with rich steamed milk and a thick layer of silky microfoam. Finished with elegant latte art.",
            menu_flat_white_title: "Flat White",
            menu_flat_white_desc: "A strong coffee experience combining a double ristretto shot with thin, velvety steamed milk for a full-bodied espresso flavor.",
            menu_latte_title: "Latte",
            menu_latte_desc: "Creamy and comforting milk-led drink featuring double shot espresso and steamed milk topped with a light layer of microfoam.",
            menu_raf_title: "Raf Coffee",
            menu_raf_desc: "A smooth and creamy local specialty. Espresso, liquid cream, and vanilla sugar steamed together to create a velvet soufflé texture.",
            menu_salted_caramel_title: "Salted Caramel Latte",
            menu_salted_caramel_desc: "Indulgent espresso combined with steamed milk, homemade sea-salt caramel sauce, topped with caramel drizzle and premium salt flakes.",
            menu_lavender_title: "Lavender Latte",
            menu_lavender_desc: "An aromatic blend of double shot espresso, velvety steamed milk, and organic lavender syrup, garnished with a lavender sprig.",
            menu_shakshuka_title: "Shakshuka",
            menu_shakshuka_desc: "Steaming hot, rich tomato-bell pepper sauce spiced with cumin, topped with two poached eggs, fresh coriander, and crispy sourdough toast.",
            menu_croissant_title: "Croissant & Scrambled Eggs",
            menu_croissant_desc: "Warm, buttery, flaky French croissant filled with creamy, slow-folded scrambled eggs and fresh microgreens, served with cherry tomatoes.",
            menu_potato_pancakes_title: "Potato Pancakes & Poached Egg",
            menu_potato_pancakes_desc: "Crispy, golden, pan-fried potato hash browns topped with a perfectly poached egg, running yolk, and fresh microgreens.",
            menu_tiramisu_title: "Pistachio Tiramisu",
            menu_tiramisu_desc: "A premium twist on the classic tiramisu. Savoiardi biscuits soaked in espresso, layered with rich pistachio mascarpone cream and crushed pistachios.",
            menu_cheesecake_title: "Basque Burnt Cheesecake",
            menu_cheesecake_desc: "Burnt to caramelized perfection on the outside, with a super creamy, custardy, and melt-in-your-mouth center. A signature dessert.",
            experience_tag: "ATMOSPHERIC DEPTH",
            experience_heading: "The HIROO Experience",
            exp_coffee_title: "Specialty Coffee",
            exp_coffee_desc: "Strictly selected single-origin Arabica beans, roasted to perfection, and served in hand-crafted ceramic mugs.",
            exp_desserts_title: "Signature Desserts",
            exp_desserts_desc: "Modern pastries and traditional Japanese-inspired desserts crafted daily by our expert pastry chefs.",
            exp_music_title: "Live Performances",
            exp_music_desc: "Atmospheric, slow live acoustic music and acoustic instrumental performances on select evening events.",
            exp_rooftop_title: "Rooftop Seating",
            exp_rooftop_desc: "Enjoy your warm brew under the open sky, overlooking the city line from our elevated rooftop garden terrace.",
            exp_brunch_title: "Breakfast & Brunch",
            exp_brunch_desc: "Satisfying breakfasts, fluffy pancakes, and fresh dishes cooked with organic local farm ingredients.",
            exp_wine_title: "Cocktails & Wine",
            exp_wine_desc: "An evening selection of boutique natural wines and craft cocktails inspired by Tokyo nightlife mixology.",
            exp_cozy_title: "Cozy Atmosphere",
            exp_cozy_desc: "Plush minimalist lounge seating, tactile textures, concrete finishes, and warm lighting to make you feel relaxed.",
            exp_workspace_title: "Workspace Friendly",
            exp_workspace_desc: "Equipped with high-speed internet connectivity and silent corners for creators, designers, and remote developers.",
            gallery_tag: "PINTEREST QUALITY",
            gallery_heading: "Visual Journal",
            gal_title_1: "Architectural Nominee",
            gal_title_2: "Perfect Microfoam",
            gal_title_3: "Tactile Raw Materials",
            gal_title_4: "Basque Burnt Cheesecake",
            gal_title_5: "Outdoor Garden block",
            gal_title_6: "Handcrafted Brunch",
            gal_title_7: "Evening Atmosphere",
            location_tag: "VISIT US",
            location_heading: "Visit HIROO",
            loc_contact_title: "Location & Contact",
            loc_address: "9th Microdistrict, Oguzhan Street, 5th Passage, Building 7/4, Ashgabat",
            loc_phone: "+993 62 222775 / +993 862222775",
            loc_email: "hello@hiroocoffee.com",
            loc_hours: "Daily: 09:00 AM – 10:00 PM",
            loc_access_title: "Amenities & Accessibility",
            loc_wheelchair: "Wheelchair Entrance",
            loc_parking: "Accessible Parking",
            loc_seating: "Wheelchair Seating",
            loc_terrace: "Outdoor Terrace",
            loc_rooftop: "Rooftop Seating",
            loc_family: "Family Friendly",
            loc_tourist: "Tourist Friendly",
            loc_free_parking: "Free Parking",
            loc_live_music: "Live Music Events",
            book_tag: "EXPERIENCE HIROO",
            book_heading: "Reserve Your Table",
            book_desc: "Reserve a table today to secure your private, intimate corner for specialty coffee tasting or an exquisite brunch.",
            label_name: "Your Name",
            label_phone: "Phone Number",
            label_date: "Select Date",
            label_time: "Select Time",
            label_guests: "Guests",
            label_requests: "Special Requests",
            placeholder_name: "Anton Vizzhachi",
            placeholder_phone: "+993 62 222775",
            placeholder_requests: "Prefer rooftop seating, wheelchair accessible table, silent zone, etc.",
            guests_1: "1 Person",
            guests_2: "2 People",
            guests_3: "3 People",
            guests_4: "4 People",
            guests_5: "5+ People",
            book_btn: "Book Now",
            book_success_title: "Table Reserved Successfully",
            book_success_desc: "We look forward to welcoming you to HIROO. A confirmation details SMS has been sent to your phone number.",
            footer_tagline: "Japanese Specialty Coffee • Brunch • Dining",
            footer_nav_title: "Navigation",
            footer_link_story: "Our Story",
            footer_link_menu: "Menu Experience",
            footer_link_amenities: "Amenities",
            footer_link_gallery: "Visual Journal",
            footer_link_location: "Visit Us",
            footer_hours_title: "Opening Hours",
            footer_days: "Monday – Sunday",
            footer_kitchen: "Kitchen closes at 09:30 PM",
            footer_contact_title: "Contact",
            footer_copyright: "© 2026 HIROO Coffee & Kitchen. All rights reserved.",
            footer_author: "Designed in the spirit of Wabi-Sabi"
        }
    };

    const langBtnDropdown = document.getElementById('lang-btn-dropdown');
    const langDropdownList = document.getElementById('lang-dropdown-list');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangCode = document.getElementById('current-lang-code');
    const langSelectorContainer = document.getElementById('lang-selector-container');

    const codeDisplayMap = {
        tk: "TKM",
        ru: "РУС",
        en: "ENG"
    };

    langBtnDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelectorContainer.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!langSelectorContainer.contains(e.target)) {
            langSelectorContainer.classList.remove('open');
        }
    });

    function updateLanguage(lang) {
        localStorage.setItem('hiroo-lang', lang);
        
        document.documentElement.setAttribute('lang', lang === 'tk' ? 'tk' : lang);

        langOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        currentLangCode.textContent = codeDisplayMap[lang] || "TKM";

        const dict = translations[lang];
        if (!dict) return;

        const i18nElements = document.querySelectorAll('[data-i18n]');
        i18nElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                const icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = icon.outerHTML + ' ' + dict[key];
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (dict[key]) {
                el.setAttribute('placeholder', dict[key]);
            }
        });
    }

    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const selectedLang = opt.getAttribute('data-lang');
            updateLanguage(selectedLang);
            langSelectorContainer.classList.remove('open');
        });
    });

    const savedLang = localStorage.getItem('hiroo-lang') || 'tk';
    updateLanguage(savedLang);
});

import { useEffect, useMemo, useRef, useState } from 'react';
import StudioLogo from './components/StudioLogo';

const IconMoon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1012 21a9 9 0 009-8.21z" />
  </svg>
);

const IconSun = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.45 10.45l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM12 5a1 1 0 001-1V1h-2v3a1 1 0 001 1zm0 14a1 1 0 00-1 1v3h2v-3a1 1 0 00-1-1zm7-7a1 1 0 001-1h3v-2h-3a1 1 0 00-1 1 1 1 0 001 1zm-14 0a1 1 0 001-1 1 1 0 00-1-1H1v2h3zm12.24-7.16l1.79-1.8-1.41-1.41-1.8 1.79 1.42 1.42zM6.34 15.3l-1.79 1.8 1.41 1.41 1.8-1.79-1.42-1.42zM12 7a5 5 0 100 10 5 5 0 000-10z" />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.93 9h-2.11a15.33 15.33 0 00-1.19-5.06A8.05 8.05 0 0118.93 11zM12 4a20.35 20.35 0 011.6 7H10.4A20.35 20.35 0 0112 4zM8.37 6a15.33 15.33 0 00-1.19 5.06H5.07A8.05 8.05 0 018.37 6zM5.07 13h2.11a15.33 15.33 0 001.19 5.06A8.05 8.05 0 015.07 13zm6.93 7a20.35 20.35 0 01-1.6-7h3.2a20.35 20.35 0 01-1.6 7zm3.63-1.94A15.33 15.33 0 0016.82 13h2.11a8.05 8.05 0 01-2.3 5.06z" />
  </svg>
);

const SUPPORTED_LANGUAGES = ['en', 'it', 'ru'];

const LANGUAGE_INDICATORS = {
  en: 'EN',
  it: 'IT',
  ru: 'RU',
};

const LANGUAGE_BUTTON_LABELS = {
  en: 'Change language',
  it: 'Cambia lingua',
  ru: 'Сменить язык',
};

const THEME_BUTTON_LABELS = {
  en: 'Toggle theme',
  it: 'Cambia tema',
  ru: 'Переключить тему',
};

const PORTFOLIO_CTA = {
  en: 'Open Site',
  it: 'Apri il sito',
  ru: 'Открыть сайт',
};

const NAV_LINKS = [
  { href: '#home', labels: { en: 'Home', it: 'Home', ru: 'Главная' } },
  { href: '#services', labels: { en: 'Services', it: 'Servizi', ru: 'Услуги' } },
  { href: '#portfolio', labels: { en: 'Portfolio', it: 'Portfolio', ru: 'Портфолио' } },
  { href: '#skills', labels: { en: 'Skills', it: 'Competenze', ru: 'Навыки' } },
  { href: '#contact', labels: { en: 'Contact', it: 'Contatti', ru: 'Контакты' } },
];

const HERO_COPY = {
  title: {
    en: 'Creating Modern Websites with Unique Design',
    it: 'Creo siti web moderni con un design unico',
    ru: 'Создаю современные сайты с уникальным дизайном',
  },
  description: {
    en: 'Transforming your ideas into digital reality. Specializing in creating responsive websites using modern technologies and design trends.',
    it: 'Trasformo le tue idee in realtà digitale. Mi specializzo nella creazione di siti web responsive utilizzando tecnologie moderne e tendenze di design.',
    ru: 'Преобразую ваши идеи в цифровую реальность. Специализируюсь на создании адаптивных сайтов с использованием современных технологий и трендов дизайна.',
  },
  primaryCta: { en: 'My Works', it: 'I miei lavori', ru: 'Мои работы' },
  secondaryCta: { en: 'Discuss Project', it: 'Discuti il progetto', ru: 'Обсудить проект' },
};

const SECTION_COPY = {
  services: {
    title: { en: 'My Services', it: 'I miei servizi', ru: 'Мои услуги' },
    subtitle: {
      en: 'Providing full development cycle - from idea to launch',
      it: 'Offro l\'intero ciclo di sviluppo: dall\'idea al lancio',
      ru: 'Предоставляю полный цикл разработки — от идеи до запуска',
    },
  },
  portfolio: {
    title: { en: 'My Works', it: 'I miei lavori', ru: 'Мои работы' },
    subtitle: {
      en: 'Examples of implemented projects using modern technologies',
      it: 'Esempi di progetti realizzati con tecnologie moderne',
      ru: 'Примеры реализованных проектов на современных технологиях',
    },
  },
  skills: {
    title: { en: 'My Skills', it: 'Le mie competenze', ru: 'Мои навыки' },
    subtitle: {
      en: 'Technologies and tools I use in my work',
      it: 'Tecnologie e strumenti che utilizzo nel mio lavoro',
      ru: 'Технологии и инструменты, которые я использую в работе',
    },
  },
  contact: {
    title: { en: 'Contact Me', it: 'Contattami', ru: 'Свяжитесь со мной' },
    subtitle: {
      en: 'Ready to discuss your project and offer a solution',
      it: 'Pronto a discutere il tuo progetto e a proporre una soluzione',
      ru: 'Готов обсудить ваш проект и предложить решение',
    },
  },
};

const SERVICES = [
  {
    icon: 'fas fa-laptop-code',
    title: { en: 'Web Development', it: 'Sviluppo web', ru: 'Веб-разработка' },
    description: {
      en: 'Creating modern and responsive websites using HTML5, CSS3, JavaScript and modern frameworks.',
      it: 'Creazione di siti web moderni e responsive utilizzando HTML5, CSS3, JavaScript e framework moderni.',
      ru: 'Создание современных адаптивных сайтов с использованием HTML5, CSS3, JavaScript и актуальных фреймворков.',
    },
  },
  {
    icon: 'fas fa-palette',
    title: { en: 'UI/UX Design', it: 'UI/UX Design', ru: 'UI/UX дизайн' },
    description: {
      en: 'Developing intuitive interfaces focused on user experience and visual appeal.',
      it: 'Sviluppo interfacce intuitive focalizzate sull\'esperienza utente e sull\'impatto visivo.',
      ru: 'Разработка интуитивных интерфейсов с акцентом на пользовательский опыт и визуальную выразительность.',
    },
  },
  {
    icon: 'fas fa-mobile-alt',
    title: { en: 'Responsive Design', it: 'Design responsive', ru: 'Адаптивный дизайн' },
    description: {
      en: 'Creating websites that display perfectly on all devices - from smartphones to desktops.',
      it: 'Creazione di siti che si adattano perfettamente a tutti i dispositivi, dagli smartphone ai desktop.',
      ru: 'Создание сайтов, которые идеально отображаются на всех устройствах — от смартфонов до десктопов.',
    },
  },
];

const PORTFOLIO = [
  {
    url: 'https://barber-shop-self-rho.vercel.app/',
    title: 'Barber Shop',
    description: {
      en: 'Live barbershop website with modern design, responsive layout, and fast launch.',
      it: 'Sito reale per un barbershop. Design moderno, layout responsive e lancio rapido.',
      ru: 'Живой сайт барбершопа с современным дизайном, адаптивным макетом и быстрым запуском.',
    },
  },
  {
    url: 'https://building-rouge.vercel.app/',
    title: 'Building Company',
    description: {
      en: 'Construction company website featuring professional design and responsive layout.',
      it: 'Sito per un\'azienda edile. Design professionale e layout responsive.',
      ru: 'Сайт строительной компании с профессиональным дизайном и адаптивной версткой.',
    },
  },
  {
    url: 'https://portfolio-hazel-rho-80.vercel.app/',
    title: 'Portfolio',
    description: {
      en: 'Portfolio with modern design, smooth animations, and a fully responsive interface.',
      it: 'Portfolio con design moderno, animazioni fluide e interfaccia completamente responsive.',
      ru: 'Портфолио с современным дизайном, плавными анимациями и полностью адаптивным интерфейсом.',
    },
  },
];

const SKILLS = [
  { label: { en: 'HTML5 & CSS3', it: 'HTML5 & CSS3', ru: 'HTML5 и CSS3' }, value: 95 },
  { label: { en: 'JavaScript', it: 'JavaScript', ru: 'JavaScript' }, value: 90 },
  { label: { en: 'React', it: 'React', ru: 'React' }, value: 85 },
  { label: { en: 'UI/UX Design', it: 'UI/UX Design', ru: 'UI/UX дизайн' }, value: 80 },
];

const FORM_COPY = {
  en: {
    nameLabel: 'Your Name',
    emailLabel: 'Email or Phone',
    messageLabel: 'Message',
    namePlaceholder: 'Enter your name',
    emailPlaceholder: 'Enter email or phone',
    messagePlaceholder: 'Describe your project',
    submit: 'Send Message',
    sending: 'Sending...',
  },
  it: {
    nameLabel: 'Il tuo nome',
    emailLabel: 'Email o telefono',
    messageLabel: 'Messaggio',
    namePlaceholder: 'Inserisci il tuo nome',
    emailPlaceholder: 'Inserisci email o telefono',
    messagePlaceholder: 'Descrivi il tuo progetto',
    submit: 'Invia messaggio',
    sending: 'Invio in corso...',
  },
  ru: {
    nameLabel: 'Ваше имя',
    emailLabel: 'Email или телефон',
    messageLabel: 'Сообщение',
    namePlaceholder: 'Введите ваше имя',
    emailPlaceholder: 'Введите email или телефон',
    messagePlaceholder: 'Опишите ваш проект',
    submit: 'Отправить сообщение',
    sending: 'Отправка...',
  },
};

const FORM_MESSAGES = {
  en: {
    required: 'Please fill in all fields!',
    invalidContact: 'Please enter a valid email or phone number!',
    success: 'Message sent successfully!',
    error: 'Error sending message. Please try again.',
  },
  it: {
    required: 'Compila tutti i campi, per favore!',
    invalidContact: 'Inserisci un contatto email o telefonico valido, per favore!',
    success: 'Messaggio inviato con successo!',
    error: 'Errore durante l\'invio del messaggio. Riprova.',
  },
  ru: {
    required: 'Пожалуйста, заполните все поля!',
    invalidContact: 'Введите корректный email или номер телефона!',
    success: 'Сообщение успешно отправлено!',
    error: 'Не удалось отправить сообщение. Попробуйте позже.',
  },
};

const MODAL_COPY = {
  en: {
    title: 'Thank you for your message!',
    message: 'We will contact you soon.',
    close: 'Close',
  },
  it: {
    title: 'Grazie per il tuo messaggio!',
    message: 'Ti contatteremo al più presto.',
    close: 'Chiudi',
  },
  ru: {
    title: 'Спасибо за сообщение!',
    message: 'Мы свяжемся с вами в ближайшее время.',
    close: 'Закрыть',
  },
};

const FOOTER_COPY = {
  en: {
    tagline: 'Creating digital solutions for your business',
    rights: 'All rights reserved.',
  },
  it: {
    tagline: 'Creo soluzioni digitali per il tuo business',
    rights: 'Tutti i diritti riservati.',
  },
  ru: {
    tagline: 'Создаю цифровые решения для вашего бизнеса',
    rights: 'Все права защищены.',
  },
};

const isBrowser = typeof window !== 'undefined';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\+]?\d[\d\s\-()]{3,}$/;
const isSupportedLanguage = (value) => SUPPORTED_LANGUAGES.includes(value);
const getNextLanguage = (current) => {
  const index = SUPPORTED_LANGUAGES.indexOf(current);
  if (index === -1) {
    return SUPPORTED_LANGUAGES[0];
  }
  return SUPPORTED_LANGUAGES[(index + 1) % SUPPORTED_LANGUAGES.length];
};

const SuccessModal = ({ isOpen, onClose, language }) => {
  const copy = MODAL_COPY[language];

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const listener = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal active" role="dialog" aria-modal="true" aria-labelledby="success-modal-title" onClick={onClose}>
      <div className="modal-content glass" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="close" aria-label="Close" onClick={onClose}>
          <span aria-hidden="true">&times;</span>
        </button>
        <h3 id="success-modal-title">
          <span className="fade-text fade-text--block" key={`modal-title-${language}`}>
            {copy.title}
          </span>
        </h3>
        <p>
          <span className="fade-text fade-text--block" key={`modal-message-${language}`}>
            {copy.message}
          </span>
        </p>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          <span className="fade-text fade-text--inline" key={`modal-close-${language}`}>
            {copy.close}
          </span>
        </button>
      </div>
    </div>
  );
};

function useLocalStorageState(key, defaultValue, options = {}) {
  const { validate } = options;

  const initial = useMemo(() => {
    if (!isBrowser) {
      return defaultValue;
    }
    try {
      const stored = localStorage.getItem(key);
      if (stored == null) {
        return defaultValue;
      }
      if (validate && !validate(stored)) {
        return defaultValue;
      }
      return stored;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  }, [key, defaultValue, validate]);

  const [value, setValue] = useState(initial);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }
    if (validate && !validate(value)) {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.warn('Failed to remove invalid localStorage value:', error);
      }
      return;
    }
    try {
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.warn('Failed to write to localStorage:', error);
    }
  }, [key, value, validate]);

  return [value, setValue];
}

function App() {
  const [language, setLanguage] = useLocalStorageState('preferredLang', 'en', {
    validate: isSupportedLanguage,
  });
  const [theme, setTheme] = useLocalStorageState('preferredTheme', 'light', {
    validate: (value) => value === 'light' || value === 'dark',
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState('');
  const [formMessageType, setFormMessageType] = useState('success');
  const [skillsVisible, setSkillsVisible] = useState(false);

  const headerRef = useRef(null);
  const skillsRef = useRef(null);
  const messageTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isSupportedLanguage(language)) {
      setLanguage('en');
    }
  }, [language, setLanguage]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.documentElement.lang = language;
    document.body.setAttribute('lang', language);
    document.body.dataset.lang = language;
  }, [language]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  useEffect(() => {
    const targets = document.querySelectorAll('.animate-fadeIn');
    if (!targets.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = skillsRef.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) {
      return undefined;
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        headerElement.style.background = 'var(--glass)';
        headerElement.style.backdropFilter = 'blur(15px)';
      } else {
        headerElement.style.background = 'transparent';
        headerElement.style.backdropFilter = 'blur(0px)';
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => () => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => getNextLanguage(prev));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleSmoothScroll = (event, hash) => {
    if (!hash.startsWith('#')) {
      return;
    }

    event.preventDefault();
    const target = document.querySelector(hash);
    if (!target) {
      return;
    }
    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  };

  const showFormMessage = (text, type) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    setFormMessage(text);
    setFormMessageType(type);

    if (type === 'success') {
      messageTimeoutRef.current = window.setTimeout(() => {
        setFormMessage('');
      }, 5000);
    }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const submitButton = event.submitter;

    const formData = new FormData(formElement);
    const payload = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      message: formData.get('message')?.toString().trim(),
      language,
    };

    if (!payload.name || !payload.email || !payload.message) {
      showFormMessage(FORM_MESSAGES[language].required, 'error');
      return;
    }

    const normalizedContact = payload.email.replace(/\s/g, '');
    if (!emailRegex.test(normalizedContact) && !phoneRegex.test(normalizedContact)) {
      showFormMessage(FORM_MESSAGES[language].invalidContact, 'error');
      return;
    }

    try {
      setSubmitting(true);
      showFormMessage('', 'success');
      if (submitButton) {
        submitButton.dataset.originalText = submitButton.innerHTML;
        submitButton.innerHTML = `<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> ${FORM_COPY[language].sending}`;
        submitButton.disabled = true;
      }

      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message');
      }

      formElement.reset();
      showFormMessage(FORM_MESSAGES[language].success, 'success');
      setModalOpen(true);
    } catch (error) {
      console.error('Error sending message:', error);
      showFormMessage(FORM_MESSAGES[language].error, 'error');
    } finally {
      setSubmitting(false);
      if (submitButton) {
        submitButton.innerHTML = submitButton.dataset.originalText || FORM_COPY[language].submit;
        submitButton.disabled = false;
      }
    }
  };

  const nextLanguage = getNextLanguage(language);
  const headerThemeLabel = THEME_BUTTON_LABELS[language] ?? THEME_BUTTON_LABELS.en;
  const headerLanguageLabel = LANGUAGE_BUTTON_LABELS[language] ?? LANGUAGE_BUTTON_LABELS.en;
  const nextLanguageIndicator = LANGUAGE_INDICATORS[nextLanguage] ?? 'EN';

  return (
    <>
      <header className="glass-dark" ref={headerRef}>
        <div className="container">
          <nav className="navbar" itemScope itemType="https://schema.org/SiteNavigationElement">
            <StudioLogo style={{ whiteSpace: 'nowrap', minWidth: 'auto' }} />
            <div className="nav-links">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  itemProp="url"
                  onClick={(event) => handleSmoothScroll(event, link.href)}
                >
                  <span className="fade-text fade-text--inline" key={`${link.href}-${language}`}>
                    {link.labels[language]}
                  </span>
                </a>
              ))}
            </div>
            <div className="header-controls">
              <button
                className="theme-btn"
                type="button"
                title={headerThemeLabel}
                aria-label={headerThemeLabel}
                onClick={toggleTheme}
              >
                {theme === 'light' ? <IconMoon /> : <IconSun />}
              </button>
              <button
                className="lang-btn"
                type="button"
                title={headerLanguageLabel}
                aria-label={headerLanguageLabel}
                onClick={toggleLanguage}
              >
                <IconGlobe />
                <span className="lang-btn__text fade-text fade-text--inline" key={`lang-indicator-${nextLanguage}`}>
                  {nextLanguageIndicator}
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content animate-fadeIn">
              <h1 itemProp="headline">
                <span className="fade-text fade-text--block" key={`hero-title-${language}`}>
                  {HERO_COPY.title[language]}
                </span>
              </h1>
              <p itemProp="description">
                <span className="fade-text fade-text--block" key={`hero-desc-${language}`}>
                  {HERO_COPY.description[language]}
                </span>
              </p>
              <div className="hero-btns">
                <a
                  href="#portfolio"
                  className="btn btn-primary"
                  onClick={(event) => handleSmoothScroll(event, '#portfolio')}
                >
                  <span className="fade-text fade-text--inline" key={`hero-primary-${language}`}>
                    {HERO_COPY.primaryCta[language]}
                  </span>
                </a>
                <a
                  href="#contact"
                  className="btn btn-outline"
                  onClick={(event) => handleSmoothScroll(event, '#contact')}
                >
                  <span className="fade-text fade-text--inline" key={`hero-secondary-${language}`}>
                    {HERO_COPY.secondaryCta[language]}
                  </span>
                </a>
              </div>
            </div>
            <div className="hero-image" aria-hidden="true" />
          </div>
        </section>

        <section id="services" className="services">
          <div className="container">
            <h2 className="section-title animate-fadeIn">
              <span className="fade-text fade-text--block" key={`services-title-${language}`}>
                {SECTION_COPY.services.title[language]}
              </span>
            </h2>
            <p className="section-subtitle animate-fadeIn">
              <span className="fade-text fade-text--block" key={`services-subtitle-${language}`}>
                {SECTION_COPY.services.subtitle[language]}
              </span>
            </p>

            <div className="grid grid-auto">
              {SERVICES.map((service) => (
                <div className="service-card glass animate-fadeIn" key={service.title.en} itemScope itemType="https://schema.org/Service">
                  <div className="service-icon">
                    <i className={service.icon} aria-hidden="true" />
                  </div>
                  <h3 className="service-title" itemProp="name">
                    <span className="fade-text fade-text--block" key={`${service.title.en}-title-${language}`}>
                      {service.title[language]}
                    </span>
                  </h3>
                  <p className="service-desc" itemProp="description">
                    <span className="fade-text fade-text--block" key={`${service.title.en}-desc-${language}`}>
                      {service.description[language]}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio">
          <div className="container">
            <h2 className="section-title animate-fadeIn">
              <span className="fade-text fade-text--block" key={`portfolio-title-${language}`}>
                {SECTION_COPY.portfolio.title[language]}
              </span>
            </h2>
            <p className="section-subtitle animate-fadeIn">
              <span className="fade-text fade-text--block" key={`portfolio-subtitle-${language}`}>
                {SECTION_COPY.portfolio.subtitle[language]}
              </span>
            </p>

            <div className="portfolio-grid">
              {PORTFOLIO.map((item) => (
                <div className="portfolio-item" key={item.url} itemScope itemType="https://schema.org/CreativeWork">
                  <div className="portfolio-iframe-wrapper">
                    <iframe
                      className="portfolio-preview"
                      scrolling="no"
                      src={item.url}
                      title={item.title}
                      loading="lazy"
                      frameBorder="0"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ overflow: 'hidden' }}
                      onLoad={(event) => {
                        event.currentTarget.classList.add('is-visible');
                      }}
                    />
                  </div>
                  <div className="portfolio-overlay">
                    <h3 itemProp="name">{item.title}</h3>
                    <p itemProp="description">
                      <span className="fade-text fade-text--block" key={`${item.title}-desc-${language}`}>
                        {item.description[language]}
                      </span>
                    </p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-open-site">
                      <span className="fade-text fade-text--inline" key={`${item.title}-cta-${language}`}>
                        {PORTFOLIO_CTA[language]}
                      </span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="skills" ref={skillsRef}>
          <div className="container">
            <h2 className="section-title animate-fadeIn">
              <span className="fade-text fade-text--block" key={`skills-title-${language}`}>
                {SECTION_COPY.skills.title[language]}
              </span>
            </h2>
            <p className="section-subtitle animate-fadeIn">
              <span className="fade-text fade-text--block" key={`skills-subtitle-${language}`}>
                {SECTION_COPY.skills.subtitle[language]}
              </span>
            </p>

            <div className={`skills-container ${skillsVisible ? 'skills-section-visible' : ''}`}>
              {SKILLS.map((skill) => (
                <div className="skill-item animate-fadeIn" key={skill.label.en}>
                  <div className="skill-header">
                    <span className="fade-text fade-text--inline" key={`${skill.label.en}-label-${language}`}>
                      {skill.label[language]}
                    </span>
                    <span>{skill.value}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-progress"
                      data-width={`${skill.value}%`}
                      style={{
                        width: skillsVisible ? `${skill.value}%` : '0%',
                        opacity: skillsVisible ? 1 : 0,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title animate-fadeIn">
              <span className="fade-text fade-text--block" key={`contact-title-${language}`}>
                {SECTION_COPY.contact.title[language]}
              </span>
            </h2>
            <p className="section-subtitle animate-fadeIn">
              <span className="fade-text fade-text--block" key={`contact-subtitle-${language}`}>
                {SECTION_COPY.contact.subtitle[language]}
              </span>
            </p>

            <div className="contact-container">
              <form
                className="contact-form animate-fadeIn"
                onSubmit={handleContactSubmit}
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <div className="form-group">
                  <label htmlFor="name">
                    <span className="fade-text fade-text--block" key={`label-name-${language}`}>
                      {FORM_COPY[language].nameLabel}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder={FORM_COPY[language].namePlaceholder}
                    required
                    itemProp="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <span className="fade-text fade-text--block" key={`label-email-${language}`}>
                      {FORM_COPY[language].emailLabel}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder={FORM_COPY[language].emailPlaceholder}
                    required
                    itemProp="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <span className="fade-text fade-text--block" key={`label-message-${language}`}>
                      {FORM_COPY[language].messageLabel}
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    placeholder={FORM_COPY[language].messagePlaceholder}
                    required
                    itemProp="description"
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  <span className="fade-text fade-text--inline" key={`button-submit-${language}`}>
                    {FORM_COPY[language].submit}
                  </span>
                </button>
                <div className={`form-message${formMessage ? ` ${formMessageType}` : ''}`} role="status" aria-live="polite">
                  {formMessage}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="glass-dark">
        <div className="container">
          <StudioLogo style={{ whiteSpace: 'nowrap', minWidth: 'auto' }} />
          <p>
            <span className="fade-text fade-text--block" key={`footer-tagline-${language}`}>
              {FOOTER_COPY[language].tagline}
            </span>
          </p>
          <p>
            &copy; 2025 Studio NN.&nbsp;
            <span className="fade-text fade-text--inline" key={`footer-rights-${language}`}>
              {FOOTER_COPY[language].rights}
            </span>
          </p>
        </div>
      </footer>

      <SuccessModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} language={language} />
    </>
  );
}

export default App;

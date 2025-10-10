// Language and Theme Management
class AppController {
    constructor() {
        this.currentLang = 'ru';
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.loadPreferences();
        this.setupEventListeners();
        this.animateSkills();
        this.setupForm();
        this.setupModal();
    }

    loadPreferences() {
        // Load language preference
        const savedLang = localStorage.getItem('preferredLang');
        if (savedLang) {
            this.currentLang = savedLang;
        }

        // Load theme preference
        const savedTheme = localStorage.getItem('preferredTheme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        }

        this.applyLanguage();
        this.applyTheme();
    }

    setupEventListeners() {
        // Language toggle
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    // Плавный скролл с учетом фиксированного header
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Scroll animations
        this.setupScrollAnimations();
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('preferredLang', this.currentLang);
        this.applyLanguage();
    }

    applyLanguage() {
        document.body.setAttribute('lang', this.currentLang);
        
        // Обновляем все элементы с классами lang-ru и lang-en
        document.querySelectorAll('.lang-ru, .lang-en').forEach(element => {
            if (element.classList.contains('lang-ru') && this.currentLang === 'ru') {
                element.style.display = element.tagName === 'SPAN' ? 'inline' : 'block';
            } else if (element.classList.contains('lang-en') && this.currentLang === 'en') {
                element.style.display = element.tagName === 'SPAN' ? 'inline' : 'block';
            } else {
                element.style.display = 'none';
            }
        });

        // Update language button icon
        const langIcon = document.querySelector('#langToggle i');
        if (langIcon) {
            langIcon.className = this.currentLang === 'ru' ? 'fas fa-globe-americas' : 'fas fa-globe';
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('preferredTheme', this.currentTheme);
        this.applyTheme();
    }

    applyTheme() {
        document.body.className = `theme-${this.currentTheme}`;
        
        // Update theme button icon
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    animateSkills() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс для активации CSS анимации
                entry.target.classList.add('skills-section-visible');
                
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                        bar.style.opacity = '1';
                    }, index * 300);
                });
                
                // Отключаем наблюдение после активации
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}


    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-fadeIn').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    setupForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm);
            });
        }
    }

    setupModal() {
        const modal = document.getElementById('successModal');
        const closeModal = document.getElementById('closeModal');
        const modalCloseBtn = document.getElementById('modalCloseBtn');

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    async handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const formMessage = document.getElementById('formMessage');

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            language: this.currentLang
        };

        // Validate form data
        if (!data.name || !data.email || !data.message) {
            this.showMessage(formMessage, this.currentLang === 'ru' 
                ? 'Пожалуйста, заполните все поля!' 
                : 'Please fill in all fields!', 'error');
            return;
        }

        // Validate email/phone
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
        
        if (!emailRegex.test(data.email) && !phoneRegex.test(data.email.replace(/\s/g, ''))) {
            this.showMessage(formMessage, this.currentLang === 'ru' 
                ? 'Пожалуйста, введите корректный email или телефон!' 
                : 'Please enter a valid email or phone number!', 'error');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = this.currentLang === 'ru' 
            ? '<i class="fas fa-spinner fa-spin"></i> Отправка...' 
            : '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Send message to Telegram API
            const response = await fetch('/api/telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Show success modal
                const modal = document.getElementById('successModal');
                if (modal) {
                    modal.classList.add('active');
                }

                // Reset form
                form.reset();
                
                // Show success message
                this.showMessage(formMessage, this.currentLang === 'ru' 
                    ? 'Сообщение успешно отправлено!' 
                    : 'Message sent successfully!', 'success');
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            this.showMessage(formMessage, this.currentLang === 'ru' 
                ? 'Ошибка отправки сообщения. Попробуйте еще раз.' 
                : 'Error sending message. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    showMessage(formMessage, text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Auto-hide success messages
            if (type === 'success') {
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AppController();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation to iframes
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.3s ease';
    });

    // Enhanced navbar background on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'var(--glass)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'blur(0px)';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
});
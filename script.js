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
        this.setupScrollAnimations();
        this.setupForm();
        this.setupModal();
        this.setupMobileMenu();
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
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });

        // Hero buttons
        document.querySelectorAll('.hero-buttons .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.target.classList.contains('primary')) {
                    document.getElementById('contact').scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    document.getElementById('services').scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'ru' ? 'en' : 'ru';
        localStorage.setItem('preferredLang', this.currentLang);
        this.applyLanguage();
    }

    applyLanguage() {
        document.body.setAttribute('lang', this.currentLang);
        
        // Update all language-specific elements
        document.querySelectorAll('[data-lang]').forEach(element => {
            if (element.getAttribute('data-lang') === this.currentLang) {
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
        document.body.setAttribute('data-theme', this.currentTheme);
        
        // Update theme button icon
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
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

        // Enhanced navbar background on scroll
        let lastScrollTop = 0;
        const navbar = document.querySelector('header');
        
        window.addEventListener('scroll', () => {
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
    }

    setupForm() {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(contactForm);
            });

            // Add floating labels functionality
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                if (input) {
                    input.addEventListener('input', () => {
                        if (input.value) {
                            input.setAttribute('data-filled', 'true');
                        } else {
                            input.removeAttribute('data-filled');
                        }
                    });
                }
            });
        }
    }

    setupModal() {
        const modal = document.getElementById('successModal');
        const closeModal = document.getElementById('closeModal');

        if (closeModal) {
            closeModal.addEventListener('click', () => {
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

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showMessage(formMessage, this.currentLang === 'ru' 
                ? 'Пожалуйста, введите корректный email!' 
                : 'Please enter a valid email address!', 'error');
            return;
        }

        // Show loading state
        submitBtn.innerHTML = this.currentLang === 'ru' 
            ? '<i class="fas fa-spinner fa-spin"></i> Отправка...' 
            : '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Send message to Telegram
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
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.removeAttribute('data-filled');
                });
                
                // Show success message
                this.showMessage(formMessage, this.currentLang === 'ru' 
                    ? 'Сообщение успешно отправлено!' 
                    : 'Message sent successfully!', 'success');
            } else {
                throw new Error(result.error || 'Failed to send message');
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

// Add interactive effects
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

    // Add hover effects to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
// ============================================
// WRAPPRO - MAIN JAVASCRIPT
// ============================================

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxClose = document.getElementById('lightboxClose');
const viewButtons = document.querySelectorAll('.view-btn');

if (lightbox && lightboxClose) {
    // Open lightbox
    const lightboxImg = document.getElementById('lightboxImg');

    viewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const portfolioItem = button.closest('.portfolio-item');
            const title = portfolioItem.querySelector('h3')?.textContent || 'Project';
            const description = portfolioItem.querySelector('p')?.textContent || 'Description';
            const sourceImg = portfolioItem.querySelector('.portfolio-image img');
            
            document.getElementById('lightboxTitle').textContent = title;
            document.getElementById('lightboxDescription').textContent = description;

            if (lightboxImg && sourceImg) {
                lightboxImg.src = sourceImg.src;
                lightboxImg.alt = sourceImg.alt || title;
                lightboxImg.style.display = 'block';
            }
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Before & After Slider
const baSlider = document.getElementById('baSlider1');
if (baSlider) {
    baSlider.addEventListener('input', (e) => {
        const value = e.target.value;
        const beforeImage = document.querySelector('.ba-before');
        if (beforeImage) {
            beforeImage.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        }
    });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form Submission Handlers
const quoteForm = document.getElementById('quoteForm');
const contactForm = document.getElementById('contactForm');

if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(quoteForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show an alert
        alert('Thank you for your quote request! We will contact you within 24 hours.');
        
        // Reset form
        quoteForm.reset();
        
        // In a real application, you would send this data to your backend:
        // fetch('/api/quote', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Thank you for your quote request!');
        //     quoteForm.reset();
        // })
        // .catch(error => {
        //     alert('There was an error submitting your request. Please try again.');
        // });
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to your backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Thank you for your message!');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     alert('There was an error sending your message. Please try again.');
        // });
    });
}

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate on Scroll (Simple Implementation)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .portfolio-item, .process-step, .mission-card, .team-member');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Number Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-number, .badge-number');

const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isPlus = target.includes('+');
    const isYear = target.includes('-Year');
    
    let numericValue = parseInt(target.replace(/\D/g, ''));
    if (!numericValue) return;
    
    const duration = 2000;
    const increment = numericValue / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < numericValue) {
            let displayValue = Math.floor(current);
            if (isPercentage) {
                element.textContent = displayValue + '%';
            } else if (isPlus) {
                element.textContent = displayValue + '+';
            } else if (isYear) {
                element.textContent = displayValue + '-Year';
            } else {
                element.textContent = displayValue.toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Optional data-src lazy loading (only when data-src is set — never clear existing src)
document.querySelectorAll('img[data-src]').forEach(img => {
    if (!img.getAttribute('src') && img.dataset.src) {
        img.src = img.dataset.src;
    }
});

// Console Message
console.log('%cWrapPro Car Wrapping', 'color: #e63946; font-size: 20px; font-weight: bold;');
console.log('%cPremium Vehicle Wrapping Services', 'color: #b0b0b0; font-size: 14px;');

// ============================================
// QUOTE BUILDER (pricing page) — PayPal booking in pricing-booking.js
// ============================================

let bookingData = {
    serviceType: null,
    vehicleType: null,
    partialAreas: [],
    vinylFinish: null,
    color: null,
    ppfOptions: [],
    subtotal: 0
};

// Service Selection
const serviceOptionBtns = document.querySelectorAll('.service-option-btn');
serviceOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const service = btn.getAttribute('data-service');
        bookingData.serviceType = service;
        
        // Update active state
        serviceOptionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show appropriate options
        setTimeout(() => {
            goToStep(2);
        }, 300);
    });
});

// Step Navigation
function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });
    
    // Show target step
    const targetStep = document.getElementById(`step${step}`);
    if (targetStep) {
        targetStep.style.display = 'block';
        targetStep.classList.add('active');
        
        // Update step 2 based on service type
        if (step === 2) {
            updateStep2();
        }
        
        // Update step 3 visibility - skip for PPF only
        if (step === 3 && bookingData.serviceType === 'ppf') {
            // Skip color selection for PPF only
            const ppfBackBtn = document.getElementById('ppf-back-btn');
            const ppfTitle = document.getElementById('ppf-title');
            if (ppfBackBtn) ppfBackBtn.onclick = () => goToStep(1);
            if (ppfTitle) ppfTitle.textContent = 'Select PPF Options';
            goToStep(4);
            return;
        }
        
        // Update PPF step back button based on service type
        if (step === 4) {
            const ppfBackBtn = document.getElementById('ppf-back-btn');
            if (ppfBackBtn) {
                if (bookingData.serviceType === 'ppf') {
                    ppfBackBtn.onclick = () => goToStep(1);
                } else {
                    ppfBackBtn.onclick = () => goToStep(3);
                }
            }
        }
        
        // Update summary when reaching step 5
        if (step === 5) {
            updateSummary();
        }
    }
}

function updateStep2() {
    const partialOptions = document.getElementById('partial-wrap-options');
    const fullWrapOptions = document.getElementById('full-wrap-options');
    const step2Title = document.getElementById('step2-title');
    const continueBtn = document.getElementById('continue-to-color');

    if (!partialOptions || !fullWrapOptions || !step2Title || !continueBtn) return;
    
    // Hide all options
    partialOptions.style.display = 'none';
    fullWrapOptions.style.display = 'none';
    continueBtn.style.display = 'none';
    
    if (bookingData.serviceType === 'partial-wrap') {
        partialOptions.style.display = 'block';
        step2Title.textContent = 'Select Partial Wrap Areas';
        
        // Setup partial wrap checkboxes
        const checkboxes = partialOptions.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                updatePartialAreas();
                checkContinueButton();
            });
        });
    } else if (bookingData.serviceType === 'full-wrap') {
        fullWrapOptions.style.display = 'block';
        step2Title.textContent = 'Select Vehicle Type';
        
        // Setup vehicle type radios
        const radios = fullWrapOptions.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                bookingData.vehicleType = radio.value;
                bookingData.subtotal = parseFloat(radio.getAttribute('data-price'));
                continueBtn.style.display = 'block';
            });
        });
    } else if (bookingData.serviceType === 'ppf') {
        // Skip to PPF options
        const ppfBackBtn = document.getElementById('ppf-back-btn');
        const ppfTitle = document.getElementById('ppf-title');
        if (ppfBackBtn) ppfBackBtn.onclick = () => goToStep(1);
        if (ppfTitle) ppfTitle.textContent = 'Select PPF Options';
        goToStep(4);
        return;
    }
}

function updatePartialAreas() {
    bookingData.partialAreas = [];
    const checked = document.querySelectorAll('#partial-wrap-options input[type="checkbox"]:checked');
    checked.forEach(cb => {
        bookingData.partialAreas.push({
            name: cb.value,
            price: parseFloat(cb.getAttribute('data-price'))
        });
    });
    
    // Calculate subtotal
    bookingData.subtotal = bookingData.partialAreas.reduce((sum, area) => sum + area.price, 0);
}

function checkContinueButton() {
    const continueBtn = document.getElementById('continue-to-color');
    if (bookingData.serviceType === 'partial-wrap') {
        continueBtn.style.display = bookingData.partialAreas.length > 0 ? 'block' : 'none';
    }
}

// Vinyl Finish Selection
const finishRadios = document.querySelectorAll('input[name="vinyl-finish"]');
finishRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        bookingData.vinylFinish = radio.value;
        updatePricing();
    });
});

// Color Selection
const colorRadios = document.querySelectorAll('input[name="color"]');
colorRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        bookingData.color = radio.value;
    });
});

// PPF Options
const ppfCheckboxes = document.querySelectorAll('input[name="ppf-options"]');
ppfCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        updatePPFOptions();
    });
});

function updatePPFOptions() {
    bookingData.ppfOptions = [];
    const checked = document.querySelectorAll('input[name="ppf-options"]:checked');
    checked.forEach(cb => {
        bookingData.ppfOptions.push({
            name: cb.value,
            price: parseFloat(cb.getAttribute('data-price'))
        });
    });
}

function updatePricing() {
    if (bookingData.serviceType === 'full-wrap' && bookingData.vehicleType) {
        const basePrice = parseFloat(document.querySelector(`input[name="vehicle-type"]:checked`).getAttribute('data-price'));
        const finishMultiplier = bookingData.vinylFinish ? 
            parseFloat(document.querySelector(`input[name="vinyl-finish"]:checked`).getAttribute('data-multiplier')) : 1.0;
        bookingData.subtotal = basePrice * finishMultiplier;
    }
}

function updateSummary() {
    const summaryContent = document.getElementById('summary-content');
    const subtotalEl = document.getElementById('subtotal');
    const depositEl = document.getElementById('deposit');
    const balanceEl = document.getElementById('balance');
    const depositNote = document.getElementById('deposit-note');

    if (!summaryContent || !subtotalEl || !depositEl || !balanceEl || !depositNote) return;
    
    // Build summary HTML
    let summaryHTML = '<div class="summary-items">';
    
    // Service type
    if (bookingData.serviceType === 'full-wrap') {
        summaryHTML += `<div class="summary-item"><strong>Full Wrap</strong> - ${bookingData.vehicleType ? bookingData.vehicleType.charAt(0).toUpperCase() + bookingData.vehicleType.slice(1) : ''}</div>`;
        if (bookingData.vinylFinish) {
            summaryHTML += `<div class="summary-item">Finish: ${bookingData.vinylFinish.charAt(0).toUpperCase() + bookingData.vinylFinish.slice(1)}</div>`;
        }
        if (bookingData.color) {
            summaryHTML += `<div class="summary-item">Color: ${bookingData.color.charAt(0).toUpperCase() + bookingData.color.slice(1)}</div>`;
        }
    } else if (bookingData.serviceType === 'partial-wrap') {
        summaryHTML += `<div class="summary-item"><strong>Partial Wrap</strong></div>`;
        bookingData.partialAreas.forEach(area => {
            summaryHTML += `<div class="summary-item">- ${area.name.charAt(0).toUpperCase() + area.name.slice(1).replace('-', ' ')}</div>`;
        });
        if (bookingData.vinylFinish) {
            summaryHTML += `<div class="summary-item">Finish: ${bookingData.vinylFinish.charAt(0).toUpperCase() + bookingData.vinylFinish.slice(1)}</div>`;
        }
        if (bookingData.color) {
            summaryHTML += `<div class="summary-item">Color: ${bookingData.color.charAt(0).toUpperCase() + bookingData.color.slice(1)}</div>`;
        }
    } else if (bookingData.serviceType === 'ppf') {
        summaryHTML += `<div class="summary-item"><strong>Paint Protection Film (PPF)</strong></div>`;
    }
    
    // PPF Options
    if (bookingData.ppfOptions.length > 0) {
        if (bookingData.serviceType !== 'ppf') {
            summaryHTML += `<div class="summary-item"><strong>PPF Options:</strong></div>`;
        }
        bookingData.ppfOptions.forEach(option => {
            summaryHTML += `<div class="summary-item">- ${option.name.charAt(0).toUpperCase() + option.name.slice(1).replace('-', ' ')}</div>`;
        });
    }
    
    summaryHTML += '</div>';
    summaryContent.innerHTML = summaryHTML;
    
    // Calculate totals
    let total = bookingData.subtotal || 0;
    
    // Add PPF prices
    if (bookingData.ppfOptions.length > 0) {
        const ppfTotal = bookingData.ppfOptions.reduce((sum, opt) => sum + opt.price, 0);
        total += ppfTotal;
    }
    
    // Calculate deposit (25% for partial/PPF, 50% for full)
    const depositPercentage = bookingData.serviceType === 'full-wrap' ? 0.5 : 0.25;
    const deposit = total * depositPercentage;
    const balance = total - deposit;
    
    // Update display
    subtotalEl.textContent = `R ${total.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    depositEl.textContent = `R ${deposit.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    balanceEl.textContent = `R ${balance.toLocaleString('en-ZA', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    depositNote.textContent = bookingData.serviceType === 'full-wrap' ? '50% Full' : bookingData.serviceType === 'ppf' ? '25% PPF' : '25% Partial';
}

function processPayment() {
    const bookSection = document.getElementById('book-appointment');
    if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


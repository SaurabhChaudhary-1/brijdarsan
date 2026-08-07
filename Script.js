// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.getElementById('header')?.offsetHeight || 80;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Navbar scroll shadow effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (!header) return;
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    }
});

// Mobile hamburger menu toggle
(function () {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('active');
        const spans = toggle.querySelectorAll('span');
        if (open) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });

    // Close mobile menu when a link is clicked
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
})();

// Sticky bottom bar - show after scrolling past hero
(function () {
    const stickyBar = document.getElementById('stickyBar');
    if (!stickyBar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            stickyBar.classList.add('visible');
        } else {
            stickyBar.classList.remove('visible');
        }
    }, { passive: true });
})();

// Booking form -> WhatsApp
(function () {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    // Default travel date to today, minimum today
    const dateInput = document.getElementById('bDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        dateInput.value = today;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('bName')?.value.trim() || 'N/A';
        const phone = document.getElementById('bPhone')?.value.trim() || 'N/A';
        const pickup = document.getElementById('bPickup')?.value || 'N/A';
        const drop = document.getElementById('bDrop')?.value || 'N/A';
        const date = document.getElementById('bDate')?.value || 'N/A';
        const time = document.getElementById('bTime')?.value || 'N/A';
        const vehicle = document.getElementById('bVehicle')?.value || 'Any';
        const passengers = document.getElementById('bPassengers')?.value || 'N/A';
        const notes = document.getElementById('bNotes')?.value.trim() || 'None';

        const message = [
            '🚖 *New Booking Request – Brijdarsan Tourist*',
            '',
            `👤 *Name:* ${name}`,
            `📞 *Phone:* ${phone}`,
            `📍 *Pickup:* ${pickup}`,
            `📍 *Drop:* ${drop}`,
            `📅 *Date:* ${date}`,
            `🕐 *Time:* ${time}`,
            `🚗 *Vehicle:* ${vehicle}`,
            `👥 *Passengers:* ${passengers}`,
            `📝 *Notes:* ${notes}`,
            '',
            'Please confirm my booking. Thank you! 🙏'
        ].join('\n');

        const whatsappURL = `https://wa.me/918700489107?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank', 'noopener,noreferrer');

        // Reset the button state briefly to prevent double submits
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            setTimeout(() => { submitBtn.disabled = false; }, 3000);
        }
    });
})();

// Fade-in animation on scroll
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
// Observe all cards
document.querySelectorAll('.service-card, .temple-card, .review-card, .price-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

console.log('✅ Brijdarsan Tourist Premium Website Loaded!');

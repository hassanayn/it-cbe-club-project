document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    });

    // Close menu when a nav link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Keyboard accessibility for hamburger menu
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
        }
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const contactFormMessage = document.getElementById('contact-form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            contactFormMessage.textContent = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    contactFormMessage.textContent = 'Message sent successfully!';
                    contactFormMessage.style.color = '#2563eb';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message.');
                }
            } catch (error) {
                contactFormMessage.textContent = 'Error sending message. Please try again.';
                contactFormMessage.style.color = '#dc2626';
            }
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterFormMessage = document.getElementById('newsletter-form-message');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            newsletterFormMessage.textContent = 'Subscribing...';

            try {
                const response = await fetch(newsletterForm.action, {
                    method: 'POST',
                    body: new FormData(newsletterForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    newsletterFormMessage.textContent = 'Subscribed successfully!';
                    newsletterFormMessage.style.color = '#2563eb';
                    newsletterForm.reset();
                } else {
                    throw new Error('Failed to subscribe.');
                }
            } catch (error) {
                newsletterFormMessage.textContent = 'Error subscribing. Please try again.';
                newsletterFormMessage.style.color = '#dc2626';
            }
        });
    }

    // Event Countdown Timer
    const eventCards = document.querySelectorAll('.event-card');
    if (eventCards.length > 0) {
        const firstEventDate = new Date('2025-05-15T15:00:00'); // Web Development Workshop
        const countdownContainer = document.createElement('div');
        countdownContainer.className = 'event-countdown';
        countdownContainer.style.marginTop = '1rem';
        countdownContainer.style.color = '#2563eb';
        countdownContainer.style.fontWeight = '600';

        eventCards[0].appendChild(countdownContainer);

        const updateCountdown = () => {
            const now = new Date();
            const timeDiff = firstEventDate - now;

            if (timeDiff <= 0) {
                countdownContainer.textContent = 'Event has started!';
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            countdownContainer.textContent = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});
// ==========================================================================
// Scroll reveal
// ==========================================================================
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealEls.forEach((el) => revealObserver.observe(el));

// ==========================================================================
// Scrollspy + timeline playhead
// ==========================================================================
const scrubberLinks = document.querySelectorAll('.scrubber-link');
const playhead = document.querySelector('.scrubber-playhead');
const sections = document.querySelectorAll('main .section, .section');

function movePlayheadTo(link) {
    if (!link || !playhead) return;
    const trackRect = link.parentElement.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    playhead.style.left = `${linkRect.left - trackRect.left}px`;
    playhead.style.width = `${linkRect.width}px`;
}

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            scrubberLinks.forEach((link) => {
                const isActive = link.dataset.section === id;
                link.classList.toggle('active', isActive);
                if (isActive) movePlayheadTo(link);
            });
        }
    });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach((sec) => {
    if (sec.id) sectionObserver.observe(sec);
});

// set initial playhead position once layout is ready
window.addEventListener('load', () => {
    const active = document.querySelector('.scrubber-link.active') || scrubberLinks[0];
    movePlayheadTo(active);
});
window.addEventListener('resize', () => {
    const active = document.querySelector('.scrubber-link.active') || scrubberLinks[0];
    movePlayheadTo(active);
});

// ==========================================================================
// Contact form (no backend attached — friendly confirmation only)
// ==========================================================================
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('[name="email"]').value;
        const message = form.querySelector('[name="message"]').value;
        const name = form.querySelector('[name="name"]').value;

        const subject = encodeURIComponent(`ติดต่อจากพอร์ตโฟลิโอ — ${name}`);
        const body = encodeURIComponent(`${message}\n\nจาก: ${name} (${email})`);
        window.location.href = `mailto:xnantchaysaecu@gmai.com?subject=${subject}&body=${body}`;

        note.textContent = 'กำลังเปิดโปรแกรมอีเมลของคุณ...';
    });
}
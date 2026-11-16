const menuToggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('site-menu');
if (menuToggle && menu) {
    menuToggle.hidden = false;
    document.documentElement.classList.add('js');
    const closeMenu = () => menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.addEventListener('click', () => menuToggle.setAttribute('aria-expanded', String(menuToggle.getAttribute('aria-expanded') !== 'true')));
    menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') { closeMenu(); menuToggle.focus(); }
    });
    document.addEventListener('click', event => { if (!event.target.closest('.navbar')) closeMenu(); });
    matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
}
// Native dialog provides keyboard focus containment and Escape-to-close.
// Images remain normal links without JavaScript.
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-img');
const caption = document.getElementById('lightbox-caption');
if (lightbox && lightboxImage && caption && typeof lightbox.showModal === 'function') {
    let opener;
    document.querySelectorAll('.gallery-link').forEach(link => {
        link.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); opener = link;
            lightboxImage.src = link.href;
            lightboxImage.alt = link.querySelector('img').alt;
            caption.textContent = lightboxImage.alt;
            lightbox.showModal(); document.body.classList.add('dialog-open');
        });
    });
    lightbox.querySelector('.close').addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', event => {
        if (event.target === lightbox) {
            const rect = lightbox.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) lightbox.close();
        }
    });
    lightbox.addEventListener('close', () => {
        document.body.classList.remove('dialog-open'); lightboxImage.removeAttribute('src'); opener?.focus({ preventScroll: true });
    });
}

// Return visitors to the confirmation page on the host they submitted from.
// Without JavaScript, FormSubmit uses its own confirmation page.
const enquiryForm = document.querySelector('.contact-form');
if (enquiryForm) {
    const nextPage = document.createElement('input');
    nextPage.type = 'hidden';
    nextPage.name = '_next';
    nextPage.value = new URL('thank-you.html', document.baseURI).href;
    enquiryForm.append(nextPage);
}

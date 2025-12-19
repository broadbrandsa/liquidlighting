document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navOverlay = document.getElementById('nav-overlay');
    const navElement = document.getElementById('primary-nav');

    const closeNav = () => {
        document.body.classList.remove('nav-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    };

    const toggleNav = () => {
        const isOpen = document.body.classList.toggle('nav-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', isOpen.toString());
        }
    };

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer to highlight active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', closeNav);
    }

    if (navElement) {
        navElement.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeNav();
        }
    });

    const navObserverOptions = {
        threshold: 0.3
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Animation Observer for Cards and Blocks (NOT Sections)
    const animateElements = document.querySelectorAll('.pricing-split-card, .offering-card, .highlight-box, .detail-block, .tech-stack-icon');

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                animationObserver.unobserve(entry.target); // Run once
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        // Add slight stagger based on index if desired, or just purely scroll-based
        animationObserver.observe(el);
    });

    // Tech stack toggle
    const techButtons = document.querySelectorAll('.tech-toggle__btn');
    const techPanes = document.querySelectorAll('.tech-pane');

    techButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tech-pane');

            techButtons.forEach(b => b.classList.remove('tech-toggle__btn--active'));
            btn.classList.add('tech-toggle__btn--active');

            techPanes.forEach(pane => {
                pane.classList.toggle('tech-pane--active', pane.id === `tech-pane-${target}`);
            });
        });
    });
    // Deliverables vertical toggle
    // Uses delegation or just loops through buttons but finds context
    const delivButtons = document.querySelectorAll('.deliv-tab-btn');

    delivButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Find parent container to scope logic
            const container = btn.closest('.deliverables-vertical-layout');
            if (!container) return;

            const target = btn.getAttribute('data-deliv-pane');

            // Find all buttons IN THIS CONTAINER
            const containerButtons = container.querySelectorAll('.deliv-tab-btn');
            // Find all panes IN THIS CONTAINER
            const containerPanes = container.querySelectorAll('.deliv-pane');

            // Deactivate all buttons in this container
            containerButtons.forEach(b => b.classList.remove('deliv-tab-btn--active'));
            // Activate clicked button
            btn.classList.add('deliv-tab-btn--active');

            // Switch panes
            containerPanes.forEach(pane => {
                pane.classList.toggle('deliv-pane--active', pane.id === `deliv-pane-${target}`);
                pane.style.marginTop = ''; // Reset margin
            });
        });
    });
    // Deliverables Phase Toggle
    const phaseButtons = document.querySelectorAll('.phase-nav-btn');
    const phases = document.querySelectorAll('.deliverable-phase');

    phaseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPhaseId = btn.getAttribute('data-target-phase');

            // Deactivate all buttons
            phaseButtons.forEach(b => b.classList.remove('active'));
            // Activate clicked button
            btn.classList.add('active');

            // Switch phases
            phases.forEach(phase => {
                if (phase.id === targetPhaseId) {
                    phase.classList.add('active');
                } else {
                    phase.classList.remove('active');
                }
            });
        });
    });
    // Dev Costs Toggle
    const devButtons = document.querySelectorAll('.comm-expand-btn');

    devButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const content = btn.nextElementSibling;
            if (content && content.classList.contains('comm-expanded-content')) {
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            }
        });
    });

    // Download to PDF (via print dialog)
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            window.print();
        });
    }

});

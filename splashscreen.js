let intro = document.querySelector('.intro-ss');
let logo = document.querySelector('.logo-header-ss');
let logoSpan = document.querySelectorAll('.logo-ss');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header'); // Target the entire header

window.addEventListener('DOMContentLoaded', () => {
    
    // Hide the header (logo and navbar) during splash screen
    header.style.display = 'none'; // Hide the header initially

    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh'; // Hide the splash screen
        }, 2300);

        setTimeout(() => {
            header.style.display = 'flex'; // Show the header again
        }, 2500); // This matches the time after the splash screen disappears
    });
});

// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
});
function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx - 18 + 'px';
    ring.style.top = ry - 18 + 'px';
    requestAnimationFrame(animRing);
}
animRing();
document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        ring.style.width = '60px'; ring.style.height = '60px';
        ring.style.opacity = '0.3';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        ring.style.width = '36px'; ring.style.height = '36px';
        ring.style.opacity = '0.6';
    });
});

// NAV scroll
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// MARQUEE
const items = ['React.js', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'Node.js', 'MongoDB', 'Next.js', 'Framer Motion', 'Git', 'REST APIs', 'Figma', 'VS Code'];
const track = document.getElementById('marqueeTrack');
const content = [...items, ...items].map(i =>
    `<span class="marquee-item">${i}<span class="dot">✦</span></span>`
).join('');
track.innerHTML = content + content;

// REVEAL on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// COUNT UP
function countUp(el, target, duration = 1800) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start += step;
        if (start >= target) { el.textContent = target + (target >= 100 ? '+' : ''); clearInterval(timer); }
        else { el.textContent = Math.floor(start) + (target >= 100 ? '+' : ''); }
    }, 16);
}
const statObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const target = parseInt(e.target.dataset.count);
            countUp(e.target, target);
            statObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// SKILL BARS
const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.animationPlayState = 'running';
            });
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll('.skills-grid').forEach(el => barObserver.observe(el));

document.addEventListener('DOMContentLoaded', () => {

    // ========================================
    // 1. CLICK SPARK — React Bits ClickSpark
    //    Global particle explosion on every click
    // ========================================
    initClickSpark();

    // ========================================
    // 2. DECRYPTED TEXT — React Bits DecryptedText
    //    Matrix-style character scramble reveal
    // ========================================
    initDecryptedText();

    // ========================================
    // 3. MAGNET EFFECT — React Bits Magnet
    //    Elements attract toward cursor
    // ========================================
    initMagnet();

    // ========================================
    // 4. SPLIT TEXT — React Bits SplitText
    //    Letters animate in on scroll
    // ========================================
    initSplitText();

    // ========================================
    // 5. BLUR TEXT — React Bits BlurText
    //    Words blur-to-focus on scroll
    // ========================================
    initBlurText();

    // ========================================
    // 6. FLOATING / ANTIGRAVITY
    //    Elements gently float up and down
    // ========================================
    initFloat();

    // ========================================
    // 7. NAVIGATION & EXISTING FEATURES
    // ========================================
    initNavigation();

    // ========================================
    // 8. DOME GALLERY
    // ========================================
    initDomeGallery();

    // ========================================
    // Console Easter Egg
    // ========================================
    console.log('%c RUAEL TOM ', 'background: #CCFF00; color: #000; font-size: 24px; font-weight: bold; padding: 10px;');
    console.log('%c ML ENGINEER & CREATIVE DEVELOPER ', 'color: #666; font-size: 12px;');
    console.log('%c ✨ Built with React Bits-inspired effects ', 'color: #CCFF00; font-size: 14px;');
});


// ============================================================
// CLICK SPARK — Particle explosions on click
// ============================================================
function initClickSpark() {
    const canvas = document.getElementById('clickSparkCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const SPARK_COLOR = '#CCFF00';
    const SPARK_SIZE = 12;
    const SPARK_RADIUS = 25;
    const SPARK_COUNT = 10;
    const DURATION = 500;

    let sparks = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function easeOut(t) { return t * (2 - t); }

    function draw(timestamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparks = sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= DURATION) return false;

            const progress = elapsed / DURATION;
            const eased = easeOut(progress);

            const distance = eased * SPARK_RADIUS * 3;
            const lineLength = SPARK_SIZE * (1 - eased);
            const opacity = 1 - eased;

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            ctx.strokeStyle = SPARK_COLOR;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            return true;
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);

    document.addEventListener('click', (e) => {
        const now = performance.now();
        for (let i = 0; i < SPARK_COUNT; i++) {
            sparks.push({
                x: e.clientX,
                y: e.clientY,
                angle: (2 * Math.PI * i) / SPARK_COUNT + (Math.random() * 0.3),
                startTime: now
            });
        }
    });
}


// ============================================================
// DECRYPTED TEXT — Matrix-style scramble reveal
// ============================================================
function initDecryptedText() {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+01234567890<>/\\|{}[]';

    const elements = document.querySelectorAll('[data-decrypt]');

    elements.forEach(el => {
        const rawText = el.textContent;
        const speed = parseInt(el.dataset.decryptSpeed) || 50;
        const sequential = el.dataset.decryptSequential === 'true';
        const trigger = el.dataset.decryptTrigger || 'load'; // 'load', 'view', 'hover'

        // Store the blink span if present
        const blinkSpan = el.querySelector('.blink');
        const blinkHTML = blinkSpan ? blinkSpan.outerHTML : '';
        const rawClean = blinkSpan ? rawText.replace(blinkSpan.textContent, '') : rawText;
        // Normalize whitespace: collapse runs of whitespace to single space, trim ends
        const cleanText = rawClean.replace(/\s+/g, ' ').trim();

        function scramble() {
            let iteration = 0;
            const maxIter = sequential ? cleanText.length : 15;
            const revealedSet = new Set();

            const interval = setInterval(() => {
                let result = '';

                if (sequential) {
                    if (revealedSet.size < cleanText.length) {
                        revealedSet.add(revealedSet.size);
                    }
                }

                for (let i = 0; i < cleanText.length; i++) {
                    if (cleanText[i] === ' ') {
                        result += ' ';
                    } else if (sequential && revealedSet.has(i)) {
                        result += `<span class="char-revealed">${cleanText[i]}</span>`;
                    } else if (!sequential && iteration >= maxIter) {
                        result += `<span class="char-revealed">${cleanText[i]}</span>`;
                    } else if (sequential && !revealedSet.has(i)) {
                        result += `<span class="char-encrypted">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`;
                    } else {
                        const rand = Math.random();
                        if (rand < iteration / maxIter) {
                            result += `<span class="char-revealed">${cleanText[i]}</span>`;
                        } else {
                            result += `<span class="char-encrypted">${CHARS[Math.floor(Math.random() * CHARS.length)]}</span>`;
                        }
                    }
                }

                el.innerHTML = result + blinkHTML;
                iteration++;

                if ((sequential && revealedSet.size >= cleanText.length) || (!sequential && iteration > maxIter)) {
                    clearInterval(interval);
                    el.innerHTML = cleanText + blinkHTML;
                }
            }, speed);
        }

        if (trigger === 'load') {
            // Scramble immediately on load
            setTimeout(scramble, 300);
        } else if (trigger === 'view') {
            // Scramble when scrolled into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        scramble();
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.1 });
            observer.observe(el);
        } else if (trigger === 'hover') {
            // Scramble on hover
            const parentItem = el.closest('.project-item') || el.closest('.contact-link') || el.parentElement;
            parentItem.addEventListener('mouseenter', () => {
                scramble();
            });
        }
    });
}


// ============================================================
// MAGNET EFFECT — Elements attract toward cursor
// ============================================================
function initMagnet() {
    const magnetElements = document.querySelectorAll('[data-magnet]');

    magnetElements.forEach(el => {
        const strength = parseFloat(el.dataset.magnetStrength) || 2;
        const padding = parseFloat(el.dataset.magnetPadding) || 80;
        let isActive = false;

        // Check if this is a flex/complex container (has multiple child elements)
        const isComplex = el.children.length > 1;

        // For simple elements (nav links), wrap content in inner span for transform
        // For complex elements (project items, contact links), transform the element directly
        let target;
        if (isComplex) {
            // Apply transform directly — don't wrap children or it breaks flex layout
            target = el;
            el.style.willChange = 'transform';
            el.style.transition = 'transform 0.5s ease-in-out';
        } else {
            if (!el.querySelector('.magnet-inner')) {
                const inner = document.createElement('span');
                inner.className = 'magnet-inner';
                inner.style.display = 'inline-block';
                inner.style.transition = 'transform 0.5s ease-in-out';
                inner.style.willChange = 'transform';
                while (el.firstChild) {
                    inner.appendChild(el.firstChild);
                }
                el.appendChild(inner);
            }
            target = el.querySelector('.magnet-inner');
        }

        window.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distX = Math.abs(centerX - e.clientX);
            const distY = Math.abs(centerY - e.clientY);

            if (distX < rect.width / 2 + padding && distY < rect.height / 2 + padding) {
                if (!isActive) {
                    isActive = true;
                    target.style.transition = 'transform 0.3s ease-out';
                }
                const offsetX = (e.clientX - centerX) / strength;
                const offsetY = (e.clientY - centerY) / strength;
                target.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
            } else {
                if (isActive) {
                    isActive = false;
                    target.style.transition = 'transform 0.5s ease-in-out';
                    target.style.transform = 'translate3d(0, 0, 0)';
                }
            }
        });
    });
}


// ============================================================
// SPLIT TEXT — Letters animate in staggered on scroll
// ============================================================
function initSplitText() {
    const elements = document.querySelectorAll('[data-split-text]');

    elements.forEach(el => {
        const text = el.textContent;
        const html = el.innerHTML;

        // Handle line breaks
        if (html.includes('<br>')) {
            const parts = html.split('<br>');
            let result = '';
            parts.forEach((part, partIdx) => {
                const cleaned = part.replace(/<[^>]*>/g, '');
                for (let i = 0; i < cleaned.length; i++) {
                    const char = cleaned[i] === ' ' ? '&nbsp;' : cleaned[i];
                    const delay = (partIdx * 10 + i) * 0.04;
                    result += `<span class="split-char" style="transition-delay:${delay}s">${char}</span>`;
                }
                if (partIdx < parts.length - 1) result += '<br>';
            });
            el.innerHTML = result;
        } else {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                const char = text[i] === ' ' ? '&nbsp;' : text[i];
                const delay = i * 0.04;
                result += `<span class="split-char" style="transition-delay:${delay}s">${char}</span>`;
            }
            el.innerHTML = result;
        }

        // Observe for viewport entry
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chars = el.querySelectorAll('.split-char');
                    chars.forEach(c => c.classList.add('visible'));
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(el);
    });
}


// ============================================================
// BLUR TEXT — Words blur-to-focus on scroll
// ============================================================
function initBlurText() {
    const elements = document.querySelectorAll('[data-blur-text]');

    elements.forEach(el => {
        const html = el.innerHTML;
        // Split by words while preserving HTML tags
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.split(/(\s+)/);
                const fragment = document.createDocumentFragment();
                words.forEach(word => {
                    if (word.trim() === '') {
                        fragment.appendChild(document.createTextNode(word));
                    } else {
                        const span = document.createElement('span');
                        span.className = 'blur-word';
                        span.textContent = word;
                        fragment.appendChild(span);
                    }
                });
                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // Process child nodes (but not the element itself if it's a highlight)
                const children = Array.from(node.childNodes);
                children.forEach(child => processNode(child));
                // Wrap the element itself in a blur-word
                if (node.classList && node.classList.contains('highlight')) {
                    node.classList.add('blur-word');
                }
            }
        }

        const childNodes = Array.from(tempDiv.childNodes);
        childNodes.forEach(node => processNode(node));
        el.innerHTML = tempDiv.innerHTML;

        // Observe and reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const words = el.querySelectorAll('.blur-word');
                    words.forEach((w, i) => {
                        setTimeout(() => {
                            w.classList.add('visible');
                        }, i * 80);
                    });
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(el);
    });
}


// ============================================================
// FLOAT / ANTIGRAVITY — Elements gently float
// ============================================================
function initFloat() {
    const elements = document.querySelectorAll('[data-float]');

    elements.forEach(el => {
        const range = parseFloat(el.dataset.floatRange) || 5;
        const speed = parseFloat(el.dataset.floatSpeed) || 4;
        const offset = Math.random() * Math.PI * 2; // Random starting phase

        function float(time) {
            const y = Math.sin(time / 1000 * (2 * Math.PI / speed) + offset) * range;
            const x = Math.cos(time / 1000 * (2 * Math.PI / (speed * 1.3)) + offset) * (range * 0.3);
            el.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(float);
        }
        requestAnimationFrame(float);
    });
}


// ============================================================
// NAVIGATION & EXISTING FEATURES
// ============================================================
function initNavigation() {
    const nav = document.querySelector('.nav-fixed');
    const sections = document.querySelectorAll('section');

    // Section observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bgColor = window.getComputedStyle(entry.target).backgroundColor;
                const isLight = bgColor.includes('255, 255, 255') || bgColor === 'transparent';
                if (!isLight) nav.classList.add('inverted');
                else nav.classList.remove('inverted');
            }
        });
    }, { threshold: 0.5 });
    sections.forEach(section => sectionObserver.observe(section));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            if (scrollIndicator) scrollIndicator.style.opacity = '0';
        } else {
            if (scrollIndicator) scrollIndicator.style.opacity = '1';
        }
    });

    // Live clock
    const updateTime = () => {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const timeDisplay = document.querySelector('.nav-role');
        if (timeDisplay) timeDisplay.textContent = `ML ENGINEER / ${h}:${m}:${s}`;
    };
    setInterval(updateTime, 1000);
    updateTime();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        else if (e.key === 'ArrowUp') window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    });
}


// ============================================================
// DOME GALLERY
// ============================================================
function initDomeGallery() {
    const SEGMENTS = 20;
    const MAX_VERT_ROT = 8;
    const DRAG_SENSITIVITY = 18;
    const RADIUS = 520;

    const ML_IMAGES = [
        { src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop', alt: 'AI Neural Network' },
        { src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&auto=format&fit=crop', alt: 'Robot AI Brain' },
        { src: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&auto=format&fit=crop', alt: 'Data Science Code' },
        { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop', alt: 'Circuit Board' },
        { src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop', alt: 'Humanoid Robot' },
        { src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop', alt: 'Matrix Data' },
        { src: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400&auto=format&fit=crop', alt: 'AI Chip' },
        { src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&auto=format&fit=crop', alt: 'Code Screen' },
        { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop', alt: 'Engineer' },
        { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop', alt: 'Cybersecurity' },
        { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&auto=format&fit=crop', alt: 'Smart Tech' },
        { src: 'https://images.unsplash.com/photo-1531746790095-e5981e3e8793?w=400&auto=format&fit=crop', alt: 'Innovation' },
    ];

    const sphereEl = document.getElementById('sphere');
    const sphereMain = document.getElementById('sphereMain');
    const sphereRoot = document.getElementById('sphereRoot');

    if (!sphereEl || !sphereRoot || !sphereMain) return;

    const stageEl = sphereEl.parentElement;
    stageEl.style.perspective = (RADIUS * 2) + 'px';

    let rotation = { x: 0, y: 0 };
    let startRot = { x: 0, y: 0 };
    let startPos = null;
    let dragging = false;
    let moved = false;
    let inertiaRAF = null;

    const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
    const wrapAngle = deg => { const a = (((deg + 180) % 360) + 360) % 360; return a - 180; };

    function applyTransform(xDeg, yDeg) {
        sphereEl.style.transform = `translateZ(${-RADIUS}px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }

    const unitAngle = 360 / SEGMENTS;
    const ROWS = 5;
    const rowAngles = [-2, -1, 0, 1, 2];
    const tileWidth = (RADIUS * Math.PI * 2) / SEGMENTS;
    const tileHeight = tileWidth;

    let tileIndex = 0;

    for (let col = 0; col < SEGMENTS; col++) {
        for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
            const yAngle = col * unitAngle;
            const xAngle = rowAngles[rowIdx] * (unitAngle * 0.7);
            const imgData = ML_IMAGES[tileIndex % ML_IMAGES.length];
            tileIndex++;

            const itemDiv = document.createElement('div');
            itemDiv.style.cssText = `
                position:absolute;
                width:${tileWidth}px; height:${tileHeight}px;
                top:50%; left:50%;
                margin-left:${-tileWidth / 2}px; margin-top:${-tileHeight / 2}px;
                transform-style:preserve-3d;
                backface-visibility:hidden;
                transform:rotateY(${yAngle}deg) rotateX(${xAngle}deg) translateZ(${RADIUS}px);
            `;

            const imageDiv = document.createElement('div');
            imageDiv.style.cssText = `
                position:absolute; inset:4px;
                border-radius:8px; overflow:hidden;
                cursor:pointer;
                border:1px solid #333;
                transition:border-color 0.3s, box-shadow 0.3s;
                backface-visibility:hidden;
                transform:translateZ(0);
            `;

            imageDiv.addEventListener('mouseenter', () => {
                imageDiv.style.borderColor = '#CCFF00';
                imageDiv.style.boxShadow = '0 0 20px rgba(204,255,0,0.3)';
                img.style.filter = 'grayscale(0) brightness(1.1)';
            });
            imageDiv.addEventListener('mouseleave', () => {
                imageDiv.style.borderColor = '#333';
                imageDiv.style.boxShadow = 'none';
                img.style.filter = 'grayscale(0.7) brightness(0.8)';
            });

            const img = document.createElement('img');
            img.src = imgData.src;
            img.alt = imgData.alt;
            img.draggable = false;
            img.loading = 'lazy';
            img.style.cssText = `
                width:100%; height:100%;
                object-fit:cover;
                pointer-events:none;
                filter:grayscale(0.7) brightness(0.8);
                transition:filter 0.3s ease;
            `;

            imageDiv.appendChild(img);
            itemDiv.appendChild(imageDiv);
            sphereEl.appendChild(itemDiv);
        }
    }

    applyTransform(0, 0);

    // Drag handling
    let lastTime = 0, lastX = 0, lastY = 0;
    let velocityX = 0, velocityY = 0;

    sphereMain.addEventListener('pointerdown', (e) => {
        stopInertia();
        dragging = true; moved = false;
        startRot = { ...rotation };
        startPos = { x: e.clientX, y: e.clientY };
        lastTime = performance.now();
        lastX = e.clientX; lastY = e.clientY;
        velocityX = 0; velocityY = 0;
        sphereMain.setPointerCapture(e.pointerId);
        // Stop auto-rotate on drag
        autoRotate = false;
        if (autoTimer) clearTimeout(autoTimer);
    });

    sphereMain.addEventListener('pointermove', (e) => {
        if (!dragging || !startPos) return;
        const dx = e.clientX - startPos.x;
        const dy = e.clientY - startPos.y;
        if (!moved && (dx * dx + dy * dy) > 16) moved = true;

        rotation.x = clamp(startRot.x - dy / DRAG_SENSITIVITY, -MAX_VERT_ROT, MAX_VERT_ROT);
        rotation.y = wrapAngle(startRot.y + dx / DRAG_SENSITIVITY);
        applyTransform(rotation.x, rotation.y);

        const now = performance.now();
        const dt = now - lastTime;
        if (dt > 5) {
            velocityX = (e.clientX - lastX) / dt;
            velocityY = (e.clientY - lastY) / dt;
            lastTime = now; lastX = e.clientX; lastY = e.clientY;
        }
    });

    sphereMain.addEventListener('pointerup', () => {
        if (!dragging) return;
        dragging = false;
        if (moved) startInertia(velocityX, velocityY);
        moved = false;
    });

    sphereMain.addEventListener('pointercancel', () => { dragging = false; moved = false; });

    function stopInertia() {
        if (inertiaRAF) { cancelAnimationFrame(inertiaRAF); inertiaRAF = null; }
    }

    function startInertia(vx, vy) {
        let cVx = clamp(vx, -1.5, 1.5) * 80;
        let cVy = clamp(vy, -1.5, 1.5) * 80;
        let frames = 0;
        const step = () => {
            cVx *= 0.96; cVy *= 0.96;
            if (Math.abs(cVx) < 0.01 && Math.abs(cVy) < 0.01) { inertiaRAF = null; return; }
            if (++frames > 300) { inertiaRAF = null; return; }
            rotation.x = clamp(rotation.x - cVy / 200, -MAX_VERT_ROT, MAX_VERT_ROT);
            rotation.y = wrapAngle(rotation.y + cVx / 200);
            applyTransform(rotation.x, rotation.y);
            inertiaRAF = requestAnimationFrame(step);
        };
        stopInertia();
        inertiaRAF = requestAnimationFrame(step);
    }

    // Auto-rotate — variables hoisted so pointerdown handler above can access them
    var autoRotate = true;
    var autoTimer = null;
    function autoLoop() {
        if (autoRotate && !dragging) {
            rotation.y = wrapAngle(rotation.y + 0.08);
            applyTransform(rotation.x, rotation.y);
        }
        requestAnimationFrame(autoLoop);
    }
    requestAnimationFrame(autoLoop);

    // Resume auto-rotate after drag ends (pointerdown handled above)
    sphereMain.addEventListener('pointerup', () => {
        autoTimer = setTimeout(() => { autoRotate = true; }, 4000);
    });
}

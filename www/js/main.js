console.log("KidWrite & Type: v2 Loading...");

// Selectors
const screens = {
    dashboard: document.getElementById('dashboard'),
    writing: document.getElementById('writing-screen'),
    typing: document.getElementById('typing-screen')
};

const btns = {
    writing: document.getElementById('btn-writing'),
    typing: document.getElementById('btn-typing'),
    back: document.querySelectorAll('.back-btn'),
    clear: document.getElementById('clear-canvas')
};

const canvas = document.getElementById('writing-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const typingDisplay = document.getElementById('typing-display');
const hiddenInput = document.getElementById('hidden-input');

// State
let currentMode = 'dashboard';
let isDrawing = false;
let lastX = 0;
let lastY = 0;

console.log("Selectors initialized. Canvas:", !!ctx);

// Navigation Logic
function showScreen(screenId) {
    console.log("Switching to screen:", screenId);
    Object.values(screens).forEach(s => {
        if (s) s.classList.remove('active');
    });

    if (screens[screenId]) {
        screens[screenId].classList.add('active');
        currentMode = screenId;
    } else {
        console.error("Screen not found:", screenId);
    }

    if (screenId === 'writing') {
        resizeCanvas();
    } else if (screenId === 'typing') {
        if (hiddenInput) hiddenInput.focus();
    }
}

// Attach listeners
if (btns.writing) {
    btns.writing.addEventListener('click', () => showScreen('writing'));
} else {
    console.error("Writing button not found!");
}

if (btns.typing) {
    btns.typing.addEventListener('click', () => showScreen('typing'));
} else {
    console.error("Typing button not found!");
}

btns.back.forEach(btn => {
    btn.addEventListener('click', () => showScreen('dashboard'));
});

// --- Writing Logic ---
function resizeCanvas() {
    if (!canvas) return;
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawGuidelines();
}

function drawGuidelines() {
    if (!ctx) return;
    const h = canvas.height;
    const w = canvas.width;
    const spacing = 100;

    ctx.save();
    ctx.clearRect(0, 0, w, h); // Clear background first

    for (let y = 100; y < h - 100; y += spacing * 3) {
        // Blue top line
        ctx.beginPath();
        ctx.strokeStyle = '#acd0ff';
        ctx.lineWidth = 2;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        // Dotted middle line
        ctx.beginPath();
        ctx.strokeStyle = '#ccc';
        ctx.setLineDash([10, 10]);
        ctx.moveTo(0, y + spacing);
        ctx.lineTo(w, y + spacing);
        ctx.stroke();

        // Red bottom line
        ctx.beginPath();
        ctx.strokeStyle = '#ffccd2';
        ctx.setLineDash([]);
        ctx.moveTo(0, y + spacing * 2);
        ctx.lineTo(w, y + spacing * 2);
        ctx.stroke();
    }
    ctx.restore();
}

if (canvas) {
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getCoords(e);
    }

    function draw(e) {
        if (!isDrawing || !ctx) return;
        const [x, y] = getCoords(e);

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        [lastX, lastY] = [x, y];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return [clientX - rect.left, clientY - rect.top];
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);

    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    }, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    if (btns.clear) {
        btns.clear.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawGuidelines();
        });
    }
}

// --- Typing Logic ---
if (hiddenInput && typingDisplay) {
    hiddenInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (val === '') {
            typingDisplay.innerHTML = '<span class="placeholder">Type something here...</span>';
        } else {
            typingDisplay.textContent = val;
        }
    });

    document.getElementById('typing-screen').addEventListener('click', () => {
        if (currentMode === 'typing') {
            hiddenInput.focus();
        }
    });
}

// Window resize handling
window.addEventListener('resize', () => {
    if (currentMode === 'writing') resizeCanvas();
});

console.log("KidWrite & Type: v2 Started");

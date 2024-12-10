// Initialize frame size and style
const frame = document.getElementById('frame');
frame.classList.add('medium');
frame.classList.add('rounded');
frame.classList.add('sunset');

// Initialize shadow
const preview = document.getElementById('preview');
preview.classList.add('shadow-medium');

// Handle frame size changes
document.querySelectorAll('input[name="frame-size"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const frame = document.getElementById('frame');
        frame.classList.remove('small', 'medium', 'large');
        frame.classList.add(e.target.value);
    });
});

// Handle palette selection
document.querySelectorAll('input[name="palette"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const frame = document.getElementById('frame');
        frame.classList.remove('sunset', 'ocean', 'forest', 'candy', 'lavender', 'peach', 'mint', 'sky');
        frame.classList.add(e.target.value);
    });
});

// Handle rounded corners toggle
document.getElementById('rounded-corners').addEventListener('change', (e) => {
    const frame = document.getElementById('frame');
    if (e.target.checked) {
        frame.classList.add('rounded');
    } else {
        frame.classList.remove('rounded');
    }
});

// Handle shadow size changes
document.getElementById('shadow-size').addEventListener('change', (e) => {
    const preview = document.getElementById('preview');
    preview.classList.remove('shadow-none', 'shadow-small', 'shadow-medium', 'shadow-large');
    if (e.target.value !== 'none') {
        preview.classList.add(`shadow-${e.target.value}`);
    } else {
        preview.classList.add('shadow-none');
    }
});

document.addEventListener('paste', async (event) => {
    event.preventDefault();
    const items = event.clipboardData.items;

    for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
            const blob = item.getAsFile();
            const imageUrl = URL.createObjectURL(blob);
            const previewImg = document.getElementById('preview');
            previewImg.src = imageUrl;
            previewImg.style.display = 'block';
        }
    }
});

document.addEventListener('copy', (event) => {
    const frame = document.getElementById('frame');
    if (frame) {
        html2canvas(frame).then(canvas => {
            canvas.toBlob(blob => {
                navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]);
            });
        });
        event.preventDefault();
    }
});

// Add html2canvas script dynamically
const script = document.createElement('script');
script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
document.head.appendChild(script);

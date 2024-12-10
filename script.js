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

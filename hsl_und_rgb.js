// von https://www.30secondsofcode.org/js/s/rgb-hex-hsl-hsb-color-format-conversion/

function hsl_to_rgb(h, s, l) {
    // input(0-360, 0-100, 0-100)
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
}

// function rgb_to_hsl(r, g, b) {
//     r /= 255;
//     g /= 255;
//     b /= 255;
//     const l = Math.max(r, g, b);
//     const s = l - Math.min(r, g, b);
//     const h = s ? (l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s) : 0;
//     return [
//         60 * h < 0 ? 60 * h + 360 : 60 * h,
//         100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
//         (100 * (2 * l - s)) / 2,
//     ];
// } // output(0-360, 0-100, 0-100)

function rgb_to_hsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    let s, h;

    if (max === min) {
        s = 0;
        h = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hex_to_rgb(hex) {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    return [r, g, b];
}

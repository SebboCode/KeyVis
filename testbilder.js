// Testbilder und Bilder:

function Farbbalken() {
    let Farbbalken = ctx.CTX.getImageData(0, 0, canvas.width, canvas.height);
    for (var zeile = 0; zeile < Farbbalken.height; zeile++) {
        for (var x = 0; x < Farbbalken.width; x++) {
            let offset = 4 * (zeile * Farbbalken.width + x);

            Farbbalken.data[offset] = x < Farbbalken.width / 4 || (x >= Farbbalken.width / 2 && x < (Farbbalken.width / 4) * 3) ? 255 : 0; // Rotwert
            Farbbalken.data[offset + 1] = x < Farbbalken.width / 2 ? 255 : 0; // Grünwert
            Farbbalken.data[offset + 2] =
                x < Farbbalken.width / 8 ||
                (x >= Farbbalken.width / 4 && x < (Farbbalken.width / 8) * 3) ||
                (x >= Farbbalken.width / 2 && x < (Farbbalken.width / 8) * 5) ||
                (x >= (Farbbalken.width / 4) * 3 && x < (Farbbalken.width / 8) * 7)
                    ? 255
                    : 0; // Blauwert

            Farbbalken.data[offset + 3] = 255; // Alphawert
        }
    }
    return Farbbalken;
}

function Verlauf_unbunt() {
    let Verlauf_unbunt = ctx.CTX.getImageData(0, 0, canvas.width, canvas.height);
    for (var zeile = 0; zeile < Verlauf_unbunt.height; zeile++) {
        for (var x = 0; x < Verlauf_unbunt.width; x++) {
            helligkeitsstufe = Math.round((x / Verlauf_unbunt.width) * 255);

            let offset = 4 * (zeile * Verlauf_unbunt.width + x);

            Verlauf_unbunt.data[offset] = helligkeitsstufe; // Rotwert
            Verlauf_unbunt.data[offset + 1] = helligkeitsstufe; // Grünwert
            Verlauf_unbunt.data[offset + 2] = helligkeitsstufe; // Blauwert

            Verlauf_unbunt.data[offset + 3] = 255; // Alphawert
        }
    }
    return Verlauf_unbunt;
}

function Verlauf_Hue() {
    let width = canvas.width,
        height = canvas.height;
    let Verlauf_Hue = ctx.CTX.getImageData(0, 0, width, height);
    let data = Verlauf_Hue.data;

    for (let zeile = 0; zeile < height; zeile++) {
        let l = (zeile / height) * 100; // Einmal berechnen
        for (let x = 0; x < width; x++) {
            let h = (x / width) * 360; // Einmal berechnen
            let RGB = hsl_to_rgb(h, 100, l);

            let offset = (zeile * width + x) * 4;
            data[offset] = RGB[0];
            data[offset + 1] = RGB[1];
            data[offset + 2] = RGB[2];
            data[offset + 3] = 255;
        }
    }
    return Verlauf_Hue;
}

function Hue_Flaeche() {
    let Hue_Flaeche = ctx.CTX.getImageData(0, 0, canvas.width, canvas.height);

    const centerX = Hue_Flaeche.width / 2;
    const centerY = Hue_Flaeche.height / 2;
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY) / 2.5;

    for (var zeile = 0; zeile < Hue_Flaeche.height; zeile++) {
        for (var x = 0; x < Hue_Flaeche.width; x++) {
            var distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(zeile - centerY, 2));
            var s = Math.min(distance / maxDistance, 1); // Sättigung basierend auf der Entfernung zum Zentrum

            RGB = [(x / Hue_Flaeche.width) * 255, (zeile / Hue_Flaeche.height) * 255, (1 - x / Hue_Flaeche.width) * 255];

            HSL = rgb_to_hsl(RGB[0], RGB[1], RGB[2]);
            RGB = hsl_to_rgb(HSL[0], s * 100, 50);

            let offset = 4 * (zeile * Hue_Flaeche.width + x);

            Hue_Flaeche.data[offset] = RGB[0]; // Rotwert
            Hue_Flaeche.data[offset + 1] = RGB[1]; // Grünwert
            Hue_Flaeche.data[offset + 2] = RGB[2]; // Blauwert

            Hue_Flaeche.data[offset + 3] = 255; // Alphawert
        }
    }
    return Hue_Flaeche;
}

function Weiss() {
    let Weiss = ctx.CTX.getImageData(0, 0, canvas.width, canvas.height);

    for (var zeile = 0; zeile < Weiss.height; zeile++) {
        for (var x = 0; x < Weiss.width; x++) {
            let offset = 4 * (zeile * Weiss.width + x);

            Weiss.data[offset] = 255; // Rotwert
            Weiss.data[offset + 1] = 255; // Grünwert
            Weiss.data[offset + 2] = 255; // Blauwert

            Weiss.data[offset + 3] = 255; // Alphawert
        }
    }
    return Weiss;
}

function Grau_50() {
    let Grau_50 = ctx.CTX.getImageData(0, 0, canvas.width, canvas.height);

    for (var zeile = 0; zeile < Grau_50.height; zeile++) {
        for (var x = 0; x < Grau_50.width; x++) {
            let offset = 4 * (zeile * Grau_50.width + x);

            Grau_50.data[offset] = 127; // Rotwert
            Grau_50.data[offset + 1] = 127; // Grünwert
            Grau_50.data[offset + 2] = 127; // Blauwert

            Grau_50.data[offset + 3] = 255; // Alphawert
        }
    }
    return Grau_50;
}

function Schwarz() {
    let Schwarz = ctx.CTX.getImageData(0, 0, canvas.width, canvas.height);

    for (var zeile = 0; zeile < Schwarz.height; zeile++) {
        for (var x = 0; x < Schwarz.width; x++) {
            let offset = 4 * (zeile * Schwarz.width + x);

            Schwarz.data[offset] = 0; // Rotwert
            Schwarz.data[offset + 1] = 0; // Grünwert
            Schwarz.data[offset + 2] = 0; // Blauwert

            Schwarz.data[offset + 3] = 255; // Alphawert
        }
    }
    return Schwarz;
}

function Bild_als_ImageData(bildQuelle) {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = bildQuelle;
        let imageData, numPixels, pixels, buffer;

        image.addEventListener("load", function () {
            ctx.CTX.drawImage(image, 0, 0, canvas.width, canvas.height);

            imageData = ctx.CTX.getImageData(0, 0, canvas.width, canvas.height);
            buffer = ctx.CTX.createImageData(imageData); // Buffer, um die Pixel wieder auf das Original zu setzen
            numPixels = imageData.width * imageData.height;
            pixels = imageData.data;

            resolve(imageData);
        });

        image.addEventListener("error", function (err) {
            reject(err); // Bei einem Fehler das Promise ablehnen
        });
    });
}

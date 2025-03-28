// Effekte:
function spiegeln_horizontal(ImgOriginal) {
    ImgReturn = ctx.CTX.getImageData(0, 0, ImgOriginal.width, ImgOriginal.height);

    for (var zeile = 0; zeile < ImgReturn.height; zeile++) {
        for (var x = 0; x < ImgReturn.width; x++) {
            let offset = 4 * (zeile * ImgReturn.width + x);

            ImgReturn.data[offset] = ImgOriginal.data[4 * (zeile * ImgOriginal.width + (ImgReturn.width - x)) - 4]; // Rotwert
            ImgReturn.data[offset + 1] = ImgOriginal.data[4 * (zeile * ImgOriginal.width + (ImgReturn.width - x)) + 1 - 4]; // Grünwert
            ImgReturn.data[offset + 2] = ImgOriginal.data[4 * (zeile * ImgOriginal.width + (ImgReturn.width - x)) + 2 - 4]; // Blauwert

            ImgReturn.data[offset + 3] = 255; // Alphawert
        }
    }

    return ImgReturn;
}

function spiegeln_vertikal(ImgOriginal) {}

function addieren(Img1, Img2) {
    if (Img1.height != Img2.height || Img1.width != Img2.width) {
        console.error("Bilder in addieren() nicht gleich Groß");
        return null;
    }

    ImgReturn = ctx.CTX.getImageData(0, 0, Img1.width, Img1.height);

    for (var zeile = 0; zeile < ImgReturn.height; zeile++) {
        for (var x = 0; x < ImgReturn.width; x++) {
            let offset = 4 * (zeile * ImgReturn.width + x);

            ImgReturn.data[offset] = Math.min(Img1.data[offset] + Img2.data[offset], 255); // Rotwert
            ImgReturn.data[offset + 1] = Math.min(Img1.data[offset + 1] + Img2.data[offset + 1], 255); // Grünwert
            ImgReturn.data[offset + 2] = Math.min(Img1.data[offset + 2] + Img2.data[offset + 2], 255); // Blauwert

            ImgReturn.data[offset + 3] = 255; // Alphawert
        }
    }

    return ImgReturn;
}

function multiplizieren(Img1, Img2) {
    if (Img1.height != Img2.height || Img1.width != Img2.width) {
        console.error("Bilder in multiplizieren() nicht gleich Groß");
        return null;
    }

    ImgReturn = ctx.CTX.getImageData(0, 0, Img1.width, Img1.height);

    for (var zeile = 0; zeile < ImgReturn.height; zeile++) {
        for (var x = 0; x < ImgReturn.width; x++) {
            let offset = 4 * (zeile * ImgReturn.width + x);

            ImgReturn.data[offset] = Math.min((((Img1.data[offset] / 255) * Img2.data[offset]) / 255) * 255, 255); // Rotwert
            ImgReturn.data[offset + 1] = Math.min((((Img1.data[offset + 1] / 255) * Img2.data[offset + 1]) / 255) * 255, 255); // Grünwert
            ImgReturn.data[offset + 2] = Math.min((((Img1.data[offset + 2] / 255) * Img2.data[offset + 2]) / 255) * 255, 255); // Blauwert

            ImgReturn.data[offset + 3] = 255; // Alphawert
        }
    }

    return ImgReturn;
}

function schwarzWeiss(ImgOriginal) {
    ImgReturn = ctx.CTX.getImageData(0, 0, ImgOriginal.width, ImgOriginal.height);
    // Formel: Y = 0,299 R + 0,587 G + 0,114 B

    for (var zeile = 0; zeile < ImgReturn.height; zeile++) {
        for (var x = 0; x < ImgReturn.width; x++) {
            let offset = 4 * (zeile * ImgReturn.width + x);

            Y = Math.round(0.299 * ImgOriginal.data[offset] + 0.588 * ImgOriginal.data[offset + 1] + 0.114 * ImgOriginal.data[offset + 2]);

            ImgReturn.data[offset] = Y; // Rotwert
            ImgReturn.data[offset + 1] = Y; // Grünwert
            ImgReturn.data[offset + 2] = Y; // Blauwert

            ImgReturn.data[offset + 3] = 255; // Alphawert
        }
    }

    return ImgReturn;
}

function reverse(ImgOriginal) {
    ImgReturn = ctx.CTX.getImageData(0, 0, ImgOriginal.width, ImgOriginal.height);

    for (var zeile = 0; zeile < ImgReturn.height; zeile++) {
        for (var x = 0; x < ImgReturn.width; x++) {
            let offset = 4 * (zeile * ImgReturn.width + x);

            ImgReturn.data[offset] = (1 - ImgOriginal.data[4 * (zeile * ImgOriginal.width + x)] / 255) * 255; // Rotwert
            ImgReturn.data[offset + 1] = (1 - ImgOriginal.data[4 * (zeile * ImgOriginal.width + x) + 1] / 255) * 255; // Grünwert
            ImgReturn.data[offset + 2] = (1 - ImgOriginal.data[4 * (zeile * ImgOriginal.width + x) + 2] / 255) * 255; // Blauwert

            ImgReturn.data[offset + 3] = 255; // Alphawert
        }
    }

    return ImgReturn;
}

// PNG als ImageData laden!

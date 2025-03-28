// Canvas-Elemente auswählen
const fillCanvas = document.getElementById("FILL_canvas");
const keyCanvas = document.getElementById("KEY_canvas");
const fillXKeyCanvas = document.getElementById("FILL_x_KEY_canvas");
const bgCanvas = document.getElementById("BG_canvas");
const invKeyCanvas = document.getElementById("invKEY_canvas");
const bgXInvKeyCanvas = document.getElementById("BG_x_invKEY_canvas");
const resultCanvas = document.getElementById("RESULT_canvas");
const CTXcanvas = document.getElementById("canvas");

// Variablen zum speichern der normalen Canvas größe und der Fullscreen-Canvas größe
let normCanvRes = Mittel;
let fullscreenCanvRes = HD;

// 2D-Kontext der Canvas-Elemente abrufen
const ctx = {
    FILL: fillCanvas.getContext("2d"),
    KEY: keyCanvas.getContext("2d"),
    FILL_x_KEY: fillXKeyCanvas.getContext("2d"),
    BG: bgCanvas.getContext("2d"),
    invKEY: invKeyCanvas.getContext("2d"),
    BG_x_invKEY: bgXInvKeyCanvas.getContext("2d"),
    RESULT: resultCanvas.getContext("2d"),
    CTX: CTXcanvas.getContext("2d"),
};

async function main() {
    preMultiplied = false;
    inverse = false;

    canvas_setup(normCanvRes); // oder Klein, HD, UHD

    // Startbilder laden
    FillBild = await Bild_als_ImageData("img/Luminanz.png");
    FillBildValue = "Luminanz";

    BGBild = await Bild_als_ImageData("img/FB.png");
    BGBildValue = "FB";

    // zum speichern der key Quelle bei split
    splitRef = FillBild;

    // Start Key einstellungen
    keyart = "luma"; // "chroma"
    KeyQuelleBild = FillBild;
    hue = 0;
    clip = 0.5;
    gain = 0.5;
    density = 100;

    source = "self"; // "split", "auto"

    berechnen();
}

function berechnen() {
    // neue Variable "KeyBild_FIN" die nur in der berechnen Methode benutzt wird - da inverse nicht den Inhalt von dem eigentlichen Key Signal
    // verändert sondern lediglich die weitere Verarbeitung beeinflusst

    // KeyBild = luma_key(KeyQuelleBild, clip, gain); //Verlauf_unbunt;
    if (keyart == "chroma") KeyBild = choma_key(KeyQuelleBild, hue, clip, gain, density);
    else if (keyart == "luma") KeyBild = luma_key(KeyQuelleBild, clip, gain, density);

    let KeyBild_FIN;
    if (inverse) KeyBild_FIN = reverse(KeyBild);
    else KeyBild_FIN = KeyBild;

    ctx.FILL.putImageData(FillBild, 0, 0);

    ctx.KEY.putImageData(schwarzWeiss(KeyBild_FIN), 0, 0);

    let Fill_x_KeyBild;

    if (!preMultiplied) {
        // standart
        Fill_x_KeyBild = multiplizieren(FillBild, KeyBild_FIN);
    } else {
        // Multiplikation auslassen
        Fill_x_KeyBild = FillBild;
    }

    ctx.FILL_x_KEY.putImageData(Fill_x_KeyBild, 0, 0);

    ctx.BG.putImageData(BGBild, 0, 0);

    let invKeyBild = reverse(KeyBild_FIN);
    ctx.invKEY.putImageData(invKeyBild, 0, 0);

    let BG_x_invKeyBild = multiplizieren(BGBild, invKeyBild);
    ctx.BG_x_invKEY.putImageData(BG_x_invKeyBild, 0, 0);

    let ResultBild = addieren(BG_x_invKeyBild, Fill_x_KeyBild);
    ctx.RESULT.putImageData(ResultBild, 0, 0);
}

async function reloadRes(res) {
    // alles in der neuen Auflösung laden

    canvas_setup(res);

    FillBild = await Bild_als_ImageData("img/" + FillBildValue + ".png");
    BGBild = await Bild_als_ImageData("img/" + BGBildValue + ".png");

    if (source === "self") KeyQuelleBild = FillBild;
    else if (source === "auto") KeyQuelleBild = key_source_auto();
    else if (source === "split") KeyQuelleBild = splitRef; // aber muss in neuer Größe geladen werden

    berechnen();
}

function key_source_auto() {
    // aber eigentlich solle das dierekt das Key bild werden oder???? oder KEY Quelle Bild???
    let auswahlElem = document.getElementById("Fill-Auswahl");
    let value = auswahlElem.options[auswahlElem.selectedIndex].value;

    if (value === "TS") return Farbbalken();
    else return Weiss();

    // und Gain und Clip auf Max setzen
}

// start von der Simmulation:
main();

const radiosKeyAuswahl = document.querySelectorAll('input[name="Key-Auswahl"]');
radiosKeyAuswahl.forEach((radio) => radio.addEventListener("change", changeKey));
function changeKey(event) {
    keyart = event.target.value;

    // hue-knob nur wenn choma
    const chromaEinstellungen = document.querySelector("#chomaEinstellungen");
    if (keyart == "chroma") chromaEinstellungen.style.display = "flex";
    else chromaEinstellungen.style.display = "none";

    berechnen();
}

const radiosSourceAuswahl = document.querySelectorAll('input[name="Source-Auswahl"]');
radiosSourceAuswahl.forEach((radio) => radio.addEventListener("change", changeKeySrc));
function changeKeySrc(event) {
    source = event.target.value;
    if (source === "self") KeyQuelleBild = FillBild;
    else if (source === "auto") KeyQuelleBild = key_source_auto();
    berechnen();
}

const preMultiplied_check = document.querySelector("#preMultiplied");
preMultiplied_check.checked = false;
preMultiplied_check.addEventListener("input", function () {
    preMultiplied = preMultiplied_check.checked;
    berechnen();

    // Darstellung:
    const elms = [];
    elms.push(document.querySelector("#multi1"));
    elms.push(document.querySelector("#klammer1"));
    elms.push(document.querySelector("#KEY_canvas_container"));
    elms.push(document.querySelector("#FILL_x_KEY_canvas_container"));

    const btns = [document.querySelector("#KEY_canvas_button"), document.querySelector("#FILL_x_KEY_canvas_button")];

    if (preMultiplied) {
        elms.forEach((elm) => (elm.style.opacity = "20%"));
        btns.forEach((elm) => (elm.style.display = "none"));
    } else {
        elms.forEach((elm) => (elm.style.opacity = "100%"));
        btns.forEach((elm) => (elm.style.display = "block"));
    }
});

function beschriftungen(elm) {
    const beschriftungen = document.querySelectorAll(".canvas-lable");
    console.log(beschriftungen);
    beschriftungen.forEach((element) => {
        if (elm.checked) element.style.visibility = "visible";
        else element.style.visibility = "hidden";
    });
}

function fullscreen(id) {
    let elem = document.getElementById(id);

    console.log("jetzt element gefunden");
    if (!document.fullscreenElement) {
        if (normCanvRes != fullscreenCanvRes) reloadRes(fullscreenCanvRes);

        elem.requestFullscreen().catch((err) => {
            alert("Error attempting to enable full-screen mode: ${err.message} (${err.name})");
        });

        // bugfix für Edge
        if (navigator.userAgent.includes("Edg")) {
            overlay.style.display = "block";
        }
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener("fullscreenchange", (event) => {
    // Funktion die erkennt wenn Fullscreen beendet wird und Auflösung zurücksetzt
    if (!document.fullscreenElement) {
        reloadRes(normCanvRes);

        // Safari Bugfix
        if (navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome")) {
            location.reload();
        }

        // für Bugfix für Edge:
        overlay.style.display = "none"; // Zurücksetzen des Hintergrundes
    }
});

const inverse_check = document.querySelector("#Inverse");
inverse_check.checked = false;
inverse_check.addEventListener("input", function () {
    inverse = inverse_check.checked;
    berechnen();
});

const clip_slider = document.querySelector("#clip");
clip_slider.addEventListener("input", function () {
    clip = +this.value / 100; // 0 ... 1
    document.getElementById("clip-value").innerText = (+this.value).toFixed(1);
    berechnen();
});

const gain_slider = document.querySelector("#gain");
gain_slider.addEventListener("input", function () {
    gain = (+this.value + 100) / 200; // 0 ... 1
    document.getElementById("gain-value").innerText = (+this.value).toFixed(1);
    berechnen();
});

const hue_slider = document.querySelector("#hue");
hue_slider.addEventListener("input", function () {
    hue = this.value;

    document.getElementById("Farbvorschau").style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    document.getElementById("hue-value").innerText = +this.value + "°";
    berechnen();
});

const color_picker = document.querySelector("#color_picker");
color_picker.addEventListener("input", function () {
    let rgb = hex_to_rgb(this.value);
    hue = rgb_to_hsl(rgb[0], rgb[1], rgb[2])[0];

    let hueRangeInput = document.querySelector("#hue");
    hueRangeInput.setValue(hue.toFixed(1));
    //              ^
    //              +--- Das dauert einen moment und kann bei sehr extremer benutzung zu verzögerungen führen

    document.getElementById("Farbvorschau").style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    document.getElementById("hue-value").innerText = +hue + "°";
    berechnen();
});

const density_slider = document.querySelector("#density");
density_slider.addEventListener("input", function () {
    density = this.value;
    document.getElementById("density-value").innerText = (+this.value).toFixed(1);
    berechnen();
});

async function changeImg(menuName, selectedValue) {
    if (menuName === "bildauswahl_fuer_FILL") {
        console.log(FillBild);
        FillBild = await Bild_als_ImageData("img/" + selectedValue + ".png");
        FillBildValue = selectedValue;
        console.log(FillBild);
        if (source != "split") splitRef = FillBild;

        if (source === "self") KeyQuelleBild = FillBild;
        else if (source === "auto") KeyQuelleBild = key_source_auto();
    } else if (menuName === "bildauswahl_fuer_BG") {
        BGBild = await Bild_als_ImageData("img/" + selectedValue + ".png");
        BGBildValue = selectedValue;
    }
    berechnen();
}

function changeNormCanvRes(auswahl) {
    normCanvRes = eval(auswahl.options[auswahl.selectedIndex].value);
    reloadRes(normCanvRes);
    berechnen();
}

function changeFullscreenCanvRes(auswahl) {
    fullscreenCanvRes = eval(auswahl.options[auswahl.selectedIndex].value);
}

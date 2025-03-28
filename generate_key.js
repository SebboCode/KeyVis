function choma_key(Input, hueEingabe, clip, gain, density) {
    // hue = 0 ... 360; clip, gain = 0 ... 1

    let Output = ctx.CTX.getImageData(0, 0, Input.width, Input.height);

    for (var zeile = 0; zeile < Output.height; zeile++) {
        for (var x = 0; x < Output.width; x++) {
            let offset = 4 * (zeile * Output.width + x);

            // HLS:
            let Input_hsl = rgb_to_hsl(Input.data[offset], Input.data[offset + 1], Input.data[offset + 2]);
            let Input_hue = Input_hsl[0];
            let Input_sat = Input_hsl[1];
            let Input_lum = Input_hsl[2];

            // Hue Distanz (maximal (360 / 2 = ) 180 weil Hue ein Kreis ist)
            let d_Hue = Math.abs(Input_hue - hueEingabe);
            if (d_Hue > 180) d_Hue = 360 - d_Hue;
            d_Hue = d_Hue / 180; // 0 ... 1

            // Saturation- und Luminanzabstand
            let d_Sat = (100 - Input_sat) / 100;
            let d_Lum = Math.abs(50 - Input_lum) / 50;

            let d_Farbe = (Math.sqrt((d_Sat / 3) ** 2 + (d_Lum / 3) ** 2 + d_Hue ** 2) / Math.sqrt(2 / 3 + 1)) * 4;

            Y =
                d_Farbe >= clip
                    ? // Y ist über Abschneidegrenze
                      1
                    : d_Farbe <= clip - gain
                    ? // Y unter Abschneidegrenze
                      0
                    : // im Abschneidebereich
                      (d_Farbe - (clip - gain)) / gain;

            //für Density:
            Y = Math.round(Y * 2.55 * density);

            Output.data[offset] = Y; // Rotwert
            Output.data[offset + 1] = Y; // Grünwert
            Output.data[offset + 2] = Y; // Blauwert

            Output.data[offset + 3] = 255; // Alphawert
        }
    }

    return Output;
}

function luma_key(Input, clip, gain, density) {
    // clip, gain = 0 ... 1

    let Output = ctx.CTX.getImageData(0, 0, Input.width, Input.height);

    for (var zeile = 0; zeile < Output.height; zeile++) {
        for (var x = 0; x < Output.width; x++) {
            offset = 4 * (zeile * Output.width + x);

            // Schwarz Weiß machen: 0 bis 1
            Y = Math.round(0.299 * Input.data[offset] + 0.588 * Input.data[offset + 1] + 0.114 * Input.data[offset + 2]) / 255;

            YK =
                Y >= clip && clip != 1
                    ? // Y ist über Abschneide-"Bereich":
                      1
                    : Y <= clip - gain
                    ? // Y ist unter Abschneide-"Bereich"
                      0
                    : // im Abschneide-"Bereich"
                      (Y - (clip - gain)) / gain;

            //           ^ lineare Interpolation des resultierenden Wertes zwischen 0 und 1, abhängig davon, wo Y innerhalb des Bereichs liegt

            YK = Math.round(YK * 2.55 * density);

            Output.data[offset] = YK; // Rotwert
            Output.data[offset + 1] = YK; // Grünwert
            Output.data[offset + 2] = YK; // Blauwert

            Output.data[offset + 3] = 255; // Alphawert
        }
    }

    return Output;
}

/* function f_clip(x, a = 0.25, b = -0.15) {
    // diese Funktion lässt sich irgendwie ganz gut verwänden
    return (-((1 + (((x - 0.5) ** 3 + (x - 0.5) * a + (1 / (1 / (a + 0.25))) * 0.5) * 1) / (a + 0.25)) ** -b) + 1) / (-((1 + 1) ** -b) + 1);
} */

const dynamicSelectData = [
    {
        value: "FB",
        img: "img/FB-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
    {
        value: "Moderator",
        img: "img/Moderator-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
    {
        value: "TS_Hintergrund",
        img: "img/TS_Hintergrund-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
    {
        value: "Luminanz",
        img: "img/Luminanz-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
    {
        value: "Hue_Luminanz",
        img: "img/Hue_Luminanz-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
    {
        value: "Hue_Kreis",
        img: "img/Hue_Kreis-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
    {
        value: "Weiss",
        img: "img/Weiss-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
    {
        value: "Grau",
        img: "img/Grau-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
    {
        value: "Schwarz",
        img: "img/Schwarz-klein.png",
        imgWidth: "100px",
        // imgHeight: "80px",
    },
];

// Erste DynamicSelect-Instanz
new DynamicSelect("#bildCanvas1", {
    columns: 3,
    height: "100px",
    width: "160px",
    dropdownWidth: "400px",
    data: dynamicSelectData,
});

// Zweite DynamicSelect-Instanz
new DynamicSelect("#bildCanvas2", {
    columns: 3,
    height: "100px",
    width: "160px",
    dropdownWidth: "400px",
    data: dynamicSelectData,
});

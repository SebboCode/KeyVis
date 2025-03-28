// const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;

const addCSS = (css) => {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
};

addCSS(`
    .canvas-button { 
        position: absolute;
        width: calc(100% - 3px);
        height: calc(100% - 3px);
        font-family: Arial;
        letter-spacing: 0.2px;
        font-size: 10pt;
        z-index: 1;
        top: 1.5px;
        left: 1.5px;
        color: transparent;
        background-color: transparent;
        border: 0px solid transparent;
    }

    .canvas-button:hover {
        transition: all, ease-in-out, 0.2s;
        /* background-color: var(--color-two); */
        background-color: rgba(200, 166, 212, 1);
        color: var(--text-color);
        backdrop-filter: blur(1px);
    }
    
    .canvas-button-svg-container-1 {
        position: absolute; 
        left: 50%; 
        top: 50%; 
        transform: translate(-50%, -50%);
        width: 23%;
        height: 25%;
        opacity: 0;
    }

    .canvas-button-svg-container-2 {
        position: absolute; 
        left: 75%; 
        top: 40%; 
        transform: translate(-50%, -50%);
        width: 2.5%;
        height: 2.5%;
        opacity: 0;
    }
        
    .canvas-button:hover .canvas-button-svg-container-1 {
        opacity: 1;
        transition: opacity, ease-in-out, 0.1s;
        transition: left, ease-in-out, 0.5s;
        left: 48%; 
    }
    
    .canvas-button:hover .canvas-button-svg-container-2 {
        opacity: 1;
        transition: opacity, ease-in-out, 0.3s;
        transition: left, ease-out, 0.6s;
        left: 63%;
    }

    `);

// Select the element where you want to append the SVG
// const canvasButton = document.querySelector('.canvas-button');
const canvasButton = document.getElementsByClassName("canvas-button");

// Append the SVG
for (i = 0; i < canvasButton.length; i++) {
    canvasButton[i].insertAdjacentHTML(
        "beforeend",
        `<div class="canvas-button-svg-container-1">
        <?xml version="1.0" encoding="UTF-8"?>
        <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.47 25.59">
        <defs>
            <style>
            .cls-1 {
                fill: none;
                stroke: var(--icon-color);
                stroke-miterlimit: 10;
                stroke-width: 1.5px;
            }
            </style>
        </defs>
        <polyline class="cls-1" points="4.89 4.33 2.91 4.33 2.91 21.26 33.53 21.26 33.53 17.82"/>
        <polyline class="cls-1" points="2.47 8.16 .5 8.16 .5 25.09 31.11 25.09 31.11 21.65"/>
        <rect class="cls-1" x="5.36" y=".5" width="30.61" height="16.94"/>
        </svg>
    </div>

    <div class="canvas-button-svg-container-2">
        <?xml version="1.0" encoding="UTF-8"?>
        <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3.56 6.56">
        <defs>
            <style>
            .cls-1 {
                fill: none;
                stroke: var(--icon-color);
                stroke-miterlimit: 10;
                stroke-width: 1.5px;
            }
            </style>
        </defs>
        <polyline class="cls-1" points="3.18 6.24 .66 3.28 3.18 .32"/>
        </svg>
    </div>
    `
    );
}

/*
<?xml version="1.0" encoding="UTF-8"?>
        <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.47 32">
        <defs>
            <style>
            .cls-1 {
                fill: none;
                stroke: var(--icon-color);
                stroke-miterlimit: 10;
            }

            .cls-2 {
                fill: var(--icon-color);
                opacity: .7;
            }

            .cls-3 {
                fill: var(--icon-color);
                opacity: .3;
            }
            
            </style>
        </defs>
        <g>
            <polyline class="cls-3" points="33.56 21.26 33.56 17.44 5.27 17.44 5.27 4.36 2.94 4.36 2.94 21.11"/>
            <polyline class="cls-1" points="4.89 4.33 2.91 4.33 2.91 21.26 33.53 21.26 33.53 17.82"/>
        </g>
        <polyline class="cls-1" points="2.47 8.16 .5 8.16 .5 25.09 31.11 25.09 31.11 21.65"/>
        <g>
            <rect style="fill: var(--icon-color);" x="28.12" y=".5" width="7.53" height="16.74"/>
            <rect class="cls-3" x="13.07" y=".5" width="7.53" height="16.74"/>
            <rect class="cls-2" x="20.59" y=".5" width="7.53" height="16.74"/>
            <rect class="cls-1" x="5.36" y=".5" width="30.61" height="16.94"/>
        </g>
        </svg>

*/

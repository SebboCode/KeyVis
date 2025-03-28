let HD = {
    height: 1080,
    width: 1920,
};

let Mittel = {
    height: HD.height / 3,
    width: HD.width / 3,
};

let Klein = {
    height: HD.height / 6,
    width: HD.width / 6,
};

let UHD = {
    height: 2160,
    width: 3840,
};

function canvas_setup(res) {
    const FILL_canvas = document.getElementById(`FILL_canvas`);
    let FILL = FILL_canvas.getContext(`2d`);
    FILL_canvas.width = res.width;
    FILL_canvas.height = res.height;

    const FILL_x_KEY_canvas = document.getElementById(`FILL_x_KEY_canvas`);
    let FILL_x_KEY = FILL_x_KEY_canvas.getContext(`2d`);
    FILL_x_KEY_canvas.width = res.width;
    FILL_x_KEY_canvas.height = res.height;

    const KEY_canvas = document.getElementById(`KEY_canvas`);
    let KEY = KEY_canvas.getContext(`2d`);
    KEY_canvas.width = res.width;
    KEY_canvas.height = res.height;

    const invKEY_canvas = document.getElementById(`invKEY_canvas`);
    let invKEY = invKEY_canvas.getContext(`2d`);
    invKEY_canvas.width = res.width;
    invKEY_canvas.height = res.height;

    const BG_canvas = document.getElementById(`BG_canvas`);
    let BG = BG_canvas.getContext(`2d`);
    BG_canvas.width = res.width;
    BG_canvas.height = res.height;

    const BG_x_invKEY_canvas = document.getElementById(`BG_x_invKEY_canvas`);
    let BG_x_invKEY = BG_x_invKEY_canvas.getContext(`2d`);
    BG_x_invKEY_canvas.width = res.width;
    BG_x_invKEY_canvas.height = res.height;

    const RESULT_canvas = document.getElementById(`RESULT_canvas`);
    let RESULT = RESULT_canvas.getContext(`2d`);
    RESULT_canvas.width = res.width;
    RESULT_canvas.height = res.height;

    // Canvas der nicht angezeigt wird
    const canvas = document.getElementById(`canvas`);
    var Canvas = canvas.getContext(`2d`);
    canvas.width = res.width;
    canvas.height = res.height;
}

import { Renderer, Vec2, Flowmap, Vec4, Geometry, Texture, Program, Mesh } from "./ogl-master/src/index.js";

var vertex = `
		attribute vec2 uv;
		attribute vec2 position;
		varying vec2 vUv;
		void main() {
				vUv = uv;
				gl_Position = vec4(position, 0, 1);
		}
`;

var fragment = `
		precision highp float;
		precision highp int;
		uniform sampler2D tWater;
		uniform sampler2D tFlow;
		uniform float uTime;
		varying vec2 vUv;
		uniform vec4 res;
		uniform vec2 img;

		vec2 centeredAspectRatio(vec2 uvs, vec2 factor){
				return uvs * factor - factor / 2. + 0.5;
		}

		void main() {

			vec3 flow = texture2D(tFlow, vUv).rgb;

			vec2 uv = .5 * gl_FragCoord.xy / res.xy ;

			vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5);
			myUV -= flow.xy * (0.15 * 1.2);

			vec2 myUV2 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
			myUV2 -= flow.xy * (0.125 * 1.2);

			vec2 myUV3 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
			myUV3 -= flow.xy * (0.10 * 1.4);

			vec3 tex = texture2D(tWater, myUV).rgb;
			vec3 tex2 = texture2D(tWater, myUV2).rgb;
			vec3 tex3 = texture2D(tWater, myUV3).rgb;

			gl_FragColor = vec4(tex.r, tex2.g, tex3.b, 1.0);
		}
`;

{
    var _size = [16, 9]; // Aspect ratio of the image
    var renderer = new Renderer({ dpr: 2 });
    var gl = renderer.gl;
    const container = document.getElementById("title-container");
    container.style.display = "inline-block"; /* Stellt sicher, dass der Container nur so breit wie der Inhalt ist */
    container.style.position = "relative"; /* Für die absolute Positionierung des Canvas */

    container.appendChild(gl.canvas);
    gl.canvas.id = "title-canvas";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.top = "0";
    gl.canvas.style.left = "0";
    gl.canvas.style.position = "absolute";
    gl.canvas.style.zIndex = "-1";

    const svgElement = document.getElementById("title-svg");
    svgElement.style.position = "absolute";
    svgElement.style.width = "102%";
    svgElement.style.transform = "translate(-50%, -50%)";
    svgElement.style.top = "50%";
    svgElement.style.left = "50%";

    const notVisibleTitle = document.getElementById("no-vis-title");
    notVisibleTitle.style.position = "relative";
    notVisibleTitle.style.margin = "0";
    notVisibleTitle.style.color = "transparent";
    notVisibleTitle.style.userSelect = "none";

    var aspect = 1;
    var mouse = new Vec2(-1);
    var velocity = new Vec2();

    function resize() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        renderer.setSize(containerWidth, containerHeight);
        gl.viewport(0, 0, containerWidth, containerHeight);

        var a1, a2;
        var imageAspect = _size[1] / _size[0];
        if (containerHeight / containerWidth < imageAspect) {
            a1 = 1;
            a2 = containerHeight / containerWidth / imageAspect;
        } else {
            a1 = (containerWidth / containerHeight) * imageAspect;
            a2 = 1;
        }

        mesh.program.uniforms.res.value = new Vec4(containerWidth, containerHeight, a1, a2);
        aspect = containerWidth / containerHeight;
    }

    var flowmap = new Flowmap(gl, {
        falloff: 0.6,
        dissipation: 0.92,
        alpha: 0.5,
    });

    var geometry = new Geometry(gl, {
        position: {
            size: 2,
            data: new Float32Array([-1, -1, 3, -1, -1, 3]),
        },
        uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    var texture = new Texture(gl, {
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
    });

    var img = new Image();
    img.onload = () => (texture.image = img);
    img.crossOrigin = "Anonymous";
    img.src = "img/title-img.jpg";

    var a1, a2;
    var imageAspect = _size[1] / _size[0];
    if (container.clientHeight / container.clientWidth < imageAspect) {
        a1 = 1;
        a2 = container.clientHeight / container.clientWidth / imageAspect;
    } else {
        a1 = (container.clientWidth / container.clientHeight) * imageAspect;
        a2 = 1;
    }

    var program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
            uTime: { value: 0 },
            tWater: { value: texture },
            res: {
                value: new Vec4(container.clientWidth, container.clientHeight, a1, a2),
            },
            img: { value: new Vec2(_size[1], _size[0]) },
            tFlow: flowmap.uniform,
        },
    });

    var mesh = new Mesh(gl, { geometry, program });

    window.addEventListener("resize", resize, false);
    resize();

    var isTouchCapable = "ontouchstart" in container;
    if (isTouchCapable) {
        container.addEventListener("touchstart", updateMouse, false);
        container.addEventListener("touchmove", updateMouse, { passive: false });
    } else {
        container.addEventListener("mousemove", updateMouse, false);
    }

    var lastTime;
    var lastMouse = new Vec2();

    function updateMouse(e) {
        e.preventDefault();

        const rect = container.getBoundingClientRect();

        // Berechne die Mausposition relativ zum Container !
        let mouseX, mouseY;

        if (e.changedTouches && e.changedTouches.length) {
            mouseX = e.changedTouches[0].clientX - rect.left;
            mouseY = e.changedTouches[0].clientY - rect.top;
        } else {
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        }

        mouse.set(mouseX / rect.width, 1.0 - mouseY / rect.height);

        if (!lastTime) {
            lastTime = performance.now();
            lastMouse.set(mouseX, mouseY);
        }

        var deltaX = mouseX - lastMouse.x;
        var deltaY = mouseY - lastMouse.y;

        lastMouse.set(mouseX, mouseY);

        var time = performance.now();
        var delta = Math.max(10.4, time - lastTime);
        lastTime = time;
        velocity.x = deltaX / delta;
        velocity.y = deltaY / delta;
        velocity.needsUpdate = true;
    }

    requestAnimationFrame(update);

    function update(t) {
        requestAnimationFrame(update);

        if (!velocity.needsUpdate) {
            mouse.set(-1);
            velocity.set(0);
        }
        velocity.needsUpdate = false;

        flowmap.aspect = aspect;
        flowmap.mouse.copy(mouse);
        flowmap.velocity.lerp(velocity, velocity.len ? 0.15 : 0.1);
        flowmap.update();
        program.uniforms.uTime.value = t * 0.01;
        renderer.render({ scene: mesh });
    }
}

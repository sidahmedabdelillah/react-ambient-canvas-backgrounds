"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var window_size_1 = require("@react-hook/window-size");
var simplex_noise_1 = __importDefault(require("simplex-noise"));
var particlePropCount = 9;
var Swirl = function (_a) {
    var _b = _a.particleCount, particleCount = _b === void 0 ? 700 : _b, _c = _a.rangeY, rangeY = _c === void 0 ? 100 : _c, _d = _a.baseTTL, baseTTL = _d === void 0 ? 50 : _d, _e = _a.rangeTTL, rangeTTL = _e === void 0 ? 150 : _e, _f = _a.baseSpeed, baseSpeed = _f === void 0 ? 0.1 : _f, _g = _a.rangeSpeed, rangeSpeed = _g === void 0 ? 2 : _g, _h = _a.baseRadius, baseRadius = _h === void 0 ? 1 : _h, _j = _a.rangeRadius, rangeRadius = _j === void 0 ? 4 : _j, _k = _a.baseHue, baseHue = _k === void 0 ? 220 : _k, _l = _a.rangeHue, rangeHue = _l === void 0 ? 100 : _l, _m = _a.noiseSteps, noiseSteps = _m === void 0 ? 8 : _m, _o = _a.xOff, xOff = _o === void 0 ? 0.00125 : _o, _p = _a.yOff, yOff = _p === void 0 ? 0.00125 : _p, _q = _a.zOff, zOff = _q === void 0 ? 0.0005 : _q, _r = _a.backgroundColor, backgroundColor = _r === void 0 ? 'hsla(260,40%,5%,1)' : _r;
    var canvasARef = (0, react_2.useRef)(null);
    var canvasBRef = (0, react_2.useRef)(null);
    var _s = (0, window_size_1.useWindowSize)(), windowWidth = _s[0], windowHeight = _s[1];
    var center = (0, react_2.useState)([])[0];
    var _t = (0, react_2.useState)(0), tick = _t[0], setTick = _t[1];
    var simplex = (0, react_2.useState)(new simplex_noise_1.default())[0];
    var _u = (0, react_2.useState)(particleCount * particlePropCount), particlePropsLength = _u[0], setParticlePropsLength = _u[1];
    var _v = (0, react_2.useState)(new Float32Array(particlePropsLength)), particleProps = _v[0], setParticleProps = _v[1];
    (0, react_2.useEffect)(function () {
        setParticlePropsLength(particleCount * particlePropCount);
        setParticleProps(new Float32Array(particlePropsLength));
    }, [particleCount, particlePropCount]);
    (0, react_2.useEffect)(function () {
        if (!canvasARef.current || !canvasBRef.current) {
            console.log('returned here');
            return;
        }
        for (var i = 0; i < particlePropsLength; i += particlePropCount) {
            initParticle(canvasARef.current, particleProps, center, i, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue);
        }
        if (!canvasARef.current || !canvasBRef.current) {
            return;
        }
        draw(canvasARef, canvasBRef, particleProps, center, simplex, tick, backgroundColor, particlePropsLength, particlePropCount, xOff, yOff, zOff, noiseSteps, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue);
        setTick(function (tick) { return tick + 1; });
    }, []);
    (0, react_2.useEffect)(function () {
        if (!canvasARef.current || !canvasBRef.current) {
            return;
        }
        var contextA = canvasARef.current.getContext('2d');
        var contextB = canvasBRef.current.getContext('2d');
        if (!contextA || !contextB) {
            return;
        }
        canvasARef.current.width = windowWidth;
        canvasARef.current.height = windowHeight;
        contextA.drawImage(canvasBRef.current, 0, 0);
        canvasBRef.current.width = windowWidth;
        canvasBRef.current.height = windowHeight;
        contextB.drawImage(canvasARef.current, 0, 0);
        center[0] = 0.5 * canvasARef.current.width;
        center[1] = 0.5 * canvasARef.current.height;
    }, [windowHeight, windowWidth]);
    return (react_1.default.createElement("div", { className: 'content--canvas' },
        react_1.default.createElement("canvas", { ref: canvasARef }),
        react_1.default.createElement("canvas", { ref: canvasBRef, style: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            } })));
};
exports.default = Swirl;
function draw(canvasARef, canvasBRef, particleProps, center, simplex, tick, backgroundColor, particlePropsLength, particlePropCount, xOff, yOff, zOff, noiseSteps, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue) {
    if (!canvasARef.current || !canvasBRef.current) {
        return;
    }
    var contextA = canvasARef.current.getContext('2d');
    var contextB = canvasBRef.current.getContext('2d');
    if (!contextA || !contextB) {
        return;
    }
    contextA.clearRect(0, 0, canvasARef.current.width, canvasARef.current.height);
    contextB.fillStyle = backgroundColor;
    contextB.fillRect(0, 0, canvasARef.current.width, canvasARef.current.height);
    drawParticles(canvasARef.current, contextA, particleProps, center, simplex, tick, particlePropsLength, particlePropCount, xOff, yOff, zOff, noiseSteps, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue);
    renderGlow(canvasARef.current, contextB);
    renderToScreen(canvasARef.current, contextB);
    window.requestAnimationFrame(function () {
        return draw(canvasARef, canvasBRef, particleProps, center, simplex, tick, backgroundColor, particlePropsLength, particlePropCount, xOff, yOff, zOff, noiseSteps, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue);
    });
}
function initParticle(canvasA, particleProps, center, i, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue) {
    var x = rand(canvasA.width);
    var y = center[1] + randRange(rangeY);
    var vx = 0;
    var vy = 0;
    var life = 0;
    var ttl = baseTTL + rand(rangeTTL);
    var speed = baseSpeed + rand(rangeSpeed);
    var radius = baseRadius + rand(rangeRadius);
    var hue = baseHue + rand(rangeHue);
    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
}
function drawParticles(canvasA, contextA, particleProps, center, simplex, tick, particlePropsLength, particlePropCount, xOff, yOff, zOff, noiseSteps, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue) {
    var i;
    for (i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(canvasA, contextA, particleProps, center, simplex, tick, i, xOff, yOff, zOff, noiseSteps, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue);
    }
}
function updateParticle(canvasA, contextA, particleProps, center, simplex, tick, i, xOff, yOff, zOff, noiseSteps, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue) {
    var i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i, i9 = 8 + i;
    var n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;
    x = particleProps[i];
    y = particleProps[i2];
    n = simplex.noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
    vx = lerp(particleProps[i3], cos(n), 0.5);
    vy = lerp(particleProps[i4], sin(n), 0.5);
    life = particleProps[i5];
    ttl = particleProps[i6];
    speed = particleProps[i7];
    x2 = x + vx * speed;
    y2 = y + vy * speed;
    radius = particleProps[i8];
    hue = particleProps[i9];
    drawParticle(contextA, x, y, x2, y2, life, ttl, radius, hue);
    life++;
    particleProps[i] = x2;
    particleProps[i2] = y2;
    particleProps[i3] = vx;
    particleProps[i4] = vy;
    particleProps[i5] = life;
    (checkBounds(canvasA, x, y) || life > ttl) &&
        initParticle(canvasA, particleProps, center, i, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue);
}
function drawParticle(contextA, x, y, x2, y2, life, ttl, radius, hue) {
    contextA.save();
    contextA.lineCap = 'round';
    contextA.lineWidth = radius;
    contextA.strokeStyle = "hsla(".concat(hue, ",100%,60%,").concat(fadeInOut(life, ttl), ")");
    contextA.beginPath();
    contextA.moveTo(x, y);
    contextA.lineTo(x2, y2);
    contextA.stroke();
    contextA.closePath();
    contextA.restore();
}
function checkBounds(canvasA, x, y) {
    return x > canvasA.width || x < 0 || y > canvasA.height || y < 0;
}
function renderGlow(canvasA, contexB) {
    contexB.save();
    contexB.filter = 'blur(8px) brightness(200%)';
    contexB.globalCompositeOperation = 'lighter';
    contexB.drawImage(canvasA, 0, 0);
    contexB.restore();
    contexB.save();
    contexB.filter = 'blur(4px) brightness(200%)';
    contexB.globalCompositeOperation = 'lighter';
    contexB.drawImage(canvasA, 0, 0);
    contexB.restore();
}
function renderToScreen(canvasA, contexB) {
    contexB.save();
    contexB.globalCompositeOperation = 'lighter';
    contexB.drawImage(canvasA, 0, 0);
    contexB.restore();
}
// utils
var PI = Math.PI, cos = Math.cos, sin = Math.sin, abs = Math.abs, random = Math.random;
var TAU = 2 * PI;
var rand = function (n) { return n * random(); };
var randRange = function (n) { return n - rand(2 * n); };
var fadeInOut = function (t, m) {
    var hm = 0.5 * m;
    return abs(((t + hm) % m) - hm) / hm;
};
var lerp = function (n1, n2, speed) {
    return (1 - speed) * n1 + speed * n2;
};
//# sourceMappingURL=Swirl.js.map
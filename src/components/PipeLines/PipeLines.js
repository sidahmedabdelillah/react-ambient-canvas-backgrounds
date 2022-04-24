"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var window_size_1 = require("@react-hook/window-size");
var react_1 = __importStar(require("react"));
var PI = Math.PI, cos = Math.cos, sin = Math.sin, abs = Math.abs, round = Math.round, random = Math.random;
var HALF_PI = 0.5 * PI;
var TAU = 2 * PI;
var TO_RAD = PI / 180;
var rand = function (n) { return n * random(); };
var fadeInOut = function (t, m) {
    var hm = 0.5 * m;
    return abs(((t + hm) % m) - hm) / hm;
};
var pipePropCount = 8;
var pipesTick = 0;
var PipeLine = function (_a) {
    var _b = _a.pipeCount, pipeCount = _b === void 0 ? 30 : _b, _c = _a.turnCount, turnCount = _c === void 0 ? 8 : _c, _d = _a.turnChanceRange, turnChanceRange = _d === void 0 ? 70 : _d, _e = _a.baseSpeed, baseSpeed = _e === void 0 ? 0.5 : _e, _f = _a.rangeSpeed, rangeSpeed = _f === void 0 ? 1 : _f, _g = _a.baseTTL, baseTTL = _g === void 0 ? 100 : _g, _h = _a.rangeTTL, rangeTTL = _h === void 0 ? 300 : _h, _j = _a.baseWidth, baseWidth = _j === void 0 ? 2 : _j, _k = _a.rangeWidth, rangeWidth = _k === void 0 ? 4 : _k, _l = _a.baseHue, baseHue = _l === void 0 ? 180 : _l, _m = _a.rangeHue, rangeHue = _m === void 0 ? 60 : _m, _o = _a.backgroundColor, backgroundColor = _o === void 0 ? 'hsla(150,80%,1%,1)' : _o, _p = _a.containerClass, containerClass = _p === void 0 ? "" : _p;
    var canvasARef = (0, react_1.useRef)(null);
    var canvasBRef = (0, react_1.useRef)(null);
    var _q = (0, window_size_1.useWindowSize)(), windowWidth = _q[0], windowHeight = _q[1];
    var _r = (0, react_1.useState)(pipeCount * pipePropCount), pipePropsLength = _r[0], setPipePropsLength = _r[1];
    var _s = (0, react_1.useState)((360 / turnCount) * TO_RAD), turnAmount = _s[0], setTurnAmount = _s[1];
    var center = (0, react_1.useState)([])[0];
    var pipeProps = (0, react_1.useState)(new Float32Array(pipePropsLength))[0];
    (0, react_1.useEffect)(function () {
        setTurnAmount((360 / turnCount) * TO_RAD);
    }, [turnCount]);
    (0, react_1.useEffect)(function () {
        setPipePropsLength(pipeCount * pipePropCount);
    }, [pipeCount]);
    (0, react_1.useEffect)(function () {
        if (!canvasARef.current || !canvasBRef.current) {
            return;
        }
        var contexA = canvasARef.current.getContext('2d');
        var contexB = canvasBRef.current.getContext('2d');
        if (!contexB || !contexA) {
            return;
        }
        canvasARef.current.width = windowWidth;
        canvasARef.current.height = windowHeight;
        contexA.drawImage(canvasBRef.current, 0, 0);
        canvasBRef.current.width = windowWidth;
        canvasBRef.current.height = windowHeight;
        contexB.drawImage(canvasARef.current, 0, 0);
        center[0] = 0.5 * canvasARef.current.width;
        center[1] = 0.5 * canvasARef.current.height;
        for (var i = 0; i < pipePropsLength; i += pipePropCount) {
            initPipe(canvasARef.current, pipeProps, center, i, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue);
        }
        draw(contexA, contexB, canvasARef.current, canvasBRef.current, pipeProps, center, pipePropsLength, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue, turnChanceRange, turnAmount, backgroundColor);
    }, [
        backgroundColor,
        baseHue,
        baseSpeed,
        baseTTL,
        baseWidth,
        center,
        pipePropsLength,
        rangeHue,
        rangeSpeed,
        rangeTTL,
        rangeWidth,
        turnAmount,
        turnChanceRange,
        windowHeight,
        windowWidth,
    ]);
    (0, react_1.useEffect)(function () {
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
    }, [windowWidth, windowHeight]);
    return (react_1.default.createElement("div", { className: containerClass, "data-testid": "pipe-lines-test" },
        react_1.default.createElement("canvas", { ref: canvasARef }),
        react_1.default.createElement("canvas", { ref: canvasBRef, style: {
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
            } })));
};
exports.default = PipeLine;
// functions
function initPipe(canvasA, pipeProps, center, i, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue) {
    var x = rand(canvasA.width);
    var y = center[1];
    var direction = round(rand(1)) ? HALF_PI : TAU - HALF_PI;
    var speed = baseSpeed + rand(rangeSpeed);
    var life = 0;
    var ttl = baseTTL + rand(rangeTTL);
    var width = baseWidth + rand(rangeWidth);
    var hue = baseHue + rand(rangeHue);
    pipeProps.set([x, y, direction, speed, life, ttl, width, hue], i);
}
function updatePipes(canvasA, contextA, pipeProps, center, pipePropsLength, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue, turnChanceRange, turnAmount) {
    for (var i = 0; i < pipePropsLength; i += pipePropCount) {
        updatePipe(canvasA, contextA, pipeProps, center, i, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue, turnChanceRange, turnAmount);
    }
}
function updatePipe(canvasA, contextA, pipeProps, center, i, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue, turnChanceRange, turnAmount) {
    var i2 = 1 + i, i3 = 2 + i, i4 = 3 + i, i5 = 4 + i, i6 = 5 + i, i7 = 6 + i, i8 = 7 + i;
    var x = pipeProps[i];
    var y = pipeProps[i2];
    var direction = pipeProps[i3];
    var speed = pipeProps[i4];
    var life = pipeProps[i5];
    var ttl = pipeProps[i6];
    var width = pipeProps[i7];
    var hue = pipeProps[i8];
    drawPipe(contextA, x, y, life, ttl, width, hue);
    life++;
    x += cos(direction) * speed;
    y += sin(direction) * speed;
    var turnChance = !(pipesTick % round(rand(turnChanceRange))) &&
        (!(round(x) % 6) || !(round(y) % 6));
    // const turnChance = false;
    var turnBias = round(rand(1)) ? -1 : 1;
    direction += turnChance ? turnAmount * turnBias : 0;
    pipeProps[i] = x;
    pipeProps[i2] = y;
    pipeProps[i3] = direction;
    pipeProps[i5] = life;
    checkBounds(canvasA, x, y);
    life > ttl &&
        initPipe(canvasA, pipeProps, center, i, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue);
}
function drawPipe(contextA, x, y, life, ttl, width, hue) {
    contextA.save();
    contextA.strokeStyle = "hsla(".concat(hue, ",75%,50%,").concat(fadeInOut(life, ttl) * 0.125, ")");
    contextA.beginPath();
    contextA.arc(x, y, width, 0, TAU);
    contextA.stroke();
    contextA.closePath();
    contextA.restore();
}
function checkBounds(canvasA, x, y) {
    if (x > canvasA.width)
        x = 0;
    if (x < 0)
        x = canvasA.width;
    if (y > canvasA.height)
        y = 0;
    if (y < 0)
        y = canvasA.height;
}
function render(contexB, canvasA, canvasB, backgroundColor) {
    contexB.save();
    contexB.fillStyle = backgroundColor;
    contexB.fillRect(0, 0, canvasB.width, canvasB.height);
    contexB.restore();
    contexB.save();
    contexB.filter = 'blur(12px)';
    contexB.drawImage(canvasA, 0, 0);
    contexB.restore();
    contexB.save();
    contexB.drawImage(canvasA, 0, 0);
    contexB.restore();
}
function draw(contexA, contexB, canvasA, canvasB, pipeProps, center, pipePropsLength, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue, turnChanceRange, turnAmount, backgroundColor) {
    pipesTick = pipesTick + 1;
    updatePipes(canvasA, contexA, pipeProps, center, pipePropsLength, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue, turnChanceRange, turnAmount);
    render(contexB, canvasA, canvasB, backgroundColor);
    window.requestAnimationFrame(function () {
        return draw(contexA, contexB, canvasA, canvasB, pipeProps, center, pipePropsLength, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue, turnChanceRange, turnAmount, backgroundColor);
    });
}
//# sourceMappingURL=PipeLines.js.map
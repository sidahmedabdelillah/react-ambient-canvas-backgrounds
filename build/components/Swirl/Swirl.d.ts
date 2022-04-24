/// <reference types="react" />
export interface SwirlPropTypes {
    particleCount?: number;
    rangeY?: number;
    baseTTL?: number;
    rangeTTL?: number;
    baseSpeed?: number;
    rangeSpeed?: number;
    baseRadius?: number;
    rangeRadius?: number;
    baseHue?: number;
    rangeHue?: number;
    noiseSteps?: number;
    xOff?: number;
    yOff?: number;
    zOff?: number;
    backgroundColor?: 'hsla(260,40%,5%,1)';
}
declare const Swirl: ({ particleCount, rangeY, baseTTL, rangeTTL, baseSpeed, rangeSpeed, baseRadius, rangeRadius, baseHue, rangeHue, noiseSteps, xOff, yOff, zOff, backgroundColor, }: SwirlPropTypes) => JSX.Element;
export default Swirl;

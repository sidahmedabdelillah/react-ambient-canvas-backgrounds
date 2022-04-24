/// <reference types="react" />
export interface PipeLineProps {
    pipeCount?: number;
    turnCount?: number;
    turnChanceRange?: number;
    baseSpeed?: number;
    rangeSpeed?: number;
    baseTTL?: number;
    rangeTTL?: number;
    baseWidth?: number;
    rangeWidth?: number;
    baseHue?: number;
    rangeHue?: number;
    backgroundColor?: string;
    containerClass?: string;
}
declare const PipeLine: ({ pipeCount, turnCount, turnChanceRange, baseSpeed, rangeSpeed, baseTTL, rangeTTL, baseWidth, rangeWidth, baseHue, rangeHue, backgroundColor, containerClass, }: PipeLineProps) => JSX.Element;
export default PipeLine;

import React from 'react';
export interface PipeLineProps {
    /** Number of pipes */
    pipeCount?: number;
    /** Possible direction of turns 4 is Up,Down,Left,Rigth and do the math on that */
    turnCount?: number;
    /** The chance of a pipe turning the higher the more swiggely it gets */
    turnChanceRange?: number;
    /** The initial speed of the pipe */
    baseSpeed?: number;
    /** How extra speed can it get */
    rangeSpeed?: number;
    /** Base life span of a pipe */
    baseTTL?: number;
    /** How much extra life can a pipe get */
    rangeTTL?: number;
    /** The initial width of a pipe */
    baseWidth?: number;
    /** How much extra width can it get */
    rangeWidth?: number;
    /** The initial Hue of the pipes */
    baseHue?: number;
    /** The maximum amount that could be added to the base hue value  */
    rangeHue?: number;
    /** Animation backgroud color */
    backgroundColor?: string;
    /** Class name for the container */
    containerClass?: string;
}
export interface PipeLinesRef {
    rerender: () => void;
}
declare const PipeLine: React.ForwardRefExoticComponent<PipeLineProps & React.RefAttributes<PipeLinesRef>>;
export default PipeLine;

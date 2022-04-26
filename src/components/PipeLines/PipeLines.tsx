import { useWindowSize } from '@react-hook/window-size'
import React, {
  Ref,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

const { PI, cos, sin, abs, round, random } = Math
const HALF_PI = 0.5 * PI
const TAU = 2 * PI
const TO_RAD = PI / 180
const rand = (n: number) => n * random()
const fadeInOut = (t: number, m: number) => {
  let hm = 0.5 * m
  return abs(((t + hm) % m) - hm) / hm
}

const pipePropCount = 8

let pipesTick = 0

export interface PipeLineProps {
  /** Number of pipes */
  pipeCount?: number
  /** Possible direction of turns 4 is Up,Down,Left,Rigth and do the math on that */
  turnCount?: number
  /** The chance of a pipe turning the higher the more swiggely it gets */
  turnChanceRange?: number
  /** The initial speed of the pipe */
  baseSpeed?: number
  /** How extra speed can it get */
  rangeSpeed?: number
  /** Base life span of a pipe */
  baseTTL?: number
  /** How much extra life can a pipe get */
  rangeTTL?: number
  /** The initial width of a pipe */
  baseWidth?: number
  /** How much extra width can it get */
  rangeWidth?: number
  /** The initial Hue of the pipes */
  baseHue?: number
  /** The maximum amount that could be added to the base hue value  */
  rangeHue?: number
  /** Animation backgroud color */
  backgroundColor?: string
  /** Class name for the container */
  containerClass?: string
}

export interface PipeLinesRef {
  rerender: () => void
}

const PipeLine = React.forwardRef(
  (
    {
      pipeCount = 30,
      turnCount = 8,
      turnChanceRange = 70,
      baseSpeed = 0.5,
      rangeSpeed = 1,
      baseTTL = 100,
      rangeTTL = 300,
      baseWidth = 2,
      rangeWidth = 4,
      baseHue = 180,
      rangeHue = 60,
      backgroundColor = 'hsla(150,80%,1%,1)',
      containerClass = '',
    }: PipeLineProps,
    ref: Ref<PipeLinesRef>
  ) => {
    const canvasARef = useRef<HTMLCanvasElement>(null)
    const canvasBRef = useRef<HTMLCanvasElement>(null)

    const [windowWidth, windowHeight] = useWindowSize()

    const [pipePropsLength, setPipePropsLength] = useState(
      pipeCount * pipePropCount
    )
    const [turnAmount, setTurnAmount] = useState((360 / turnCount) * TO_RAD)

    const [center] = useState<number[]>([])
    const [pipeProps, setPipeProps] = useState(
      new Float32Array(pipePropsLength)
    )

    useImperativeHandle(ref, () => ({ rerender }))

    const rerender = () => {
      setPipeProps(new Float32Array(pipePropsLength))
      if (canvasARef.current) {
        const context = canvasARef.current.getContext('2d')
        if (context) {
          context.clearRect(
            0,
            0,
            canvasARef.current.width,
            canvasARef.current.height
          )
        }
      }
      if (canvasBRef.current) {
        const context = canvasBRef.current.getContext('2d')
        if (context) {
          context.clearRect(
            0,
            0,
            canvasBRef.current.width,
            canvasBRef.current.height
          )
        }
      }
    }

    const resize = () => {
      if (!canvasARef.current || !canvasBRef.current) {
        return
      }
      if (!canvasARef.current || !canvasBRef.current) {
        return
      }
      const contextA = canvasARef.current.getContext('2d')
      const contextB = canvasBRef.current.getContext('2d')

      if (!contextA || !contextB) {
        return
      }

      canvasARef.current.width = windowWidth
      canvasARef.current.height = windowHeight

      contextA.drawImage(canvasBRef.current, 0, 0)

      canvasBRef.current.width = windowWidth
      canvasBRef.current.height = windowHeight

      contextB.drawImage(canvasARef.current, 0, 0)

      center[0] = 0.5 * canvasARef.current.width

      center[1] = 0.5 * canvasARef.current.height
    }

    useEffect(rerender, [backgroundColor, pipePropsLength])

    useEffect(() => {
      setTurnAmount((360 / turnCount) * TO_RAD)
    }, [turnCount])

    useEffect(() => {
      setPipePropsLength(pipeCount * pipePropCount)
      setPipeProps(new Float32Array(pipeCount * pipePropCount))
    }, [pipeCount])

    useEffect(() => {
      if (!canvasARef.current || !canvasBRef.current) {
        return
      }

      const contexA = canvasARef.current.getContext('2d')
      const contexB = canvasBRef.current.getContext('2d')

      if (!contexB || !contexA) {
        return
      }

      resize()

      for (let i = 0; i < pipePropsLength; i += pipePropCount) {
        initPipe(
          canvasARef.current,
          pipeProps,
          center,
          i,
          baseSpeed,
          rangeSpeed,
          baseTTL,
          rangeTTL,
          baseWidth,
          rangeWidth,
          baseHue,
          rangeHue
        )
      }

      draw(
        contexA,
        contexB,
        canvasARef.current,
        canvasBRef.current,
        pipeProps,
        center,
        pipePropsLength,
        baseSpeed,
        rangeSpeed,
        baseTTL,
        rangeTTL,
        baseWidth,
        rangeWidth,
        baseHue,
        rangeHue,
        turnChanceRange,
        turnAmount,
        backgroundColor
      )
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
    ])

    useEffect(() => {
      resize()
    }, [windowWidth, windowHeight])

    return (
      <div className={containerClass}>
        <canvas ref={canvasARef} />
        <canvas
          ref={canvasBRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    )
  }
)
export default PipeLine

// functions

function initPipe(
  canvasA: HTMLCanvasElement,
  pipeProps: Float32Array,
  center: number[],
  i: number,
  baseSpeed: number,
  rangeSpeed: number,
  baseTTL: number,
  rangeTTL: number,
  baseWidth: number,
  rangeWidth: number,
  baseHue: number,
  rangeHue: number
) {
  const x = rand(canvasA.width)
  const y = center[1]
  const direction = round(rand(1)) ? HALF_PI : TAU - HALF_PI
  const speed = baseSpeed + rand(rangeSpeed)
  const life = 0
  const ttl = baseTTL + rand(rangeTTL)
  const width = baseWidth + rand(rangeWidth)
  const hue = baseHue + rand(rangeHue)

  pipeProps.set([x, y, direction, speed, life, ttl, width, hue], i)
}

function updatePipes(
  canvasA: HTMLCanvasElement,
  contextA: CanvasRenderingContext2D,
  pipeProps: Float32Array,
  center: number[],
  pipePropsLength: number,
  baseSpeed: number,
  rangeSpeed: number,
  baseTTL: number,
  rangeTTL: number,
  baseWidth: number,
  rangeWidth: number,
  baseHue: number,
  rangeHue: number,
  turnChanceRange: number,
  turnAmount: number
) {
  // console.log(pipesTick)

  for (let i = 0; i < pipePropsLength; i += pipePropCount) {
    updatePipe(
      canvasA,
      contextA,
      pipeProps,
      center,
      i,
      baseSpeed,
      rangeSpeed,
      baseTTL,
      rangeTTL,
      baseWidth,
      rangeWidth,
      baseHue,
      rangeHue,
      turnChanceRange,
      turnAmount
    )
  }
}

function updatePipe(
  canvasA: HTMLCanvasElement,
  contextA: CanvasRenderingContext2D,
  pipeProps: Float32Array,
  center: number[],
  i: number,
  baseSpeed: number,
  rangeSpeed: number,
  baseTTL: number,
  rangeTTL: number,
  baseWidth: number,
  rangeWidth: number,
  baseHue: number,
  rangeHue: number,
  turnChanceRange: number,
  turnAmount: number
) {
  let i2 = 1 + i,
    i3 = 2 + i,
    i4 = 3 + i,
    i5 = 4 + i,
    i6 = 5 + i,
    i7 = 6 + i,
    i8 = 7 + i

  let x = pipeProps[i]
  let y = pipeProps[i2]
  let direction = pipeProps[i3]
  const speed = pipeProps[i4]
  let life = pipeProps[i5]
  const ttl = pipeProps[i6]
  const width = pipeProps[i7]
  const hue = pipeProps[i8]

  drawPipe(contextA, x, y, life, ttl, width, hue)

  life++
  x += cos(direction) * speed
  y += sin(direction) * speed
  const turnChance =
    !(pipesTick % round(rand(turnChanceRange))) &&
    (!(round(x) % 6) || !(round(y) % 6))
  // const turnChance = false;
  const turnBias = round(rand(1)) ? -1 : 1
  direction += turnChance ? turnAmount * turnBias : 0

  pipeProps[i] = x
  pipeProps[i2] = y
  pipeProps[i3] = direction
  pipeProps[i5] = life

  checkBounds(canvasA, x, y)
  life > ttl &&
    initPipe(
      canvasA,
      pipeProps,
      center,
      i,
      baseSpeed,
      rangeSpeed,
      baseTTL,
      rangeTTL,
      baseWidth,
      rangeWidth,
      baseHue,
      rangeHue
    )
}

function drawPipe(
  contextA: CanvasRenderingContext2D,
  x: number,
  y: number,
  life: number,
  ttl: number,
  width: number,
  hue: number
) {
  contextA.save()
  contextA.strokeStyle = `hsla(${hue},75%,50%,${fadeInOut(life, ttl) * 0.125})`
  contextA.beginPath()
  contextA.arc(x, y, width, 0, TAU)
  contextA.stroke()
  contextA.closePath()
  contextA.restore()
}

function checkBounds(canvasA: HTMLCanvasElement, x: number, y: number) {
  if (x > canvasA.width) x = 0
  if (x < 0) x = canvasA.width
  if (y > canvasA.height) y = 0
  if (y < 0) y = canvasA.height
}

function render(
  contexB: CanvasRenderingContext2D,
  canvasA: HTMLCanvasElement,
  canvasB: HTMLCanvasElement,
  backgroundColor: string
) {
  contexB.save()
  contexB.fillStyle = backgroundColor
  contexB.fillRect(0, 0, canvasB.width, canvasB.height)
  contexB.restore()

  contexB.save()
  contexB.filter = 'blur(12px)'
  contexB.drawImage(canvasA, 0, 0)
  contexB.restore()

  contexB.save()
  contexB.drawImage(canvasA, 0, 0)
  contexB.restore()
}
function draw(
  contexA: CanvasRenderingContext2D,
  contexB: CanvasRenderingContext2D,
  canvasA: HTMLCanvasElement,
  canvasB: HTMLCanvasElement,
  pipeProps: Float32Array,
  center: number[],
  pipePropsLength: number,
  baseSpeed: number,
  rangeSpeed: number,
  baseTTL: number,
  rangeTTL: number,
  baseWidth: number,
  rangeWidth: number,
  baseHue: number,
  rangeHue: number,
  turnChanceRange: number,
  turnAmount: number,
  backgroundColor: string
) {
  pipesTick = pipesTick + 1
  updatePipes(
    canvasA,
    contexA,
    pipeProps,
    center,
    pipePropsLength,
    baseSpeed,
    rangeSpeed,
    baseTTL,
    rangeTTL,
    baseWidth,
    rangeWidth,
    baseHue,
    rangeHue,
    turnChanceRange,
    turnAmount
  )

  render(contexB, canvasA, canvasB, backgroundColor)

  window.requestAnimationFrame(() =>
    draw(
      contexA,
      contexB,
      canvasA,
      canvasB,
      pipeProps,
      center,
      pipePropsLength,
      baseSpeed,
      rangeSpeed,
      baseTTL,
      rangeTTL,
      baseWidth,
      rangeWidth,
      baseHue,
      rangeHue,
      turnChanceRange,
      turnAmount,
      backgroundColor
    )
  )
}

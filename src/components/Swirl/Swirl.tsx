import React, { RefObject } from 'react'
import { useRef, useState, useEffect } from 'react'

import { useWindowSize } from '@react-hook/window-size'
import SimplexNoise from 'simplex-noise'
export interface SwirlPropTypes {
  particleCount?: number
  rangeY?: number
  baseTTL?: number
  rangeTTL?: number
  baseSpeed?: number
  rangeSpeed?: number
  baseRadius?: number
  rangeRadius?: number
  baseHue?: number
  rangeHue?: number
  noiseSteps?: number
  xOff?: number
  yOff?: number
  zOff?: number
  backgroundColor?: 'hsla(260,40%,5%,1)'
  loop?: boolean
}

const particlePropCount = 9

const Swirl = ({
  particleCount = 700,
  rangeY = 100,
  baseTTL = 50,
  rangeTTL = 150,
  baseSpeed = 0.1,
  rangeSpeed = 2,
  baseRadius = 1,
  rangeRadius = 4,
  baseHue = 220,
  rangeHue = 100,
  noiseSteps = 8,
  xOff = 0.00125,
  yOff = 0.00125,
  zOff = 0.0005,
  backgroundColor = 'hsla(260,40%,5%,1)',
  loop = false,
}: SwirlPropTypes) => {
  const canvasARef = useRef<HTMLCanvasElement>(null)
  const canvasBRef = useRef<HTMLCanvasElement>(null)
  const [windowWidth, windowHeight] = useWindowSize()

  const [center] = useState<number[]>([])
  const simplexRef = useRef(new SimplexNoise())
  const [particlePropsLength, setParticlePropsLength] = useState(
    particleCount * particlePropCount
  )
  const [particleProps, setParticleProps] = useState(
    new Float32Array(particlePropsLength)
  )

  const rangeYRef = useRef(rangeY)
  const particlePropsRef = useRef(particleProps)
  const baseHueRef = useRef(baseHue)
  const rangeHueRef = useRef(rangeHue)
  const baseRadiusRef = useRef(baseRadius)
  const rangeRadiusRef = useRef(rangeRadius)
  const xOffRef = useRef(xOff)
  const yOffRef = useRef(yOff)
  const zOffRef = useRef(zOff)
  const tickRef = useRef(1)

  // animation frame ref
  const animationFrameRef = useRef(0)

  useEffect(() => {
    setParticlePropsLength(particleCount * particlePropCount)
    setParticleProps(new Float32Array(particlePropsLength))
    particlePropsRef.current = new Float32Array(particlePropsLength)

    if (!canvasARef.current || !canvasBRef.current) {
      return
    }
  }, [
    baseHue,
    baseRadius,
    baseSpeed,
    baseTTL,
    center,
    particleCount,
    particlePropsLength,
    rangeHue,
    rangeRadius,
    rangeSpeed,
    rangeTTL,
    rangeY,
  ])

  useEffect(() => {
    rangeYRef.current = rangeY
  }, [rangeY])

  useEffect(() => {
    baseHueRef.current = baseHue
  }, [baseHue])

  useEffect(() => {
    rangeHueRef.current = rangeHue
  }, [rangeHue])

  useEffect(() => {
    baseRadiusRef.current = baseRadius
  }, [baseRadius])

  useEffect(() => {
    rangeRadiusRef.current = rangeRadius
  }, [rangeRadius])

  useEffect(() => {
    function draw(
      canvasARef: RefObject<HTMLCanvasElement>,
      canvasBRef: RefObject<HTMLCanvasElement>,
      particleProps: RefObject<Float32Array>,
      center: number[],
      simplex: RefObject<SimplexNoise>,
      tick: RefObject<number>,
      backgroundColor: string,
      particlePropsLength: number,
      particlePropCount: number,
      xOff: RefObject<number>,
      yOff: RefObject<number>,
      zOff: RefObject<number>,
      noiseSteps: number,
      rangeY: RefObject<number>,
      baseTTL: number,
      rangeTTL: number,
      baseSpeed: number,
      rangeSpeed: number,
      baseRadius: RefObject<number>,
      rangeRadius: RefObject<number>,
      baseHue: RefObject<number>,
      rangeHue: RefObject<number>
    ) {
      if (loop) {
        tickRef.current = tickRef.current + 1
      }
      if (
        !canvasARef.current ||
        !canvasBRef.current ||
        !baseHue.current ||
        !rangeHue.current ||
        !baseRadius.current ||
        !rangeRadius.current ||
        !simplex.current ||
        !tick.current
      ) {
        console.log('returned ')
        return
      }

      const contextA = canvasARef.current.getContext('2d')
      const contextB = canvasBRef.current.getContext('2d')

      if (!contextA || !contextB) {
        return
      }

      contextA.clearRect(
        0,
        0,
        canvasARef.current.width,
        canvasARef.current.height
      )

      contextB.fillStyle = backgroundColor
      contextB.fillRect(
        0,
        0,
        canvasARef.current.width,
        canvasARef.current.height
      )

      drawParticles(
        canvasARef.current,
        contextA,
        particleProps,
        center,
        simplex,
        tick,
        particlePropsLength,
        particlePropCount,
        xOff,
        yOff,
        zOff,
        noiseSteps,
        rangeY,
        baseTTL,
        rangeTTL,
        baseSpeed,
        rangeSpeed,
        baseRadius,
        rangeRadius,
        baseHue,
        rangeHue
      )
      renderGlow(canvasARef.current, contextB)
      renderToScreen(canvasARef.current, contextB)

      animationFrameRef.current = window.requestAnimationFrame(
        () =>
      draw(
        canvasARef,
        canvasBRef,
        particleProps,
        center,
        simplex,
        tick,
        backgroundColor,
        particlePropsLength,
        particlePropCount,
        xOff,
        yOff,
        zOff,
        noiseSteps,
        rangeY,
        baseTTL,
        rangeTTL,
        baseSpeed,
        rangeSpeed,
        baseRadius,
        rangeRadius,
        baseHue,
        rangeHue
      )
      )
    }
    cancelAnimationFrame(animationFrameRef.current)

    if (!canvasARef.current || !canvasBRef.current) {
      console.log('returned here')
      return
    }
    for (
      let i = 0;
      i < particlePropsRef.current.length;
      i += particlePropCount
    ) {
      initParticle(
        canvasARef.current,
        particlePropsRef,
        center,
        i,
        rangeYRef,
        baseTTL,
        rangeTTL,
        baseSpeed,
        rangeSpeed,
        baseRadiusRef,
        rangeRadiusRef,
        baseHueRef,
        rangeHueRef
      )
    }

    if (!canvasARef.current || !canvasBRef.current) {
      return
    }

    draw(
      canvasARef,
      canvasBRef,
      particlePropsRef,
      center,
      simplexRef,
      tickRef,
      backgroundColor,
      particlePropsLength,
      particlePropCount,
      xOffRef,
      yOffRef,
      zOffRef,
      noiseSteps,
      rangeYRef,
      baseTTL,
      rangeTTL,
      baseSpeed,
      rangeSpeed,
      baseRadiusRef,
      rangeRadiusRef,
      baseHueRef,
      rangeHueRef
    )

    return () => cancelAnimationFrame(animationFrameRef.current)
  }, [loop])

  useEffect(() => {
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
  }, [windowHeight, windowWidth])

  return (
    <div className='content--canvas'>
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

export default Swirl

function initParticle(
  canvasA: HTMLCanvasElement,
  particleProps: RefObject<Float32Array>,
  center: number[],
  i: number,
  rangeY: RefObject<number>,
  baseTTL: number,
  rangeTTL: number,
  baseSpeed: number,
  rangeSpeed: number,
  baseRadius: RefObject<number>,
  rangeRadius: RefObject<number>,
  baseHue: RefObject<number>,
  rangeHue: RefObject<number>
) {
  if (
    !baseHue.current ||
    !rangeHue.current ||
    !baseRadius.current ||
    !rangeRadius.current
  ) {
    return
  }
  const x = rand(canvasA.width)
  const y = center[1] + randRange(rangeY.current || 0)
  const vx = 0
  const vy = 0
  const life = 0
  const ttl = baseTTL + rand(rangeTTL)
  const speed = baseSpeed + rand(rangeSpeed)
  const radius = baseRadius.current + rand(rangeRadius.current)
  const hue = baseHue.current + rand(rangeHue.current)

  particleProps.current?.set([x, y, vx, vy, life, ttl, speed, radius, hue], i)
}

function drawParticles(
  canvasA: HTMLCanvasElement,
  contextA: CanvasRenderingContext2D,
  particleProps: RefObject<Float32Array>,
  center: number[],
  simplex: RefObject<SimplexNoise>,
  tick: RefObject<number>,
  particlePropsLength: number,
  particlePropCount: number,
  xOff: RefObject<number>,
  yOff: RefObject<number>,
  zOff: RefObject<number>,
  noiseSteps: number,
  rangeY: RefObject<number>,
  baseTTL: number,
  rangeTTL: number,
  baseSpeed: number,
  rangeSpeed: number,
  baseRadius: RefObject<number>,
  rangeRadius: RefObject<number>,
  baseHue: RefObject<number>,
  rangeHue: RefObject<number>
) {
  let i
  if (!particleProps.current) return

  for (i = 0; i < particleProps.current?.length; i += particlePropCount) {
    updateParticle(
      canvasA,
      contextA,
      particleProps,
      center,
      simplex,
      tick,
      i,
      xOff,
      yOff,
      zOff,
      noiseSteps,
      rangeY,
      baseTTL,
      rangeTTL,
      baseSpeed,
      rangeSpeed,
      baseRadius,
      rangeRadius,
      baseHue,
      rangeHue
    )
  }
}

function updateParticle(
  canvasA: HTMLCanvasElement,
  contextA: CanvasRenderingContext2D,
  particleProps: RefObject<Float32Array>,
  center: number[],
  simplex: RefObject<SimplexNoise>,
  tick: RefObject<number>,
  i: number,
  xOff: RefObject<number>,
  yOff: RefObject<number>,
  zOff: RefObject<number>,
  noiseSteps: number,
  rangeY: RefObject<number>,
  baseTTL: number,
  rangeTTL: number,
  baseSpeed: number,
  rangeSpeed: number,
  baseRadius: RefObject<number>,
  rangeRadius: RefObject<number>,
  baseHue: RefObject<number>,
  rangeHue: RefObject<number>
) {
  if (
    !particleProps.current ||
    !simplex.current ||
    !xOff.current ||
    !yOff.current ||
    !zOff.current ||
    !tick.current
  )
    return
  let i2 = 1 + i,
    i3 = 2 + i,
    i4 = 3 + i,
    i5 = 4 + i,
    i6 = 5 + i,
    i7 = 6 + i,
    i8 = 7 + i,
    i9 = 8 + i

  const x = particleProps.current[i]
  const y = particleProps.current[i2]
  const n =
    simplex.current.noise3D(
      x * xOff.current,
      y * yOff.current,
      tick.current * zOff.current
    ) *
    noiseSteps *
    TAU
  const vx = lerp(particleProps.current[i3], cos(n), 0.5)
  const vy = lerp(particleProps.current[i4], sin(n), 0.5)
  let life = particleProps.current[i5]
  const ttl = particleProps.current[i6]
  const speed = particleProps.current[i7]
  const x2 = x + vx * speed
  const y2 = y + vy * speed
  const radius = particleProps.current[i8]
  const hue = particleProps.current[i9]

  drawParticle(contextA, x, y, x2, y2, life, ttl, radius, hue)

  life++

  particleProps.current[i] = x2
  particleProps.current[i2] = y2
  particleProps.current[i3] = vx
  particleProps.current[i4] = vy
  particleProps.current[i5] = life
  ;(checkBounds(canvasA, x, y) || life > ttl) &&
    initParticle(
      canvasA,
      particleProps,
      center,
      i,
      rangeY,
      baseTTL,
      rangeTTL,
      baseSpeed,
      rangeSpeed,
      baseRadius,
      rangeRadius,
      baseHue,
      rangeHue
    )
}

function drawParticle(
  contextA: CanvasRenderingContext2D,
  x: number,
  y: number,
  x2: number,
  y2: number,
  life: number,
  ttl: number,
  radius: number,
  hue: number
) {
  contextA.save()
  contextA.lineCap = 'round'
  contextA.lineWidth = radius
  contextA.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
  contextA.beginPath()
  contextA.moveTo(x, y)
  contextA.lineTo(x2, y2)
  contextA.stroke()
  contextA.closePath()
  contextA.restore()
}

function checkBounds(canvasA: HTMLCanvasElement, x: number, y: number) {
  return x > canvasA.width || x < 0 || y > canvasA.height || y < 0
}

function renderGlow(
  canvasA: HTMLCanvasElement,
  contexB: CanvasRenderingContext2D
) {
  contexB.save()
  contexB.filter = 'blur(8px) brightness(200%)'
  contexB.globalCompositeOperation = 'lighter'
  contexB.drawImage(canvasA, 0, 0)
  contexB.restore()

  contexB.save()
  contexB.filter = 'blur(4px) brightness(200%)'
  contexB.globalCompositeOperation = 'lighter'
  contexB.drawImage(canvasA, 0, 0)
  contexB.restore()
}

function renderToScreen(
  canvasA: HTMLCanvasElement,
  contexB: CanvasRenderingContext2D
) {
  contexB.save()
  contexB.globalCompositeOperation = 'lighter'
  contexB.drawImage(canvasA, 0, 0)
  contexB.restore()
}

// utils
const { PI, cos, sin, abs, random } = Math
const TAU = 2 * PI
const rand = (n: number) => n * random()
const randRange = (n: number) => n - rand(2 * n)
const fadeInOut = (t: number, m: number) => {
  let hm = 0.5 * m
  return abs(((t + hm) % m) - hm) / hm
}
const lerp = (n1: number, n2: number, speed: number) =>
  (1 - speed) * n1 + speed * n2

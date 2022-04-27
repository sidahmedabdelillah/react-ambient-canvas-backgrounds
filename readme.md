# react-ambient-canvas-backgrounds

[![npm](https://img.shields.io/npm/v/react-dropzone.svg?style=flat-square)](https://www.npmjs.com/package/react-ambient-canvas-backgrounds)

React animated background fully customisable with props for unique look and feel
 
## Instalation
```bash
npm install --save react-ambient-canvas-backgrounds
```
or:
```bash
yarn add react-ambient-canvas-backgrounds
```
## PlayGround


## Usage

#### Swirl Animation

```jsx static
import React from 'react'
import {Swirl} from 'react-ambient-canvas-backgrounds'

function MyDropzone() {
  const [particleCount, setParticleCount] = useState(700)
  const [rangeY, setRangeY] = useState(100)
  const [baseTTL, setBaseTTL] = useState(150)
  const [rangeTTL, setRangeTTL] = useState(150)
  const [baseSpeed, setBaseSpeed] = useState(0.1)
  const [rangeSpeed, setRangeSpeed] = useState(2)
  const [baseRadius, setBaseRadius] = useState(1)
  const [rangeRadius, setRangeRadius] = useState(4)
  const [baseHue, setBaseHue] = useState(220)
  const [rangeHue, setRangeHue] = useState(100)
  const [noiseSteps, setNoiseSteps] = useState(8)
  const [xOff, setXOff] = useState(0.00125)
  const [yOff, setYOff] = useState(0.00125)
  const [zOff, setZOff] = useState(0.00125)

  return (
    <Swirl
        particleCount={particleCount}
        rangeY={rangeY}
        baseTTL={baseTTL}
        baseSpeed={rangeSpeed}
        rangeSpeed={rangeSpeed}
        baseRadius={baseRadius}
        rangeRadius={rangeRadius}
        baseHue={baseHue}
        rangeHue={rangeHue}
        noiseSteps={noiseSteps}
        xOff={xOff}
        yOff={yOff}
        zOff={zOff}
      />
  )
}
```

#### PipeLines Animation

```jsx
import React from 'react'
import {Swirl} from 'react-ambient-canvas-backgrounds'

function MyDropzone() {
  const [pipeCount, setPipeCount] = useState(70)
  const [turnCount, setTurnCount] = useState(8)
  const [turnChanceRange, setTurnChanceRange] = useState(70)
  const [baseSpeed, setBaseSpeed] = useState(0.5)
  const [rangeSpeed, setRangeSpeed] = useState(1)
  const [baseTTL, setBaseTTL] = useState(100)
  const [rangeTTL, setRangeTTL] = useState(300)
  const [baseWidth, setBaseWidth] = useState(2)
  const [rangeWidth, setRangeWidth] = useState(4)
  const [baseHue, setBaseHue] = useState(180)
  const [rangeHue, setRangeHue] = useState(60)
  const [backgroundColor, setBackgroundColor] = useState('hsla(150,80%,1%,1)')

  const PipeLinesRef = useRef<PipeLinesRef>(null);


    /// manulally restart the animation
  const rerender =  () => {
    if(PipeLinesRef.current){
      console.log('rerender')
      PipeLinesRef.current.rerender()
        }
  }


  return (
    <PipeLines
        pipeCount={pipeCount}
        turnCount={turnCount}
        turnChanceRange={turnChanceRange}
        baseSpeed={baseSpeed}
        rangeSpeed={rangeSpeed}
        baseTTL={baseTTL}
        rangeTTL={rangeTTL}
        baseWidth={baseWidth}
        rangeWidth={rangeWidth}
        baseHue={baseHue}
        rangeHue={rangeHue}
        backgroundColor={backgroundColor}
        ref={PipeLinesRef}
    />
  )
}
```
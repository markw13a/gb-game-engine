import './App.css'
import { AnimationTest } from './components/AnimationTest/AnimationTest'
import { Map } from './components/Map/Map'
import { MapDebugger } from './components/MapDebugger/MapDebugger'

import { getDecodedMap } from './map/symbolicMap';

function App() {
  return (
    <>
      {/* <AnimationTest /> */}
      <Map />
      {/* <MapDebugger map={getDecodedMap()} /> */}
    </>
  )
}

export default App

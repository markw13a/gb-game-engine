import './App.css'
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

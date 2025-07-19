import './App.css'
import { Map } from './components/Map/Map'
import { map } from './map/symbolicMap'
// import { MapDebugger } from './components/MapDebugger/MapDebugger'
// import { map } from './map/symbolicMap'

function App() {
  return (
    <>
      <Map map={map} />
      {/* <MapDebugger map={map} /> */}
    </>
  )
}

export default App

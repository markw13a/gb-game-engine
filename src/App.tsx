import './App.css'
// import { Map } from './components/Map/Map'
import { MapEditor } from './pages/MapEditor/MapEditor'
import { TILE_DATA } from './constants/symbols';
import { map } from './utils/symbolicMap/symbolicMap'
// import { MapDebugger } from './components/MapDebugger/MapDebugger'
// import { map } from './map/symbolicMap'

// TODO: Probably makes sense to have a lookup table of type to symbol
// TODO: We COULD create a React Router setup to avoid needing to comment out components like this
function App() {
  return (
    <>
      {/* <Map map={map} /> */}
      {/* <MapDebugger map={map} /> */}
      <MapEditor 
        tileOptions={TILE_DATA}
        tileSize='32px'
        getTileSymbol={(tile) => {
          if (!tile) return '-';

          return tile.type;
         }}
        getTileLabel={(tile) => tile.label}
        getTileImgSrc={(tile) => tile.sprite}
      />
    </>
  )
}

export default App

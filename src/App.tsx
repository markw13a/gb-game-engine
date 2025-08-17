import './App.css'
import { Map } from './components/Map/Map'
import { MapEditor } from './components/MapEditor/MapEditor'
import { map } from './map/symbolicMap'
// import { MapDebugger } from './components/MapDebugger/MapDebugger'
// import { map } from './map/symbolicMap'

const availableTiles = [
  {
    type: 'grass',
    label: 'Grass',
    sprite: '/sprites/world/grass-1.png'   
  },
  {
    type: 'tall-grass',
    label: 'Grass',
    sprite: '/sprites/world/tall-grass-1.png'   
  },
];

// TODO: Probably makes sense to have a lookup table of type to symbol
// TODO: We COULD create a React Router setup to avoid needing to comment out components like this
function App() {
  return (
    <>
      {/* <Map map={map} /> */}
      {/* <MapDebugger map={map} /> */}
      <MapEditor 
        tileOptions={availableTiles}
        tileSize='32px'
        getTileSymbol={(tile) => {
          if (!tile) return '-';

          return tile.type === 'grass' ? 'g' : 'G'
         }}
        getTileLabel={(tile) => tile.label}
        getTileImgSrc={(tile) => tile.sprite}
      />
    </>
  )
}

export default App

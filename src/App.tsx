import "./App.css";
import { MapEditor } from "./pages/MapEditor/MapEditor";
import { map } from "./pages/Pallet/constants/map";
import { TILE_DATA, TILES } from "./pages/Pallet/constants/symbols";
import { Map } from "./pages/Pallet/Map";
import { GameStateProvider } from "./pages/Pallet/providers/GameStateProvider";

function App() {
	return (
		<>
			<GameStateProvider>
				<Map map={map} />
			</GameStateProvider>
			{/* <MapEditor
				tileOptions={TILE_DATA}
				tileSize="32px"
				getTileSymbol={(tile) => tile.type}
				getTileFromSymbol={(symbol) => TILES[symbol]}
				getTileLabel={(tile) => tile.label}
				getTileImgSrc={(tile) => tile.sprite}
			/> */}
		</>
	);
}

export default App;

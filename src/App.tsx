import "./App.css";
// biome-ignore lint/correctness/noUnusedImports: TODO introduce react router
import { MapEditor } from "./pages/MapEditor/MapEditor";
import { map } from "./pages/Pallet/constants/map";
// biome-ignore lint/correctness/noUnusedImports: TODO introduce react router
import { TILE_DATA, TILES } from "./pages/Pallet/constants/symbols";
import { warpPoints } from "./pages/Pallet/constants/warpPoints";
import { Pallet } from "./pages/Pallet/Pallet";
import { GameStateProvider } from "./pages/Pallet/providers/GameStateProvider";

function App() {
	return (
		<>
			<GameStateProvider>
				<Pallet map={map} warpPoints={warpPoints} />
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

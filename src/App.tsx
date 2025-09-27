import "./App.css";

import {
	createRoute,
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";

import { MapEditor } from "./pages/MapEditor/MapEditor";
import { map } from "./pages/Pallet/constants/map";
import { TILE_DATA, TILES } from "./pages/Pallet/constants/symbols";
import { warpPoints } from "./pages/Pallet/constants/warpPoints";
import { Pallet } from "./pages/Pallet/Pallet";
import { GameStateProvider } from "./pages/Pallet/providers/GameStateProvider";

const rootRoute = createRootRoute();
const gameRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "/",
	component: () => (
		<GameStateProvider>
			<Pallet map={map} warpPoints={warpPoints} />,
		</GameStateProvider>
	),
});
const mapEditorRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "editor",
	component: () => (
		<MapEditor
			tileOptions={TILE_DATA}
			tileSize="32px"
			getTileSymbol={(tile) => tile.type}
			getTileFromSymbol={(symbol) => TILES[symbol]}
			getTileLabel={(tile) => tile.label}
			getTileImgSrc={(tile) => tile.sprite}
		/>
	),
});

const routeTree = rootRoute.addChildren([gameRoute, mapEditorRoute]);
const router = createRouter({ routeTree });

function App() {
	return <RouterProvider router={router} />;
}

export default App;

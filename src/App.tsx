import "./App.css";

import {
	createRoute,
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";

// Router bundle size is way larger than what we save by code-splitting
// Still, prefer it to commenting/uncommenting code when I need to switch between editor and game
const rootRoute = createRootRoute();

const gameRoute = createRoute({ 
	getParentRoute: () => rootRoute, 
	path: "/" 
}).lazy(() => import('./pages/Pallet/routes').then((d) => d.Route));

const mapEditorRoute = createRoute({
	getParentRoute: () => rootRoute,
	path: "editor"
}).lazy(() => import('./pages/MapEditor/routes').then((d) => d.Route));

const routeTree = rootRoute.addChildren([gameRoute, mapEditorRoute]);

const router = createRouter({ routeTree });

function App() {
	return <RouterProvider router={router} />;
}

export default App;

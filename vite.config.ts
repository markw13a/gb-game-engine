import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	base: '/gb-game-engine/', // github pages url
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest-setup.js"],
	},
	resolve: {
		alias: {
			"@/": `${path.resolve(import.meta.dirname, "src")}/`,
		},
	},
});

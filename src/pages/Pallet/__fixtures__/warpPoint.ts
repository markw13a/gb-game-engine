import type { WarpPoint } from "@/types/map";

export const generateWarpPoint = (
	overrrides: Partial<WarpPoint> = {},
): WarpPoint => ({
	from: [1, 2],
	to: 5,
	...overrrides,
});

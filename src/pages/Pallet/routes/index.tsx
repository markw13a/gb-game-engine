import { Pallet } from "@/pages/Pallet/Pallet";
import { createLazyRoute } from "@tanstack/react-router";
import { GameStateProvider } from "../providers/GameStateProvider";

const ComponentWithContext = () => (
    <GameStateProvider>
        <Pallet />
    </GameStateProvider>
)

export const Route = createLazyRoute('/')({ component: ComponentWithContext })
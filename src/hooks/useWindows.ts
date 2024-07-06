import { useEffect, useState } from "react";
import { Dimension } from "../types/dimension";

export default function useWindowSize() {
    const [screen, setScreen] = useState<Dimension>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const onResise = () => {
            setScreen({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener("resize", onResise);
        return () => {
            window.removeEventListener("resize", onResise);
        };
    }, []);

    return screen;
}

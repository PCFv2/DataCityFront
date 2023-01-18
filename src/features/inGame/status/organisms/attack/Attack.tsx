import React, {Suspense} from "react";
import { ATTACK } from "src/constants";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";
import ErrorPage from "src/app/pages/main/ErrorPage";

const Eavesdropping = React.lazy(() => import("src/features/inGame/attack/Eavesdropping"))
const Phishing = React.lazy(() => import("src/features/inGame/attack/Phishing"))

const Attack = () => {
    const attackNb = Math.floor(Math.random() * ATTACK.nbAttacks);

    switch (attackNb) {
        case ATTACK.attacks.eavesdropping:
            return (
            <Suspense fallback={<OverlayLoader/>}>
                <Eavesdropping/>
            </Suspense>
            );
        case ATTACK.attacks.phishing:
            return (
                <Suspense fallback={<OverlayLoader/>}>
                    <Phishing/>
                </Suspense>
            );
        default:
            return (
                <ErrorPage/>
            );
    }
}

export default Attack;
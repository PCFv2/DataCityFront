import React, { Suspense, useEffect, useMemo, useState } from "react";
import { ATTACK } from "src/constants";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";
import ErrorPage from "src/app/pages/ErrorPage";

const Eavesdropping = React.lazy(
  () => import("src/features/inGame/attack/Eavesdropping")
);
const Phishing = React.lazy(
  () => import("src/features/inGame/attack/Phishing")
);
const StealthDowload = React.lazy(
  () => import("src/features/inGame/attack/StealthDownload")
);

const Attack = (props: AttackProps) => {
  /* responsive */
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const attackNb = useMemo(
    () => Math.floor(Math.random() * ATTACK.nbAttacks),
    []
  );

  switch (attackNb) {
    case ATTACK.attacks.eavesdropping:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <Eavesdropping handleFinishRound={props.handleFinishRound} />
        </Suspense>
      );
    case ATTACK.attacks.phishing:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <Phishing handleFinishRound={props.handleFinishRound} />
        </Suspense>
      );
    case ATTACK.attacks.stealthDownload:
      return (
        <Suspense fallback={<OverlayLoader />}>
          {width > 650 ? (
            <StealthDowload handleFinishRound={props.handleFinishRound} />
          ) : (
            <Eavesdropping handleFinishRound={props.handleFinishRound} />
          )}
        </Suspense>
      );

    default:
      return <ErrorPage />;
  }
};

export default React.memo(Attack);

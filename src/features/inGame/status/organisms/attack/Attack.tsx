import React, { Suspense, useMemo } from "react";
import { ATTACK } from "src/constants";
import OverlayLoader from "../../../../../UI-KIT/components/OverlayLoader";
import ErrorPage from "src/app/pages/main/ErrorPage";

const Eavesdropping = React.lazy(
  () => import("src/features/inGame/attack/Eavesdropping")
);
const Phishing = React.lazy(
  () => import("src/features/inGame/attack/Phishing")
);

type AttackProps = {
  handleFinishRound?: (
    round: number,
    userConfiguration?: UserConfigurationForm,
    night?: Night
  ) => void;
};

const Attack = (props: AttackProps) => {
  const attackNb = useMemo(
    () => Math.floor(Math.random() * ATTACK.nbAttacks),
    []
  );
  
  switch (attackNb) {
    case ATTACK.attacks.eavesdropping:
      return (
        <Suspense fallback={<OverlayLoader />}>
          {/* <Eavesdropping /> */}
          <Eavesdropping handleFinishRound={props.handleFinishRound} />
        </Suspense>
      );
    case ATTACK.attacks.phishing:
      return (
        <Suspense fallback={<OverlayLoader />}>
          <Phishing handleFinishRound={props.handleFinishRound} />
        </Suspense>
      );
    default:
      return <ErrorPage />;
  }
};

export default React.memo(Attack);

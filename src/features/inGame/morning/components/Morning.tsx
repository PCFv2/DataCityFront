import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";

const Morning = (props: {
  setDisplayComponent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <div>
      <h2>Une nouvelle journée se lève</h2>
      <p>{`Vous avez gagné ${
        user.nbPoints - user.lastNbPoints
      } points hier`}</p>
      <button onClick={() => props.setDisplayComponent("ConfigProfil")}>
        Modifier
      </button>
      <button>Jour suivant</button> {/* next round */}
    </div>
  );
};

export default Morning;

import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useGetUserByGameIdQuery,
  usePutGameByIdMutation,
} from "../../../services";
import OverlayLoader from "../../../UI-KIT/components/OverlayLoader";

const GameHost = () => {
  const params = useParams();
  const { register, handleSubmit } = useForm<HosterGameForm>();
  const [updateConfig, result] = usePutGameByIdMutation();
  const { gameId } = params;
  const { data: userInGame } = useGetUserByGameIdQuery(Number(gameId));

  const onSubmit = async (data: HosterGameForm) => {
    await updateConfig({ gameId: Number(gameId), ...data }); //Envoie des données saisies au back
    if (!result.isError) console.log("message d'erreur");
    /* Une fois la réponse du back, envoie des données au serveur */
  };
  if (result.isLoading) return <OverlayLoader />;
  return (
    <div>
      <div>
        Joueur dans la partie :
        {userInGame?.map((elm) => (
          <p key={elm.userId}>{elm.userId}</p>
        ))}
      </div>
      <div>
        <h2>Configuration de votre partie</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="maxPlayers" {...register("maxPlayers")} />
          <input placeholder="startNbPoints" {...register("startNbPoints")} />
          <input placeholder="difficulty" {...register("difficulty")} />
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default GameHost;

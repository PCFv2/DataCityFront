import React from "react";
import { useForm } from "react-hook-form";
import {
  useGetUserByGameIdQuery,
  usePutGameByIdMutation,
} from "../../../services";

const GameHost = () => {
  const { register, handleSubmit } = useForm<HosterGameForm>();
  const [updateConfig, result] = usePutGameByIdMutation();
  const { data: userInGame } = useGetUserByGameIdQuery(1);

  const onSubmit = async (data: HosterGameForm) => {
    await updateConfig({ gameId: 1, ...data }); //Envoie des données saisies au back
    if (!result.isError) console.log("message d'erreur");
    /* Une fois la réponse du back, envoie des données au serveur */
  };

  return (
    <div>
      <div>Joueur dans la partie :</div>
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

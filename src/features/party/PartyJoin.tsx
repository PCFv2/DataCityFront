import React from "react";

import { useForm } from "react-hook-form";

import { usePostJoinPartyByGameIdMutation } from "../../services";

const PartyJoin = () => {
  //mutation
  const [joinParty] = usePostJoinPartyByGameIdMutation();

  const { register, handleSubmit } = useForm<JoinPartyForm>();

  const onSubmit = (data: JoinPartyForm) => {
    console.log(data);
    joinParty(data.id)
      .unwrap()
      .then(/*  */)
      .catch(() => console.log("Cette partie est invalide"));
  };
  return (
    <div>
      <h1>Rejoindre une partie</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type={"number"} {...register("id")} />
        <input type={"text"} {...register("name")} />
        <button type="submit">Rejoindre la partie</button>
      </form>
    </div>
  );
};

export default PartyJoin;

import { store } from "../store";
import { roundSlice } from "../redux/roundSlice";

const getRound = (): Round => {
  const state = store.getState();
  return state.roundSlice;
}; /* get current value of state */

export const finishRound = (newRound: Round): boolean => {
  const oldRound: Round = getRound(); /* ancien round */
  if (
    newRound.roundId !== oldRound.roundId ||
    newRound.statusId !== oldRound.statusId
  ) {
    store.dispatch(
      roundSlice.actions.setRound(newRound)
    ); /* update value of state */
    return true;
  }
  return false;
};

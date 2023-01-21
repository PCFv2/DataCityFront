import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { getRandomWords } from "./services/phishing";

const Phishing = (props: AttackProps) => {
  const WIN =
    "Mettre sens pouvoir dans un mail le bon pour les mots malveillant créer "; // FAKE
  /* HOOK */
  const [wordsFind, setWordsFind] = useState<string[]>([]);
  const [hasWon, setHasWon] = useState<boolean>(false);

  /* redux */
  const round = useSelector((state: RootState) => state.roundSlice);

  const wordsList: string[] = [
    "Mettre ",
    "sens ",
    "pouvoir ",
    "dans ",
    "un mail ",
    "le bon ",
    "pour ",
    "les mots ",
    "malveillant ",
    "créer ",
  ];

  const words: string[] = useMemo(() => getRandomWords(wordsList), []);

  useEffect(() => {
    if (wordsFind.join("") === WIN) setHasWon(true);
  }, [wordsFind]);

  const handleFinish = (): void => {
    const resultAttack: Night = {
      night: {
        attackId: 1, //hameconnage
        effectiveness: hasWon ? 100 : 0,
      },
    };
    props.handleFinishRound!(round.statusId, undefined, resultAttack);
  };

  const handleClick = (word: string) => {
    let oldWords = [...wordsFind];
    if (!oldWords.includes(word)) {
      oldWords.push(word);
      setWordsFind(oldWords);
    } else {
      oldWords = oldWords.filter((elm) => elm !== word);
      setWordsFind(oldWords);
    }
  };

  /* a gagné */
  if (hasWon)
    return (
      <div>
        <button onClick={handleFinish}>Enregistrer</button>Vous avez trouvé la
        bonne phrase bravo !
      </div>
    );

  return (
    <div>
      <h2>Attaque: Phishing</h2>
      <p>Votre réponse : {wordsFind}</p>
      <div>
        {words.map((elm, index) => (
          <div key={index} onClick={() => handleClick(elm)}>
            {elm}
          </div>
        ))}
      </div>
      <button onClick={handleFinish}>Enregistrer</button>
    </div>
  );
};

export default React.memo(Phishing);

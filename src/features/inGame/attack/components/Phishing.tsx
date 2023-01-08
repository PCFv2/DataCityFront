import React, { useEffect, useMemo, useState } from "react";
import { getRandomWords } from "../services/getRandomWords";

const Phishing = () => {
  const WIN =
    "Mettre sens pouvoir dans un mail le bon pour les mots malveillant créer"; // FAKE
  /* HOOK */
  const [wordsFind, setWordsFind] = useState<string[]>([]);
  const [isWon, setIsWon] = useState<boolean>(false);

  const wordsList: string[] = [
    "Mettre",
    "sens",
    "pouvoir",
    "dans",
    "un mail",
    "le bon",
    "pour",
    "les mots",
    "malveillant",
    "créer",
  ];

  const words: string[] = useMemo(() => getRandomWords(wordsList), []);

  useEffect(() => {
    if (wordsFind.join(" ") === WIN) setIsWon(true);
  }, [wordsFind]);

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
      <p>Gagné : {isWon ? "true" : "false"}</p>
    </div>
  );
};

export default Phishing;

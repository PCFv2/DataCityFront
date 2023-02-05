import styled from "@emotion/styled";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { getRandomWords } from "./services/phishing";
import background from "src/assets/img/inGame/phishing/background.jpg";
import { SecondaryButton } from "src/UI-KIT/components/Button";
import { botSetFinished } from "src/features/bot/bot";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${background}) no-repeat center center fixed;
  background-size: cover;
  & p {
    margin: 0;
  }
  & button {
    margin: 50px auto;
  }
`;

const WordsContainer = styled.div`
  margin: 50px 10%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 1.1rem;
`;

const Box = styled.div<{ isSelected?: boolean }>`
  position: relative;
  background-color: ${(props) => props.theme.colors.primary.blue};
  border-radius: ${(props) => props.theme.radius.medium};
  border: 1px solid ${(props) => (props.isSelected ? "grey" : "white")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${(props) => props.theme.colors.primary.white};
  cursor: pointer;
  height: 16em;
  width: 14em;
  -webkit-box-shadow: 1px 1px 10px 1px #000000;
  box-shadow: 1px 1px 10px 1px #000000;
  transition: 0.3s;
  opacity: ${(props) => props.isSelected && "0.55"};
`;

const Rule = styled.p`
  font-size: 1.1rem;
  padding: 5px;
  border-radius: ${(props) => props.theme.radius.small};
  background-color: ${(props) => `${props.theme.colors.primary.white}A6`};
  font-weight: bold;
`;

const AttackType = styled.span`
  position: absolute;
  top: 10%;
  background-color: ${(props) => props.theme.colors.primary.lightBlue};
  color: black;
  width: 100%;
  text-align: center;
`;

const RuleContainer = styled.div`
  margin: 50px 10% 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Words = styled.p`
  font-style: italic;
  color: white;
  letter-spacing: 1.2px;
`;

const Phishing = (props: AttackProps) => {
  const WIN =
    "Mettre les mots dans le bon sens pour pouvoir créer un mail malveillant ";
  /* HOOK */
  const [wordsFind, setWordsFind] = useState<string[]>([]); /* words list */
  const [hasWon, setHasWon] = useState<boolean>(false);

  /* redux */
  const round = useSelector((state: RootState) => state.roundSlice);
  const game = useSelector((state: RootState) => state.gameSlice);
  const webSocketState = useSelector((state: RootState) => state.webSocket);
  const bot = useSelector((state: RootState) => state.botSlice);

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
        effectiveness: hasWon ? Math.floor(Math.random() * (100 - 80 + 1) + 80) : Math.floor(Math.random() * (20 + 1)), 
      },
    };
    props.handleFinishRound!(round.statusId, undefined, resultAttack);

    /* BOT */
    if (bot.botIsActive) {
      botSetFinished(game.gameId, webSocketState.webSocket!);
    }
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

  return (
    <Container>
      <RuleContainer>
        <Rule>
          {!hasWon
            ? "Mettez les mots dans l'ordre pour générer un mail malveillant"
            : "Vous avez trouvé la bonne phrase bravo ! Vous pouvez maintenant lancer votre attaque !"}
        </Rule>
        <Words>{wordsFind}.</Words>
      </RuleContainer>
      <WordsContainer>
        {words.map((elm, index) => (
          <Box
            key={index}
            onClick={() => handleClick(elm)}
            isSelected={wordsFind.includes(elm)}
          >
            <AttackType>Hameçonnage</AttackType>
            {elm}
          </Box>
        ))}
      </WordsContainer>
      <SecondaryButton onClick={handleFinish} content={"Enregistrer"} />
    </Container>
  );
};

export default React.memo(Phishing);

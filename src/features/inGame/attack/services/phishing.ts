const getRandomWord = (words: string[]): string => {
  return words[Math.round(Math.random() * (words.length - 1))];
};

export const getRandomWords = (words: string[]): string[] => {
  const finalWords: string[] = [];
  let wordChoice: string = getRandomWord(words);
  while (finalWords.length < words.length) {
    if (!finalWords.includes(wordChoice)) finalWords.push(wordChoice);
    wordChoice = getRandomWord(words);
  }
  return finalWords;
};

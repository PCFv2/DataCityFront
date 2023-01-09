export const generateFiles = (number: number): FileType[] => {
  const prevFiles: FileType[] = [];
  for (let i = 0; i < number; ++i) {
    const randomNumber: number = Math.round(Math.random() * 50);
    const isWrong: boolean = randomNumber % 2 ? true : false;
    const file: FileType = { isWrong: isWrong, id: i };
    prevFiles.push(file);
  }
  return prevFiles;
};

export const verifyWin = (files: FileType[]): boolean => {
  const d = files.filter((elm) => elm.isWrong === false).length;
  return !!d;
};

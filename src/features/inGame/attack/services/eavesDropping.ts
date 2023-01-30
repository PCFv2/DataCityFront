export const generateFiles = (number: number): FileType[] => {
  const prevFiles: FileType[] = [];
  for (let i = 0; i < number; ++i) {
    const minX: number = (window.innerWidth * 10) / 100;
    const maxX: number = minX + (window.innerWidth * 75) / 100 - minX;

    const minY: number = (window.innerHeight * 10) / 100;
    const maxY: number = minY + (window.innerHeight * 60) / 100 - minY;

    const randomNumberX: number = Math.floor(
      Math.random() * (maxX - minX + 1) + minX
    );
    const randomNumberY: number = Math.floor(
      Math.random() * (maxY - minY + 1) + minY
    );

    const isWrong: boolean = randomNumberX % 2 ? true : false;
    const file: FileType = {
      isWrong: isWrong,
      id: i,
      cordinateX: randomNumberX,
      cordinateY: randomNumberY,
    };
    prevFiles.push(file);
  }
  return prevFiles;
};

export const verifyWin = (files: FileType[]): boolean => {
  const d = files.filter((elm) => elm.isWrong === false).length;
  return !!d;
};

type FileType = {
  isWrong: boolean;
  id: number;
  cordinateX: number;
  cordinateY: number;
};

/* for maze */
type Position = {
  x: number;
  y: number;
};

type Wall = {
  type: "verticale" | "horizontale";
  position: Position;
  width?: number;
  height?: number;
};

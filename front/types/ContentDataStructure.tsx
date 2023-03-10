export interface ContentDataStructure {
  boards: BoardTypes[];
}

export interface BoardTypes {
  id: string | number;
  columnsOrder: (string | number)[];
  columns: ColumnTypes[];
}

export interface ColumnTypes {
  id: string | number;
  boardId: string | number;
  cardsOrder: (string | number)[];
  title: string;
  cards: CardTypes[];
}

export interface CardTypes {
  id: string | number;
  boardId: string | number;
  columnId: string | number;
  title: string;
  desc?: string;
}

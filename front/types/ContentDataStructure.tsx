export interface ContentDataStructure {
  boards: BoardTypes[];
}

export interface BoardTypes {
  _id: string;
  title: string;
  createdAt: number;
  updatedAt?: number | null;
  _destroy: boolean;
  columnsOrder?: string[] | null;
  columns: ColumnTypes[];
}

export interface ColumnTypes {
  _id: string;
  title: string;
  boardId: string;
  createdAt: number;
  updatedAt?: number | null;
  _destroy: boolean;
  cardsOrder?: string[] | null;
  cards: CardTypes[];
}

export interface CardTypes {
  _id: string;
  title: string;
  boardId: string;
  columnId: string;
  desc?: string | null;
  cover?: null;
  createdAt: number;
  updatedAt?: number | null;
  _destroy: boolean;
}

import { ContentDataStructure } from "types/ContentDataStructure";

export const DummyData: ContentDataStructure = {
  boards: [
    {
      id: "board-1",
      columnsOrder: [
        "column-1",
        "column-2",
        "column-3",
        "column-4",
        "column-5",
        "column-6",
        "column-7",
        "column-8",
      ],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "Todo-1",
          cardsOrder: ["card-1", "card-2", "card-3"],
          cards: [
            {
              id: "card-1",
              boardId: "board-1",
              columnId: "column-1",
              title: "Card1 Title",
              desc: "Cillum consequat proident amet laboris.",
            },
            {
              id: "card-2",
              boardId: "board-1",
              columnId: "column-1",
              title: "pneumonoultramicroscopicsilicovolcanoconiosis",
            },
            {
              id: "card-3",
              boardId: "board-1",
              columnId: "column-1",
              title: "Card3 Title",
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "Todo-2",
          cardsOrder: ["card-4"],
          cards: [
            {
              id: "card-4",
              boardId: "board-1",
              columnId: "column-2",
              title: "Card4 Title",
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "Todo-3",
          cardsOrder: [
            "card-5",
            "card-6",
            "card-7",
            "card-8",
            "card-9",
            "card-10",
            "card-11",
            "card-12",
            "card-13",
          ],
          cards: [
            {
              id: "card-5",
              boardId: "board-1",
              columnId: "column-3",
              title: "Card5 Title",
            },
            {
              id: "card-6",
              boardId: "board-1",
              columnId: "column-3",
              title: "Card6 Title",
              desc: "Voluptate pariatur aliqua nostrud ullamco. Anim id esse veniam nulla mollit in non duis pariatur voluptate exercitation. Occaecat sit quis consectetur nisi do consequat occaecat ea pariatur tempor. Do ipsum non occaecat amet minim ut in adipisicing adipisicing id eiusmod ea veniam. Sint officia in ex qui velit deserunt elit deserunt commodo fugiat pariatur dolore fugiat. Excepteur veniam nulla sit non do. Adipisicing voluptate cupidatat esse sit esse duis deserunt labore do.",
            },
            {
              id: "card-7",
              boardId: "board-1",
              columnId: "column-3",
              title: "Card7 Title",
            },
            {
              id: "card-8",
              boardId: "board-1",
              columnId: "column-3",
              title:
                "Card8 Title and Tempor aliquip cillum id in aute non. Deserunt aliquip commodo culpa est elit officia tempor. Officia culpa et incididunt laborum exercitation ipsum excepteur.",
            },
            {
              id: "card-9",
              boardId: "board-1",
              columnId: "column-3",
              title: "Card9 Title",
            },
            {
              id: "card-10",
              boardId: "board-1",
              columnId: "column-3",
              title:
                "Card10 Title and Aliquip aliqua proident excepteur duis dolore. In cillum sit ipsum nulla elit eu amet dolore tempor proident. Anim elit eiusmod exercitation non dolor Lorem incididunt aliquip ipsum aliqua dolore dolor. Exercitation ullamco veniam amet exercitation amet fugiat. Non sit laborum ut officia. Fugiat fugiat deserunt minim laboris tempor laboris culpa magna magna. Lorem cillum nulla officia aute exercitation reprehenderit eu cupidatat deserunt officia est sint duis sit. Ullamco eiusmod reprehenderit minim enim tempor nostrud duis quis et officia. Elit exercitation exercitation exercitation ut irure duis deserunt qui aliquip eu. Id ea reprehenderit eu esse ad enim qui amet labore ad. Nisi mollit magna sit adipisicing sint velit do non Lorem laborum esse est laborum. Quis amet velit minim excepteur sit do commodo aliquip nisi aliquip cupidatat veniam ut. Ullamco voluptate aute nostrud fugiat eiusmod dolore. Anim reprehenderit occaecat tempor adipisicing laborum nulla mollit. Velit veniam eu ullamco excepteur est duis nisi laboris. Ad reprehenderit cupidatat commodo fugiat minim proident cillum ea adipisicing.",
            },
            {
              id: "card-11",
              boardId: "board-1",
              columnId: "column-3",
              title: "Card11 Title",
            },
            {
              id: "card-12",
              boardId: "board-1",
              columnId: "column-3",
              title: "Card12 Title",
            },
            {
              id: "card-13",
              boardId: "board-1",
              columnId: "column-3",
              title: "Card13 Title",
            },
          ],
        },
        {
          id: "column-4",
          boardId: "board-1",
          title: "testesttes123",
          cardsOrder: [],
          cards: [],
        },
        {
          id: "column-5",
          boardId: "board-1",
          title: "testesttes123",
          cardsOrder: [],
          cards: [],
        },
        {
          id: "column-6",
          boardId: "board-1",
          title: "testesttes123",
          cardsOrder: [],
          cards: [],
        },
        {
          id: "column-7",
          boardId: "board-1",
          title: "testesttes123",
          cardsOrder: [],
          cards: [],
        },
        {
          id: "column-8",
          boardId: "board-1",
          title: "testesttes123",
          cardsOrder: [],
          cards: [],
        },
      ],
    },
  ],
};

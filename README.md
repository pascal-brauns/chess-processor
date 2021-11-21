# `chess-processor`

`chess-processor` is a JavaScript library for building chess applications.

---

## Installation

```
npm install chess-processor
```

---

## Contents

- [Overview](#overview)
- [API](#api)
  - [Action](#action)
  - [Board](#board)
  - [Castling](#castling)
  - [Color](#color)
  - [Promotion](#promotion)
  - [State](#state)
  - [Timeline](#timeline)
  - [Turn](#turn)

---

## Overview

`chess-processor` consists of 100% stateless functions. It was designed to ease the implementation of a chess application that may not only support local games but also remote games across different devices and playing against an AI. As a library it can be reused across different software components that may be part of a chess application. It defines all chess rules except the "en passant" rule (see [todos](./TODO.md)).

Having 100% test coverage `chess-processor` behaves exactly as expected.

---

## API

### `Action`

*The `Action`-module provides functions to create actions. It may also be used to retrieve information about an action.*

#### **`Action.target(action: Action): number`**

Returns the primary target index of an action.

Example
```
import { Action } from 'chess-processor';

const target = Action.target({
  type: 'move',
  from: {
    index: 52,
    piece: {
      type: 'pawn',
      id: 'white-pawn-4',
      color: 'white',
    }
  },
  to: {
    index: 43,
    piece: null
  }
});

console.log(target); // 43
```

#### **`Action.piece(action: Action): Piece`**

Returns the primary piece of an action.

Example
```
import { Action } from 'chess-processor';

const piece = Action.piece({
  type: 'move',
  from: {
    index: 52,
    piece: {
      type: 'pawn',
      id: 'white-pawn-4',
      color: 'white',
    }
  },
  to: {
    index: 43,
    piece: null
  }
});

console.log(piece);
/*
  {
    type: 'pawn',
    id: 'white-pawn-4',
    color: 'white'
  }
*/
```

#### **`Action.pick(field: Field): Pick`**

Returns a pick action.

Example
```
import { Action } from 'chess-processor';

const pick = Action.pick({
  index: 52,
  piece: {
    type: 'pawn',
    id: 'white-pawn-4',
    color: 'white',
  }
});

console.log(pick); 
/*
  {
    type: 'pick',
    field: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white',
      },
    }
  }
*/
```

#### **`Action.move(from: Field, to: Field): Move`**

Returns a move action.

Example
```
import { Action } from 'chess-processor';

const move = Action.move(
  {
    index: 52,
    piece: {
      type: 'pawn',
      id: 'white-pawn-4',
      color: 'white',
    }
  },
  {
    index: 43,
    piece: null
  }
);

console.log(move);
/*
  {
    type: 'move',
    from: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white',
      }
    },
    to: {
      index: 43,
      piece: null
    }
  }
*/
```

#### **`Action.castling(king: Move, rook: Move): Castling`**

Returns a castling action.

Example
```
import { Action } from 'chess-processor';

const castling = Action.castling(
  {
    type: 'move',
    from: {
      index: 60,
      piece: {
        type: 'king',
        id: 'white-king',
        color: 'white',
      }
    },
    to: {
      index: 62,
      piece: null
    }
  },
  {
    type: 'move',
    from: {
      index: 63,
      piece: {
        type: 'rook',
        id: 'white-rook-1',
        color: 'white'
      }
    },
    to: {
      index: 61,
      piece: null
    }
  }
);

console.log(castling);
/*
  {
    type: 'castling',
    king: {
      type: 'move',
      from: {
        index: 60,
        piece: {
          type: 'king',
          id: 'white-king',
          color: 'white',
        }
      },
      to: {
        index: 62,
        piece: null
      }
    },
    rook: {
      type: 'move',
      from: {
        index: 63,
        piece: {
          type: 'rook',
          id: 'white-rook-1',
          color: 'white'
        }
      },
      to: {
        index: 61,
        piece: null
      }
    }
  }
*/
```

#### **`Action.promotion(move: Move, piece: Piece): Promotion`**

Returns a promotion action.

Example
```
import { Action } from 'chess-processor';

const promotion = Action.promotion(
  {
    type: 'move',
    from: {
      index: 14,
      piece: {
        type: 'pawn',
        id: 'white-king',
        color: 'white',
      }
    },
    to: {
      index: 6,
      piece: null
    }
  },
  {
    type: 'queen',
    id: 'white-queen',
    color: 'white'
  }
);

console.log(promotion);
/*
  {
    type: 'promotion',
    move: {
      type: 'move',
      from: {
        index: 14,
        piece: {
          type: 'pawn',
          id: 'white-king',
          color: 'white',
        }
      },
      to: {
        index: 6,
        piece: null
      }
    },
    piece: {
      type: 'queen',
      id: 'white-queen',
      color: 'white'
    }
  }
*/
```

### `Board`

*The `Board`-module provides functions to apply changes to a board instance. It may also be used to retrieve information about parts of the board.*

#### **`Board.empty(board: Board, indices: number): boolean`**

Checks whether all passed indices on the board reference to fields on which no piece is present.

Example
```
import { Board } from 'chess-processor';

const notEmptyExample = Board.empty(
  [
    ...,
    {
      index: 9,
      piece: null
    },
    ...
    {
      index: 14,
      piece: {
        type: 'pawn',
        id: 'black-pawn-6',
        color: 'black'
      }
    },
    ...
  ],
  [9, 14]
);

console.log(notEmptyExample); // false

const emptyExample = Board.empty(
  [
    ...,
    {
      index: 9,
      piece: null
    },
    ...
    {
      index: 14,
      piece: null
    },
    ...
  ],
  [9, 14]
);

console.log(emptyExample); // true
```

#### **`Board.player(board: Board, color: Color): Field[]`**

Returns all fields on which a piece matching the passed color is present on a given board.

Example
```
import { Board } from 'chess-processor';

const fields = Board.player(
  [
    // empty fields ...
    {
      index: 9,
      piece: {
        type: 'pawn',
        id: 'black-pawn-1',
        color: 'black'
      }
    },
    {
      index: 10,
      piece: {
        type: 'pawn',
        id: 'black-pawn-2',
        color: 'black'
      }
    },
    {
      index: 11,
      piece: {
        type: 'pawn',
        id: 'black-pawn-3',
        color: 'black'
      }
    },
    // empty fields ...
    {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
  ],
  'black'
);

console.log(fields);
/*
  [
    {
      index: 9,
      piece: {
        type: 'pawn',
        id: 'black-pawn-1',
        color: 'black'
      }
    },
    {
      index: 10,
      piece: {
        type: 'pawn',
        id: 'black-pawn-2',
        color: 'black'
      }
    },
    {
      index: 11,
      piece: {
        type: 'pawn',
        id: 'black-pawn-3',
        color: 'black'
      }
    }
  ]
*/
```

#### **`Board.undo(board: Board, action: Action): Board`**

Reverts an action on the board.

Example
```
import { Board } from 'chess-processor';

const board = Board.player(
  [
    // empty fields ...
    {
      index: 44,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
    {
      index: 52,
      piece: null
    },
  ],
  {
    type: 'move',
    from: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
    to: {
      index: 44,
      piece: null
    }
  }
);

console.log(board);
/*
  [
    // empty fields ...
    {
      index: 44,
      piece: null
    },
    {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
  ]
*/
```

#### **`Board.apply(board: Board, action: Action): Board`**

Applies an action to a given board.

Example
```
import { Board } from 'chess-processor';

const board = Board.apply(
  [
    // empty fields ...
    {
      index: 44,
      piece: null
    },
    {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
  ],
  {
    type: 'move',
    from: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
    to: {
      index: 44,
      piece: null
    }
  }
);

console.log(board);
/*
  [
    // empty fields ...
    {
      index: 44,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
    {
      index: 52,
      piece: null
    },
  ]
*/
```

#### **`Board.valid(board: Board, turn: Color): boolean`**

Checks whether a board is in a valid state respecting the player in turn (passed as color).

Example
```
import { Board } from 'chess-processor';

const valid = Board.valid(
  [
    // empty fields ...
    {
      index: 24,
      piece: {
        type: 'queen',
        id: 'black-queen',
        color: 'black'
      }
    },
    // empty fields ...
    {
      index: 60,
      piece: {
        type: 'king',
        id: 'white-king',
        color: 'white'
      }
    },
    // empty fields ...
  ],
  'white'
);

console.log(valid); // false
```

### `Castling`

*The `Castling`-module provides functions to apply or undo castling actions. It may also be used to retrieve possible castling actions.*

#### **`Castling.actions(board: Board, timeline: Timeline, pick: Pick): Castling[]`**

Returns all possible castling actions for a pick (respecting the current board and timeline).

Example
```
import { Castling } from 'chess-processor';

const actions = Castling.actions(
  [
    // empty fields ...
    {
      index: 56,
      piece: {
        type: 'rook',
        id: 'white-rook-0',
        color: 'white'
      }
    },
    // empty fields ...
    {
      index: 60,
      piece: {
        type: 'king',
        id: 'white-king',
        color: 'white'
      }
    },
    // empty fields ...
    {
      index: 63,
      piece: {
        type: 'rook',
        id: 'white-rook-1',
        color: 'white'
      }
    }
  ],
  { history: [], future: [] },
  {
    type: 'pick',
    field: {
      index: 60,
      piece: {
        type: 'king',
        id: 'white-king',
        color: 'white'
      }
    }
  }
);

console.log(actions);
/*
  [
    {
      type: 'castling',
      king: {
        type: 'move',
        from: {
          index: 60,
          piece: {
            type: 'king',
            id: 'white-king',
            color: 'white'
          }
        },
        to: {
          index: 58,
          piece: null
        },
      },
      rook: {
        type: 'move',
        from: {
          index: 56,
          piece: {
            type: 'rook',
            id: 'white-rook-0',
            color: 'white'
          }
        },
        to: {
          index: 59,
          piece: null
        },
      }
    },
    {
      type: 'castling',
      king: {
        type: 'move',
        from: {
          index: 60,
          piece: {
            type: 'king',
            id: 'white-king',
            color: 'white'
          }
        },
        to: {
          index: 62,
          piece: null
        },
      },
      rook: {
        type: 'move',
        from: {
          index: 63,
          piece: {
            type: 'rook',
            id: 'white-rook-1',
            color: 'white'
          }
        },
        to: {
          index: 61,
          piece: null
        },
      }
    }
  ]
*/
```

#### **`Castling.apply(board: Board, castling: Castling): Board`**

Applies a castling action to a board and returns the resulting board.

Example
```
import { Castling } from 'chess-processor';

const board = Castling.apply(
  [
    // empty fields ...
    {
      index: 56,
      piece: {
        type: 'rook',
        id: 'white-rook-0',
        color: 'white'
      }
    },
    // empty fields ...
    {
      index: 60,
      piece: {
        type: 'king',
        id: 'white-king',
        color: 'white'
      }
    },
    // empty fields ...
    {
      index: 63,
      piece: {
        type: 'rook',
        id: 'white-rook-1',
        color: 'white'
      }
    }
  ],
  {
    type: 'castling',
    king: {
      type: 'move',
      from: {
        index: 60,
        piece: {
          type: 'king',
          id: 'white-king',
          color: 'white'
        }
      },
      to: {
        index: 58,
        piece: null
      },
    },
    rook: {
      type: 'move',
      from: {
        index: 56,
        piece: {
          type: 'rook',
          id: 'white-rook-0',
          color: 'white'
        }
      },
      to: {
        index: 59,
        piece: null
      },
    }
  }
);

console.log(board);
/*
  [
    // empty fields ...
    {
      index: 58,
      piece: {
        type: 'king',
        id: 'white-king',
        color: 'white'
      }
    },
    {
      index: 59,
      piece: {
        type: 'rook',
        id: 'white-rook-0',
        color: 'white'
      }
    },
    // empty fields ...
    {
      index: 63,
      piece: {
        type: 'rook',
        id: 'white-rook-1',
        color: 'white'
      }
    }
  ]
*/
```

#### **`Castling.undo(board: Board, castling: Castling): Board`**

Reverts a castling action and returns the resulting board.

Example
```
import { Castling } from 'chess-processor';

const board = Castling.undo(
  [
    // empty fields...
    {
      index: 58,
      piece: {
        type: 'king',
        id: 'white-king',
        color: 'white'
      }
    },
    {
      index: 59,
      piece: {
        type: 'rook',
        id: 'white-rook-0',
        color: 'white'
      }
    },
    // empty fields...
    {
      index: 63,
      piece: {
        type: 'rook',
        id: 'white-rook-1',
        color: 'white'
      }
    }
  ],
  {
    type: 'castling',
    king: {
      type: 'move',
      from: {
        index: 60,
        piece: {
          type: 'king',
          id: 'white-king',
          color: 'white'
        }
      },
      to: {
        index: 58,
        piece: null
      },
    },
    rook: {
      type: 'move',
      from: {
        index: 56,
        piece: {
          type: 'rook',
          id: 'white-rook-0',
          color: 'white'
        }
      },
      to: {
        index: 59,
        piece: null
      },
    }
  }
);

console.log(board);
/*
  [
    // empty fields...
    {
      index: 56,
      piece: {
        type: 'rook',
        id: 'white-rook-0',
        color: 'white'
      }
    },
    // empty fields...
    {
      index: 60,
      piece: {
        type: 'king',
        id: 'white-king',
        color: 'white'
      }
    },
    // empty fields...
    {
      index: 63,
      piece: {
        type: 'rook',
        id: 'white-rook-1',
        color: 'white'
      }
    }
  ]
*/
```

### `Color`

*The `Color`-module provides functions to compute the opposite of a color, the color of a field, the color of the player in turn or the color of the winner.*

#### **`Color.opposite(color: Color): Color`**

Returns the opposite player color other than the passed one.

Example
```
import { Color } from 'chess-processor';

const opposite = Color.opposite('white');

console.log(opposite); // 'black'
```

#### **`Color.field(position: Cartesian): Color`**

Returns the color of a field at a given (cartesian) position.

Example
```
import { Color } from 'chess-processor';

console.log(Color.field({ x: 0, y: 0 })); // 'white'
console.log(Color.field({ x: 1, y: 0 })); // 'black'
console.log(Color.field({ x: 0, y: 1 })); // 'black'
```

#### **`Color.turn(timeline: Timeline): Color`**

Returns the color of the player in turn.

Example
```
import { Color } from 'chess-processor';
import { Timeline } from 'Type';

const initial: Timeline = {
  history: [],
  future: []
};

console.log(Color.turn(initial)); // 'white'

const turn = Color.turn({
  history: [
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4',
          color: 'white'
        }
      },
      to: {
        index: 44,
        piece: null
      }
    }
  ],
  future: []
});
console.log(turn); // 'black'
```

#### **`Color.winner(timeline: Timeline, actions: Action[]): Color`**

Returns the color of the player who has won the match (or null if there is no winner yet).

Example
```
import { Color } from 'chess-processor';

const turn = Color.winner(
  {
    history: [
      // previous actions... -> 'white' is in turn
    ],
    future: []
  },
  []
);

console.log(turn); // 'black'
```

### `Move`

*The `Move`-module provides functions to apply or undo move actions.*

#### **`Move.apply(board: Board, move: Move): Board`**

Applies a move to a board and returns the resulting board.

Example
```
import { Move } from 'chess-processor';

const board = Move.apply(
  [
    // empty fields...
    {
      index: 44,
      piece: null
    },
    {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    }
  ],
  {
    type: 'move',
    from: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
    to: {
      index: 44,
      piece: null
    }
  }
);

console.log(board);
/*
  [
    // empty fields...
    {
      index: 44,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
    {
      index: 52,
      piece: null
    }
  ]
*/
```

#### **`Move.undo(board: Board, move: Move): Board`**

Reverts a move and returns the resulting board.

Example
```
import { Move } from 'chess-processor';

const board = Move.undo(
  [
    // empty fields...
    {
      index: 44,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
    {
      index: 52,
      piece: null
    }
  ],
  {
    type: 'move',
    from: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    },
    to: {
      index: 44,
      piece: null
    }
  }
);

console.log(board);
/*
  [
    // empty fields...
    {
      index: 44,
      piece: null
    },
    {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4',
        color: 'white'
      }
    }
  ]
*/
```

### `Promotion`

*The `Promotion`-module provides functions to apply of undo promotion actions.*

#### **`Promotion.apply(board: Board, promotion: Promotion): Board`**

Applies a promotion action and returns the resulting board.

Example
```
import { Promotion } from 'chess-processor';

const board = Promotion.apply(
  [
    // empty fields...
    {
      index: 14,
      piece: {
        type: 'pawn',
        id: 'white-pawn-6',
        color: 'white'
      }
    },
    {
      index: 6,
      piece: null
    }
  ],
  {
    type: 'promotion',
    move: {
      from: {
        index: 14,
        piece: {
          type: 'pawn',
          id: 'white-pawn-6',
          color: 'white'
        }
      },
      to: {
        index: 6,
        piece: null
      }
    },
    piece: {
      type: 'queen',
      id: 'white-queen',
      color: 'white'
    }
  }
);

console.log(board);
/*
  [
    // empty fields ...
    {
      index: 14,
      piece: null
    },
    {
      index: 6,
      piece: {
        type: 'queen',
        id: 'white-queen',
        color: 'white'
      }
    }
  ]
*/
```

#### **`Promotion.undo(board: Board, promotion: Promotion): Board`**

Reverts a promotion action and returns the resulting board.

Example
```
import { Promotion } from 'chess-processor';

const board = Promotion.undo(
  [
    // empty fields ...
    {
      index: 14,
      piece: null
    },
    {
      index: 6,
      piece: {
        type: 'queen',
        id: 'white-queen',
        color: 'white'
      }
    }
  ],
  {
    type: 'promotion',
    move: {
      from: {
        index: 14,
        piece: {
          type: 'pawn',
          id: 'white-pawn-6',
          color: 'white'
        }
      },
      to: {
        index: 6,
        piece: null
      }
    },
    piece: {
      type: 'queen',
      id: 'white-queen',
      color: 'white'
    }
  }
);

console.log(board);
/*
  [
    // empty fields ...
    {
      index: 14,
      piece: {
        type: 'pawn',
        id: 'white-pawn-6',
        color: 'white'
      }
    },
    {
      index: 6,
      piece: null
    }
  ]
*/
```

### `State`

*The `State`-module provides functions to apply changes to an existing chess state instance by dispatching actions or going forward and backward in the game history. \
It may also be used to create an initial chess state instance.*

#### **`State.initial(): State`**

Creates a new state object. All pieces will be set to their initial position on the board.

Example
```
import { State } from 'chess-processor';

const state = State.initial();

console.log(state);
/*
  {
    board: [
      {
        index: 0,
        piece: {
          type: 'rook',
          id: 'black-rook-0'
          color: 'black'
        }
      },
      {
        index: 1,
        piece: {
          type: 'bishop',
          id: 'black-bishop-0'
          color: 'black'
        }
      }
      // initial fields with black pieces ...
      {
        index: 16,
        piece: null
      },
      // initial fields without pieces ...
      {
        index: 48,
        piece: {
          type: 'pawn',
          id: 'white-pawn-0'
          color: 'white'
        }
      }
      // initial fields with white pieces ...
    ],
    timeline: {
      history: [],
      future: []
    },
    actions: [
      {
        type: 'move',
        from: {
          index: 48,
          piece: {
            type: 'pawn',
            id: 'white-pawn-0'
            color: 'white'
          }
        },
        to: {
          index: 40,
          piece: null
        }
      },
      {
        type: 'move',
        from: {
          index: 48,
          piece: {
            type: 'pawn',
            id: 'white-pawn-0'
            color: 'white'
          }
        },
        to: {
          index: 32,
          piece: null
        }
      },
      // initial moves ...
    ]
  }
*/
```

#### **`State.undo(state: State): State`**

If present the last dispatched action will be undone. The action will be saved in the timeline of the state object. If desired the action can be redone.

Example
```
import { State } from 'chess-processor';

const state = State.undo({
  board: [
    // fields ...
    {
      index: 44,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4'
        color: 'white'
      }
    },
    {
      index: 52,
      piece: null
    }
  ],
  timeline: {
    history: [
      {
        type: 'move',
        from: {
          index: 52,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 44,
          piece: null
        }
      }
    ],
    future: []
  },
  actions: [
    {
      type: 'move',
      from: {
        index: 44,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 36,
        piece: null
      }
    },
    // more possible actions ...
  ]
});

console.log(state);
/*
  {
    board: [
      // fields ...
      {
        index: 44,
        piece: null
      },
      {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      }
    ],
    timeline: {
      history: [],
      future: [
        {
          type: 'move',
          from: {
            index: 52,
            piece: {
              type: 'pawn',
              id: 'white-pawn-4'
              color: 'white'
            }
          },
          to: {
            index: 44,
            piece: null
          }
        }
      ]
    },
    actions: [
      {
        type: 'move',
        from: {
          index: 52,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 44,
          piece: null
        }
      },
      // more possible actions ...
    ]
  }
*/
```

#### **`State.redo(state: State): State`**

If present the last undone action will be applied again. Other undone actions will be left untouched.

Example
```
import { State } from 'chess-processor';

const state = State.redo({
  board: [
    // fields ...
    {
      index: 44,
      piece: null
    },
    {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4'
        color: 'white'
      }
    }
  ],
  timeline: {
    history: [],
    future: [
      {
        type: 'move',
        from: {
          index: 52,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 44,
          piece: null
        }
      }
    ]
  },
  actions: [
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 44,
        piece: null
      }
    },
    // more possible actions ...
  ]
});

console.log(state);
/*
  {
    board: [
      // fields ...
      {
        index: 44,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      {
        index: 52,
        piece: null
      }
    ],
    timeline: {
      history: [
        {
          type: 'move',
          from: {
            index: 52,
            piece: {
              type: 'pawn',
              id: 'white-pawn-4'
              color: 'white'
            }
          },
          to: {
            index: 44,
            piece: null
          }
        }
      ],
      future: []
    },
    actions: [
      {
        type: 'move',
        from: {
          index: 44,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 36,
          piece: null
        }
      },
      // more possible actions ...
    ]
  }
*/
```

#### **`State.dispatch(state: State, action: Action): State`**

Dispatches an action to the passed state object and returns the resulting next state object. Saved undone actions will be removed.

Example
```
import { State } from 'chess-processor';

const state = {
  board: [
    // fields ...
    {
      index: 44,
      piece: null
    },
    {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4'
        color: 'white'
      }
    }
  ],
  timeline: {
    history: [],
    future: [
      {
        type: 'move',
        from: {
          index: 51,
          piece: {
            type: 'pawn',
            id: 'white-pawn-3'
            color: 'white'
          }
        },
        to: {
          index: 43,
          piece: null
        }
      }
    ]
  },
  actions: [
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 44,
        piece: null
      }
    },
    // more possible actions ...
  ]
};

const next = State.dispatch(state, {
  type: 'move',
  from: {
    index: 52,
    piece: {
      type: 'pawn',
      id: 'white-pawn-4'
      color: 'white'
    }
  },
  to: {
    index: 44,
    piece: null
  }
});

console.log(next);
/*
  {
    board: [
      // fields ...
      {
        index: 44,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      {
        index: 52,
        piece: null
      }
    ],
    timeline: {
      history: [
        {
          type: 'move',
          from: {
            index: 52,
            piece: {
              type: 'pawn',
              id: 'white-pawn-4'
              color: 'white'
            }
          },
          to: {
            index: 44,
            piece: null
          }
        }
      ],
      future: []
    },
    actions: [
      {
        type: 'move',
        from: {
          index: 44,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 36,
          piece: null
        }
      },
      // more possible actions ...
    ]
  }
*/
```

### `Timeline`

*The `Timeline`-module provides functions to apply changes to a timeline instance. It may also be used to check the initial states of pieces.*

#### **`Timeline.backward(timeline: Timeline): Timeline`**

Moves the last action from the history to the future.

Example
```
import { Timeline } from 'chess-processor';

const timeline = Timeline.backward({
  history: [
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 44,
        piece: null
      }
    }
  ],
  future: []
});

console.log(timeline);
/*
  {
    history: [],
    future: [
      {
        type: 'move',
        from: {
          index: 52,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 44,
          piece: null
        }
      }
    ]
  }
*/
```

#### **`Timeline.forward(timeline: Timeline): Timeline`**

Moves the next future action to the history.

Example
```
import { Timeline } from 'chess-processor';

const timeline = Timeline.forward({
  history: [],
  future: [
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 44,
        piece: null
      }
    }
  ]
});

console.log(timeline);
/*
  {
    history: [
      {
        type: 'move',
        from: {
          index: 52,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 44,
          piece: null
        }
      }
    ],
    future: []
  }
*/
```

#### **`Timeline.dispatch(timeline: Timeline, action: Action): Timeline`**

Adds a placement-action to the history and removes all undone future actions.

Example
```
import { Timeline } from 'chess-processor';

const timeline = Timeline.dispatch(
  {
    history: [],
    future: [
      {
        type: 'move',
        from: {
          index: 51,
          piece: {
            type: 'pawn',
            id: 'white-pawn-3'
            color: 'white'
          }
        },
        to: {
          index: 43,
          piece: null
        }
      }
    ]
  },
  {
    type: 'move',
    from: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4'
        color: 'white'
      }
    },
    to: {
      index: 44,
      piece: null
    }
  }
);

console.log(timeline);
/*
  {
    history: [
      {
        type: 'move',
        from: {
          index: 52,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 44,
          piece: null
        }
      }
    ],
    future: []
  }
*/
```

#### **`Timeline.initial(timeline: Timeline, pieces: Piece[]): boolean`**

Checks whether all passed pieces were untouched in a given timeline (only respecting the history).

Example
```
import { Timeline } from 'chess-processor';

const initial = Timeline.initial(
  {
    history: [
      {
        type: 'move',
        from: {
          index: 52,
          piece: {
            type: 'pawn',
            id: 'white-pawn-4'
            color: 'white'
          }
        },
        to: {
          index: 42,
          piece: null
        }
      }
    ],
    future: []
  },
  [
    {
      type: 'pawn',
      id: 'white-pawn-4'
      color: 'white'
    }
  ]
);

console.log(initial) // false;
```

### `Turn`

*The `Turn`-module provides functions to retieve possible actions for given board, timeline and pick parameters.*

#### **`Turn.actions(board: Board, timeline: Timeline, pick: Pick = null): Record<number, Action>`**

Returns all possible actions for a passed state object as records (also known as hashmap). The keys of the records match the indices of the board array.

Example
```
import { Turn } from 'chess-processor';

const actions = Turn.actions(
  [
    // fields ...
  ],
  { history: [], future: [] },
  {
    type: 'pick',
    field: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4'
        color: 'white'
      }
    }
  }
);

console.log(actions);
/*
  [
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 44,
        piece: null
      }
    },
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 36,
        piece: null
      }
    },
    {
      type: 'pick',
      field: {
        index: 51,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      }
    },
    {
      type: 'pick',
      field: {
        index: 50,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      }
    },
    // ... more actions
  ]
*/
```

#### **`Turn.placements(board: board, timeline: Timeline, pick: Pick): Placement[]`**

Returns all possible placements for a pick (respecting the current board and timeline).

Example
```
import { Turn } from 'chess-processor';

const actions = Turn.placements(
  [
    // fields ...
  ],
  { history: [], future: [] },
  {
    type: 'pick',
    field: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4'
        color: 'white'
      }
    }
  }
);

console.log(actions);
/*
  [
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 44,
        piece: null
      }
    },
    {
      type: 'move',
      from: {
        index: 52,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      },
      to: {
        index: 36,
        piece: null
      }
    }
  ]
*/
```

#### **`Turn.picks(board: board, timeline: Timeline): Pick[]`**

Returns all possible picks (respecting the current board and timeline).

Example
```
import { Turn } from 'chess-processor';

const actions = Turn.actions(
  [
    // fields ...
  ],
  { history: [], future: [] },
  {
    type: 'pick',
    field: {
      index: 52,
      piece: {
        type: 'pawn',
        id: 'white-pawn-4'
        color: 'white'
      }
    }
  }
);

console.log(actions);
/*
  [
    {
      type: 'pick',
      field: {
        index: 51,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      }
    },
    {
      type: 'pick',
      field: {
        index: 50,
        piece: {
          type: 'pawn',
          id: 'white-pawn-4'
          color: 'white'
        }
      }
    },
    // ... more picks
  ]
*/
```
import * as React from 'react';
import { useState } from 'react';

import Player from '@/types/player';

import Square from './Square';

export interface BoardProps {
    squares: Array<Player|undefined>,
    onClick: Function
};

export default function Board(props: BoardProps): JSX.Element {

    const renderSquare = (i: number): JSX.Element => {
        return (
            <Square
              value={props.squares[i]}
              onClick={() => props.onClick(i)}
            />
        );
    };

    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

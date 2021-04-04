import * as React from 'react';
import { useState } from 'react';

import Player from '@/types/player';

import Board from './Board';

interface Move {
    squares: Array<Player|undefined>,
    nextPlayer: Player
}

export default function Game(): JSX.Element {
    const [ nextPlayer, setNextPlayer ] = useState<Player>(Player.X);
    const [ history, setHistory ] = useState<Array<Move>>([{ squares: Array(9).fill(undefined), nextPlayer }])

    const determineNextPlayer = (): Player => {
        return nextPlayer == Player.X ? Player.O : Player.X;
    };

    const getWinningLines = (): Array<Array<number>> => {
        const horizontal = [0, 3, 6].map(i => [i, i+1, i+2]);
        const vertical = [0, 1, 2].map(i => [i, i+3, i+6]);
        const diagonal = [[0, 4, 8], [2, 4, 6]]

        return [].concat(horizontal).concat(vertical).concat(diagonal);
    };

    const calculateWinner = (grid: Array<Player|undefined>): Player|undefined => {
        const lines = getWinningLines();

        for (var line of lines) {
            const [a, b, c] = line;
            if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
                return grid[a];
            }
        }

        return undefined;
    }

    const jumpTo = (index: number) => {
        const move = history[index];
        const newHistory = history.slice(0, index + 1);
        setHistory(newHistory);
        setNextPlayer(move.nextPlayer);
    }

    const moves = history.map((_: Move, index: number) => {
        const desc = index ? `Go to move #${index}` : "Go to game start";
        return (
            <li key={index}>
              <button onClick={ () => jumpTo(index) }>{desc}</button>
            </li>
        );
    });

    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const handleClick = (i: number): void => {
        const squares = current.squares.slice();
        if (winner || squares[i]) return;
        squares[i] = nextPlayer;
        const move: Move = {squares, nextPlayer: determineNextPlayer() }
        setHistory(history.concat([move]));
        setNextPlayer(move.nextPlayer);
    };

    const status = winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`;
    return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={ (i: number) => handleClick(i) }
              />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>{moves}</div>
          </div>
        </div>
    );
}

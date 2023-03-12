import { useState } from "react";
import calculateWinner from "../helpers/calculate-winner";
import Board from "./Board";

type gameStateType = {
  history: { squares: (string | null)[] }[],
  xIsNext: boolean,
  stepNumber: number
}

export default function Game() {
  const [gameState, setGameState] = useState<gameStateType>({ history: [{ squares: Array(9).fill(null) }], xIsNext: true, stepNumber: 0 });

  const history = gameState.history;
  const current = history[gameState.stepNumber];
  const winner = calculateWinner(current.squares)

  const jumpTo = (step: number) => {
    setGameState({history: gameState.history, xIsNext: (step % 2) === 0, stepNumber: step})
  }

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'To game start';

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  let status: string;

  if (winner) {
    status = 'Winner ' + winner;
  } else {
    status = 'Next player: ' + (gameState.xIsNext ? 'X' : 'O');
  }

  const handleClick = (i: number) => {
    const history = gameState.history.slice(0, gameState.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = gameState.xIsNext ? 'X' : 'O';

    setGameState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !gameState.xIsNext,
      stepNumber: history.length
    })
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
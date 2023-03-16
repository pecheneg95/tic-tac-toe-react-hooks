import { useState } from "react";

import Board from "./Board";
import Moves from "./Moves";

import calculateWinner from "../helpers/calculate-winner";
import setStatus from "../helpers/setStatus";

export default function Game() {
  const [gameHistory, setGameHistory] = useState<(string | null)[][]>([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const jumpTo = (step: number) => {
    setXIsNext(step % 2 === 0);
    setStepNumber(step);
  }

  const handleClick = (i: number) => {
    const history = gameHistory.slice(0, stepNumber + 1);
    const currentBoard = history[history.length - 1];
    const squares = [...currentBoard];

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = xIsNext ? 'X' : 'O';

    setGameHistory(history.concat([squares]))
    setXIsNext(!xIsNext);
    setStepNumber(history.length);
  }

  const currentBoard = gameHistory[stepNumber];
  const winner = calculateWinner(currentBoard)

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentBoard} onClick={handleClick} />
      </div>
      <div className="game-info">
        <div>{setStatus(winner, xIsNext)}</div>
        <Moves history={gameHistory} onClick={jumpTo} />
      </div>
    </div>
  );
}
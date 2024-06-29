import React from "react";
import "../index.css";

interface IGameBoardProps {
  handleClickedSquare: (row: number, column: number) => void;
  board: any[][];
}

export default function GameBoard(props: IGameBoardProps) {
  const { handleClickedSquare, board } = props;

  function onClickedSquare(row: number, column: number) {
    handleClickedSquare(row, column);
  }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((symbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onClickedSquare(rowIndex, colIndex)}
                  disabled={!!symbol}
                >
                  {symbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}

import "../index.css";
import Players from "./Players";
import React, { useState } from "react";
import GameBoard from "./GameBoard";
import { GameBoardValue } from "../interfaces/game-board-value.interface";
import { PlayerSymbol } from "../enums/player-symbol.enum";
import { PlayerDetails } from "../interfaces/player.interface";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import GameOver from "./GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState<number>(0);
  const [turns, setTurns] = useState<GameBoardValue[]>([]);
  const symbols = [PlayerSymbol.X, PlayerSymbol.O];
  const players: PlayerDetails[] = [
    { name: "Player 1", symbol: PlayerSymbol.X },
    { name: "Player 2", symbol: PlayerSymbol.O },
  ];

  // This is called deriving state. We extract the game board values based on the received data.
  let gameBoard: any[][] = [...initialGameBoard.map((x) => [...x])];

  turns.forEach((value) => {
    gameBoard[value.position.row][value.position.column] = value.playerSymbol;
  });

  const getWinner = (gameBoard): string | undefined => {
    let winner: string | undefined;
    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column];
      if (
        firstSquareSymbol &&
        firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol
      ) {
        winner = firstSquareSymbol;
      }
    }

    return winner;
  };

  const winner = getWinner(gameBoard);
  const hasDraw = turns.length == 9 && !winner;

  const handleClickedSquare = (rowIndex: number, columnIndex: number): void => {
    setCurrentSymbolIndex((prev) => (!prev ? 1 : 0));

    setTurns((prev) => {
      let currentPlayer = PlayerSymbol.X;
      if (prev.length > 0 && prev[0].playerSymbol === PlayerSymbol.X) {
        currentPlayer = PlayerSymbol.O;
      }
      const updatedTurns: GameBoardValue[] = [
        {
          position: { row: rowIndex, column: columnIndex },
          playerSymbol: currentPlayer,
        },
        ...prev,
      ];
      return updatedTurns;
    });
  };

  const resetGame = (): void => {
    setCurrentSymbolIndex(0);
    setTurns([]);
  };

  return (
    <main>
      <div id="game-container">
        <Players
          players={players}
          currentPlayerSymbol={symbols[currentSymbolIndex]}
        />
        {(winner || hasDraw) && (
          <GameOver reset={resetGame} winnerSymbol={winner} />
        )}
        <GameBoard
          handleClickedSquare={handleClickedSquare}
          board={gameBoard}
        />
      </div>
    </main>
  );
}

export default App;

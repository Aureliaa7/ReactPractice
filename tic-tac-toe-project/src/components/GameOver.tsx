import React from "react";
import "../index.css";

interface IGameOverProps {
  winnerSymbol: string | undefined;
  reset: () => void;
}

export default function GameOver(props: IGameOverProps) {
  const { winnerSymbol, reset } = props;

  return (
    <div id="game-over">
      <h2> Game over!</h2>
      {winnerSymbol ? <h3>You won, {winnerSymbol}!</h3> : <p>It's a draw!</p>}
      <p>
        <button onClick={reset}>Play again</button>
      </p>
    </div>
  );
}

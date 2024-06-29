import React from "react";
import Player from "./Player";
import { PlayerDetails } from "../interfaces/player.interface";

interface IPlayersProps {
  currentPlayerSymbol: string;
  players: PlayerDetails[];
}

export default function Players(props: IPlayersProps) {
  const { currentPlayerSymbol, players } = props;

  return (
    <ol id="players" className="highlight-player">
      {players.map((x) => (
        <Player
          key={x.symbol}
          isActive={currentPlayerSymbol === x.symbol}
          name={x.name}
          symbol={x.symbol}
        />
      ))}
    </ol>
  );
}

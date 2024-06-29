import React, { useState } from "react";
import { PlayerDetails } from "../interfaces/player.interface";

export interface IPlayerProps extends PlayerDetails {
  isActive: boolean;
}

export default function Player(props: IPlayerProps) {
  const { symbol, isActive } = props;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(props.name);

  function toggleNameEditing() {
    setIsEditing((prevState) => !prevState);
  }

  function handleChangedInput(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={name}
            onChange={handleChangedInput}
          />
        ) : (
          <span className="player-name">{name}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={toggleNameEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}

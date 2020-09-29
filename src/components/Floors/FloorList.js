import React from "react";

import FloorItem from "./FloorItem";

const FloorList = ({ authUser, floors, onEditFloor, onRemoveFloor }) => (
  <ul>
    {floors.map((floor) => (
      <FloorItem
        authUser={authUser}
        key={floor.uid}
        floor={floor}
        onEditFloor={onEditFloor}
        onRemoveFloor={onRemoveFloor}
      />
    ))}
  </ul>
);

export default FloorList;

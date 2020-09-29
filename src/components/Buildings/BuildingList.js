import React from 'react';

import BuildingItem from './BuildingItem';

const BuildingList = ({
  authUser,
  buildings,
  onEditBuilding,
  onRemoveBuilding,
}) => (
  <ul>
    {buildings.map((building) => (
      <BuildingItem
        authUser={authUser}
        key={building.uid}
        building={building}
        onEditBuilding={onEditBuilding}
        onRemoveBuilding={onRemoveBuilding}
      />
    ))}
  </ul>
);

export default BuildingList;

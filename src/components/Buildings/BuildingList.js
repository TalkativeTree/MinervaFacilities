import React from 'react';

import BuildingItem from './BuildingItem';

const BuildingList = ({
  authUser,
  companyID,
  buildings,
  onEditBuilding,
  onRemoveBuilding,
}) => (
  <ul>
    {buildings.map((building) => (
      <BuildingItem
        authUser={authUser}
        companyID={companyID}
        key={building.uid}
        building={building}
        onEditBuilding={onEditBuilding}
        onRemoveBuilding={onRemoveBuilding}
      />
    ))}
  </ul>
);

export default BuildingList;

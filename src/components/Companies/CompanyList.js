import React from "react";

import CompanyItem from "./CompanyItem";

const CompanyList = ({
  authUser,
  companies,
  onEditCompany,
  onRemoveCompany,
}) => (
  <ul>
    {companies.map((company) => (
      <CompanyItem
        authUser={authUser}
        key={company.uid}
        company={company}
        onEditCompany={onEditCompany}
        onRemoveCompany={onRemoveCompany}
      />
    ))}
  </ul>
);

export default CompanyList;

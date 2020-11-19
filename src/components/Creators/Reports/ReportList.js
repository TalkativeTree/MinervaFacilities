import React from 'react';

import ReportItem from './ReportItem';

const ReportList = ({ authUser, reports, onEditReport, onRemoveReport }) => (
  <ul className="report-list">
    {reports.map((report) => report.companyID === authUser.company_id && (
      <ReportItem
        authUser={authUser}
        key={report.uid}
        report={report}
        onEditReport={onEditReport}
        onRemoveReport={onRemoveReport}
      />
    ))}
  </ul>
);

export default ReportList;

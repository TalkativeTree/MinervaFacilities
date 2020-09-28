import React from 'react';

import ReportItem from './ReportItem';

const ReportList = ({
  authUser,
  reports,
  onEditReport,
  onRemoveReport,
}) => (
  <ul>
    {reports.map((report) => (
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

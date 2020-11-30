import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../routes';
import { withFirebase } from '../../Firebase';
import { AuthUserContext } from '../../Session';

class ReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      reports: [],
      limit: 5,
      companyID: this.props.companyID,
      buildingID: this.props.buildingID,
      floorID: this.props.floorID,
      roomID: this.props.roomID,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .reports()
      .orderByChild('createdAt')
      .on('value', (snapshot) => {
        const reportsObject = snapshot.val();

        if (reportsObject) {
          const reportList = Object.keys(reportsObject).map((key) => ({
            ...reportsObject[key],
            uid: key,
          }));

          this.setState({
            reports: reportList,
            loading: false,
          });
        } else {
          this.setState({ reports: null, loading: false });
        }
      });
  }

  componentWillUnmount() {
    this.props.firebase.reports().off();
  }

  onNextPage = () => {
    this.setState((state) => ({ limit: state.limit + 5 }), this.onListenForReports);
  };

  render() {
    const { loading, reports } = this.state;

    // const date = report.createdAt;
    // const fullDate = new Date(report.createdAt * 1000).toString().split(' ');
    // const date =
    //   fullDate[0] + ', ' + fullDate[1] + ' ' + fullDate[2] + ', ' + fullDate[4] + ', ' + fullDate[6] + fullDate[7] + fullDate[8];
    // // https://stackoverflow.com/a/57103780/13986242

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div className="container add-padding-bottom">
            {loading && <div>Loading ...</div>}

            {!reports ? (
              <div>There are no Reports for your Company/Building...</div>
            ) : (
              <div>
                <button className="btn btn-secondary btn-bot" type="button" onClick={this.onNextPage}>
                  More
                </button>

                <ul className="ul-comp-list">
                  {reports.map(
                    (report) =>
                      report.location.companyID === authUser.company_id && (
                        <li key={report.uid} className="r-details-card">
                          <Link to={{ pathname: `${ROUTES.REPORTS}/${report.uid}`, state: { report } }}>
                            <div className="report-card">
                              <p className="comp-item report-title">
                                <strong>{report.reportTitle}</strong>
                              </p>

                              <hr />

                              <p className="comp-item report-id">
                                <sup>
                                  {/* {date} <br /> {report.uid} */}
                                  {new Date(report.createdAt * 1000).toString().split(' ')} <br /> {report.uid}
                                </sup>
                              </p>
                              <p className="comp-item">
                                <strong>Status: </strong>({report.reportStatus})
                              </p>
                              <p className="comp-item">
                                <strong>Request Type: </strong>({report.reportServiceType})
                              </p>
                              {/* <p className="comp-item report-desc">
                                <strong>Desc: </strong>
                                {report.reportMessage}
                              </p> */}
                              <p className="comp-item report-location">
                                {/* <strong>Location: </strong> */}
                                {/* Company ID: {report.location.companyID},<br /> */}
                                {/* Building ID: {report.location.buildingID},<br /> */}
                                {/* Floor ID: {report.location.floorID},<br /> */}
                                <strong>Room ID:</strong>
                                <span className="ticket-info">{report.location.roomID}</span>
                              </p>
                              {/* <p className="comp-item">
                                <sub>{report.editedAt && <span> (Edited)</span>}</sub>
                              </p> */}
                            </div>
                          </Link>
                        </li>
                      ),
                  )}
                </ul>
              </div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(ReportList);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../routes';


class ReportDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      report: null,
      ...props.location.state,
    };
  }

  componentDidMount() {
    if (this.state.report) {
      return;
    }

    this.setState({ loading: true });

    this.props.firebase
      .report(this.props.match.params.id)
      .on('value', (snapshot) => {
        this.setState({
          report: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.report(this.props.match.params.id).off();
  }

  render() {
    const { report, loading } = this.state;

    return (
      <div>
        <h4>Report ({report.uid})</h4>
        {loading && <div>Loading ...</div>}

        {report && (
          <div>
            <strong>Title:</strong> {report.title}
            <br />
            <strong>Location:</strong> {report.reportLocation}
            <br />
            <strong>Company:</strong> {report.companyID}
            <br />
            <strong>Building:</strong> {report.buildingID}
            <br />
            <strong>Company Owner:</strong> {report.companyOwner}
            <br />
            <strong>Created At:</strong> {report.createdAt}
            <br />
            <strong>Last Edited At:</strong> {report.editedAt}
            <br />

            <hr />
            
            <p className="comp-item">
              <strong>Subject: </strong>
              {report.title}
            </p>
            <p className="comp-item">
              <strong>Ticket Id:</strong>{' '}
              <span className="ticket-info">{report.uid}</span>
            </p>
            <p className="comp-item">
              <strong>Request Status: </strong>({report.status})
            </p>
            <p className="comp-item">
              <strong>Request Type: </strong>({report.serviceType})
            </p>
            <p className="comp-item report-desc">
                <strong>Desc: </strong>
                {report.message}
              </p>
          </div>
        )}

        <div className="ml-3">
          <Link to={ROUTES.HOME}>Back</Link>
        </div>
      </div>
    );
  }
}

export default withFirebase(ReportDetail);

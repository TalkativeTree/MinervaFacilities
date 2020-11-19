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

    const fullDateCreated = new Date(report.createdAt * 1000).toString().split(' ');
    const dateCreated =
      fullDateCreated[0] + ', ' + fullDateCreated[1] + ' ' + fullDateCreated[2] + ', ' +
      fullDateCreated[4] + ', ' + fullDateCreated[6] + fullDateCreated[7] + fullDateCreated[8];

    const FullDateEdited = new Date(report.editedAt * 1000).toString().split(' ');
    const dateEdited =
      FullDateEdited[0] + ', ' + FullDateEdited[1] + ' ' + FullDateEdited[2] + ', ' +
      FullDateEdited[4] + ', ' + FullDateEdited[6] + FullDateEdited[7] + FullDateEdited[8];


    return (
      <div className="content-wrapper">
       <div className="jumbotron paral paralsec">
        <h1 className="display-8 text-center mb-3">Report Details</h1>
        </div>
        {loading && <div>Loading ...</div>}

        {report && (
          <div className="container">
            <div className="r-details-card">
            <strong>Company:</strong> {report.companyID}
            <br />
            <strong>Building:</strong> {report.buildingID}
            <br />
            <strong>Reporter:</strong> {report.reporter}
            <br />
            <strong>Created At:</strong> {dateCreated}
            <br />
            {report.editedAt && (
              <p>
                <strong>Last Edited At:</strong> {dateEdited}
              </p>
            )}

            </div>
            <br />

            <div className="r-details-card">
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
          </div>
        )}

        <div className="container text-center mt-5">
          <Link to={ROUTES.HOME}><button className="btn btn-secondary">Back </button></Link>
        </div>
      </div>
    );
  }
}

export default withFirebase(ReportDetail);

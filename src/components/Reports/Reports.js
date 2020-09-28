import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ReportList from './ReportList';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      reports: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForReports();
  }

  onListenForReports = () => {
    this.setState({ loading: true });

    this.props.firebase
      .reports()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', (snapshot) => {
        const reportObject = snapshot.val();

        if (reportObject) {
          const reportList = Object.keys(reportObject).map((key) => ({
            ...reportObject[key],
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
  };

  componentWillUnmount() {
    this.props.firebase.reports().off();
  }

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onCreateReport = (event, authUser) => {
    this.props.firebase.reports().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditReport = (report, text) => {
    const { uid, ...reportSnapshot } = report;

    this.props.firebase.report(report.uid).set({
      ...reportSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveReport = (uid) => {
    this.props.firebase.report(uid).remove();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForReports,
    );
  };

  render() {
    const { text, reports, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {!loading && reports && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {reports && (
              <ReportList
                authUser={authUser}
                reports={reports}
                onEditReport={this.onEditReport}
                onRemoveReport={this.onRemoveReport}
              />
            )}

            {!reports && <div>There are no reports ...</div>}

            <form
              onSubmit={(event) =>
                this.onCreateReport(event, authUser)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Reports);

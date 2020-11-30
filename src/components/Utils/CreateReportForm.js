import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom';

import { REPORTS } from '../../routes';
import { withFirebase } from '../Firebase';


class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      isBlocking: false,
      upload: null,
      progress: 0,

      
      companyID: '',
      buildingID: '',
      floorID: '',
      roomID: '',
      
      reportTitle: '',
      reportMessage: '',
      reportStatus: 'OPEN',
      reportServiceType: '',

      reportImageName: '',
      reportImageURL: '',
    };
    this.state = this.initialState;
  }

  onCreateReport = () => {
    let ownerName = this.props.authUser.username;
    let ownerID = this.props.authUser.uid;

    let { companyID, buildingID, floorID, roomID } = this.state;
    let { reportTitle, reportMessage, reportStatus, reportServiceType, reportImageName, reportImageURL } = this.state;


    var reportData = {
      reporter: { ownerName, ownerID },
      location: {
        companyID,
        buildingID,
        floorID,
        roomID,
      },
      image: { reportImageName, reportImageURL },
      reportTitle,
      reportMessage,
      reportStatus,
      reportServiceType,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    }

    let reportID = this.props.firebase.createReport(reportData);
    console.log(reportID);
    this.setState(this.initialState);
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      isBlocking: event.target.value.length > 0,
    });
  };

  onAutoFill = () => {
    this.setState({
      isBlocking: true,
      
      // companyID: '-MIl88ANUFKxLp_sKsvf',
      // buildingID: '-MIqkLiTo2qwbo3JkrHL',
      // floorID: '-MIqkPSUQ7HeoFxXdrW7',
      // roomID: '-MIqCSAwq5QBti12uqKI',
      companyID: '-MNIVFlXAdfjwAIEslMH',
      buildingID: '-MNIWgqfPJFOqVVPFLCA',
      floorID: '-MNIaKm56aa5l5mHaV5-',
      roomID: '-MNIkOqcBsUhDz2IhflB',
    });
  };


  handleChange = (e) => {
    if (e.target.files[0]) {
      const upload = e.target.files[0];
      const uploadTask = this.props.firebase.storage.ref(`images/${upload.name}`).put(upload);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // progress function ...
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({ progress });
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          this.props.firebase.storage
            .ref(`images`)
            .child(upload.name)
            .getDownloadURL()
            .then((image_url) => {
              this.setState({ image_url, image_name: upload.name });
            });
        },
      );
    }
  };


  render() {
    const { isBlocking, progress } = this.state;
    const {
      companyID,
      buildingID,
      floorID,
      roomID,

      reportTitle,
      reportMessage,
      reportServiceType,
    } = this.state;

    return (
      <div className="add-padding-bottom text-center">
        <h1>Create A Company!</h1>
        <form>
          <div className="form-row">
            <input
              className="form-input col-5"
              type="text"
              placeholder="Company ID"
              name="companyID"
              value={companyID}
              onChange={this.onChange}
            />
            <input
              className="form-input col-5"
              type="text"
              placeholder="Building ID"
              name="buildingID"
              value={buildingID}
              onChange={this.onChange}
            />
          </div>
          <div className="form-row">
            <input
              className="form-input col-5"
              type="text"
              placeholder="Floor ID"
              name="floorID"
              value={floorID}
              onChange={this.onChange}
            />
            <input
              className="form-input col-5"
              type="text"
              placeholder="Room ID"
              name="roomID"
              value={roomID}
              onChange={this.onChange}
            />
          </div>

          <div className="btn btn-primary" onClick={this.onAutoFill}>
            Auto Fill Location
          </div>

          <div className="form-row">
            <input
              className="form-input col-10"
              type="text"
              placeholder="Report Title"
              name="reportTitle"
              value={reportTitle}
              onChange={this.onChange}
            />
          </div>

          <textarea
            rows="3"
            className="form-input col-12"
            type="text"
            placeholder="Reason For Report"
            name="reportMessage"
            value={reportMessage}
            onChange={this.onChange}
          />

          <select className="form-control" name="reportServiceType" value={reportServiceType} onChange={this.onChange}>
            <option value="" disabled>
              Select a Service
            </option>
            <option value="MAINTENANCE">Maintenance / Repair</option>
            <option value="HAZARD">Hazard Report</option>
            <option value="SERVICE">Service Report</option>
          </select>

          <input type="file" onChange={this.handleChange} />
          <p>
            Photo Upload Progress:
            <progress value={progress} max="100" className="progress" />
          </p>
        </form>

        <Prompt when={isBlocking} message={(location) => `Are you sure you want to go to ${location.pathname}`} />
        <p>Blocking? {isBlocking ? 'Yes, click a link or the back button' : 'Nope'}</p>

        <button className="btn btn-primary" type="submit" onClick={this.onCreateReport}>
          <Link to={REPORTS}>click me to Send Report & Go Back</Link>
        </button>
      </div>
    );
  }
}

export default withFirebase(ReportForm);

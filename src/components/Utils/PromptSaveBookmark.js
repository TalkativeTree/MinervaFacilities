import React, { Component } from 'react';
import { faPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// https://www.netguru.com/codestories/pwa-ios

class PromptSaveBookmark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMessage: false,
    };
  }

  componentDidMount() {
    // Detects if device is on iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone;

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.setState({ ShowMessage: true });
    };
  }

  componentWillUnmount() {
    this.setState({ ShowMessage: false });
  }

  render() {
    const { showInstallMessage } = this.state;

    return (
      <div>
        {showInstallMessage && (
          <div>
            <p>
              Install this webapp on your Iphone:
              tap <FontAwesomeIcon icon={faShare} /> Share,
              then <FontAwesomeIcon icon={faPlus} /> Add to Homescreen.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default PromptSaveBookmark;

import React from 'react';

import { withFirebase } from '../../Firebase';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignOutButton = ({ firebase }) => (
  <button
    type="button"
    className="btn btn-secondary "
    onClick={firebase.doSignOut}
  >
    Logout <FontAwesomeIcon icon={faSignOutAlt} />
  </button>
);

export default withFirebase(SignOutButton);

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/performance';

const config = {
  apiKey: process.env.REACT_APP_API_KEY || 'AIzaSyBnJSs5VkOG4k2VAByyYU8pxeyOthF3FFs',
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || 'minerva-facilities.firebaseapp.com',
  databaseURL: process.env.REACT_APP_DATABASE_URL || 'https://minerva-facilities.firebaseio.com',
  projectId: process.env.REACT_APP_PROJECT_ID || 'minerva-facilities',
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || 'minerva-facilities.appspot.com',
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || '286455586521',
  appId: process.env.REACT_APP_APP_ID || '1:286455586521:web:658ab0b3a18a1dcebfe8c8',
  measurementId: process.env.REACT_APP_MEASUREMENT_ID || 'G-674WMEGJDS',
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    /* Helper */
    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */
    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
    this.analytics = app.analytics();
    this.performance = app.performance();

    /* Social Sign In Method Provider */
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => {
    this.analytics.logEvent('Created A New User Using Email & Pass');
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  doSignInWithEmailAndPassword = (email, password) => {
    this.analytics.logEvent('User Logged In Using Email & Pass');
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  doSignInWithGoogle = () => {
    this.analytics.logEvent('User Logged In Using Google');
    return this.auth.signInWithPopup(this.googleProvider);
  };

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => {
    this.analytics.logEvent('User Logged Out');
    return this.auth.signOut();
  };

  doPasswordReset = (email) => {
    this.analytics.logEvent('User Tried To Rest Their Password');
    return this.auth.sendPasswordResetEmail(email);
  };

  doPasswordUpdate = (password) => {
    this.analytics.logEvent('User Changed Their Password');
    return this.auth.currentUser.updatePassword(password);
  };

  doSendEmailVerification = () => {
    this.analytics.logEvent('Email Verification Sent');
    return this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT || 'http://localhost:3000/',
    });
  };

  // *** Merge Auth and DB User API *** //
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then((snapshot) => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = 'EMPLOYEE';
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***
  user = (uid) => {
    this.analytics.logEvent("Referencing A User's Data");
    return this.db.ref(`users/${uid}`);
  };
  users = () => {
    this.analytics.logEvent('Referencing Users List');
    return this.db.ref('users');
  };
  setUserCompany = (userID, companyID) => this.user(userID).update({ company_id: companyID });

  // **** Company API ***
  company = (uid) => {
    this.analytics.logEvent("Referencing A Company's Data");
    return this.db.ref(`companies/${uid}`);
  };
  companies = () => {
    this.analytics.logEvent("Referencing Companies List");
    return this.db.ref('companies');
  };

  createCompany = (companyData) => {
    var newCompanyKey = this.db.ref('companies').push().key;
    var updates = {};
    updates['/companies/' + newCompanyKey] = companyData;
    updates['/users/' + companyData.owner.ownerID + '/companies/' + companyData.companyTitle] = newCompanyKey;
    updates['/users/' + companyData.owner.ownerID + '/company_id'] = newCompanyKey;
    
    this.analytics.logEvent("Creating A New Company");
    this.db.ref().update(updates);
    return newCompanyKey;
  };

  // **** Building API ***
  building = (uid) => {
    this.analytics.logEvent("Referencing A Building's Data");
    return this.db.ref(`buildings/${uid}`);
  };
  buildings = () => {
    this.analytics.logEvent("Referencing Buildings List");
    return this.db.ref('buildings');
  };

  createBuilding = (buildingData) => {
    let { companyID, buildingTitle } = buildingData;
    var newBuildingKey = this.db.ref('buildings').push().key;
    var updates = {};
    updates['/companies/' + companyID + '/buildings/' + buildingTitle] = newBuildingKey;
    updates['/buildings/' + newBuildingKey] = buildingData;

    this.analytics.logEvent("Creating A New Building");
    this.db.ref().update(updates);
    return newBuildingKey;
  };

  // **** Floors API ***
  floor = (uid) => {
    this.analytics.logEvent("Referencing A Floor's Data");
    return this.db.ref(`floors/${uid}`);
  };
  floors = () => {
    this.analytics.logEvent("Referencing Floors List");
    return this.db.ref('floors');
  };

  createFloor = (floorData) => {
    let { companyID, buildingID, floorTitle } = floorData;
    var newFloorKey = this.db.ref('floors').push().key;
    var updates = {};
    updates['/companies/' + companyID + '/buildings/' + buildingID + '/floors/' + floorTitle] = newFloorKey;
    updates['/floors/' + newFloorKey] = floorData;

    this.analytics.logEvent("Creating A New Floor");
    this.db.ref().update(updates);
    return newFloorKey;
  };

  // *** Rooms API ***
  room = (uid) => {
    this.analytics.logEvent("Referencing A Rooms's Data");
    return this.db.ref(`rooms/${uid}`);
  };
  rooms = () => {
    this.analytics.logEvent("Referencing Rooms List");
    return this.db.ref('rooms');
  };

  createRoom = (roomData) => {
    let { companyID, buildingID, floorID, roomTitle } = roomData;
    var newRoomKey = this.db.ref('rooms').push().key;
    var updates = {};
    updates['/companies/' + companyID + '/buildings/' + buildingID + '/floors/' + floorID + '/rooms/' + roomTitle] = newRoomKey;
    updates['/rooms/' + newRoomKey] = roomData;

    this.analytics.logEvent("Creating A New Room");
    this.db.ref().update(updates);
    return newRoomKey;
  };

  // *** Report API ***
  report = (uid) => {
    this.analytics.logEvent("Referencing A Reports's Data");
    return this.db.ref(`reports/${uid}`);
  };
  reports = () => {
    this.analytics.logEvent("Referencing Reports List");
    return this.db.ref('reports');
  };

  createReport = (reportData) => {
    let { location, reportTitle, reporter } = reportData;
    let { companyID, buildingID, floorID, roomID } = location;

    // Get a key for a new room.
    var newReportKey = this.db.ref('reports').push().key;
    // Write the new room's data simultaneously in the compnay list and the user's companies list.
    var updates = {};
    // updates['/companies/' + companyID + '/buildings/' + buildingID + '/floors/' + floorID + '/rooms/' + roomID + '/reports/' + reportTitle] = newReportKey;
    updates['/reports/' + newReportKey] = reportData;
    updates['/users/' + reporter.ownerID + '/reports/' + reportTitle] = newReportKey;

    console.log(companyID, buildingID, floorID, roomID, reportTitle, reporter);
    this.analytics.logEvent("Creating A New Report");
    this.db.ref().update(updates);
    return newReportKey;
  };
}

export default Firebase;

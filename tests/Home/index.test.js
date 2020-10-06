import React, { screen } from 'react'
import HomePage from '../../src/components/Home/index'
import { render } from '@testing-library/react-native'
import { AuthUserContext } from '../../src/components/Session'
import { Firebase } from '../../src/components/Firebase'
import firebase from 'firebase/app'
import { ADMIN_TEST_EMAIL, ADMIN_TEST_PASSWORD, MANAGER_TEST_EMAIL, MANAGER_TEST_PASSWORD, EMPLOYEE_TEST_EMAIL, EMPLOYEE_TEST_PASSWORD } from 'react-native-dotenv'

function renderAuthUserContext (authUser) {
  return render(
    <AuthUserContext.Provider value={{ authUser }}>
      <HomePage />
    </AuthUserContext.Provider>
  )
}

describe('showing the correct home page', () => {
  jest.mock('firebase/app', () => {
    return {
      auth: jest.fn(),
    };
  });
  // beforeAll(() => {

  // })

  // afterEach(() => {
  //   Firebase.doSignOut()
  // })

  it('should show admin home page when authUser is an Admin', async () => {
    // Firebase.doSignInWithEmailAndPassword(ADMIN_TEST_EMAIL, ADMIN_TEST_PASSWORD).mockResolvedValue()
    // const authUser = 
    // firebase.auth()
    // renderAuthUserContext(authUser)
    render(
      <HomePage />
    )
    expect(screen.getByText('Admin Homepage').toBeInTheDocument())
  })
})

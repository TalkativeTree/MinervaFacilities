import React, { screen } from 'react'
import HomePage from '../../src/components/Home/index'
import { render } from '@testing-library/react-native'
import { AuthUserContext } from '../../src/components/Session'

function renderAuthUserContext (authUser) {
  return render(
    <AuthUserContext.Provider value={{ authUser }}>
      <HomePage />
    </AuthUserContext.Provider>
  )
}

describe('showing the correct home page', () => {
  it('should show admin home page when authUser is an Admin', () => {
    const authUser = { roles: { ADMIN: 'ADMIN' }, emailVerified: true }
    renderAuthUserContext(authUser)
    expect(screen.getByText('Admin Homepage').toBeInTheDocument())
  })
})

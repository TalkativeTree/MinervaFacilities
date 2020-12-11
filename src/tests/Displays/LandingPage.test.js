import React from 'react'
import renderer from 'react-test-renderer'
import LandingPage from '../../components/Displays/LandingPage'

it('renders correctly', () => {
  const tree = renderer.create(<LandingPage />).toJSON();
  expect(tree).toMatchSnapshot();
})

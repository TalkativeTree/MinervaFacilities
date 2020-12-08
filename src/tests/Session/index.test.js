import React from 'react'
import renderer from 'react-test-renderer'
import LandingPage from '../../src/components/Landing/index'

it('renders correctly', () => {
  const tree = renderer.create(<LandingPage />).toJSON();
  expect(tree).toMatchSnapshot();
})

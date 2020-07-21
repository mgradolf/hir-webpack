import { shallow, mount } from 'enzyme'
import React from 'react'
import { App } from '~/App'

describe('App tests', () => {
  it('shallow renders app contents', () => {
    const AppElement = shallow(<App />)
    expect(AppElement.find('.AppBody')).toHaveLength(1)
  })

  it('Mounts entire app', () => {
    const AppComponent = mount(<App />)
  })
})

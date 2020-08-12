import { shallow, mount } from "enzyme"
import React from "react"
import { App } from "~/App"
import { AppStore, createStore } from "./store"

describe("App tests", () => {
  let store: AppStore
  beforeAll(() => {
    store = createStore().store
  })

  it("shallow renders app contents", () => {
    const AppElement = shallow(<App store={store} />)
    expect(AppElement.find(".AppBody")).toHaveLength(1)
  })

  it("Mounts entire app", () => {
    const AppComponent = mount(<App store={store} />)
  })
})

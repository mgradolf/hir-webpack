import { store, history } from "~/store"
import { push, ConnectedRouter } from "connected-react-router"
import React from "react"
import { ReactWrapper, mount } from "enzyme"
import { Breadcrumb } from "~/Component/Layout/Breadcrumb"
import { Provider } from "react-redux"

const TEST_PATH_NAME = "/sample/route/hello-world"

describe("breadcrumb tests", () => {
  let breadcrumbComponent: ReactWrapper

  beforeEach(() => {
    breadcrumbComponent = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Breadcrumb />
        </ConnectedRouter>
      </Provider>
    )

    store.dispatch(push(TEST_PATH_NAME))
    breadcrumbComponent.update()
  })

  it("renders breadcrumb", () => {
    const breadcrumbContainter = breadcrumbComponent.find(".ant-breadcrumb")
    expect(breadcrumbContainter.hostNodes()).toHaveLength(1)
  })

  it("renders breadcrumb links including home", () => {
    const breadcrumbLink = breadcrumbComponent.find(".ant-breadcrumb-link")
    expect(breadcrumbLink).toHaveLength(4)
  })

  it("handles hyphen separated route names", () => {
    const breadcrumbLink = breadcrumbComponent.find(".ant-breadcrumb-link")
    expect(breadcrumbLink.at(3).text()).toBe("Hello world")
  })
})

import React from "react"
import { Route, Redirect, RouteProps } from "react-router-dom"
import { connect } from "react-redux"
import { AppState } from "~/store"
import LoginModal from "~/component/Login/LoginModal"

interface IProtectedRouteProps extends RouteProps {
  redirectToLogin: boolean
  loginModalRequired: boolean
}

function ProtectedRoute(props: IProtectedRouteProps) {
  let toBeRendered: React.FunctionComponentElement<JSX.Element> = <Redirect to={{ pathname: "/login" }} />
  if (!props.loginModalRequired) {
    toBeRendered = (
      <React.Fragment>
        <LoginModal />
        <Route {...props} />
      </React.Fragment>
    )
  } else if (props.redirectToLogin) {
    toBeRendered = <Route {...props} />
  }
  return toBeRendered
}

const mapStateToProps = (state: AppState) => {
  return {
    redirectToLogin: state.authentication.redirectToLogin,
    loginModalRequired: state.authentication.loginModalRequired
  }
}
export default connect(mapStateToProps)(ProtectedRoute)

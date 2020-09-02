import React from "react"
import styles from "~/pages/Login/LoginPage.module.scss"
import { Layout } from "antd"
import Login from "~/Component/Login/Login"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { push } from "connected-react-router"
import { AppState } from "~/store"
import { Redirect } from "react-router-dom"

interface ILoginPageProps {
  redirectToLogin: boolean
  redirect: (url: string) => void
}

function LoginPage(props: ILoginPageProps) {
  const redirectUrl = window.location.pathname === "/login" ? "/" : window.location.pathname
  return props.redirectToLogin ? (
    <Layout className={styles.Layout}>
      <Layout.Content className={styles.Content}>
        <img src="./images/logo.png" className={styles.Logo} alt="jenzabar-logo" />
        <Login page={true} />
        <p className={styles.Footer_note}>{`2011-${new Date().getFullYear()} Jenzabar, Inc.`}</p>
      </Layout.Content>
    </Layout>
  ) : (
    <Redirect to={{ pathname: redirectUrl }} />
  )
}

const mapStateToProps = (state: AppState) => {
  const { redirectToLogin } = state.authentication
  return { redirectToLogin }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { redirect: (url: string) => dispatch(push(url)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

import * as React from "react"
import { connect } from "react-redux"
import { AppState } from "~/store"
import { authenticate } from "~/store/authentication/actions"
import { Form, Input, Button, Layout, Card, PageHeader } from "antd"
import { Error } from "~/component/Error"
import styles from "~/pages/Login/Login.module.scss"
import { Store } from "antd/lib/form/interface"

const { Content } = Layout

interface ILoginPageProps extends IConnectProps, IDispatchProps {}

interface IFormState {
  username: string
  password: string
}

const INITIAL_FORM_VALUES: IFormState = {
  username: "",
  password: ""
}

interface IConnectProps {
  loggingIn: boolean
  globalError: string | null
  loginError: string | null
}

interface IDispatchProps {
  login: (username: string, password: string) => void
}

function LoginPage(props: ILoginPageProps) {
  const onFinish = (values: Store) => {
    const { username, password } = values as IFormState
    props.login(username, password)
  }

  const { loggingIn, loginError, globalError } = props

  return (
    <Layout className={styles.Layout}>
      <Content className={styles.Content}>
        <img src="./images/logo.png" className={styles.Logo} alt="jenzabar-logo" />
        <Card className={styles.Card}>
          {Boolean(loginError) && <Error>{loginError}</Error>}
          {Boolean(globalError) && <Error>{globalError}</Error>}
          <Form
            layout="vertical"
            name="basic"
            hideRequiredMark
            className="login-form"
            initialValues={INITIAL_FORM_VALUES}
            onFinish={onFinish}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please input your username!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className={styles.Text__center}>
              <Button type="primary" htmlType="submit" loading={loggingIn}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <p className={styles.Footer_note}>{`2011-${new Date().getFullYear()} Jenzabar, Inc.`}</p>
      </Content>
    </Layout>
  )
}

const mapStateToProps = (state: AppState) => {
  const { errorMessage: globalError } = state.globalApiError
  const { loggingIn, loginError } = state.authentication
  return { loggingIn, loginError, globalError }
}

const actionCreators = {
  login: authenticate
}

export default connect(mapStateToProps, actionCreators)(LoginPage)

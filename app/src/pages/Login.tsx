import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '~/store'
import { authenticate, dismissAuthError } from '~/store/authentication/actions'
import { Form, Input, Button, Alert, Layout, Card, PageHeader } from 'antd'

const { Header, Content, Footer } = Layout

interface ILoginPageProps extends IConnectProps, IDispatchProps {}

interface IConnectProps {
  loggingIn: boolean
  loginError: string | null
}

interface IDispatchProps {
  login: (username: string, password: string) => void
  dismissAuthError: () => void
}

interface ILoginPageState {
  submitted: boolean
  loader?: boolean
}

const layout = {
  labelCol: { offset: 2, span: 20 },
  wrapperCol: { offset: 2, span: 20 },
  layout: 'vertical' as const
}

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 }
}

function LoginPage(props: ILoginPageProps) {
  const onFinish = (values: any) => {
    const { username, password } = values
    props.login(username, password)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const { loggingIn, loginError } = props

  return (
    <Layout className="layout" style={{ height: '100vh' }}>
      <Header>
        <img
          src="./images/logo.png"
          style={{ height: 56 }}
          alt="jenzabar-logo"
        />
      </Header>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Card style={{ minWidth: 300 }}>
          {Boolean(loginError) && (
            <Alert
              message="Login error"
              description={loginError}
              type="error"
              closable
              onClose={props.dismissAuthError}
            />
          )}
          <Form
            {...layout}
            name="basic"
            hideRequiredMark
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" loading={loggingIn}>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
      <Footer
        className="footer"
        style={{ textAlign: 'center' }}
      >{`2011-${new Date().getFullYear()} Jenzabar, Inc.`}</Footer>
    </Layout>
  )
}

const mapStateToProps = (state: AppState) => {
  const { loggingIn, loginError } = state.authentication
  return { loggingIn, loginError }
}

const actionCreators = {
  login: authenticate,
  dismissAuthError
}

export default connect(mapStateToProps, actionCreators)(LoginPage)

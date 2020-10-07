import React, { useState } from "react"
import { Form, Button, Card } from "antd"
import { Error } from "~/Component/Error"
import style from "~/Component/Login/Login.module.scss"
import { Store } from "antd/lib/form/interface"
import { login } from "~/ApiServices/Login"

import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AppState } from "~/Store"
import { push } from "connected-react-router"
import TextInput from "~/Component/Common/Form/TextInput"

interface ILoginProps {
  globalErrorMessage?: null | string
  modal?: boolean
  page?: boolean
  redirect?: (url: string) => void
}

interface IFormState {
  username: string
  password: string
}

const INITIAL_FORM_VALUES: IFormState = {
  username: "",
  password: ""
}

enum EnumLoading {
  PENDING,
  INPROGRESS
}

function Login(props: ILoginProps) {
  const [loading, setloading] = useState(EnumLoading.PENDING)
  const onFinish = async (values: Store) => {
    const { username, password } = values as IFormState
    setloading(EnumLoading.INPROGRESS)
    const response = await login(username, password)
    setloading(EnumLoading.PENDING)
    if (props.page) {
      if (response && response.success && props.redirect) {
        props.redirect("/")
      } else {
        console.log(response)
      }
    }
  }

  const { globalErrorMessage } = props
  const modalProps = {
    title: "Login required",
    description: "Your session has been timed out, please login again"
  }
  return (
    <Card className={style.Card}>
      {props.modal && <Card.Meta className={style.Card_Meta} {...modalProps} />}
      {Boolean(globalErrorMessage) && <Error>{globalErrorMessage}</Error>}
      <Form
        layout="vertical"
        name="basic"
        hideRequiredMark
        className="login-form"
        initialValues={INITIAL_FORM_VALUES}
        onFinish={onFinish}
      >
        <TextInput
          item={{
            label: "Username",
            name: "username",
            rules: [{ required: true, message: "Please input your username!" }]
          }}
          input={{ "aria-label": "username" }}
        />
        <TextInput
          item={{
            label: "Password",
            name: "password",
            rules: [{ required: true, message: "Please input your password!" }]
          }}
          input={{ "aria-label": "password", type: "password" }}
        />
        <Form.Item className={style.Text__center}>
          <Button type="primary" htmlType="submit" loading={loading === EnumLoading.INPROGRESS}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

const mapStateToProps = (state: AppState) => {
  const { errorMessage: globalErrorMessage } = state.globalApiError
  return { globalErrorMessage }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { redirect: (url: string) => dispatch(push(url)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

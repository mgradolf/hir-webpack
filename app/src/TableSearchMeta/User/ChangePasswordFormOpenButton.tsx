import React, { useState } from "react"
import { changePassword } from "~/ApiServices/Service/UserService"
import { Form, Input, message } from "antd"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

const ChangePasswordFormItems = () => {
  return (
    <>
      <Form.Item
        name="OldPassword"
        label="Old Password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="NewPassword"
        label="New Password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!"
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("NewPassword") === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error("The two passwords that you entered do not match!"))
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
    </>
  )
}

export const ChangePasswordFormOpenButton = (props: { UserID: string }) => {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const onFormSubmission = async (closeModal: () => void) => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()
      setErrorMessages([])
      setApiCallInProgress(true)
      changePassword({ UserID: props.UserID, ...params })
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            message.success("Password Changed Successfully!")
            formInstance.resetFields()
            closeModal()
          } else {
            console.log("validation failed ", response.error)
            setErrorMessages(response.error)
          }
        })
        .catch((y: any) => console.error(y))
    })
  }
  return (
    <CustomFormModalOpenButton
      formTitle={"Change Password"}
      customForm={<ChangePasswordFormItems />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={{}}
      apiCallInProgress={apiCallInProgress}
      loading={false}
      errorMessages={errorMessages}
      buttonLabel="Change Password"
      buttonProps={{ type: "primary" }}
    />
  )
}

import React, { useState, useEffect } from "react"
import { Card, Button, Input } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IEmailSendFieldNames } from "~/Component/Feature/Registration/Interfaces"
import { sendEmail } from "~/ApiServices/Service/MailService"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { getLoggedInUser } from "~/ApiServices/Service/HRUserService"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

const { TextArea } = Input

interface ISendEmailFormProps {
  toEmail: any
  formInstance: FormInstance
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const fieldNames: IEmailSendFieldNames = {
  FromEmailAddress: "FromEmailAddress",
  ToEmailAddress: "ToEmailAddress",
  Subject: "Subject",
  Message: "Message",
  MimeType: "MimeType"
}

const layout = {
  labelCol: { span: 6 }
}

export default function SendEmailForm(props: ISendEmailFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    ;(async () => {
      const response = await getLoggedInUser({})
      if (response && response.success) {
        props.formInstance.setFieldsValue({
          [fieldNames.FromEmailAddress]: response.data.EmailAddress
        })
      }
    })()
  }, [props])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()
    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await sendEmail(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response)
    }
  }
  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title="New Email Message" actions={actions}>
      <Form form={props.formInstance} className="modal-form">
        <OldFormError
          errorMessages={errorMessages}
          genericInstructions={
            <ul>
              <li>
                All fields marked with an asterisk (<span style={{ color: "red" }}>*</span>) are required.
              </li>
            </ul>
          }
        ></OldFormError>

        <Form.Item label="MimeType" className="hidden" {...layout} name={fieldNames.MimeType}>
          <Input aria-label="Mime type" value="text/html" />
        </Form.Item>

        <Form.Item label="From" {...layout} name={fieldNames.FromEmailAddress}>
          <Input aria-label="From address" />
        </Form.Item>

        <Form.Item label="To" {...layout} name={fieldNames.ToEmailAddress}>
          <Input aria-label="To address" defaultValue={props.toEmail} />
        </Form.Item>

        <Form.Item label="Subject" {...layout} name={fieldNames.Subject}>
          <Input aria-label="Subject" />
        </Form.Item>

        <Form.Item label="Message" {...layout} name={fieldNames.Message}>
          <TextArea rows={4} aria-label="Message" />
        </Form.Item>
      </Form>
    </Card>
  )
}

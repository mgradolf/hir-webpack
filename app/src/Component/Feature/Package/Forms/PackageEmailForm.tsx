import React, { useEffect, useState } from "react"
import { Row, Col, message, Button } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { sendEmail } from "~/ApiServices/Service/MailService"
import { getPackageReport } from "~/ApiServices/Service/PackageService"

interface IPackageEmailFormProps {
  formInstance: FormInstance
  PackageID: number
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

function PackageEmailForm(props: IPackageEmailFormProps) {
  useEffect(() => {
    ;(async function () {
      props.setApiCallInProgress(true)
      const result = await getPackageReport({ PackageID: props.PackageID })
      if (result.success && result.data) {
        props.setApiCallInProgress(false)
        props.formInstance.setFieldsValue({ FromEmailAddress: result.data.FromEmail })
        props.formInstance.setFieldsValue({ Subject: result.data.Subject })
        props.formInstance.setFieldsValue({ Message: result.data.Message })
      }
    })()
    // eslint-disable-next-line
  }, [])

  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"From"}
          ariaLabel={"From"}
          fieldName="FromEmailAddress"
        />
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"To"}
          ariaLabel={"To"}
          fieldName="ToEmailAddress"
        />
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Subject"}
          ariaLabel={"Subject"}
          fieldName="Subject"
        />
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Message"}
          ariaLabel={"Message"}
          fieldName="Message"
          hidden
        />
      </Col>
    </Row>
  )
}

export function PackageEmailFormOpenButton(props: {
  helpKey?: string
  initialValues?: { [key: string]: any }
  label?: string
}) {
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  const onFormSubmission = (closeModal: () => void) => {
    formInstance.validateFields().then((params) => {
      setErrorMessages([])
      setApiCallInProgress(true)

      sendEmail(params)
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            message.success(response.data.Message)
            closeModal()
          } else {
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }

  const viewPackageReport = (body: string | undefined) => {
    const newWin: any = window.open("url", `Package-Report`, "height=800,width=700")
    newWin.document.write(body)
  }

  return (
    <CustomFormModalOpenButton
      helpKey={props.helpKey}
      formTitle={props.label ? props.label : "New Email Message"}
      customForm={
        <PackageEmailForm
          PackageID={initialValues.PackageID}
          setApiCallInProgress={setApiCallInProgress}
          formInstance={formInstance}
        />
      }
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      iconType="email"
      errorMessages={errorMessages}
      buttonLabel={`${props.label ? props.label : "Email Package Report"}`}
      buttonProps={{ type: "primary" }}
      extraButtons={[
        <Button type="primary" onClick={() => viewPackageReport(formInstance.getFieldValue("Message"))}>
          View Message
        </Button>
      ]}
    />
  )
}

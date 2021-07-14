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
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

function PackageEmailForm(props: IPackageEmailFormProps) {
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
  const [packageReport, setPackageReport] = useState<{ [key: string]: any }>({})
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  useEffect(() => {
    ;(async function () {
      const result = await getPackageReport({ PackageID: initialValues.PackageID })
      if (result.success && result.data) {
        setPackageReport(result.data)
        formInstance.setFieldsValue({ FromEmailAddress: result.data.FromEmail })
        formInstance.setFieldsValue({ Subject: result.data.Subject })
      }
    })()
    // eslint-disable-next-line
  }, [])

  const onFormSubmission = (closeModal: () => void) => {
    formInstance.validateFields().then((params) => {
      setErrorMessages([])
      setApiCallInProgress(true)

      params["Message"] = packageReport.Message
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
    <>
      {Object.keys(packageReport).length > 0 && (
        <CustomFormModalOpenButton
          helpKey={props.helpKey}
          formTitle={props.label ? props.label : "New Email Message"}
          customForm={<PackageEmailForm formInstance={formInstance} />}
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
            <Button type="primary" onClick={() => viewPackageReport(packageReport.Message)}>
              View Message
            </Button>
          ]}
        />
      )}
    </>
  )
}

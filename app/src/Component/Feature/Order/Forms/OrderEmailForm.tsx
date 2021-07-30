import React, { useEffect, useState } from "react"
import { Row, Col, message, Button } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { findPreferredEmail } from "~/ApiServices/BizApi/person/personIF"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { sendEmail } from "~/ApiServices/Service/MailService"
import { getPrintableInvoice } from "~/ApiServices/BizApi/order/orderIf"

interface IOrderEmailFormProps {
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

function OrderEmailForm(props: IOrderEmailFormProps) {
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

export function OrderEmailFormOpenButton(props: {
  helpKey?: string
  initialValues?: { [key: string]: any }
  label?: string
}) {
  const [formInstance] = Form.useForm()
  const [paymentReceipt, setPaymentReceipt] = useState<{ [key: string]: any }>({})
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  useEffect(() => {
    ;(async function () {
      const result = await findPreferredEmail({ PersonID: initialValues.PersonID })
      if (result.success && result.data) {
        formInstance.setFieldsValue({ ToEmailAddress: result.data.EmailAddress })
      }
    })()
    ;(async function () {
      const result = await getPrintableInvoice({ OrderID: initialValues.OrderID })
      if (result.success && result.data) {
        setPaymentReceipt(result.data)
        formInstance.setFieldsValue({ FromEmailAddress: result.data.from })
        formInstance.setFieldsValue({ Subject: result.data.subject })
      }
    })()
    // eslint-disable-next-line
  }, [])

  const onFormSubmission = (closeModal: () => void) => {
    formInstance.validateFields().then((params) => {
      setErrorMessages([])
      setApiCallInProgress(true)

      params["Message"] = paymentReceipt.message
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

  const viewInvoice = (body: string | undefined) => {
    const newWin: any = window.open("url", `Invoice-${initialValues.OrderID}`, "height=800,width=700")
    newWin.document.write(body)
  }

  return (
    <CustomFormModalOpenButton
      helpKey={props.helpKey}
      formTitle={props.label ? props.label : "New Email Message"}
      customForm={<OrderEmailForm formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      iconType="email"
      errorMessages={errorMessages}
      buttonLabel={`${props.label ? props.label : "Email Invoice"}`}
      buttonProps={{ type: "primary" }}
      extraButtons={[
        <Button type="primary" onClick={() => viewInvoice(paymentReceipt.message)}>
          View Message
        </Button>
      ]}
    />
  )
}

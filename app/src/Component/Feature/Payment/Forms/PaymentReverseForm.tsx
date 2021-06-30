import React, { useEffect, useState } from "react"
import { Row, Col, message } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { REVERSE_PAYMENT_SUCCESSFULLY } from "~/utils/Constants"
import { Redirect } from "react-router"
import { canReversePayment } from "~/ApiServices/BizApi/payment/paymentIF"
import { isPaymentReversible, reversePayment } from "~/ApiServices/Service/PaymentService"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"

interface IPaymentReverseFormProps {
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

function PaymentReverseForm(props: IPaymentReverseFormProps) {
  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <FormTextArea
          {...layout}
          formInstance={props.formInstance}
          label={"Comment"}
          ariaLabel={"Comment"}
          fieldName="Note"
        />
      </Col>
    </Row>
  )
}

export function PaymentReverseFormOpenButton(props: {
  helpKey?: string
  initialValues?: { [key: string]: any }
  label?: string
}) {
  const [formInstance] = Form.useForm()
  const [canReverse, setCanReverse] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()
  const [loading] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  useEffect(() => {
    ;(async function () {
      const result = await canReversePayment([])
      if (result.success) {
        if (result.data) {
          isPaymentReversible({ PaymentID: initialValues.PaymentID }).then((x) => {
            if (x.success && x.data) {
              setCanReverse(x.data.IsPaymentReversible)
            }
          })
        }
      }
    })()
  }, [initialValues])

  const onFormSubmission = (closeModal: () => void) => {
    formInstance.validateFields().then((params) => {
      setErrorMessages([])
      setApiCallInProgress(true)

      params["PaymentID"] = initialValues.PaymentID
      reversePayment(params)
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            message.success(REVERSE_PAYMENT_SUCCESSFULLY)
            setRedirectAfterCreate(`/transaction?PaymentID=${response.data.ReversePaymentID}`)
            closeModal()
          } else {
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }
  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <CustomFormModalOpenButton
        helpKey={props.helpKey}
        formTitle={props.label ? props.label : "Confirm Reverse Payment"}
        customForm={<PaymentReverseForm formInstance={formInstance} />}
        formInstance={formInstance}
        onFormSubmission={onFormSubmission}
        initialValues={initialValues}
        apiCallInProgress={apiCallInProgress}
        loading={loading}
        iconType="undo"
        errorMessages={errorMessages}
        buttonLabel={`${props.label ? props.label : "Reverse Payment"}`}
        buttonProps={{ type: "primary" }}
        disabled={!canReverse}
      />
    </>
  )
}

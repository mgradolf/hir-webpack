import React, { useState } from "react"
import { Row, Col, message } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { saveOrderPaymentDueDate } from "~/ApiServices/Service/OrderService"
import { UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface IOrderEmailFormProps {
  formInstance: FormInstance
  PaymentDueDate: string
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

function OrderPaymentDueDateForm(props: IOrderEmailFormProps) {
  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <FormDatePicker
          {...layout}
          formInstance={props.formInstance}
          label={"Payment Due Date"}
          ariaLabel={"Payment Due Date"}
          fieldName="PaymentDueDate"
          defaultValue={props.PaymentDueDate}
        />
      </Col>
    </Row>
  )
}

export function OrderPaymentDueDateFormOpenButton(props: {
  helpKey?: string
  initialValues: { [key: string]: any }
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

      params["OrderID"] = props.initialValues.OrderID
      saveOrderPaymentDueDate(params)
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            message.success(UPDATE_SUCCESSFULLY)
            eventBus.publish(REFRESH_PAGE)
            closeModal()
          } else {
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }

  return (
    <CustomFormModalOpenButton
      helpKey={props.helpKey}
      formTitle={"Set Payment Due Date"}
      customForm={
        <OrderPaymentDueDateForm formInstance={formInstance} PaymentDueDate={props.initialValues.PaymentDueDate} />
      }
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      iconType="edit"
      errorMessages={errorMessages}
      buttonLabel={"Set Payment Due Date"}
      buttonProps={{ type: "primary" }}
      disabled={props.initialValues.Balance < 1}
    />
  )
}

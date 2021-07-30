import React, { useState } from "react"
import { Row, Col, message } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { receivePurchaseOrder } from "~/ApiServices/Service/POService"
import { RECEIVE_SUCCESSFULLY } from "~/utils/Constants"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface IPOReceiveFormProps {
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

function PurchaseOrderReceiveForm(props: IPOReceiveFormProps) {
  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <FormInput
          formInstance={props.formInstance}
          label={"PurchaseOrderID"}
          ariaLabel={"PurchaseOrderID"}
          fieldName="PurchaseOrderID"
          hidden
        />
        <FormInput
          {...layout}
          formInstance={props.formInstance}
          label={"Comment"}
          ariaLabel={"Comment"}
          fieldName="POComment"
          rules={[{ required: true, message: "Please enter comment!" }]}
        />
      </Col>
    </Row>
  )
}

export function PurchaseOrderReceiveFormOpenButton(props: {
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

      receivePurchaseOrder(params)
        .then((response) => {
          setApiCallInProgress(false)
          if (response && response.success) {
            message.success(RECEIVE_SUCCESSFULLY)
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
      formTitle={props.label ? props.label : "Confirm Purchase Order Receipt"}
      customForm={<PurchaseOrderReceiveForm formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      loading={loading}
      iconType="undo"
      errorMessages={errorMessages}
      buttonLabel={`${props.label ? props.label : "Purchase Order Receive"}`}
      buttonProps={{ type: "primary" }}
      disabled={initialValues.IsPaymentReceived}
    />
  )
}

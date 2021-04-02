import React, { useState } from "react"
import { Form, Card, Button, Row, Col } from "antd"
import { FormInstance } from "antd/lib/form"
import { IBulkOrderFieldNames } from "~/Component/Feature/Account/Interfaces"
import { FormError } from "~/Component/Common/Form/FormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import ConfiguretStepForm from "~/Component/Feature/Package/Forms/BulkOrder/ConfigureStepForm"
import AllocationStepForm from "~/Component/Feature/Package/Forms/BulkOrder/AllocationStepForm"
import PricingStepForm from "~/Component/Feature/Package/Forms/BulkOrder/PricingStepForm"
import BillingStepForm from "~/Component/Feature/Package/Forms/BulkOrder/BillingStepForm"
import FinalStepForm from "~/Component/Feature/Package/Forms/BulkOrder/FinalStepForm"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { submitBulkOrder } from "~/ApiServices/Service/PackageService"
import { eventBus } from "~/utils/EventBus"
import "~/Sass/utils.scss"

interface IBulkOrderFormProps {
  formInstance: FormInstance
  fieldNames: IBulkOrderFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

export default function BulkOrderForm(props: IBulkOrderFormProps) {
  const [formInstance] = Form.useForm()
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialFormValue || {})
  const [current, setCurrent] = React.useState(0)

  const isEnableSeatAffiliate = formInstance.getFieldValue("IsEnableSeatAffiliate")
  const isEnableSeatStudent = formInstance.getFieldValue("IsEnableSeatStudent")
  const isGenerateOrder = formInstance.getFieldValue("IsGenerateOrder")

  const steps = [
    <ConfiguretStepForm formInstance={formInstance} initialValue={initialValues} />,
    <AllocationStepForm formInstance={formInstance} initialValue={initialValues} />,
    <PricingStepForm formInstance={formInstance} initialValue={initialValues} />,
    <BillingStepForm formInstance={formInstance} initialValue={initialValues} />,
    <FinalStepForm formInstance={formInstance} initialValue={initialValues} />
  ]

  const next = () => {
    formInstance.validateFields().then((x) => {
      if (current === 1) {
        if (!isEnableSeatAffiliate && !isEnableSeatStudent && !isGenerateOrder) {
          setCurrent(current + 3)
        } else if (!isEnableSeatAffiliate && !isEnableSeatStudent) {
          setCurrent(current + 2)
        } else {
          setCurrent(current + 1)
        }
      } else if (current === 2) {
        if (!isGenerateOrder) {
          setCurrent(current + 2)
        } else {
          setCurrent(current + 1)
        }
      } else {
        setCurrent(current + 1)
      }
    })
  }

  const prev = () => {
    if (current === 4) {
      if (isGenerateOrder) {
        setCurrent(current - 1)
      } else if (isEnableSeatAffiliate || isEnableSeatStudent) {
        setCurrent(current - 2)
      } else {
        setCurrent(current - 3)
      }
    } else if (current === 3) {
      if (isEnableSeatAffiliate || isEnableSeatStudent) {
        setCurrent(current - 1)
      } else {
        setCurrent(current - 2)
      }
    } else {
      setCurrent(current - 1)
    }
  }

  const onFormSubmission = async () => {
    const params = formInstance.getFieldsValue(true)
    if (!params["IsEnableSeatAffiliate"]) {
      params["AffiliateFinancials"] = []
    }
    if (!params["IsEnableSeatStudent"]) {
      params["StudentFinancials"] = []
    }
    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = submitBulkOrder
    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.closeModal && props.closeModal()
      eventBus.publish("REFRESH_PACKAGES_TAB")
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  return (
    <Card
      title={"Bulk Order"}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.closeModal}>
              Cancel
            </Button>
          </Col>
          {current > 0 && (
            <Col>
              <Button onClick={prev}>Previous</Button>
            </Col>
          )}
          {current < steps.length - 1 && (
            <Col>
              <Button type="primary" onClick={next}>
                Next
              </Button>
            </Col>
          )}
          {current === steps.length - 1 && (
            <Col>
              <Button type="primary" onClick={onFormSubmission}>
                Submit
              </Button>
            </Col>
          )}
        </Row>
      ]}
    >
      <Form
        form={formInstance}
        initialValues={initialValues}
        scrollToFirstError
        style={{
          maxHeight: "66vh",
          overflowY: "scroll"
        }}
      >
        <FormError errorMessages={errorMessages} />
        <Row>
          <Col xs={24} sm={24} md={24}>
            {steps[current]}
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

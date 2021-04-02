import React, { useState } from "react"
import { Form, Card, Button, Row, Col, message } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormError } from "~/Component/Common/Form/FormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import FirstStepForm from "~/Component/Feature/Offering/Forms/FirstStepForm"
import SecondStepForm from "~/Component/Feature/Offering/Forms/SecondStepForm"
import ThirdStepForm from "~/Component/Feature/Offering/Forms/ThirdStepForm"
import { createOffering } from "~/ApiServices/Service/OfferingService"
import { CREATE_SUCCESSFULLY } from "~/utils/Constants"
import { Redirect } from "react-router"
import "~/Sass/utils.scss"

interface IOfferingCreateFormProps {
  formInstance: FormInstance
  fieldNames: IOfferingFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

export default function OfferingCreateForm(props: IOfferingCreateFormProps) {
  const [formInstance] = Form.useForm()
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialFormValue || {})
  const [current, setCurrent] = React.useState(0)

  const steps = [
    <FirstStepForm formInstance={formInstance} fieldNames={props.fieldNames} initialValue={initialValues} />,
    <SecondStepForm formInstance={formInstance} fieldNames={props.fieldNames} initialValue={initialValues} />,
    <ThirdStepForm formInstance={formInstance} fieldNames={props.fieldNames} initialValue={initialValues} />
  ]

  const next = () => {
    formInstance.validateFields().then((x) => {
      setCurrent(current + 1)
    })
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const onFormSubmission = async () => {
    const params = formInstance.getFieldsValue(true) as IOfferingFieldNames
    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = createOffering

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      message.success(CREATE_SUCCESSFULLY)
      setRedirectAfterCreate(`/offering/${response.data.OfferingID}`)
      props.closeModal && props.closeModal()
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <Card
        title={"Create New Offering"}
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
            maxHeight: "80vh",
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
    </>
  )
}

import React, { useState } from "react"
import { Card, Button, Row, Col, message } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { IStudentHoldFieldNames } from "~/Component/Feature/Student/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "~/utils/EventBus"
import { getHoldReason, getHoldType } from "~/ApiServices/Service/RefLookupService"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { createUpdateStudentHold } from "~/ApiServices/Service/StudentService"
import "~/Sass/global/index.scss"
import { FINANCIAL_HOLT_TYPE_ID } from "~/utils/Constants"

interface IStudentHoldFormProps {
  formInstance: FormInstance
  fieldNames: IStudentHoldFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function StudentHoldForm(props: IStudentHoldFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [isReleaseDateRequired, setIsReleaseDateRequired] = useState(false)
  const isEdit = props.initialFormValue.StudentHoldID !== undefined

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()
    params["HoldBy"] = "joeAdmin"

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = createUpdateStudentHold

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.closeModal && props.closeModal()
      message.success(isEdit ? "Update hold successfully!" : "Apply hold successfully!")
      eventBus.publish("REFRESH_HOLD_TAB")
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  return (
    <Card
      title={isEdit ? "Update Hold" : "Apply Hold"}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.closeModal}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onFormSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        scrollToFirstError
        style={{
          maxHeight: "66vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />
        <Row>
          <Col xs={24} sm={24} md={12}>
            <FormInput
              label="StudentHoldID"
              fieldName={props.fieldNames.StudentHoldID}
              formInstance={props.formInstance}
              hidden
            />
            <FormInput
              label="StudentID"
              fieldName={props.fieldNames.StudentID}
              formInstance={props.formInstance}
              hidden
            />

            <FormDropDown
              {...layout}
              formInstance={props.formInstance}
              label="Hold Type"
              fieldName={props.fieldNames.HoldTypeID}
              refLookupService={getHoldType}
              onChangeCallback={(value) => {
                if (value === FINANCIAL_HOLT_TYPE_ID) {
                  setIsReleaseDateRequired(true)
                } else {
                  setIsReleaseDateRequired(false)
                }
              }}
              displayKey="Name"
              valueKey="ID"
              rules={[{ required: true, message: "Please select a Hold Type!" }]}
            />

            <FormDatePicker
              label={"Start Date"}
              formInstance={props.formInstance}
              {...layout}
              aria-label="Pick Start Date"
              placeholder="YYYY/MM/DD"
              fieldName={props.fieldNames.StartDate}
              defaultValue={props.initialFormValue.StartDate}
              rules={[{ required: true, message: "Pick the start date!" }]}
            />

            <FormTextArea
              label={"Notes"}
              {...layout}
              fieldName={props.fieldNames.Note}
              formInstance={props.formInstance}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <FormDropDown
              formInstance={props.formInstance}
              label="Reason"
              fieldName={props.fieldNames.HoldReasonID}
              refLookupService={getHoldReason}
              displayKey="Name"
              valueKey="ID"
              rules={[{ required: true, message: "Please select a Hold Reason!" }]}
            />

            <FormDatePicker
              label={"Release Date"}
              formInstance={props.formInstance}
              {...layout}
              aria-label="Pick Release Date"
              placeholder="YYYY/MM/DD"
              fieldName={props.fieldNames.ReleaseDate}
              defaultValue={props.initialFormValue.ReleaseDate}
              rules={[{ required: isReleaseDateRequired, message: "Pick the release date!" }]}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

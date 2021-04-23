import React, { useState } from "react"
import { Card, Button, Row, Col, message } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE } from "~/utils/EventBus"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { addOrUpdateAdmissionRequirement } from "~/ApiServices/Service/ProgramService"
import { ADDED_SUCCESSFULLY } from "~/utils/Constants"
import { QuestionsLookup } from "~/Component/Common/Form/FormLookupFields/QuestionsLookup"

interface IAdmissionReqFormProps {
  ProgramAdmReqGroupID?: number
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
  setApiCallInProgress: (flag: boolean) => void
  handleCancel: () => void
}

const fieldNames = {
  ProgramAdmReqGroupID: "ProgramAdmReqGroupID",
  Name: "Name",
  PreferenceDefID: "PreferenceDefID",
  ExpectedAnswer: "ExpectedAnswer",
  NeedProof: "NeedProof",
  AttachmentInstruction: "AttachmentInstruction"
}

export function AdmissionReqForm(props: IAdmissionReqFormProps) {
  const [isQuestion, setIsQuestion] = useState<boolean>(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  props.initialFormValue["ProgramAdmReqGroupID"] = props.ProgramAdmReqGroupID

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    const serviceMethoToCall: (params: {
      [key: string]: any
    }) => Promise<IApiResponse> = addOrUpdateAdmissionRequirement

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      message.success(ADDED_SUCCESSFULLY)
      eventBus.publish(REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response)
    }
  }

  const handleQuestion = (items: any) => {
    setIsQuestion(true)
    props.formInstance.setFieldsValue({ AnswerType: items[0].PreferenceValueTypeName })
  }

  return (
    <Card
      title="Admission Requirement Setup"
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.handleCancel}>
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
        initialValues={props.initialFormValue}
        form={props.formInstance}
        scrollToFirstError
        style={{
          maxHeight: "80vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages}></OldFormError>

        <FormInput
          label={"ProgramAdmReqGroupID"}
          fieldName={fieldNames.ProgramAdmReqGroupID}
          formInstance={props.formInstance}
          hidden
        />

        <FormInput
          labelColSpan={8}
          wrapperColSpan={14}
          label={"Requirement"}
          fieldName={fieldNames.Name}
          formInstance={props.formInstance}
          rules={[{ required: true, message: "Please enter requirement!" }]}
        />

        <QuestionsLookup
          labelColSpan={8}
          wrapperColSpan={14}
          label="Question"
          formInstance={props.formInstance}
          fieldName={fieldNames.PreferenceDefID}
          onSelectedItems={handleQuestion}
        />

        {isQuestion && (
          <>
            <FormInput
              labelColSpan={8}
              wrapperColSpan={14}
              label="Answer Type"
              formInstance={props.formInstance}
              fieldName="AnswerType"
              disabled
            />

            <FormTextArea
              labelColSpan={8}
              wrapperColSpan={14}
              label={"Expected Answer"}
              fieldName={fieldNames.ExpectedAnswer}
              formInstance={props.formInstance}
            />
          </>
        )}

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Need Any proof about fulfillment of this requirement?"}
          fieldName={fieldNames.NeedProof}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />

        <FormTextArea
          labelColSpan={8}
          wrapperColSpan={14}
          label={"Attachement Instructions"}
          fieldName={fieldNames.AttachmentInstruction}
          formInstance={props.formInstance}
        />
      </Form>
    </Card>
  )
}

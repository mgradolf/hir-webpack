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
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { saveOrUpdateAdmissionRequirementGroups } from "~/ApiServices/Service/ProgramService"
import { CREATE_SUCCESSFULLY } from "~/utils/Constants"

interface IAdmissionReqGroupFormProps {
  ProgramAdmReqGroupID?: number
  ProgramID: number
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
  setApiCallInProgress: (flag: boolean) => void
  handleCancel: () => void
}

const fieldNames = {
  ProgramID: "ProgramID",
  ProgramAdmReqGroupID: "ProgramAdmReqGroupID",
  Name: "Name",
  Title: "Title",
  Instruction: "Instruction",
  IsBackOfficeUseOnly: "IsBackOfficeUseOnly",
  MinMeet: "MinMeet"
}

export default function AdmissionReqGroupForm(props: IAdmissionReqGroupFormProps) {
  const [showMinMeet, setShowMinMeet] = useState(
    props.initialFormValue["RequirementMeet"] !== undefined ? !props.initialFormValue["RequirementMeet"] : false
  )
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  props.initialFormValue["ProgramID"] = props.ProgramID
  props.initialFormValue["ProgramAdmReqGroupID"] = props.ProgramAdmReqGroupID

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    if (params["MinMeet"] === undefined) {
      params["MinMeet"] = 0
    }
    const serviceMethoToCall: (params: {
      [key: string]: any
    }) => Promise<IApiResponse> = saveOrUpdateAdmissionRequirementGroups

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      message.success(CREATE_SUCCESSFULLY)
      eventBus.publish(REFRESH_PROGRAM_ADMISSION_REQUIREMENT_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response)
    }
  }

  const handleMeet = (value: any) => {
    if (value) {
      setShowMinMeet(false)
    } else {
      setShowMinMeet(true)
    }
  }

  return (
    <Card
      title="Admission Requirement Group Setup"
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

        <FormInput label={"ProgramID"} fieldName={fieldNames.ProgramID} formInstance={props.formInstance} hidden />

        <FormInput
          label={"ProgramAdmReqGroupID"}
          fieldName={fieldNames.ProgramAdmReqGroupID}
          formInstance={props.formInstance}
          hidden
        />

        <FormInput
          labelColSpan={8}
          wrapperColSpan={14}
          label={"Group Name"}
          fieldName={fieldNames.Name}
          formInstance={props.formInstance}
          rules={[{ required: true, message: "Please enter group name!" }]}
        />

        <FormInput
          labelColSpan={8}
          wrapperColSpan={14}
          label={"Quick Admit Title"}
          fieldName={fieldNames.Title}
          formInstance={props.formInstance}
          rules={[{ required: true, message: "Please enter quick admit title!" }]}
        />

        <FormTextArea
          labelColSpan={8}
          wrapperColSpan={14}
          label={"Quick Admit Instructions"}
          fieldName={fieldNames.Instruction}
          formInstance={props.formInstance}
        />

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Private Group"}
          fieldName={fieldNames.IsBackOfficeUseOnly}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          onChangeCallback={handleMeet}
          label={"Minimum Admission Requirement to Meet"}
          fieldName={"RequirementMeet"}
          options={[
            { label: "All Admission Requirement Required", value: true },
            { label: "Specify Minimum Admission Requirement to Meet", value: false }
          ]}
        />

        {showMinMeet && (
          <FormNumberInput
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Minimum Meet"}
            fieldName={fieldNames.MinMeet}
            formInstance={props.formInstance}
          />
        )}
      </Form>
    </Card>
  )
}

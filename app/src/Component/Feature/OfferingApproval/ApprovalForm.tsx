import React, { useEffect, useState } from "react"
import { Card, Button, Row, Col } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingApprovalFieldNames } from "~/Component/Feature/Offering/Interfaces"
import {
  getOfferingApprovalSendToList,
  getOfferingApprovalStateList,
  setApprovalStatus
} from "~/ApiServices/Service/OfferingService"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { eventBus, REFRESH_OFFERING_APPROVAL_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"

interface IOfferingApprovalFormProps {
  offeringID: number
  statusCode: string
  formInstance: FormInstance
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const fieldNames: IOfferingApprovalFieldNames = {
  OfferingID: "OfferingID",
  StatusID: "StatusID",
  UserLogin: "UserLogin",
  Remarks: "Remarks",
  IsNotifyByEmail: "IsNotifyByEmail"
}

export default function ApprovalForm(props: IOfferingApprovalFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [showSubmit, setShowSubmit] = useState<boolean>(true)

  useEffect(() => {
    props.formInstance.setFieldsValue({ [fieldNames.OfferingID]: props.offeringID })
  }, [props.formInstance, props.offeringID])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await setApprovalStatus(params)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.formInstance.resetFields()
      eventBus.publish(REFRESH_OFFERING_APPROVAL_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response)
    }
  }

  const handleSelection = (value: any) => {
    if (props.statusCode === "Awaiting Approval" && value === 1) {
      setShowSubmit(false)
    } else {
      setShowSubmit(true)
    }
  }

  return (
    <Card
      title="Offering Approval"
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.handleCancel}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button disabled={!showSubmit} type="primary" onClick={onFormSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form form={props.formInstance} className="modal-form">
        <OldFormError errorMessages={errorMessages}></OldFormError>
        <FormInput
          labelColSpan={6}
          wrapperColSpan={12}
          label={"OfferingID"}
          fieldName={fieldNames.OfferingID}
          formInstance={props.formInstance}
          defaultValue={props.offeringID}
          hidden
        />

        <FormDropDown
          labelColSpan={6}
          wrapperColSpan={12}
          label={"Move approval state"}
          ariaLabel={"Move Approval State Select"}
          formInstance={props.formInstance}
          fieldName={fieldNames.StatusID}
          onChangeCallback={handleSelection}
          refLookupService={() => getOfferingApprovalStateList({ OfferingID: props.offeringID })}
          displayKey="StateName"
          valueKey="StatusID"
          rules={[
            {
              required: true,
              message: "Please Select Move approval state"
            }
          ]}
        />

        <FormTextArea
          labelColSpan={6}
          wrapperColSpan={12}
          label={"Remarks"}
          fieldName={fieldNames.Remarks}
          formInstance={props.formInstance}
        />

        <FormDropDown
          labelColSpan={6}
          wrapperColSpan={12}
          label={"Send To"}
          ariaLabel={"Send To Select"}
          formInstance={props.formInstance}
          fieldName={fieldNames.UserLogin}
          refLookupService={() => getOfferingApprovalSendToList({ OfferingID: props.offeringID })}
          displayKey="UserName"
          valueKey="UserLogin"
          rules={[
            {
              required: true,
              message: "Please Select Send to"
            }
          ]}
        />

        <FormMultipleRadio
          labelColSpan={6}
          wrapperColSpan={12}
          formInstance={props.formInstance}
          label={"Notify By Email"}
          ariaLabel={"Notify By Email"}
          fieldName={fieldNames.IsNotifyByEmail}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
      </Form>
    </Card>
  )
}

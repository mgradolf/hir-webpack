import React, { useEffect, useState } from "react"
import { Card, Button, Input, Select, Radio } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingApprovalFieldNames } from "~/Component/Offering/Interfaces"
import {
  getOfferingApprovalSendToList,
  getOfferngApprovalStateList,
  setApprovalStatus
} from "~/ApiServices/Service/OfferingService"
import FormError from "~/Component/Common/OldForm/FormError"
import { eventBus, REFRESH_OFFERING_APPROVAL_PAGE } from "~/utils/EventBus"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

const { TextArea } = Input

interface IOfferingApprovalFormProps {
  offeringID: number
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

const layout = {
  labelCol: { span: 6 }
}

export default function ApprovalForm(props: IOfferingApprovalFormProps) {
  const [approvalStateList, setApprovalStateList] = useState<Array<any>>([])
  const [approvalSendToList, setApprovalSendToList] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    props.formInstance.setFieldsValue({ [fieldNames.OfferingID]: props.offeringID })
    ;(async () => {
      const response = await getOfferngApprovalStateList(props.offeringID)
      if (response && response.success && response.data) {
        setApprovalStateList(response.data)
      }
    })()
    ;(async () => {
      const response = await getOfferingApprovalSendToList(props.offeringID)
      if (response && response.success && response.data) {
        setApprovalSendToList(response.data)
      }
    })()
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
  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Submit</Button>)

  return (
    <Card title="Offering Approval" actions={actions}>
      <Form form={props.formInstance} className="modal-form">
        <FormError
          errorMessages={errorMessages}
          genericInstructions={
            <ul>
              <li>
                All fields marked with an asterisk (<span style={{ color: "red" }}>*</span>) are required.
              </li>
            </ul>
          }
        ></FormError>
        <Form.Item style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }} name={fieldNames.OfferingID}>
          <Input value={props.offeringID ? props.offeringID : undefined} aria-label="Offering ID" />
        </Form.Item>

        <Form.Item
          label="Move approval state"
          name={fieldNames.StatusID}
          {...layout}
          rules={[
            {
              required: true,
              message: "Please Select Move approval state"
            }
          ]}
        >
          <Select aria-label="Approval State Select">
            {approvalStateList.map((x) => {
              return (
                <Select.Option key={x.StatusID} value={x.StatusID}>
                  {x.StateName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Remarks" {...layout} name={fieldNames.Remarks}>
          <TextArea rows={4} aria-label="Remarks" />
        </Form.Item>

        <Form.Item
          label="Send To"
          {...layout}
          name={fieldNames.UserLogin}
          rules={[
            {
              required: true,
              message: "Please Select Send to"
            }
          ]}
        >
          <Select aria-label="User Name Select">
            {approvalSendToList.map((x) => {
              return (
                <Select.Option key={x.UserLogin} value={x.UserLogin}>
                  {x.UserName}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Notify By Email" {...layout} name={fieldNames.IsNotifyByEmail}>
          <Radio.Group aria-label="Notify by Email">
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Card>
  )
}

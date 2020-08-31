import React, { useEffect, useState } from "react"
import { Card, Button, Input, Select, Radio } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingApprovalFieldNames } from "~/component/Offering/Interfaces"
import { getOfferingApprovalSendToList, getOfferngApprovalStateList } from "~/ApiServices/Service/OfferingService"

const { TextArea } = Input

interface IOfferingApprovalFormProps {
  offeringID: number
  formInstance: FormInstance
  onFormSubmission: () => void
  handleCancel: () => void
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
  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={props.onFormSubmission}>Submit</Button>)

  const [approvalStateList, setApprovalStateList] = useState<Array<any>>([])
  const [approvalSendToList, setApprovalSendToList] = useState<Array<any>>([])

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

  return (
    <Card title="Offering Approval" actions={actions}>
      <Form form={props.formInstance} style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
        <Form.Item style={{ visibility: "hidden", height: "1px", padding: 0, margin: 0 }} name={fieldNames.OfferingID}>
          <Input value={props.offeringID ? props.offeringID : undefined} />
        </Form.Item>

        <Form.Item label="Move approval state" name={fieldNames.StatusID} {...layout}>
          <Select>
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
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Send To" {...layout} name={fieldNames.UserLogin}>
          <Select>
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
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Card>
  )
}

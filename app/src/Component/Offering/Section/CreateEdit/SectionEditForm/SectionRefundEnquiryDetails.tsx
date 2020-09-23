import React, { useEffect, useState } from "react"
import { Card, Button, Select, Input, Alert, Form } from "antd"

import { getRefundPolicyType } from "~/ApiServices/Service/RefLookupService"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { updateSection } from "~/ApiServices/Service/SectionService"

interface ISectionEditProps {
  Section: { [key: string]: string }
  handleCancel: () => void
  handleSubmit: (param: { [key: string]: any }) => void
  setApiCallInProgress: (flag: boolean) => void
}

interface ISectionRefundEnquiryDetails {
  SectionID: string
  RefundPolicyTypeID: string
  SubmitInquiryToUserID: string
}

const fieldNames: ISectionRefundEnquiryDetails = {
  SectionID: "SectionID",
  RefundPolicyTypeID: "RefundPolicyTypeID",
  SubmitInquiryToUserID: "SubmitInquiryToUserID"
}

export default function SectionRefundEnquiryDetails(props: ISectionEditProps) {
  const actions = []
  const [formInstance] = Form.useForm()
  const [refundDescription, setRefundDescription] = useState("")
  const [saveButtonLoading, setButtonLoading] = useState(false)
  const [buttonText, setButtonText] = useState("Save")

  const [allRefundPolicyTypes, setAllRefundPolicyTypes] = useState<Array<any>>([])
  useEffect(() => {
    getRefundPolicyType().then((response) => {
      if (response.success) {
        setAllRefundPolicyTypes(response.data)
      }
    })
  }, [])

  useEffect(() => {
    Object.keys(props.Section).forEach((key) => {
      formInstance.setFieldsValue({
        [key]: props.Section[key]
      })
    })
  }, [props.Section, formInstance])

  const [allUsers, setAllUsers] = useState<Array<any>>([])
  useEffect(() => {
    getAllUsers().then((response) => {
      if (response.success) setAllUsers(response.data)
    })
  }, [])

  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(
    <Button
      loading={saveButtonLoading}
      onClick={() => {
        props.setApiCallInProgress(true)
        setButtonLoading(true)
        setButtonText("Saving ...")
        console.log(formInstance.getFieldsValue())
        updateSection(formInstance.getFieldsValue()).then((response) => {
          if (response.success) {
            props.setApiCallInProgress(false)
            setButtonLoading(false)
            setButtonText("Save")
          }
        })
      }}
    >
      {buttonText}
    </Button>
  )
  return (
    <Card actions={actions}>
      <Form form={formInstance}>
        <Form.Item name={fieldNames.SectionID} className="hidden">
          <Input />
        </Form.Item>
        <Form.Item name={fieldNames.RefundPolicyTypeID} className="hidden">
          <Input />
        </Form.Item>
        <Form.Item label="Choose a refund policy">
          <Select
            onChange={(id: number) => {
              const refundType: any = allRefundPolicyTypes.filter((x) => x.ID === id)[0]
              setRefundDescription(refundType.Description)
              formInstance.setFieldsValue({ [fieldNames.RefundPolicyTypeID]: id })
            }}
          >
            {allRefundPolicyTypes.map((x) => (
              <Select.Option key={x.ID + x.Name} value={x.ID}>
                {x.Name}
              </Select.Option>
            ))}
          </Select>
          {refundDescription !== "" && <Alert message={refundDescription} type="info" />}
        </Form.Item>
        <Form.Item name={fieldNames.SubmitInquiryToUserID} label="Choose an enquiry recipient">
          <Select>
            {allUsers.map((x) => (
              <Select.Option key={x.UserID + x.FormattedName} value={x.UserID}>
                {x.FormattedName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Card>
  )
}

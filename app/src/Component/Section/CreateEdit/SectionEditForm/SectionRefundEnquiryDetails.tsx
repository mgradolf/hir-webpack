import React, { useEffect, useState } from "react"
import { Select, Input, Alert, Form } from "antd"

import { getRefundPolicyType } from "~/ApiServices/Service/RefLookupService"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { FormInstance } from "antd/lib/form/Form"

interface ISectionEditProps {
  Section: { [key: string]: string }
  handleCancel: () => void
  handleSubmit: (param: { [key: string]: any }) => void
  setApiCallInProgress: (flag: boolean) => void
  formInstance: FormInstance
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
  const [refundDescription, setRefundDescription] = useState("")
  const [allRefundPolicyTypes, setAllRefundPolicyTypes] = useState<Array<any>>([])
  useEffect(() => {
    getRefundPolicyType().then((response) => {
      if (response.success) {
        setAllRefundPolicyTypes(response.data)
      }
    })
  }, [])

  const [allUsers, setAllUsers] = useState<Array<any>>([])
  useEffect(() => {
    getAllUsers({}).then((response) => {
      if (response.success) setAllUsers(response.data)
    })
  }, [])

  return (
    <>
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
            props.formInstance.setFieldsValue({ [fieldNames.RefundPolicyTypeID]: id })
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
    </>
  )
}

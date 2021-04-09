import React, { useEffect, useState } from "react"
import { Select, Form, Row, Col } from "antd"
import { getRefundPolicyType } from "~/ApiServices/Service/RefLookupService"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { FormInstance } from "antd/lib/form/Form"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import TextArea from "antd/lib/input/TextArea"

interface ISectionRefundFormProps {
  initialValue: { [key: string]: any }
  formInstance: FormInstance
}

interface ISectionRefundEnquiryDetails {
  RefundPolicyTypeID: string
  SubmitInquiryToUserID: string
}

const fieldNames: ISectionRefundEnquiryDetails = {
  RefundPolicyTypeID: "RefundPolicyTypeID",
  SubmitInquiryToUserID: "SubmitInquiryToUserID"
}

export function SectionRefundEnquiryForm(props: ISectionRefundFormProps) {
  const [refundDescription, setRefundDescription] = useState("")
  const [allRefundPolicyTypes, setAllRefundPolicyTypes] = useState<Array<any>>([])
  useEffect(() => {
    getRefundPolicyType().then((response) => {
      if (response.success) {
        setAllRefundPolicyTypes(response.data)
      }
    })
  }, [])

  const handleRefundPolicy = (refundPolicyTypeID: number) => {
    const refundType: any = allRefundPolicyTypes.filter((x) => x.ID === refundPolicyTypeID)
    setRefundDescription(refundType[0].Description)
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Refund Policy"
            name={fieldNames.RefundPolicyTypeID}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
          >
            <Select aria-label="Refund Policy Select" onChange={handleRefundPolicy}>
              {allRefundPolicyTypes &&
                allRefundPolicyTypes.map((x) => {
                  return (
                    <Select.Option key={x.ID} value={x.ID}>
                      {x.Name}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>

          {refundDescription && (
            <Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} label="Description">
              <TextArea value={refundDescription} maxLength={4} disabled />
            </Form.Item>
          )}

          <FormDropDown
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Inquiry recipient"}
            ariaLabel={"Inquiry Recipient Select"}
            formInstance={props.formInstance}
            fieldName={fieldNames.SubmitInquiryToUserID}
            refLookupService={() => getAllUsers({})}
            displayKey="FormattedName"
            valueKey="UserID"
          />
        </Col>
      </Row>
    </>
  )
}

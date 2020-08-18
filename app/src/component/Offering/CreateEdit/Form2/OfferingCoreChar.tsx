import React, { useState, useEffect } from "react"
import { Form, Divider, Select } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import {
  getOfferingStatusTypes,
  getOrganizations,
  getPaymentGatewayAccounts
} from "~/ApiServices/Service/RefLookupService"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"

interface IOfferingCoreChar {
  fieldNames: IFieldNames
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
}

const layout = {
  labelCol: { span: 6 }
}

export default function OfferingCoreChar(props: IOfferingCoreChar) {
  const [offeringStatusTypes, setOfferingStatusTypes] = useState<Array<any>>([])
  const [organizations, setOrganizations] = useState<Array<any>>([])
  const [users, setUsers] = useState<Array<any>>([])
  const [paymentGatewayAccounts, setPaymentGatewayAccounts] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const response = await getOfferingStatusTypes()
      if (response && response.data) {
        // console.log("setOfferingStatusTypes ", response.data)
        setOfferingStatusTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getOrganizations()
      if (response && response.data) {
        // console.log("setOrganizations ", response.data)
        setOrganizations(response.data)
      }
    })()
    ;(async () => {
      const response = await getPaymentGatewayAccounts()
      if (response && response.data) {
        // console.log("setPaymentGatewayAccounts ", response.data)
        setPaymentGatewayAccounts(response.data)
      }
    })()
    ;(async () => {
      const response = await getAllUsers()
      if (response && response.data) {
        // console.log("setUsers ", response.data)
        setUsers(response.data)
      }
    })()
  }, [])
  return (
    // <Form hideRequiredMark form={props.formInstance} initialValues={props.initialFormValue}>
    <>
      <Divider orientation="left">Core characteristics</Divider>
      <Form.Item label="Offering status" name={props.fieldNames.OfferingStatusCodeID} {...layout}>
        <Select>
          {offeringStatusTypes.map((x, index) => {
            return (
              <Select.Option key={x.StatusID + index} value={x.StatusID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Department" name={props.fieldNames.OrganizationID} {...layout}>
        <Select>
          {organizations.map((x, index) => {
            return (
              <Select.Option key={x.OrganizationTypeID + index} value={x.OrganizationID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Inquiry recipient" name={props.fieldNames.SubmitInquiryToUserID} {...layout}>
        <Select>
          {users.map((x, index) => {
            return (
              <Select.Option key={x.UserID + index} value={x.UserID}>
                {x.FormattedName}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Gateway" name={props.fieldNames.PaymentGatewayAccountID} {...layout}>
        <Select>
          {paymentGatewayAccounts.map((x, index) => {
            return (
              <Select.Option key={x.ID + index} value={x.ID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </>
    // </Form>
  )
}

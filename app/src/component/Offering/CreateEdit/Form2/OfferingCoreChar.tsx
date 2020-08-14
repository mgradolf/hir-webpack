import React, { useState, useEffect } from "react"
import { Form, Divider, Select } from "antd"
import { IFieldNames } from "~/component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import {
  getOfferingStatusTypes,
  getOrganizations,
  getPaymentGatewayAccounts
} from "~/ApiServices/Service/RefLookupServiceWrap"
import { getAllUsers } from "~/ApiServices/Service/HRUserServiceWrap"

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
    const loadOffering = async () => {
      const [response] = await getOfferingStatusTypes()
      if (response && response.data) {
        console.log(response.data)
        setOfferingStatusTypes(response.data)
      }
    }
    const loadOrganization = async () => {
      const [response] = await getOrganizations()
      if (response && response.data) {
        console.log(response.data)
        setOrganizations(response.data)
      }
    }
    const loadPaymentGateways = async () => {
      const [response] = await getPaymentGatewayAccounts()
      if (response && response.data) {
        console.log(response.data)
        setPaymentGatewayAccounts(response.data)
      }
    }
    const loadUsers = async () => {
      const [response] = await getAllUsers()
      if (response && response.data) {
        console.log(response.data)
        setUsers(response.data)
      }
    }
    loadOffering()
    loadOrganization()
    loadPaymentGateways()
    loadUsers()
  }, [])
  return (
    <Form hideRequiredMark form={props.formInstance} initialValues={props.initialFormValue}>
      <Divider orientation="left">Core characteristics</Divider>
      <Form.Item label="Offering status" name={props.fieldNames.OfferingStatusCodeID} {...layout}>
        <Select>
          {offeringStatusTypes.map((x) => {
            return (
              <Select.Option key={x.StatusID} value={x.StatusID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Department" name="department" {...layout}>
        <Select>
          {organizations.map((x) => {
            return (
              <Select.Option key={x.OrganizationTypeID} value={x.OrganizationTypeID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Inquiry recipient" name="recipient" {...layout}>
        <Select>
          {users.map((x) => {
            return (
              <Select.Option key={x.OrganizationTypeID} value={x.OrganizationTypeID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Gateway" name="gateway" {...layout}>
        <Select>
          {paymentGatewayAccounts.map((x) => {
            return (
              <Select.Option key={x.ID} value={x.ID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </Form>
  )
}

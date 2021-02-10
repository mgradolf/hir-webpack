import React, { useState, useEffect } from "react"
import { Form, Divider, Select, Switch } from "antd"
import { IOfferingFieldNames } from "~/Component/Offering/Interfaces"
import { FormInstance } from "antd/lib/form"
import {
  getOfferingStatusTypes,
  getOrganizations,
  getPaymentGatewayAccounts
} from "~/ApiServices/Service/RefLookupService"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"

interface IOfferingCoreChar {
  fieldNames: IOfferingFieldNames
  formInstance: FormInstance
  editMode: boolean
}

const layout = {
  labelCol: { span: 6 }
}

const status = {
  Preliminary: 0,
  AwaitingApproval: 1,
  Open: 2,
  Denied: 3,
  Closed: 1000
}

export default function OfferingCoreChar(props: IOfferingCoreChar) {
  const [offeringStatusTypes, setOfferingStatusTypes] = useState<Array<any>>([])
  const [organizations, setOrganizations] = useState<Array<any>>([])
  const [users, setUsers] = useState<Array<any>>([])
  const [paymentGatewayAccounts, setPaymentGatewayAccounts] = useState<Array<any>>([])
  const [disableStatus, setDisableStatus] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await getOfferingStatusTypes()
      if (response && response.data && Array.isArray(response.data)) {
        const createMode = !props.editMode
        const OfferingTypeID = props.formInstance.getFieldValue(props.fieldNames.OfferingTypeID)
        if (createMode && OfferingTypeID === 1000) {
          props.formInstance.setFieldsValue({ [props.fieldNames.OfferingStatusCodeID]: status.Preliminary })
        }

        switch (props.formInstance.getFieldValue(props.fieldNames.OfferingStatusCodeID)) {
          case status.Preliminary:
          case status.AwaitingApproval:
          case status.Denied:
            setDisableStatus(true)
            break
          case status.Open:
          case status.Closed:
            setDisableStatus(false)
            response.data = response.data.filter((x: any) => {
              switch (x.StatusID) {
                case status.Preliminary:
                case status.Open:
                case status.Closed:
                  return true
                default:
                  return false
              }
            })
        }
        setOfferingStatusTypes(response.data)
      }
    })()
    ;(async () => {
      const response = await getOrganizations()
      if (response && response.data) {
        setOrganizations(response.data)
      }
    })()
    ;(async () => {
      const response = await getPaymentGatewayAccounts()
      if (response && response.data) {
        setPaymentGatewayAccounts(response.data)
      }
    })()
    ;(async () => {
      const response = await getAllUsers({})
      if (response && response.data) {
        setUsers(response.data)
      }
    })()
  }, [props])
  return (
    <>
      <Divider orientation="left">Core characteristics</Divider>
      <Form.Item label="Offering status" name={props.fieldNames.OfferingStatusCodeID} {...layout}>
        <Select aria-label="Offering Status Select" disabled={disableStatus}>
          {offeringStatusTypes.map((x) => {
            return (
              <Select.Option key={x.StatusID} value={x.StatusID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Department" name={props.fieldNames.OrganizationID} {...layout}>
        <Select aria-label="Department Select">
          {organizations.map((x, index) => {
            return (
              <Select.Option key={x.OrganizationTypeID + index} value={x.OrganizationID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Quick Admit" name={props.fieldNames.IsQuickAdmit} valuePropName="checked" {...layout}>
        <Switch
          aria-label="Is Quick Admit"
          defaultChecked={!!props.formInstance.getFieldValue(props.fieldNames.IsQuickAdmit)}
          onChange={(checked) => {
            props.formInstance.setFieldsValue({ [props.fieldNames.IsQuickAdmit]: checked })
          }}
        />
      </Form.Item>
      <Form.Item
        label="Approval Process"
        name={props.fieldNames.HasApprovalProcess}
        valuePropName="checked"
        {...layout}
      >
        <Switch
          disabled
          aria-label="Has Approval Process"
          defaultChecked={!!props.formInstance.getFieldValue(props.fieldNames.HasApprovalProcess)}
        />
      </Form.Item>
      <Form.Item label="Inquiry recipient" name={props.fieldNames.SubmitInquiryToUserID} {...layout}>
        <Select aria-label="Inquiry Recipient Select">
          {users.map((x) => {
            return (
              <Select.Option key={x.UserID} value={x.UserID}>
                {x.FormattedName}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
      <Form.Item label="Gateway" name={props.fieldNames.PaymentGatewayAccountID} {...layout}>
        <Select aria-label="Gateway Select">
          {paymentGatewayAccounts.map((x) => {
            return (
              <Select.Option key={x.ID} value={x.ID}>
                {x.Name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </>
  )
}

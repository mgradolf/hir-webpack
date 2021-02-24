import React, { useState } from "react"
import { IGeneratedField } from "~/Component/Common/Form/common"
import { Row, Input, Select, Button, Col, Form } from "antd"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { REQUEST_LOOKUP_TYPES } from "~/utils/Constants"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { searchPersons } from "~/ApiServices/BizApi/person/personIF"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { findAccountForLookUp } from "~/ApiServices/BizApi/account/accountIF"
import { AccountSearchMeta } from "~/TableSearchMeta/Account/AccountSearchMeta"

const fieldNames = {
  AccountID: "AccountID",
  PurchaserPersonID: "PurchaserPersonID",
  RecipientPersonID: "RecipientPersonID",
  PersonID: "PersonID"
}
export default function RequestSearchCustomLookupFilter(props: IGeneratedField) {
  const [selectedValueToDisplay, setSelectedValueToDisplay] = useState("")
  const [seletectLookupType, setSeletectLookupType] = useState(REQUEST_LOOKUP_TYPES.ACCOUNT)
  const [openPersonLookupModal, setOpenPersonLookupModal] = useState(false)
  const [openAccountLookupModal, setopenAccountLookupModal] = useState(false)
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })

  const openModal = () => {
    if (seletectLookupType === REQUEST_LOOKUP_TYPES.ACCOUNT) setopenAccountLookupModal(true)
    else if (seletectLookupType !== "") setOpenPersonLookupModal(true)
  }

  return (
    <>
      <Form.Item className="hidden" name={fieldNames.AccountID}>
        <Input />
      </Form.Item>

      <Form.Item className="hidden" name={fieldNames.PersonID}>
        <Input />
      </Form.Item>

      <Form.Item className="hidden" name={fieldNames.PurchaserPersonID}>
        <Input />
      </Form.Item>

      <Form.Item className="hidden" name={fieldNames.RecipientPersonID}>
        <Input />
      </Form.Item>

      {openPersonLookupModal && (
        <LookupModal
          title="Select Person"
          {...(props.extraProps && props.extraProps.isArray && { isArray: props.extraProps.isArray })}
          closeModal={(items?: any[]) => {
            if (items && items.length > 0) {
              setSelectedValueToDisplay(items[0].FirstName)
              switch (seletectLookupType) {
                case REQUEST_LOOKUP_TYPES.PURCHASER:
                  props.formInstance.setFieldsValue({ [fieldNames.AccountID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.PersonID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.RecipientPersonID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.PurchaserPersonID]: items[0].PersonID })
                  break
                case REQUEST_LOOKUP_TYPES.RECIPIENT:
                  props.formInstance.setFieldsValue({ [fieldNames.AccountID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.PersonID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.PurchaserPersonID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.RecipientPersonID]: items[0].PersonID })
                  break
                case REQUEST_LOOKUP_TYPES.ANY:
                  props.formInstance.setFieldsValue({ [fieldNames.AccountID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.PurchaserPersonID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.RecipientPersonID]: "" })
                  props.formInstance.setFieldsValue({ [fieldNames.PersonID]: items[0].PersonID })
                  break
              }
            }
            setOpenPersonLookupModal(false)
          }}
          searchFunc={searchPersons}
          columns={[
            { title: "Name", dataIndex: "FirstName", width: 150 },
            { title: "Role Name", dataIndex: "RoleName", width: 150 },
            { title: "Address", dataIndex: "Address", width: 150 },
            { title: "City", dataIndex: "City", width: 150 },
            { title: "Postal Code", dataIndex: "PostalCode", width: 150 },
            { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
            { title: "Telephone Number", dataIndex: "TelephoneNumber", width: 150 },
            { title: "Account Name", dataIndex: "AccountName", width: 150 }
          ]}
          meta={PersonSearchMeta}
        />
      )}
      {openAccountLookupModal && (
        <LookupModal
          title="Select Account"
          {...(props.extraProps && props.extraProps.isArray && { isArray: props.extraProps.isArray })}
          closeModal={(items?: any[]) => {
            if (items && items.length > 0) {
              setSelectedValueToDisplay(items[0].AccountName)
              props.formInstance.setFieldsValue({ [fieldNames.PurchaserPersonID]: "" })
              props.formInstance.setFieldsValue({ [fieldNames.RecipientPersonID]: "" })
              props.formInstance.setFieldsValue({ [fieldNames.PersonID]: "" })
              props.formInstance.setFieldsValue({ [fieldNames.AccountID]: items[0].AccountID })
            }
            setopenAccountLookupModal(false)
          }}
          searchFunc={findAccountForLookUp}
          columns={[
            { title: "Account Type", dataIndex: "AccountTypeName", width: 150 },
            { title: "Account Name", dataIndex: "AccountName", width: 150 },
            { title: "Contact Name", dataIndex: "ContactName", width: 150 },
            { title: "Phone", dataIndex: "TelephoneNumber", width: 150 },
            { title: "Email Address", dataIndex: "EmailAddress", width: 150 },
            { title: "Address", dataIndex: "BillingAddress", width: 150 }
          ]}
          meta={AccountSearchMeta}
        />
      )}

      <Form.Item colon={false}>
        <Row>
          <Col span={8} {...(mobileView && { xs: { span: 8, offset: 0 } })}>
            <Select
              style={{ width: "100%" }}
              defaultValue={REQUEST_LOOKUP_TYPES.ACCOUNT}
              onChange={(value: string) => {
                setSeletectLookupType(value)
                setSelectedValueToDisplay("")
                props.formInstance.setFieldsValue({ [fieldNames.PurchaserPersonID]: "" })
                props.formInstance.setFieldsValue({ [fieldNames.RecipientPersonID]: "" })
                props.formInstance.setFieldsValue({ [fieldNames.PersonID]: "" })
                props.formInstance.setFieldsValue({ [fieldNames.AccountID]: "" })
              }}
            >
              <Select.Option key="0" value={REQUEST_LOOKUP_TYPES.ACCOUNT}>
                {REQUEST_LOOKUP_TYPES.ACCOUNT}
              </Select.Option>
              <Select.Option key="1" value={REQUEST_LOOKUP_TYPES.PURCHASER}>
                {REQUEST_LOOKUP_TYPES.PURCHASER}
              </Select.Option>
              <Select.Option key="2" value={REQUEST_LOOKUP_TYPES.RECIPIENT}>
                {REQUEST_LOOKUP_TYPES.RECIPIENT}
              </Select.Option>
              <Select.Option key="3" value={REQUEST_LOOKUP_TYPES.ANY}>
                {REQUEST_LOOKUP_TYPES.ANY}
              </Select.Option>
            </Select>
          </Col>
          <Col span={6} xs={8}>
            <Input readOnly value={selectedValueToDisplay} />
          </Col>
          <Col span={2} xs={8}>
            <Button onClick={openModal}>Lookup</Button>
          </Col>
        </Row>
      </Form.Item>
    </>
  )
}

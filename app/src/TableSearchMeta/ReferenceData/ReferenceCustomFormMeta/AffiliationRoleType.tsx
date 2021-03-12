import React from "react"
import { Dropdown, Menu } from "antd"
import { getAccountTypes } from "~/ApiServices/Service/RefLookupService"
import { BOOLEAN, DROPDOWN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { RemoveRefButton, UpdateRefButton } from "~/TableSearchMeta/ReferenceData/ReferenceButtons"
import { Link } from "react-router-dom"

export const FormMeta: IField[] = [
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "Account Type",
    inputType: DROPDOWN,
    fieldName: "AccountTypeID",
    refLookupService: getAccountTypes,
    displayKey: "Name",
    valueKey: "ID"
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: BOOLEAN
  },
  {
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  }
]

export const columns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "ID"
  },
  { title: "Name", dataIndex: "Name" },
  { title: "Description", dataIndex: "Description" },
  { title: "IPDES Code", dataIndex: "IPEDSCode" },
  { title: "Sort Position", dataIndex: "SortPosition" },
  { title: "Is Active", dataIndex: "IsActive", render: renderBoolean },
  {
    title: "Actions",
    render: (text, record) => (
      <Dropdown.Button
        overlay={
          <Menu>
            <Menu.Item>
              <UpdateRefButton
                formMeta={FormMeta}
                LookUpName={"AffiliationRoleType"}
                reference={record}
                refreshEventName={"REFRESH_AffiliationRoleType"}
              />
            </Menu.Item>
            <Menu.Item>
              <RemoveRefButton
                ID={record.ID}
                LookUpName={"AffiliationRoleType"}
                refreshEventName={"REFRESH_AffiliationRoleType"}
              />
            </Menu.Item>
            <Menu.Item>
              <Link className="Button" to={`/reference-data/AffiliationRoleType/${record.ID}/tags`}>
                Add Tags
              </Link>
            </Menu.Item>
          </Menu>
        }
        type="primary"
      >
        Select
      </Dropdown.Button>
    )
  }
]

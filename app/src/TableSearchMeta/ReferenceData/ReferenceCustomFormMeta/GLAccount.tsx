import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Dropdown, Input, Menu, message } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { IField, DROPDOWN, NUMBER, TEXT } from "~/Component/Common/Form/common"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { RemoveRefButton, UpdateRefButton } from "~/TableSearchMeta/ReferenceData/ReferenceButtons"
import { getGLAccountMappingTypes, getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { saveGLAccountMapping } from "~/ApiServices/BizApi/gl/GeneralLedgerIF"

const GLAccountMapping = (props: { accountType: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  const [GLAccountsMapping, setGLAccountsMapping] = useState<any[]>([])
  const [mapping, setMapping] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    if (showModal) {
      getGLAccountMappingTypes().then((x) => {
        if (x.success) setGLAccountsMapping(x.data)
      })
    }
  }, [showModal])
  return (
    <>
      <Button type="link" onClick={() => setShowModal(true)}>
        Mapping
      </Button>
      {showModal && (
        <Modal width="400px">
          <Card
            title={`GL Account '${props.accountType.Name}' mapping to target`}
            actions={[
              <Button onClick={() => setShowModal(false)}>Close</Button>,
              <Button
                onClick={() =>
                  saveGLAccountMapping(Object.keys(mapping).map((key) => mapping[key])).then((x) => {
                    if (x.success) message.success("Saved!", 2)
                    else message.error("Failed to Save!", 2)
                  })
                }
              >
                Save
              </Button>
            ]}
          >
            <table>
              <thead>
                <tr>
                  <th>Mapping Type</th>
                  <th style={{ width: "50px" }}></th>
                  <th>Mapping Target</th>
                </tr>
              </thead>
              <tbody>
                {GLAccountsMapping.map((x, i) => (
                  <tr key={i}>
                    <td>{x.Description}</td>
                    <td style={{ width: "50px" }}></td>
                    <td>
                      <Input
                        style={{ width: "100%" }}
                        onChange={($event) => {
                          $event.persist()
                          console.log($event.target.value)
                          if ($event.target.value !== "") {
                            setMapping({
                              ...mapping,
                              [x.ID]: {
                                GLAccountID: props.accountType.ID,
                                GLAccountMappingID: x.ID,
                                MappingTarget: $event.target.value
                              }
                            })
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Modal>
      )}
    </>
  )
}
export const FormMeta: IField[] = [
  {
    label: "Name",
    fieldName: "Name",
    inputType: TEXT
  },
  {
    label: "Item Code",
    fieldName: "ItemCode",
    inputType: TEXT
  },
  {
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
  },
  {
    label: "Is Active",
    fieldName: "IsActive",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  },
  {
    label: "Membership Eligible",
    fieldName: "IsMembershipEligible",
    inputType: DROPDOWN,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false }
    ]
  },
  {
    label: "SortPosition",
    fieldName: "SortPosition",
    inputType: NUMBER
  },
  {
    label: "Allocation Order",
    fieldName: "AllocationOrder",
    inputType: NUMBER
  },
  {
    label: "Organization",
    inputType: DROPDOWN,
    refLookupService: getOrganizations,
    fieldName: "OrganizationID",
    displayKey: "Name",
    valueKey: "OrganizationID"
  }
]

export const columns: TableColumnType = [
  {
    title: "ID",
    dataIndex: "ID"
  },
  {
    title: "Name",
    dataIndex: "Name"
  },
  { title: "Description", dataIndex: "Description" },
  { title: "Item Code", dataIndex: "ItemCode" },
  { title: "Active", dataIndex: "IsActive", render: renderBoolean },
  { title: "Membership Eligible", dataIndex: "IsMembershipEligible", render: renderBoolean },
  { title: "Sort Position", dataIndex: "SortPosition" },
  {
    title: "Organization ID",
    dataIndex: "OrganizationID",
    render: (text, record) => <Link to={`/organization/${text}`}>{text}</Link>
  },
  { title: "Allocation Order", dataIndex: "AllocationOrder" },
  {
    title: "Actions",
    render: (text, record) => (
      <Dropdown.Button
        overlay={
          <Menu>
            <Menu.Item>
              <UpdateRefButton
                type="link"
                formMeta={FormMeta}
                LookUpName={"AccountType"}
                reference={record}
                refreshEventName={"REFRESH_AccountType"}
              />
            </Menu.Item>
            <Menu.Item>
              <RemoveRefButton
                type="link"
                ID={record.ID}
                LookUpName={"AccountType"}
                refreshEventName={"REFRESH_AccountType"}
              />
            </Menu.Item>
            <Menu.Item>
              <GLAccountMapping accountType={record} />
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

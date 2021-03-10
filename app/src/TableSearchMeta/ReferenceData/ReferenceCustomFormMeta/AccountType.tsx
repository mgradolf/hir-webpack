import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Dropdown, Menu, message, Select } from "antd"
import { BOOLEAN, IField, NUMBER, TEXT } from "~/Component/Common/Form/common"
import Modal from "~/Component/Common/Modal/index2"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { RemoveRefButton, UpdateRefButton } from "~/TableSearchMeta/ReferenceData/ReferenceButtons"
import { getSystemEvent } from "~/ApiServices/Service/RefLookupService"
import { createorUpdateMultipleAccountEmail } from "~/ApiServices/BizApi/account/accountIF"

const SetupEmailButton = (props: { accountType: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  const [systemEvents, setSystemEvents] = useState<any[]>([])
  const [emailComponents] = useState(["", "Approved", "Denied", "Pending"])
  const [emailSetup, setEmailSetup] = useState<any[]>([])

  useEffect(() => {
    if (showModal) {
      getSystemEvent().then((x) => {
        if (x.success) setSystemEvents(x.data.filter((item: any) => item.SystemEventSource === "account"))
      })
    }
  }, [showModal])
  return (
    <>
      <Button onClick={() => setShowModal(true)}>Setup Email</Button>
      {showModal && (
        <Modal width="400px">
          <Card
            title={`Email Setup for '${props.accountType.Name}`}
            actions={[
              <Button onClick={() => setShowModal(false)}>Close</Button>,
              <Button
                onClick={() =>
                  createorUpdateMultipleAccountEmail(emailSetup).then((x) => {
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
                  <th>System Event</th>
                  <th style={{ width: "50px" }}></th>
                  <th>Email Component</th>
                </tr>
              </thead>
              <tbody>
                {systemEvents.map((x) => (
                  <tr>
                    <td>{x.Name}</td>
                    <td style={{ width: "50px" }}></td>
                    <td>
                      <Select
                        style={{ width: "100%" }}
                        onSelect={(selectedValue) => {
                          if (selectedValue !== "") {
                            setEmailSetup([
                              ...emailSetup,
                              {
                                AccountTypeID: props.accountType.ID,
                                SystemEventID: x.ID,
                                EmailComponent: selectedValue
                              }
                            ])
                          }
                        }}
                      >
                        {emailComponents.map((x) => (
                          <Select.Option value={x}>{x}</Select.Option>
                        ))}
                      </Select>
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
    label: "Description",
    fieldName: "Description",
    inputType: TEXT
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
  {
    title: "Name",
    dataIndex: "Name"
  },
  { title: "Description", dataIndex: "Description" },
  { title: "Active", dataIndex: "IsActive", render: renderBoolean },
  { title: "Sort Position", dataIndex: "SortPosition" },
  {
    title: "Actions",
    render: (text, record) => (
      <Dropdown.Button
        overlay={
          <Menu>
            <Menu.Item>
              <UpdateRefButton
                formMeta={FormMeta}
                LookUpName={"AccountType"}
                reference={record}
                refreshEventName={"REFRESH_AccountType"}
              />
            </Menu.Item>
            <Menu.Item>
              <RemoveRefButton ID={record.ID} LookUpName={"AccountType"} refreshEventName={"REFRESH_AccountType"} />
            </Menu.Item>
            <Menu.Item>
              <SetupEmailButton accountType={record} />
            </Menu.Item>
            <Menu.Item>
              <Link className="Button" to={`/reference-data/AccountType/${record.ID}/tags`}>
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

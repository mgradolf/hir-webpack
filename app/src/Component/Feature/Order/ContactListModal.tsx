import React, { useState } from "react"
import { Button, Card } from "antd"
import { renderDate, renderEmail, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import zIndex from "~/utils/zIndex"
import Modal from "~/Component/Common/Modal/index2"
import { CartModel } from "./Model/CartModel"

export const ContactListModal = (props: {
  disabled: boolean
  onSelect: (recipientPersonIDs?: number[]) => void
  cartModel: CartModel
}) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<any[]>([])

  const rowSelection: any = {
    type: "checkbox",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedStudents(selectedRows)
    }
  }
  return (
    <>
      <Button
        disabled={props.disabled}
        onClick={() => {
          console.log("Register Others clicked")
          setShowModal(true)
        }}
      >
        Register Others
      </Button>
      {showModal && (
        <Modal width="1000px" zIndex={zIndex.defaultModal + 2}>
          <Card
            title="Select Student"
            actions={[
              <Button type="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>,
              <Button
                type="primary"
                disabled={selectedStudents.length === 0}
                onClick={() => {
                  props.onSelect(selectedStudents && selectedStudents.map((x) => x.PersonID))
                  setShowModal(false)
                }}
              >
                Select
              </Button>
            ]}
          >
            <ResponsiveTable
              columns={[
                { title: "Last Name", dataIndex: "LastName" },
                { title: "First Name", dataIndex: "FirstName" },
                { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
                { title: "Birth Date", dataIndex: "Birthday", render: renderDate },
                { title: "Role", dataIndex: "AffiliationRoleTypeName" },
                { title: "Status", dataIndex: "AccountAffiliationStatusName" }
              ]}
              searchFunc={getAccountAffiliation}
              searchParams={{ PersonID: props.cartModel.PersonID, ExceptRoleTypeID: 8 }}
              isModal={true}
              rowSelection={rowSelection}
              tableName="asdsads"
              refreshEventName="REFRESH"
            />
          </Card>
        </Modal>
      )}
    </>
  )
}

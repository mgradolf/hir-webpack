import React, { useState } from "react"
import { Button, Card, Col, Row } from "antd"
import { renderDate, renderEmail, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import zIndex from "~/utils/zIndex"
import Modal from "~/Component/Common/Modal/index2"
import { IBuyer } from "~/Component/Feature/Order/Model/Interface/IModel"
import { AccountRelationFormModalOpenButton } from "~/Component/Feature/Person/Forms/PersonAccountFormModal"

export const ContactListModal = (props: {
  disabled: boolean
  onSelect: (recipientPersonIDs?: number[]) => void
  buyer: IBuyer
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
        type="primary"
        onClick={() => {
          console.log("Register Others clicked")
          setShowModal(true)
        }}
      >
        Register Students
      </Button>
      {showModal && (
        <Modal width="1000px" zIndex={zIndex.defaultModal + 2}>
          <Card
            title={
              <Row justify="space-between">
                <Col>Select Student</Col>
                <Col>
                  <AccountRelationFormModalOpenButton
                    personData={{ AccountID: props.buyer.AccountID, PersonID: props.buyer.PersonID }}
                    zIndex={zIndex.defaultModal + 10}
                  />
                  {/* <AccountContactFormOpenButton
                    iconType="create"
                    editMode={false}
                    initialValues={{ AccountID: props.buyer.AccountID }}
                    zIndex={zIndex.defaultModal + 10}
                  /> */}
                </Col>
              </Row>
            }
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
              searchParams={{ PersonID: props.buyer.PersonID, ExceptRoleTypeID: 8 }}
              rowSelection={rowSelection}
              tableName="asdsads"
              refreshEventName="REFRESH_CONTACT_TAB"
            />
          </Card>
        </Modal>
      )}
    </>
  )
}

import React, { useState } from "react"
import { Button, Card, Col, Input, message, Row } from "antd"
import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { DROPDOWN, TEXT } from "~/Component/Common/Form/common"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import Modal from "~/Component/Common/Modal/index2"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import zIndex from "~/utils/zIndex"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IBuyer, IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"
import { ContactListModal } from "~/Component/Feature/Order/ContactListModal"

type sectionAddType = "buy" | "me" | "others"
export const AddProgramApplicationModal = (props: {
  buyer: IBuyer
  itemList: IItemRequest[]
  cartModelFunctionality: CartModelFunctionality
  sectionAddType: sectionAddType
}) => {
  const [showModal, setShowModal] = useState(false)
  const [searchParams, setSearchParams] = useState<any>()
  const [selectedItem, setSelectedItem] = useState<any>()
  const [loading, setLoading] = useState(false)

  const closeModal = () => {
    setLoading(false)
    setSearchParams(undefined)
    setSelectedItem(undefined)
    setShowModal(false)
  }

  let selectButton: JSX.Element = <></>
  let buttonLabel = ""
  switch (props.sectionAddType) {
    case "buy":
      buttonLabel = "Buy Seats (Program)"
      selectButton = (
        <Row justify="center">
          <Col span={12}>
            <Input.Search
              type="number"
              disabled={!selectedItem}
              loading={loading}
              onSearch={(seatCount: string) => {
                if (seatCount && !isNaN(Number(seatCount))) {
                  setLoading(true)
                  const requests = []
                  console.log(selectedItem)
                  for (let i = 0; i < Number(seatCount); i++) {
                    requests.push(props.cartModelFunctionality.createProgramApplicationRequest(selectedItem.ProgramID))
                  }
                  Promise.all(requests).then((responses) => {
                    closeModal()
                  })
                }
              }}
              enterButton=" Buy Seats"
            />
          </Col>
        </Row>
      )
      break
    case "me":
      buttonLabel = `Register ${
        props.buyer.PersonProfile ? props.buyer.PersonProfile.PersonDescriptor : "Selected Buyer"
      } (Program)`
      selectButton = (
        <Button
          type="primary"
          disabled={!selectedItem}
          onClick={() => {
            setLoading(true)
            props.cartModelFunctionality
              .createProgramApplicationRequest(selectedItem.ProgramID, props.buyer.PersonID)
              .then((response) => {
                closeModal()
              })
          }}
        >
          {buttonLabel}
        </Button>
      )
      break
    case "others":
      buttonLabel = "Register Students (Program)"
      selectButton = (
        <ContactListModal
          disabled={!selectedItem}
          onSelect={(selectedStudentIds) => {
            if (selectedStudentIds && selectedStudentIds.length > 0) {
              setLoading(true)
              const requests = []
              for (const id of selectedStudentIds) {
                requests.push(props.cartModelFunctionality.createProgramApplicationRequest(selectedItem.ProgramID, id))
              }
              Promise.all(requests).then((responses) => {
                closeModal()
              })
            }
          }}
          buyer={props.buyer}
        />
      )
      break
  }

  return (
    <>
      <Button
        onClick={() => {
          if (props.buyer && props.buyer.PersonID) {
            setShowModal(true)
          } else {
            message.warning("You must Select a Buyer first!", 5)
          }
        }}
        type="link"
      >
        {buttonLabel}
      </Button>
      {showModal && props.buyer && props.buyer.PersonID && (
        <Modal width="1000px" zIndex={zIndex.defaultModal + 1} apiCallInProgress={loading || loading || loading}>
          <Card
            title="Select Program Application"
            actions={[
              <Button type="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>,
              selectButton
            ]}
          >
            <div className="modal-card">
              <MetaDrivenForm
                meta={[
                  { label: "Program Code", inputType: TEXT, fieldName: "programCode" },
                  { label: "Program Name", inputType: TEXT, fieldName: "programName" },
                  {
                    label: "Department",
                    fieldName: "OrganizationID",
                    inputType: DROPDOWN,
                    refLookupService: getOrganizations,
                    displayKey: "Name",
                    valueKey: "OrganizationID"
                  }
                ]}
                onApplyChanges={(newSearchParams, newSearchParamsCount) => {
                  setSearchParams({ ...newSearchParams, programStatusCodeID: 3, hasApplicationProcess: true })
                }}
                stopProducingQueryParams={true}
              />
              <ResponsiveTable
                {...getProgramTableColumns(true)}
                searchParams={searchParams}
                refreshEventName="REFRESH_PROGRAM_APPLICATION_SHOP"
                isModal={true}
                rowSelection={{
                  type: "radio",
                  onChange: (selectedRowKeys: any, selectedRows: any) => {
                    setSelectedItem(selectedRows[0])
                  }
                }}
              />
            </div>
          </Card>
        </Modal>
      )}
    </>
  )
}

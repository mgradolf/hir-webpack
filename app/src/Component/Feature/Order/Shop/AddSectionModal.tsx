import { Button, Card, Col, Input, message, Row } from "antd"
import React, { useEffect, useState } from "react"
import { findSectionsLite } from "~/ApiServices/BizApi/query/queryIf"
import { getOrganizations, getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import { DATE_PICKER, DROPDOWN, TEXT } from "~/Component/Common/Form/common"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import Modal from "~/Component/Common/Modal/index2"
import { renderDate, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import zIndex from "~/utils/zIndex"
import { ContactListModal } from "~/Component/Feature/Order/ContactListModal"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IBuyer, IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

type sectionAddType = "buy" | "me" | "others"
export const AddSectionModal = (props: {
  buyer: IBuyer
  itemList: IItemRequest[]
  cartModelFunctionality: CartModelFunctionality
  sectionAddType: sectionAddType
}) => {
  const [showModal, setShowModal] = useState(false)
  const [searchParams, setSearchParams] = useState<any>()
  const [selectedItem, setSelectedItem] = useState<any>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchParams(undefined)
    setSelectedItem(undefined)
  }, [showModal])

  let selectButton: JSX.Element = <></>
  let buttonLabel = ""
  switch (props.sectionAddType) {
    case "buy":
      buttonLabel = "Buy Seats"
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
                    requests.push(
                      props.cartModelFunctionality.addRegistrationRequest(
                        selectedItem.SeatGroups,
                        selectedItem.SeatGroupID
                      )
                    )
                  }
                  Promise.all(requests).then((responses) => {
                    setLoading(false)
                    setShowModal(false)
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
      }`
      selectButton = (
        <Button
          type="primary"
          disabled={!selectedItem}
          onClick={() => {
            setLoading(true)
            props.cartModelFunctionality
              .addRegistrationRequest(selectedItem.SeatGroups, selectedItem.SeatGroupID, props.buyer.PersonID)
              .then((response) => {
                setShowModal(false)
              })
          }}
        >
          {buttonLabel}
        </Button>
      )
      break
    case "others":
      buttonLabel = "Register Students"
      selectButton = (
        <ContactListModal
          disabled={!selectedItem}
          onSelect={(selectedStudentIds) => {
            if (selectedStudentIds && selectedStudentIds.length > 0) {
              setLoading(true)
              const requests = []
              for (const id of selectedStudentIds) {
                requests.push(
                  props.cartModelFunctionality.addRegistrationRequest(
                    selectedItem.SeatGroups,
                    selectedItem.SeatGroupID,
                    id
                  )
                )
              }
              Promise.all(requests).then((responses) => {
                // props.setCartModelState(props.cartModelState)
                setLoading(false)
                setShowModal(false)
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
            title="Select Section"
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
                  { label: "Section Number", inputType: TEXT, fieldName: "SectionNumber" },
                  { label: "Offering Name", inputType: TEXT, fieldName: "OfferingName" },
                  { label: "Start Date", inputType: DATE_PICKER, fieldName: "StartDate" },
                  {
                    label: "Department",
                    fieldName: "OrganizationID",
                    inputType: DROPDOWN,
                    refLookupService: getOrganizations,
                    displayKey: "Name",
                    valueKey: "OrganizationID"
                  },
                  { label: "Package Name", inputType: TEXT, fieldName: "PackageName" },
                  {
                    label: "Status",
                    inputType: DROPDOWN,
                    fieldName: "SectionStatusCodeID",
                    refLookupService: getSectionStatusCode,
                    displayKey: "Name",
                    valueKey: "StatusID"
                  }
                ]}
                onApplyChanges={(newSearchParams, newSearchParamsCount) => {
                  setSearchParams(newSearchParams)
                }}
                stopProducingQueryParams={true}
              />
              <ResponsiveTable
                columns={[
                  { title: "Section Number", dataIndex: "SectionNumber" },
                  { title: "Offering Name", dataIndex: "OfferingName" },
                  { title: "Start Date", dataIndex: "StartDate", render: renderDate },
                  { title: "Final Enrollment Date", dataIndex: "Final Enrollment Date", render: renderDate },
                  { title: "SeatGroup", dataIndex: "SeatGroupName" },
                  { title: "Available", dataIndex: "AvailableSeats" },
                  { title: "Status", dataIndex: "StatusCode" }
                ]}
                searchFunc={findSectionsLite}
                searchParams={searchParams}
                refreshEventName="REFRESH_SECTION_SHOP"
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

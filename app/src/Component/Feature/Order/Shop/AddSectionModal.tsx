import { Button, Card, Input, message } from "antd"
import React, { useState } from "react"
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

export const AddSectionModal = (props: {
  buyer: IBuyer
  itemList: IItemRequest[]
  cartModelFunctionality: CartModelFunctionality
}) => {
  const [showModal, setShowModal] = useState(false)
  const [searchParams, setSearchParams] = useState<any>()
  const [selectedItem, setSelectedItem] = useState<any>()
  const [loadingBuyseats, setLoadingBuyseats] = useState(false)
  const [loadingRegisterMe, setLoadingRegisterMe] = useState(false)
  const [loadingRegisterOthers, setLoadingRegisterOthers] = useState(false)
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
        Add Section
      </Button>
      {showModal && props.buyer && props.buyer.PersonID && (
        <Modal
          width="1000px"
          zIndex={zIndex.defaultModal + 1}
          apiCallInProgress={loadingBuyseats || loadingRegisterMe || loadingRegisterOthers}
        >
          <Card
            title="Select Section"
            actions={[
              <Button type="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>,
              <Input.Search
                type="number"
                disabled={!selectedItem}
                loading={loadingBuyseats}
                onSearch={(seatCount: string) => {
                  if (seatCount && !isNaN(Number(seatCount))) {
                    setLoadingBuyseats(true)
                    const requests = []
                    console.log(selectedItem)
                    for (let i = 0; i < Number(seatCount); i++) {
                      requests.push(props.cartModelFunctionality.addRegistrationRequest(selectedItem.SectionID))
                    }
                    Promise.all(requests).then((responses) => {
                      // props.setCartModelState(props.cartModelState)
                      setLoadingBuyseats(false)
                      setShowModal(false)
                    })
                  }
                }}
                enterButton=" Buy Seats"
              />,
              <Button
                type="primary"
                disabled={!selectedItem}
                onClick={() => {
                  setLoadingRegisterMe(true)
                  props.cartModelFunctionality
                    .addRegistrationRequest(selectedItem.SectionID, props.buyer.PersonID)
                    .then((response) => {
                      // props.setCartModelState(props.cartModelState)
                      setShowModal(false)
                    })
                }}
              >
                Register Me
              </Button>,
              <ContactListModal
                disabled={!selectedItem}
                onSelect={(selectedStudentIds) => {
                  if (selectedStudentIds && selectedStudentIds.length > 0) {
                    setLoadingRegisterOthers(true)
                    const requests = []
                    for (const id of selectedStudentIds) {
                      requests.push(props.cartModelFunctionality.addRegistrationRequest(selectedItem.SectionID, id))
                    }
                    Promise.all(requests).then((responses) => {
                      // props.setCartModelState(props.cartModelState)
                      setLoadingRegisterOthers(false)
                      setShowModal(false)
                    })
                  }
                }}
                buyer={props.buyer}
              />
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

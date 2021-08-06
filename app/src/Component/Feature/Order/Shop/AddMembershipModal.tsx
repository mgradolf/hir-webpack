import React, { useState } from "react"
import { Button, Card, message } from "antd"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import Modal from "~/Component/Common/Modal/index2"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import zIndex from "~/utils/zIndex"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IBuyer, IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { MembershipSearchMeta } from "~/TableSearchMeta/Membership/MembershipSearchMeta"
import { getMembershipTableColumns } from "~/TableSearchMeta/Membership/MembershipTableColumns"

export const AddMembershipModal = (props: {
  buyer: IBuyer
  itemList: IItemRequest[]
  cartModelFunctionality: CartModelFunctionality
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
        Buy Membership
      </Button>
      {showModal && props.buyer && props.buyer.PersonID && (
        <Modal width="1000px" zIndex={zIndex.defaultModal + 1} apiCallInProgress={loading || loading || loading}>
          <Card
            title="Select Membership"
            actions={[
              <Button type="ghost" onClick={() => setShowModal(false)}>
                Cancel
              </Button>,
              <Button
                type="primary"
                disabled={!selectedItem}
                loading={loading}
                onClick={() => {
                  setLoading(true)
                  props.buyer &&
                    props.buyer.PersonID &&
                    props.cartModelFunctionality
                      .createMembershipRequest(selectedItem.MembershipDefinitionID, props.buyer.PersonID)
                      .then((response) => {
                        if (response.success) closeModal()
                        setLoading(false)
                      })
                }}
              >
                Select
              </Button>
            ]}
          >
            <div className="modal-card">
              <MetaDrivenForm
                meta={MembershipSearchMeta}
                onApplyChanges={(newSearchParams, newSearchParamsCount) => {
                  setSearchParams({ ...newSearchParams, programStatusCodeID: 3, hasApplicationProcess: true })
                }}
                stopProducingQueryParams={true}
              />
              <ResponsiveTable
                {...getMembershipTableColumns(true)}
                searchParams={searchParams}
                refreshEventName="REFRESH_MEMBERSHIP_SHOP"
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

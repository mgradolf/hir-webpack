import { Button } from "antd"
import React, { useState } from "react"
import ApplyDiscountModal from "~/Component/Feature/Section/Order/ApplyDiscountModal"
import IssueCreditModal from "~/Component/Feature/Section/Order/IssueCreditModal"
import ViewReturnItemsModal from "~/Component/Feature/Section/Order/ViewReturnItemsModal"

export const ViewReturnItemModalOpenButton = (props: { OrderItemID: number; OrderID: number; helpKey?: string }) => {
  const [showViewReturnItemModal, setShowViewReturnItemModal] = useState(false)
  return (
    <>
      <Button type="link" onClick={() => setShowViewReturnItemModal(!showViewReturnItemModal)}>
        View Return Items
      </Button>
      {showViewReturnItemModal && (
        <ViewReturnItemsModal
          setShowViewReturnItemsModal={setShowViewReturnItemModal}
          OrderItemID={props.OrderItemID}
          OrderID={props.OrderID}
          helpKey={props.helpKey}
        />
      )}
    </>
  )
}
export const IssueCreditModalOpenButton = (props: { OrderItemID: number; OrderID: number; helpKey?: string }) => {
  const [showIssueCreditModal, setShowIssueCreditModal] = useState(false)
  return (
    <>
      <Button type="link" onClick={() => setShowIssueCreditModal(!showIssueCreditModal)}>
        Issue Credit
      </Button>
      {showIssueCreditModal && (
        <IssueCreditModal
          setShowViewReturnItemsModal={setShowIssueCreditModal}
          OrderItemID={props.OrderItemID}
          OrderID={props.OrderID}
          helpKey={props.helpKey}
        />
      )}
    </>
  )
}
export const ApplyDiscountModalOpenButton = (props: { OrderItemID: number; OrderID: number; helpKey?: string }) => {
  const [showApplyDiscountModal, setShowApplyDiscountModal] = useState(false)
  return (
    <>
      <Button type="link" onClick={() => setShowApplyDiscountModal(!showApplyDiscountModal)}>
        Apply Discounts
      </Button>
      {showApplyDiscountModal && (
        <ApplyDiscountModal
          setShowViewReturnItemsModal={setShowApplyDiscountModal}
          OrderItemID={props.OrderItemID}
          OrderID={props.OrderID}
          helpKey={props.helpKey}
        />
      )}
    </>
  )
}

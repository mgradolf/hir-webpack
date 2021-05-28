import React, { useEffect } from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { CartModel } from "~/Component/Feature/Order/Model/CartModel"

export const CartTable = (props: { cartModel: CartModel }) => {
  useEffect(() => {
    console.log("cartModelState changed ", props.cartModel)
  }, [props.cartModel])

  return (
    <>
      <ResponsiveTable
        columns={[
          { title: "Name", dataIndex: "ItemName" },
          { title: "Recipient Person", dataIndex: "RecipientPersonName" },
          { title: "Item Type", dataIndex: "ItemType" }
        ]}
        dataSource={props.cartModel.ItemList}
      />
    </>
  )
}

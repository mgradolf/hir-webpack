import React from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export const CartTable = (props: { itemList: IItemRequest[]; cartModelFunctionality: CartModelFunctionality }) => {
  return (
    <>
      <ResponsiveTable
        columns={[
          { title: "Name", dataIndex: "ItemName" },
          { title: "Recipient Person", dataIndex: "RecipientPersonName" },
          { title: "Item Type", dataIndex: "ItemType" }
        ]}
        dataSource={props.itemList}
      />
    </>
  )
}

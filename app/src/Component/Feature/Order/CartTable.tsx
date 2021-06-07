import React from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IItemRequest, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { RegistrationCartItemDetailsModal } from "~/Component/Feature/Order/Registration/RegistrationCartItemDetailsModal"

export const CartTable = (props: { itemList: IItemRequest[]; cartModelFunctionality: CartModelFunctionality }) => {
  return (
    <>
      <ResponsiveTable
        columns={[
          {
            title: "Name",
            dataIndex: "ItemName",
            render: (text, record) => (
              <RegistrationCartItemDetailsModal
                cartModelFunctionality={props.cartModelFunctionality}
                itemList={props.itemList}
                item={record as IRegistrationRequest}
              />
            )
          },
          { title: "Recipient Person", dataIndex: "RecipientPersonName" },
          { title: "Item Type", dataIndex: "ItemType" }
        ]}
        dataSource={props.itemList}
      />
    </>
  )
}

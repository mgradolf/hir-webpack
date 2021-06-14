import React from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import {
  IItemRequest,
  IProgramApplicationRequest,
  IRegistrationRequest
} from "~/Component/Feature/Order/Model/Interface/IModel"
import { RegistrationCartItemDetailsModal } from "~/Component/Feature/Order/Registration/RegistrationCartItemDetailsModal"
import { ProgramApplicationCartItemDetailsModal } from "~/Component/Feature/Order/ProgramApplication/ProgramApplicationCartItemDetailsModal"

export const CartTable = (props: { itemList: IItemRequest[]; cartModelFunctionality: CartModelFunctionality }) => {
  return (
    <>
      <ResponsiveTable
        rowKey="RequestID"
        columns={[
          {
            title: "Name",
            dataIndex: "ItemName",
            render: (text, record) => {
              switch (record.ItemType) {
                case "RegistrationRequest":
                  return (
                    <RegistrationCartItemDetailsModal
                      cartModelFunctionality={props.cartModelFunctionality}
                      itemList={props.itemList}
                      item={record as IRegistrationRequest}
                    />
                  )
                case "ProgramApplicationRequest":
                  return (
                    <ProgramApplicationCartItemDetailsModal
                      cartModelFunctionality={props.cartModelFunctionality}
                      itemList={props.itemList}
                      item={record as IProgramApplicationRequest}
                    />
                  )
              }
              return null
            }
          },
          { title: "Quantity", dataIndex: "ItemQuantity" },
          { title: "Unit Price", dataIndex: "UnitPrice" }
        ]}
        dataSource={props.itemList}
      />
    </>
  )
}

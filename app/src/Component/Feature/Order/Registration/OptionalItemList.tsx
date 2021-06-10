import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Typography } from "antd"
import React, { useEffect, useState } from "react"
import { findOptionalItemBySeatGroupID, findProductBySeatGroupID } from "~/ApiServices/BizApi/query/queryIf"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IItemRequest, IRegistrationRequest } from "~/Component/Feature/Order/Model/Interface/IModel"

export const OptionalItemList = (props: {
  itemList: IItemRequest[]
  item: IRegistrationRequest
  cartModelFunctionality: CartModelFunctionality
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])

  useEffect(() => {
    if (props.item && props.item.ItemList)
      setSelectedRowKeys(
        props.item.ItemList.map((x) => {
          if (x.SectionFinancialID) return x.SectionFinancialID
          return x.ProductID
        })
      )
  }, [props.item])
  return (
    <div>
      <Typography.Title level={4}>Select Optional Item</Typography.Title>
      <ResponsiveTable
        columns={[
          { title: "Name", dataIndex: "Name" },
          { title: "Description", dataIndex: "Description" },
          { title: "Price", dataIndex: "Price" }
        ]}
        rowSelection={{
          selectedRowKeys,
          type: "checkbox",
          onChange: (selectedRowKeys: any[], selectedRows: any[]) => {
            setSelectedRowKeys(selectedRowKeys)
            props.cartModelFunctionality.addOptionalItem(
              props.item.SeatGroupID,
              selectedRows.map((x) => x.SectionFinancialID),
              selectedRows.map((x) => x.ProductID)
            )
          }
        }}
        rowKey="rowKey"
        searchFunc={(Param: { [key: string]: any }) =>
          Promise.all([findOptionalItemBySeatGroupID(Param), findProductBySeatGroupID(Param)]).then(
            (results: IApiResponse[]) => {
              const items = results[0]
              const products = results[1]
              const finalResponse = [...items.data, ...products.data].map((x) => {
                x.rowKey = x.SectionFinancialID || x.ProductID
                return x
              })
              return { data: finalResponse, success: true, code: 200, error: false }
            }
          )
        }
        searchParams={{ SeatGroupID: props.item.SeatGroupID }}
      />
    </div>
  )
}

// {
//   "Description" : "Product type optional item",
//   "Price" : 100.00,
//   "Name" : "Product type optional item"
//   "ProductID" : 267,
//   "Quantity" : 1,
// }
// {
//   "Description" : "Textbook Price",
//   "Price" : 1400.0000,
//   "Name" : "Default seat group"
//   "SectionFinancialID" : 12563,
//   "ItemType" : {
//     "ItemTypeDescriptor" : "OptionalItem",
//     "ItemTypeID" : 1000
//   },
//   "Quantity" : 0,
//   "SeatGroupDescriptor" : "Default seat group",
//   "SectionID" : 8884,
//   "SeatGroupID" : 9177,
//   "ItemTypeID" : 1000,
// }

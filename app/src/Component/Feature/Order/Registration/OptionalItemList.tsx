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
    // eslint-disable-next-line
  }, [])
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
              props.item.RequestID,
              props.item.SeatGroupID,
              selectedRows.map((x) => x.SectionFinancialID).filter(Boolean),
              selectedRows.map((x) => x.ProductID).filter(Boolean)
            )
          }
        }}
        rowKey="rowKey"
        searchFunc={(Param: { [key: string]: any }) =>
          Promise.all([findOptionalItemBySeatGroupID(Param), findProductBySeatGroupID(Param)]).then(
            (results: IApiResponse[]) => {
              let finalResponse: any[] = []
              const items = results[0]
              const products = results[1]
              if (items && items.success && Array.isArray(items.data)) finalResponse = [...finalResponse, ...items.data]
              if (products && products.success && Array.isArray(products.data))
                finalResponse = [...finalResponse, ...products.data]

              finalResponse = finalResponse.map((x) => {
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

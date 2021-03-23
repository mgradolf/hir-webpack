import React from "react"
import { Button, Dropdown } from "antd"
import BudgetMenu from "~/Component/Feature/Section/Budget/BudgetMenu"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getSectionFinancials } from "~/ApiServices/Service/SectionService"
import { DownOutlined } from "@ant-design/icons"

export const getSectionFinancialTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Type",
      dataIndex: "FinancialType"
    },
    {
      title: "Item",
      dataIndex: "ItemName"
    },
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "GL Account",
      dataIndex: "GLAccount"
    },
    {
      title: "Basis",
      dataIndex: "FinancialBasisType"
    },
    {
      title: "Amount",
      dataIndex: "ItemUnitAmount",
      render: (text: any) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
    {
      title: "Quantity",
      dataIndex: "ItemQty"
    },
    {
      title: "Item Code",
      dataIndex: "ItemCode"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Dropdown
          overlay={
            <BudgetMenu
              sectionId={record.SectionID}
              financialId={record.FinancialID}
              seatGroups={record.SeatGroups}
              sectionFinancialId={record.SectionFinancialID}
            />
          }
          trigger={["click"]}
        >
          <Button type="primary">
            Go To <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getSectionFinancials }
}

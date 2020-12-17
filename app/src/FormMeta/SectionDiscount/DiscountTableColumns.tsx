import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getSectionDiscounts } from "~/ApiServices/Service/SectionService"
import { Button, Dropdown } from "antd"
import { DownOutlined } from "@ant-design/icons"
import DiscountMenu from "~/Component/Section/Discount/DiscountMenu"

export const getSectionDiscountTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "DiscountProgramName"
    },
    {
      title: "Discount Type",
      dataIndex: "DiscountType"
    },
    {
      title: "GL Account",
      dataIndex: "GLAccount"
    },
    {
      title: "Amount",
      dataIndex: "Amount"
    },
    {
      title: "Amount Type",
      dataIndex: "DiscountAmountType"
    },
    {
      title: "Promoted?",
      dataIndex: "IsPromotedForMarketing",
      render: renderBoolean
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
          overlay={<DiscountMenu sectionId={record.SectionID} sectionDiscountId={record.SectionDiscountID} />}
          trigger={["click"]}
        >
          <Button type="primary" onClick={(e) => e.preventDefault()}>
            Go To <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getSectionDiscounts }
}

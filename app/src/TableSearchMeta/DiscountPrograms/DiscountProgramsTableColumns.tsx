import React from "react"
import { Link } from "react-router-dom"
import { searchDiscountProgram } from "~/ApiServices/Service/FinancialService"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getDiscountProgramsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Name",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/discount-program/${record.DiscountProgramID}`}>{text}</Link>
    },
    {
      title: "Discount Program Type",
      dataIndex: "DiscountType"
    },
    { title: "Amount Type", dataIndex: "DiscountAmountType" },
    { title: "Is Active?", dataIndex: "IsActive", render: renderBoolean },
    { title: "Is Promoted", dataIndex: "IsPromotedForMarketing", render: renderBoolean }
  ]
  return { columns, searchFunc: searchDiscountProgram, tableName: "DiscountProgramsTableColumns" }
}

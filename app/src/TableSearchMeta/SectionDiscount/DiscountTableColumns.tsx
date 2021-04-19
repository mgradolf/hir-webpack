import React from "react"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getSectionDiscounts } from "~/ApiServices/Service/SectionService"
import DiscountMenu from "~/Component/Feature/Section/Discount/DiscountMenu"
import { Link } from "react-router-dom"
import { DISCOUNT_AMOUNT, DISCOUNT_DOLLAR_AMOUNT_TYPE_ID } from "~/utils/Constants"

export const getSectionDiscountTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Discount Program",
      dataIndex: "DiscountProgramName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/discount-program/${record.DiscountProgramID}`}>{text}</Link>
    },
    {
      title: "Section",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => (isModal ? { text } : <Link to={`/section/${record.SectionID}`}>{text}</Link>)
    },
    {
      title: "Offering",
      dataIndex: "OfferingName",
      render: (text: any, record: any) =>
        isModal ? { text } : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Charge Name",
      dataIndex: "FinancialDescription",
      render: undefined
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      render: (text: any, record: any) =>
        record.DiscountAmountTypeID === DISCOUNT_DOLLAR_AMOUNT_TYPE_ID
          ? `${text}${DISCOUNT_AMOUNT.DISCOUNT_DOLLAR_AMOUNT_TYPE_ID}`
          : `${text}${DISCOUNT_AMOUNT.DISCOUNT_PERCENTAGE_AMOUNT_TYPE_ID}`
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <DiscountMenu sectionId={record.SectionID} sectionDiscountId={record.SectionDiscountID} />
      )
    }
  ]

  return { columns, searchFunc: getSectionDiscounts, tableName: "DiscountTableColumns" }
}

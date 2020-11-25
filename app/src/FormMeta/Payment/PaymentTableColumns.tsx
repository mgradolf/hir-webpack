import React from "react"
import { Link } from "react-router-dom"
import { searchPayments } from "~/ApiServices/BizApi/payment/paymentIF"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getPaymentTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Payment ID",
      dataIndex: "PaymentID",
      render: (text: any, record: any) =>
        isModal ? (
          text
        ) : (
          <Link
            to={
              SectionID
                ? `/section/${SectionID}/order/payments/${record.PaymentID}`
                : `/order/payments/${record.PaymentID}`
            }
          >
            {text}
          </Link>
        )
    },
    { title: "Payer", dataIndex: "PersonName" },
    {
      title: "Creation Date",
      dataIndex: "CreateDate",
      render: renderDate
    },
    { title: "Payment Status", dataIndex: "PaymentStatusName" },
    { title: "Check", dataIndex: "CheckNumber" },
    { title: "Reference", dataIndex: "TransactionNumber" },
    { title: "Total Amount", dataIndex: "TotalPaymentAmount" },
    { title: "Payment Type", dataIndex: "Type" },
    { title: "Account", dataIndex: "AccountName" },
    { title: "Deposite ID", dataIndex: "DepositID" },
    { title: "Source", dataIndex: "Source" },
    { title: "Notes", dataIndex: "PaymentNotes" },
    { title: "GL Accounts", dataIndex: "GLAccountNames" }
  ]

  const responsiveColumnIndices = [3, 4, 5]
  const expandableColumnIndices = [6, 7, 8, 9, 10, 11]
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchPayments }
}

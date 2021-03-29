import React from "react"
import { Link } from "react-router-dom"
import { searchPayments } from "~/ApiServices/BizApi/payment/paymentIF"
import { renderDate, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getPaymentTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "PaymentID",
      render: (text: any, record: any) =>
        isModal
          ? text
          : renderDetailsLink(SectionID ? `/section/${SectionID}/order/payments/${text}` : `/order/payments/${text}`)
    },
    {
      title: "Payment Date",
      dataIndex: "CreateDate",
      render: renderDate
    },
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
    {
      title: "Payer",
      dataIndex: "PersonName",
      render: (text, record) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    },
    { title: "Payment Type", dataIndex: "PaymentAcceptedName" },
    { title: "Amount", dataIndex: "TotalPaymentAmount" },
    { title: "Check/ Reference", dataIndex: "TransactionNumber" }
  ]

  return { columns, searchFunc: searchPayments, tableName: "PaymentTableColumns" }
}

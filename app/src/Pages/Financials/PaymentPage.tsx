import { ColumnsType } from "antd/lib/table"
import React from "react"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { searchPayments } from "~/ApiServices/BizApi/payment/paymentIF"
import { PaymentsFiltersMeta } from "~/Component/Section/Order/PaymentFilters/PaymentsFiltersMeta"
import moment from "moment"

export default function PersonTable() {
  const columns: ColumnsType<RecordType> = [
    { title: "Payment ID", dataIndex: "PaymentID" },
    { title: "Payer", dataIndex: "PersonName" },
    {
      title: "Creation Date",
      dataIndex: "CreateDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    // { title: "Payment Status", dataIndex: "paymentStatus" },
    { title: "Payment Type", dataIndex: "Type" },
    // { title: "Check/Reference", dataIndex: "Check" },
    { title: "Account", dataIndex: "AccountName" },
    { title: "Deposite ID", dataIndex: "DepositID" },
    { title: "Source", dataIndex: "Source" },
    { title: "Notes", dataIndex: "PaymentNotes" },
    { title: "GL Accounts", dataIndex: "GLAccountNames" }
  ]
  return (
    <SearchPage
      title="Payments"
      meta={PaymentsFiltersMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: searchPayments,
        rowKey: "PaymentID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}

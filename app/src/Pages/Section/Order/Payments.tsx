import moment from "moment"
import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchPayments } from "~/ApiServices/BizApi/payment/paymentIF"
import PaymentsTable from "~/Component/Common/ResponsiveTable"
import SearchFilters from "~/Component/Common/SearchFilters"
import { PaymentsFiltersMeta } from "~/Component/Section/Order/PaymentFilters/PaymentsFiltersMeta"

export default function Payments(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState([{ SectionID }])
  return (
    <div className="site-layout-content">
      <SearchFilters
        meta={PaymentsFiltersMeta}
        isChecked={false}
        isModalView={true}
        visible={true}
        title="Search Order Items"
        toggleVisiibility={() => {
          console.log("meo")
        }}
        onApplyChanges={(newValues: any, appliedFilterCount: number) => {
          newValues.SectionID = SectionID
          console.log(newValues)
          setSearchParams([newValues])
        }}
        initialFilter={{}}
      />
      <PaymentsTable
        searchFunc={searchPayments}
        searchParams={searchParams}
        rowKey="PaymentID"
        columns={[
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
        ]}
      />
    </div>
  )
}

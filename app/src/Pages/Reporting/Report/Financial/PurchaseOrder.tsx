import React from "react"
import StandardReportPage from "~/Component/Common/Page/ReportPage/StandardReportPage"
import { DATE_PICKERS } from "~/Component/Common/Form/common"

export default function PurchaseOrder() {
  return (
    <StandardReportPage
      title="Purchase Order Report"
      reportName="financial.PurchaserOrderTransaction"
      meta={[
        {
          label: "Order Date Range",
          fieldName: "OrderDateFrom",
          fieldName2: "OrderDateTo",
          ariaLabel: "ReportName",
          inputType: DATE_PICKERS
        }
      ]}
      initialFormValue={{ ReportName: "financial.PurchaserOrderTransaction" }}
    />
  )
}

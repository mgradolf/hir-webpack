import React from "react"
import StandardReportPage from "~/Component/Common/Page/ReportPage/StandardReportPage"
import { DATE_PICKERS, TEXT } from "~/Component/Common/SearchFilters/common"

export default function PurchaseOrder() {
  return (
    <StandardReportPage
      title="Purchase Order Report"
      meta={[
        {
          label: "Report Name",
          fieldName: "ReportName",
          ariaLabel: "ReportName",
          defaultValue: "",
          inputType: TEXT
        },
        {
          label: "Order Date Range",
          fieldName: "OrderDateFrom",
          fieldName2: "OrderDateTo",
          ariaLabel: "ReportName",
          defaultValue: "",
          inputType: DATE_PICKERS
        }
      ]}
      initialFilter={{ ReportName: "financial.PurchaserOrderTransaction" }}
    />
  )
}

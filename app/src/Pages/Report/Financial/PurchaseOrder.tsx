import React from "react"
import StandardReportPage from "~/Component/Common/Page/ReportPage/StandardReportPage"
import { DATE_PICKERS } from "~/Component/Common/SearchFilters/common"

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
          defaultValue: "",
          inputType: DATE_PICKERS
        }
      ]}
      initialFilter={{ ReportName: "financial.PurchaserOrderTransaction" }}
    />
  )
}

import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ReportListSearchMeta } from "~/FormMeta/Report/ReportListSearchMeta"
import { getReportListTableColumns } from "~/FormMeta/Report/ReportListTableColumns"

export default function ReportPage() {
  return (
    <SearchPage
      title="Reports"
      meta={ReportListSearchMeta}
      initialFormValue={{}}
      stopProducingQueryParams={true}
      tableProps={{
        ...getReportListTableColumns()
      }}
    ></SearchPage>
  )
}

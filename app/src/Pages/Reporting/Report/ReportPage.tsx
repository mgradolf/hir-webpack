import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ReportListSearchMeta } from "~/TableSearchMeta/Report/ReportListSearchMeta"
import { getReportListTableColumns } from "~/TableSearchMeta/Report/ReportListTableColumns"

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

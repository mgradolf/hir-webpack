import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getMarketingProgramTableColumns } from "~/TableSearchMeta/MarketingProgram/MarketingProgramTableColumns"

export default function MarketingProgramPage() {
  return (
    <SearchPage
      title="Marketing Programs"
      defaultFormValue={{}}
      tableProps={{
        ...getMarketingProgramTableColumns()
      }}
    />
  )
}

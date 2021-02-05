import React from "react"
import StandardPage from "~/Component/Common/Page/StandardPage"
import { getMarketingProgramTableColumns } from "~/FormMeta/MarketingProgram/MarketingProgramTableColumns"

export default function MarketingProgramPage() {
  return (
    <StandardPage
      title="Marketing Programs"
      defaultFormValue={{}}
      tableProps={{
        ...getMarketingProgramTableColumns()
      }}
    />
  )
}

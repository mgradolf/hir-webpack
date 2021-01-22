import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { MarketingCodeRepositorySearchMeta } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositorySearchMeta"
import { getMarketingCodeRepositoryTableColumns } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositoryTableColumns"

export default function () {
  return (
    <SearchPage
      title="Manage Promotion Codes"
      meta={MarketingCodeRepositorySearchMeta}
      tableProps={{
        ...getMarketingCodeRepositoryTableColumns()
      }}
    ></SearchPage>
  )
}

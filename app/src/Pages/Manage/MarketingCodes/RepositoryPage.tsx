import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { MarketingCodeRepositorySearchMeta } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositorySearchMeta"
import { getMarketingCodeRepositoryTableColumns } from "~/FormMeta/MarketingCodeRepository/MarketingCodeRepositoryTableColumns"

export function MarketingCodeRepositoryPage() {
  return (
    <SearchPage
      title="Manage Maketing Code Repositories"
      meta={MarketingCodeRepositorySearchMeta}
      tableProps={{
        ...getMarketingCodeRepositoryTableColumns()
      }}
    ></SearchPage>
  )
}

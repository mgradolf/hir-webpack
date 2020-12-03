import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { MarketingCodeResponseSearchMeta } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseSearchMeta"
import { getMarketingCodeResponseTableColumns } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"

export function MarketingCodeResponsePage() {
  return (
    <SearchPage
      title="Manage Maketing Code Responses"
      meta={MarketingCodeResponseSearchMeta}
      tableProps={{
        ...getMarketingCodeResponseTableColumns()
      }}
    ></SearchPage>
  )
}

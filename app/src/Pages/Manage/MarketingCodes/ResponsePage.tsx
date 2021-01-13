import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { MarketingCodeResponseSearchMeta } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseSearchMeta"
import { getMarketingCodeResponseTableColumns } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"

export function MarketingCodeResponsePage() {
  return (
    <SearchPage
      title="Marketing Code Responses"
      meta={MarketingCodeResponseSearchMeta}
      tableProps={{
        ...getMarketingCodeResponseTableColumns()
      }}
    ></SearchPage>
  )
}

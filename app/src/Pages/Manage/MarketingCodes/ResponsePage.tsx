import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { MarketingCodeResponseSearchMeta } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseSearchMeta"
import { getMarketingCodeResponseTableColumns } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"

export default function () {
  return (
    <SearchPage
      title="Manage Marketing Code Responses"
      meta={MarketingCodeResponseSearchMeta}
      tableProps={{
        ...getMarketingCodeResponseTableColumns()
      }}
    ></SearchPage>
  )
}

import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { MarketingCodeResponseSearchMeta } from "~/TableSearchMeta/MarketingCodeResponse/MarketingCodeResponseSearchMeta"
import { getMarketingCodeResponseTableColumns } from "~/TableSearchMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"

export default function () {
  return (
    <SearchPage
      title="Manage Promotion Responses"
      meta={MarketingCodeResponseSearchMeta}
      metaName="MarketingCodeResponseSearchMeta"
      tableProps={{
        ...getMarketingCodeResponseTableColumns()
      }}
    ></SearchPage>
  )
}

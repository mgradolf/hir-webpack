import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getSiteTableColumns } from "~/FormMeta/Site/SiteTableColumns"
import { SiteSearchMeta } from "~/FormMeta/Site/SiteSearchMeta"

export default function SitePage() {
  return (
    <SearchPage
      title="Sites"
      meta={SiteSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getSiteTableColumns()
      }}
    ></SearchPage>
  )
}

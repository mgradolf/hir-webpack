import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getSiteTableColumns } from "~/TableSearchMeta/Site/SiteTableColumns"
import { SiteSearchMeta } from "~/TableSearchMeta/Site/SiteSearchMeta"

export default function SitePage() {
  return (
    <SearchPage
      title="Sites"
      meta={SiteSearchMeta}
      metaName="SiteSearchMeta"
      helpKey="administrationDataSitesSearch"
      hideSearchField={false}
      tableProps={{
        ...getSiteTableColumns()
      }}
    ></SearchPage>
  )
}

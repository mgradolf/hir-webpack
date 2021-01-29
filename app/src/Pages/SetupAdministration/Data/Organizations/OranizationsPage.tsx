import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrganizationSearchMeta } from "~/FormMeta/Organization/OrganizationSearchMeta"
import { getOrganizationTableColumns } from "~/FormMeta/Organization/OrganizationTableColumns"

export default function () {
  return (
    <SearchPage
      title="Organization"
      meta={OrganizationSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getOrganizationTableColumns()
      }}
    ></SearchPage>
  )
}

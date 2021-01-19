import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrganizationSearchMeta } from "~/FormMeta/Organization/OrganizationSearchMeta"
import { getOrganizationTableColumns } from "~/FormMeta/Organization/OrganizationTableColumns"

export const OranizationsPage = () => {
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

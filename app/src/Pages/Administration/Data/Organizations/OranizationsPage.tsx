import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { OrganizationSearchMeta } from "~/TableSearchMeta/Organization/OrganizationSearchMeta"
import { getOrganizationTableColumns } from "~/TableSearchMeta/Organization/OrganizationTableColumns"

export default function () {
  return (
    <SearchPage
      title="Organization"
      helpKey="administrationDataOrganizationSearch"
      meta={OrganizationSearchMeta}
      metaName="OrganizationSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getOrganizationTableColumns()
      }}
    ></SearchPage>
  )
}

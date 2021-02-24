import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getBuildingTypeTableColumns } from "~/TableSearchMeta/Building/BuildingTypeTableColumns"
import { BuildingTypeSearchMeta } from "~/TableSearchMeta/Building/BuildingTypeSearchMeta"

export default function BuildingPage() {
  return (
    <SearchPage
      title="Buildings"
      meta={BuildingTypeSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getBuildingTypeTableColumns()
      }}
    ></SearchPage>
  )
}

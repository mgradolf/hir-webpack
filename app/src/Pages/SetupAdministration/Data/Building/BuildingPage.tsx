import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getBuildingTypeTableColumns } from "~/FormMeta/Building/BuildingTypeTableColumns"
import { BuildingTypeSearchMeta } from "~/FormMeta/Building/BuildingTypeSearchMeta"

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

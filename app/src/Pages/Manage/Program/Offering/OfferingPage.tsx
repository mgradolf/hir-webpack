import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import helpFileNameMap from "~/Config/HelpFileMap.json"
import { ProgramOfferingSearchMeta } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingSearchMeta"
import { getProgramOfferingTableColumns } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingTableColumns"

export default function () {
  return (
    <SearchPage
      title="Manage Program Offerings"
      meta={ProgramOfferingSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getProgramOfferingTableColumns()
      }}
      helpKey={helpFileNameMap.generic}
    ></SearchPage>
  )
}

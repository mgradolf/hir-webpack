import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramOfferingSearchMeta } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingSearchMeta"
import { getProgramOfferingTableColumns } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingTableColumns"

export default function () {
  return (
    <SearchPage
      title="Manage Program Offerings"
      meta={ProgramOfferingSearchMeta}
      metaName="ProgramOfferingSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getProgramOfferingTableColumns()
      }}
      helpKey={""}
    ></SearchPage>
  )
}

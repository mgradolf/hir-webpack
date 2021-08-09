import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramOfferingFormOpenButton } from "~/Component/Feature/Program/Forms/ProgramOfferingForm"
import { ProgramOfferingSearchMeta } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingSearchMeta"
import { getProgramOfferingTableColumns } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingTableColumns"

export default function () {
  return (
    <SearchPage
      blocks={[<ProgramOfferingFormOpenButton editMode={false} iconType="create" />]}
      title="Manage Program Offerings"
      meta={ProgramOfferingSearchMeta}
      metaName="ProgramOfferingSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getProgramOfferingTableColumns()
      }}
      helpKey="programsSearchOffering"
    />
  )
}

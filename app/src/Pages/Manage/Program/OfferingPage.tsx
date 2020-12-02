import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ProgramOfferingSearchMeta } from "~/FormMeta/ProgramOffering/ProgramOfferingSearchMeta"
import { getProgramOfferingTableColumns } from "~/FormMeta/ProgramOffering/ProgramOfferingTableColumns"

export function ProgramOfferingPage() {
  return (
    <SearchPage
      title="Manage Persons"
      meta={ProgramOfferingSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getProgramOfferingTableColumns()
      }}
      helpKey="https://docs.google.com/document/d/1FKV-i5gsVClhsHLYFMqpdEGDVZmwJU576AXKKcTfwiY/edit?usp=sharing"
    ></SearchPage>
  )
}

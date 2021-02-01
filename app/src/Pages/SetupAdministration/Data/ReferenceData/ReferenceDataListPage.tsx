import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { ReferenceGenericSearchMeta } from "~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericSearchMeta"
import { getReferenceListTableColumns } from "~/FormMeta/ReferenceData/ReferenceList"

export default function ReferenceDataListPage() {
  return (
    <SearchPage
      title="Reference Data"
      meta={ReferenceGenericSearchMeta}
      initialFilter={{}}
      tableProps={getReferenceListTableColumns()}
    />
  )
}

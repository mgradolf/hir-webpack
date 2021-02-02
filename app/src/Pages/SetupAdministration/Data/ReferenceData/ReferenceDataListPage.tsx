import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { FormMeta as SearchMeta } from "~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericSearchMeta"
import { getReferenceListTableColumns } from "~/FormMeta/ReferenceData/ReferenceList"

export default function ReferenceDataListPage() {
  return (
    <SearchPage
      title="Reference Data"
      meta={SearchMeta}
      initialFilter={{}}
      tableProps={getReferenceListTableColumns()}
    />
  )
}

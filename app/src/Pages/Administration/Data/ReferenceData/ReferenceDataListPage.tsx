import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { FormMeta as SearchMeta } from "~/TableSearchMeta/ReferenceData/ReferenceGeneric/ReferenceGenericSearchMeta"
import { getReferenceListTableColumns } from "~/TableSearchMeta/ReferenceData/ReferenceList"

export default function ReferenceDataListPage() {
  return (
    <SearchPage
      title="Reference Data"
      helpKey="administrationDataSearchReferenceData"
      meta={SearchMeta}
      metaName="ReferenceGenericSearchMeta"
      initialFormValue={{}}
      tableProps={getReferenceListTableColumns()}
    />
  )
}

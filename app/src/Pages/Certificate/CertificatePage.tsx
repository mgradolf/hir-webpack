import React from "react"
import { PersonSearchMeta } from "~/FormMeta/Person/PersonSearchMeta"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"

export default function CertificateTable() {
  return (
    <SearchPage
      title="Manage Certificates"
      meta={PersonSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getPersonTableColumns()
      }}
    ></SearchPage>
  )
}

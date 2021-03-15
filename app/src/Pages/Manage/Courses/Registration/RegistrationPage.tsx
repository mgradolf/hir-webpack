import React from "react"
import { RegistrationSearchMeta } from "~/TableSearchMeta/Registration/RegistrationSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getRegistrationTableColumns } from "~/TableSearchMeta/Registration/RegistrationTableColumns"

export default function RegistrationPage() {
  return (
    <SearchPage
      title="Manage Registrations"
      meta={RegistrationSearchMeta}
      metaName="RegistrationSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getRegistrationTableColumns()
      }}
    ></SearchPage>
  )
}

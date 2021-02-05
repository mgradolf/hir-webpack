import React from "react"
import { RegistrationSearchMeta } from "~/FormMeta/Registration/RegistrationSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"

export default function RegistrationPage() {
  return (
    <SearchPage
      title="Manage Registrations"
      initialFormValue={{}}
      meta={RegistrationSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getRegistrationTableColumns()
      }}
    ></SearchPage>
  )
}

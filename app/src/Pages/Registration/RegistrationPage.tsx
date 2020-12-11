import React from "react"
import { RegistrationSearchMeta } from "~/FormMeta/Registration/RegistrationSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"

export default function RegistrationPage() {
  return (
    <SearchPage
      title="Registrations"
      initialFilter={{}}
      meta={RegistrationSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getRegistrationTableColumns(),
        bordered: true
      }}
    ></SearchPage>
  )
}

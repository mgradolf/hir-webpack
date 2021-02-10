import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"

import { ProgramApplicationSearchMeta } from "~/FormMeta/ProgramApplication/ProgramApplicationSearchMeta"
import { getProgramApplicationTableColumns } from "~/FormMeta/ProgramApplication/ProgramApplicationTableColumns"

export default function ProgramApplication() {
  return (
    <SearchPage
      title="Manage Program Applications"
      meta={ProgramApplicationSearchMeta}
      hideSearchField={false}
      defaultFormValue={{}}
      tableProps={getProgramApplicationTableColumns()}
    ></SearchPage>
  )
}

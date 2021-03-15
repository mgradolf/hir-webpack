import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"

import { ProgramApplicationSearchMeta } from "~/TableSearchMeta/ProgramApplication/ProgramApplicationSearchMeta"
import { getProgramApplicationTableColumns } from "~/TableSearchMeta/ProgramApplication/ProgramApplicationTableColumns"

export default function ProgramApplication() {
  return (
    <SearchPage
      title="Manage Program Applications"
      meta={ProgramApplicationSearchMeta}
      metaName="ProgramApplicationSearchMeta"
      hideSearchField={false}
      defaultFormValue={{}}
      tableProps={getProgramApplicationTableColumns()}
    ></SearchPage>
  )
}

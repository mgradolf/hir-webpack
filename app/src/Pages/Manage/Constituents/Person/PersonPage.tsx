import React from "react"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPersonTableColumns } from "~/TableSearchMeta/Person/PersonTableColumns"
import { PersonFormOpenButton } from "~/Component/Feature/Person/Forms/CreateEdit/PersonFormWithConfig"

export default function PersonTable() {
  return (
    <SearchPage
      blocks={[<PersonFormOpenButton buttonIcon="create" label="Create Person" helpKey="createPerson" />]}
      title="Manage Persons"
      meta={PersonSearchMeta}
      metaName="PersonSearchMeta"
      hideSearchField={false}
      tableProps={{
        ...getPersonTableColumns()
      }}
      helpKey={"personSearchPageForm"}
    ></SearchPage>
  )
}

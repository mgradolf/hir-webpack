import React from "react"
import { PersonSearchMeta } from "~/TableSearchMeta/Person/PersonSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getPersonTableColumns } from "~/TableSearchMeta/Person/PersonTableColumns"
import { HelpContext } from "~/Context/HelpContext"
import { IHelpConfig } from "~/utils/getHelpConfig"
import { PersonFormOpenButton } from "~/Component/Person/Forms/CreateEdit/PersonForm"

export default function PersonTable() {
  return (
    <HelpContext.Consumer>
      {(helpConfig: IHelpConfig) => (
        <SearchPage
          blocks={[<PersonFormOpenButton />]}
          title="Manage Persons"
          meta={PersonSearchMeta}
          hideSearchField={false}
          tableProps={{
            ...getPersonTableColumns()
          }}
          helpUrl={helpConfig.person}
        ></SearchPage>
      )}
    </HelpContext.Consumer>
  )
}

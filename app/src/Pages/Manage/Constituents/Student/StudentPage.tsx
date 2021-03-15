import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getStudentTableColumns } from "~/TableSearchMeta/Student/StudentTableColumns"
import { studentSearchMeta } from "~/TableSearchMeta/Student/StudentSearchMeta"
import { HelpContext } from "~/Help/HelpContext"
import { IHelpConfig } from "~/Help/getHelpConfig"
import { PersonFormOpenButton } from "~/Component/Person/Forms/CreateEdit/PersonFormWithConfig"

export default function PersonTable() {
  return (
    <HelpContext.Consumer>
      {(helpConfig: IHelpConfig) => (
        <SearchPage
          blocks={[<PersonFormOpenButton label={"Create Student"} initialValues={{ Roles: [1] }} />]}
          title="Manage Students"
          meta={studentSearchMeta}
          hideSearchField={false}
          tableProps={{
            ...getStudentTableColumns()
          }}
          helpUrl={helpConfig.generic}
        ></SearchPage>
      )}
    </HelpContext.Consumer>
  )
}

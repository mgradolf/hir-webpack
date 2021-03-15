import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { IHelpConfig } from "~/Help/getHelpConfig"
import { HelpContext } from "~/Help/HelpContext"
import { ProgramOfferingSearchMeta } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingSearchMeta"
import { getProgramOfferingTableColumns } from "~/TableSearchMeta/ProgramOffering/ProgramOfferingTableColumns"

export default function () {
  return (
    <HelpContext.Consumer>
      {(helConfig: IHelpConfig) => (
        <SearchPage
          title="Manage Program Offerings"
          meta={ProgramOfferingSearchMeta}
          metaName="ProgramOfferingSearchMeta"
          hideSearchField={false}
          tableProps={{
            ...getProgramOfferingTableColumns()
          }}
          helpUrl={helConfig.generic}
        ></SearchPage>
      )}
    </HelpContext.Consumer>
  )
}

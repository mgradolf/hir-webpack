import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { IHelpConfig } from "~/Config/Help"
import { HelpContext } from "~/Context/HelpContext"
import { ProductSearchMeta } from "~/TableSearchMeta/Product/ProductSearchMeta"
import { getProductTableColumns } from "~/TableSearchMeta/Product/ProductTableColumns"

export default function PersonTable() {
  return (
    <HelpContext.Consumer>
      {(helpConfig: IHelpConfig) => (
        <SearchPage
          title="Manage Products"
          meta={ProductSearchMeta}
          hideSearchField={false}
          tableProps={{
            ...getProductTableColumns()
          }}
          helpUrl={helpConfig.generic}
        ></SearchPage>
      )}
    </HelpContext.Consumer>
  )
}

import React from "react"
import { AccountSearchMeta } from "~/FormMeta/Account/AccountSearchMeta"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { getAccountTableColumns } from "~/FormMeta/Account/AccountTableColumns"

export default function AccountPage() {
  return (
    <SearchPage
      title="Accounts"
      meta={AccountSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getAccountTableColumns()
      }}
    ></SearchPage>
  )
}

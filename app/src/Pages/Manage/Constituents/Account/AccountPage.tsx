import React from "react"
import { AccountSearchMeta } from "~/TableSearchMeta/Account/AccountSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getAccountTableColumns } from "~/TableSearchMeta/Account/AccountTableColumns"
import { AccountFormOpenButton } from "~/Component/Feature/Account/Forms/AccountFormWithConfig"

export default function AccountPage() {
  return (
    <SearchPage
      blocks={[
        <AccountFormOpenButton
          helpKey="createAccountForm"
          initialValues={{ AllowToPayLater: "Not Allowed", DefaultWaitlistPriority: 5 }}
        />
      ]}
      helpKey="searchAccounts"
      title="Manage Accounts"
      meta={AccountSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getAccountTableColumns()
      }}
    ></SearchPage>
  )
}

import React from "react"
import { AccountSearchMeta } from "~/TableSearchMeta/Account/AccountSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getAccountTableColumns } from "~/TableSearchMeta/Account/AccountTableColumns"
import { AccountFormMeta } from "~/Component/Feature/Account/FormMeta/AccountFormMeta"
import { pushAccount } from "~/ApiServices/Service/AccountService"
import { REFRESH_PAGE } from "~/utils/EventBus"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"

export default function AccountPage() {
  return (
    <SearchPage
      blocks={[
        <MetaDrivenFormModalOpenButton
          buttonLabel="+ Create Account"
          formTitle="Create Account"
          formMeta={AccountFormMeta}
          formMetaName="AccountFormMeta"
          formSubmitApi={pushAccount}
          initialFormValue={{ AllowToPayLater: "Not Allowed", DefaultWaitlistPriority: 5 }}
          defaultFormValue={{ AllowToPayLater: "Not Allowed", DefaultWaitlistPriority: 5 }}
          refreshEventName={REFRESH_PAGE}
        />
      ]}
      title="Manage Accounts"
      meta={AccountSearchMeta}
      hideSearchField={false}
      tableProps={{
        ...getAccountTableColumns()
      }}
    ></SearchPage>
  )
}

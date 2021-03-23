import React, { useState } from "react"
import { Button } from "antd"
import { AccountSearchMeta } from "~/TableSearchMeta/Account/AccountSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getAccountTableColumns } from "~/TableSearchMeta/Account/AccountTableColumns"
import { MetaDrivenFormModal } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { AccountFormMeta } from "~/Component/Feature/Account/FormMeta/AccountFormMeta"
import { pushAccount } from "~/ApiServices/Service/AccountService"
import { REFRESH_PAGE } from "~/utils/EventBus"

export default function AccountPage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Account
          </Button>
          {showModal && (
            <MetaDrivenFormModal
              title={"Create Account"}
              meta={AccountFormMeta}
              metaName={`AccountFormMeta`}
              formSubmitApi={pushAccount}
              initialFormValue={{ AllowToPayLater: "Not Allowed", DefaultWaitlistPriority: 5 }}
              defaultFormValue={{ AllowToPayLater: "Not Allowed", DefaultWaitlistPriority: 5 }}
              refreshEventAfterFormSubmission={REFRESH_PAGE}
              closeModal={() => setShowModal(false)}
            />
          )}
        </>
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

import React, { useState } from "react"
import { AccountSearchMeta } from "~/FormMeta/Account/AccountSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getAccountTableColumns } from "~/FormMeta/Account/AccountTableColumns"
import { Button } from "antd"
import { FormModal } from "~/Component/Common/Form/FormModal"
import { PersonFormMeta } from "~/FormMeta/Person/Basic/PersonFormMeta"

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
            <FormModal
              meta={PersonFormMeta}
              title={"Create Account"}
              initialFormValue={{ RoleName: ["3"] }}
              formSubmitApi={(params: any) => {
                return Promise.resolve({ code: 200, data: [], error: false, success: true })
              }}
              closeModal={() => setShowModal(false)}
            ></FormModal>
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

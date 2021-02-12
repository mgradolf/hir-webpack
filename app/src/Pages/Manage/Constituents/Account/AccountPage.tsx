import React, { useState } from "react"
import { AccountSearchMeta } from "~/FormMeta/Account/AccountSearchMeta"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getAccountTableColumns } from "~/FormMeta/Account/AccountTableColumns"
import { Button } from "antd"
import AccountFormModal from "~/Component/Account/AccountFormModal"

export default function AccountPage() {
  const [showModal, setShowModal] = useState(false)
  return (
    <SearchPage
      blocks={[
        <>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Create Account
          </Button>
          {showModal && <AccountFormModal closeModal={() => setShowModal(false)} />}
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

import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { TransactionModalOpenButton } from "~/Component/Feature/Transaction/TransactionModalOpenButton"
import { getTransactionFinancialTableColumns } from "~/TableSearchMeta/TransactionFinancial/TransactionFinancialTableColumns"
import { TransactionSearchMeta } from "~/TableSearchMeta/TransactionFinancial/TransactionSearchMeta"

export default function TransactionPage() {
  return (
    <SearchPage
      title="Manage Transactions"
      meta={TransactionSearchMeta}
      metaName="TransactionSearchMeta"
      hideSearchField={false}
      blocks={[
        <>
          <TransactionModalOpenButton />
        </>
      ]}
      defaultFormValue={{ IsDepositeView: false }}
      tableProps={getTransactionFinancialTableColumns()}
    />
  )
}

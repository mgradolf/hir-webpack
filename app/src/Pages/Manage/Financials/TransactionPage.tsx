import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getTransactionFinancialTableColumns } from "~/TableSearchMeta/TransactionFinancial/TransactionFinancialTableColumns"
import { TransactionSearchMeta } from "~/TableSearchMeta/TransactionFinancial/TransactionSearchMeta"

export default function TransactionPage() {
  return (
    <SearchPage
      title="Manage Transactions"
      meta={TransactionSearchMeta}
      hideSearchField={false}
      defaultFormValue={{ IsDepositeView: false }}
      tableProps={getTransactionFinancialTableColumns()}
    />
  )
}

import React from "react"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getTransactionFinancialTableColumns } from "~/FormMeta/TransactionFinancial/TransactionFinancialTableColumns"
import { TransactionSearchMeta } from "~/FormMeta/TransactionFinancial/TransactionSearchMeta"

export default function TransactionPage() {
  return (
    <SearchPage
      title="Manage Transactions"
      meta={TransactionSearchMeta}
      hideSearchField={false}
      defaultFilter={{ IsDepositView: false }}
      tableProps={getTransactionFinancialTableColumns()}
    />
  )
}

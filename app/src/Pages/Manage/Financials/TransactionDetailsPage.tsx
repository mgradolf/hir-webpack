import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchTransactions } from "~/ApiServices/Service/TransactionService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getTransactionDetailsMeta } from "~/TableSearchMeta/TransactionFinancial/TransactionDetailsMeta"

export default function TransactionDetailsPage(props: RouteComponentProps<{ depositID: string }>) {
  const DepositID = Number(props?.match?.params?.depositID)
  return (
    <DetailsPage
      getMeta={getTransactionDetailsMeta}
      getDetails={() =>
        searchTransactions({ TransactionID: DepositID, IsDepositeView: false }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      entityType="Transaction"
      entityID={DepositID}
    />
  )
}

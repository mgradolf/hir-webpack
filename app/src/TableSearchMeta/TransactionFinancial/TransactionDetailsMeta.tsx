import React from "react"
import { Link } from "react-router-dom"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getTransactionFinancialDepositeTrackingTableColumns } from "~/TableSearchMeta/TransactionFinancial/TransactionFinancialDepositeTrackingTableColumns"

export const getTransactionDetailsMeta = (transaction: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      {
        label: "Purchaser",
        value: transaction.PersonName,
        render: (text: any) => <Link to={`/person/${transaction.PersonID}`}>{text}</Link>
      },
      {
        label: "Account",
        value: transaction.AffiliatedOrg,
        render: (text: any) => <Link to={`/account/${transaction.AccountID}`}>{text}</Link>
      },
      { label: "Transaction Date", value: transaction.TransactionDate, render: renderDate },
      { label: "Transaction Type", value: transaction.TransactionType },
      { label: "Reference No", value: transaction.ReferenceNo },
      { label: "Description", value: transaction.Description },
      { label: "Deposit", value: transaction.Credit },
      { label: "Withdrawal", value: transaction.Debit },
      { label: "GL", value: transaction.GLAccountName },
      { label: "Department", value: transaction.Department },

      {
        label: "Order ID",
        value: transaction.OrderID,
        render: (text: any) => <Link to={`/order/${transaction.OrderID}`}>{text}</Link>
      },
      {
        label: "Payment ID",
        value: transaction.PaymentID,
        render: (text: any) => <Link to={`/payment/${transaction.PaymentID}`}>{text}</Link>
      }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      actions: [<HelpButton helpKey="financialsTransactionsSummary" />],
      summary: [summary]
    }
  })
  meta.push({
    tabTitle: "Deposit Tracking",
    tabType: "table",
    tabMeta: {
      blocks: [<HelpButton helpKey="financialsTransactionsDepositTracking" />],
      tableProps: {
        ...getTransactionFinancialDepositeTrackingTableColumns(),
        searchParams: {
          IsDepositeView: true,
          DepositID: transaction.DepositTransactionID ? transaction.DepositTransactionID : transaction.TransactionID
        },
        refreshEventName: "REFRESH_DEPOSIT_TRACKING__TAB",
        pagination: false
      }
    }
  })
  return {
    pageTitle: `Transaction ID - ${transaction.TransactionID}`,
    tabs: meta
  }
}

import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getTransactionFinancialTableColumns } from "~/FormMeta/TransactionFinancial/TransactionFinancialTableColumns"

export const getTransactionDetailsMeta = (transaction: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Deposit ID (for deposit centric view only)", value: transaction.DepositID },
      {
        label: "Account Owner",
        value: transaction.PersonName,
        render: (text: any) => <Link to={`/person/${transaction.PersonID}`}>{text}</Link>
      },
      {
        label: "Account Name",
        value: transaction.AffiliatedOrg,
        render: (text: any) => <Link to={`/person/${transaction.AccountID}`}>{text}</Link>
      },
      { label: "Transaction Date", value: transaction.TransactionDate, render: renderDate },
      { label: "Transaction Type", value: transaction.TransactionType },
      { label: "Reference No", value: transaction.ReferenceNo },
      { label: "Description", value: transaction.Description },
      { label: "Deposit", value: transaction.Credit },
      { label: "Withdrawal", value: transaction.Debit },
      { label: "GL", value: transaction.GLAccountName },
      { label: "Department", value: transaction.Department },
      { label: "Balance", value: transaction.Balance },
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
      summary: [summary]
    }
  })
  meta.push({
    tabTitle: "Deposit Tracking",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getTransactionFinancialTableColumns(),
        searchParams: { IsDepositeView: true, DepositID: transaction.DepositTransactionID },
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

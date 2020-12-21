import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"

export const getTransactionDetailsMeta = (transaction: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Date", value: transaction.TransactionDate },
      { label: "Deposit ID (for deposit centric view only)", value: transaction.DepositID },
      { label: "Account Owner", value: transaction.PersonName },
      { label: "Account Name", value: transaction.AffiliatedOrg },
      { label: "Transaction Type", value: transaction.TransactionType },
      { label: "Reference No", value: transaction.ReferenceNo },
      { label: "Description", value: transaction.Description },
      { label: "Deposit", value: transaction.Credit },
      { label: "Withdrawal", value: transaction.Debit },
      { label: "GL", value: transaction.GLAccountName },
      { label: "Department", value: transaction.Department },
      { label: "Balance", value: transaction.Balance }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })
  return {
    pageTitle: `Deposit ID - ${transaction.DepositID}`,
    tabs: meta
  }
}

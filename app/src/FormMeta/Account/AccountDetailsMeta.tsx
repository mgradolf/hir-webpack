import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getAccountAffiliationTableColumn } from "~/FormMeta/AccountAffiliation/getAccountAffiliationTableColumn"

export const getAccountDetailsMeta = (account: { [key: string]: any }): IDetailsMeta[] => {
  const summary: CardContainer = {
    title: account.AccountName,
    contents: [
      // { label: "Account Name", value: account.AccountName },
      { label: "Account Type", value: account.AccountTypeName },
      { label: "Primary Contact", value: account.ContactName },
      { label: "Tax ID", value: account.TaxID },
      { label: "Public", value: account.IsPublic, render: renderBoolean },
      { label: "Allow to Pay Later", value: account.AllowPayLateDescription },
      { label: "Approval Required", value: account.IsApprovalRequired, render: renderBoolean },
      { label: "Default Waitlist Priority", value: account.DefaultWaitlistPriority || 5 },
      { label: "Payment Term", value: account.PaymentTerm }
    ]
  }
  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const contactsMeta: IDetailsTableTabProp = {
    title: "Contacts",
    tableProps: {
      ...getAccountAffiliationTableColumn(),
      searchParams: { AccountID: account.AccountID }
    }
  }

  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Contacts",
      type: "table",
      meta: contactsMeta
    }
  ]
}

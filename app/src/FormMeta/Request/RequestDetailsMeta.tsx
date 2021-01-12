import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"

export const getRequestDetailsMeta = (Request: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: "Basic Info",
    contents: [
      { label: "Status", value: Request.State },
      { label: "Account", value: Request.AccountName },
      { label: "Type", value: Request.RequestType },
      { label: "Purchaser", value: Request.PurchaserPersonName },
      { label: "Created", value: Request.CreateDate, render: renderDate },
      { label: "Source", value: Request.Source },
      { label: "Expires", value: Request.ExpirationDate, render: renderDate }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  return {
    pageTitle: "Request Details",
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      }
    ]
  }
}

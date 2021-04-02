import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { RequestActivityTable } from "~/Component/Feature/Section/Request/RequestActivityTable"
import RequestActionsTable from "~/Component/Feature/Section/Request/RequestActionsTable"
import RequestExpirationHandler from "~/Component/Feature/Section/Request/RequestExpirationHandler"
import ViewResponseModalOpenButton from "~/Component/Feature/Section/Request/ViewResponseModalOpenButton"
import RequestActionHandler from "~/Component/Feature/Section/Request/Resolutions/RequestActionHandler"

export const getRequestDetailsMeta = (Request: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: "Basic Information",
    cardActions: [
      <RequestActionHandler requestJson={Request} />,
      <ViewResponseModalOpenButton requestJson={Request.RequestJSON} />
    ],
    contents: [
      { label: "Status", value: Request.State },
      { label: "Account", value: Request.AccountName },
      { label: "Type", value: Request.RequestType },
      { label: "Purchaser", value: Request.PurchaserPersonName },
      { label: "Created", value: Request.CreateDate, render: renderDate },
      { label: "Source", value: Request.Source },
      { label: "Expires", value: <RequestExpirationHandler Request={Request} /> },
      { label: "Staff", value: Request.RequesterStaffUserName }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const requestActionMeta: IDetailsCustomTabProp = {
    component: RequestActionsTable,
    props: { dataSource: Request, loading: false }
  }

  const requestActivityMeta: IDetailsCustomTabProp = {
    component: RequestActivityTable,
    props: { dataSource: Request.ActivityLogs.ActivityLogs, loading: false }
  }

  return {
    pageTitle: "Request Details",
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Details",
        tabType: "custom",
        tabMeta: requestActionMeta
      },
      {
        tabTitle: "Logs",
        tabType: "custom",
        tabMeta: requestActivityMeta
      }
    ]
  }
}

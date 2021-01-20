import { Button } from "antd"
import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import ProgramApplicationTabDetailsPage from "~/Pages/Program/ProgramApplicationDetailsPage"

export const getProgramApplicationDetailsMeta = (programApplication: { [key: string]: any }): IDetailsMeta => {
  const info: CardContainer = {
    cardActions: [
      <Button type="primary">Accept</Button>,
      <Button danger type="ghost">
        Reject
      </Button>,
      <Button danger type="primary">
        Declined
      </Button>
    ],
    contents: [
      { label: "Application Date", value: programApplication.ApplicationDate, render: renderDate },
      { label: "Application Status", value: programApplication.StatusName },
      { label: "Notes", value: programApplication.CommentText }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [info]
  }

  const detailsMeta: IDetailsCustomTabProp = {
    component: ProgramApplicationTabDetailsPage,
    props: { programID: programApplication.ProgramID, studentID: programApplication.StudentID }
  }

  return {
    pageTitle: `${programApplication.ProgramCode} - ${programApplication.StudentName}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Details",
        tabType: "custom",
        tabMeta: detailsMeta
      }
    ]
  }
}

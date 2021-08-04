import { Typography } from "antd"
import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderEmail } from "~/Component/Common/ResponsiveTable"
import NoticeEditLink from "~/Component/Feature/Section/Notice/NoticeEditLink"

export const getNoticeDetailsMeta = (notice: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    title: "Basic",
    cardActions: [<NoticeEditLink sectionId={notice.SectionID} sectionNoticeTypeId={notice.SectionNoticeTypeID} />],
    contents: [
      {
        label: "Section Notice Type",
        value: notice.SectionNoticeType
      },
      {
        label: "From Email Address",
        value: notice.FromEmailAddress,
        render: renderEmail
      },
      {
        label: "To Email Address",
        value: notice.ToEmailAddress,
        render: renderEmail
      },
      {
        label: "From User",
        value: notice.FromUserName
      },
      { label: "To User", value: notice.ToUsersName },
      { label: "Subject", value: notice.Subject },
      {
        label: "Message",
        value: notice.Message,
        render: (text: any) => (
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>{text}</Typography.Paragraph>
        )
      },
      { label: "Mime Type", value: notice.MimeType },
      { label: "Active", value: notice.IsActive, render: renderBoolean }
    ]
  }

  tabMeta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  return {
    tabs: tabMeta
  }
}

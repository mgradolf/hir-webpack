import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderDate } from "~/Component/Common/ResponsiveTable"

//TODO: API findStudentNotice
export const getStudentEmailDetailsMeta = (activity: { [key: string]: any }): IDetailsMeta => {
  console.log(activity)

  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Notification Description", value: activity.StudentNoticeDesc },
      { label: "From User", value: activity.FromUserID },
      { label: "From Email", value: activity.FromEmailAddress },
      { label: "Subject", value: activity.Subject },
      { label: "Message", value: activity.Message },
      { label: "Mime Type", value: activity.MimeType },
      { label: "Active", value: activity.IsActive, render: renderBoolean }
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
    pageTitle: `${activity.StudentNoticeName}`,
    tabs: meta
  }
}

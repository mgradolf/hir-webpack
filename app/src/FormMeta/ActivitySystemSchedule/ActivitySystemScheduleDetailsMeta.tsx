import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean, renderDateTime } from "~/Component/Common/ResponsiveTable"

export const getActivitySystemScheduleDetailsMeta = (activity: { [key: string]: any }): IDetailsMeta => {
  console.log(activity)

  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Service Name", value: activity.ServiceName },
      { label: "Run Interval", value: activity.RunInterval },
      { label: "Scheduled Time", value: activity.NextScheduledTime, render: renderDateTime },
      { label: "Expire Time", value: activity.WhenExpires, render: renderDateTime },
      { label: "Completed", value: activity.IsCompleted, render: renderBoolean },
      { label: "Persistent", value: activity.IsPersistent, render: renderBoolean },
      { label: "Service Params", value: activity.ServiceParams }
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
    pageTitle: `Activity ID - ${activity.TimerID}`,
    tabs: meta
  }
}

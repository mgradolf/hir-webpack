import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findSystemSchedules } from "~/ApiServices/BizApi/query/queryIf"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getActivitySystemScheduleDetailsMeta } from "~/TableSearchMeta/ActivitySystemSchedule/ActivitySystemScheduleDetailsMeta"

export default function SystemScheduleDetailsPage(props: RouteComponentProps<{ TimerID: string }>) {
  const TimerID = Number(props?.match?.params?.TimerID)
  return (
    <DetailsPage
      getMeta={getActivitySystemScheduleDetailsMeta}
      getDetails={() =>
        findSystemSchedules({ TimerID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      // entityType="Account"
      // entityID={TimerID}
    />
  )
}

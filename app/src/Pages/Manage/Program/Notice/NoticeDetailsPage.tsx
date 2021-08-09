import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getNoticeDetailsMeta } from "~/Component/Feature/ProgramNotification/NoticeDetailsMeta"

export default function (props: RouteComponentProps<{ programID?: string; noticeID?: string }>) {
  const ProgramEmailNoticeID = Number(props?.match?.params?.noticeID)

  return (
    <DetailsPage
      getMeta={getNoticeDetailsMeta}
      getDetails={() =>
        getEntityById("ProgramEmailNotice", ProgramEmailNoticeID).then((x) => {
          return x
        })
      }
    />
  )
}

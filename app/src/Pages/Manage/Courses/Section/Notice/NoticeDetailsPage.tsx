import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getSectionNotifications } from "~/ApiServices/Service/SectionService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getNoticeDetailsMeta } from "~/Component/Feature/Section/Notice/NoticeDetailsMeta"

export default function (props: RouteComponentProps<{ sectionID?: string; noticeID?: string }>) {
  const SectionID = Number(props?.match?.params?.sectionID)
  const SectionNoticeTypeID = Number(props?.match?.params?.noticeID)

  return (
    <DetailsPage
      getMeta={getNoticeDetailsMeta}
      getDetails={() =>
        getSectionNotifications({ SectionID, SectionNoticeTypeID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
    />
  )
}

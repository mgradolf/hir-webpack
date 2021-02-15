import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getStudentNoticeById } from "~/ApiServices/Service/EntityService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getStudentEmailDetailsMeta } from "~/TableSearchMeta/StudentEmail/StudentEmailDetailsMeta"

export default function StudentEmailNotificationDetailsPage(props: RouteComponentProps<{ StudentNoticeID: string }>) {
  const StudentNoticeID = Number(props?.match?.params?.StudentNoticeID)
  return <DetailsPage getMeta={getStudentEmailDetailsMeta} getDetails={() => getStudentNoticeById(StudentNoticeID)} />
}

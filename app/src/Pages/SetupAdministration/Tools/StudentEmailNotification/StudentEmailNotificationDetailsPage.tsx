import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findUser } from "~/ApiServices/Service/UserService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getUserDetailsMeta } from "~/FormMeta/User/UserDetailsMeta"

export function StudentEmailNotificationDetailsPage(props: RouteComponentProps<{ UserID: string }>) {
  const UserID = props?.match?.params?.UserID
  return <DetailsPage getMeta={getUserDetailsMeta} getDetails={() => findUser({ UserID })} />
}

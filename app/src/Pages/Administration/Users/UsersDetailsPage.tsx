import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { findUser } from "~/ApiServices/Service/UserService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getUserDetailsMeta } from "~/TableSearchMeta/User/UserDetailsMeta"

export default function (props: RouteComponentProps<{ UserID: string }>) {
  const UserID = props?.match?.params?.UserID
  return <DetailsPage getMeta={getUserDetailsMeta} getDetails={() => findUser({ UserID })} />
}

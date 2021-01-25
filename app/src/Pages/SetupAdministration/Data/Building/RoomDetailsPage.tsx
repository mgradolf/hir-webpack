import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getRoomDetailsMeta } from "~/FormMeta/Room/RoomDetailsMeta"
import { getRoomTableColumns } from "~/FormMeta/Room/RoomTableColumns"

export default function RoomDetailsPage(props: RouteComponentProps<{ RoomID: string }>) {
  const RoomID = Number(props?.match?.params?.RoomID)
  return (
    <DetailsPage
      getMeta={getRoomDetailsMeta}
      getDetails={() =>
        getRoomTableColumns()
          .searchFunc({ RoomID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Account"
      // entityID={RoomID}
    />
  )
}

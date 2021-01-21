import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getRoomDetailsMeta } from "~/FormMeta/Room/RoomDetailsMeta"
import { getRoomTableColumns } from "~/FormMeta/Room/RoomTableColumns"

export default function BuildingDetailsPage(props: RouteComponentProps<{ BuildingID: string }>) {
  const BuildingID = Number(props?.match?.params?.BuildingID)
  return (
    <DetailsPage
      getMeta={getRoomDetailsMeta}
      getDetails={() =>
        getRoomTableColumns()
          .searchFunc({ BuildingID })
          .then((x) => {
            if (x.success) x.data = x.data[0]
            return x
          })
      }
      // entityType="Account"
      // entityID={BuildingID}
    />
  )
}

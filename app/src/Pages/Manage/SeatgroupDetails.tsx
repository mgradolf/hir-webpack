import React from "react"
import { RouteComponentProps } from "react-router-dom"
import { getSeatGroupDetails } from "~/ApiServices/Service/SeatGroupService"
import { DetailsPage } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { getSeatgroupDetailsMeta } from "~/TableSearchMeta/Seatgroup/SeatgroupDetailsMeta"

export default function SeatGroupDetailsPage(props: RouteComponentProps<{ seatGroupID: string }>) {
  const SeatGroupID = Number(props?.match?.params?.seatGroupID)
  return (
    <DetailsPage
      getMeta={getSeatgroupDetailsMeta}
      getDetails={() =>
        getSeatGroupDetails({ SeatGroupID }).then((x) => {
          if (x.success) x.data = x.data[0]
          return x
        })
      }
      entityType="SeatGroup"
      entityID={SeatGroupID}
    />
  )
}

import React from "react"
import SeatGroupRemoveLink from "~/Component/Feature/Section/SeatGroup/SeatGroupRemoveLink"
import SeatGroupEditLink from "~/Component/Feature/Section/SeatGroup/SeatGroupEditLink"

interface ISeatGroupMenu {
  additionalData: { [key: string]: any }
}

export default function SeatGroupMenu(props: ISeatGroupMenu) {
  const seatGroupID = props.additionalData.SeatGroupID

  return (
    <>
      <SeatGroupEditLink additionalData={props.additionalData} />
      <SeatGroupRemoveLink seatgroupId={seatGroupID} />
    </>
  )
}

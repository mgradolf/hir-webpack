import React from "react"
import SeatGroupRemoveLink from "~/Component/Feature/Section/SeatGroup/SeatGroupRemoveLink"
import SeatGroupEditLink from "~/Component/Feature/Section/SeatGroup/SeatGroupEditLink"

interface ISeatGroupMenu {
  additionalData: { [key: string]: any }
  helpKey?: string
}

export function SeatGroupMenu(props: ISeatGroupMenu) {
  const seatGroupID = props.additionalData.SeatGroupID

  return (
    <>
      <SeatGroupEditLink helpKey={props.helpKey} additionalData={props.additionalData} />
      <SeatGroupRemoveLink seatgroupId={seatGroupID} />
    </>
  )
}

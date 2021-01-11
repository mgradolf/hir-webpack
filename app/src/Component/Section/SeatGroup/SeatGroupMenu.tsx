import React from "react"
import { Menu } from "antd"
import SeatGroupRemoveLink from "~/Component/Section/SeatGroup/SeatGroupRemoveLink"
import SeatGroupEditLink from "~/Component/Section/SeatGroup/SeatGroupEditLink"

interface ISeatGroupMenu {
  additionalData: { [key: string]: any }
}

export default function SeatGroupMenu(props: ISeatGroupMenu) {
  const seatGroupID = props.additionalData.SeatGroupID

  return (
    <Menu>
      <Menu.Item key="0">
        <SeatGroupEditLink additionalData={props.additionalData} />
      </Menu.Item>
      <Menu.Item key="1">
        <SeatGroupRemoveLink seatgroupId={seatGroupID} />
      </Menu.Item>
    </Menu>
  )
}

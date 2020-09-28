import React from "react"
import { Menu } from "antd"

import SeatGroupEditLink from "~/Component/Section/SeatGroup/SeatGroupEditLink"
import SeatGroupRemoveLink from "~/Component/Section/SeatGroup/SeatGroupRemoveLink"
import SeatGroupAffiliateLink from "~/Component/Section/SeatGroup/SeatGroupAffiliateLink"

interface ISeatGroupMenu {
  sectionId: number
  seatgroupId: number
  programId?: number
  programCode?: string
  isDefault: boolean
}

export default function SeatGroupMenu(props: ISeatGroupMenu) {
  return (
    <Menu>
      <Menu.Item key="0">
        <SeatGroupEditLink
          sectionId={props.sectionId}
          seatgroupId={props.seatgroupId}
          programId={props.programId}
          programCode={props.programCode}
          isDefault={props.isDefault}
        />
      </Menu.Item>
      <Menu.Item key="1">
        <SeatGroupRemoveLink seatgroupId={props.seatgroupId} />
      </Menu.Item>
      {!props.isDefault && (
        <Menu.Item key="2">
          <SeatGroupAffiliateLink seatgroupId={props.seatgroupId} />
        </Menu.Item>
      )}
    </Menu>
  )
}

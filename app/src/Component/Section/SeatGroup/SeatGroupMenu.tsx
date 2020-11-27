import React from "react"
import { Menu } from "antd"

import SeatGroupEditLink from "~/Component/Section/SeatGroup/SeatGroupEditLink"
import SeatGroupRemoveLink from "~/Component/Section/SeatGroup/SeatGroupRemoveLink"
import SeatGroupAffiliateLink from "~/Component/Section/SeatGroup/SeatGroupAffiliateLink"

interface ISeatGroupMenu {
  additionalData: { [key: string]: any }
}

export default function SeatGroupMenu(props: ISeatGroupMenu) {
  const sectionID = props.additionalData.SectionID
  const isDefault = props.additionalData.IsDefault
  const seatGroupID = props.additionalData.SeatGroupID
  const programID = props.additionalData.ProgramID
  const programCode = props.additionalData.ProgramCode
  const packageID = props.additionalData.PackageID

  return (
    <Menu>
      <Menu.Item key="0">
        <SeatGroupEditLink
          sectionId={sectionID}
          seatgroupId={seatGroupID}
          programId={programID}
          programCode={programCode}
          isDefault={isDefault}
        />
      </Menu.Item>
      <Menu.Item key="1">
        <SeatGroupRemoveLink seatgroupId={seatGroupID} />
      </Menu.Item>
      {!isDefault && !packageID && (
        <Menu.Item key="2">
          <SeatGroupAffiliateLink seatgroupId={seatGroupID} />
        </Menu.Item>
      )}
    </Menu>
  )
}

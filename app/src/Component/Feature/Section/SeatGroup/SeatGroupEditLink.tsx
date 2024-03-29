import React, { useState } from "react"
import UpdateSeatGroup from "~/Component/Feature/Section/SeatGroup/SectionSeatGroupFormModal"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface ISeatGroupEditLinkProp {
  additionalData: { [key: string]: any }
  GhostType?: boolean | false
  style?: React.CSSProperties
  helpKey?: string
}

export default function SeatGroupEditLink(props: ISeatGroupEditLinkProp) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const sectionID = props.additionalData.SectionID
  const isDefault = props.additionalData.IsDefault
  const seatGroupID = props.additionalData.SeatGroupID
  const programID = props.additionalData.ProgramID
  const programCode = props.additionalData.ProgramCode

  return (
    <>
      <IconButton
        iconType="edit"
        toolTip="Edit"
        onClick={() => {
          setShowUpdateModal(true)
        }}
      />

      {showUpdateModal && (
        <UpdateSeatGroup
          helpKey={props.helpKey}
          sectionId={sectionID}
          isDefault={isDefault}
          seatgroupId={seatGroupID}
          programId={programID}
          programCode={programCode}
          closeModal={() => setShowUpdateModal(false)}
        />
      )}
    </>
  )
}

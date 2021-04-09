import React, { useState } from "react"
import UpdateSeatGroup from "~/Component/Feature/Section/SeatGroup/SectionSeatGroupFormModal"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

interface ISeatGroupEditLinkProp {
  additionalData: { [key: string]: any }
  GhostType?: boolean | false
  style?: React.CSSProperties
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
      <CreateEditRemoveIconButton
        iconType="edit"
        toolTip="Edit"
        onClick={() => {
          setShowUpdateModal(true)
        }}
      />

      {showUpdateModal && (
        <UpdateSeatGroup
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

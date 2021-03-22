import React, { useState } from "react"
import { Button } from "antd"
import UpdateSeatGroup from "~/Component/Section/SeatGroup/SectionSeatGroupFormModal"

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
      <Button
        type={props.GhostType ? "ghost" : "link"}
        style={props.style}
        onClick={() => {
          setShowUpdateModal(true)
        }}
      >
        Edit
      </Button>
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

import React, { useState } from "react"
import { Button } from "antd"
import { attachProgram, detachProgram } from "~/ApiServices/Service/SeatGroupService"
import { LookupModal } from "~/Component/Common/Modal/LookupModal/LookupModal"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { Link } from "react-router-dom"
import { getProgramTableColumns } from "~/TableSearchMeta/Program/ProgramTableColumns"
import { ProgramSearchMeta } from "~/TableSearchMeta/Program/ProgramSearchMeta"

interface ICreateActionButtonProp {
  SeatGroupID: number
  ProgramID?: number
  ProgramName?: string
}

export default function SeatGroupProgramAddButton(props: ICreateActionButtonProp) {
  const [showModal, setShowModal] = useState(false)

  const closeModal = (items?: any[]) => {
    if (items && items.length > 0) {
      attachProgram({ SeatGroupID: props.SeatGroupID, ProgramID: items[0].ProgramID })
        .then((x) => {
          if (x.success) eventBus.publish(REFRESH_PAGE)
        })
        .finally(() => {
          setShowModal(false)
        })
    } else {
      setShowModal(false)
    }
  }

  const detachProgramSeatGroup = () => {
    detachProgram({ SeatGroupID: props.SeatGroupID }).then((x) => {
      if (x.success) eventBus.publish(REFRESH_PAGE)
    })
  }

  return (
    <>
      {props.ProgramID && <Link to={`/program/${props.ProgramID}`}>{props.ProgramName}</Link>}
      <Button type="primary" style={!props.ProgramID ? {} : { marginLeft: "20px" }} onClick={() => setShowModal(true)}>
        Attach
      </Button>
      <Button
        type="ghost"
        danger
        style={{ marginLeft: "10px" }}
        disabled={!props.ProgramID}
        onClick={detachProgramSeatGroup}
      >
        Detach
      </Button>
      {showModal && (
        <LookupModal
          title="Select Program"
          closeModal={closeModal}
          {...getProgramTableColumns(true)}
          meta={ProgramSearchMeta}
          metaName="ProgramSearchMeta"
        />
      )}
    </>
  )
}

import React, { useState } from "react"
import { Button } from "antd"
import OfferingRequisiteGroupFormModal from "~/Component/Feature/Offering/Requisite/RequisiteFormModal"

interface IPrerequisiteGroupModalOpenButtonProp {
  OfferingID: number
}

export default function PrerequisiteGroupModalOpenButton(props: IPrerequisiteGroupModalOpenButtonProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button type="primary" style={{ marginRight: "5px" }} onClick={() => setShowModal && setShowModal(true)}>
        + Add Group
      </Button>
      {showModal && (
        <OfferingRequisiteGroupFormModal offeringID={props.OfferingID} closeModal={() => setShowModal(false)} />
      )}
    </>
  )
}

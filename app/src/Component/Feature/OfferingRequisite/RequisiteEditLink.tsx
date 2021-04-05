import React, { useState } from "react"
import { Button } from "antd"
import OfferingRequisiteGroupFormModal from "~/Component/Feature/OfferingRequisite/RequisiteFormModal"

interface IRequisiteGroupEditLinkProp {
  offeringId: number
  requisiteGroupId?: number
}

export default function RequisiteGroupEditLink(props: IRequisiteGroupEditLinkProp) {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Button type="primary" style={{ marginRight: "5px" }} onClick={() => setShowModal && setShowModal(true)}>
        Edit
      </Button>
      {showModal && (
        <OfferingRequisiteGroupFormModal
          offeringID={props.offeringId}
          requisiteGroupID={props.requisiteGroupId}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}

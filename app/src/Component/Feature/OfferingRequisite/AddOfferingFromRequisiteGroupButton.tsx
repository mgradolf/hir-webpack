import React, { useState } from "react"
import { AddOfferingFromRequisiteGroupModal } from "~/Component/Feature/OfferingRequisite/AddOfferingFromRequisiteGroupModal"
import { addOfferingIntoRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus, REFRESH_ADD_OFFERING_FROM_REQUISITE_GROUP } from "~/utils/EventBus"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface IOfferingRequisiteButtonProp {
  requisiteGroupID: number | undefined
  hasRequisiteGroup: boolean
}

export function AddOfferingFromRequisiteGroupButton(props: IOfferingRequisiteButtonProp) {
  const [openModal, setOpenModal] = useState(false)
  const onClick = () => {
    setOpenModal(true)
  }
  const onClose = (selectedItems?: any[]) => {
    const selectedOfferingIds = selectedItems?.map((offering) => offering.OfferingID)
    addOfferingIntoRequisiteGroup({
      SelectedOfferingIds: selectedOfferingIds,
      RequisiteGroupID: props.requisiteGroupID
    }).then((x) => {
      if (x.success) {
        eventBus.publish(REFRESH_ADD_OFFERING_FROM_REQUISITE_GROUP)
      }
      setOpenModal(false)
    })
  }

  return (
    <>
      {openModal && <AddOfferingFromRequisiteGroupModal {...props} onClose={onClose} />}
      {props.hasRequisiteGroup && (
        <IconButton toolTip="Add Offering To Requisite Group" iconType="create" onClick={onClick} />
      )}
    </>
  )
}

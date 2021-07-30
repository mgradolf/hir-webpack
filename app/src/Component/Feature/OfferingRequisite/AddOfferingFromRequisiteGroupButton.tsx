import React, { useState } from "react"
import { AddOfferingFromRequisiteGroupModal } from "~/Component/Feature/OfferingRequisite/AddOfferingFromRequisiteGroupModal"
import { addOfferingIntoRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus } from "~/utils/EventBus"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

interface IOfferingRequisiteButtonProp {
  requisiteGroupID: number | undefined
}

export function AddOfferingFromRequisiteGroupButton(props: IOfferingRequisiteButtonProp) {
  const [openModal, setOpenModal] = useState(false)
  const onClick = () => {
    setOpenModal(true)
  }
  const onClose = (selectedItems?: any[]) => {
    if (selectedItems !== undefined) {
      const selectedOfferingIds = selectedItems?.map((offering) => offering.OfferingID)
      addOfferingIntoRequisiteGroup({
        SelectedOfferingIds: selectedOfferingIds,
        RequisiteGroupID: props.requisiteGroupID
      }).then((x) => {
        if (x.success) {
          eventBus.publish("REFRESH_OFFERING_REQUISITE_TABLE")
        }
        setOpenModal(false)
      })
    } else {
      setOpenModal(false)
    }
  }

  return (
    <>
      {openModal && <AddOfferingFromRequisiteGroupModal {...props} onClose={onClose} />}
      {props.requisiteGroupID && (
        <IconButton toolTip="Add Offering To Requisite Group" iconType="create" onClick={onClick} />
      )}
    </>
  )
}

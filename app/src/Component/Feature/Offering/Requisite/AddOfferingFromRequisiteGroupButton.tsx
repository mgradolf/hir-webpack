import React, { useState } from "react"
import { Row, Col, Button } from "antd"
import { AddOfferingFromRequisiteGroupModal } from "~/Component/Feature/Offering/Requisite/AddOfferingFromRequisiteGroupModal"
import { addOfferingIntoRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { eventBus, REFRESH_ADD_OFFERING_FROM_REQUISITE_GROUP } from "~/utils/EventBus"

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
      <Row>
        {props.hasRequisiteGroup && (
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" onClick={onClick}>
              + Add Offering
            </Button>
          </Col>
        )}
      </Row>
    </>
  )
}

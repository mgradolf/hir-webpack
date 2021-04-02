import React from "react"
import { Row, Col, Button } from "antd"
import { connect } from "react-redux"
import { showAddOfferingFromRequisiteGroupModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  offeringId: number
  requisiteGroupId?: number
  hasRequisiteGroup: boolean
  openAddOfferingRequisiteGroupModal?: (offeringId: number, requisiteGroupId?: number) => void
}

function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openAddOfferingRequisiteGroupModal)
      props.openAddOfferingRequisiteGroupModal(props.offeringId, props.requisiteGroupId)
  }
  return (
    <Row>
      {props.hasRequisiteGroup && (
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" onClick={onClick}>
            + Add Offering
          </Button>
        </Col>
      )}
    </Row>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openAddOfferingRequisiteGroupModal: (offeringId: number, requisiteGroupId?: number) =>
      dispatch(showAddOfferingFromRequisiteGroupModal(true, { offeringId, requisiteGroupId }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)

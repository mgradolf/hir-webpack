import React from "react"
import { Row, Col, Typography, Button } from "antd"
import { connect } from "react-redux"
import { showAddOfferingFromRequisiteGroupModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  offeringId: number
  hasRequisiteGroup: boolean
  openAddOfferingRequisiteGroupModal?: (offeringId: number) => void
}

function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openAddOfferingRequisiteGroupModal) props.openAddOfferingRequisiteGroupModal(props.offeringId)
  }
  return (
    <Row style={{ padding: "10px" }}>
      <Col span={12}>
        <Typography.Text style={{ fontWeight: "bold", fontSize: "16px" }}>Group Details</Typography.Text>
      </Col>
      {props.hasRequisiteGroup && (
        <Col span={12} style={{ textAlign: "right" }}>
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
    openAddOfferingRequisiteGroupModal: (offeringId: number) =>
      dispatch(showAddOfferingFromRequisiteGroupModal({ value: true }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)

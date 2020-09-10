import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showAddInstructorFromOfferingModal } from "~/store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  offeringId: number
  rowData: Array<any>
  openAddInstructorFromInstructorModal?: (offeringId: number, rowData: Array<any>) => void
}
function CreateActionButton(props: ICreateActionButtonProp) {
  const onClick = () => {
    if (props.openAddInstructorFromInstructorModal)
      props.openAddInstructorFromInstructorModal(props.offeringId, props.rowData)
  }
  return (
    <Button type="primary" onClick={onClick}>
      + Add Instructor
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openAddInstructorFromInstructorModal: (offeringId: number, rowData: Array<any>) =>
      dispatch(showAddInstructorFromOfferingModal(true, { offeringId, rowData }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)

import * as React from "react"
import Modal from "~/Component/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddOfferingFromRequisiteGroupModal } from "~/store/ModalState"

interface IOfferingRequisiteGroupProps {
  closeAddOfferingFromRequisiteGroupModal?: () => void
}

function AddOfferingFromRequisiteGroupModal({ closeAddOfferingFromRequisiteGroupModal }: IOfferingRequisiteGroupProps) {
  return <Modal showModal={true} width="1000px" children={<></>} />
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAddOfferingFromRequisiteGroupModal: () => dispatch(showAddOfferingFromRequisiteGroupModal({ value: false }))
  }
}

export default connect(undefined, mapDispatchToProps)(AddOfferingFromRequisiteGroupModal)

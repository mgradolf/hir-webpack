import * as React from "react"
import Modal from "~/Component/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateSectionModal } from "~/store/ModalState"
import { redirect } from "~/store/ConnectedRoute"
import { AppState } from "~/store"

interface ICreateNewSectionProps {
  OfferingID?: number
  redirect?: (url: string) => void
  closeCreateOfferingModal?: () => void
}

function SectionModal(props: ICreateNewSectionProps) {
  return (
    <Modal
      showModal={true}
      width="800px"
      loading={true}
      apiCallInProgress={true}
      children={<div>Hello Section Modal OfferingID {props.OfferingID}</div>}
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeCreateOfferingModal: () => dispatch(showCreateSectionModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}
const mapStateToProps = (state: AppState) => {
  return { OfferingID: state.modalState.createSectionModal.config.OfferingID }
}
export default connect(mapStateToProps, mapDispatchToProps)(SectionModal)

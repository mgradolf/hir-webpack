import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateSectionModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"
import { AppState } from "~/Store"
import { useState, useEffect } from "react"
import { getSectionById } from "~/ApiServices/Service/EntityService"

interface ICreateNewSectionProps {
  OfferingID?: number
  Section: { [key: string]: string }
  redirect?: (url: string) => void
  closeCreateOfferingModal?: () => void
}

function SectionModal(props: ICreateNewSectionProps) {
  const [apiCallInProgress] = useState(false)
  // const [Section, setSection] = useState({})

  useEffect(() => {
    if (props.Section.SectionID) {
      getSectionById(Number(props.Section.SectionID)).then((x) => {
        if (x.success) {
          // setSection(x.data)
        }
      })
    }
  }, [props.Section.SectionID])
  return <Modal showModal={true} width="800px" loading={false} apiCallInProgress={apiCallInProgress} children={<></>} />
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeCreateOfferingModal: () => dispatch(showCreateSectionModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    OfferingID: state.modalState.createSectionModal.config.OfferingID,
    SectionID: state.modalState.createSectionModal.config.SectionID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SectionModal)

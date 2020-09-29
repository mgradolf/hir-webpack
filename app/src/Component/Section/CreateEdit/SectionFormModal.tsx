import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateSectionModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"
import SectionCreateForm from "~/Component/Section/CreateEdit/SectionCreateForm"
import SectionEditForm from "~/Component/Section/CreateEdit/SectionEditForm"
import { AppState } from "~/Store"
import { useState, useEffect } from "react"
import { getSectionById } from "~/ApiServices/Service/EntityService"

interface ICreateNewSectionProps {
  OfferingID?: number
  SectionID?: number
  redirect?: (url: string) => void
  closeCreateOfferingModal?: () => void
}

function SectionModal(props: ICreateNewSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(!!props.OfferingID && !props.SectionID)
  const [showEditForm, setShowEditForm] = useState(!props.OfferingID && !!props.SectionID)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [SectionID, setSectionID] = useState(props.SectionID)
  const [Section, setSection] = useState({})

  useEffect(() => {
    if (SectionID) {
      getSectionById(SectionID).then((x) => {
        if (x.success) {
          setSection(x.data)
        }
      })
    }
  }, [SectionID])
  return (
    <Modal
      showModal={true}
      width="800px"
      loading={false}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {showCreateForm && (
            <SectionCreateForm
              OfferingID={Number(props.OfferingID)}
              handleCancel={() => props.closeCreateOfferingModal && props.closeCreateOfferingModal()}
              handleSelected={(sectionId: number) => {
                setSectionID(sectionId)
                console.log("section created")
                setShowCreateForm(false)
                setShowEditForm(true)
              }}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
          {showEditForm && (
            <SectionEditForm
              Section={Section}
              handleCancel={() => props.closeCreateOfferingModal && props.closeCreateOfferingModal()}
              handleSubmit={() => {
                console.log("section edited")
                props.closeCreateOfferingModal && props.closeCreateOfferingModal()
              }}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
        </>
      }
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
  return {
    OfferingID: state.modalState.createSectionModal.config.OfferingID,
    SectionID: state.modalState.createSectionModal.config.SectionID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SectionModal)

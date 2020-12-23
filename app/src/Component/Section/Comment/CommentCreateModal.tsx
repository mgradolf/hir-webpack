import React, { useEffect, useState } from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { showSectionCommmentModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"
import Modal from "~/Component/Common/Modal"
import CommentTypeSelectForm from "~/Component/Section/Comment/CommentTypeSelectForm"
import GeneralCommentCreateForm from "~/Component/Section/Comment/GeneralCommentCreateForm"
import InstructorCommentCreateForm from "~/Component/Section/Comment/InstructorCommentCreateForm"
import EnrollmentCommentCreateForm from "~/Component/Section/Comment/EnrollmentCommentCreateForm"
import { COMMENT_TYPES } from "~/utils/Constants"
import { getCommentCategories } from "~/ApiServices/Service/RefLookupService"
import { AppState } from "~/Store"
import { eventBus, REFRESH_SECTION_COMMENT_PAGE } from "~/utils/EventBus"

interface ICommentCreateModal {
  SectionID: any
  redirect?: (url: string) => void
  closeModal?: () => void
}

function CommentCreateModal(props: ICommentCreateModal) {
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [selectedType, setselectedType] = useState("")
  const [commentCatagories, setCommentCatagories] = useState<any[]>([])
  const onSelect = (commentType: string) => {
    setselectedType(commentType)
  }
  const onCancel = () => {
    setselectedType("")
  }

  useEffect(() => {
    getCommentCategories().then((x) => {
      if (x.success) {
        setCommentCatagories(x.data)
      }
    })
  }, [])
  return (
    <Modal
      showModal={true}
      closeModal={props.closeModal}
      closable={true}
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {selectedType === "" && <CommentTypeSelectForm closeModal={props.closeModal} onSelect={onSelect} />}
          {selectedType === COMMENT_TYPES.GENERAL && (
            <GeneralCommentCreateForm
              SectionID={props.SectionID}
              onClose={props.closeModal}
              onCancel={onCancel}
              commentCatagories={commentCatagories}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
          {selectedType === COMMENT_TYPES.INSTRUCTOR && (
            <InstructorCommentCreateForm
              SectionID={props.SectionID}
              onClose={props.closeModal}
              onCancel={onCancel}
              commentCatagories={commentCatagories}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
          {selectedType === COMMENT_TYPES.ENROLLMENT && (
            <EnrollmentCommentCreateForm
              SectionID={props.SectionID}
              onClose={props.closeModal}
              onCancel={onCancel}
              commentCatagories={commentCatagories}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
        </>
      }
    ></Modal>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    SectionID: state.modalState.sectionCommentModal.config.SectionID
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeModal: () => {
      eventBus.publish(REFRESH_SECTION_COMMENT_PAGE)
      return dispatch(showSectionCommmentModal(false))
    },
    redirect: (url: string) => dispatch(redirect(url))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentCreateModal)

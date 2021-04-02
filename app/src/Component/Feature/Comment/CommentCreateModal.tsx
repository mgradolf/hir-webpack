import React, { useEffect, useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import GeneralCommentCreateForm from "~/Component/Feature/Section/Comment/GeneralCommentCreateForm"
import InstructorCommentCreateForm from "~/Component/Feature/Section/Comment/InstructorCommentCreateForm"
import EnrollmentCommentCreateForm from "~/Component/Feature/Section/Comment/EnrollmentCommentCreateForm"
import { COMMENT_TYPES } from "~/utils/Constants"
import { getCommentCategories } from "~/ApiServices/Service/RefLookupService"

interface ICommentCreateModal {
  SectionID?: number
  StudentID?: number
  FacultyID?: number
  CommentType: string
  closeModal?: () => void
}

export default function CommentCreateModal(props: ICommentCreateModal) {
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [commentCatagories, setCommentCatagories] = useState<any[]>([])

  useEffect(() => {
    getCommentCategories().then((x) => {
      if (x.success) {
        setCommentCatagories(x.data)
      }
    })
  }, [])

  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {props.CommentType === COMMENT_TYPES.GENERAL && (
            <GeneralCommentCreateForm
              SectionID={props.SectionID}
              StudentID={props.StudentID}
              FacultyID={props.FacultyID}
              onClose={props.closeModal}
              commentCatagories={commentCatagories}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
          {props.CommentType === COMMENT_TYPES.INSTRUCTOR && (
            <InstructorCommentCreateForm
              SectionID={props.SectionID}
              onClose={props.closeModal}
              commentCatagories={commentCatagories}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
          {props.CommentType === COMMENT_TYPES.ENROLLMENT && (
            <EnrollmentCommentCreateForm
              SectionID={props.SectionID}
              StudentID={props.StudentID}
              onClose={props.closeModal}
              commentCatagories={commentCatagories}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
        </>
      }
    ></Modal>
  )
}

import React, { useState } from "react"
import CommentCreateModal from "~/Component/Feature/Comment/CommentCreateModal"
import { CreateEditRemoveIconButton } from "~/Component/Common/Form/Buttons/CreateEditRemoveIconButton"

interface ICommentCreateProp {
  SectionID?: number
  StudentID?: number
  FacultyID?: number
  CommentType: string
}

export default function CommentCreateModalOpenButton(props: ICommentCreateProp) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <CreateEditRemoveIconButton toolTip="Add Comment" iconType="create" onClick={() => setShowModal(true)} />
      {showModal && (
        <CommentCreateModal
          SectionID={props.SectionID}
          StudentID={props.StudentID}
          FacultyID={props.FacultyID}
          CommentType={props.CommentType}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}

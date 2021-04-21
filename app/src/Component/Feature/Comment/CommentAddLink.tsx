import React, { useState } from "react"
import CommentCreateModal from "~/Component/Feature/Comment/CommentCreateModal"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

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
      <IconButton toolTip="Add Comment" iconType="create" onClick={() => setShowModal(true)} />
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

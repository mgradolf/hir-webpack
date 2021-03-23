import React, { useState } from "react"
import { Button } from "antd"
import CommentCreateModal from "~/Component/Feature/Comment/CommentCreateModal"

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
      <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
        + Add Comment
      </Button>
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

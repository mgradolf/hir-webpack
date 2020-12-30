import React from "react"
import {
  deleteEnrollmentComment,
  deleteStudentComment,
  deleteSectionComment,
  deleteFacultyComment,
  deleteSectionFacultyComment
} from "~/ApiServices/Service/CommentService"
import {
  eventBus,
  REFRESH_INSTRUCTOR_COMMENT_PAGE,
  REFRESH_REGISTRATION_COMMENT_PAGE,
  REFRESH_SECTION_GENERAL_COMMENT_PAGE,
  REFRESH_SECTION_INSTRUCTOR_COMMENT_PAGE,
  REFRESH_STUDENT_COMMENT_PAGE
} from "~/utils/EventBus"
import { Button } from "antd"

interface ICommentRemoveLinkProp {
  EnrollmentCommentID?: number
  StudentCommentID?: number
  SectionCommentID?: number
  FacultyCommentID?: number
  SectionFacultyCommentID?: number
}

export default function CommentRemoveLink(props: ICommentRemoveLinkProp) {
  return (
    <Button
      type="link"
      onClick={async () => {
        if (props.EnrollmentCommentID) {
          const response = await deleteEnrollmentComment({ EnrollmentCommentID: props.EnrollmentCommentID })
          if (response.success) {
            eventBus.publish(REFRESH_REGISTRATION_COMMENT_PAGE)
          }
        } else if (props.StudentCommentID) {
          const response = await deleteStudentComment({ StudentCommentID: props.StudentCommentID })
          if (response.success) {
            eventBus.publish(REFRESH_STUDENT_COMMENT_PAGE)
          }
        } else if (props.SectionCommentID) {
          const response = await deleteSectionComment({ SectionCommentID: props.SectionCommentID })
          if (response.success) {
            eventBus.publish(REFRESH_SECTION_GENERAL_COMMENT_PAGE)
          }
        } else if (props.FacultyCommentID) {
          const response = await deleteFacultyComment({ FacultyCommentID: props.FacultyCommentID })
          if (response.success) {
            eventBus.publish(REFRESH_INSTRUCTOR_COMMENT_PAGE)
          }
        } else if (props.SectionFacultyCommentID) {
          const response = await deleteSectionFacultyComment({ SectionFacultyCommentID: props.SectionFacultyCommentID })
          if (response.success) {
            eventBus.publish(REFRESH_SECTION_INSTRUCTOR_COMMENT_PAGE)
          }
        }
      }}
    >
      Remove
    </Button>
  )
}

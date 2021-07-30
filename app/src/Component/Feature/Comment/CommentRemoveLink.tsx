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
import { Button, Tooltip } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { DeleteOutlined } from "@ant-design/icons"

interface ICommentRemoveLinkProp {
  EnrollmentCommentID?: number
  StudentCommentID?: number
  SectionCommentID?: number
  FacultyCommentID?: number
  SectionFacultyCommentID?: number
}

export function CommentRemoveLink(props: ICommentRemoveLinkProp) {
  const remove = async (): Promise<IApiResponse> => {
    let response: IApiResponse = { code: 200, data: undefined, success: false, error: undefined }
    if (props.EnrollmentCommentID) {
      response = await deleteEnrollmentComment({ EnrollmentCommentID: props.EnrollmentCommentID })
      if (response.success) {
        eventBus.publish(REFRESH_REGISTRATION_COMMENT_PAGE)
      }
    } else if (props.StudentCommentID) {
      response = await deleteStudentComment({ StudentCommentID: props.StudentCommentID })
      if (response.success) {
        eventBus.publish(REFRESH_STUDENT_COMMENT_PAGE)
      }
    } else if (props.SectionCommentID) {
      response = await deleteSectionComment({ SectionCommentID: props.SectionCommentID })
      if (response.success) {
        eventBus.publish(REFRESH_SECTION_GENERAL_COMMENT_PAGE)
      }
    } else if (props.FacultyCommentID) {
      response = await deleteFacultyComment({ FacultyCommentID: props.FacultyCommentID })
      if (response.success) {
        eventBus.publish(REFRESH_INSTRUCTOR_COMMENT_PAGE)
      }
    } else if (props.SectionFacultyCommentID) {
      response = await deleteSectionFacultyComment({ SectionFacultyCommentID: props.SectionFacultyCommentID })
      if (response.success) {
        eventBus.publish(REFRESH_SECTION_INSTRUCTOR_COMMENT_PAGE)
      }
    }
    return response
  }
  return (
    <Tooltip title="Remove">
      <Button
        danger
        type="primary"
        icon={<DeleteOutlined />}
        shape="circle"
        onClick={() => showDeleteConfirm(remove)}
      />
    </Tooltip>
  )
}

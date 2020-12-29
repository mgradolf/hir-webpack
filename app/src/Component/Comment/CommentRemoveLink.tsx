import React from "react"
import { deleteEnrollmentComment } from "~/ApiServices/Service/CommentService"
import { eventBus, REFRESH_SECTION_PRODUCT_PAGE } from "~/utils/EventBus"
import { Button } from "antd"

interface ICommentRemoveLinkProp {
  EnrollmentCommentID: number
}

export default function CommentRemoveLink(props: ICommentRemoveLinkProp) {
  return (
    <Button
      type="link"
      onClick={async () => {
        const response = await deleteEnrollmentComment({ EnrollmentCommentID: props.EnrollmentCommentID })
        if (response.success) {
          eventBus.publish(REFRESH_SECTION_PRODUCT_PAGE)
        }
      }}
    >
      Remove
    </Button>
  )
}

import React from "react"
import { connect } from "react-redux"
import { showUpdateNoticeModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { Button } from "antd"

interface INoticeEditLinkProp {
  sectionId: number
  sectionNoticeTypeId: number
  openUpdateNoticeModal: (sectionId: number, sectionNoticeTypeId: number) => void
}
function NoticeEditLink(props: INoticeEditLinkProp) {
  return (
    <Button
      type="link"
      onClick={() => {
        props.openUpdateNoticeModal(props.sectionId, props.sectionNoticeTypeId)
      }}
    >
      Edit
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openUpdateNoticeModal: (sectionId: number, sectionNoticeTypeId: number) => {
      return dispatch(showUpdateNoticeModal(true, { sectionId, sectionNoticeTypeId }))
    }
  }
}

export default connect(null, mapDispatchToProps)(NoticeEditLink)

import React, { useState } from "react"
import { Button } from "antd"
import NoticeUpdate from "~/Component/Section/Notice/NoticeEditFormModal"

interface INoticeEditLinkProp {
  sectionId: number
  sectionNoticeTypeId: number
}

export default function NoticeEditLink(props: INoticeEditLinkProp) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setShowModal(true)
        }}
      >
        Edit
      </Button>
      {showModal && (
        <NoticeUpdate
          sectionId={props.sectionId}
          sectionNoticeTypeId={props.sectionNoticeTypeId}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}

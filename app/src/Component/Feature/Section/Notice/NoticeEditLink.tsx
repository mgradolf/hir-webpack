import React, { useState } from "react"
import { Button } from "antd"
import NoticeUpdate from "~/Component/Feature/Section/Notice/NoticeEditFormModal"
import { EditOutlined } from "@ant-design/icons"

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
        icon={<EditOutlined />}
        shape="circle"
        onClick={() => {
          setShowModal(true)
        }}
        disabled={props.sectionId === undefined}
      />
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

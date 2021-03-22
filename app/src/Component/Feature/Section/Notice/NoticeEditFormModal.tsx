import React, { useEffect, useState } from "react"
import Modal from "~/Component/Common/Modal/index2"

import NoticeEditForm from "~/Component/Section/Notice/NoticeEditForm"
import { getSectionNotifications } from "~/ApiServices/Service/SectionService"
import { Form } from "antd"
import { INoticeFieldNames } from "~/Component/Section/Interfaces"

interface INoticetEditProps {
  sectionId: number
  sectionNoticeTypeId: number
  closeModal?: () => void
}

const fieldNames: INoticeFieldNames = {
  SectionID: "SectionID",
  SectionNoticeTypeID: "SectionNoticeTypeID",
  FromUserID: "FromUserID",
  FromEmailAddress: "FromEmailAddress",
  DisableFields: "DisableFields",
  Subject: "Subject",
  Message: "Message",
  MimeType: "MimeType",
  ToEmailAddress: "ToEmailAddress",
  ToUserIDs: "ToUserIDs",
  IsActive: "IsActive"
}

export default function NoticeUpdate({ closeModal, sectionNoticeTypeId, sectionId }: INoticetEditProps) {
  const [formInstance] = Form.useForm()
  const [noticeLoading, setNoticeLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})

  const handleCancel = () => {
    if (closeModal) {
      closeModal()
    }
  }

  useEffect(() => {
    if (sectionNoticeTypeId) {
      ;(async () => {
        setNoticeLoading(true)
        const response = await getSectionNotifications({
          SectionID: sectionId,
          SectionNoticeTypeID: sectionNoticeTypeId
        })
        if (response && response.success && response.data) {
          formInstance.setFieldsValue(response.data[0])
          if (response.data[0].ToUserIDs === null) {
            formInstance.setFieldsValue({ ToUserIDs: [] })
          }
        } else {
          if (closeModal) {
            closeModal()
          }
        }
        setNoticeLoading(false)
      })()
    }
    // eslint-disable-next-line
  }, [closeModal, sectionNoticeTypeId, sectionId])

  return (
    <Modal
      width="800px"
      loading={noticeLoading}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          <NoticeEditForm
            sectionId={sectionId}
            handleCancel={handleCancel}
            setApiCallInProgress={setApiCallInProgress}
            initialFormValue={initialFormValue}
            fieldNames={fieldNames}
            formInstance={formInstance}
          />
        </>
      }
    />
  )
}

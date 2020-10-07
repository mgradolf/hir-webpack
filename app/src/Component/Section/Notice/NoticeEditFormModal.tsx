import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { useEffect, useState } from "react"
import NoticeEditForm from "~/Component/Section/Notice/NoticeEditForm"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showUpdateNoticeModal } from "~/Store/ModalState"
import { getSectionNotifications } from "~/ApiServices/Service/SectionService"
import { Form } from "antd"
import { INoticeFieldNames } from "~/Component/Section/Interfaces"

interface INoticetEditProps {
  sectionNoticeTypeId: number
  sectionId: number
  closeUpdateNoticeModal?: () => void
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

function NoticeUpdate({ closeUpdateNoticeModal, sectionNoticeTypeId, sectionId }: INoticetEditProps) {
  const [formInstance] = Form.useForm()
  const [noticeLoading, setNoticeLoading] = useState(false)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [initialFormValue] = useState<{ [key: string]: any }>({})

  const handleCancel = () => {
    if (closeUpdateNoticeModal) {
      closeUpdateNoticeModal()
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
        } else {
          if (closeUpdateNoticeModal) {
            closeUpdateNoticeModal()
          }
        }
        setNoticeLoading(false)
      })()
    }
    // eslint-disable-next-line
  }, [closeUpdateNoticeModal, sectionNoticeTypeId, sectionId])

  return (
    <Modal
      showModal={true}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { closeUpdateNoticeModal: () => dispatch(showUpdateNoticeModal(false)) }
}

export default connect(undefined, mapDispatchToProps)(NoticeUpdate)

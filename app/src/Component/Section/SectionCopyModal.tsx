import React, { useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { AppState } from "~/Store"
import { redirect } from "~/Store/ConnectedRoute"
import { showCopySectionModal } from "~/Store/ModalState"
import Modal from "~/Component/Common/Modal"
import { Button, Card, Form } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import { eventBus, REFRESH_SECTION_PAGE } from "~/utils/EventBus"
import { copySection } from "~/ApiServices/Service/SectionService"

interface IQuestionModal {
  closeModal?: () => void
  SectionID?: number
  SectionNumber?: string
}

function SectionCopyModal(props: IQuestionModal) {
  const [apiCallInProgress, setapiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [formInstance] = Form.useForm()
  const actions = []
  actions.push(<Button onClick={props.closeModal}>Cancel</Button>)
  actions.push(
    <Button
      onClick={() => {
        setErrorMessages([])
        setapiCallInProgress(true)
        copySection(formInstance.getFieldsValue()).then((x) => {
          if (x.success && props.closeModal) {
            eventBus.publish(REFRESH_SECTION_PAGE)
            props.closeModal()
          } else {
            setErrorMessages(x.error)
          }
          setapiCallInProgress(false)
        })
      }}
    >
      Submit
    </Button>
  )
  return (
    <Modal
      showModal={true}
      width="800px"
      apiCallInProgress={apiCallInProgress}
      closable={true}
      closeModal={props.closeModal}
      children={
        <Card title={`Copy Section ${props.SectionNumber}`} actions={actions}>
          <Form style={{ overflowY: "scroll", padding: "10px", height: "65vh" }}>
            <FormError errorMessages={errorMessages}></FormError>
          </Form>
        </Card>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeModal: () => dispatch(showCopySectionModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    SectionID: state.modalState.copySectionModal.config.SectionID,
    SectionNumber: state.modalState.copySectionModal.config.SectionNumber
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SectionCopyModal)

import React from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { Form, Button, Typography, Popconfirm } from "antd"
import { showRequestQuestionAnswerModal } from "~/Store/ModalState"
import { REGISTRATION_VERIFICATION_NAME } from "~/utils/Constants"

interface IFormError {
  errorMessages?: Array<any>
  jsonData?: any
  onWaive: (name: any, requestName: any) => void
  openModal?: (jsonData: any) => void
}

const layout = {
  labelCol: { span: 8 }
}

export function RegistrationError(props: IFormError) {

  const getDetailsTilte = (details: Array<any>): any => {
    let detail = ""
    details.forEach((element, index) => {
      if (index > 0 && index !== details.length) {
        detail += ", "
      }
      if (element.OfferingCode !== undefined) {
        detail += element.OfferingCode
      }
      index++
    });
    return detail
  }

  return (
    <>
      {Array.isArray(props.errorMessages)
        && props.errorMessages.length > 0
        && (
          props.errorMessages.map((x, index) => {
            return (
              <Form.Item
                key={index + 1}
                label={<label style={{ color: "red" }}>{x.Name}</label>}
                {...layout}>
                {x.IsWaive &&
                  <Button
                    onClick={() =>
                      props.onWaive(x.Name, x.RequestName)
                    }
                  >
                    Waive
              </Button>
                }
                {x.Name === REGISTRATION_VERIFICATION_NAME.REGISTRATION_QUESTION_CHECK && (
                  <Button
                    type="link"
                    onClick={() =>
                      props.openModal
                        ? props.openModal(props.jsonData)
                        : null
                    } >
                    Answer
                  </Button>
                )}
                {x.Name === REGISTRATION_VERIFICATION_NAME.SECTION_VALIDITY_CHECK
                  && x.Details !== null && (
                    <Typography.Text style={{ color: "red" }}>{x.Details[0]}</Typography.Text>
                  )}
                {x.Name !== REGISTRATION_VERIFICATION_NAME.SECTION_VALIDITY_CHECK
                  && x.Details !== null && (
                    <Popconfirm
                      title={getDetailsTilte(x.Details)}
                      okText="Ok"
                      cancelText="Cancel"
                    >
                      <a style={{ marginLeft: "16px" }} onClick={(e) => e.preventDefault()}>Details</a>
                    </Popconfirm>
                  )}
              </Form.Item>
            )
          })
        )}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openModal: (taskJson?: any) =>
      dispatch(showRequestQuestionAnswerModal(true, { taskJson }))
  }
}

export default connect(null, mapDispatchToProps)(RegistrationError)
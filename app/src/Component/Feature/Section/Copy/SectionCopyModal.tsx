import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Col, Form, message, Row } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { copySection } from "~/ApiServices/Service/SectionService"
import SectionCopyForm from "~/Component/Feature/Section/Copy/SectionCopyForm"
import { COPPIED_SUCCESSFULLY } from "~/utils/Constants"
import { Redirect } from "react-router"

interface IQuestionModal {
  closeModal?: () => void
  SectionID: number
  SectionNumber?: string
}

export function SectionCopyModal(props: IQuestionModal) {
  const [apiCallInProgress, setapiCallInProgress] = useState(false)
  const [redirectAfterCopy, setRedirectAfterCopy] = useState<string>()
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [formInstance] = Form.useForm()

  return (
    <>
      {redirectAfterCopy && <Redirect to={redirectAfterCopy} />}
      <Modal
        width="1000px"
        apiCallInProgress={apiCallInProgress}
        children={
          <Card
            title={`Copy Section`}
            actions={[
              <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
                <Col>
                  <Button type="primary" danger onClick={props.closeModal}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={() => {
                      setErrorMessages([])
                      setapiCallInProgress(true)
                      copySection({ ...formInstance.getFieldsValue(), SectionID: props.SectionID }).then((x) => {
                        if (x.success && props.closeModal) {
                          formInstance.resetFields()
                          message.success(COPPIED_SUCCESSFULLY)
                          setRedirectAfterCopy(`/section/${x.data.SectionID}`)
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
                </Col>
              </Row>
            ]}
          >
            <Form
              form={formInstance}
              scrollToFirstError
              style={{
                maxHeight: "80vh",
                overflowY: "scroll"
              }}
            >
              <OldFormError errorMessages={errorMessages}></OldFormError>
              <SectionCopyForm formInstance={formInstance} SectionID={props.SectionID}></SectionCopyForm>
            </Form>
          </Card>
        }
      />
    </>
  )
}

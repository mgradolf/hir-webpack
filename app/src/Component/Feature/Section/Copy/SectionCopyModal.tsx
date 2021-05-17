import React, { useEffect, useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Col, Form, message, Row } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { copySection, getSectionDetails } from "~/ApiServices/Service/SectionService"
import SectionCopyForm from "~/Component/Feature/Section/Copy/SectionCopyForm"
import { COPPIED_SUCCESSFULLY } from "~/utils/Constants"
import { Redirect } from "react-router"

interface IQuestionModal {
  closeModal?: () => void
  SectionID: number
  SectionNumber?: string
}

export function SectionCopyModal(props: IQuestionModal) {
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [redirectAfterCopy, setRedirectAfterCopy] = useState<string>()
  const [sectionDetails, setSectionDetail] = useState<{ [key: string]: any }>({})
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [formInstance] = Form.useForm()

  useEffect(() => {
    ;(async function () {
      setApiCallInProgress(true)
      const result = await getSectionDetails({ SectionID: props.SectionID })
      if (result && result.success) {
        setSectionDetail(result.data)
        formInstance.setFieldsValue({
          Schedule: result.data.StartDate === null ? false : true,
          Location: result.data.StartDate === null ? false : true,
          Instructor: result.data.StartDate === null ? false : true,
          Notes: result.data.StartDate === null ? false : true
        })
      }
      setApiCallInProgress(false)
    })()
  }, [props, formInstance])

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
                      setApiCallInProgress(true)
                      copySection({ ...formInstance.getFieldsValue(), SectionID: props.SectionID }).then((x) => {
                        if (x.success && props.closeModal) {
                          formInstance.resetFields()
                          message.success(COPPIED_SUCCESSFULLY)
                          setRedirectAfterCopy(`/section/${x.data.SectionID}`)
                          props.closeModal()
                        } else {
                          setErrorMessages(x.error)
                        }
                        setApiCallInProgress(false)
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
              <SectionCopyForm
                formInstance={formInstance}
                initialData={sectionDetails}
                SectionID={props.SectionID}
              ></SectionCopyForm>
            </Form>
          </Card>
        }
      />
    </>
  )
}

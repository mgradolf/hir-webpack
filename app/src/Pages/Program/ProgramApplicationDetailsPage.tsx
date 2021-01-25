import { Button, Card, Col, Form, Input, Row, Select, Spin, Upload } from "antd"
import React, { useState, useEffect } from "react"
import { getProgramAppDetails, saveApplicationAnswer } from "~/ApiServices/BizApi/program/programApplicationIF"
import { UploadOutlined } from "@ant-design/icons"
import ProgramApplicationStatusFormModal from "~/Component/ProgramApplication/ProgramApplicationStatusFormModal"
import {
  PROGRAM_APP_REQ_ACCPETED,
  PROGRAM_APP_REQ_REJECTED,
  PROGRAM_APP_REQ_RESUBMIT
} from "~/utils/Constants"
import ProgramApplicationNoteFormModal from "~/Component/ProgramApplication/ProgramApplicationNoteFormModal"
import ProgramApplicationResubmitFormModal from "~/Component/ProgramApplication/ProgramApplicationResubmitFormModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

interface IRequisitePageProp {
  programID: number
  studentID: number
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

export default function ProgramApplicationTabDetailsPage(props: IRequisitePageProp) {
  const [itemDetails, setItemDetails] = useState<{ [key: string]: any }>({})
  const [admissionReqsList, setAdmissionReqList] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [fileMap, setFileMap] = useState<{ [key: string]: any }>({})
  let answerMap: {[key: string]: any} = {}

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getProgramAppDetails([props.programID, props.studentID])
      if (response && response.success) {
        setItemDetails(response.data)
        const admissionReqList = response.data.AdmissionReqGroups
        setAdmissionReqList(admissionReqList[0].AdmissionReqs)

        const requirements = admissionReqList[0].AdmissionReqs
        if (requirements != null) {
          const files: { [key: string]: any } = {}
          requirements.forEach((requirement: any) => {
            const answers = requirement.Answer
            const fileList: Array<any> = []
            if (answers != null) {
              const attachments = answers.Attachments
              if (attachments != null) {
                attachments.forEach((x: any, index: any) => {
                  fileList.push({
                    uid: index + 1,
                    name: x.Name,
                    url: "",
                    status: "done"
                  })
                })
              }
            }
            files[requirement.ProgramAdmReqID] = fileList
          })
          setFileMap(files)
        }
      }
      setLoading(false)
    })()
  }, [props])

  const storeAnswer = (value: any, ProgramAdmReqID: number) => {
    if (value.target !== undefined) {
      answerMap[ProgramAdmReqID] = value.target.value
    } else {
      answerMap[ProgramAdmReqID] = value
    }
  }

  const saveApplicationAnswers = async (ProgramAdmReqID: number) => {
    type serviceMethodType = (params: Array<any>) => Promise<IApiResponse>
    let serviceMethoToCall: serviceMethodType = saveApplicationAnswer

    let answer = answerMap[ProgramAdmReqID] === undefined ? "" : answerMap[ProgramAdmReqID]
    let param: Array<any> = []
    param = [itemDetails.ProgramAppID, ProgramAdmReqID, answer]

    const response = await serviceMethoToCall(param)
    if (response && response.success) {
      eventBus.publish(REFRESH_PAGE)
    } else {
      console.log(response.error)
    }
  }

  const AcceptFormModalOpenButton = (props: { ProgramAdmReqID: number, CurrentStatusID: number | -1 }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button
            type="primary"
            disabled={props.CurrentStatusID === PROGRAM_APP_REQ_ACCPETED}
            onClick={() => setShowModal && setShowModal(true)}
          >
            Accept
          </Button>
        )}
        {showModal &&
          <ProgramApplicationStatusFormModal
            ProgramAppID={itemDetails.ProgramAppID}
            ProgramAdmReqID={props.ProgramAdmReqID}
            StatusID={PROGRAM_APP_REQ_ACCPETED}
            closeModal={() => setShowModal(false)}
          />
        }
      </>
    )
  }

  const ResubmitFormModalOpenButton = (props: { ProgramAdmReqID: number, CurrentStatusID: number | -1 }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button
            type="primary"
            disabled={
              props.CurrentStatusID === PROGRAM_APP_REQ_RESUBMIT ||
              props.CurrentStatusID === PROGRAM_APP_REQ_ACCPETED ||
              props.CurrentStatusID === PROGRAM_APP_REQ_REJECTED
            }
            onClick={() => setShowModal && setShowModal(true)}
          >
            Resubmit
          </Button>
        )}
        {showModal &&
          <ProgramApplicationResubmitFormModal
            ProgramAppID={itemDetails.ProgramAppID}
            ProgramAdmReqID={props.ProgramAdmReqID}
            closeModal={() => setShowModal(false)}
          />
        }
      </>
    )
  }

  const RejectFormModalOpenButton = (props: { ProgramAdmReqID: number, CurrentStatusID: number | -1 }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button
            danger
            type="primary"
            disabled={
              props.CurrentStatusID === PROGRAM_APP_REQ_REJECTED ||
              props.CurrentStatusID === PROGRAM_APP_REQ_RESUBMIT
            }
            onClick={() => setShowModal && setShowModal(true)}
          >
            Reject
          </Button>
        )}
        {showModal &&
          <ProgramApplicationStatusFormModal
            ProgramAppID={itemDetails.ProgramAppID}
            ProgramAdmReqID={props.ProgramAdmReqID}
            StatusID={PROGRAM_APP_REQ_REJECTED}
            closeModal={() => setShowModal(false)}
          />
        }
      </>
    )
  }

  const NoteFormModalOpenButton = (props: { ProgramAdmReqID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button
            type="primary"
            onClick={() => setShowModal && setShowModal(true)}
          >
            Add Note
          </Button>
        )}
        {showModal &&
          <ProgramApplicationNoteFormModal
            ProgramAppID={itemDetails.ProgramAppID}
            ProgramAdmReqID={props.ProgramAdmReqID}
            closeModal={() => setShowModal(false)}
          />
        }
      </>
    )
  }

  return (
    <>
      {loading && (
        <Row justify="center" align="middle">
          <Spin size="large" />
        </Row>
      )}
      {!loading && Object.keys(itemDetails).length > 0 && (
        <Row>
          {admissionReqsList.map((x: any, index: any) => (
            <Col style={{ marginBottom: "16px" }} key={index + 1} xs={24} sm={24} md={24}>
              <Card
                title={x.Name}
                actions={[
                  <AcceptFormModalOpenButton CurrentStatusID={x.Answer && x.Answer.StatusID} ProgramAdmReqID={x.ProgramAdmReqID} />,
                  <ResubmitFormModalOpenButton CurrentStatusID={x.Answer && x.Answer.StatusID} ProgramAdmReqID={x.ProgramAdmReqID} />,
                  <RejectFormModalOpenButton CurrentStatusID={x.Answer && x.Answer.StatusID} ProgramAdmReqID={x.ProgramAdmReqID} />,
                  <NoteFormModalOpenButton ProgramAdmReqID={x.ProgramAdmReqID} />
                ]}
              >
                <Form>
                  <Row>
                    <Col xs={24} sm={12} md={12}>
                      <Form.Item label={"Question"} {...layout}>
                        <Input aria-label="Question" disabled value={x.PreferenceDefName} />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                      <Form.Item label={"Current Status"} {...layout}>
                        <Input aria-label="Status" disabled value={x.Answer && x.Answer.StatusName} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12}>
                      <Form.Item label={"Expected Answer"} {...layout}>
                        <Input disabled aria-label="Expected answer" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                      <Form.Item label="Notes" {...layout}>
                        <Input.TextArea disabled rows={3} value={x.Answer && x.Answer.CommentText}></Input.TextArea>
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12}>
                      <Form.Item label={"Answer"} {...layout}>
                        {x.PreferenceDefChoices && (
                          <Select aria-label="Select Asnwer" onChange={(events) => storeAnswer(events, x.ProgramAdmReqID)}>
                            {x.PreferenceDefChoices.map((x: any, index: any) => {
                              return (
                                <Select.Option key={`${index + 1}`} value={x.Value}>
                                  {x.Value}
                                </Select.Option>
                              )
                            })}
                          </Select>
                        )}
                        {!x.PreferenceDefChoices && <Input aria-label="Answer" onChange={(events) => storeAnswer(events, x.ProgramAdmReqID)} />}
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                      <Form.Item label="Reason" {...layout}>
                        <Input.TextArea disabled rows={3} value={x.Answer && x.Answer.StatusReason}></Input.TextArea>
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12}>
                      {x.NeedProof && (
                        <Form.Item label="Attachments" {...layout}>
                          <Upload {...props} fileList={fileMap[x.ProgramAdmReqID]}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                          </Upload>
                        </Form.Item>
                      )}
                    </Col>
                    <Col xs={24} sm={12} md={12}></Col>

                    <Col xs={24} sm={12} md={12}>
                      <Form.Item {...layout}>
                        <Button
                          type="primary"
                          style={{ float: "right" }}
                          onClick={() => saveApplicationAnswers(x.ProgramAdmReqID)}
                        >
                          Save
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

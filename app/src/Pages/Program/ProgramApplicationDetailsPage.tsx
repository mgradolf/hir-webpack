import { Button, Card, Col, Form, Input, Row, Select, Spin, Tabs, Upload } from "antd"
import React, { useState, useEffect } from "react"
import {
  AcceptFormModalOpenButton,
  RejectFormModalOpenButton
} from "~/Component/ProgramApplication/ProgramApplicationStatusFormModal"
import {
  attachDocument,
  getProgramAppDetails,
  saveApplicationAnswer
} from "~/ApiServices/BizApi/program/programApplicationIF"
import { NoteFormModalOpenButton } from "~/Component/ProgramApplication/ProgramApplicationNoteFormModal"
import { ResubmitFormModalOpenButton } from "~/Component/ProgramApplication/ProgramApplicationResubmitFormModal"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { getToken } from "@packages/api/lib/utils/TokenStore"
import { UploadOutlined } from "@ant-design/icons"
import "~/Sass/utils.scss"
import Notification from "~/utils/notification"
import { UPLOAD_SUCCESSFULLY } from "~/utils/Constants"

interface IRequisitePageProp {
  programID: number
  studentID: number
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
}

const btnLayout = {
  wrapperCol: { span: 20 }
}

export default function ProgramApplicationTabDetailsPage(props: IRequisitePageProp) {
  const [itemDetails, setItemDetails] = useState<{ [key: string]: any }>({})
  const [admissionReqGroups, setAdmissionReqGroups] = useState<Array<any>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [fileMap, setFileMap] = useState<{ [key: string]: any }>({})
  const [answerMap] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getProgramAppDetails({ ProgramID: props.programID, StudentID: props.studentID })
      if (response && response.success) {
        setItemDetails(response.data)
        const admissionRequirementList = response.data.AdmissionReqGroups
        setAdmissionReqGroups(admissionRequirementList)

        const requirements = admissionRequirementList[0].AdmissionReqs
        if (requirements != null) {
          const files: { [key: string]: any } = {}
          requirements.forEach((requirement: any) => {
            const answers = requirement.Answer
            const fileList: Array<any> = []
            if (answers != null) {
              const attachments = answers.Attachments
              if (attachments != null) {
                attachments.forEach((x: any, index: any) => {
                  const urlParams =
                    `/api/document?DocumentID=${x.DocumentID}&DownloadType=attachment&token=` + getToken()
                  fileList.push({
                    uid: index + 1,
                    name: x.Name,
                    url: urlParams,
                    status: "done"
                  })
                })
              }
              if (answers.Response !== undefined && answers.Response !== null) {
                answerMap[requirement.ProgramAdmReqID] = answers.Response
              }
            }
            files[requirement.ProgramAdmReqID] = fileList
          })
          setFileMap(files)
        }
      }
      setLoading(false)
    })()
    // eslint-disable-next-line
  }, [props])

  const storeAnswer = (value: any, ProgramAdmReqID: number) => {
    if (value.target !== undefined) {
      answerMap[ProgramAdmReqID] = value.target.value
    } else {
      answerMap[ProgramAdmReqID] = value
    }
  }

  const saveApplicationAnswers = async (ProgramAdmReqID: number) => {
    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType = saveApplicationAnswer

    const answer = answerMap[ProgramAdmReqID] === undefined ? "" : answerMap[ProgramAdmReqID]
    const param: { [key: string]: any } = {
      ProgramAppID: itemDetails.ProgramAppID,
      ProgramAdmReqID: ProgramAdmReqID,
      Answer: answer
    }

    const response = await serviceMethoToCall(param)
    if (response && response.success) {
      eventBus.publish(REFRESH_PAGE)
    } else {
      console.log(response.error)
    }
  }

  const onFileUpload = async (file: any, ProgramAdmReqID: number) => {
    getBase64(file.file.originFileObj).then((contents: any) => {
      const byteContent = dataURItoBlob(contents)
      console.log("Binary data: ", byteContent)
      attachDocument({
        ProgramAppID: itemDetails.ProgramAppID,
        ProgramAdmReqID: ProgramAdmReqID,
        FileName: file.file.name,
        FileContent: byteContent
      }).then((x: any) => {
        if (x.success) {
          Notification(UPLOAD_SUCCESSFULLY)
          eventBus.publish(REFRESH_PAGE)
        }
      })
    })
  }

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const dataURItoBlob = (dataURI: any) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString
    if (dataURI.split(",")[0].indexOf("base64") >= 0) byteString = atob(dataURI.split(",")[1])
    else byteString = unescape(dataURI.split(",")[1])

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return ia
    //return new Blob([ia], { type: mimeString })
  }

  return (
    <>
      {loading && (
        <Row justify="center" align="middle">
          <Spin size="large" />
        </Row>
      )}
      {!loading && Object.keys(itemDetails).length > 0 && (
        <Tabs type="card">
          {admissionReqGroups.map((y: any, yIndex: number) => (
            <Tabs.TabPane tab={y.Title} key={yIndex + 1}>
              <Row>
                {y.AdmissionReqs.map((x: any, index: any) => (
                  <>
                    <Col style={{ marginBottom: "16px" }} key={index + 1} xs={24} sm={24} md={24}>
                      <Card title={x.Name}>
                        <Row>
                          <Col xs={24} sm={24} md={12}>
                            <Form>
                              <Form.Item label={"Question"} {...layout}>
                                <Input aria-label="Question" disabled value={x.PreferenceDefName} />
                              </Form.Item>

                              <Form.Item label={"Expected Answer"} {...layout}>
                                <Input disabled aria-label="Expected answer" value={x.ExpectedAnswer} />
                              </Form.Item>

                              <Form.Item label={"Answer"} {...layout}>
                                {x.PreferenceDefChoices && (
                                  <Select
                                    aria-label="Select Asnwer"
                                    defaultValue={x.Answer?.Response}
                                    onChange={(events) => storeAnswer(events, x.ProgramAdmReqID)}
                                  >
                                    {x.PreferenceDefChoices.map((z: any, zIndex: any) => {
                                      return (
                                        <Select.Option key={`${zIndex + 1}`} value={z.Value}>
                                          {z.Value}
                                        </Select.Option>
                                      )
                                    })}
                                  </Select>
                                )}
                                {!x.PreferenceDefChoices && (
                                  <Input
                                    aria-label="Answer"
                                    value={x.Answer?.Response}
                                    onChange={(events) => storeAnswer(events, x.ProgramAdmReqID)}
                                  />
                                )}
                              </Form.Item>

                              {x.NeedProof && (
                                <Form.Item label="Attachments" {...layout}>
                                  <Upload
                                    onChange={(e) => onFileUpload(e, x.ProgramAdmReqID)}
                                    {...props}
                                    fileList={fileMap[x.ProgramAdmReqID]}
                                  >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                  </Upload>
                                </Form.Item>
                              )}

                              <Form.Item {...btnLayout} style={{ textAlign: "right" }}>
                                <Button type="primary" onClick={() => saveApplicationAnswers(x.ProgramAdmReqID)}>
                                  Save
                                </Button>
                              </Form.Item>
                            </Form>
                          </Col>
                          <Col xs={24} sm={24} md={12}>
                            <Form>
                              <Form.Item label={"Current Status"} {...layout}>
                                <Input aria-label="Status" disabled value={x.Answer && x.Answer.StatusName} />
                              </Form.Item>

                              <Form.Item label="Notes" {...layout}>
                                <Input.TextArea disabled rows={3} value={x.Answer && x.Answer.CommentText} />
                              </Form.Item>

                              <Form.Item label="Reason" {...layout}>
                                <Input.TextArea disabled rows={3} value={x.Answer && x.Answer.StatusReason} />
                              </Form.Item>

                              <Form.Item {...btnLayout} style={{ textAlign: "right" }}>
                                <AcceptFormModalOpenButton
                                  ProgramAppID={itemDetails.ProgramAppID}
                                  CurrentStatusID={x.Answer && x.Answer.StatusID}
                                  ProgramAdmReqID={x.ProgramAdmReqID}
                                />
                                <ResubmitFormModalOpenButton
                                  ProgramAppID={itemDetails.ProgramAppID}
                                  CurrentStatusID={x.Answer && x.Answer.StatusID}
                                  ProgramAdmReqID={x.ProgramAdmReqID}
                                />
                                <RejectFormModalOpenButton
                                  ProgramAppID={itemDetails.ProgramAppID}
                                  CurrentStatusID={x.Answer && x.Answer.StatusID}
                                  ProgramAdmReqID={x.ProgramAdmReqID}
                                />
                                <NoteFormModalOpenButton
                                  ProgramAppID={itemDetails.ProgramAppID}
                                  ProgramAdmReqID={x.ProgramAdmReqID}
                                />
                              </Form.Item>
                            </Form>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </>
                ))}
              </Row>
            </Tabs.TabPane>
          ))}
        </Tabs>
      )}
    </>
  )
}

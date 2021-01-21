import { Button, Card, Col, Form, Input, Row, Select, Spin, Upload } from "antd"
import React, { useState, useEffect } from "react"
import { getProgramAppDetails } from "~/ApiServices/BizApi/program/programApplicationIF"
import { UploadOutlined } from "@ant-design/icons"

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
                  <Button type="primary">Accept</Button>,
                  <Button type="primary">Resubmit</Button>,
                  <Button type="primary" danger>
                    Reject
                  </Button>,
                  <Button type="primary">Add Note</Button>
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
                        <Input.TextArea disabled rows={3}></Input.TextArea>
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={12}>
                      <Form.Item label={"Answer"} {...layout}>
                        {x.PreferenceDefChoices && (
                          <Select aria-label="Select Asnwer">
                            {x.PreferenceDefChoices.map((x: any, index: any) => {
                              return (
                                <Select.Option key={`${index + 1}`} value={x.Value}>
                                  {x.Value}
                                </Select.Option>
                              )
                            })}
                          </Select>
                        )}
                        {!x.PreferenceDefChoices && <Input aria-label="Answer" />}
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                      <Form.Item label="Reason" {...layout}>
                        <Input.TextArea disabled rows={3}></Input.TextArea>
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
                        <Button type="primary" style={{ float: "right" }}>
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

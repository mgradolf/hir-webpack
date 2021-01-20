import { Button, Card, Col, Form, Input, Row, Select, Spin, Upload } from "antd"
import React, { useState, useEffect } from "react"
import { getProgramAppDetails } from "~/ApiServices/BizApi/program/programApplicationIF"
import { UploadOutlined } from '@ant-design/icons';

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
  // const [fileList, setFileList] = useState<Array<{[key:string]:any}>>([{}])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getProgramAppDetails([props.programID, props.studentID])
      if (response && response.success) {
        setItemDetails(response.data)
        const admissionReqList = response.data.AdmissionReqGroups
        setAdmissionReqList(admissionReqList[0].AdmissionReqs)

        // const answers = admissionReqList[0].AdmissionReqs.Answer
        // if (answers !== null) {
        //   const attachments = answers.Attachments
        //   let files: Array<any> = []
        //   if (attachments !== null) {
        //     attachments.map((x: any, index: any) => {
        //       files.push({
        //         uid: index + 1,
        //         name: x.Name,
        //         url: ''
        //       })
        //     });
        //   }
        // }
      }
      setLoading(false)
    })()
  }, [props])

  const fileList: any = [
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'yyy.png',
      status: 'error',
    },
  ];

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
            <Col key={index+1} xs={24} sm={24} md={12}>
              <Card
                title={x.Name}
                actions={[
                  <Button type="primary" style={{marginRight: "10px"}}>Accept</Button>,
                  <Button type="ghost" style={{marginRight: "10px"}}>Resubmit</Button>,
                  <Button type="primary" danger style={{marginRight: "10px"}}>Reject</Button>
                ]}>
                <Form>
                  <Form.Item label={"Question"} {...layout}>
                    <Input aria-label="Question" disabled value={x.PreferenceDefName} />
                  </Form.Item>

                  <Form.Item label={"Expected Answer"} {...layout}>
                    <Input disabled aria-label="Expected answer" />
                  </Form.Item>

                  <Form.Item label={"Answer"} {...layout}>
                    {x.PreferenceDefChoices &&
                      <Select aria-label="Select Asnwer">
                        {x.PreferenceDefChoices.map((x: any, index: any) => {
                            return (
                              <Select.Option key={`${index+1}`} value={x.Value}>
                                {x.Value}
                              </Select.Option>
                            )
                          })}
                      </Select>
                    }
                    {!x.PreferenceDefChoices &&
                      <Input aria-label="Answer" />
                    }
                  </Form.Item>
                  <Form.Item label="Attachments" {...layout}>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture"
                      defaultFileList={[...fileList]}
                      className="upload-list-inline"
                    >
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>

                  <Button type="primary" style={{ marginRight: "10px"}}>Save</Button>

                  <Form.Item label={"Current Status"} {...layout}>
                    <Input aria-label="Status" disabled value={x.Answer && x.Answer.StatusName} />
                  </Form.Item>

                  <Form.Item label="Notes" {...layout}>
                    <Input.TextArea disabled rows={4}></Input.TextArea>
                  </Form.Item>
                  <Form.Item label="Reason" {...layout}>
                    <Input.TextArea disabled rows={4}></Input.TextArea>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

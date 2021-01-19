import { Collapse, Form, Input, Row, Spin } from "antd"
import React, { useState, useEffect } from "react"
import { getProgramAppDetails } from "~/ApiServices/BizApi/program/programApplicationIF"

interface IRequisitePageProp {
  programID: number
  studentID: number
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 6 }
}

export default function ProgramApplicationTabDetailsPage(props: IRequisitePageProp) {
  const [itemDetails, setItemDetails] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getProgramAppDetails([props.programID, props.studentID])
      if (response && response.success) {
        setItemDetails(response.data)
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
        <Collapse>
          {itemDetails.AdmissionReqGroups.map((x: any, index: any) => (
            <Collapse.Panel header={x.Name} key={index + 1}>
              <Form>
                <Form.Item label={"Question"} {...layout}>
                  <Input aria-label="Question" disabled value={x.Name} />
                </Form.Item>

                <Form.Item label={"Expected Answer"} {...layout}>
                  <Input aria-label="Expected answer" />
                </Form.Item>

                <Form.Item label={"Status"} {...layout}>
                  <Input aria-label="Status" disabled value={itemDetails.StatusName} />
                </Form.Item>
              </Form>
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
    </>
  )
}

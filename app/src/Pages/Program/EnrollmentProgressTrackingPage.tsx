import { Col, Collapse, Input, Row, Spin, Table, Typography } from "antd"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { trackingProgress } from "~/ApiServices/BizApi/program/programEnrollmentIF"

interface IRequisitePageProp {
  programID: number
  studentID: number
}

export default function EnrollmentProgressTrackingPage(props: IRequisitePageProp) {
  const [itemDetails, setItemDetails] = useState<{[key: string]: any}>({})
  const [loading, setLoading] = useState<boolean>(false)

  const columns = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    { title: "Status", dataIndex: "Status" }
  ]

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await trackingProgress([ props.programID, props.studentID ])
      if (response && response.success) {
        setItemDetails(response.data)
      }
      setLoading(false)
    })()
  }, [props])

  return (
    <>
      {loading &&
        <Row justify="center" align="middle">
          <Spin size="large" />
        </Row>
      }
      {!loading && Object.keys(itemDetails).length > 0 && (
        <Collapse>
          {itemDetails.ProgramRequirementGroups.map((x: any, index: any) => (
            <Collapse.Panel header={`Requirement Group: ${x.Name}`} key={index + 1}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ paddingBottom: "15px" }}>
                <Col xs={8} sm={7} md={4}>
                  <Typography.Text>Requirement Policy :</Typography.Text>
                </Col>
                <Col xs={16} sm={17} md={8}>
                  <Input type="text" disabled value={x.PolicyName} />
                </Col>

                <Col xs={8} sm={7} md={{ span: 3, offset: 1 }}>
                  <Typography.Text>Expected:</Typography.Text>
                </Col>
                <Col xs={16} sm={17} md={8}>
                  <Input type="text" disabled value={x.ExpectedValue} />
                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ paddingBottom: "15px" }}>
                <Col xs={8} sm={7} md={4}>
                  <Typography.Text>Actual:</Typography.Text>
                </Col>
                <Col xs={16} sm={17} md={8}>
                  <Input type="text" disabled value={x.ActualValue} />
                </Col>
              </Row>

              <Typography.Title level={4}>Details</Typography.Title>
              <Table
                loading={loading}
                columns={columns}
                dataSource={x.Offerings}
                pagination={false}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
      )}
    </>
  )
}

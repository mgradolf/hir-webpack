import { Button, Col, Form, Input, Row } from "antd"
import React, { useState } from "react"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
export default function StudentSearchFilterByNameID() {
  const [mobileView, setMobileView] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setMobileView(deviceViews.mobile)
  })
  return (
    <Form.Item label="Student" labelCol={{ span: 6 }}>
      <Row>
        <Col span={12} {...(mobileView && { xs: { span: 10, offset: 0 } })}>
          <Input value={""} />
        </Col>
        <Col span={12} style={{ textAlignLast: "end" }} {...(mobileView && { xs: { span: 14, offset: 0 } })}>
          <Button type="primary" style={{ ...(!mobileView && { marginRight: "10px" }) }}>
            Lookup
          </Button>
          <Button type="ghost" style={{ ...(!mobileView && { marginRight: "10px" }) }}>
            Clear
          </Button>
        </Col>
      </Row>
    </Form.Item>
  )
}

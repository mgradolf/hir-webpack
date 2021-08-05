import { Button, Card, Col, Row } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import Modal from "~/Component/Common/Modal/index2"
import { CheckCircleTwoTone } from "@ant-design/icons"

export const OrderSubmittedConfirmationModal = (props: {
  newRequestID: number
  setShowModal: (flag: boolean) => void
}) => {
  return (
    <Modal width="500px">
      <Card
        title={
          <>
            <CheckCircleTwoTone twoToneColor="#52c41a" /> Order Request Successfully Created
          </>
        }
        style={{ margin: "50%, 0" }}
      >
        <Row>
          <Col span={12}>
            <Link to={`/request/${props.newRequestID}`}>Preview Submitted Order Request</Link>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                props.setShowModal(false)
              }}
              type="primary"
            >
              Create Another Order
            </Button>
          </Col>
        </Row>
      </Card>
    </Modal>
  )
}

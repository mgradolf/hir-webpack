import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Col, message, Row } from "antd"
import { CartModelFunctionality } from "./Model/CartModelFunctionality"
import { IItemRequest } from "./Model/Interface/IModel"
import Modal from "~/Component/Common/Modal/index2"
import { CheckCircleTwoTone } from "@ant-design/icons"

export const SubmitOrderButton = (props: {
  orderRequestInProgress: boolean
  disabled: boolean
  setOrderRequestInProgress: (flag: boolean) => void
  cartModelFunctionality: CartModelFunctionality
  itemList: IItemRequest[]
}) => {
  const [showModal, setShowModal] = useState(false)
  const [newRequestID, setNewRequestID] = useState<number>()
  return (
    <>
      {showModal && (
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
                <Link to={`/request/${newRequestID}`}>Preview Submitted Order Request</Link>
              </Col>
              <Col span={12}>
                <Button
                  onClick={() => {
                    // props.cartModelFunctionality.assignPerson()
                    props.cartModelFunctionality.removeCartItemRequest()
                    setShowModal(false)
                  }}
                  type="primary"
                >
                  Create Another Order
                </Button>
              </Col>
            </Row>
          </Card>
        </Modal>
      )}
      <Button
        disabled={props.disabled}
        loading={props.orderRequestInProgress}
        type="primary"
        onClick={() => {
          let issueDoesNotExist = true
          props.itemList.forEach((x) => {
            issueDoesNotExist = issueDoesNotExist && props.cartModelFunctionality.findIssue(x)
          })
          if (!issueDoesNotExist) message.error("Please solve cart item issues first!")
          else {
            props.setOrderRequestInProgress(true)
            props.cartModelFunctionality.launchRequest().then((response) => {
              props.setOrderRequestInProgress(false)
              if (response.success) {
                setNewRequestID(response.data.RequestID)
                setShowModal(true)
              }
            })
          }
        }}
      >
        Submit Order
      </Button>
    </>
  )
}

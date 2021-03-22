import React, { useState } from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Button, Card, Form, Input, Radio } from "antd"
import { getAvailableDiscountByOrderItemID, grantDiscountProgram } from "~/ApiServices/Service/OrderService"
import TextArea from "antd/lib/input/TextArea"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import OrderDetailForModal from "~/Component/Section/Order/OrderDetailForModal"
import { OldDropDown } from "~/Component/Common/OldForm/OldDropDown"

interface IApplyDiscountModal {
  OrderID: number
  OrderItemID: number
  setShowViewReturnItemsModal: (flag: boolean) => void
}

interface ICreditMemoData {
  OrderLineID: number
  Amount: number
}

const fieldNames = {
  OrderItemID: "OrderItemID",
  SectionDiscountID: "SectionDiscountID",
  Amount: "Amount",
  IsDollarAmount: "IsDollarAmount",
  Reason: "Reason"
}

export default function ApplyDiscountModal(props: IApplyDiscountModal) {
  const [formInstance] = Form.useForm()
  const [errorMessages, setErrorMessages] = useState<ISimplifiedApiErrorMessage[]>([])
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  return (
    <Modal
      width="800px"
      apiCallInProgress={apiCallInProgress}
      children={
        <Card
          title="Apply Discount"
          actions={[
            <Button
              onClick={() => {
                props.setShowViewReturnItemsModal(false)
              }}
            >
              Close
            </Button>,
            <Button
              onClick={() => {
                setErrorMessages([])
                setApiCallInProgress(true)
                grantDiscountProgram({
                  ...formInstance.getFieldsValue(),
                  [fieldNames.OrderItemID]: props.OrderItemID
                }).then((x) => {
                  setApiCallInProgress(false)
                  if (x.success) {
                    eventBus.publish(REFRESH_PAGE)
                    props.setShowViewReturnItemsModal(false)
                  } else setErrorMessages(x.error)
                })
              }}
            >
              Manually Grant Discount
            </Button>
          ]}
        >
          <div className="modal-form">
            {" "}
            <OrderDetailForModal OrderID={props.OrderID} />
            <Form form={formInstance}>
              <OldFormError errorMessages={errorMessages} />
              <OldDropDown
                fieldName={fieldNames.SectionDiscountID}
                searchFunc={getAvailableDiscountByOrderItemID}
                searchParams={{ OrderItemID: props.OrderItemID }}
                displayField="Name"
                valueField="SectionDiscountID"
                labelColumn={{ span: 6 }}
                label="Available Discounts"
              />
              <Form.Item name={fieldNames.Reason} label="Reason" labelCol={{ span: 6 }}>
                <TextArea />
              </Form.Item>
              <Form.Item name={fieldNames.IsDollarAmount} label="Amount in" labelCol={{ span: 6 }}>
                <Radio.Group aria-label="Amount in">
                  <Radio value={true}>Doller</Radio>
                  <Radio value={false}>Percentage</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name={fieldNames.Amount} label="Amount" labelCol={{ span: 6 }}>
                <Input type="number" />
              </Form.Item>
            </Form>
          </div>
        </Card>
      }
    />
  )
}

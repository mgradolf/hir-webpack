import React, { useEffect, useState } from "react"
import { Button, Card, Dropdown, Menu } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import Modal from "~/Component/Common/Modal/index2"
import { getPaymentTypes } from "~/ApiServices/BizApi/payment/paymentIF"
import { AdjustFromCashAccount } from "~/Component/Feature/Order/Payment/PaymentMethods/AdjustFromCashAccount"
import { ExternalPayment } from "~/Component/Feature/Order/Payment/PaymentMethods/ExternalPayment"
import { GiftOrCash } from "~/Component/Feature/Order/Payment/PaymentMethods/GiftOrCash"
import { SavingsOrChecks } from "~/Component/Feature/Order/Payment/PaymentMethods/SavingsOrChecks"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { NO_PAYMENT } from "~/Pages/Manage/Financials/CreateOrderPage"
import { PO } from "./PaymentMethods/PO"
import { DownOutlined, UserOutlined } from "@ant-design/icons"

export const PaymentMethods = (props: {
  requestComponentName: string
  buyer: IBuyer
  itemList: IItemRequest[]
  allocations?: IAllocation
  promoCodes: IRegistrationPromo[]
  cartModelFunctionality: CartModelFunctionality
  selectedPayment: { [key: string]: any }
  setSelectedPayment: (params: { [key: string]: any }) => void
  depositItems: any[]
  setDepositItems: (param: any[]) => void
  setPaymentFormValue: (param: { [key: string]: any }) => void
  setShowPaymentMethods: (flag: boolean) => void
}) => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [PaymentFormInstance] = Form.useForm()

  useEffect(() => {
    getPaymentTypes({}).then((x) => {
      if (x.success) {
        x.data = [NO_PAYMENT, ...x.data]
        setPaymentMethods(x.data)
      }
    })
  }, [])
  return (
    <>
      {paymentMethods.length && (
        <Dropdown
          disabled={!props.itemList.length}
          overlay={
            <Menu
              onClick={(e) => {
                const paymentMethod = paymentMethods.find((x: any) => x.PaymentTypeID === Number(e.key))
                props.setSelectedPayment(paymentMethod || {})
                props.setShowPaymentMethods(false)
              }}
            >
              {paymentMethods.map((x: any) => (
                <Menu.Item key={x.PaymentTypeID} icon={<UserOutlined />}>
                  {x.PaymentAcceptedName}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <Button>
            Select Payment Methods <DownOutlined />
          </Button>
        </Dropdown>
      )}

      {showPaymentModal && (
        <Modal width="1000px">
          <Card
            title={props.selectedPayment.PaymentAcceptedName}
            actions={[
              <Button onClick={() => setShowPaymentModal(false)}>Cancel</Button>,
              <Button
                type="primary"
                onClick={() => {
                  props.setPaymentFormValue(PaymentFormInstance.getFieldsValue())
                  setShowPaymentModal(false)
                  props.setShowPaymentMethods(false)
                }}
                style={{ marginBottom: "10px" }}
              >
                Submit
              </Button>
            ]}
          >
            <Form form={PaymentFormInstance}>
              <PaymentMethodsModalContent
                buyer={props.buyer}
                selectedPayment={props.selectedPayment}
                setDepositItems={props.setDepositItems}
                PaymentFormInstance={PaymentFormInstance}
              />
            </Form>
          </Card>
        </Modal>
      )}
    </>
  )
}

const PaymentMethodsModalContent = (props: {
  buyer: IBuyer
  selectedPayment: { [key: string]: any }
  setDepositItems: (items: any[]) => void
  PaymentFormInstance: FormInstance
}) => {
  return (
    <>
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 13 && (
        <AdjustFromCashAccount
          setDepositItems={props.setDepositItems}
          formInstance={props.PaymentFormInstance}
          {...(props.buyer && props.buyer.PersonID && { PayerID: props.buyer.PersonID })}
        />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 11 && (
        <GiftOrCash formInstance={props.PaymentFormInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 4 && (
        <GiftOrCash formInstance={props.PaymentFormInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 1 && (
        <SavingsOrChecks formInstance={props.PaymentFormInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 0 && (
        <SavingsOrChecks formInstance={props.PaymentFormInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 7 && (
        <ExternalPayment formInstance={props.PaymentFormInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 1000 && (
        <PO formInstance={props.PaymentFormInstance} />
      )}
    </>
  )
}

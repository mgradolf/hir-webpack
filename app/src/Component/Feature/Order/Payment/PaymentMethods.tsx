import { Button, Card, message, Row } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import React, { useState } from "react"
import { getPaymentTypes } from "~/ApiServices/BizApi/payment/paymentIF"
import { launchRequest, launchRequestWithExternalPayment } from "~/ApiServices/Service/RequestService"
import { getExternalPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/ExternalPayment"
import { AdjustFromCashAccount } from "~/Component/Feature/Order/Payment/PaymentMethods/AdjustFromCashAccount"
import { ExternalPayment } from "~/Component/Feature/Order/Payment/PaymentMethods/ExternalPayment"
import { GiftOrCash } from "~/Component/Feature/Order/Payment/PaymentMethods/GiftOrCash"
import { SavingsOrChecks } from "~/Component/Feature/Order/Payment/PaymentMethods/SavingsOrChecks"
import { getAdjustFromCashPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/AdjustFromCash"
import { getGiftOrCashPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/GiftOrCash"
import { getSavingsOrCheckPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/SavingsOrCheck"
import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { OrderSubmittedConfirmationModal } from "~/Component/Feature/Order/OrderSubmittedConfirmationModal"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import Modal from "~/Component/Common/Modal/index2"
import { NO_PAYMENT } from "~/Pages/Manage/Financials/CreateOrderPage"
import { PO } from "./PaymentMethods/PO"

export const PaymentMethods = (props: {
  requestComponentName: string
  buyer: IBuyer
  itemList: IItemRequest[]
  allocations?: IAllocation
  promoCodes: IRegistrationPromo[]
  cartModelFunctionality: CartModelFunctionality
  showPaymentModal: boolean
  setShowPaymentModal: (flag: false) => void
  selectedPayment: { [key: string]: any }
  setSelectedPayment: (params: { [key: string]: any }) => void
}) => {
  const [PaymentFormInstance] = Form.useForm()
  const [paymentMethods, setPaymentMethods] = useState([])
  const [depositItems, setDepositItems] = useState<any[]>([])
  const [showOrderSubmittedConfirmationModal, setShowOrderSubmittedConfirmationModal] = useState(false)
  const [newRequestID, setNewRequestID] = useState<number>()

  const submitOrderWithPayment = () => {
    const handleResponse = (requestObject: IRequestObject | undefined) => {
      console.log(JSON.stringify(requestObject))
      if (requestObject)
        return (props.selectedPayment && props.selectedPayment.PaymentTypeID === 7
          ? launchRequestWithExternalPayment(requestObject)
          : launchRequest(requestObject)
        ).then((response) => {
          if (response && response.success) {
            setNewRequestID(response.data.RequestID)
            props.cartModelFunctionality.removeCartItemRequest()
            props.setShowPaymentModal(false)
            setShowOrderSubmittedConfirmationModal(true)

            if (response.data.CurrentUrl) {
              window.open(response.data.CurrentUrl)
            }
          } else {
            message.error("Something went wrong! Order with Payment is not successful")
          }
        })
    }
    if (props.selectedPayment && props.allocations) {
      // eslint-disable-next-line
      let methodToGetPaymentRequestObject
      switch (props.selectedPayment.PaymentTypeID) {
        case 13:
          console.log("depositItems ", depositItems)
          if (!depositItems) message.warning("Select Deposit")
          else
            methodToGetPaymentRequestObject = getAdjustFromCashPaymentRequestObject({
              ...props,
              PaymentFormInstance,
              PaymentTypeID: props.selectedPayment.PaymentTypeID,
              depositItems: depositItems
            }).then(handleResponse)
          break
        case 11:
          methodToGetPaymentRequestObject = getGiftOrCashPaymentRequestObject({
            ...props,
            PaymentFormInstance,
            PaymentTypeID: props.selectedPayment.PaymentTypeID
          }).then(handleResponse)
          break
        case 4:
          methodToGetPaymentRequestObject = getGiftOrCashPaymentRequestObject({
            ...props,
            PaymentFormInstance,
            PaymentTypeID: props.selectedPayment.PaymentTypeID
          }).then(handleResponse)
          break
        case 1:
          methodToGetPaymentRequestObject = getSavingsOrCheckPaymentRequestObject({
            ...props,
            PaymentFormInstance,
            PaymentTypeID: props.selectedPayment.PaymentTypeID
          }).then(handleResponse)
          break
        case 0:
          methodToGetPaymentRequestObject = getSavingsOrCheckPaymentRequestObject({
            ...props,
            PaymentFormInstance,
            PaymentTypeID: props.selectedPayment.PaymentTypeID
          }).then(handleResponse)
          break
        case 7:
          methodToGetPaymentRequestObject = getExternalPaymentRequestObject({
            ...props,
            PaymentFormInstance,
            PaymentTypeID: props.selectedPayment.PaymentTypeID
          }).then(handleResponse)
          break
      }
    }
  }

  return (
    <>
      <Form form={PaymentFormInstance}>
        <FormDropDown
          wrapperColSpan={18}
          label="Payment Method"
          fieldName="PaymentMethodID"
          formInstance={PaymentFormInstance}
          defaultValue={100000000002222200002222}
          refLookupService={() =>
            getPaymentTypes({}).then((x) => {
              if (x.success) {
                x.data = [NO_PAYMENT, ...x.data]
                setPaymentMethods(x.data)
              }
              return x
            })
          }
          displayKey="PaymentAcceptedName"
          valueKey="PaymentTypeID"
          onChangeCallback={(selectedID?) => {
            if (selectedID !== undefined) {
              const __selectedPayment: { [key: string]: any } =
                paymentMethods.find((x) => x["PaymentTypeID"] === selectedID) || {}
              props.setSelectedPayment(__selectedPayment)
            } else props.setSelectedPayment({})
          }}
        />
        {props.showPaymentModal && props.selectedPayment && (
          <Modal width="1000px">
            <Card
              title={props.selectedPayment.PaymentAcceptedName}
              actions={[
                <Button onClick={() => props.setShowPaymentModal(false)}>Cancel</Button>,
                <Button type="primary" onClick={submitOrderWithPayment} style={{ marginBottom: "10px" }}>
                  {`Submit Order With ${props.selectedPayment.PaymentAcceptedName}`}
                </Button>
              ]}
            >
              <PaymentMethodsModalContent
                buyer={props.buyer}
                selectedPayment={props.selectedPayment}
                setDepositItems={setDepositItems}
                PaymentFormInstance={PaymentFormInstance}
              />
            </Card>
          </Modal>
        )}
      </Form>
      <Row justify="end" gutter={4}>
        {showOrderSubmittedConfirmationModal && newRequestID && (
          <OrderSubmittedConfirmationModal
            setShowModal={setShowOrderSubmittedConfirmationModal}
            newRequestID={newRequestID}
          />
        )}
      </Row>
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

import { Button, message, Row } from "antd"
import Form from "antd/lib/form"
import React, { useState } from "react"
import { getPaymentTypes } from "~/ApiServices/BizApi/payment/paymentIF"
import { launchRequest, launchRequestWithExternalPayment } from "~/ApiServices/Service/RequestService"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { getExternalPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/ExternalPayment"
import { AdjustFromCashAccount } from "~/Component/Feature/Order/Payment/PaymentMethods/AdjustFromCashAccount"
import { ExternalPayment } from "~/Component/Feature/Order/Payment/PaymentMethods/ExternalPayment"
import { GiftOrCash } from "~/Component/Feature/Order/Payment/PaymentMethods/GiftOrCash"
import { SavingsOrChecks } from "~/Component/Feature/Order/Payment/PaymentMethods/SavingsOrChecks"
import { getAdjustFromCashPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/AdjustFromCash"
import { getGiftOrCashPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/GiftOrCash"
import { getSavingsOrCheckPaymentRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/SavingsOrCheck"
import { Redirect } from "react-router-dom"
import { IRequestObject } from "~/Component/Feature/Order/Payment/PaymentObjectFactory/Interfaces"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"

export const PaymentMethods = (props: {
  requestComponentName: string
  buyer: IBuyer
  itemList: IItemRequest[]
  allocations?: IAllocation
  promoCodes: IRegistrationPromo[]
}) => {
  const [PaymentFormInstance] = Form.useForm()
  const [selectedPayment, setSelectedPayment] = useState<{ [key: string]: any }>({})
  const [paymentMethods, setPaymentMethods] = useState([])
  const [depositItems, setDepositItems] = useState<any[]>([])
  const [redirectTo, setRedirectTo] = useState<string>()

  return (
    <>
      <Form form={PaymentFormInstance}>
        <FormMultipleRadio
          wrapperColSpan={18}
          label="Payment Method"
          fieldName="PaymentMethodID"
          formInstance={PaymentFormInstance}
          refLookupService={() =>
            getPaymentTypes({}).then((x) => {
              if (x.success) {
                x.data = x.data.filter((__: any) => __.BasePaymentTypeID !== 1000)
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
              setSelectedPayment(__selectedPayment)
            }
          }}
        />
      </Form>
      {selectedPayment && selectedPayment.PaymentTypeID === 13 && (
        <AdjustFromCashAccount
          setDepositItems={setDepositItems}
          formInstance={PaymentFormInstance}
          {...(props.buyer && props.buyer.PersonID && { PayerID: props.buyer.PersonID })}
        />
      )}
      {selectedPayment && selectedPayment.PaymentTypeID === 11 && <GiftOrCash formInstance={PaymentFormInstance} />}
      {selectedPayment && selectedPayment.PaymentTypeID === 4 && <GiftOrCash formInstance={PaymentFormInstance} />}
      {selectedPayment && selectedPayment.PaymentTypeID === 1 && <SavingsOrChecks formInstance={PaymentFormInstance} />}
      {selectedPayment && selectedPayment.PaymentTypeID === 0 && <SavingsOrChecks formInstance={PaymentFormInstance} />}
      {selectedPayment && selectedPayment.PaymentTypeID === 7 && <ExternalPayment formInstance={PaymentFormInstance} />}
      <Row justify="end">
        <Button
          type="primary"
          onClick={() => {
            const handleResponse = (requestObject: IRequestObject | undefined) => {
              console.log(JSON.stringify(requestObject))
              if (requestObject)
                return (selectedPayment && selectedPayment.PaymentTypeID === 7
                  ? launchRequestWithExternalPayment(requestObject)
                  : launchRequest(requestObject)
                ).then((response) => {
                  if (response && response.success) setRedirectTo(`/payment-success`)
                  else {
                    message.error("Something went wrong! Payment is not successful")
                  }
                })
            }
            if (selectedPayment && props.allocations) {
              // eslint-disable-next-line
              let methodToGetPaymentRequestObject
              switch (selectedPayment.PaymentTypeID) {
                case 13:
                  console.log("depositItems ", depositItems)
                  if (!depositItems) message.warning("Select Deposit")
                  else
                    methodToGetPaymentRequestObject = getAdjustFromCashPaymentRequestObject({
                      ...props,
                      PaymentFormInstance,
                      PaymentTypeID: selectedPayment.PaymentTypeID,
                      depositItems: depositItems
                    }).then(handleResponse)
                  break
                case 11:
                  methodToGetPaymentRequestObject = getGiftOrCashPaymentRequestObject({
                    ...props,
                    PaymentFormInstance,
                    PaymentTypeID: selectedPayment.PaymentTypeID
                  }).then(handleResponse)
                  break
                case 4:
                  methodToGetPaymentRequestObject = getGiftOrCashPaymentRequestObject({
                    ...props,
                    PaymentFormInstance,
                    PaymentTypeID: selectedPayment.PaymentTypeID
                  }).then(handleResponse)
                  break
                case 1:
                  methodToGetPaymentRequestObject = getSavingsOrCheckPaymentRequestObject({
                    ...props,
                    PaymentFormInstance,
                    PaymentTypeID: selectedPayment.PaymentTypeID
                  }).then(handleResponse)
                  break
                case 0:
                  methodToGetPaymentRequestObject = getSavingsOrCheckPaymentRequestObject({
                    ...props,
                    PaymentFormInstance,
                    PaymentTypeID: selectedPayment.PaymentTypeID
                  }).then(handleResponse)
                  break
                case 7:
                  methodToGetPaymentRequestObject = getExternalPaymentRequestObject({
                    ...props,
                    PaymentFormInstance,
                    PaymentTypeID: selectedPayment.PaymentTypeID
                  }).then(handleResponse)
                  break
              }
            }
          }}
          style={{ marginBottom: "10px" }}
        >
          Submit
        </Button>
        {redirectTo && <Redirect to={redirectTo} />}
      </Row>
    </>
  )
}

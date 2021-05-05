import { Button, message, Row } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import React, { useState } from "react"
import { getPaymentTypes } from "~/ApiServices/BizApi/payment/paymentIF"
import { launchRequestWithExternalPayment } from "~/ApiServices/Service/RequestService"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { getAdjustFromCashPaymentRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/AdjustFromCash"
import { getExternalPaymentRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/ExternalPayment"
import { AdjustFromCashAccount } from "~/Component/Feature/Payment/Step4PaymentMethods/AdjustFromCashAccount"
import { ExternalPayment } from "~/Component/Feature/Payment/Step4PaymentMethods/ExternalPayment"
import { GiftOrCash } from "~/Component/Feature/Payment/Step4PaymentMethods/GiftOrCash"
import { SavingsOrChecks } from "~/Component/Feature/Payment/Step4PaymentMethods/SavingsOrChecks"

export const Step4PaymentMethods = (props: {
  selectedPayment?: { [key: string]: any }
  setSelectedPayment: (Params?: { [key: string]: any }) => void
  formInstance: FormInstance
  selectedPayer?: any
  selectedOrderItems: any[]
  allocatedItems: any[]
  PersonFormInstance: FormInstance
  PaymentFormInstance: FormInstance
}) => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [depositItems, setDepositItems] = useState<any[]>([])
  return (
    <>
      <Form form={props.formInstance}>
        <FormMultipleRadio
          wrapperColSpan={18}
          label="Payment Method"
          fieldName="PaymentMethodID"
          formInstance={props.formInstance}
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
              const __ = paymentMethods.find((x) => x["PaymentTypeID"] === selectedID)
              props.setSelectedPayment(__)
            }
          }}
        />
      </Form>
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 13 && (
        <AdjustFromCashAccount
          setDepositItems={setDepositItems}
          formInstance={props.formInstance}
          {...(props.selectedPayer && { PayerID: props.selectedPayer.PersonID })}
        />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 11 && (
        <GiftOrCash formInstance={props.formInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 4 && (
        <GiftOrCash formInstance={props.formInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 1 && (
        <SavingsOrChecks formInstance={props.formInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 0 && (
        <SavingsOrChecks formInstance={props.formInstance} />
      )}
      {props.selectedPayment && props.selectedPayment.PaymentTypeID === 7 && (
        <ExternalPayment formInstance={props.formInstance} />
      )}
      <Row justify="end">
        <Button
          type="primary"
          onClick={() => {
            let methodToGetPaymentRequestObject
            if (props.selectedPayment)
              switch (props.selectedPayment.PaymentTypeID) {
                case 13:
                  console.log("depositItems ", depositItems)
                  methodToGetPaymentRequestObject = getAdjustFromCashPaymentRequestObject({
                    ...props,
                    depositItems: depositItems
                  })
                  break
                case 11:
                  methodToGetPaymentRequestObject = null
                  break
                case 4:
                  methodToGetPaymentRequestObject = null
                  break
                case 1:
                  methodToGetPaymentRequestObject = null
                  break
                case 0:
                  methodToGetPaymentRequestObject = null
                  break
                case 7:
                  if (!depositItems) message.warning("Select Deposit")
                  else methodToGetPaymentRequestObject = getExternalPaymentRequestObject(props)
                  break
              }

            if (methodToGetPaymentRequestObject)
              methodToGetPaymentRequestObject
                .then((requestObject) => {
                  console.log(requestObject)
                  if (requestObject) return launchRequestWithExternalPayment(requestObject)
                })
                .then((x) => {
                  console.log(x)
                })
          }}
          style={{ marginBottom: "10px" }}
        >
          Submit
        </Button>
      </Row>
    </>
  )
}

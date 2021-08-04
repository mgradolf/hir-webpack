import { Button, message, Row } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import React, { useState } from "react"
import { getPaymentTypes } from "~/ApiServices/BizApi/payment/paymentIF"
import { launchRequest, launchRequestWithExternalPayment } from "~/ApiServices/Service/RequestService"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { getExternalPaymentRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/ExternalPayment"
import { AdjustFromCashAccount } from "~/Component/Feature/Payment/Step4PaymentMethods/AdjustFromCashAccount"
import { ExternalPayment } from "~/Component/Feature/Payment/Step4PaymentMethods/ExternalPayment"
import { GiftOrCash } from "~/Component/Feature/Payment/Step4PaymentMethods/GiftOrCash"
import { SavingsOrChecks } from "~/Component/Feature/Payment/Step4PaymentMethods/SavingsOrChecks"
import { getAdjustFromCashPaymentRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/AdjustFromCash"
import { getGiftOrCashPaymentRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/GiftOrCash"
import { getSavingsOrCheckPaymentRequestObject } from "~/Component/Feature/Payment/PaymentObjectFactory/SavingsOrCheck"
import { Redirect } from "react-router-dom"

export const Step4PaymentMethods = (props: {
  selectedPayment?: { [key: string]: any }
  setSelectedPayment: (Params?: { [key: string]: any }) => void
  formInstance: FormInstance
  selectedPayer?: any
  selectedOrderItems: any[]
  allocatedItems: any[]
  PersonFormInstance: FormInstance
  PaymentFormInstance: FormInstance
  totalBalance: number
  totalPayment: number
}) => {
  const [paymentMethods, setPaymentMethods] = useState([])
  const [depositItems, setDepositItems] = useState<any[]>([])
  const [redirectTo, setRedirectTo] = useState<string>()
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
                  if (!depositItems) message.warning("Select Deposit")
                  else
                    methodToGetPaymentRequestObject = getAdjustFromCashPaymentRequestObject({
                      ...props,
                      depositItems: depositItems
                    })
                  break
                case 11:
                  methodToGetPaymentRequestObject = getGiftOrCashPaymentRequestObject(props)
                  break
                case 4:
                  methodToGetPaymentRequestObject = getGiftOrCashPaymentRequestObject(props)
                  break
                case 1:
                  methodToGetPaymentRequestObject = getSavingsOrCheckPaymentRequestObject(props)
                  break
                case 0:
                  methodToGetPaymentRequestObject = getSavingsOrCheckPaymentRequestObject(props)
                  break
                case 7:
                  methodToGetPaymentRequestObject = getExternalPaymentRequestObject(props)
                  break
              }

            if (methodToGetPaymentRequestObject)
              methodToGetPaymentRequestObject
                .then((requestObject) => {
                  console.log(requestObject)
                  if (requestObject)
                    return props.selectedPayment && props.selectedPayment.PaymentTypeID === 7
                      ? launchRequestWithExternalPayment(requestObject)
                      : launchRequest(requestObject)
                })
                .then((response) => {
                  if (response && response.success) setRedirectTo(`/payment-success`)
                  else {
                    message.error("Something went wrong! Payment is not successful")
                  }
                })
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

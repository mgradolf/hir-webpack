import React, { useEffect, useState } from "react"
import { Col, Row } from "antd"
import { CartTable } from "~/Component/Feature/Order/CartTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { fakeCartData } from "~/Component/Feature/Order/Model/fakeCartData"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { SelectBuyer } from "~/Component/Feature/Order/SelectBuyer"
import { eventBus } from "~/utils/EventBus"
import { PromoTable } from "~/Component/Feature/Order/PromoTable"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { querystringToObject } from "~/utils/QueryStringToObjectConverter"
import { SubmitOrderButton } from "~/Component/Feature/Order/SubmitOrderButton"
import { PaymentMethods } from "~/Component/Feature/Order/Payment/PaymentMethods"
import { Shop } from "~/Component/Feature/Order/Shop/Shop"
import { SelectedPaymentMethodSummary } from "~/Component/Feature/Order/SelectedPaymentMethodSummary"

export const UPDATE_CART = "UPDATE_CART"
export const UPDATE_BUYER = "UPDATE_BUYER"
export const UPDATE_PROMO = "UPDATE_PROMO"

export const NO_PAYMENT = {
  BasePaymentTypeID: 100000000002222200002222,
  PaymentAcceptedName: "No Payment",
  BasePaymentType: "No Payment",
  PaymentTypeID: 100000000002222200002222
}

//
export default function CreateOrderPage() {
  const [buyer, setBuyer] = useState<IBuyer>({})
  const [itemList, setItemList] = useState<IItemRequest[]>([])
  const [allocations, setAllocations] = useState<IAllocation>()
  const [promoCodes, setPromoCodes] = useState<IRegistrationPromo[]>([])
  const [cartModelFunctionality] = useState(new CartModelFunctionality(UPDATE_CART, UPDATE_BUYER, UPDATE_PROMO))
  const [orderRequestInProgress, setOrderRequestInProgress] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<{ [key: string]: any }>(NO_PAYMENT)
  // const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showPaymentMethods, setShowPaymentMethods] = useState(true)
  const [depositItems, setDepositItems] = useState<any[]>([])

  const [paymentFormValue, setPaymentFormValue] = useState<{ [key: string]: any }>({})
  useEffect(() => {
    const queryParams = querystringToObject()
    if (queryParams && queryParams.BuyerID) {
      getEntityById("Person", queryParams.BuyerID).then((response) => {
        if (response.success) {
          cartModelFunctionality.assignPerson(response.data)
        }
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setItemList(fakeCartData)
    eventBus.subscribe(UPDATE_CART, (params: { itemList: IItemRequest[]; allocations: IAllocation }) => {
      setItemList(params.itemList)
      setAllocations(params.allocations)

      if (!params.itemList.length) {
        setShowPaymentMethods(true)
        setSelectedPayment({})
      }
    })
    eventBus.subscribe(UPDATE_BUYER, (buyer: IBuyer) => {
      setBuyer(buyer)
    })
    eventBus.subscribe(UPDATE_PROMO, (promoCodes: IRegistrationPromo[]) => {
      setPromoCodes(promoCodes)
    })
    return () => {
      eventBus.unsubscribe(UPDATE_BUYER)
      eventBus.unsubscribe(UPDATE_CART)
      eventBus.unsubscribe(UPDATE_PROMO)
    }
  }, [])
  return (
    <div className="site-layout-content">
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <Row justify="center">
          <Col span={18}>
            <SelectBuyer buyer={buyer} cartModelFunctionality={cartModelFunctionality} />
          </Col>
        </Row>

        <Shop buyer={buyer} cartModelFunctionality={cartModelFunctionality} itemList={itemList} />
        <CartTable itemList={itemList} cartModelFunctionality={cartModelFunctionality} />

        <Col span={3}>
          <PromoTable
            promos={promoCodes}
            cartModelFunctionality={cartModelFunctionality}
            disable={orderRequestInProgress || !(itemList.length && buyer.AccountID)}
          />
        </Col>

        <Row justify="end" style={{ marginTop: "5px" }}>
          {showPaymentMethods && (
            <PaymentMethods
              cartModelFunctionality={cartModelFunctionality}
              requestComponentName="OrderWithPayment"
              buyer={buyer}
              itemList={itemList}
              allocations={allocations}
              promoCodes={promoCodes}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              depositItems={depositItems}
              setDepositItems={setDepositItems}
              setPaymentFormValue={setPaymentFormValue}
              setShowPaymentMethods={setShowPaymentMethods}
            />
          )}
        </Row>
        <Row justify="space-between" style={{ marginTop: "5px" }}>
          {selectedPayment.PaymentTypeID && allocations && !showPaymentMethods && (
            <SelectedPaymentMethodSummary
              PaymentAmount={allocations?.TotalPaymentAmount}
              PaymentMethodName={selectedPayment.PaymentAcceptedName}
              setShowPaymentMethods={setShowPaymentMethods}
            />
          )}
        </Row>
        <Row justify="end" style={{ marginTop: "5px" }}>
          <SubmitOrderButton
            disabled={orderRequestInProgress || !(itemList.length && buyer.AccountID)}
            orderRequestInProgress={orderRequestInProgress}
            setOrderRequestInProgress={setOrderRequestInProgress}
            cartModelFunctionality={cartModelFunctionality}
            itemList={itemList}
            selectedPayment={selectedPayment}
            buyer={buyer}
            promoCodes={promoCodes}
            setSelectedPayment={setSelectedPayment}
            paymentFormValue={paymentFormValue}
            depositItems={depositItems}
            allocations={allocations}
          />
        </Row>
      </div>
    </div>
  )
}

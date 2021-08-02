import React, { useEffect, useState } from "react"
import { Button, Col, Radio, Row } from "antd"
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

export const UPDATE_CART = "UPDATE_CART"
export const UPDATE_BUYER = "UPDATE_BUYER"
export const UPDATE_PROMO = "UPDATE_PROMO"

const PAYMENT_OPTIONS = {
  NoPayment: "NoPayment",
  WithPayment: "WithPayment",
  PO: "PO"
}

export default function CreateOrderPage() {
  const [buyer, setBuyer] = useState<IBuyer>({})
  const [itemList, setItemList] = useState<IItemRequest[]>([])
  const [allocations, setAllocations] = useState<IAllocation>()
  const [promoCodes, setPromoCodes] = useState<IRegistrationPromo[]>([])
  const [cartModelFunctionality] = useState(new CartModelFunctionality(UPDATE_CART, UPDATE_BUYER, UPDATE_PROMO))
  const [orderRequestInProgress, setOrderRequestInProgress] = useState(false)
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(PAYMENT_OPTIONS.NoPayment)
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)

  useEffect(() => {
    if (!showPaymentOptions) setSelectedPaymentOption(PAYMENT_OPTIONS.NoPayment)
  }, [showPaymentOptions])

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
        {showPaymentOptions ? (
          <>
            <PaymentMethods
              cartModelFunctionality={cartModelFunctionality}
              requestComponentName="OrderWithPayment"
              buyer={buyer}
              itemList={itemList}
              allocations={allocations}
              promoCodes={promoCodes}
              setShowPaymentOptions={setShowPaymentOptions}
            />
          </>
        ) : (
          <>
            <Shop buyer={buyer} cartModelFunctionality={cartModelFunctionality} itemList={itemList} />
            <CartTable itemList={itemList} cartModelFunctionality={cartModelFunctionality} />
            {/* </>
        )}
        {!showPaymentOptions && (
          <> */}
            <Col span={3}>
              <PromoTable
                promos={promoCodes}
                cartModelFunctionality={cartModelFunctionality}
                disable={orderRequestInProgress || !(itemList.length && buyer.AccountID)}
              />
            </Col>

            <Row justify="end" gutter={4} style={{ marginBottom: "10px" }}>
              <Col>
                <Radio.Group
                  disabled={orderRequestInProgress || !(itemList.length && buyer.AccountID)}
                  style={{ padding: "5px 0px 0px 0px" }}
                  defaultValue={PAYMENT_OPTIONS.NoPayment}
                  options={[
                    { label: "Pay Later", value: PAYMENT_OPTIONS.NoPayment },
                    { label: "With Payment", value: PAYMENT_OPTIONS.WithPayment },
                    { label: "PO", value: PAYMENT_OPTIONS.PO }
                  ]}
                  onChange={(e) => {
                    setSelectedPaymentOption(e.target.value)
                  }}
                />
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                {selectedPaymentOption === PAYMENT_OPTIONS.NoPayment && (
                  <SubmitOrderButton
                    disabled={orderRequestInProgress || !(itemList.length && buyer.AccountID)}
                    orderRequestInProgress={orderRequestInProgress}
                    setOrderRequestInProgress={setOrderRequestInProgress}
                    cartModelFunctionality={cartModelFunctionality}
                    itemList={itemList}
                  />
                )}
                {selectedPaymentOption === PAYMENT_OPTIONS.WithPayment && (
                  <Button
                    disabled={orderRequestInProgress || !(itemList.length && buyer.AccountID)}
                    type="primary"
                    onClick={() => setShowPaymentOptions(true)}
                  >
                    Show Payment Options
                  </Button>
                )}
                {selectedPaymentOption === PAYMENT_OPTIONS.PO && <Button type="primary">Create PO</Button>}
              </Col>
            </Row>
          </>
        )}
      </div>
    </div>
  )
}

import React, { useEffect, useState } from "react"
import { Button, Checkbox, Col, Dropdown, Menu, Row } from "antd"
import { CartTable } from "~/Component/Feature/Order/CartTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { fakeCartData } from "~/Component/Feature/Order/Model/fakeCartData"
import { IAllocation, IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
import { SelectBuyer } from "~/Component/Feature/Order/SelectBuyer"
import { AddEnrollmentModal } from "~/Component/Feature/Order/Shop/AddEnrollmentModal"
import { AddMembershipModal } from "~/Component/Feature/Order/Shop/AddMembershipModal"
import { AddPackageModal } from "~/Component/Feature/Order/Shop/AddPackageModal"
import { AddProductModal } from "~/Component/Feature/Order/Shop/AddProductModal"
import { AddProgramApplicationModal } from "~/Component/Feature/Order/Shop/AddProgramApplicationModal"
import { AddSectionModal } from "~/Component/Feature/Order/Shop/AddSectionModal"
import { eventBus } from "~/utils/EventBus"
import { DownOutlined } from "@ant-design/icons"
import { PromoTable } from "~/Component/Feature/Order/PromoTable"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { querystringToObject } from "~/utils/QueryStringToObjectConverter"
import { SubmitOrderButton } from "~/Component/Feature/Order/SubmitOrderButton"
import { PaymentMethods } from "~/Component/Feature/Order/Payment/PaymentMethods"

export const UPDATE_CART = "UPDATE_CART"
export const UPDATE_BUYER = "UPDATE_BUYER"
export const UPDATE_PROMO = "UPDATE_PROMO"

export default function CreateOrderPage() {
  const [buyer, setBuyer] = useState<IBuyer>({})
  const [itemList, setItemList] = useState<IItemRequest[]>([])
  const [allocations, setAllocations] = useState<IAllocation>()
  const [promoCodes, setPromoCodes] = useState<IRegistrationPromo[]>([])
  const [cartModelFunctionality] = useState(new CartModelFunctionality(UPDATE_CART, UPDATE_BUYER, UPDATE_PROMO))
  const [orderRequestInProgress, setOrderRequestInProgress] = useState(false)
  const [launchWithPayment, setLaunchWithPayment] = useState(false)

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
        <Row justify="end" gutter={4}>
          <Col>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <AddSectionModal
                      sectionAddType="buy"
                      buyer={buyer}
                      itemList={itemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddSectionModal
                        sectionAddType="me"
                        buyer={buyer}
                        itemList={itemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddSectionModal
                        sectionAddType="others"
                        buyer={buyer}
                        itemList={itemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                </Menu>
              }
            >
              <Button>
                Registration <DownOutlined />
              </Button>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <AddProgramApplicationModal
                      sectionAddType="buy"
                      buyer={buyer}
                      itemList={itemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddProgramApplicationModal
                        sectionAddType="me"
                        buyer={buyer}
                        itemList={itemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddProgramApplicationModal
                        sectionAddType="others"
                        buyer={buyer}
                        itemList={itemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                </Menu>
              }
            >
              <Button>
                Program Apllication <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <AddEnrollmentModal
                      sectionAddType="buy"
                      buyer={buyer}
                      itemList={itemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddEnrollmentModal
                        sectionAddType="me"
                        buyer={buyer}
                        itemList={itemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddEnrollmentModal
                        sectionAddType="others"
                        buyer={buyer}
                        itemList={itemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                </Menu>
              }
            >
              <Button>
                Program Enrollment <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <AddProductModal
                      buyer={buyer}
                      itemList={itemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <AddPackageModal
                      buyer={buyer}
                      itemList={itemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <AddMembershipModal
                      buyer={buyer}
                      itemList={itemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                </Menu>
              }
            >
              <Button>
                Others <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CartTable itemList={itemList} cartModelFunctionality={cartModelFunctionality} />
          </Col>
        </Row>
        <Row justify="end" gutter={4}>
          <Col>
            <PromoTable
              promos={promoCodes}
              cartModelFunctionality={cartModelFunctionality}
              disable={orderRequestInProgress}
            />
          </Col>
          {launchWithPayment && (
            <Col span={24}>
              <PaymentMethods
                requestComponentName="OrderWithPayment"
                buyer={buyer}
                itemList={itemList}
                allocations={allocations}
                promoCodes={promoCodes}
              />
            </Col>
          )}
          <Col>
            <Checkbox
              disabled={!(itemList.length && buyer.AccountID)}
              style={{ padding: "5px 0px 0px 0px" }}
              checked={launchWithPayment}
              onChange={(e) => {
                setLaunchWithPayment(!!e.target.checked)
              }}
            >
              With Payment
            </Checkbox>
          </Col>
          <Col>
            <SubmitOrderButton
              disabled={!(itemList.length && buyer.AccountID)}
              orderRequestInProgress={orderRequestInProgress}
              setOrderRequestInProgress={setOrderRequestInProgress}
              cartModelFunctionality={cartModelFunctionality}
              itemList={itemList}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

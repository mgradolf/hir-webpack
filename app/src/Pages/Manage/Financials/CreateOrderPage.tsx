import { Button, Col, Dropdown, Menu, message, Row } from "antd"
import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { CartTable } from "~/Component/Feature/Order/CartTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { fakeCartData } from "~/Component/Feature/Order/Model/fakeCartData"
import { IBuyer, IItemRequest, IRegistrationPromo } from "~/Component/Feature/Order/Model/Interface/IModel"
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

export const UPDATE_CART = "UPDATE_CART"
export const UPDATE_BUYER = "UPDATE_BUYER"
export const UPDATE_PROMO = "UPDATE_PROMO"

export default function CreateOrderPage() {
  const [buyer, setBuyer] = useState<IBuyer>({})
  const [ItemList, setItemList] = useState<IItemRequest[]>([])
  const [cartModelFunctionality] = useState(new CartModelFunctionality(UPDATE_CART, UPDATE_BUYER, UPDATE_PROMO))
  const [orderRequestInProgress, setOrderRequestInProgress] = useState(false)
  const [promoCodes, setPromoCodes] = useState<IRegistrationPromo[]>([])
  const [redirectTo, setRedirectTo] = useState("")

  useEffect(() => {
    setItemList(fakeCartData)
    eventBus.subscribe(UPDATE_CART, (ItemList: IItemRequest[]) => {
      setItemList(ItemList)
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
            {/* <SelectBuyer buyer={buyer} cartModelFunctionality={cartModelFunctionality} /> */}
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
                      itemList={ItemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddSectionModal
                        sectionAddType="me"
                        buyer={buyer}
                        itemList={ItemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddSectionModal
                        sectionAddType="others"
                        buyer={buyer}
                        itemList={ItemList}
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
                      itemList={ItemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddProgramApplicationModal
                        sectionAddType="me"
                        buyer={buyer}
                        itemList={ItemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddProgramApplicationModal
                        sectionAddType="others"
                        buyer={buyer}
                        itemList={ItemList}
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
                      itemList={ItemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddEnrollmentModal
                        sectionAddType="me"
                        buyer={buyer}
                        itemList={ItemList}
                        cartModelFunctionality={cartModelFunctionality}
                      />
                    </Menu.Item>
                  )}
                  {buyer.PersonID && (
                    <Menu.Item>
                      <AddEnrollmentModal
                        sectionAddType="others"
                        buyer={buyer}
                        itemList={ItemList}
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
                      itemList={ItemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <AddPackageModal
                      buyer={buyer}
                      itemList={ItemList}
                      cartModelFunctionality={cartModelFunctionality}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <AddMembershipModal
                      buyer={buyer}
                      itemList={ItemList}
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
            <CartTable itemList={ItemList} cartModelFunctionality={cartModelFunctionality} />
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
          <Col>
            {redirectTo && <Redirect to={redirectTo} />}
            <Button
              loading={orderRequestInProgress}
              type="primary"
              onClick={() => {
                let issueDoesNotExist = true
                ItemList.forEach((x) => {
                  issueDoesNotExist = issueDoesNotExist && cartModelFunctionality.findIssue(x)
                })
                if (!issueDoesNotExist) message.error("Please solve cart item issues first!")
                else {
                  setOrderRequestInProgress(true)
                  cartModelFunctionality.launchRegistrationRequest().then((response) => {
                    setOrderRequestInProgress(false)
                    if (response.success) {
                      setRedirectTo(`/request/${response.data.RequestID}`)
                    }
                  })
                }
              }}
            >
              Submit Order
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

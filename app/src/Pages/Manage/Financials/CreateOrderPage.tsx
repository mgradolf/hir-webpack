import { Col, Dropdown, Menu, Row } from "antd"
import React, { useEffect, useState } from "react"
import { CartTable } from "~/Component/Feature/Order/CartTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { fakeCartData } from "~/Component/Feature/Order/Model/fakeCartData"
import { IBuyer, IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { SelectBuyer } from "~/Component/Feature/Order/SelectBuyer"
import { AddEnrollmentModal } from "~/Component/Feature/Order/Shop/AddEnrollmentModal"
import { AddMembershipModal } from "~/Component/Feature/Order/Shop/AddMembershipModal"
import { AddPackageModal } from "~/Component/Feature/Order/Shop/AddPackageModal"
import { AddProductModal } from "~/Component/Feature/Order/Shop/AddProductModal"
import { AddProgramApplicationModal } from "~/Component/Feature/Order/Shop/AddProgramApplicationModal"
import { AddSectionModal } from "~/Component/Feature/Order/Shop/AddSectionModal"
import { eventBus } from "~/utils/EventBus"

export const UPDATE_CART = "UPDATE_CART"
export const UPDATE_BUYER = "UPDATE_BUYER"
export const UPDATE_CART_ITEM_BY_REQUESTID = "UPDATE_CART_ITEM_BY_REQUESTID"

export default function CreateOrderPage() {
  const [buyer, setBuyer] = useState<IBuyer>({})
  const [ItemList, setItemList] = useState<IItemRequest[]>([])
  const [cartModelFunctionality] = useState(new CartModelFunctionality())

  useEffect(() => {
    setItemList(fakeCartData)
    eventBus.subscribe(UPDATE_CART, (ItemList: IItemRequest[]) => {
      console.log("UPDATE_CART ", ItemList)
      setItemList(ItemList)
      eventBus.publish("REFRESH_CART_TABLE")
    })
    eventBus.subscribe(UPDATE_BUYER, (buyer: IBuyer) => {
      setBuyer(buyer)
      eventBus.publish("REFRESH_CART_TABLE")
    })
    return () => {
      eventBus.unsubscribe("UPDATE_CART")
    }
  }, [])
  return (
    <div className="site-layout-content">
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <button onClick={() => console.log(JSON.stringify(ItemList))}>click meh</button>
        <Row justify="center">
          <Col span={18}>
            <SelectBuyer defaultPersonID={14889} buyer={buyer} cartModelFunctionality={cartModelFunctionality} />
            {/* <SelectBuyer buyer={buyer} cartModelFunctionality={cartModelFunctionality} /> */}
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Dropdown.Button
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
              type="primary"
            >
              Add Items
            </Dropdown.Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <CartTable itemList={ItemList} cartModelFunctionality={cartModelFunctionality} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

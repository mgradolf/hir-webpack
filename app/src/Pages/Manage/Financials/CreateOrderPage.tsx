import { Col, Dropdown, Menu, Row } from "antd"
import React, { useEffect, useState } from "react"
import { CartTable } from "~/Component/Feature/Order/CartTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IBuyer, IItemRequest } from "~/Component/Feature/Order/Model/Interface/IModel"
import { SelectBuyer } from "~/Component/Feature/Order/SelectBuyer"
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
        <Row justify="center">
          <Col span={18}>
            <SelectBuyer buyer={buyer} cartModelFunctionality={cartModelFunctionality} />
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

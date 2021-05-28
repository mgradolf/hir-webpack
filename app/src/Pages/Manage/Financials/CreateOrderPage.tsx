import { Col, Dropdown, Menu, Row } from "antd"
import React, { useState } from "react"
import { CartTable } from "~/Component/Feature/Order/CartTable"
import { CartModel } from "~/Component/Feature/Order/Model/CartModel"
import { SelectBuyer } from "~/Component/Feature/Order/SelectBuyer"
import { AddSectionModal } from "~/Component/Feature/Order/Shop/AddSectionModal"

export default function CreateOrderPage() {
  const cartModel = new CartModel()
  const [cartModelState, setCartModelState] = useState<CartModel>(cartModel)

  return (
    <div className="site-layout-content">
      <div style={{ backgroundColor: "white", padding: "10px" }}>
        <Row justify="center">
          <Col span={18}>
            <SelectBuyer cartModelState={cartModelState} setCartModelState={setCartModelState} />
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Dropdown.Button
              overlay={
                <Menu>
                  <Menu.Item>
                    <AddSectionModal cartModel={cartModelState} setCartModelState={setCartModelState} />
                  </Menu.Item>
                  <Menu.Item></Menu.Item>
                  <Menu.Item></Menu.Item>
                </Menu>
              }
              type="primary"
            >
              Add Items
            </Dropdown.Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <CartTable cartModel={cartModelState} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

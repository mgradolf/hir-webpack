import { Button, Col, Dropdown, Menu, Row } from "antd"
import React from "react"
import { AddSectionModal } from "~/Component/Feature/Order/Shop/AddSectionModal"
import { DownOutlined } from "@ant-design/icons"
import { AddProgramApplicationModal } from "~/Component/Feature/Order/Shop/AddProgramApplicationModal"
import { AddEnrollmentModal } from "~/Component/Feature/Order/Shop/AddEnrollmentModal"
import { AddProductModal } from "~/Component/Feature/Order/Shop/AddProductModal"
import { AddPackageModal } from "~/Component/Feature/Order/Shop/AddPackageModal"
import { AddMembershipModal } from "~/Component/Feature/Order/Shop/AddMembershipModal"
import { IBuyer } from "~/Component/Feature/Order/Model/Interface/IModel"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import { IItemRequest } from "~/Component/Feature/Payment/Model/Interfaces"
type NewType = {
  buyer: IBuyer
  cartModelFunctionality: CartModelFunctionality
  itemList: IItemRequest[]
}

export const Shop = (props: NewType) => {
  return (
    <Row justify="end" gutter={4}>
      <Col>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <AddSectionModal
                  sectionAddType="buy"
                  buyer={props.buyer}
                  itemList={props.itemList}
                  cartModelFunctionality={props.cartModelFunctionality}
                />
              </Menu.Item>
              {props.buyer.PersonID && (
                <Menu.Item>
                  <AddSectionModal
                    sectionAddType="me"
                    buyer={props.buyer}
                    itemList={props.itemList}
                    cartModelFunctionality={props.cartModelFunctionality}
                  />
                </Menu.Item>
              )}
              {props.buyer.PersonID && (
                <Menu.Item>
                  <AddSectionModal
                    sectionAddType="others"
                    buyer={props.buyer}
                    itemList={props.itemList}
                    cartModelFunctionality={props.cartModelFunctionality}
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
                  buyer={props.buyer}
                  itemList={props.itemList}
                  cartModelFunctionality={props.cartModelFunctionality}
                />
              </Menu.Item>
              {props.buyer.PersonID && (
                <Menu.Item>
                  <AddProgramApplicationModal
                    sectionAddType="me"
                    buyer={props.buyer}
                    itemList={props.itemList}
                    cartModelFunctionality={props.cartModelFunctionality}
                  />
                </Menu.Item>
              )}
              {props.buyer.PersonID && (
                <Menu.Item>
                  <AddProgramApplicationModal
                    sectionAddType="others"
                    buyer={props.buyer}
                    itemList={props.itemList}
                    cartModelFunctionality={props.cartModelFunctionality}
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
                  buyer={props.buyer}
                  itemList={props.itemList}
                  cartModelFunctionality={props.cartModelFunctionality}
                />
              </Menu.Item>
              {props.buyer.PersonID && (
                <Menu.Item>
                  <AddEnrollmentModal
                    sectionAddType="me"
                    buyer={props.buyer}
                    itemList={props.itemList}
                    cartModelFunctionality={props.cartModelFunctionality}
                  />
                </Menu.Item>
              )}
              {props.buyer.PersonID && (
                <Menu.Item>
                  <AddEnrollmentModal
                    sectionAddType="others"
                    buyer={props.buyer}
                    itemList={props.itemList}
                    cartModelFunctionality={props.cartModelFunctionality}
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
                  buyer={props.buyer}
                  itemList={props.itemList}
                  cartModelFunctionality={props.cartModelFunctionality}
                />
              </Menu.Item>
              <Menu.Item>
                <AddPackageModal
                  buyer={props.buyer}
                  itemList={props.itemList}
                  cartModelFunctionality={props.cartModelFunctionality}
                />
              </Menu.Item>
              <Menu.Item>
                <AddMembershipModal
                  buyer={props.buyer}
                  itemList={props.itemList}
                  cartModelFunctionality={props.cartModelFunctionality}
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
  )
}

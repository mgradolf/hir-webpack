import React from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { CartModelFunctionality } from "~/Component/Feature/Order/Model/CartModelFunctionality"
import {
  IItemRequest,
  IMembershipRequest,
  IProgramApplicationRequest,
  IProgramEnrollmentRequest,
  IRegistrationRequest
} from "~/Component/Feature/Order/Model/Interface/IModel"
import { RegistrationCartItemDetailsModal } from "~/Component/Feature/Order/Registration/RegistrationCartItemDetailsModal"
import { ProgramApplicationCartItemDetailsModal } from "~/Component/Feature/Order/ProgramApplication/ProgramApplicationCartItemDetailsModal"
import { ProgramEnrollmentCartItemDetailsModal } from "./ProgramEnrollment/ProgramEnrollmentCartItemDetailsModal"
import { Link } from "react-router-dom"
import { MembershipCartItemDetailsModal } from "./Membership/MembershipCartItemDetailsModal"
import { Col, Row } from "antd"

export const CartTable = (props: { itemList: IItemRequest[]; cartModelFunctionality: CartModelFunctionality }) => {
  return (
    <>
      <ResponsiveTable
        rowKey="RequestID"
        columns={[
          {
            title: "Name",
            dataIndex: "ItemName",
            render: (text, record) => {
              switch (record.ItemType) {
                case "RegistrationRequest":
                  return (
                    <RegistrationCartItemDetailsModal
                      cartModelFunctionality={props.cartModelFunctionality}
                      itemList={props.itemList}
                      item={record as IRegistrationRequest}
                    />
                  )
                case "ProgramApplicationRequest":
                  return (
                    <ProgramApplicationCartItemDetailsModal
                      cartModelFunctionality={props.cartModelFunctionality}
                      itemList={props.itemList}
                      item={record as IProgramApplicationRequest}
                    />
                  )
                case "ProgramEnrollmentRequest":
                  return (
                    <ProgramEnrollmentCartItemDetailsModal
                      cartModelFunctionality={props.cartModelFunctionality}
                      itemList={props.itemList}
                      item={record as IProgramEnrollmentRequest}
                    />
                  )
                case "ProductRequest":
                  return (
                    <Link to={`/product/${record.ProductID}`} target="_blank">
                      {record.ItemName}
                    </Link>
                  )
                case "MembershipRequest":
                  return (
                    <MembershipCartItemDetailsModal
                      cartModelFunctionality={props.cartModelFunctionality}
                      itemList={props.itemList}
                      item={record as IMembershipRequest}
                    />
                  )
              }
              return null
            }
          },
          { title: "Quantity", dataIndex: "ItemQuantity" },
          { title: "Unit Price", dataIndex: "UnitPrice" }
        ]}
        expandable={{
          expandedRowKeys: props.itemList
            .filter((x: any) => x.ItemType === "RegistrationRequest" && x.ItemList && x.ItemList.length)
            .map((x) => x.RequestID),
          expandedRowRender: (record) => (
            <Row>
              <Col span={4}></Col>
              <Col span={20}>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.ItemList.map((x: any) => (
                      <tr>
                        <td>{x.ItemName}</td>
                        <td>{x.ItemQuantity}</td>
                        <td>{x.UnitPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          ),
          rowExpandable: (record) =>
            record.ItemType === "RegistrationRequest" && record.ItemList && record.ItemList.length
        }}
        dataSource={props.itemList}
      />
    </>
  )
}

import React, { useEffect, useState } from "react"
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
import { ProgramEnrollmentCartItemDetailsModal } from "~/Component/Feature/Order/ProgramEnrollment/ProgramEnrollmentCartItemDetailsModal"
import { Link } from "react-router-dom"
import { MembershipCartItemDetailsModal } from "~/Component/Feature/Order/Membership/MembershipCartItemDetailsModal"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"

export const CartTable = (props: { itemList: IItemRequest[]; cartModelFunctionality: CartModelFunctionality }) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  useEffect(() => {
    if (props.itemList.length) {
      setDataSource([
        ...props.itemList,
        {
          ItemName: "Total",
          ItemQuantity: "", //props.itemList.reduce((acc, curr) => acc + curr.ItemQuantity, 0),
          GrossPrice: props.itemList.reduce((acc, curr) => acc + (curr && curr.GrossPrice ? curr.GrossPrice : 0), 0),
          Discount: props.itemList.reduce((acc, curr) => acc + (curr && curr.Discount ? curr.Discount : 0), 0),
          NetPrice: props.itemList.reduce((acc, curr) => acc + (curr && curr.NetPrice ? curr.NetPrice : 0), 0)
        }
      ])
    } else setDataSource([])
  }, [props.itemList])
  return (
    <>
      <ResponsiveTable
        rowKey="RequestID"
        hidePagination={true}
        disableSorting={true}
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
              return text
            }
          },
          { title: "Qty", dataIndex: "ItemQuantity" },
          {
            title: "Gross Price",
            dataIndex: "GrossPrice"
          },
          {
            title: "Discount",
            dataIndex: "Discount"
          },
          {
            title: "Total Price",
            dataIndex: "NetPrice"
          },
          {
            title: "Action",
            render: (text, record) =>
              (record as IItemRequest).ItemType ? (
                <IconButton
                  iconType="remove"
                  toolTip="Remove Item"
                  onClickRemove={() => props.cartModelFunctionality.removeRegistrationRequest(record.RequestID)}
                />
              ) : (
                ""
              )
          }
        ]}
        expandable={{
          expandedRowKeys: props.itemList
            .filter((x: any) => x.ItemType === "RegistrationRequest" && x.ItemList && x.ItemList.length)
            .map((x) => x.RequestID),
          childrenColumnName: "ItemList",
          indentSize: 50,
          rowExpandable: (record) =>
            record.ItemType === "RegistrationRequest" && record.ItemList && record.ItemList.length
        }}
        dataSource={dataSource}
      />
    </>
  )
}

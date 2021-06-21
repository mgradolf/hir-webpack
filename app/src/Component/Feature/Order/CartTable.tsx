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
import { Button } from "antd"
import { PromoDetails } from "~/Component/Feature/Order/PromoDetails"

export const CartTable = (props: { itemList: IItemRequest[]; cartModelFunctionality: CartModelFunctionality }) => {
  const [dataSource, setDataSource] = useState<any[]>([])
  useEffect(() => {
    if (props.itemList.length) {
      const GrossPrice = props.itemList.reduce((acc, curr) => {
        if (curr.ItemType === "RegistrationRequest" && (curr as IRegistrationRequest).ItemList?.length) {
          return (
            acc +
            curr.ItemQuantity * curr.UnitPrice +
            (curr as IRegistrationRequest).ItemList?.reduce((a, c) => a + c.UnitPrice * c.ItemQuantity, 0)
          )
        }
        return acc + curr.ItemQuantity * curr.UnitPrice
      }, 0)

      setDataSource([
        ...props.itemList,
        {
          ItemName: "Total",
          ItemQuantity: "", //props.itemList.reduce((acc, curr) => acc + curr.ItemQuantity, 0),
          GrossPrice,
          Discount: 0,
          TotalPrice: GrossPrice
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
            dataIndex: "GrossPrice",
            render: (text, record) =>
              text ? text : (record as IRegistrationRequest).ItemQuantity * (record as IRegistrationRequest).UnitPrice
          },
          {
            title: "Discount",
            dataIndex: "Discount",
            render: (text, record) => {
              const item = record as IRegistrationRequest
              if (!item) {
                return props.itemList.reduce((acc, curr) => {
                  const item = curr as IRegistrationRequest
                  const amount = item.AvailablePromoCode ? item.AvailablePromoCode?.Amount : 0
                  return acc + amount
                }, 0)
              } else if (!item.AvailablePromoCode) {
                return "0"
              } else {
                if (item.AppliedPromoCode) {
                  return <PromoDetails item={item} cartModelFunctionality={props.cartModelFunctionality} />
                } else {
                  return (
                    <Button type="link" onClick={() => props.cartModelFunctionality.addRemovePromo(item, true)}>
                      Redeem Discount
                    </Button>
                  )
                }
              }
            }
          },
          {
            title: "Total Price",
            dataIndex: "TotalPrice",
            render: (text, record) =>
              text ? text : (record as IRegistrationRequest).ItemQuantity * (record as IRegistrationRequest).UnitPrice
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

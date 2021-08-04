import React from "react"
import { Link } from "react-router-dom"
import { findPurchaseOrders } from "~/ApiServices/Service/POService"
import { renderBoolean, renderDate, TableColumnType, renderAmount } from "~/Component/Common/ResponsiveTable"
import { PurchaseOrderFormOpenButton } from "~/Component/Feature/PurchaseOrder/Forms/PurchaseOrderForm"
import { PurchaseOrderReceiveFormOpenButton } from "~/Component/Feature/PurchaseOrder/Forms/PurchaseOrderReceiveForm"
import { PurchaseOrderRemoveLink } from "~/Component/Feature/PurchaseOrder/PurchaseOrderRemoveLink"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOrderPurchasedTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Order ID",
      dataIndex: "OrderID",
      render: (text: any, record: any) =>
        isModal ? (
          text
        ) : SectionID ? (
          <Link to={`/section/${SectionID}/order/${record.OrderID}`}>{text}</Link>
        ) : (
          <Link to={`/order/${record.OrderID}`}>{text}</Link>
        )
    },
    { title: "PO Number", dataIndex: "PurchaseOrderDescriptor" },
    {
      title: "Payment Due Date",
      dataIndex: "PaymentDueDate",
      render: renderDate
    },
    { title: "Issuing Organization", dataIndex: "AccountName" },
    { title: "Contact Person", dataIndex: "ContactPerson" },
    {
      title: "Amount",
      dataIndex: "POAmount",
      align: "right",
      render: renderAmount
    },
    { title: "Payment Received", dataIndex: "IsPaymentReceived", render: renderBoolean },
    { title: "Phone Number", dataIndex: "Telephone" },
    { title: "Description", dataIndex: "Description" },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <>
          <PurchaseOrderFormOpenButton editMode={true} iconType="edit" initialValues={record} />
          <PurchaseOrderReceiveFormOpenButton
            helpKey="financialsOrderPurchaseOrdersReceivePurchaseOrderForm"
            initialValues={record}
          />
          <PurchaseOrderRemoveLink PurchaseOrderID={record.PurchaseOrderID} />
        </>
      )
    }
  ]

  return { columns, searchFunc: findPurchaseOrders, tableName: "OrderPurchasedTableColumns" }
}

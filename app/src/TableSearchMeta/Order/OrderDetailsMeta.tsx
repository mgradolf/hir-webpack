import React from "react"
import { Link } from "react-router-dom"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"

import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate, renderDecimal, renderEmail } from "~/Component/Common/ResponsiveTable"
import { getOrderItemTableColumns } from "~/TableSearchMeta/OrderItem/OrderItemsTableColumns"
import { getOrderLinesTableColumns } from "~/TableSearchMeta/OrderLine/OrderLinesTableColumns"
import { getOrderCreditsTableColumns } from "~/TableSearchMeta/OrderCredits/OrderCreditsTableColumns"
import { getOrderReturnTableColumns } from "~/TableSearchMeta/OrderReturn/OrderReturnTableColumns"
import { getRegistrationTableColumns } from "~/TableSearchMeta/Registration/RegistrationTableColumns"
import { getMarketingCodeResponseTableColumns } from "~/TableSearchMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"
import { getOrderPurchasedTableColumns } from "~/TableSearchMeta/OrderPurchased/OrderPurchasedTableColumns"
import { getPaymentTableColumns } from "~/TableSearchMeta/Payment/PaymentTableColumns"
import { getActivityOrderSearchTableColumns } from "~/TableSearchMeta/ActivityOrder/ActivityOrderSearchTableColumns"
import { REFRESH_ORDER_ACTIVITY_PAGE, REFRESH_ORDER_CREDIT_ACTIVITY_PAGE } from "~/utils/EventBus"
import { getActivityOrderCreditSearchTableColumns } from "~/TableSearchMeta/ActivityOrderCredit/ActivityOrderCreditSearchTableColumns"
import { OrderEmailFormOpenButton } from "~/Component/Feature/Order/Forms/OrderEmailForm"
import { OrderReceiptLink } from "~/Component/Feature/Order/OrderReceiptLink"
import { OrderPaymentDueDateFormOpenButton } from "~/Component/Feature/Order/Forms/PaymentDueDateForm"
import { PurchaseOrderFormOpenButton } from "~/Component/Feature/PurchaseOrder/Forms/PurchaseOrderForm"
import { OrderTransactionLink } from "~/Component/Feature/Order/OrderTransactionLink"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: `Order Info`,
    cardActions: [
      <OrderPaymentDueDateFormOpenButton initialValues={order} />,
      <OrderEmailFormOpenButton initialValues={order} />,
      <OrderReceiptLink OrderID={order.OrderID} />,
      <OrderTransactionLink OrderID={order.OrderID} />
    ],
    contents: [
      { label: "Order Created On", value: renderDate(order.OrderDate) },
      { label: "Status", value: order.OrderStatus },
      { label: "Completed On", value: renderDate(order.CompletedDate) },
      { label: "Source", value: order.Source },
      { label: "Total Items", value: order.TotalItems },
      { label: "Total Order Amount", value: order.TotalAmount, render: renderDecimal },
      { label: "Credits/Discounts", value: order.CreditAmount, render: renderDecimal },
      { label: "Cash Credit", value: order.RefundAmount, render: renderDecimal },
      { label: "Payment Due Date", value: order.PaymentDueDate, render: renderDate },
      { label: "Total Amount Due", value: order.Balance, render: renderDecimal },
      { label: "Discount", value: order.DiscountAmount, render: renderDecimal },
      { label: "Amount Paid", value: order.AmountPaid, render: renderDecimal },
      { label: "Extended Amount", value: order.ExtendedAmount, render: renderDecimal },
      { label: "PO", value: order.HasPO }
    ]
  }

  const billingIngo: CardContainer = {
    title: `Billing Information`,
    contents: [
      {
        label: "Account Name",
        value: { name: order.AccountName, id: order.AccountID },
        render: (record) => <Link to={`/account/${record.id}`}>{record.name}</Link>
      },
      {
        label: "Name",
        value: order?.Person,
        render: (record) => <Link to={`/person/${record?.PersonID}`}>{record?.PersonDescriptor}</Link>
      },
      { label: "Business Name", value: order.BusinessName },
      {
        label: "Emails",
        value: order?.Emails,
        render: (value) => (value && value.length > 0 ? renderEmail(value[0]) : "")
      },
      {
        label: "Telephones",
        value: order?.Telephones,
        render: (Telephones: string[]) => (
          <ul>
            {Telephones?.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        )
      },
      { label: "Business Name", value: order.BusinessName },
      { label: "Address", value: order.BillToAddress },
      { label: "Address1", value: order.BillToAddress1 },
      { label: "Address2", value: order.BillToAddress2 },
      { label: "Address3", value: order.BillToAddress3 },
      { label: "City", value: order.BillToCity },
      { label: "State", value: order.BillToRegion },
      { label: "Zip Code", value: order.BillToPostalCode },
      { label: "Country", value: order.BillToCountry }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary, billingIngo]
  }

  const orderItemsMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getOrderItemTableColumns(false),
      searchParams: { OrderID: order.OrderID },
      pagination: false,
      refreshEventName: "REFRESH_ORDER_ITEMS_TAB"
    }
  }

  const orderLinesMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getOrderLinesTableColumns(false),
      searchParams: { OrderID: order.OrderID },
      pagination: false,
      refreshEventName: "REFRESH_ORDER_LINES_TAB"
    }
  }

  const orderCreditsMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getOrderCreditsTableColumns(false),
      searchParams: { OrderID: order.OrderID },
      pagination: false,
      refreshEventName: "REFRESH_ORDER_CREDITS_TAB"
    }
  }

  const orderPaymentsMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getPaymentTableColumns(false),
      searchParams: { OrderID: order.OrderID },
      pagination: false,
      refreshEventName: "REFRESH_ORDER_PAYMENTS_TAB"
    }
  }

  const orderReturnsMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getOrderReturnTableColumns(false),
      searchParams: { OrderID: order.OrderID },
      pagination: false,
      refreshEventName: "REFRESH_ORDER_RETURNS_TAB"
    }
  }

  const orderRegistrationsMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRegistrationTableColumns(false),
      searchParams: { OrderID: order.OrderID },
      pagination: false,
      refreshEventName: "REFRESH_ORDER_REGISTRATIONS_TAB"
    }
  }

  const orderMarketingCodeMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getMarketingCodeResponseTableColumns(false),
      searchParams: { OrderID: order.OrderID },
      pagination: false,
      refreshEventName: "REFRESH_ORDER_MARKETING_CODE_TAB"
    }
  }

  const orderPurchasedCodeMeta: IDetailsTableTabProp = {
    blocks: [<PurchaseOrderFormOpenButton editMode={false} initialValues={order} iconType="create" />],
    tableProps: {
      ...getOrderPurchasedTableColumns(false),
      searchParams: { OrderID: order.OrderID },
      pagination: false,
      refreshEventName: "REFRESH_ORDER_PURCHASED_TAB"
    }
  }

  return {
    pageTitle: `Order ID - ${order.OrderID}`,
    tabs: [
      { tabTitle: "Summary", tabType: "summary", tabMeta: summaryMeta },
      { tabTitle: "Items", tabType: "table", tabMeta: orderItemsMeta },
      { tabTitle: "Charges", tabType: "table", tabMeta: orderLinesMeta },
      { tabTitle: "Credits", tabType: "table", tabMeta: orderCreditsMeta },
      { tabTitle: "Payments", tabType: "table", tabMeta: orderPaymentsMeta },
      { tabTitle: "Returns", tabType: "table", tabMeta: orderReturnsMeta },
      { tabTitle: "Purchase Orders", tabType: "table", tabMeta: orderPurchasedCodeMeta },
      { tabTitle: "Registrations", tabType: "table", tabMeta: orderRegistrationsMeta },
      { tabTitle: "Marketing Responses", tabType: "table", tabMeta: orderMarketingCodeMeta },
      {
        tabTitle: "Logs",
        tabType: "table",
        // tabMeta: [],
        multipleTabMetas: [
          {
            tabTitle: "Orders",
            tabType: "table",
            tabMeta: {
              tableProps: {
                pagination: false,
                ...getActivityOrderSearchTableColumns(),
                searchParams: { OrderID: order.OrderID },
                refreshEventName: REFRESH_ORDER_ACTIVITY_PAGE
              }
            }
          },
          {
            tabTitle: "Credits",
            tabType: "table",
            tabMeta: {
              tableProps: {
                pagination: false,
                ...getActivityOrderCreditSearchTableColumns(),
                searchParams: { OrderID: order.OrderID },
                refreshEventName: REFRESH_ORDER_CREDIT_ACTIVITY_PAGE
              }
            }
          }
        ]
      }
    ]
  }
}

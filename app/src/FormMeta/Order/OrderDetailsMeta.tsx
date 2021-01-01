import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import { getOrderItemTableColumns } from "~/FormMeta/OrderItem/OrderItemsTableColumns"
import { getOrderLinesTableColumns } from "~/FormMeta/OrderLine/OrderLinesTableColumns"
import { getOrderCreditsTableColumns } from "~/FormMeta/OrderCredits/OrderCreditsTableColumns"
import { getOrderReturnTableColumns } from "~/FormMeta/OrderReturn/OrderReturnTableColumns"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getMarketingCodeResponseTableColumns } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"
import { getOrderPurchasedTableColumns } from "~/FormMeta/OrderPurchased/OrderPurchasedTableColumns"
import { getPaymentTableColumns } from "~/FormMeta/Payment/PaymentTableColumns"
import { getActivityOrderSearchTableColumns } from "~/FormMeta/ActivityOrder/ActivityOrderSearchTableColumns"
import { REFRESH_ORDER_ACTIVITY_PAGE } from "~/utils/EventBus"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: `Order Info`,
    contents: [
      { label: "Order Created On", value: renderDate(order.OrderDate) },
      { label: "Status", value: order.OrderStatus },
      { label: "Completed On", value: renderDate(order.CompletedDate) },
      { label: "Source", value: order.Source },
      { label: "Total Items", value: order.TotalItems },
      { label: "Total Order Amount", value: order.TotalAmount },
      { label: "Credits/Discounts", value: order.CreditAmount },
      { label: "Cash Credit", value: order.RefundAmount },
      { label: "Payment Due Date", value: order.PaymentDueDate, render: renderDate },
      { label: "Total Amount Due", value: order.Balance },
      { label: "Discount", value: order.DiscountAmount },
      { label: "Amount Paid", value: order.AmountPaid },
      { label: "Extended Amount", value: order.ExtendedAmount },
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
        render: (emails: string[]) => (
          <ul>
            {emails?.map((x, i) => (
              <li key={i}>{renderEmail(x)}</li>
            ))}
          </ul>
        )
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
      { label: "Zip Code", value: order.BillToPostalCode },
      { label: "State", value: order.BillToRegions },
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
      // { tabTitle: "Credits", tabType: "table", tabMeta: orderCreditsMeta },
      { tabTitle: "Payments", tabType: "table", tabMeta: orderPaymentsMeta },
      { tabTitle: "Returns", tabType: "table", tabMeta: orderReturnsMeta },
      { tabTitle: "Registrations", tabType: "table", tabMeta: orderRegistrationsMeta },
      { tabTitle: "Marketing Responses", tabType: "table", tabMeta: orderMarketingCodeMeta },
      { tabTitle: "Purchase Order", tabType: "table", tabMeta: orderPurchasedCodeMeta },
      {
        tabTitle: "Logs",
        tabType: "table",
        tabMeta: [],
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
            tabMeta: orderCreditsMeta
          }
        ]
      }
    ]
  }
}

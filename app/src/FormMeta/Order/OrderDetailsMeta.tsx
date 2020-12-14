import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getOrderItemTableColumns } from "~/FormMeta/OrderItem/OrderItemsTableColumns"
import { getOrderLinesTableColumns } from "~/FormMeta/OrderLine/OrderLinesTableColumns"
import { getOrderCreditsTableColumns } from "~/FormMeta/OrderCredits/OrderCreditsTableColumns"
import { getOrderPaymentTableColumns } from "~/FormMeta/OrderPayment/OrderPaymentTableColumns"
import { getOrderReturnTableColumns } from "~/FormMeta/OrderReturn/OrderReturnTableColumns"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getMarketingCodeResponseTableColumns } from "~/FormMeta/MarketingCodeResponse/MarketingCodeResponseTableColumns"
import { getOrderPurchasedTableColumns } from "~/FormMeta/OrderPurchased/OrderPurchasedTableColumns"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta[] => {
  const summary: CardContainer = {
    title: `Order Info`,
    contents: [
      { label: "Order Created On", value: renderDate(order.OrderDate) },
      { label: "Status", value: order.OrderStatus },
      { label: "Completed On", value: renderDate(order.CompletedDate) },
      { label: "Source", value: order.Source }
    ]
  }

  const billingIngo: CardContainer = {
    title: `Billing Info`,
    contents: [
      { label: "Name", value: order.PersonName },
      {
        label: "Account Name",
        value: { name: order.AccountName, id: order.AccountID },
        render: (record) => <Link to={`/account/${record.id}`}>{record.name}</Link>
      },
      { label: "Business Name", value: order.BusinessName },
      { label: "Address", value: order.BillToAddress },
      { label: "Address1", value: order.BillToAddress1 },
      { label: "Address2", value: order.BillToAddress2 },
      { label: "Address3", value: order.BillToAddress3 },
      { label: "City", value: order.BillToCity },
      { label: "Country", value: order.BillToCountry },
      { label: "Regions", value: order.BillToRegions }
    ]
  }

  const financial: CardContainer = {
    title: `Financials`,
    contents: [
      { label: "Total Items", value: order.TotalItems },
      { label: "Total Order Amount", value: order.TotalAmount },
      { label: "Credit Amount", value: order.CreditAmount },
      { label: "Discount", value: order.DiscountAmount },
      { label: "Amount Paid", value: order.AmountPaid },
      { label: "Refund Amount", value: order.RefundAmount },
      { label: "Balance", value: order.Balance },
      { label: "Extended", value: order.ExtendedAmount },
      { label: "HasPO", value: order.HasPO },
      { label: "Payment Due Date", value: order.PaymentDueDate, render: renderDate }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [{ groupedContents: [summary, billingIngo] }, financial]
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
      ...getOrderPaymentTableColumns(false),
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

  return [
    { title: "Summary", type: "summary", meta: summaryMeta },
    { title: "Order Items", type: "table", meta: orderItemsMeta },
    { title: "Order Lines", type: "table", meta: orderLinesMeta },
    { title: "Order Credits", type: "table", meta: orderCreditsMeta },
    { title: "Payments", type: "table", meta: orderPaymentsMeta },
    { title: "Returns", type: "table", meta: orderReturnsMeta },
    { title: "Registrations", type: "table", meta: orderRegistrationsMeta },
    { title: "Marketing Code", type: "table", meta: orderMarketingCodeMeta },
    { title: "Purchase Order", type: "table", meta: orderPurchasedCodeMeta }
  ]
}

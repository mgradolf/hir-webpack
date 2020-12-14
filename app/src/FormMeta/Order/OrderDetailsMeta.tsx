// import React from "react"
// import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getAccountAffiliationTableColumn } from "~/FormMeta/AccountAffiliation/getAccountAffiliationTableColumn"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta[] => {
  const summary: CardContainer = {
    title: `Order ID - ${order.OrderID}`,
    contents: [
      { label: "Order Created On", value: renderDate(order.OrderDate) },
      { label: "Status", value: order.OrderStatus },
      { label: "Completed On", value: renderDate(order.CompletedDate) },
      { label: "Source", value: order.Source }
    ]
  }

  // const billingIngo: CardContainer = {
  //   contents: [
  //     { label: "Name", value: order.PersonName },
  //     {
  //       label: "Account Name",
  //       value: { name: order.AccountName, id: order.AccountID },
  //       render: (record) => <Link to={`/account/${record.id}`}>{record.name}</Link>
  //     },
  //     { label: "Business Name", value: order.BusinessName },
  //     { label: "Address", value: order.BillToAddress },
  //     { label: "Address1", value: order.BillToAddress1 },
  //     { label: "Address2", value: order.BillToAddress2 },
  //     { label: "Address3", value: order.BillToAddress3 },
  //     { label: "City", value: order.BillToCity },
  //     { label: "Country", value: order.BillToCountry },
  //     { label: "Regions", value: order.BillToRegions }
  //   ]
  // }

  // const financial: CardContainer = {
  //   contents: [
  //     { label: "Total Items", value: order.TotalItems },
  //     { label: "Total Order Amount", value: order.TotalAmount },
  //     { label: "Credit Amount", value: order.CreditAmount },
  //     { label: "Discount", value: order.DiscountAmount },
  //     { label: "Amount Paid", value: order.AmountPaid },
  //     { label: "Refund Amount", value: order.RefundAmount },
  //     { label: "Balance", value: order.Balance },
  //     { label: "Extended", value: order.ExtendedAmount },
  //     { label: "HasPO", value: order.HasPO },
  //     { label: "Payment Due Date", value: order.PaymentDueDate, render: renderDate }
  //   ]
  // }

  const summaryMeta: IDetailsSummary = {
    summary: [summary]
  }

  const contactsMeta: IDetailsTableTabProp = {
    title: "Contacts",
    tableProps: {
      ...getAccountAffiliationTableColumn(),
      searchParams: { AccountID: order.AccountID }
    }
  }

  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Contacts",
      type: "table",
      meta: contactsMeta
    }
  ]
}

import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { renderDate } from "~/Component/Common/ResponsiveTable"

export const getMarketingCodeResponseDetailsMeta = (response: { [key: string]: any }): CardContainer[] => {
  const MarketingCodeInfo: CardContainer = {
    title: response.MarketingCode,
    contents: [
      {
        label: "Marketing Code",
        value: response.MarketingCode,
        render: (text) => (
          <Link to={`/marketing-codes/repository/${response.MarketingCodeID}`}>{response.MarketingCode}</Link>
        )
      },
      { label: "Marketing Code Description", value: response.Description },
      { label: "Category", value: response.CategoryName },
      {
        label: "Order ID",
        value: response.OrderID,
        render: (text) => <Link to={`/order/${response.OrderID}`}>{response.OrderID}</Link>
      },
      { label: "Order Date", value: response.OrderDate, render: renderDate },
      {
        label: "Purchaser Name",
        value: response.PurchaserName,
        render: (text) => <Link to={`/person/${response.PersonID}`}>{response.PurchaserName}</Link>
      },
      { label: "Item Description", value: response.ItemDescription },
      {
        label: "Account Name",
        value: response.AccountName,
        render: (text) => <Link to={`/account/${response.AccountID}`}>{response.AccountName}</Link>
      },
      { label: "Net Payment Amount", value: response.Amount }
    ]
  }

  return [MarketingCodeInfo]
}

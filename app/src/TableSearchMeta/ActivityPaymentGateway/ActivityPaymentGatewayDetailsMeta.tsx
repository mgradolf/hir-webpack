import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderDate, renderDateTime } from "~/Component/Common/ResponsiveTable"

export const getActivityPaymentGatewayDetailsMeta = (activity: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Activity Time", value: activity.RequestDate, render: renderDateTime },
      { label: "Activity State", value: activity.ActivityState },
      { label: "Request State", value: activity.RequestState },
      { label: "Request Amount", value: activity.RequestAmount },
      { label: "Response Time", value: activity.State, render: renderDateTime },
      { label: "Transaction Number", value: activity.TransactionNo },
      { label: "Transaction Date", value: activity.TransactionDate, render: renderDate },
      { label: "Transaction Status", value: activity.TransactionStatus },
      { label: "Auth Code", value: activity.AuthorizationCode },
      { label: "Payment Type", value: activity.PaymentType },
      { label: "CC Type", value: activity.CreditCardType },
      { label: "Billing Name", value: activity.BillingName },
      { label: "Billing Street", value: activity.BillingStreet },
      { label: "Billing City", value: activity.BillingCity },
      { label: "Billing State", value: activity.BillingState },
      { label: "Billing Country", value: activity.BillingCountry },
      { label: "Billing Post Code", value: activity.BillingPostalCode },
      { label: "Billing Email", value: activity.BillingEmail },
      { label: "Gateway Account", value: activity.GatewayAccount }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  meta.push({
    tabTitle: "Data Logs",
    tabType: "summary",
    tabMeta: {
      summary: [
        {
          contents: [
            { label: "Request Log", value: JSON.stringify(activity.RequestData) },
            { label: "Response Log", value: JSON.stringify(activity.RawResponseData) }
          ]
        }
      ]
    }
  })

  return {
    pageTitle: `Activity ID - ${activity.PaymentGatewayAccountID}`,
    tabs: meta
  }
}

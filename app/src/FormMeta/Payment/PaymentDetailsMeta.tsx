import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"

export const getPaymentDetailsMeta = (payment: { [key: string]: any }): CardContainer[] => {
  const paymentInfo: CardContainer = {
    title: `Payment ${payment.PaymentID} - ${payment.PaymentStatusName}`,
    contents: [
      { label: "Notes", value: payment.PaymentNotes, render: undefined }, // : null,
      { label: "Person Name", value: payment.PersonName, render: undefined }, // : "nakter 0428",
      { label: "Transaction", value: payment.TransactionNumber, render: undefined }, // : null,
      { label: "Check", value: payment.CheckNumber, render: undefined }, // : null,
      { label: "GLAccount Names", value: payment.GLAccountNames, render: undefined }, // : "10-0432-6135, 10-0432-7912, 10-3125-6137, 10-8102-6125, AR1000",
      { label: "Sub Total", value: payment.SubTotal, render: undefined }, // : 2443.00,
      { label: "Created", value: payment.CreateDate, render: renderDate }, // : "2017-09-11T05:48:24+06:00",
      { label: "Source", value: payment.Source, render: undefined }, // : "Retail",
      { label: "Completed", value: payment.CompletedDate, render: undefined }, // : null,
      { label: "Type", value: payment.Type, render: undefined }, // : "Primary",
      { label: "Partial", value: payment.IsPartial, render: renderBoolean }, // : false,
      { label: "Payment Accepted", value: payment.PaymentAcceptedName, render: undefined }, // : "Visa - External Payment",
      { label: "Total Amount", value: payment.TotalPaymentAmount, render: undefined }, // : 2443.0000,
      { label: "Account Name", value: payment.AccountName, render: undefined } // : "0428, nakter"
    ]
  }

  const IDs: CardContainer = {
    title: "ID",
    contents: [
      // { label: "Payment ID", value: payment.PaymentID, render: undefined }, // : 13727,
      { label: "Payment Relationship Type ID", value: payment.PaymentRelationshipTypeID, render: undefined }, // : 1,
      { label: "Reverse Payment ID", value: payment.ReversePaymentID, render: undefined }, // : null,
      { label: "Payment Parent ID", value: payment.PaymentParentID, render: undefined }, // : null,
      { label: "Deposit ID", value: payment.DepositID, render: undefined }, // : 17597,
      { label: "Payment Status Code", value: payment.PaymentStatusCode, render: undefined } // : 1,
    ]
  }

  return [paymentInfo, IDs]
}

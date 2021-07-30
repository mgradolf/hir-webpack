import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getRegistrationTableColumns } from "~/TableSearchMeta/Registration/RegistrationTableColumns"
import { getTransactionFinancialDepositeTrackingTableColumns } from "~/TableSearchMeta/TransactionFinancial/TransactionFinancialDepositeTrackingTableColumns"
import { getPaymentAllocationsTableColumns } from "~/TableSearchMeta/OrderItem/PaymentAllocationsTableColumns"
import { getPaymentActivityTableColumns } from "~/TableSearchMeta/PaymentActivity/PaymentActivityTableColumns"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

export const getPaymentDetailsMeta = (payment: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []

  const paymentInfo: CardContainer = {
    contents: [
      { label: "Payment Date", value: payment.CreateDate, render: renderDate },
      { label: "Payment Amount", value: payment.TotalPaymentAmount },
      { label: "Payment Type", value: payment.PaymentAcceptedName },
      { label: "Check/ Reference No", value: payment.TransactionNumber },
      { label: "Notes", value: payment.PaymentNotes },
      {
        label: "Payer",
        value: { PersonName: payment.PersonName, PersonID: payment.PersonID },
        render: (record: any) => <Link to={`/person/${record.PersonID}`}>{record.PersonName}</Link>
      },
      {
        label: "Account",
        value: { AccountName: payment.AccountName, AccountID: payment.AccountID },
        render: (record: any) => <Link to={`/account/${record.AccountID}`}>{record.AccountName}</Link>
      },
      { label: "Source", value: payment.Source }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      actions: [<HelpButton helpKey="financialsPaymentsSummaryTab" />],
      summary: [paymentInfo]
    }
  })

  meta.push({
    tabTitle: "Registrations",
    tabType: "table",
    tabMeta: {
      blocks: [<HelpButton helpKey="financialsPaymentsRegistrationsTab" />],
      tableProps: {
        ...getRegistrationTableColumns(false),
        searchParams: { PaymentID: payment.PaymentID },
        refreshEventName: "REFRESH_REGISTRATION_TAB"
      }
    }
  })

  meta.push({
    tabTitle: "Deposit Tracking",
    tabType: "table",
    tabMeta: {
      blocks: [<HelpButton helpKey="financialsPaymentsDepositTrackingTab" />],
      tableProps: {
        ...getTransactionFinancialDepositeTrackingTableColumns(),
        searchParams: { IsDepositeView: true, DepositID: payment.DepositID },
        refreshEventName: "REFRESH_DEPOSIT_TRACKING__TAB",
        pagination: false
      }
    }
  })

  meta.push({
    tabTitle: "Allocations",
    tabType: "table",
    tabMeta: {
      blocks: [<HelpButton helpKey="financialsPaymentsAllocationsTab" />],
      tableProps: {
        ...getPaymentAllocationsTableColumns(false),
        searchParams: { PaymentID: payment.PaymentID },
        refreshEventName: "REFRESH_ORDER_ITEMS_TAB"
      }
    }
  })

  meta.push({
    tabTitle: "Log",
    tabType: "table",
    tabMeta: {
      blocks: [<HelpButton helpKey="financialsPaymentsLogsTab" />],
      tableProps: {
        ...getPaymentActivityTableColumns(),
        searchParams: { PaymentID: payment.PaymentID },
        refreshEventName: "REFRESH_PAYMENT_LOG"
      }
    }
  })

  return {
    pageTitle: `Payment ID ${payment.PaymentID} - ${payment.PaymentStatusCodeName}`,
    tabs: meta
  }
}

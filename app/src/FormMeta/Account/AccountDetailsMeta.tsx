import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getAccountAffiliationTableColumn } from "~/FormMeta/AccountAffiliation/getAccountAffiliationTableColumn"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getCatalogTableColumns } from "~/FormMeta/Catalog/CatalogTableColumns"
import { getOrderTableColumns } from "~/FormMeta/Order/OrderTableColumns"
import { getOrderItemTableColumns } from "~/FormMeta/OrderItem/OrderItemsTableColumns"
import { getPackageTableColumns } from "~/FormMeta/Package/PackageTableColumns"
import { getPaymentTableColumns } from "~/FormMeta/Payment/PaymentTableColumns"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"
import { getTransactionFinancialTableColumns } from "~/FormMeta/TransactionFinancial/TransactionFinancialTableColumns"
import { getSeatgroupTableColumns } from "~/FormMeta/Seatgroup/SeatgroupTableColumns"
import { REFRESH_ACCOUNT_SEATGROUP_PAGE } from "~/utils/EventBus"

export const getAccountDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Account Type", value: account.AccountTypeName },
      {
        label: "Primary Contact",
        value: account.ContactName,
        render: (text) => <Link to={`/person/${account.PersonID}`}>{text}</Link>
      },
      { label: "Tax ID", value: account.TaxID },
      { label: "Public", value: account.IsPublic, render: renderBoolean },
      { label: "Allow to Pay Later", value: account.AllowPayLateDescription },
      { label: "Approval Required", value: account.IsApprovalRequired, render: renderBoolean },
      { label: "Default Waitlist Priority", value: account.DefaultWaitlistPriority || 5 },
      { label: "Payment Term", value: account.PaymentTerm }
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
    tabTitle: "Contacts",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getAccountAffiliationTableColumn(),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })
  meta.push({
    tabTitle: "Seat Groups",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getSeatgroupTableColumns(),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: REFRESH_ACCOUNT_SEATGROUP_PAGE
      }
    }
  })
  meta.push({
    tabTitle: "Registrations",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getRegistrationTableColumns(false),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_REGISTRATION_TAB"
      }
    }
  })
  meta.push({
    tabTitle: "Requests",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getRequestTableColumns(false),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_REQUEST_TAB"
      }
    }
  })
  meta.push({
    tabTitle: "Financials",
    tabType: "summary",
    tabMeta: undefined,
    multipleTabMetas: [
      {
        tabTitle: "Orders",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getOrderTableColumns(false),
            searchParams: { AccountID: account.AccountID },
            refreshEventName: "REFRESH_ORDERS_TAB"
          }
        }
      },
      {
        tabTitle: "Order Items",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getOrderItemTableColumns(false),
            searchParams: { OrganizationID: account.AccountID },
            refreshEventName: "REFRESH_ORDER_ITEMS_TAB"
          }
        }
      },
      {
        tabTitle: "Payments",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getPaymentTableColumns(false),
            searchParams: { AccountID: account.AccountID },
            refreshEventName: "REFRESH_PAYMENTS_TAB"
          }
        }
      },
      {
        tabTitle: "Transactions",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getTransactionFinancialTableColumns(false),
            searchParams: { AccountID: account.AccountID },
            refreshEventName: "REFRESH_TRANSACTION_TAB"
          }
        }
      }
    ]
  })
  meta.push({
    tabTitle: "Catalogs",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getCatalogTableColumns(false),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_CATALOGS_TAB"
      }
    }
  })
  meta.push({
    tabTitle: "Packages",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getPackageTableColumns(false),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_PACKAGES_TAB"
      }
    }
  })

  return {
    pageTitle: `Account Name - ${account.AccountName}`,
    tabs: meta
  }
}

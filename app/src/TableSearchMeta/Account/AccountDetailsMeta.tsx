import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getAccountAffiliationTableColumn } from "~/TableSearchMeta/AccountAffiliation/AccountAffiliationTableColumn"
import { getRegistrationTableColumns } from "~/TableSearchMeta/Registration/RegistrationTableColumns"
import { getCatalogTableColumns } from "~/TableSearchMeta/Catalog/CatalogTableColumns"
import { getOrderTableColumns } from "~/TableSearchMeta/Order/OrderTableColumns"
import { getOrderItemTableColumns } from "~/TableSearchMeta/OrderItem/OrderItemsTableColumns"
import { getPackageTableColumns } from "~/TableSearchMeta/Package/PackageTableColumns"
import { getPaymentTableColumns } from "~/TableSearchMeta/Payment/PaymentTableColumns"
import { getRequestTableColumns } from "~/TableSearchMeta/Request/RequestTableColumns"
import { getTransactionFinancialTableColumns } from "~/TableSearchMeta/TransactionFinancial/TransactionFinancialTableColumns"
import { getSeatgroupTableColumns } from "~/TableSearchMeta/Seatgroup/SeatgroupTableColumns"
import { REFRESH_ACCOUNT_SEATGROUP_PAGE, REFRESH_PAGE } from "~/utils/EventBus"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { AccountFormMeta } from "~/Component/Account/FormMeta/AccountFormMeta"
import { pushAccount } from "~/ApiServices/Service/AccountService"
import { AccountContactFormModalOpenButton } from "~/Component/Account/AccountContactFormModal"

export const getAccountDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle="Update Account"
        formMeta={AccountFormMeta}
        formSubmitApi={pushAccount}
        initialFormValue={{
          ...account,
          Name: account.AccountName,
          AllowToPayLater: account.AllowPayLateDescription,
          FEID: account.TaxID
        }}
        buttonLabel="Edit"
        defaultFormValue={{
          AccountID: account.AccountID,
          oca: account.oca
        }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
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
      blocks: [<AccountContactFormModalOpenButton accountData={account} />],
      tableProps: {
        pagination: false,
        ...getAccountAffiliationTableColumn(),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })
  account.AccountTypeID !== 1000 &&
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

  account.AccountTypeID !== 1000 &&
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

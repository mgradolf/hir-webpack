import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getAccountAffiliationTableColumn } from "~/FormMeta/AccountAffiliation/getAccountAffiliationTableColumn"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getCatalogTableColumns } from "~/FormMeta/Catalog/CatalogTableColumns"
import { getOrderTableColumns } from "~/FormMeta/Order/OrderTableColumns"
import { getOrderItemTableColumns } from "~/FormMeta/OrderItem/OrderItemsTableColumns"
import { getPackageTableColumns } from "~/FormMeta/Package/PackageTableColumns"
import { getPaymentTableColumns } from "~/FormMeta/Payment/PaymentTableColumns"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"

export const getAccountDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      // { label: "Account Name", value: account.AccountName },
      { label: "Account Type", value: account.AccountTypeName },
      { label: "Primary Contact", value: account.ContactName },
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
      title: "Contacts",
      tableProps: {
        ...getAccountAffiliationTableColumn(),
        searchParams: { AccountID: account.AccountID }
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
    tabTitle: "Orders",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getOrderTableColumns(false),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_ORDERS_TAB"
      }
    }
  })
  meta.push({
    tabTitle: "Order Items",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getOrderItemTableColumns(false),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_ORDER_ITEMS_TAB"
      }
    }
  })
  meta.push({
    tabTitle: "Payments",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getPaymentTableColumns(false),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_PAYMENTS_TAB"
      }
    }
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

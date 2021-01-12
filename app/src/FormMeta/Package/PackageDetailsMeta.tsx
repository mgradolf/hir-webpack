import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import {
  REFRESH_PACKAGE_FINANCIAL_PAGE,
  REFRESH_PACKAGE_ORDER_PAGE,
  REFRESH_PACKAGE_REGISTRATION_PAGE,
  REFRESH_PACKAGE_SEATGROUP_PAGE
} from "~/utils/EventBus"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getOrderItemTableColumns } from "~/FormMeta/OrderItem/OrderItemsTableColumns"
import { getProductFinancialsTableColumns } from "~/FormMeta/ProductFinancialsTableColumns/ProductFinancialsTableColumns"
import { getSeatgroupTableColumns } from "~/FormMeta/Seatgroup/SeatgroupTableColumns"

export const getPackageDetailsMeta = (Package: { [key: string]: any }): IDetailsMeta => {
  const summary: CardContainer = {
    title: "Basic Info",
    contents: [
      { label: "Description", value: Package.Description },
      { label: "Start Date", value: Package.StartDate, render: renderDate },
      { label: "End Date", value: Package.EndDate, render: renderDate },
      { label: "PO Number", value: Package.PONumber },
      { label: "PO Date", value: Package.PODate, render: renderDate },
      { label: "Credit Units", value: Package.AllowedCredit }
    ]
  }

  const billing: CardContainer = {
    title: "Billing",
    contents: [
      { label: "Purchased", value: Package.PurchaseAmount },
      { label: "Credit", value: Package.CreditAmount },
      { label: "Payment", value: Package.PaymentAmount },
      { label: "Refund", value: Package.RefundAmount },
      { label: "Balance", value: Package.Balance }
    ]
  }

  const unit: CardContainer = {
    title: "Units",
    contents: [
      { label: "Purchased", value: Package.PurchasedOpportunity },
      { label: "Used", value: Package.UsedOpportunity },
      { label: "Returned", value: Package.ReturnedOpportunity },
      { label: "Balance", value: Package.BalanceOpportunity }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summary, billing, unit]
  }

  const financialMeta: IDetailsTableTabProp = {
    tableProps: {
      pagination: false,
      ...getProductFinancialsTableColumns(),
      searchParams: { ProductID: Package.ProductID },
      refreshEventName: REFRESH_PACKAGE_FINANCIAL_PAGE
    }
  }

  const orderItemsMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getOrderItemTableColumns(false),
      searchParams: { ProductID: Package.ProductID },
      refreshEventName: REFRESH_PACKAGE_ORDER_PAGE
    }
  }

  const seatgroupMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getSeatgroupTableColumns(),
      searchParams: { PackageID: Package.PackageID },
      refreshEventName: REFRESH_PACKAGE_SEATGROUP_PAGE
    }
  }

  const registrationMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRegistrationTableColumns(),
      searchParams: { PackageID: Package.PackageID },
      refreshEventName: REFRESH_PACKAGE_REGISTRATION_PAGE
    }
  }

  return {
    pageTitle: `Package - ${Package.Name}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Financials",
        tabType: "table",
        tabMeta: financialMeta
      },
      {
        tabTitle: "Orders",
        tabType: "table",
        tabMeta: orderItemsMeta
      },
      {
        tabTitle: "Sections",
        tabType: "table",
        tabMeta: seatgroupMeta
      },
      {
        tabTitle: "Registrations",
        tabType: "table",
        tabMeta: registrationMeta
      }
    ]
  }
}

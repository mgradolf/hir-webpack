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
import { AccountFormMeta } from "~/Component/Feature/Account/FormMeta/AccountFormMeta"
import { pushAccount } from "~/ApiServices/Service/AccountService"
import { AccountContactFormOpenButton } from "~/Component/Feature/Account/Forms/AccountContactForm"
import { BulkOrderFormModalOpenButton } from "~/Component/Feature/Package/BulkOrderFormModal"
import { PackageFormMeta } from "~/Component/Feature/Package/FormMeta/PackageFormMeta"
import { savePackage } from "~/ApiServices/Service/PackageService"
import { IField } from "~/Component/Common/Form/common"
import AccountQuestionTab from "~/Component/Feature/Account/AccountQuestionTab"
import { AccountMergeFormModalOpenButton } from "~/Component/Feature/Account/Forms/AccountMergeFormModal"
import { AccountEmailSetupForm } from "~/Component/Feature/Account/Forms/AccountEmailSetupForm"
import { AccountRemoveLink } from "~/Component/Feature/Account/AccountRemoveLink"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { ACC_INDIVIDUAL } from "~/utils/Constants"

export const getAccountDetailsMeta = (account: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    cardActions: [
      <MetaDrivenFormModalOpenButton
        iconType="edit"
        formTitle="Update Account"
        formMeta={AccountFormMeta.map((x: IField) => {
          if (x.fieldName === "AccountTypeID") return { ...x, disabled: true }
          if (account.AccountTypeID === ACC_INDIVIDUAL && x.fieldName === "PersonID") return { ...x, disabled: true }
          return x
        })}
        formSubmitApi={pushAccount}
        initialFormValue={{
          ...account,
          Name: account.AccountName,
          AllowToPayLater: account.AllowPayLateDescription,
          FEID: account.TaxID
        }}
        buttonLabel="Update Account"
        defaultFormValue={{
          AccountID: account.AccountID,
          oca: account.oca
        }}
        refreshEventName={REFRESH_PAGE}
      />,
      <AccountMergeFormModalOpenButton accountData={account} />,
      <AccountRemoveLink AccountID={account.AccountID} />
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
      actions: [<HelpButton helpKey="accountSummaryTab" />],
      summary: [summary]
    }
  })
  meta.push({
    tabTitle: "Contacts",
    tabType: "table",
    tabMeta: {
      blocks: [
        <HelpButton helpKey="accountContactsTab" />,
        <AccountContactFormOpenButton
          iconType="create"
          editMode={false}
          initialValues={{ AccountID: account.AccountID }}
        />
      ],
      tableProps: {
        pagination: false,
        ...getAccountAffiliationTableColumn(false, account.AccountTypeID === ACC_INDIVIDUAL),
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
        blocks: [<HelpButton helpKey="accountSeatGroupsTab" />],
        tableProps: {
          ...getSeatgroupTableColumns(false, account.AccountID, undefined, undefined),
          searchParams: { AccountID: account.AccountID },
          refreshEventName: REFRESH_ACCOUNT_SEATGROUP_PAGE
        }
      }
    })
  meta.push({
    tabTitle: "Registrations",
    tabType: "table",
    tabMeta: {
      blocks: [<HelpButton helpKey="accountRegistrationsTab" />],
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
      blocks: [<HelpButton helpKey="accountRequestsTab" />],
      tableProps: {
        ...getRequestTableColumns(false),
        searchParams: { AccountID: account.AccountID },
        refreshEventName: "REFRESH_REQUEST_TAB"
      }
    }
  })
  meta.push({
    tabTitle: "Financials",
    tabType: "table",
    tabMeta: undefined,
    multipleTabMetas: [
      {
        tabTitle: "Orders",
        tabType: "table",
        tabMeta: {
          blocks: [<HelpButton helpKey="accountFinancialsOrdersTab" />],
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
          blocks: [<HelpButton helpKey="accountFinancialsOrdersItemsTab" />],
          tableProps: {
            ...getOrderItemTableColumns(false, {
              helpKeyViewReturnItemsModal: "accountFinancialsOrdersItemsViewReturnItemsForm",
              helpKeyIssueCreditModal: "accountFinancialsOrdersItemsViewReturnItemsIssueCreditForm",
              helpKeyApplyDiscountModal: "accountFinancialsOrdersItemsApplyDiscountsForm"
            }),
            searchParams: { OrganizationID: account.AccountID },
            refreshEventName: "REFRESH_ORDER_ITEMS_TAB"
          }
        }
      },
      {
        tabTitle: "Payments",
        tabType: "table",
        tabMeta: {
          blocks: [<HelpButton helpKey="accountFinancialsPaymentsTab" />],
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
          blocks: [<HelpButton helpKey="accountFinancialsTransactionTab" />],
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
      blocks: [<HelpButton helpKey="accountCatalogsTab" />],
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
        blocks: [
          <HelpButton helpKey="accountPackgesTab" />,
          <MetaDrivenFormModalOpenButton
            formTitle="Create Package"
            helpkey="accountsAddPackageForm"
            formMeta={PackageFormMeta}
            formSubmitApi={savePackage}
            initialFormValue={{
              AccountID: account.AccountID
            }}
            iconType="create"
            buttonProps={{ type: "primary" }}
            buttonLabel="Add Package"
            defaultFormValue={{
              AccountID: account.AccountID
            }}
            refreshEventName={"REFRESH_PACKAGES_TAB"}
          />,
          <BulkOrderFormModalOpenButton accountData={account} />
        ],
        tableProps: {
          pagination: false,
          ...getPackageTableColumns(false),
          searchParams: { AccountID: account.AccountID },
          refreshEventName: "REFRESH_PACKAGES_TAB"
        }
      }
    })

  account.AccountTypeID !== 1000 &&
    meta.push({
      tabTitle: "Questions",
      tabType: "custom",
      tabMeta: {
        component: AccountQuestionTab,
        props: {}
      }
    })

  account.AccountTypeID !== 1000 &&
    meta.push({
      tabTitle: "Email Setup",
      tabType: "custom",
      tabMeta: {
        component: AccountEmailSetupForm,
        props: { AccountID: account.AccountID }
      }
    })

  return {
    pageTitle: `Account Name - ${account.AccountName}`,
    tabs: meta
  }
}

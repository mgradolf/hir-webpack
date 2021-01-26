import React from "react"
import { Link } from "react-router-dom"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { findPersonEducationHist } from "~/ApiServices/Service/PersonService"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import { getOrderTableColumns } from "~/FormMeta/Order/OrderTableColumns"
import { getOrderItemTableColumns } from "~/FormMeta/OrderItem/OrderItemsTableColumns"
import { getPaymentTableColumns } from "~/FormMeta/Payment/PaymentTableColumns"
import { getTransactionFinancialTableColumns } from "~/FormMeta/TransactionFinancial/TransactionFinancialTableColumns"

export const getProfileMeta = (person: any, disabilities: any): IDetailsTabMeta[] => {
  const tabMetas: IDetailsTabMeta[] = []

  const personalInfo: CardContainer = {
    contents: [
      { label: "Prefix", value: person.Prefix, render: undefined },
      { label: "First Name", value: person.FirstName, render: undefined },
      { label: "Middle Name", value: person.MiddleName, render: undefined },
      { label: "Last Name", value: person.LastName, render: undefined },
      { label: "Suffix", value: person.Suffix, render: undefined },
      { label: "Maiden Name", value: person.MaidenName, render: undefined },
      { label: "Other Name", value: person.OtherName, render: undefined },
      { label: "Title", value: person.Title, render: undefined },
      { label: "SSN", value: person.GovID, render: undefined },
      { label: "ERP ID", value: person.ERPID, render: undefined }
    ]
  }
  const personalInfo2: CardContainer = {
    contents: [
      { label: "Date of Birth", value: person.Birthday, render: renderDate },
      { label: "Gender", value: person.GenderTypeName, render: undefined },
      { label: "Marital Status", value: person.MaritalStatusTypeName, render: undefined },
      { label: "Deceased", value: person.IsDeceased, render: renderBoolean },
      { label: "Date of Death", value: person.DeathDate, render: renderDate },
      { label: "Citizenship", value: person.CitizenshipTypeName, render: undefined },
      { label: "Religion", value: person.ReligionTypeName, render: undefined },
      {
        label: "Ethnicity",
        value:
          Array.isArray(person.Ethnicity) && person.Ethnicity.map((x: any) => x.EthnicityTypeDescriptor).toString(),
        render: undefined
      },
      {
        label: "Disability",
        value: Array.isArray(disabilities) && disabilities.map((x: any) => x.DisabilityTypeName).toString(),
        render: undefined
      },
      { label: "Can Defer Payment", value: person.CanDeferPayment, render: undefined },
      { label: "Personal Information is Private ", value: person.IsConfidential, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [personalInfo, personalInfo2]
  }
  tabMetas.push({ tabTitle: "Demographic", tabType: "summary", tabMeta: summaryMeta })

  const address: CardContainer = {
    title: "Address",
    contents: Array.isArray(person.Addresses)
      ? person.Addresses.map((x: any) => {
          return {
            label: x.AddressTypeDescriptor,
            jsx: (
              <div>
                {x.AddressLine1 && <span>{x.AddressLine1}</span>}
                {x.AddressLine2 && <span>, {x.AddressLine2}</span>}
                {x.AddressLine3 && <span>, {x.AddressLine3}</span>}
                <br />
                <span>
                  {x.Locality} {x.CountryDescriptor}
                </span>
              </div>
            )
          }
        })
      : []
  }

  const phone: CardContainer = {
    title: "Telephone",
    contents: Array.isArray(person.Telephones)
      ? person.Telephones.map((x: any) => {
          return {
            label: x.TelephoneTypeDescriptor,
            jsx: x.TelephoneNumber
          }
        })
      : []
  }

  const email: CardContainer = {
    title: "Email",
    contents: Array.isArray(person.Emails)
      ? person.Emails.map((x: any) => {
          return {
            label: x.EmailTypeDescriptor,
            jsx: renderEmail(x.EmailAddress)
          }
        })
      : []
  }

  const contactMeta: IDetailsSummary = {
    summary: [address, { groupedContents: [email, phone] }]
  }
  tabMetas.push({ tabTitle: "Contact Info", tabType: "summary", tabMeta: contactMeta })

  const login: CardContainer = {
    contents: [
      { label: "User Login", value: person?.Login?.UserLogin },
      { label: "Secret Question", value: person?.Login?.SecretQuestion },
      { label: "Secret Answer", value: person?.Login?.SecretAnswer }
    ]
  }
  tabMetas.push({
    tabTitle: "Web Login",
    tabType: "summary",
    tabMeta: {
      summary: [login]
    }
  })

  tabMetas.push({
    tabTitle: "Education History",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          { title: "Start", dataIndex: "StartDate", render: renderDate },
          { title: "End", dataIndex: "EndDate", render: renderDate },
          { title: "Institution", dataIndex: "EstablishmentName" },
          { title: "Program", dataIndex: "CredentialName" },
          { title: "Degree", dataIndex: "CredentialType" }
        ],
        searchFunc: findPersonEducationHist,
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Financials",
    tabType: "table",
    tabMeta: undefined,
    multipleTabMetas: [
      {
        tabTitle: "Orders",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getOrderTableColumns(false),
            searchParams: { PersonID: person.PersonID },
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
            searchParams: { PersonID: person.PersonID },
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
            searchParams: { PersonID: person.PersonID },
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
            searchParams: { PersonID: person.PersonID },
            refreshEventName: "REFRESH_TRANSACTION_TAB"
          }
        }
      }
    ]
  })

  tabMetas.push({
    tabTitle: "Account Relations",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          {
            title: "Account",
            dataIndex: "AccountName",
            render: (text: any, record: any) => <Link to={`/account/${record.AccountID}`}>{text}</Link>
          },
          { title: "Role ", dataIndex: "AffiliationRoleTypeName" },
          { title: "Shared", dataIndex: "IsContactShared", render: renderBoolean },
          { title: "Status", dataIndex: "AccountAffiliationStatusName" }
        ],
        searchFunc: getAccountAffiliation,
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_CONTACT_TAB",
        pagination: false
      }
    }
  })

  return tabMetas
}

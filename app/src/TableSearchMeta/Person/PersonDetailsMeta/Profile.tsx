import React from "react"
import {
  deletePersonAddress,
  deletePersonEmail,
  deletePersonPhone,
  pushPerson,
  pushPersonAddress,
  pushPersonEmail,
  pushPersonPhone
} from "~/ApiServices/Service/PersonService"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary, CardContents } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { renderBoolean, renderDate, renderDateTime, renderEmail } from "~/Component/Common/ResponsiveTable"
import { AddressFormModalOpenButton } from "~/Component/Feature/Person/Forms/PersonAddressFormModal"
import { BasicFormModalOpenButton } from "~/Component/Feature/Person/Forms/PersonBasicFormModal"
import { PersonLoginAction } from "~/Component/Feature/Person/PersonLoginAction"
import { getOrderTableColumns } from "~/TableSearchMeta/Order/OrderTableColumns"
import { getOrderItemTableColumns } from "~/TableSearchMeta/OrderItem/OrderItemsTableColumns"
import { getPaymentTableColumns } from "~/TableSearchMeta/Payment/PaymentTableColumns"
import { getTransactionFinancialTableColumns } from "~/TableSearchMeta/TransactionFinancial/TransactionFinancialTableColumns"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { getPersonDisabilitiesTableColumns } from "~/TableSearchMeta/Person/PersonDisabilitiesTableColumns"
import { getPersonEduTableColumns } from "~/TableSearchMeta/Person/PersonEduTableColumns"
import { getPersonAccountTableColumns } from "~/TableSearchMeta/Person/PersonAccountTableColumns"
import { PersonAccountAction } from "~/Component/Feature/Person/PersonAccountAction"
import { PersonEmailFormMeta } from "~/Component/Feature/Person/FormMeta/EmailAddress/PersonEmailFormMeta"
import { PersonEmailUpdateFormMeta } from "~/Component/Feature/Person/FormMeta/EmailAddress/PersonEmailUpdateFormMeta"
import { PersonGovFormMeta } from "~/Component/Feature/Person/FormMeta/Basic/PersonGovFormMeta"
import { PersonPhoneFormMeta } from "~/Component/Feature/Person/FormMeta/Telephone/PersonPhoneFormMeta"
import { PersonTypeFormMeta } from "~/Component/Feature/Person/FormMeta/Basic/PersonTypeFormMeta"
import { PersonPhoneUpdateFormMeta } from "~/Component/Feature/Person/FormMeta/Telephone/PersonPhoneUpdateFormMeta"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { AccountRelationFormModalOpenButton } from "~/Component/Feature/Person/Forms/PersonAccountFormModal"
import { EditDeleteButtonComboOnTableRow } from "~/Component/Common/Form/Buttons/EditDeleteButtonComboOnTableRow"
import { PersonAddressFormMeta } from "~/Component/Feature/Person/FormMeta/Address/PersonAddressFormMeta"
import { AFF_ROLE_PURCHASER } from "~/utils/Constants"

import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { DegreeFormModalOpenButton } from "~/Component/Feature/Person/Forms/PersonDegreeFormModal"
import { InlineForm } from "~/Component/Common/Form/InlineForm"
import { PersonMergeFormModalOpenButton } from "~/Component/Feature/Person/Forms/PersonMergeFormModal"
import { PersonRemoveLink } from "~/Component/Feature/Person/PersonRemoveLink"
import { Link } from "react-router-dom"

export const getProfileMeta = (person: any, account: any, profileQuestions: any): IDetailsTabMeta[] => {
  const profileQuestion = (profileQuestionData: { [key: string]: any }): CardContainer => {
    const content: CardContents[] = []
    profileQuestionData.map((profileQuestion: any) => {
      content.push({
        label: profileQuestion.Name,
        value: profileQuestion.Response
      })
      return content
    })

    return {
      title: "Profile Question Responses",
      contents: content
    }
  }

  const tabMetas: IDetailsTabMeta[] = []
  const personalInfo1: CardContainer = {
    title: "Name",
    cardActions: [
      <BasicFormModalOpenButton iconType="edit" personData={person} />,
      <PersonMergeFormModalOpenButton PersonID={person.PersonID} />,
      <PersonRemoveLink PersonID={person.PersonID} />
    ],
    contents: [
      { label: "Prefix", value: person.Prefix, render: undefined },
      { label: "First Name", value: person.FirstName, render: undefined },
      { label: "Middle Name", value: person.MiddleName, render: undefined },
      { label: "Last Name", value: person.LastName, render: undefined },
      { label: "Suffix", value: person.Suffix, render: undefined },
      { label: "Maiden Name", value: person.MaidenName, render: undefined },
      { label: "Other Name", value: person.OtherName, render: undefined },
      { label: "Personal Information is Private", value: person.IsConfidential, render: renderBoolean }
    ]
  }
  const personalInfo2: CardContainer = {
    title: "Other Demographic",
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle="Update General Info"
        formMeta={PersonTypeFormMeta}
        formSubmitApi={pushPerson}
        initialFormValue={person}
        buttonLabel="Update General Info"
        iconType="edit"
        defaultFormValue={{ PersonID: person.PersonID, oca: person.oca }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
    contents: [
      { label: "Date of Birth", value: person.Birthday, render: renderDate },
      { label: "Gender", value: person.GenderTypeName, render: undefined },
      { label: "Marital Status", value: person.MaritalStatusTypeName, render: undefined },
      { label: "Citizenship", value: person.CitizenshipTypeName, render: undefined },
      { label: "Religion", value: person.ReligionTypeName, render: undefined },
      { label: "Deceased", value: person.IsDeceased, render: renderBoolean },
      { label: "Date of Death", value: person.DeathDate, render: renderDate },
      {
        label: "Ethnicity",
        value:
          Array.isArray(person.Ethnicity) && person.Ethnicity.map((x: any) => x.EthnicityTypeDescriptor).toString(),
        render: undefined
      }
    ]
  }
  const personalInfo3: CardContainer = {
    title: "Identity Information",
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle="Update Identity Info"
        formMeta={PersonGovFormMeta}
        formSubmitApi={pushPerson}
        initialFormValue={person}
        buttonLabel="Update Identity Info"
        iconType="edit"
        defaultFormValue={{ PersonID: person.PersonID, oca: person.oca }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
    contents: [
      { label: "SSN", value: person.GovID, render: undefined },
      { label: "ERP ID", value: person.ERPID, render: undefined }
    ]
  }
  const personalInfo4: CardContainer = {
    title: "Purchaser Information",
    cardActions: [<PersonAccountAction initialData={{ ...account, ...person }} />],
    contents: [
      {
        label: "Account Name",
        value: account?.AccountName,
        render: () =>
          account && account.AccountID ? (
            <Link to={`/account/${account.AccountID}`}>{account?.AccountName}</Link>
          ) : (
            <></>
          )
      }
    ]
  }
  const personalInfo5: CardContainer = {
    title: "Payment Option",
    contents: [
      {
        label: "Can Defer Payment",
        value: (
          <InlineForm
            fieldName="CanDeferPayment"
            refreshEventName="REFRESH_PAGE"
            inputType="DROPDOWN"
            defaultValue={person.CanDeferPayment}
            updateFunc={(Params: { [key: string]: any }) =>
              pushPerson({ PersonID: person.PersonID, oca: person.oca, ...Params })
            }
            options={[
              { label: "Default to system", value: null },
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          />
        )
      }
    ]
  }

  const demographySummaryMeta: IDetailsSummary = {
    summary: [
      { groupedContents: [personalInfo1, personalInfo3, profileQuestion(profileQuestions)] },
      { groupedContents: [personalInfo2, personalInfo5, personalInfo4] }
    ],
    actions: [<HelpButton helpKey="personDemographicTab" />]
  }
  tabMetas.push({ tabTitle: "Demographic", tabType: "summary", tabMeta: demographySummaryMeta })

  const address: CardContainer = {
    title: "Address",
    cardActions: [<AddressFormModalOpenButton personData={person} iconType="create" />],
    contents: Array.isArray(person.Addresses)
      ? person.Addresses.map((x: any) => {
          return {
            label: x.AddressTypeDescriptor,
            jsx: (
              <EditDeleteButtonComboOnTableRow
                valueToBeEdited={
                  <>
                    {x.AddressLine1 && x.AddressLine1}
                    {x.AddressLine2 && x.AddressLine2}
                    {x.AddressLine3 && x.AddressLine3}
                    <br />
                    <>
                      {x.Locality}
                      {x.CountryDescriptor}
                    </>
                  </>
                }
                editFormMeta={PersonAddressFormMeta}
                editFormTitle="Update Address"
                editFormInitialValue={x}
                editFormDefaultValue={{
                  PersonID: person.PersonID,
                  IsPreferred: x.SortPosition === 1,
                  PersonAddressID: x.PersonAddressID,
                  oca: x.oca
                }}
                refreshEventName={REFRESH_PAGE}
                editApi={pushPersonAddress}
                deleteApi={() =>
                  deletePersonAddress({ PersonAddressID: x.PersonAddressID }).then((response) => {
                    if (response.success) {
                      eventBus.publish(REFRESH_PAGE)
                    }
                    return response
                  })
                }
              />
            )
          }
        })
      : []
  }

  const phone: CardContainer = {
    title: "Telephone",
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle="Add Phone"
        formMeta={PersonPhoneFormMeta}
        formSubmitApi={pushPersonPhone}
        buttonLabel="Add Phone"
        iconType="create"
        initialFormValue={{ IsConfidential: false, IsPreferred: false }}
        defaultFormValue={{ PersonID: person.PersonID }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
    contents: Array.isArray(person.Telephones)
      ? person.Telephones.map((x: any) => {
          return {
            label: x.TelephoneTypeDescriptor,
            jsx: (
              <EditDeleteButtonComboOnTableRow
                valueToBeEdited={x.TelephoneNumber}
                editFormMeta={PersonPhoneUpdateFormMeta}
                editFormTitle="Update Phone"
                editFormInitialValue={x}
                editFormDefaultValue={{
                  PersonID: person.PersonID,
                  TelephoneTypeID: x.TelephoneTypeID,
                  IsPreferred: x.SortPosition === 1,
                  oca: x.oca
                }}
                refreshEventName={REFRESH_PAGE}
                editApi={pushPersonPhone}
                deleteApi={() =>
                  deletePersonPhone({
                    PersonID: person.PersonID,
                    TelephoneNumber: x.TelephoneNumber
                  }).then((response) => {
                    if (response.success) {
                      eventBus.publish(REFRESH_PAGE)
                    }
                    return response
                  })
                }
              />
            )
          }
        })
      : []
  }

  const email: CardContainer = {
    title: "Email",
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle="Add Email Address"
        formMeta={PersonEmailFormMeta}
        formMetaName="PersonEmailFormMeta"
        formSubmitApi={pushPersonEmail}
        buttonLabel="Add Email"
        iconType="create"
        initialFormValue={{ IsConfidential: false, IsPreferred: false }}
        defaultFormValue={{ PersonID: person.PersonID, oca: person.oca }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
    contents: Array.isArray(person.Emails)
      ? person.Emails.map((x: any) => {
          return {
            label: x.EmailTypeDescriptor,
            jsx: (
              <EditDeleteButtonComboOnTableRow
                valueToBeEdited={renderEmail(x.EmailAddress)}
                editFormMeta={PersonEmailUpdateFormMeta}
                editFormTitle="Update Email Address"
                editFormInitialValue={x}
                editFormDefaultValue={{
                  PersonID: person.PersonID,
                  EmailAddressTypeID: x.EmailAddressTypeID,
                  IsPreferred: x.SortPosition === 1,
                  oca: x.oca
                }}
                refreshEventName={REFRESH_PAGE}
                editApi={pushPersonEmail}
                deleteApi={() =>
                  deletePersonEmail({ PersonID: person.PersonID, EmailAddress: x.EmailAddress }).then((response) => {
                    if (response.success) {
                      eventBus.publish(REFRESH_PAGE)
                    }
                    return response
                  })
                }
              />
            )
          }
        })
      : []
  }

  const contactMeta: IDetailsSummary = {
    summary: [{ groupedContents: [email, phone] }, address],
    actions: [<HelpButton helpKey="personContactInfoTab" />]
  }
  tabMetas.push({ tabTitle: "Contact Info", tabType: "summary", tabMeta: contactMeta })

  const login: CardContainer = {
    title: "Login Info",
    cardActions: [<PersonLoginAction initialData={{ ...person.Login, PersonID: person.PersonID }} />],
    contents: [
      { label: "User Login", value: person?.Login?.UserLogin },
      { label: "Secret Question", value: person?.Login?.SecretQuestion },
      { label: "Secret Answer", value: person?.Login?.SecretAnswer },
      {
        label: "Password Expiration",
        value: person?.Login?.ValidUntil,
        render: person?.Login?.ValidUntil ? renderDateTime : undefined
      },
      {
        label: "Locked Until",
        value: person?.Login?.LockedUntil,
        render: person?.Login?.LockedUntil ? renderDateTime : undefined
      }
    ]
  }

  tabMetas.push({
    tabTitle: "Disabilities",
    tabType: "table",
    tabMeta: {
      blocks: [<HelpButton helpKey="personDisabilitiesTab" />],
      tableProps: {
        pagination: false,
        ...getPersonDisabilitiesTableColumns(person.PersonID),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_DISABILITES_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Web Login",
    tabType: "summary",
    tabMeta: {
      summary: [login],
      actions: [<HelpButton helpKey="personWebLoginTab" />]
    }
  })

  tabMetas.push({
    tabTitle: "Education History",
    tabType: "table",
    tabMeta: {
      blocks: [<DegreeFormModalOpenButton initialData={person} />, <HelpButton helpKey="personEducationHistoryTab" />],
      tableProps: {
        pagination: false,
        ...getPersonEduTableColumns(),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_EDUCATION_HISTORY_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Financials",
    tabType: "table",
    multipleTabMetas: [
      {
        tabTitle: "Orders",
        tabType: "table",
        tabMeta: {
          blocks: [<HelpButton helpKey="personFinancialsOrdersTab" />],
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
          blocks: [<HelpButton helpKey="personFinancialsOrderItemsTab" />],
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
          blocks: [<HelpButton helpKey="personFinancialsPaymentsTab" />],
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
          blocks: [<HelpButton helpKey="personFinancialsTransactionsTab" />],
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
      blocks: [
        <AccountRelationFormModalOpenButton personData={person} />,
        <HelpButton helpKey="personAccountRelationsTab" />
      ],
      tableProps: {
        ...getPersonAccountTableColumns(),
        searchParams: { PersonID: person.PersonID, ExceptRoleTypeID: AFF_ROLE_PURCHASER },
        refreshEventName: "REFRESH_CONTACT_TAB",
        pagination: false
      }
    }
  })

  return tabMetas
}

import React from "react"
import {
  createPersonEducationHistory,
  deletePersonAddress,
  deletePersonEmail,
  deletePersonPhone,
  pushPerson,
  pushPersonAddress,
  pushPersonEmail,
  pushPersonPhone
} from "~/ApiServices/Service/PersonService"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import { AddressFormModalOpenButton } from "~/Component/Person/Forms/PersonAddressFormModal"
import { BasicFormModalOpenButton } from "~/Component/Person/Forms/PersonBasicFormModal"
import { PersonLoginAction } from "~/Component/Person/PersonLoginAction"
import { getOrderTableColumns } from "~/TableSearchMeta/Order/OrderTableColumns"
import { getOrderItemTableColumns } from "~/TableSearchMeta/OrderItem/OrderItemsTableColumns"
import { getPaymentTableColumns } from "~/TableSearchMeta/Payment/PaymentTableColumns"
import { getTransactionFinancialTableColumns } from "~/TableSearchMeta/TransactionFinancial/TransactionFinancialTableColumns"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { getPersonDisabilitiesTableColumns } from "~/TableSearchMeta/Person/PersonDisabilitiesTableColumns"
import { getPersonEduTableColumns } from "~/TableSearchMeta/Person/PersonEduTableColumns"
import { getPersonAccountTableColumns } from "~/TableSearchMeta/Person/PersonAccountTableColumns"
import { PersonAccountAction } from "~/Component/Person/PersonAccountAction"
import { PersonDegreeFormMeta } from "~/Component/Person/FormMeta/PersonDegreeFormMeta"
import { PersonCharacterFormMeta } from "~/Component/Person/FormMeta/Basic/PersonCharacterFormMeta"
import { PersonEmailFormMeta } from "~/Component/Person/FormMeta/EmailAddress/PersonEmailFormMeta"
import { PersonEmailUpdateFormMeta } from "~/Component/Person/FormMeta/EmailAddress/PersonEmailUpdateFormMeta"
import { PersonGovFormMeta } from "~/Component/Person/FormMeta/Basic/PersonGovFormMeta"
import { PersonPhoneFormMeta } from "~/Component/Person/FormMeta/Telephone/PersonPhoneFormMeta"
import { PersonTypeFormMeta } from "~/Component/Person/FormMeta/Basic/PersonTypeFormMeta"
import { PersonPhoneUpdateFormMeta } from "~/Component/Person/FormMeta/Telephone/PersonPhoneUpdateFormMeta"
import { FormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { AccountRelationFormModalOpenButton } from "~/Component/Person/PersonAccountFormModal"
import { EditDeleteButtonComboOnTableRow } from "~/Component/Common/Form/EditDeleteButtonComboOnTableRow"
import { PersonAddressFormMeta } from "~/Component/Person/FormMeta/Address/PersonAddressFormMeta"

export const getProfileMeta = (person: any, disabilities: any, account: any): IDetailsTabMeta[] => {
  const tabMetas: IDetailsTabMeta[] = []
  const personalInfo: CardContainer = {
    title: "Basic Info",
    cardActions: [<BasicFormModalOpenButton personData={person} />],
    contents: [
      { label: "Prefix", value: person.Prefix, render: undefined },
      { label: "First Name", value: person.FirstName, render: undefined },
      { label: "Middle Name", value: person.MiddleName, render: undefined },
      { label: "Last Name", value: person.LastName, render: undefined },
      { label: "Suffix", value: person.Suffix, render: undefined },
      { label: "Maiden Name", value: person.MaidenName, render: undefined },
      { label: "Other Name", value: person.OtherName, render: undefined }
    ]
  }
  const personalInfo1: CardContainer = {
    title: "Gov Info",
    cardActions: [
      <FormModalOpenButton
        formTitle="Update Person Gov Info"
        formMeta={PersonGovFormMeta}
        formSubmitApi={pushPerson}
        initialFormValue={person}
        buttonLabel="Edit"
        defaultFormValue={{ PersonID: person.PersonID }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
    contents: [
      { label: "Title", value: person.Title, render: undefined },
      { label: "SSN", value: person.GovID, render: undefined },
      { label: "ERP ID", value: person.ERPID, render: undefined }
    ]
  }
  const personalInfo2: CardContainer = {
    title: "General Info",
    cardActions: [
      <FormModalOpenButton
        formTitle="Update Person General Info"
        formMeta={PersonTypeFormMeta}
        formSubmitApi={pushPerson}
        initialFormValue={person}
        buttonLabel="Edit"
        defaultFormValue={{ PersonID: person.PersonID }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
    contents: [
      { label: "Date of Birth", value: person.Birthday, render: renderDate },
      { label: "Gender", value: person.GenderTypeName, render: undefined },
      { label: "Marital Status", value: person.MaritalStatusTypeName, render: undefined },
      { label: "Deceased", value: person.IsDeceased, render: renderBoolean },
      { label: "Date of Death", value: person.DeathDate, render: renderDate },
      { label: "Citizenship", value: person.CitizenshipTypeName, render: undefined },
      { label: "Religion", value: person.ReligionTypeName, render: undefined }
    ]
  }

  const personalInfo3: CardContainer = {
    title: "Characteristics Info",
    cardActions: [
      <FormModalOpenButton
        formTitle="Update Person Charanteritics Info"
        formMeta={PersonCharacterFormMeta}
        formSubmitApi={pushPerson}
        initialFormValue={person}
        buttonLabel="Edit"
        defaultFormValue={{ PersonID: person.PersonID }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
    contents: [
      {
        label: "Ethnicity",
        value:
          Array.isArray(person.Ethnicity) && person.Ethnicity.map((x: any) => x.EthnicityTypeDescriptor).toString(),
        render: undefined
      },
      { label: "Can Defer Payment", value: person.CanDeferPayment, render: undefined },
      { label: "Personal Information is Private", value: person.IsConfidential, render: renderBoolean }
    ]
  }

  const personalInfo4: CardContainer = {
    title: "Purchaser Account",
    cardActions: [<PersonAccountAction initialData={{ ...account, ...person }} />],
    contents: [
      {
        label: "Name",
        value: account?.AccountName,
        render: undefined
      },
      { label: "Email Address", value: account?.EmailAddress, render: renderEmail }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [
      { groupedContents: [personalInfo, personalInfo1, personalInfo4] },
      { groupedContents: [personalInfo2, personalInfo3] }
    ]
  }
  tabMetas.push({ tabTitle: "Demographic", tabType: "summary", tabMeta: summaryMeta })

  const address: CardContainer = {
    title: "Address",
    cardActions: [<AddressFormModalOpenButton personData={person} />],
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
                editFormDefaultValue={{ PersonID: person.PersonID, PersonAddressID: x.PersonAddressID }}
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
    title: "Telephone asdsad",
    cardActions: [
      <FormModalOpenButton
        formTitle="Add Phone"
        formMeta={PersonPhoneFormMeta}
        formSubmitApi={pushPersonPhone}
        buttonLabel="Add"
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
                editFormDefaultValue={{ PersonID: person.PersonID, TelephoneTypeID: x.TelephoneTypeID }}
                refreshEventName={REFRESH_PAGE}
                editApi={pushPersonPhone}
                deleteApi={() =>
                  deletePersonPhone({ PersonID: person.PersonID, TelephoneNumber: x.TelephoneNumber }).then(
                    (response) => {
                      if (response.success) {
                        eventBus.publish(REFRESH_PAGE)
                      }
                      return response
                    }
                  )
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
      <FormModalOpenButton
        formTitle="Add Email Address"
        formMeta={PersonEmailFormMeta}
        formSubmitApi={pushPersonEmail}
        buttonLabel="Add"
        defaultFormValue={{ PersonID: person.PersonID }}
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
                editFormTitle="Update Phone"
                editFormInitialValue={x}
                editFormDefaultValue={{ PersonID: person.PersonID, EmailAddressTypeID: x.EmailAddressTypeID }}
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
    summary: [{ groupedContents: [email, phone] }, address]
  }
  tabMetas.push({ tabTitle: "Contact Info", tabType: "summary", tabMeta: contactMeta })

  const login: CardContainer = {
    title: "Login Info",
    cardActions: [<PersonLoginAction initialData={person.Login} />],
    contents: [
      { label: "User Login", value: person?.Login?.UserLogin },
      { label: "Secret Question", value: person?.Login?.SecretQuestion },
      { label: "Secret Answer", value: person?.Login?.SecretAnswer },
      {
        label: "Password Expiration",
        value: person?.Login?.ValidUntil,
        render: person?.Login?.ValidUntil ? renderDate : undefined
      },
      {
        label: "Locked Until",
        value: person?.Login?.LockedUntil,
        render: person?.Login?.LockedUntil ? renderDate : undefined
      }
    ]
  }

  tabMetas.push({
    tabTitle: "Disabilities",
    tabType: "table",
    tabMeta: {
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
      summary: [login]
    }
  })

  tabMetas.push({
    tabTitle: "Education History",
    tabType: "table",
    tabMeta: {
      // blocks: [<EducationHistoryFormModalOpenButton personData={person} />],
      blocks: [
        <FormModalOpenButton
          formTitle="Add Degree"
          buttonLabel="Add Degree"
          buttonProps={{
            type: "primary"
          }}
          initialFormValue={person}
          defaultFormValue={{ PersonID: person.PersonID }}
          formSubmitApi={createPersonEducationHistory}
          formMeta={PersonDegreeFormMeta}
          refreshEventName={"REFRESH_EDUCATION_HISTORY_TAB"}
        />
      ],
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
      blocks: [<AccountRelationFormModalOpenButton personData={person} />],
      tableProps: {
        ...getPersonAccountTableColumns(),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_CONTACT_TAB",
        pagination: false
      }
    }
  })

  return tabMetas
}

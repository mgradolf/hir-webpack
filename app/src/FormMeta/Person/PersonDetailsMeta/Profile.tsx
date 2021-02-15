import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { Button } from "antd"
import React, { useState } from "react"
import {
  createPersonEducationHistory,
  deletePersonEmail,
  deletePersonPhone,
  pushPerson,
  pushPersonEmail,
  pushPersonPhone
} from "~/ApiServices/Service/PersonService"
import { IField } from "~/Component/Common/Form/common"
import { FormModal } from "~/Component/Common/Form/FormModal2"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import PersonAddressFormModal from "~/Component/Person/PersonAddressFormModal"
import PersonBasicFormModal from "~/Component/Person/PersonBasicFormModal"
import PersonLoginAction from "~/Component/Person/PersonLoginAction"
import { getOrderTableColumns } from "~/FormMeta/Order/OrderTableColumns"
import { getOrderItemTableColumns } from "~/FormMeta/OrderItem/OrderItemsTableColumns"
import { getPaymentTableColumns } from "~/FormMeta/Payment/PaymentTableColumns"
import { getTransactionFinancialTableColumns } from "~/FormMeta/TransactionFinancial/TransactionFinancialTableColumns"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { PersonCharacterFormMeta } from "~/FormMeta/Person/Basic/PersonCharacterFormMeta"
import { PersonDegreeFormMeta } from "~/FormMeta/Person/PersonDegreeFormMeta"
import { getPersonDisabilitiesTableColumns } from "~/FormMeta/Person/PersonDisabilitiesTableColumns"
import { getPersonEduTableColumns } from "~/FormMeta/Person/PersonEduTableColumns"
import { PersonEmailFormMeta } from "~/FormMeta/Person/EmailAddress/PersonEmailFormMeta"
import { PersonEmailUpdateFormMeta } from "~/FormMeta/Person/EmailAddress/PersonEmailUpdateFormMeta"
import { PersonGovFormMeta } from "~/FormMeta/Person/Basic/PersonGovFormMeta"
import { PersonPhoneFormMeta } from "~/FormMeta/Person/Telephone/PersonPhoneFormMeta"
import { PersonTypeFormMeta } from "~/FormMeta/Person/Basic/PersonTypeFormMeta"
import { getPersonAccountTableColumns } from "~/FormMeta/Person/PersonAccountTableColumns"
import { PersonPhoneUpdateFormMeta } from "~/FormMeta/Person/Telephone/PersonPhoneUpdateFormMeta"
import PersonAccountFormModal from "~/Component/Person/PersonAccountFormModal"
import PersonAccountAction from "~/Component/Person/PersonAccountAction"

const BasicFormModalOpenButton = (props: { personData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="ghost" onClick={() => setShowModal && setShowModal(true)}>
          Edit
        </Button>
      )}
      {showModal && <PersonBasicFormModal initialData={props.personData} closeModal={() => setShowModal(false)} />}
    </>
  )
}

const AddressFormModalOpenButton = (props: { personData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          Add
        </Button>
      )}
      {showModal && <PersonAddressFormModal initialData={props.personData} closeModal={() => setShowModal(false)} />}
    </>
  )
}

const EducationHistoryFormModalOpenButton = (props: { personData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          + Add Degree
        </Button>
      )}
      {showModal && (
        <FormModal
          meta={PersonDegreeFormMeta}
          title={"Add Degree"}
          initialFormValue={props.personData}
          defaultFormValue={{ PersonID: props.personData.PersonID }}
          formSubmitApi={createPersonEducationHistory}
          refreshEventAfterFormSubmission={"REFRESH_EDUCATION_HISTORY_TAB"}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  )
}

const AccountRelationFormModalOpenButton = (props: { personData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          + Add Relation
        </Button>
      )}
      {showModal && <PersonAccountFormModal initialData={props.personData} closeModal={() => setShowModal(false)} />}
    </>
  )
}

const UpdateFormModalOpenButton = (props: {
  personData: { [key: string]: any }
  title: string
  metaFile: IField[]
  submitAPI: (Params: any) => Promise<IApiResponse>
}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="ghost" onClick={() => setShowModal && setShowModal(true)}>
          Edit
        </Button>
      )}
      {showModal && (
        <FormModal
          meta={props.metaFile}
          title={props.title}
          initialFormValue={props.personData}
          defaultFormValue={{ PersonID: props.personData.PersonID }}
          formSubmitApi={props.submitAPI}
          refreshEventAfterFormSubmission={REFRESH_PAGE}
          closeModal={() => setShowModal(false)}
        ></FormModal>
      )}
    </>
  )
}

const ContactFormModalOpenButton = (props: {
  metaFileName: IField[]
  title: string
  PersonID: number
  initialData?: { [key: string]: any }
  submitAPI: (Params: any) => Promise<IApiResponse>
}) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          Add
        </Button>
      )}
      {showModal && (
        <FormModal
          meta={props.metaFileName}
          title={props.title}
          isHorizontal={true}
          initialFormValue={props.initialData ? props.initialData : { IsConfidential: false }}
          defaultFormValue={{ PersonID: props.PersonID }}
          formSubmitApi={props.submitAPI}
          refreshEventAfterFormSubmission={REFRESH_PAGE}
          closeModal={() => setShowModal(false)}
        ></FormModal>
      )}
    </>
  )
}

const setShowModal = () => {
  console.log("modal set false!")
}

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
      <UpdateFormModalOpenButton
        title={"Update Person Gov Info"}
        metaFile={PersonGovFormMeta}
        personData={person}
        submitAPI={pushPerson}
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
      <UpdateFormModalOpenButton
        title={"Update Person General Info"}
        metaFile={PersonTypeFormMeta}
        personData={person}
        submitAPI={pushPerson}
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
      <UpdateFormModalOpenButton
        title={"Update Person Charanteritics Info"}
        metaFile={PersonCharacterFormMeta}
        personData={person}
        submitAPI={pushPerson}
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
            icon: true,
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
    cardActions: [
      <ContactFormModalOpenButton
        title={"Add Phone"}
        metaFileName={PersonPhoneFormMeta}
        PersonID={person.PersonID}
        submitAPI={pushPersonPhone}
      />
    ],
    contents: Array.isArray(person.Telephones)
      ? person.Telephones.map((x: any) => {
          return {
            label: x.TelephoneTypeDescriptor,
            icon: true,
            onUpdate: (
              <FormModal
                meta={PersonPhoneUpdateFormMeta}
                title={"Update Phone"}
                initialFormValue={x}
                defaultFormValue={{ PersonID: person.PersonID, TelephoneTypeID: x.TelephoneTypeID }}
                formSubmitApi={pushPersonPhone}
                refreshEventAfterFormSubmission={REFRESH_PAGE}
                closeModal={setShowModal}
              ></FormModal>
            ),
            onDelete: () => {
              deletePersonPhone({ PersonID: person.PersonID, TelephoneNumber: x.TelephoneNumber }).then((response) => {
                if (response.success) {
                  eventBus.publish(REFRESH_PAGE)
                }
              })
            },
            jsx: x.TelephoneNumber
          }
        })
      : []
  }

  const email: CardContainer = {
    title: "Email",
    cardActions: [
      <ContactFormModalOpenButton
        title={"Add Email Address"}
        metaFileName={PersonEmailFormMeta}
        PersonID={person.PersonID}
        submitAPI={pushPersonEmail}
      />
    ],
    contents: Array.isArray(person.Emails)
      ? person.Emails.map((x: any) => {
          return {
            label: x.EmailTypeDescriptor,
            icon: true,
            onUpdate: (
              <FormModal
                meta={PersonEmailUpdateFormMeta}
                title={"Update Email Address"}
                initialFormValue={x}
                defaultFormValue={{ PersonID: person.PersonID, EmailAddressTypeID: x.EmailAddressTypeID }}
                formSubmitApi={pushPersonEmail}
                refreshEventAfterFormSubmission={REFRESH_PAGE}
                closeModal={setShowModal}
              ></FormModal>
            ),
            onDelete: () => {
              deletePersonEmail({ PersonID: person.PersonID, EmailAddress: x.EmailAddress }).then((response) => {
                if (response.success) {
                  eventBus.publish(REFRESH_PAGE)
                }
              })
            },
            jsx: renderEmail(x.EmailAddress)
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
      blocks: [<EducationHistoryFormModalOpenButton personData={person} />],
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

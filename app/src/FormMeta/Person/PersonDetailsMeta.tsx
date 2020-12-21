import React from "react"
import { findStudentHold } from "~/ApiServices/BizApi/student/studentHoldIF"
import { findPersonEducationHist } from "~/ApiServices/Service/PersonService"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean, renderDate, renderEmail } from "~/Component/Common/ResponsiveTable"
import { getCertificateTableColumns } from "~/FormMeta/Certificate/CertificateTableColumns"
import { getProgramApplicationTableColumns } from "~/FormMeta/ProgramApplication/ProgramApplicationTableColumns"
import { getProgramEnrollmentTableColumns } from "~/FormMeta/ProgramEnrollment/ProgramEnrollmentTableColumns"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"
import { getWaitlistEntriesTableColumns } from "~/FormMeta/WaitlistEntries/WaitlistEntryTableColumns"
import { getAccountAffiliationTableColumn } from "~/FormMeta/AccountAffiliation/getAccountAffiliationTableColumn"

export const getPersonDetailsMeta = (
  personInfos: { [key: string]: any }[],
  entityType?: string,
  entityID?: number
): IDetailsMeta => {
  const person: { [key: string]: any } = personInfos[0]
  const instructor: { [key: string]: any } | undefined = personInfos[1].Faculty
  const student: { [key: string]: any } | undefined = personInfos[1].Student
  const disabilities: { [key: string]: any } | undefined = personInfos[1].PersonDisabilites

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
      { label: "ERP ID", value: person.ERPID, render: undefined },
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

  const studentInfo: CardContainer | undefined = student
    ? {
        title: "Student Info",
        contents: [
          { label: "Serial Num", value: student?.StudentSerialNumber },
          { label: "Organization", value: student?.Organization },
          { label: "Start Date", value: student?.StartDate, render: renderDate },
          { label: "End Date", value: student?.EndDate, render: renderDate },
          { label: "Academic Standing", value: student?.AcademicStandingTypeName },
          { label: "Status", value: student?.StudentStatusCodeName },
          { label: "Commuter", value: student?.IsCommuter, render: renderBoolean },
          { label: "Solicit For Marketing", value: student?.AllowMarketing, render: renderBoolean },
          { label: "Family Educational Rights and Privacy Act (FERPA)", value: student?.FERPA, render: renderBoolean },
          { label: "Active", value: student?.IsActive, render: renderBoolean }
        ]
      }
    : undefined

  const instructorInfo: CardContainer | undefined = instructor
    ? {
        title: "Instructor Info",
        contents: [
          { label: "Serial Num", value: instructor?.FacultySerialNum },
          { label: "Organization", value: instructor?.OrganizationName },
          { label: "Status", value: instructor?.InstitutionStatusCodeName },
          { label: "Type", value: instructor?.InstructorTypeName },
          { label: "Active", value: instructor?.IsActive, render: renderBoolean }
        ]
      }
    : undefined

  const summaryMeta: IDetailsSummary = {
    summary: [personalInfo, { groupedContents: [address, email, phone] }]
  }
  instructorInfo && summaryMeta.summary.push(instructorInfo)
  studentInfo && summaryMeta.summary.push(studentInfo)

  const login: CardContainer = {
    title: "Web Login",
    contents: [
      { label: "User Login", value: person?.Login?.UserLogin },
      { label: "Secret Question", value: person?.Login?.SecretQuestion },
      { label: "Secret Answer", value: person?.Login?.SecretAnswer }
    ]
  }

  const webLoginMeta: IDetailsSummary = {
    summary: [login]
  }

  const waitlistEntryMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getWaitlistEntriesTableColumns(false),
      searchParams: { PersonID: person.PersonID },
      refreshEventName: "REFRESH_PERSON_TAB"
    }
  }

  const requestMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRequestTableColumns(false),
      searchParams: { PersonID: person.PersonID },
      refreshEventName: "REFRESH_REQUEST_TAB"
    }
  }

  const registrationMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRegistrationTableColumns(false),
      searchParams: { StudentID: entityID },
      refreshEventName: "REFRESH_REGISTRATION_TAB"
    }
  }

  const certificateMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getCertificateTableColumns(false),
      searchParams: { PersonID: person.PersonID },
      refreshEventName: "REFRESH_CERTIFICATE_TAB"
    }
  }

  const programApplicationMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getProgramApplicationTableColumns(false),
      searchParams: { PersonID: person.PersonID },
      refreshEventName: "REFRESH_APPLICATION_TAB"
    }
  }

  const programEnrollmentMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getProgramEnrollmentTableColumns(false),
      searchParams: { PersonID: person.PersonID },
      refreshEventName: "REFRESH_ENROLLMMENT_TAB"
    }
  }

  const tabMetas: IDetailsTabMeta[] = []
  tabMetas.push({ tabTitle: "Summary", tabType: "summary", tabMeta: summaryMeta })
  tabMetas.push({ tabTitle: "Web Login", tabType: "summary", tabMeta: webLoginMeta })
  tabMetas.push({ tabTitle: "Waitlist", tabType: "table", tabMeta: waitlistEntryMeta })
  tabMetas.push({
    tabTitle: "Account Relations ",
    tabType: "table",
    tabMeta: {
      // searchMeta: [
      //   {
      //     label: "Is Active",
      //     fieldName: "IsActive",
      //     inputType: BOOLEAN
      //   }
      // ],
      tableProps: {
        ...getAccountAffiliationTableColumn(),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })
  console.log(entityType)
  if (entityType === "Student")
    tabMetas.push({ tabTitle: "Registrations", tabType: "table", tabMeta: registrationMeta })
  tabMetas.push({ tabTitle: "Requests", tabType: "table", tabMeta: requestMeta })
  tabMetas.push({
    tabTitle: "Education History",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          { title: "Start", dataIndex: "StartDate", render: renderDate },
          { title: "End", dataIndex: "EndDate", render: renderDate },
          { title: "Program", dataIndex: "CredentialName" },
          { title: "Degree", dataIndex: "CredentialType" }
        ],
        searchFunc: findPersonEducationHist,
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        // ...getAccountAffiliationTableColumn(),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })
  if (entityType === "Student")
    tabMetas.push({
      tabTitle: "Hold",
      tabType: "table",
      tabMeta: {
        tableProps: {
          columns: [
            // { title: "Hold Type", dataIndex: "StartDate" },
            { title: "Hold Date", dataIndex: "EndDate", render: renderDate },
            { title: "Hold Reason", dataIndex: "HoldReason" },
            { title: "Hold By", dataIndex: "HoldBy" },
            { title: "Release Date", dataIndex: "ReleaseDate", render: renderDate },
            { title: "Release Reason", dataIndex: "ReleaseReason" },
            { title: "Release By", dataIndex: "ReleasedBy" }
          ],
          searchFunc: (Params: any) => findStudentHold(Params.StudentID),
          responsiveColumnIndices: [],
          expandableColumnIndices: [],
          searchParams: { StudentID: entityID },
          refreshEventName: "REFRESH_HOLD_TAB"
        }
      }
    })
  tabMetas.push({ tabTitle: "Certificates", tabType: "table", tabMeta: certificateMeta })
  tabMetas.push({ tabTitle: "Program Applications", tabType: "table", tabMeta: programApplicationMeta })
  tabMetas.push({ tabTitle: "Program Enrollments", tabType: "table", tabMeta: programEnrollmentMeta })

  return {
    pageTitle: person.FormattedName,
    tabs: tabMetas
  }
}

import React from "react"
import { findStudentHold } from "~/ApiServices/BizApi/student/studentHoldIF"
import { findPersonEducationHist, getFacultySchedule } from "~/ApiServices/Service/PersonService"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDate, renderDateTime, renderEmail } from "~/Component/Common/ResponsiveTable"
import { getCertificateTableColumns } from "~/FormMeta/Certificate/CertificateTableColumns"
import { getProgramApplicationTableColumns } from "~/FormMeta/ProgramApplication/ProgramApplicationTableColumns"
import { getProgramEnrollmentTableColumns } from "~/FormMeta/ProgramEnrollment/ProgramEnrollmentTableColumns"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getRequestTableColumns } from "~/FormMeta/Request/RequestTableColumns"
import { getWaitlistEntriesTableColumns } from "~/FormMeta/WaitlistEntries/WaitlistEntryTableColumns"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { Link } from "react-router-dom"
import { searchOnlineClasses, searchStudentSchedule } from "~/ApiServices/Service/StudentService"
import { searchInstructorOfferings, searchSectionInstructor } from "~/ApiServices/Service/InstructorService"
import { getFinancialsByTarget } from "~/ApiServices/BizApi/financial/financialIF"

export const getPersonDetailsMeta = (
  personInfos: { [key: string]: any }[],
  entityType?: string,
  entityID?: number
): IDetailsMeta => {
  const tabMetas: IDetailsTabMeta[] = []
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

  tabMetas.push({ tabTitle: "Summary", tabType: "summary", tabMeta: summaryMeta })

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
    tabTitle: "Waitlist",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getWaitlistEntriesTableColumns(false),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_PERSON_TAB"
      }
    }
  })
  tabMetas.push({
    tabTitle: "Account Relations",
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

  entityType === "Student" &&
    tabMetas.push({
      tabTitle: "Registrations",
      tabType: "table",
      tabMeta: {
        tableProps: {
          ...getRegistrationTableColumns(false),
          searchParams: { StudentID: entityID },
          refreshEventName: "REFRESH_REGISTRATION_TAB"
        }
      }
    })

  tabMetas.push({
    tabTitle: "Requests",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getRequestTableColumns(false),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_REQUEST_TAB"
      }
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

  entityType === "Student" &&
    tabMetas.push({
      tabTitle: "Student Schedule",
      tabType: "table",
      tabMeta: {
        tableProps: {
          columns: [
            { title: "Date", dataIndex: "EndDate", render: renderDate },
            { title: "Time", dataIndex: "StartTime" },
            { title: "Offering Name", dataIndex: "OfferingName" },
            {
              title: "Section Number",
              dataIndex: "SectionNumber",
              render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
            },
            { title: "Location", dataIndex: "Location" }
          ],
          searchFunc: (Params: any) => searchStudentSchedule({ StudentID: Params.StudentID }),
          responsiveColumnIndices: [],
          expandableColumnIndices: [],
          searchParams: { StudentID: entityID },
          refreshEventName: "REFRESH_STUDENT_SCHEDULE_TAB"
        }
      }
    })
  entityType === "Student" &&
    tabMetas.push({
      tabTitle: "Online Classes",
      tabType: "table",
      tabMeta: {
        tableProps: {
          columns: [
            { title: "StartDate", dataIndex: "StartDate", render: renderDate },
            { title: "EndDate", dataIndex: "EndDate", render: renderDate },
            {
              title: "Offering Code",
              dataIndex: "OfferingCode",
              render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
            },
            {
              title: "Section Number",
              dataIndex: "SectionNumber",
              render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>
            }
          ],
          searchFunc: (Params: any) => searchOnlineClasses({ StudentID: Params.StudentID }),
          responsiveColumnIndices: [],
          expandableColumnIndices: [],
          searchParams: { StudentID: entityID },
          refreshEventName: "REFRESH_HOLD_TAB"
        }
      }
    })

  entityType === "Student" &&
    tabMetas.push({
      tabTitle: "Hold",
      tabType: "table",
      tabMeta: {
        tableProps: {
          columns: [
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
  entityType === "Faculty" &&
    tabMetas.push({
      tabTitle: "Faculty Schedule",
      tabType: "table",
      tabMeta: {
        tableProps: {
          columns: [
            { title: "Start Date", dataIndex: "EndDate", render: renderDateTime },
            { title: "End Date", dataIndex: "EndDate", render: renderDateTime },
            // { title: "Start Time", dataIndex: "HoldReason" },
            // { title: "End Time", dataIndex: "HoldReason" },
            { title: "Item", dataIndex: "Name" }
          ],
          searchFunc: getFacultySchedule,
          responsiveColumnIndices: [],
          expandableColumnIndices: [],
          searchParams: { PersonID: person.PersonID },
          refreshEventName: "REFRESH_FACULTY_SCHEDULE_TAB"
        }
      }
    })

  entityType === "Faculty" &&
    tabMetas.push({
      tabTitle: "Instructor Contracts",
      tabType: "table",
      tabMeta: {
        tableProps: {
          columns: [
            { title: "CurrentEnrollment", dataIndex: "CurrentEnrollment" },
            { title: "MaxEnrollment", dataIndex: "MaxEnrollment" },
            { title: "SectionNumber", dataIndex: "SectionNumber" },
            { title: "PostalCode", dataIndex: "PostalCode" },
            { title: "SectionStatusCodeName", dataIndex: "SectionStatusCodeName" },
            { title: "TelephoneNumber", dataIndex: "TelephoneNumber" },
            { title: "Key_Section", dataIndex: "Key_Section" },
            { title: "StartDate", dataIndex: "StartDate" },
            { title: "MinEnrollment", dataIndex: "MinEnrollment" },
            { title: "PersonID", dataIndex: "PersonID" },
            { title: "OfferingCode", dataIndex: "OfferingCode" },
            { title: "SectionID", dataIndex: "SectionID" },
            { title: "DaysOfWeek", dataIndex: "DaysOfWeek" },
            { title: "Locality", dataIndex: "Locality" },
            { title: "FirstName", dataIndex: "FirstName" },
            { title: "Amount", dataIndex: "Amount" },
            { title: "Title", dataIndex: "Title" },
            { title: "ERPID", dataIndex: "ERPID" },
            { title: "EndDate", dataIndex: "EndDate" },
            { title: "EmailAddress", dataIndex: "EmailAddress" },
            { title: "AddressLine1", dataIndex: "AddressLine1" },
            { title: "MeetsOn", dataIndex: "MeetsOn" },
            { title: "LastName", dataIndex: "LastName" },
            { title: "OfferingName", dataIndex: "OfferingName" },
            { title: "FacultyID", dataIndex: "FacultyID" }
          ],
          searchFunc: searchSectionInstructor,
          responsiveColumnIndices: [],
          expandableColumnIndices: [],
          searchParams: { FacultyID: entityID },
          refreshEventName: "REFRESH_FACULTY_CONTACT_TAB"
        }
      }
    })

  entityType === "Faculty" &&
    tabMetas.push({
      tabTitle: "Qualified Offerings",
      tabType: "table",
      tabMeta: {
        tableProps: {
          columns: [
            { title: "OrganizationName", dataIndex: "OrganizationName" },
            { title: "CreationDate", dataIndex: "CreationDate" },
            { title: "StartTermName", dataIndex: "StartTermName" },
            { title: "OfferingDescriptor", dataIndex: "OfferingDescriptor" },
            { title: "ModifiedDate", dataIndex: "ModifiedDate" },
            { title: "ModifiedBy", dataIndex: "ModifiedBy" },
            { title: "oca", dataIndex: "oca" },
            { title: "StatusCode", dataIndex: "StatusCode" },
            { title: "URL", dataIndex: "URL" },
            { title: "OfferingStatusReleaseID", dataIndex: "OfferingStatusReleaseID" },
            { title: "OfferingStatusCodeID", dataIndex: "OfferingStatusCodeID" },
            { title: "EffectiveTerminationDate", dataIndex: "EffectiveTerminationDate" },
            { title: "OfferingCode", dataIndex: "OfferingCode" },
            { title: "PaymentGatewayAccountName", dataIndex: "PaymentGatewayAccountName" },
            { title: "EndTermID", dataIndex: "EndTermID" },
            { title: "HasApprovalProcess", dataIndex: "HasApprovalProcess" },
            { title: "OfferingTypeID", dataIndex: "OfferingTypeID" },
            { title: "RecurrenceRule", dataIndex: "RecurrenceRule" },
            { title: "EndTermName", dataIndex: "EndTermName" },
            { title: "OfferingUsageType", dataIndex: "OfferingUsageType" },
            { title: "TerminationDate", dataIndex: "TerminationDate" },
            { title: "StartTermID", dataIndex: "StartTermID" },
            { title: "SectionTypeName", dataIndex: "SectionTypeName" },
            { title: "OrganizationID", dataIndex: "OrganizationID" },
            { title: "PaymentGatewayAccountID", dataIndex: "PaymentGatewayAccountID" },
            { title: "OfferingTypeName", dataIndex: "OfferingTypeName" },
            { title: "CourseID", dataIndex: "CourseID" },
            { title: "EffectiveCreationDate", dataIndex: "EffectiveCreationDate" },
            { title: "DefaultSectionTypeID", dataIndex: "DefaultSectionTypeID" },
            { title: "OfferingDescription", dataIndex: "OfferingDescription" },
            { title: "IsQuickAdmit", dataIndex: "IsQuickAdmit" },
            { title: "ModifiedByUserID", dataIndex: "ModifiedByUserID" },
            { title: "OfferingName", dataIndex: "OfferingName" },
            { title: "OfferingID", dataIndex: "OfferingID" },
            { title: "SubmitInquiryToUserID", dataIndex: "SubmitInquiryToUserID" }
          ],
          searchFunc: searchInstructorOfferings,
          responsiveColumnIndices: [],
          expandableColumnIndices: [],
          searchParams: { FacultyID: entityID },
          refreshEventName: "REFRESH_FACULTY_OFFERINGS_TAB"
        }
      }
    })
  entityType === "Faculty" &&
    tabMetas.push({
      tabTitle: "Instructor Fees",
      tabType: "table",
      tabMeta: {
        tableProps: {
          columns: [
            { title: "ApplyToID", dataIndex: "ApplyToID" },
            { title: "Description", dataIndex: "Description" },
            { title: "FinancialBasisTypeID", dataIndex: "FinancialBasisTypeID" },
            { title: "FinancialCategoryTypeID", dataIndex: "FinancialCategoryTypeID" },
            { title: "FinancialID", dataIndex: "FinancialID" },
            { title: "FinancialTypeID", dataIndex: "FinancialTypeID" },
            { title: "GLAccountID", dataIndex: "GLAccountID" },
            { title: "IsActive", dataIndex: "IsActive" },
            { title: "IsCharge", dataIndex: "IsCharge" },
            { title: "IsOptional", dataIndex: "IsOptional" },
            { title: "IsTaxable", dataIndex: "IsTaxable" },
            { title: "ItemUnitAmount", dataIndex: "ItemUnitAmount" },
            { title: "Weight", dataIndex: "Weight" }
          ],
          searchFunc: (Params: any) => getFinancialsByTarget(3, 2),
          responsiveColumnIndices: [],
          expandableColumnIndices: [],
          searchParams: { FacultyID: entityID, FinancialTypeID: 2 },
          refreshEventName: "REFRESH_FACULTY_OFFERINGS_TAB"
        }
      }
    })

  tabMetas.push({
    tabTitle: "Certificates",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getCertificateTableColumns(false),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_CERTIFICATE_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Program Applications",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getProgramApplicationTableColumns(false),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_APPLICATION_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Program Enrollments",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getProgramEnrollmentTableColumns(false),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_ENROLLMMENT_TAB"
      }
    }
  })

  return {
    pageTitle: person.FormattedName,
    tabs: tabMetas
  }
}

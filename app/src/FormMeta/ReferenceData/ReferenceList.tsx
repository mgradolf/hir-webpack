import { renderLink, sortByString, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

interface IReferenceList {
  Title: string
  Value: string
  Description: string
  custom: boolean
}
export const ReferenceList: IReferenceList[] = [
  {
    Title: "Academic Standing Type",
    Value: "AcademicStandingType",
    Description: "AcademicStandingType is a reflookup for ...",
    custom: false
  },
  {
    Title: "Account Affiliation Status",
    Value: "AccountAffiliationStatus",
    Description: "AccountAffiliationStatus is a reflookup for ...",
    custom: false
  },
  {
    Title: "Account Transaction Types",
    Value: "AccountTransactionType",
    Description: "AccountTransactionType is custom a reflookup for ...",
    custom: true
  },
  { Title: "Account Type", Value: "AccountType", Description: "AccountType is a reflookup for ...", custom: false },
  //Unavailable in admin
  { Title: "Address Types", Value: "AddressType", Description: "AddressType is a reflookup for ...", custom: false },
  {
    Title: "Affiliation Role Type",
    Value: "AffiliationRoleType",
    Description: "affiliationroletype is custom a reflookup for ...",
    custom: true
  },
  // Unavailable in admin
  {
    Title: "Attendance Units",
    Value: "AttendanceUnit",
    Description: "AccountAffiliationStatus is a reflookup for ...",
    custom: false
  },
  {
    Title: "Cancel Reason Codes",
    Value: "CancelReasonCode",
    Description: "AccountAffiliationStatus is a reflookup for ...",
    custom: false
  },
  { Title: "Catalog Type", Value: "CatalogType", Description: "CatalogType is a reflookup for ...", custom: false },
  {
    Title: "Certificate Category Type",
    Value: "CertificateCategoryType",
    Description: "CertificateCategoryType is a reflookup for ...",
    custom: false
  },
  { Title: "Cip Code", Value: "cipcode", Description: "cipcode is custom a reflookup for ...", custom: true },
  // Unavailable in admin
  {
    Title: "Citizenship Types",
    Value: "CitizenshipType",
    Description: "CitizenshipType is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Class Status Codes",
    Value: "ClassStatusCode",
    Description: "CitizenshipType is custom a reflookup for ...",
    custom: false
  },
  {
    Title: "Comment Category Codes",
    Value: "CommentCategory",
    Description: "CommentCategory is a reflookup for ...",
    custom: true
  },
  {
    Title: "Country Codes",
    Value: "CountryCode",
    Description: "CountryCode is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Credential Types",
    Value: "CredentialType",
    Description: "CredentialType is a reflookup for ...",
    custom: false
  },
  {
    Title: "Credit Hour Type",
    Value: "CreditHourType",
    Description: "CreditHourType is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  { Title: "Credit Types", Value: "CreditType", Description: "CredentialType is a reflookup for ...", custom: false },
  {
    Title: "Data Relationship Type",
    Value: "DataRelationshipType",
    Description: "DataRelationshipType is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  { Title: "Delivery Mode", Value: "DeliveryMode", Description: "DeliveryMode is a reflookup for ...", custom: false },
  {
    Title: "Disability Types",
    Value: "DisabilityType",
    Description: "DisabilityType is a reflookup for ...",
    custom: false
  },
  {
    Title: "Discount Amount Type",
    Value: "DiscountAmountType",
    Description: "DiscountAmountType is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Discount Groups",
    Value: "DiscountGroup",
    Description: "DiscountGroup is a reflookup for ...",
    custom: false
  },
  {
    Title: "Discount Types",
    Value: "DiscountType",
    Description: "discounttype is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Duedate Policy",
    Value: "DueDatePolicy",
    Description: "duedatepolicy is custom a reflookup for ...",
    custom: true
  },
  // Unavailable in admin
  { Title: "Duration Type", Value: "DurationType", Description: "DurationType is a reflookup for ...", custom: false },
  // Unavailable in admin
  { Title: "Email Address Types", Value: "EmailType", Description: "EmailType is a reflookup for ...", custom: false },
  {
    Title: "Entity Topic Mapping",
    Value: "entitytopicmapping",
    Description: "entitytopicmapping is custom a reflookup for ...",
    custom: true
  },
  // Unavailable in admin
  { Title: "Entity Type", Value: "EntityType", Description: "EntityType is a reflookup for ...", custom: false },
  // Unavailable in admin
  {
    Title: "Ethnicity Types",
    Value: "EthnicityType",
    Description: "ethnicitytype is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Exit Reason Codes",
    Value: "ExitReasonCode",
    Description: "ExitReasonCode is a reflookup for ...",
    custom: false
  },
  {
    Title: "Financial Basis Type",
    Value: "FinancialBasisType",
    Description: "FinancialBasisType is a reflookup for ...",
    custom: false
  },
  {
    Title: "Financial Categories",
    Value: "FinancialCategoryType",
    Description: "FinancialCategoryType is a reflookup for ...",
    custom: false
  },
  {
    Title: "Financial Type",
    Value: "FinancialType",
    Description: "FinancialType is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Fiscal Periods",
    Value: "FiscalPeriodCode",
    Description: "FiscalPeriodCode is a reflookup for ...",
    custom: false
  },
  { Title: "Gender Types", Value: "GenderType", Description: "gendertype is custom a reflookup for ...", custom: true },
  { Title: "GLaccount", Value: "glaccount", Description: "glaccount is custom a reflookup for ...", custom: true },
  // Unavailable in admin
  {
    Title: "GLAccount Mapping Type",
    Value: "GLAccountMappingType",
    Description: "GLAccountMappingType is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Grade Classification Types",
    Value: "GradeClassificationType",
    Description: "GradeClassificationType is a reflookup for ...",
    custom: false
  },
  {
    Title: "Grade Scale Types",
    Value: "GradeScaleType",
    Description: "gradescaletype is custom a reflookup for ...",
    custom: true
  },
  { Title: "Grade Types", Value: "GradeType", Description: "gradetype is a reflookup for ...", custom: false },
  { Title: "Hold type", Value: "HoldType", Description: "holdtype is custom a reflookup for ...", custom: true },
  {
    Title: "Institution Status Codes",
    Value: "InstitutionStatusCode",
    Description: "institutionstatuscode is a reflookup for ...",
    custom: false
  },
  {
    Title: "Instructor Types",
    Value: "InstructorType",
    Description: "instructortype is a reflookup for ...",
    custom: false
  },
  {
    Title: "Marital Status Types",
    Value: "MaritalStatusType",
    Description: "maritalstatustype is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Meeting Information Type",
    Value: "MeetingInformationType",
    Description: "meetinginformationtype is a reflookup for ...",
    custom: false
  },
  { Title: "Meeting Types", Value: "MeetingType", Description: "meetingtype is a reflookup for ...", custom: false },
  {
    Title: "Membership Program",
    Value: "MembershipProgram",
    Description: "membershipprogram is a reflookup for ...",
    custom: false
  },
  { Title: "Metric", Value: "Metric", Description: "metric is custom a reflookup for ...", custom: true },
  { Title: "Metric Types", Value: "MetricType", Description: "metrictype is a reflookup for ...", custom: false },
  {
    Title: "Offering Group Policy Type",
    Value: "OfferingGroupPolicyType",
    Description: "offeringgrouppolicytype is custom a reflookup for ...",
    custom: true
  },
  // Unavailable in admin
  {
    Title: "Offering Mapping Type",
    Value: "OfferingMappingType",
    Description: "offeringmappingtype is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Order Group Type",
    Value: "OrderGroupType",
    Description: "ordergrouptype is custom a reflookup for ...",
    custom: true
  },
  // Unavailable in admin
  {
    Title: "Organization Role type",
    Value: "OrganizationRoleType",
    Description: "organizationroletype is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Organization Types",
    Value: "OrganizationType",
    Description: "organizationtype is a reflookup for ...",
    custom: true
  },
  { Title: "Package Types", Value: "PackageType", Description: "packagetype is a reflookup for ...", custom: false },
  {
    Title: "Part-time/Full-time Status Codes",
    Value: "PartTimeFullTimeStatusCode",
    Description: "parttimefulltimestatuscode is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Payment Base Types",
    Value: "BasePaymentType",
    Description: "BasePaymentType is a reflookup for ...",
    custom: false
  },
  {
    Title: "Payment Types",
    Value: "PaymentType",
    Description: "BasePaymentType is a reflookup for ...",
    custom: true
  },
  {
    Title: "Payment Gateway Account",
    Value: "PaymentGatewayAccount",
    Description: "paymentgatewayaccount is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Payment Gateway Activity Status",
    Value: "PaymentGatewayActivityStatus",
    Description: "paymentgatewayactivitystatus is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Payment Relationship Type",
    Value: "PaymentRelationshipType",
    Description: "paymentrelationshiptype is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Person Mapping Type",
    Value: "PersonMappingType",
    Description: "personmappingtype is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  { Title: "Postal Codes", Value: "PostalCode", Description: "PostalCode is a reflookup for ...", custom: true },
  {
    Title: "Preference Value Type",
    Value: "PreferenceValueType",
    Description: "preferencevaluetype is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Product Category",
    Value: "ProductCategory",
    Description: "productcategory is a reflookup for ...",
    custom: false
  },
  {
    Title: "Program Email Event",
    Value: "ProgramEmailEvent",
    Description: "programemailevent is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Program Financial Item Type",
    Value: "programfinancialitemtype",
    Description: "programfinancialitemtype is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Question Event",
    Value: "QuestionEvent",
    Description: "questionevent is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Question Group",
    Value: "QuestionGroup",
    Description: "questiongroup is a reflookup for ...",
    custom: false
  },
  { Title: "Reason", Value: "Reason", Description: "reason is custom a reflookup for ...", custom: true },
  { Title: "Reason Type", Value: "ReasonType", Description: "reasontype is a reflookup for ...", custom: false },
  {
    Title: "Refund Policy Types",
    Value: "RefundPolicyType",
    Description: "refundpolicytype is a reflookup for ...",
    custom: false
  },
  { Title: "Region Code", Value: "RegionCode", Description: "regioncode is custom a reflookup for ...", custom: true },
  // Unavailable in admin
  {
    Title: "Religion Types",
    Value: "ReligionType",
    Description: "religiontype is custom a reflookup for ...",
    custom: true
  },
  { Title: "Request Type", Value: "RequestType", Description: "requesttype is a reflookup for ...", custom: false },
  // Unavailable in admin
  { Title: "Resource Types", Value: "ResourceType", Description: "resourcetype is a reflookup for ...", custom: false },
  { Title: "Room Use Types", Value: "RoomUseType", Description: "roomusetype is a reflookup for ...", custom: false },
  {
    Title: "School Education Codes",
    Value: "SchoolCode",
    Description: "schoolcode is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Secret Question Type",
    Value: "SecretQuestionType",
    Description: "secretquestiontype is a reflookup for ...",
    custom: false
  },
  {
    Title: "Section Mapping Type",
    Value: "SectionMappingType",
    Description: "sectionmappingtype is a reflookup for ...",
    custom: false
  },
  // Unavailable in admin
  {
    Title: "Section Notice Type",
    Value: "SectionNoticeType",
    Description: "sectionnoticetype is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "Section Role Type",
    Value: "SectionRoleType",
    Description: "sectionroletype is a reflookup for ...",
    custom: false
  },
  {
    Title: "Section Roster Status Codes",
    Value: "SectionRosterStatusCode",
    Description: "sectionrosterstatuscode is a reflookup for ...",
    custom: false
  },
  { Title: "Source Module", Value: "SourceModule", Description: "sourcemodule is a reflookup for ...", custom: false },
  // Unavailable in admin
  { Title: "SQL State", Value: "SqlState", Description: "sqlstate is custom a reflookup for ...", custom: true },
  // Unavailable in admin
  {
    Title: "Student Status Codes",
    Value: "StudentStatusCode",
    Description: "studentstatuscode is a reflookup for ...",
    custom: false
  },
  {
    Title: "System Event",
    Value: "SystemEvent",
    Description: "systemevent is custom a reflookup for ...",
    custom: true
  },
  // Unavailable in admin
  { Title: "Tag", Value: "Tag", Description: "tag is custom a reflookup for ...", custom: true },
  { Title: "Tag Type", Value: "TagType", Description: "tagtype is custom a reflookup for ...", custom: true },
  {
    Title: "Telephone Type",
    Value: "TelephoneType",
    Description: "telephonetype is a reflookup for ...",
    custom: false
  },
  { Title: "Term", Value: "Term", Description: "transcripttype is a reflookup for ...", custom: true },
  { Title: "Term Type", Value: "TermType", Description: "termtype is a reflookup for ...", custom: false },
  { Title: "Timer Type", Value: "TimerType", Description: "timertype is a reflookup for ...", custom: false },
  // Unavailable in admin
  {
    Title: "Transcript Type",
    Value: "TranscriptType",
    Description: "transcripttype is a reflookup for ...",
    custom: false
  }
]

export const getReferenceListTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "Title",
      render: (text: any, record: any) => renderLink(`/reference-data/${record.Value}`, text, isModal),
      sorter: (a: any, b: any) => sortByString(a.Title, b.Title)
    },
    {
      title: "Description",
      dataIndex: "Description"
    }
  ]
  return {
    columns,
    searchFunc: (Params) => {
      return Promise.resolve({
        data: ReferenceList.filter((x) => {
          if (Params.Name) {
            let result
            try {
              result = x.Title.search(Params.Name) > -1
            } catch (error) {
              result = true
            }
            return result
          }
          return x
        }),
        success: true,
        code: 200,
        error: ""
      })
    }
  }
}

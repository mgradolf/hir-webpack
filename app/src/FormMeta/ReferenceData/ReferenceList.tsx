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

  { Title: "Account Type", Value: "AccountType", Description: "AccountType is a reflookup for ...", custom: false },

  { Title: "Address Type", Value: "AddressType", Description: "AddressType is a reflookup for ...", custom: false },

  // {
  //   Title: "Affiliated OrgMapping Type",
  //   Value: "AffiliatedOrgMappingType",
  //   Description: "AffiliatedOrgMappingType is a reflookup for ...",
  //   custom: false
  // },

  {
    Title: "Attendance Unit",
    Value: "AttendanceUnit",
    Description: "AttendanceUnit is a reflookup for ...",
    custom: false
  },

  {
    Title: "Base Payment Type",
    Value: "BasePaymentType",
    Description: "BasePaymentType is a reflookup for ...",
    custom: false
  },

  {
    Title: "Payment Types",
    Value: "PaymentType",
    Description: "PaymentType is a reflookup for ...",
    custom: true
  },

  {
    Title: "Cancel Reason Code",
    Value: "CancelReasonCode",
    Description: "CancelReasonCode is a reflookup for ...",
    custom: false
  },

  { Title: "Catalog Type", Value: "CatalogType", Description: "CatalogType is a reflookup for ...", custom: false },

  {
    Title: "Certificate Category Type",
    Value: "CertificateCategoryType",
    Description: "CertificateCategoryType is a reflookup for ...",
    custom: false
  },

  {
    Title: "Class Status Code",
    Value: "ClassStatusCode",
    Description: "ClassStatusCode is a reflookup for ...",
    custom: false
  },

  {
    Title: "Comment Category",
    Value: "CommentCategory",
    Description: "CommentCategory is a reflookup for ...",
    custom: false
  },

  {
    Title: "Credential Type",
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

  { Title: "CreditType", Value: "CreditType", Description: "CreditType is a reflookup for ...", custom: false },

  {
    Title: "Data Relationship Type",
    Value: "DataRelationshipType",
    Description: "DataRelationshipType is a reflookup for ...",
    custom: false
  },

  { Title: "Delivery Mode", Value: "DeliveryMode", Description: "DeliveryMode is a reflookup for ...", custom: false },

  {
    Title: "Disability Type",
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

  {
    Title: "Discount Group",
    Value: "DiscountGroup",
    Description: "DiscountGroup is a reflookup for ...",
    custom: false
  },

  { Title: "Duration Type", Value: "DurationType", Description: "DurationType is a reflookup for ...", custom: false },

  { Title: "Email Type", Value: "EmailType", Description: "EmailType is a reflookup for ...", custom: false },

  { Title: "Entity Type", Value: "EntityType", Description: "EntityType is a reflookup for ...", custom: false },

  {
    Title: "Exit Reason Code",
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
    Title: "Financial Category Type",
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

  {
    Title: "Fiscal Period Code",
    Value: "FiscalPeriodCode",
    Description: "FiscalPeriodCode is a reflookup for ...",
    custom: false
  },

  // {
  //   Title: "Gateway Activity Event",
  //   Value: "gatewayactivityevent",
  //   Description: "gatewayactivityevent is a reflookup for ...",
  //   custom: false
  // },

  {
    Title: "GLAccount Mapping Type",
    Value: "GLAccountMappingType",
    Description: "GLAccountMappingType is a reflookup for ...",
    custom: false
  },

  {
    Title: "Grade Classification Type",
    Value: "GradeClassificationType",
    Description: "GradeClassificationType is a reflookup for ...",
    custom: false
  },

  { Title: "Grade type", Value: "gradetype", Description: "gradetype is a reflookup for ...", custom: false },

  {
    Title: "Institution Status Code",
    Value: "institutionstatuscode",
    Description: "institutionstatuscode is a reflookup for ...",
    custom: false
  },

  {
    Title: "Instructor Types",
    Value: "instructortype",
    Description: "instructortype is a reflookup for ...",
    custom: false
  },

  // {
  //   Title: "Item Product Type",
  //   Value: "itemproducttype",
  //   Description: "itemproducttype is a reflookup for ...",
  //   custom: false
  // },

  // { Title: "Item Type", Value: "itemtype", Description: "itemtype is a reflookup for ...", custom: false },

  {
    Title: "Meeting Information Type",
    Value: "meetinginformationtype",
    Description: "meetinginformationtype is a reflookup for ...",
    custom: false
  },

  { Title: "Meeting Type", Value: "meetingtype", Description: "meetingtype is a reflookup for ...", custom: false },

  {
    Title: "Membership Program",
    Value: "membershipprogram",
    Description: "membershipprogram is a reflookup for ...",
    custom: false
  },

  { Title: "Metric Type", Value: "metrictype", Description: "metrictype is a reflookup for ...", custom: false },

  {
    Title: "Offering Mapping Type",
    Value: "offeringmappingtype",
    Description: "offeringmappingtype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Organization Role type",
    Value: "organizationroletype",
    Description: "organizationroletype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Organization Types",
    Value: "organizationtype",
    Description: "organizationtype is a reflookup for ...",
    custom: true
  },

  { Title: "Package Type", Value: "packagetype", Description: "packagetype is a reflookup for ...", custom: false },

  {
    Title: "Payment Gateway Account",
    Value: "paymentgatewayaccount",
    Description: "paymentgatewayaccount is a reflookup for ...",
    custom: false
  },

  {
    Title: "Payment Gateway Activity Status",
    Value: "paymentgatewayactivitystatus",
    Description: "paymentgatewayactivitystatus is a reflookup for ...",
    custom: false
  },

  {
    Title: "Payment Relationship Type",
    Value: "paymentrelationshiptype",
    Description: "paymentrelationshiptype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Person Mapping Type",
    Value: "personmappingtype",
    Description: "personmappingtype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Preference Value Type",
    Value: "preferencevaluetype",
    Description: "preferencevaluetype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Product Category",
    Value: "productcategory",
    Description: "productcategory is a reflookup for ...",
    custom: false
  },

  {
    Title: "Program Financial Item Type",
    Value: "programfinancialitemtype",
    Description: "programfinancialitemtype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Question Event",
    Value: "questionevent",
    Description: "questionevent is a reflookup for ...",
    custom: false
  },

  {
    Title: "Question Group",
    Value: "questiongroup",
    Description: "questiongroup is a reflookup for ...",
    custom: false
  },

  { Title: "Reason Type", Value: "reasontype", Description: "reasontype is a reflookup for ...", custom: false },

  {
    Title: "Refund Policy Type",
    Value: "refundpolicytype",
    Description: "refundpolicytype is a reflookup for ...",
    custom: false
  },

  { Title: "Request Type", Value: "requesttype", Description: "requesttype is a reflookup for ...", custom: false },

  { Title: "Resource Type", Value: "resourcetype", Description: "resourcetype is a reflookup for ...", custom: false },

  { Title: "Room Use Type", Value: "roomusetype", Description: "roomusetype is a reflookup for ...", custom: false },

  {
    Title: "Secret Question Type",
    Value: "secretquestiontype",
    Description: "secretquestiontype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Postal Codes",
    Value: "PostalCode",
    Description: "PostalCode is a reflookup for ...",
    custom: true
  },

  {
    Title: "Section Mapping Type",
    Value: "sectionmappingtype",
    Description: "sectionmappingtype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Section Role Type",
    Value: "sectionroletype",
    Description: "sectionroletype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Section Roster Status Code",
    Value: "sectionrosterstatuscode",
    Description: "sectionrosterstatuscode is a reflookup for ...",
    custom: false
  },

  { Title: "Source Module", Value: "sourcemodule", Description: "sourcemodule is a reflookup for ...", custom: false },

  {
    Title: "Student Status Code",
    Value: "studentstatuscode",
    Description: "studentstatuscode is a reflookup for ...",
    custom: false
  },

  {
    Title: "Telephone Type",
    Value: "telephonetype",
    Description: "telephonetype is a reflookup for ...",
    custom: false
  },

  { Title: "Term Type", Value: "termtype", Description: "termtype is a reflookup for ...", custom: false },

  { Title: "Timer Type", Value: "timertype", Description: "timertype is a reflookup for ...", custom: false },

  {
    Title: "Term",
    Value: "Term",
    Description: "transcripttype is a reflookup for ...",
    custom: true
  },

  {
    Title: "Transcript Type",
    Value: "transcripttype",
    Description: "transcripttype is a reflookup for ...",
    custom: false
  },

  {
    Title: "Account Transaction Type",
    Value: "AccountTransactionType",
    Description: "AccountTransactionType is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Affiliation Role Type",
    Value: "affiliationroletype",
    Description: "affiliationroletype is custom a reflookup for ...",
    custom: true
  },

  { Title: "Cip Code", Value: "cipcode", Description: "cipcode is custom a reflookup for ...", custom: true },

  {
    Title: "Country Codes",
    Value: "CountryCode",
    Description: "CountryCode is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Citizenship Types",
    Value: "CitizenshipType",
    Description: "CitizenshipType is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Discount Type",
    Value: "discounttype",
    Description: "discounttype is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Duedate Policy",
    Value: "duedatepolicy",
    Description: "duedatepolicy is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Entity Topic Mapping",
    Value: "entitytopicmapping",
    Description: "entitytopicmapping is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Ethnicity Types",
    Value: "ethnicitytype",
    Description: "ethnicitytype is custom a reflookup for ...",
    custom: true
  },

  { Title: "Gender Types", Value: "gendertype", Description: "gendertype is custom a reflookup for ...", custom: true },

  { Title: "GLaccount", Value: "glaccount", Description: "glaccount is custom a reflookup for ...", custom: true },

  {
    Title: "Grade Scale Types",
    Value: "gradescaletype",
    Description: "gradescaletype is custom a reflookup for ...",
    custom: true
  },

  { Title: "Hold type", Value: "holdtype", Description: "holdtype is custom a reflookup for ...", custom: true },

  {
    Title: "Marital Status Types",
    Value: "maritalstatustype",
    Description: "maritalstatustype is custom a reflookup for ...",
    custom: true
  },

  { Title: "Metric", Value: "metric", Description: "metric is custom a reflookup for ...", custom: true },

  {
    Title: "Offering Group Policy Type",
    Value: "offeringgrouppolicytype",
    Description: "offeringgrouppolicytype is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Order Group Type",
    Value: "ordergrouptype",
    Description: "ordergrouptype is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Part-time/Full-time Status Code",
    Value: "parttimefulltimestatuscode",
    Description: "parttimefulltimestatuscode is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Program Email Event",
    Value: "programemailevent",
    Description: "programemailevent is custom a reflookup for ...",
    custom: true
  },

  { Title: "Reason", Value: "reason", Description: "reason is custom a reflookup for ...", custom: true },

  { Title: "Region Code", Value: "regioncode", Description: "regioncode is custom a reflookup for ...", custom: true },

  {
    Title: "Religion Types",
    Value: "religiontype",
    Description: "religiontype is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "School Education Code",
    Value: "schoolcode",
    Description: "schoolcode is custom a reflookup for ...",
    custom: true
  },

  {
    Title: "Section Notice Type",
    Value: "sectionnoticetype",
    Description: "sectionnoticetype is custom a reflookup for ...",
    custom: true
  },

  { Title: "SQL State", Value: "sqlstate", Description: "sqlstate is custom a reflookup for ...", custom: true },

  {
    Title: "System Event",
    Value: "systemevent",
    Description: "systemevent is custom a reflookup for ...",
    custom: true
  },

  { Title: "Tag", Value: "tag", Description: "tag is custom a reflookup for ...", custom: true },

  { Title: "Tag Type", Value: "tagtype", Description: "tagtype is custom a reflookup for ...", custom: true }
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

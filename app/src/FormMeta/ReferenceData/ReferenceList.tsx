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
    Title: "AcademicStandingType",
    Value: "AcademicStandingType",
    Description: "AcademicStandingType is a reflookup for ...",
    custom: false
  },
  {
    Title: "AccountAffiliationStatus",
    Value: "AccountAffiliationStatus",
    Description: "AccountAffiliationStatus is a reflookup for ...",
    custom: false
  },
  { Title: "AccountType", Value: "AccountType", Description: "AccountType is a reflookup for ...", custom: false },
  { Title: "AddressType", Value: "AddressType", Description: "AddressType is a reflookup for ...", custom: false },
  {
    Title: "AffiliatedOrgMappingType",
    Value: "AffiliatedOrgMappingType",
    Description: "AffiliatedOrgMappingType is a reflookup for ...",
    custom: false
  },
  {
    Title: "AttendanceUnit",
    Value: "AttendanceUnit",
    Description: "AttendanceUnit is a reflookup for ...",
    custom: false
  },
  {
    Title: "BasePaymentType",
    Value: "BasePaymentType",
    Description: "BasePaymentType is a reflookup for ...",
    custom: false
  },
  {
    Title: "CancelReasonCode",
    Value: "CancelReasonCode",
    Description: "CancelReasonCode is a reflookup for ...",
    custom: false
  },
  { Title: "CatalogType", Value: "CatalogType", Description: "CatalogType is a reflookup for ...", custom: false },
  {
    Title: "CertificateCategoryType",
    Value: "CertificateCategoryType",
    Description: "CertificateCategoryType is a reflookup for ...",
    custom: false
  },
  {
    Title: "ClassStatusCode",
    Value: "ClassStatusCode",
    Description: "ClassStatusCode is a reflookup for ...",
    custom: false
  },
  {
    Title: "CommentCategory",
    Value: "CommentCategory",
    Description: "CommentCategory is a reflookup for ...",
    custom: false
  },
  {
    Title: "CredentialType",
    Value: "CredentialType",
    Description: "CredentialType is a reflookup for ...",
    custom: false
  },
  {
    Title: "CreditHourType",
    Value: "CreditHourType",
    Description: "CreditHourType is a reflookup for ...",
    custom: false
  },
  { Title: "CreditType", Value: "CreditType", Description: "CreditType is a reflookup for ...", custom: false },
  {
    Title: "DataRelationshipType",
    Value: "DataRelationshipType",
    Description: "DataRelationshipType is a reflookup for ...",
    custom: false
  },
  { Title: "DeliveryMode", Value: "DeliveryMode", Description: "DeliveryMode is a reflookup for ...", custom: false },
  {
    Title: "DisabilityType",
    Value: "DisabilityType",
    Description: "DisabilityType is a reflookup for ...",
    custom: false
  },
  {
    Title: "DiscountAmountType",
    Value: "DiscountAmountType",
    Description: "DiscountAmountType is a reflookup for ...",
    custom: false
  },
  {
    Title: "DiscountGroup",
    Value: "DiscountGroup",
    Description: "DiscountGroup is a reflookup for ...",
    custom: false
  },
  { Title: "DurationType", Value: "DurationType", Description: "DurationType is a reflookup for ...", custom: false },
  { Title: "EmailType", Value: "EmailType", Description: "EmailType is a reflookup for ...", custom: false },
  { Title: "EntityType", Value: "EntityType", Description: "EntityType is a reflookup for ...", custom: false },
  {
    Title: "ExitReasonCode",
    Value: "ExitReasonCode",
    Description: "ExitReasonCode is a reflookup for ...",
    custom: false
  },
  {
    Title: "FinancialBasisType",
    Value: "FinancialBasisType",
    Description: "FinancialBasisType is a reflookup for ...",
    custom: false
  },
  {
    Title: "FinancialCategoryType",
    Value: "FinancialCategoryType",
    Description: "FinancialCategoryType is a reflookup for ...",
    custom: false
  },
  {
    Title: "FinancialType",
    Value: "FinancialType",
    Description: "FinancialType is a reflookup for ...",
    custom: false
  },
  {
    Title: "FiscalPeriodCode",
    Value: "FiscalPeriodCode",
    Description: "FiscalPeriodCode is a reflookup for ...",
    custom: false
  },
  {
    Title: "gatewayactivityevent",
    Value: "gatewayactivityevent",
    Description: "gatewayactivityevent is a reflookup for ...",
    custom: false
  },
  {
    Title: "GLAccountMappingType",
    Value: "GLAccountMappingType",
    Description: "GLAccountMappingType is a reflookup for ...",
    custom: false
  },
  {
    Title: "GradeClassificationType",
    Value: "GradeClassificationType",
    Description: "GradeClassificationType is a reflookup for ...",
    custom: false
  },
  { Title: "gradetype", Value: "gradetype", Description: "gradetype is a reflookup for ...", custom: false },
  {
    Title: "institutionstatuscode",
    Value: "institutionstatuscode",
    Description: "institutionstatuscode is a reflookup for ...",
    custom: false
  },
  {
    Title: "instructortype",
    Value: "instructortype",
    Description: "instructortype is a reflookup for ...",
    custom: false
  },
  {
    Title: "itemproducttype",
    Value: "itemproducttype",
    Description: "itemproducttype is a reflookup for ...",
    custom: false
  },
  { Title: "itemtype", Value: "itemtype", Description: "itemtype is a reflookup for ...", custom: false },
  {
    Title: "meetinginformationtype",
    Value: "meetinginformationtype",
    Description: "meetinginformationtype is a reflookup for ...",
    custom: false
  },
  { Title: "meetingtype", Value: "meetingtype", Description: "meetingtype is a reflookup for ...", custom: false },
  {
    Title: "membershipprogram",
    Value: "membershipprogram",
    Description: "membershipprogram is a reflookup for ...",
    custom: false
  },
  { Title: "metrictype", Value: "metrictype", Description: "metrictype is a reflookup for ...", custom: false },
  {
    Title: "offeringmappingtype",
    Value: "offeringmappingtype",
    Description: "offeringmappingtype is a reflookup for ...",
    custom: false
  },
  {
    Title: "organizationroletype",
    Value: "organizationroletype",
    Description: "organizationroletype is a reflookup for ...",
    custom: false
  },
  {
    Title: "organizationtype",
    Value: "organizationtype",
    Description: "organizationtype is a reflookup for ...",
    custom: false
  },
  { Title: "packagetype", Value: "packagetype", Description: "packagetype is a reflookup for ...", custom: false },
  {
    Title: "paymentgatewayaccount",
    Value: "paymentgatewayaccount",
    Description: "paymentgatewayaccount is a reflookup for ...",
    custom: false
  },
  {
    Title: "paymentgatewayactivitystatus",
    Value: "paymentgatewayactivitystatus",
    Description: "paymentgatewayactivitystatus is a reflookup for ...",
    custom: false
  },
  {
    Title: "paymentrelationshiptype",
    Value: "paymentrelationshiptype",
    Description: "paymentrelationshiptype is a reflookup for ...",
    custom: false
  },
  {
    Title: "personmappingtype",
    Value: "personmappingtype",
    Description: "personmappingtype is a reflookup for ...",
    custom: false
  },
  {
    Title: "preferencevaluetype",
    Value: "preferencevaluetype",
    Description: "preferencevaluetype is a reflookup for ...",
    custom: false
  },
  {
    Title: "productcategory",
    Value: "productcategory",
    Description: "productcategory is a reflookup for ...",
    custom: false
  },
  {
    Title: "programfinancialitemtype",
    Value: "programfinancialitemtype",
    Description: "programfinancialitemtype is a reflookup for ...",
    custom: false
  },
  {
    Title: "questionevent",
    Value: "questionevent",
    Description: "questionevent is a reflookup for ...",
    custom: false
  },
  {
    Title: "questiongroup",
    Value: "questiongroup",
    Description: "questiongroup is a reflookup for ...",
    custom: false
  },
  { Title: "reasontype", Value: "reasontype", Description: "reasontype is a reflookup for ...", custom: false },
  {
    Title: "refundpolicytype",
    Value: "refundpolicytype",
    Description: "refundpolicytype is a reflookup for ...",
    custom: false
  },
  { Title: "requesttype", Value: "requesttype", Description: "requesttype is a reflookup for ...", custom: false },
  { Title: "resourcetype", Value: "resourcetype", Description: "resourcetype is a reflookup for ...", custom: false },
  { Title: "roomusetype", Value: "roomusetype", Description: "roomusetype is a reflookup for ...", custom: false },
  {
    Title: "secretquestiontype",
    Value: "secretquestiontype",
    Description: "secretquestiontype is a reflookup for ...",
    custom: false
  },
  {
    Title: "sectionmappingtype",
    Value: "sectionmappingtype",
    Description: "sectionmappingtype is a reflookup for ...",
    custom: false
  },
  {
    Title: "sectionroletype",
    Value: "sectionroletype",
    Description: "sectionroletype is a reflookup for ...",
    custom: false
  },
  {
    Title: "sectionrosterstatuscode",
    Value: "sectionrosterstatuscode",
    Description: "sectionrosterstatuscode is a reflookup for ...",
    custom: false
  },
  { Title: "sourcemodule", Value: "sourcemodule", Description: "sourcemodule is a reflookup for ...", custom: false },
  {
    Title: "studentstatuscode",
    Value: "studentstatuscode",
    Description: "studentstatuscode is a reflookup for ...",
    custom: false
  },
  {
    Title: "telephonetype",
    Value: "telephonetype",
    Description: "telephonetype is a reflookup for ...",
    custom: false
  },
  { Title: "termtype", Value: "termtype", Description: "termtype is a reflookup for ...", custom: false },
  { Title: "timertype", Value: "timertype", Description: "timertype is a reflookup for ...", custom: false },
  {
    Title: "transcripttype",
    Value: "transcripttype",
    Description: "transcripttype is a reflookup for ...",
    custom: false
  },
  {
    Title: "accounttransactiontype",
    Value: "accounttransactiontype",
    Description: "accounttransactiontype is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "affiliationroletype",
    Value: "affiliationroletype",
    Description: "affiliationroletype is custom a reflookup for ...",
    custom: true
  },
  { Title: "cipcode", Value: "cipcode", Description: "cipcode is custom a reflookup for ...", custom: true },
  {
    Title: "CountryCode",
    Value: "CountryCode",
    Description: "CountryCode is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "CitizenshipType",
    Value: "CitizenshipType",
    Description: "CitizenshipType is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "discounttype",
    Value: "discounttype",
    Description: "discounttype is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "duedatepolicy",
    Value: "duedatepolicy",
    Description: "duedatepolicy is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "entitytopicmapping",
    Value: "entitytopicmapping",
    Description: "entitytopicmapping is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "ethnicitytype",
    Value: "ethnicitytype",
    Description: "ethnicitytype is custom a reflookup for ...",
    custom: true
  },
  { Title: "gendertype", Value: "gendertype", Description: "gendertype is custom a reflookup for ...", custom: true },
  { Title: "glaccount", Value: "glaccount", Description: "glaccount is custom a reflookup for ...", custom: true },
  {
    Title: "gradescaletype",
    Value: "gradescaletype",
    Description: "gradescaletype is custom a reflookup for ...",
    custom: true
  },
  { Title: "holdtype", Value: "holdtype", Description: "holdtype is custom a reflookup for ...", custom: true },
  {
    Title: "maritalstatustype",
    Value: "maritalstatustype",
    Description: "maritalstatustype is custom a reflookup for ...",
    custom: true
  },
  { Title: "metric", Value: "metric", Description: "metric is custom a reflookup for ...", custom: true },
  {
    Title: "offeringgrouppolicytype",
    Value: "offeringgrouppolicytype",
    Description: "offeringgrouppolicytype is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "ordergrouptype",
    Value: "ordergrouptype",
    Description: "ordergrouptype is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "parttimefulltimestatuscode",
    Value: "parttimefulltimestatuscode",
    Description: "parttimefulltimestatuscode is custom a reflookup for ...",
    custom: true
  },
  {
    Title: "programemailevent",
    Value: "programemailevent",
    Description: "programemailevent is custom a reflookup for ...",
    custom: true
  },
  { Title: "reason", Value: "reason", Description: "reason is custom a reflookup for ...", custom: true },
  { Title: "regioncode", Value: "regioncode", Description: "regioncode is custom a reflookup for ...", custom: true },
  {
    Title: "religiontype",
    Value: "religiontype",
    Description: "religiontype is custom a reflookup for ...",
    custom: true
  },
  { Title: "schoolcode", Value: "schoolcode", Description: "schoolcode is custom a reflookup for ...", custom: true },
  {
    Title: "sectionnoticetype",
    Value: "sectionnoticetype",
    Description: "sectionnoticetype is custom a reflookup for ...",
    custom: true
  },
  { Title: "sqlstate", Value: "sqlstate", Description: "sqlstate is custom a reflookup for ...", custom: true },
  {
    Title: "systemevent",
    Value: "systemevent",
    Description: "systemevent is custom a reflookup for ...",
    custom: true
  },
  { Title: "tag", Value: "tag", Description: "tag is custom a reflookup for ...", custom: true },
  { Title: "tagtype", Value: "tagtype", Description: "tagtype is custom a reflookup for ...", custom: true }
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

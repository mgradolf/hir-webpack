import { getFinancialsByTarget } from "~/ApiServices/BizApi/financial/financialIF"
import { searchInstructorOfferings, searchSectionInstructor } from "~/ApiServices/Service/InstructorService"
import { getFacultySchedule } from "~/ApiServices/Service/PersonService"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean, renderDateTime } from "~/Component/Common/ResponsiveTable"

export const getInstructorMeta = (person: any, instructor: any): IDetailsTabMeta[] => {
  const tabMetas: IDetailsTabMeta[] = []

  const instructorInfo: CardContainer = {
    title: "Instructor Info",
    contents: [
      { label: "Serial Num", value: instructor?.FacultySerialNum },
      { label: "Organization", value: instructor?.OrganizationName },
      { label: "Status", value: instructor?.InstitutionStatusCodeName },
      { label: "Type", value: instructor?.InstructorTypeName },
      { label: "Active", value: instructor?.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [instructorInfo]
  }

  tabMetas.push({ tabTitle: "Summary", tabType: "summary", tabMeta: summaryMeta })
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
        searchFunc: (Params: any) => getFinancialsByTarget(instructor.FacultyID, 2),
        responsiveColumnIndices: [],
        expandableColumnIndices: [],
        searchParams: { FacultyID: instructor.FacultyID, FinancialTypeID: 2 },
        refreshEventName: "REFRESH_FACULTY_OFFERINGS_TAB"
      }
    }
  })

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
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: "REFRESH_FACULTY_OFFERINGS_TAB"
      }
    }
  })

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
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: "REFRESH_FACULTY_CONTACT_TAB"
      }
    }
  })
  return tabMetas
}

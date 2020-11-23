import { CardContainer } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"

// CourseID: null
// CreationDate: null
// DefaultSectionTypeID: 2050
// EndTermID: 1061
// Name: "werwer"
// OfferingID: 6865
// OfferingStatusCodeID: 0
// OfferingStatusReleaseID: 1
// OfferingTypeID: 3074
// OfferingUsageType: 1
// OrganizationID: 3085
// PaymentGatewayAccountID: 12
// RecurrenceRule: null
// StartTermID: 1037
// TerminationDate: null
// URL: "32rwefweerer"
// oca: 1
// CreationDate: null
// OfferingID: 6865
// : "ASCA"
// TerminationDate: null
export const getOfferingDetailsMeta = (offering: { [key: string]: any }): CardContainer[] => {
  const offeringInfo: CardContainer = {
    title: offering.OfferingCode,
    contents: [
      { label: "Name", value: offering.OfferingName, render: undefined },
      { label: "Type", value: offering.OfferingTypeName, render: undefined },
      { label: "Section Type", value: offering.SectionTypeName, render: undefined },
      { label: "Description", value: offering.OfferingDescription, render: undefined },
      { label: "Effective Creation Date", value: offering.EffectiveCreationDate, render: renderDate },
      { label: "Effective Termination Date", value: offering.EffectiveTerminationDate, render: renderDate },
      { label: "OrganizationName", value: offering.OrganizationName, render: undefined },
      { label: "Status ", value: offering.StatusCode, render: undefined },
      { label: "Approval Process ", value: offering.HasApprovalProcess, render: renderBoolean },
      { label: "Quick Admit", value: offering.IsQuickAdmit, render: renderBoolean },
      { label: "Submit Inquiry To User", value: offering.SubmitInquiryToUserID, render: undefined },
      { label: "Modifie Date", value: offering.ModifiedDate, render: renderDate },
      { label: "Modified By", value: offering.ModifiedByUserID, render: undefined }
    ]
  }

  return [offeringInfo]
}

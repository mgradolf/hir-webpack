import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"

import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { getRequirementGroupDetailsTableColumns } from "~/TableSearchMeta/ProgramEnrollment/RequirementGroupDetailsTableColumns"
import { REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_DETAILS_PAGE } from "~/utils/EventBus"

export const getProgressTrackingDetailsMeta = (programEnrollment: { [key: string]: any }): IDetailsMeta => {
  const info: CardContainer = {
    contents: [
      { label: "Requirement Group", value: programEnrollment.Name },
      { label: "Requirement Policy", value: programEnrollment.PolicyName },
      { label: "Expected Value", value: programEnrollment.ExpectedValue },
      { label: "Actual Value", value: programEnrollment.ActualValue }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [info]
  }

  const groupDetailsMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRequirementGroupDetailsTableColumns(programEnrollment),
      refreshEventName: `${REFRESH_PROGRAM_ENROLLMENT_REQUIREMENT_GROUP_DETAILS_PAGE}_${programEnrollment.ProgramReqGroupID}`,
      pagination: false
    }
  }

  return {
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Details",
        tabType: "table",
        tabMeta: groupDetailsMeta
      }
    ]
  }
}

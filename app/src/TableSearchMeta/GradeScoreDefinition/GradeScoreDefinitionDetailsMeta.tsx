import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"

export const getGradeScoreDefinitionDetailsMeta = (activity: { [key: string]: any }): IDetailsMeta => {
  console.log(activity)

  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Alpha Value", value: activity.AlphaValue },
      { label: "Quality Points", value: activity.QualityPoints },
      { label: "Low Bound", value: activity.LowBound },
      { label: "High Bound", value: activity.HiBound },
      { label: "Grade Classification", value: activity.GradeClassificationType },
      { label: "Attempted Hours", value: activity.AttemptedHourType },
      { label: "Earned Hours", value: activity.EarnedHourType },
      { label: "GPA Hours", value: activity.GPAHourType },
      { label: "CEU Hours", value: activity.CEUHourType }
    ]
  }

  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  return {
    pageTitle: `Grade Score Definition`,
    tabs: meta
  }
}

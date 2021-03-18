import { findGradeScoreDefinitions } from "~/ApiServices/BizApi/query/queryIf"
import { renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getGradeScoreDefinitionTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "GradeScoreDefinitionID",
      render: (text: any, record: any) => renderDetailsLink(`/data/grade-score-definition/${text}`)
    },
    {
      title: "Grade Scale",
      dataIndex: "GradeScaleType"
    },
    {
      title: "Grade Classification",
      dataIndex: "GradeClassificationType"
    },
    {
      title: "Alpha",
      dataIndex: "AlphaValue"
    },
    {
      title: "GPA Hrs",
      dataIndex: "GPAHourType"
    },
    {
      title: "CEU Hrs",
      dataIndex: "CEUHourType"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findGradeScoreDefinitions }
}

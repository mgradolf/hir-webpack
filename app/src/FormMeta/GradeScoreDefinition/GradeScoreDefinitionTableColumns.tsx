import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
//TODO: Update the API end point 
import { findGradeScoreDefinitions } from "~/ApiServices/Service/FinancialService"
import { Link } from "react-router-dom"

export const getGradeScoreDefinitionTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "GradeScoreDefinitionID",
      render: (text: any, record: any) => (
        <Link to={`/gradescoredefinition/${record.GradeScoreDefinitionID}`}>
          <ReadOutlined />
        </Link>
      )
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

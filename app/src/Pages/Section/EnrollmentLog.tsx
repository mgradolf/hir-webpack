import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getStudentEnrollmentActivity } from "~/ApiServices/Service/ActivityService"
import AcademicLogSearch from "~/Component/Common/SearchFilters"
import EnrollmentLogTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { getSectionEnrollmentActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionEnrollmentActivitySearchMeta"
import { ColumnsType } from "antd/lib/table"

export default function EnrollmentLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>({ SectionIDs: [SectionID] })
  const columns: ColumnsType<RecordType> = [
    {
      title: "Activity Date",
      dataIndex: "ActivityModifiedDate",
      width: 100
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      width: 100
    },
    {
      title: "Student Name",
      dataIndex: "SortName",
      width: 100
    },
    {
      title: "Student ID",
      dataIndex: "StudentID",
      width: 100
    },
    {
      title: "Enrollment Status",
      dataIndex: "SectionRosterStatusCodeID",
      width: 100
    },
    {
      title: "Modified By",
      dataIndex: "ActivityModifiedByName",
      width: 100
    },
    {
      title: "User Name",
      dataIndex: "SectionName",
      width: 100
    },
    {
      title: "Activity Type",
      dataIndex: "SectionID",
      width: 100
    },
    {
      title: "Creation Date",
      dataIndex: "EffectiveCreationDate",
      width: 100
    },
    {
      title: "Termination Date",
      dataIndex: "EffectiveTerminationDate",
      width: 100
    },
    {
      title: "Registration Source",
      dataIndex: "SourceID",
      width: 100
    }
  ]

  return (
    <div className="site-layout-content">
      <AcademicLogSearch
        meta={getSectionEnrollmentActivitySearchMeta(SectionID)}
        title="Find Student Enrollment Activity"
        visible={true}
        isCheckeble={false}
        hideFilters={() => console.log("s")}
        onApplyChanges={(newValues, count) => {
          const Params: any = newValues
          Params.SectionIDs = [SectionID]
          setSearchParams(Params)
          console.log(newValues)
        }}
        initialFilter={{}}
        isModalView
      />
      <EnrollmentLogTable
        columns={columns}
        searchFunc={getStudentEnrollmentActivity}
        expandableColumnIndices={[5]}
        responsiveColumnIndices={[2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        searchParams={searchParams}
        rowKey="ActivityID"
      />
    </div>
  )
}

import React, { useState } from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { getStudentEnrollmentActivity } from "~/ApiServices/Service/ActivityService"
import AcademicLogSearch from "~/Component/Common/SearchFilters"
import { renderDateTime, ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { getSectionEnrollmentActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionEnrollmentActivitySearchMeta"

export default function EnrollmentLogPage(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>({ SectionIDs: [SectionID] })
  const columns: TableColumnType = [
    {
      title: "Activity Date",
      dataIndex: "ActivityModifiedDate",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) => <Link to={`/section/${record.SectionID}`}>{text}</Link>,
      width: 100
    },
    {
      title: "Student Name",
      dataIndex: "SortName",
      render: (text: any, record: any) => <Link to={`/person/${record.StudentID}`}>{record.SortName}</Link>,
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
      render: (text: any, record: any) => (
        <Link to={`/person/${record.ActivityModifiedByUID}`}>{record.ActivityModifiedByName}</Link>
      ),
      width: 100
    },
    {
      title: "User Name",
      dataIndex: "ActivityModifiedByName",
      render: (text: any, record: any) => <Link to={`/person/${record.PersonID}`}>{text}</Link>,
      width: 100
    },
    {
      title: "Activity Type",
      dataIndex: "ActivityOperation",
      width: 100
    },
    {
      title: "Creation Date",
      dataIndex: "EffectiveCreationDate",
      render: renderDateTime,
      width: 100
    },
    {
      title: "Termination Date",
      dataIndex: "EffectiveTerminationDate",
      render: renderDateTime,
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
        meta={getSectionEnrollmentActivitySearchMeta}
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
      <ResponsiveTable
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

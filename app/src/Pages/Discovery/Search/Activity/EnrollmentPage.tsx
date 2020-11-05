import React from "react"
import { getStudentEnrollmentActivity } from "~/ApiServices/Service/ActivityService"
import { getSectionEnrollmentActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionEnrollmentActivitySearchMeta"

import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import SearchPage from "~/Component/Common/Page/SearchPage"
import { Link } from "react-router-dom"

export default function AcademicLogPage() {
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
    <SearchPage
      title="Enrollment Activity"
      initialFilter={{}}
      meta={getSectionEnrollmentActivitySearchMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: getStudentEnrollmentActivity,
        expandableColumnIndices: [5],
        responsiveColumnIndices: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        rowKey: "ActivityID",
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}

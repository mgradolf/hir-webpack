import React from "react"
import { getStudentEnrollmentActivity } from "~/ApiServices/Service/ActivityService"
import { getSectionEnrollmentActivitySearchMeta } from "~/FormMeta/SectionActivity/SectionEnrollmentActivitySearchMeta"

import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import SearchPage from "~/Component/Common/Page/SearchPage"

export default function AcademicLogPage() {
  const columns: TableColumnType = [
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
    <SearchPage
      title="Program Enrollment"
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

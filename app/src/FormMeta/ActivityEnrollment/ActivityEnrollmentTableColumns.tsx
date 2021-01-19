import React from "react"
import { Link } from "react-router-dom"
import { getStudentEnrollmentActivity } from "~/ApiServices/Service/ActivityService"
import { renderDateTime, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getActivityEnrollmentTableColumns = (isModal = false): ITableConfigProp => {
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
      title: "Student",
      dataIndex: "SortName",
      render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{text}</Link>,
      width: 100
    },
    {
      title: "Student ID",
      dataIndex: "StudentSerialNum",
      render: (text: any, record: any) => <Link to={`/person/student/${record.StudentID}`}>{text}</Link>,
      width: 100
    },
    {
      title: "Enrollment Status",
      dataIndex: "SectionRosterStatusCodeID",
      width: 100
    },
    {
      title: "Modified By",
      dataIndex: "ActivityModifiedByUID",
      width: 100
    },
    {
      title: "User Name",
      dataIndex: "ActivityModifiedByName",
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
      dataIndex: "SourceName",
      width: 100
    }
  ]
  return { columns, searchFunc: getStudentEnrollmentActivity, responsiveColumnIndices: [], expandableColumnIndices: [] }
}

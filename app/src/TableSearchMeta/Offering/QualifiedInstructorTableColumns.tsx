import React from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { searchInstructorOfferings, removeInstructorFromOffering } from "~/ApiServices/Service/InstructorService"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { eventBus, REFRESH_FACULTY_OFFERINGS_TAB, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"

export const getQualifiedInstructorTableColumns = (): ITableConfigProp => {
  const removeInstructor = (FacultyID: number, OfferingID: number) => {
    removeInstructorFromOffering({ OfferingID, FacultyID }).then((response) => {
      if (response && response.success) {
        eventBus.publish(REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE)
        eventBus.publish(REFRESH_FACULTY_OFFERINGS_TAB)
      }
    })
  }

  const columns: TableColumnType = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Offering",
      dataIndex: "OfferingName",
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Instructor",
      dataIndex: "FacultyName",
      render: (text: any, record: any) => <Link to={`/person/faculty/${record.FacultyID}`}>{text}</Link>,
      sorter: (a: any, b: any) => a.name.length - b.name.length
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Status", dataIndex: "OfferingStatus", render: renderEmail },
    { title: "Department", dataIndex: "OrganizationName", render: renderEmail },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Button danger type="primary" onClick={() => removeInstructor(record.FacultyID, record.OfferingID)}>
          Remove
        </Button>
      )
    }
  ]

  return { columns, searchFunc: searchInstructorOfferings }
}

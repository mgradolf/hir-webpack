import React from "react"
import { Button, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { searchInstructorOfferings, removeInstructorFromOffering } from "~/ApiServices/Service/InstructorService"
import { renderEmail, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { eventBus, REFRESH_FACULTY_OFFERINGS_TAB, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { DeleteOutlined } from "@ant-design/icons"

export const getQualifiedInstructorTableColumns = (): ITableConfigProp => {
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
    { title: "Status", dataIndex: "OfferingStatus" },
    { title: "Department", dataIndex: "DepartmentName" },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Tooltip title="Remove">
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() =>
              showDeleteConfirm(() => {
                return removeInstructorFromOffering({
                  OfferingID: record.OfferingID,
                  FacultyID: record.FacultyID
                }).then((x) => {
                  if (x && x.success) {
                    eventBus.publish(REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE)
                    eventBus.publish(REFRESH_FACULTY_OFFERINGS_TAB)
                  }
                  return x
                })
              })
            }
          />
        </Tooltip>
      )
    }
  ]

  return { columns, searchFunc: searchInstructorOfferings, tableName: "QualifiedInstructorTableColumns" }
}

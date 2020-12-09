import React from "react"
import { Button } from "antd"
import { Link } from "react-router-dom"
import { getQualifiedInstructors, updateInstructors } from "~/ApiServices/Service/OfferingService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"

export const getQualifiedInstructorTableColumns = (OfferingID: number): ITableConfigProp => {
  const removeInstructor = (instructorID: any) => {
    getQualifiedInstructors(OfferingID)
      .then((response) => {
        if (response && response.success) {
          return updateInstructors(
            OfferingID,
            response.data.filter((x: any) => x.instructorID !== instructorID).map((y: any) => y.instructorID)
          )
        }
      })
      .then((response) => {
        console.log("response: ", response)
        if (response?.success) {
          eventBus.publish(REFRESH_PAGE)
        }
      })
  }

  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text: any, record: any) => <Link to={`/person/faculty/${record.FacultyID}`}>{text}</Link>,
      sorter: (a: any, b: any) => a.name.length - b.name.length
    },
    { title: "Email", dataIndex: "email" },
    { title: "Telephone", dataIndex: "telephone" },
    { title: "Address", dataIndex: "Address" },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Button danger type="primary" onClick={() => removeInstructor(record.instructorID)}>
          Remove
        </Button>
      )
    }
  ]

  return { columns, searchFunc: () => getQualifiedInstructors(OfferingID) }
}

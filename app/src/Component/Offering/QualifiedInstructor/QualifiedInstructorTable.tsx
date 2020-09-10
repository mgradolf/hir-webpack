import { ITableWrapperProps } from "~/Component/Offering"
import { Row, Col } from "antd"
import React from "react"
import moment from "moment"
import ResponsiveTable from "~/Component/ResponsiveTable"

export function QualifiedInstructorTable(props: ITableWrapperProps) {
  const columns = [
    {
      title: "ID",
      dataIndex: "FacultySerialNum",
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    {
      title: "Last Name",
      dataIndex: "LastName"
    },
    {
      title: "First Name",
      dataIndex: "FirstName"
    },
    {
      title: "Status",
      dataIndex: "Status"
    },
    {
      title: "Birthday",
      dataIndex: "Birthday",

      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Gender",
      dataIndex: "GenderTypeName"
    },
    {
      title: "Ethnicity",
      dataIndex: "EthnicityTypeName"
    },
    {
      title: "Address",
      dataIndex: "Address"
    },
    {
      title: "Telephone",
      dataIndex: "TelephoneNumber"
    },
    {
      title: "Email",
      dataIndex: "EmailAddress"
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        <Row>
          <Col span="8">Organization:</Col>
          <Col span="16">{data.OrganizationName}</Col>
        </Row>
        {display && (
          <Row>
            <Col span="8">Instructor Type:</Col>
            <Col span="16">{data.InstructorType}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Deceased:</Col>
            <Col span="16">{data.IsDeceased}</Col>
          </Row>
        )}
      </div>
    )
  }

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      breakpoints={["md", "lg", "xl", "xxl"]}
      responsiveColumnIndices={[3, 4, 5, 6, 7, 8, 9]}
      rowSelection={props.rowSelection}
      expandableRowRender={expandableRowRender}
      rowKey="FacultyID"
      pagination={{ position: ["topLeft"] }}
      scroll={{ x: "fit-content" }}
    />
  )
}

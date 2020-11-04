import { ITableWrapperProps } from "~/Component/Offering/OfferingTable"
import { Row, Col } from "antd"
import React from "react"
import moment from "moment"
import { renderDate, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { Link } from "react-router-dom"

export function QualifiedInstructorTable(props: ITableWrapperProps) {
  const columns = [
    {
      title: "ID",
      dataIndex: "FacultySerialNum",
      key: "FacultySerialNum",
      render: (text: any, record: any) => <Link to={`/instructor/${record.FacultyID}`}>{record.FacultySerialNum}</Link>,
      sorter: (a: any, b: any) => a.FacultySerialNum.length - b.FacultySerialNum.length
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName"
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName"
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status"
    },
    {
      title: "Birthday",
      dataIndex: "Birthday",
      render: renderDate,
      key: "Birthday"
    },
    {
      title: "Gender",
      dataIndex: "GenderTypeName",
      key: "GenderTypeNamer"
    },
    {
      title: "Email",
      dataIndex: "EmailAddress",
      key: "EmailAddress"
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {display && (
          <Row>
            <Col span="8">ID:</Col>
            <Col span="16">{data.FacultySerialNum}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Status:</Col>
            <Col span="16">{data.Status}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Birthday:</Col>
            <Col span="16">{data.Birthday ? moment(data.Birthday).format("YYYY-MM-DD") : ""}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Gender:</Col>
            <Col span="16">{data.GenderTypeName}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Email:</Col>
            <Col span="16">{data.EmailAddress}</Col>
          </Row>
        )}
        <Row>
          <Col span="8">Ethnicity:</Col>
          <Col span="16">{data.EthnicityTypeName}</Col>
        </Row>
        <Row>
          <Col span="8">Address:</Col>
          <Col span="16">{data.Address}</Col>
        </Row>
        <Row>
          <Col span="8">Telephone:</Col>
          <Col span="16">{data.TelephoneNumber}</Col>
        </Row>
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
      breakpoints={["xxl"]}
      responsiveColumnIndices={[0, 3, 4, 5, 6]}
      rowSelection={props.rowSelection}
      expandableRowRender={expandableRowRender}
      rowKey="FacultyID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      isModal={props.isModal}
    />
  )
}

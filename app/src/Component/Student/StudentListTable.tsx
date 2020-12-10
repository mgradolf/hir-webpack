import { Row, Col } from "antd"
import React from "react"
import { renderDateTime, renderEmail, ResponsiveTable } from "~/Component/Common/ResponsiveTable"

export interface ITableWrapperProps {
  id?: string
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
  offeringID?: number
}

function StudentListTable(props: ITableWrapperProps) {
  const columns = [
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
      title: "Email",
      dataIndex: "EmailAddress",
      render: renderEmail,
      key: "EmailAddress"
    },
    {
      title: "Birth Date",
      dataIndex: "Birthday",
      key: "Birthday",
      render: renderDateTime
    },
    {
      title: "Role",
      dataIndex: "AffiliationRoleTypeName",
      key: "AffiliationRoleTypeName"
    },
    {
      title: "Status",
      dataIndex: "AccountAffiliationStatusName",
      key: "AccountAffiliationStatusName"
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {display && (
          <Row>
            <Col span="8">First Name:</Col>
            <Col span="16">{data.FirstName}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Email:</Col>
            <Col span="16">{data.EmailAddress}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Birth Date:</Col>
            <Col span="16">{data.Birthdate}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Role:</Col>
            <Col span="16">{data.Role}</Col>
          </Row>
        )}
      </div>
    )
  }

  return (
    <ResponsiveTable
      id={props.id}
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      breakpoints={["xxl"]}
      responsiveColumnIndices={[1, 2, 3, 4]}
      rowSelection={props.rowSelection}
      expandableRowRender={expandableRowRender}
      rowKey="PersonID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600 }}
    />
  )
}

export default StudentListTable

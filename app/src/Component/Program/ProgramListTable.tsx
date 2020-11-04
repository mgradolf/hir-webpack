import { Row, Col } from "antd"
import moment from "moment"
import React from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"

export interface ITableWrapperProps {
  id?: string
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
  offeringID?: number
}
function ProgramListTable(props: ITableWrapperProps) {
  const columns = [
    {
      title: "Program Code",
      dataIndex: "ProgramCode",
      key: "ProgramCode",
      sorter: (a: any, b: any) => a.ProgramCode.length - b.ProgramCode.length
    },
    {
      title: "Program Name",
      dataIndex: "Name",
      key: "Name"
    },
    {
      title: "Status",
      dataIndex: "ProgramStatusName",
      key: "ProgramStatusName"
    },
    {
      title: "Start Date",
      dataIndex: "ProgramStartDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : ""),
      key: "ProgramStartDate"
    },
    {
      title: "End Date",
      dataIndex: "ProgramEndDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : ""),
      key: "ProgramEndDate"
    },
    {
      title: "Department",
      dataIndex: "DepartmentName",
      key: "DepartmentName"
    },
    {
      title: "Certificate Name",
      dataIndex: "CertificateName",
      key: "CertificateName"
    }
  ]

  function expandableRowRender(data: any, display: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        {display && (
          <Row>
            <Col span="8">Department:</Col>
            <Col span="16">{data.DepartmentName}</Col>
          </Row>
        )}
        {display && (
          <Row>
            <Col span="8">Certificate Name:</Col>
            <Col span="16">{data.CertificateName}</Col>
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
      responsiveColumnIndices={[6, 7]}
      rowSelection={props.rowSelection}
      expandableRowRender={expandableRowRender}
      rowKey="ProgramID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      isModal={props.isModal}
    />
  )
}

export default ProgramListTable

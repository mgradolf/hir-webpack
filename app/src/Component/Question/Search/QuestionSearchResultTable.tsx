import React from "react"
import { Row, Col } from "antd"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { ColumnsType } from "antd/lib/table"
import { TableRowSelection } from "antd/lib/table/interface"

interface IQuestionSearchResultTable {
  dataSource: any[]
  loading: boolean
  isModal: boolean
  setSelectedQuestions: any
}

export default function QuestionSearchResultTable(props: IQuestionSearchResultTable) {
  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(selectedRows)
      props.setSelectedQuestions(selectedRows)
    },
    getCheckboxProps: (record: { name: string }) => ({
      name: record.name
    }),
    columnTitle: "Select"
  }
  const columns: ColumnsType<RecordType> = [
    {
      title: "Question",
      dataIndex: "PreferenceDef.Name"
    },
    {
      title: "Display Question As",
      dataIndex: "PreferenceDef.Name",
      width: 200
    },
    {
      title: "Type",
      dataIndex: "PreferenceValueTypeName"
    },
    {
      title: "Active",
      dataIndex: "PreferenceDef.IsActive"
    },
    {
      title: "Organization",
      dataIndex: "OrganizationName"
    }
  ]

  function expandableRowRender(data: any, mobileView: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        <Row>
          <Col span="10">Description:</Col>
          <Col span="14">{data.OfferingDescription}</Col>
        </Row>
        {mobileView && (
          <Row>
            <Col span="10">Offering Name:</Col>
            <Col span="14">{data.OfferingName}</Col>
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
      responsiveColumnIndices={[1, 2, 3, 4, 5]}
      expandableRowRender={expandableRowRender}
      rowKey="PreferenceDef.PreferenceDefID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ y: props.isModal ? Math.floor(window.innerHeight * 0.45) : 600, x: 600 }}
      rowSelection={{
        type: "checkbox",
        ...rowSelection
      }}
    />
  )
}

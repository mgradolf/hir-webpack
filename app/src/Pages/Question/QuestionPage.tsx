import React from "react"
import { searchQuestions } from "~/ApiServices/Service/QuestionService"

import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { Col, Row } from "antd"
// import { TableRowSelection } from "antd/lib/table/interface"
import { DROPDOWN, IFilterField, TEXT } from "~/Component/Common/SearchFilters/common"
import { getOrganizations, getPreferenceValueType } from "~/ApiServices/Service/RefLookupService"

const QuestionSearchFiltersMeta: IFilterField[] = [
  {
    label: "Name",
    inputType: TEXT,
    defaultValue: "",
    fieldName: "Name",
    ariaLabel: "Question Name"
  },
  {
    label: "Active",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "IsActive",
    ariaLabel: "Active",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Widget",
    inputType: DROPDOWN,
    defaultValue: "",
    fieldName: "PreferenceValueTypeID",
    ariaLabel: "Widget Type Select",
    refLookupService: getPreferenceValueType,
    displayKey: "Name",
    valueKey: "ID"
  }
]
export default function QuestionPage() {
  // const rowSelection: TableRowSelection<any> = {
  //   onChange: (selectedRowKeys: any, selectedRows: any) => {
  //     console.log(selectedRows)
  //     // props.setSelectedQuestions(selectedRows)
  //   },
  //   getCheckboxProps: (record: { name: string }) => ({
  //     name: record.name
  //   }),
  //   columnTitle: "Select"
  // }
  const columns: TableColumnType = [
    {
      title: "Question",
      dataIndex: "Name"
    },
    {
      title: "Display Question As",
      dataIndex: "Description",
      width: 200
    },
    {
      title: "Type",
      dataIndex: "PreferenceValueTypeName"
    },
    {
      title: "Active",
      dataIndex: "IsActive"
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
    <SearchPage
      title="Questions"
      meta={QuestionSearchFiltersMeta}
      hideSearchField={false}
      tableProps={{
        columns: columns,
        searchFunc: searchQuestions,
        rowKey: "PreferenceDefID",
        expandableRowRender: expandableRowRender,
        pagination: { position: ["topLeft"], pageSize: 20 }
      }}
    ></SearchPage>
  )
}

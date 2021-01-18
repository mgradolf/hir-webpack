import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
//TODO: Update the API end point 
import { findAllStudentNotice } from "~/ApiServices/Service/FinancialService"
import { Link } from "react-router-dom"

export const getStudentEmailTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "StudentNoticeID",
      render: (text: any, record: any) => (
        <Link to={`/studentemail/${record.StudentNoticeID}`}>
          <ReadOutlined />
        </Link>
      )
    },  
    {
      title: "Notification Name",
      dataIndex: "StudentNoticeName"
    },  
    {
      title: "Description",
      dataIndex: "StudentNoticeDesc"
    },  
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    },
    {
      title: "From User ID",
      dataIndex: "FromUserID"
    },  
    {
      title: "From Email Address",
      dataIndex: "FromEmailAddress"
    }  
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: findAllStudentNotice }
}

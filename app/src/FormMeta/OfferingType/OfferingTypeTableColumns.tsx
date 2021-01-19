import React from "react"
import { Link } from "react-router-dom"
//TODO: fix api
import { findOfferingTypes } from "~/ApiServices/BizApi/account/accountIF"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getOfferingTypeTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) =>
          <Link to={`/offering-type/${record.OfferingTypeID}`}>
            <ReadOutlined />
          </Link>
    },  
    { title: "Offering Type", dataIndex: "OfferingTypeName"   },
    { title: "Offering Name", dataIndex: "Name" },
    { title: "Offering Code", dataIndex: "OfferingCode" },
    { title: "Department", dataIndex: "OrganizationName" },
    { title: "Quick Admit", dataIndex: "IsQuickAdmit" , render:renderBoolean}
  ]
  return { columns, searchFunc: findOfferingTypes, responsiveColumnIndices: [], expandableColumnIndices: [] }
}

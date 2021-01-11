import React from "react"
import { Button, Dropdown } from "antd"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchFinancials } from "~/ApiServices/Service/FinancialService"
import FinancialMenu from "~/Component/Financial/FinancialMenu"
import { DownOutlined } from "@ant-design/icons"
import { FINANCIAL_OFFERING_TYPE_ID, FINANCIAL_TYPE_FACULTY, FINANCIAL_TYPE_OFFERING } from "~/utils/Constants"

export const getOfferingFinancialTableColumns = (ApplyToID: number, FinancialTypeID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Category",
      dataIndex: "FinancialCategoryType"
    },
    {
      title: "Basis",
      dataIndex: "FinancialBasisType"
    },
    {
      title: "Amount",
      dataIndex: "ItemUnitAmount"
    },
    {
      title: "Type",
      dataIndex: "FinancialType"
    },
    {
      title: "Optional?",
      dataIndex: "IsOptional",
      render: renderBoolean
    },
    {
      title: "Taxable?",
      dataIndex: "IsTaxable",
      render: renderBoolean
    },
    {
      title: "Weight",
      dataIndex: "Weight"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    },
    {
      title: "GL Account",
      dataIndex: "GLAccount"
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Dropdown
          overlay={
            <FinancialMenu
              applyToID={record.ApplyToID}
              financialType={
                FinancialTypeID === FINANCIAL_OFFERING_TYPE_ID ? FINANCIAL_TYPE_OFFERING : FINANCIAL_TYPE_FACULTY
              }
              financialId={record.FinancialID}
            />
          }
          trigger={["click"]}
        >
          <Button type="primary" onClick={(e) => e.preventDefault()}>
            Go To <DownOutlined />
          </Button>
        </Dropdown>
      )
    }
  ]

  return {
    columns,
    searchFunc: () => searchFinancials({ FinancialTypeID, ApplyToID })
  }
}

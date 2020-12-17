import React from "react"
import { Button, Dropdown } from "antd"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchOfferingFinancial } from "~/ApiServices/Service/OfferingService"
import FinancialMenu from "~/Component/Offering/Financial/FinancialMenu"
import { DownOutlined } from "@ant-design/icons"

export const getOfferingFinancialTableColumns = (OfferingID: number): ITableConfigProp => {
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
          overlay={<FinancialMenu offeringId={record.ApplyToID} financialId={record.FinancialID} />}
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
    searchFunc: () => searchOfferingFinancial(OfferingID)
  }
}

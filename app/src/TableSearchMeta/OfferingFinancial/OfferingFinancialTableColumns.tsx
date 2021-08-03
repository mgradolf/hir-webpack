import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchFinancials } from "~/ApiServices/Service/FinancialService"
import { FinancialMenu } from "~/Component/Feature/Financial/FinancialMenu"
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
      dataIndex: "ItemUnitAmount",
      render: (text: any) => `$ ${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
        <FinancialMenu
          helpkey="offeringEditOfferingFinancialsForm"
          applyToID={record.ApplyToID}
          financialId={record.FinancialID}
          financialType={
            FinancialTypeID === FINANCIAL_OFFERING_TYPE_ID ? FINANCIAL_TYPE_OFFERING : FINANCIAL_TYPE_FACULTY
          }
        />
      )
    }
  ]

  return {
    columns,
    searchFunc: () => searchFinancials({ FinancialTypeID, ApplyToID }),
    tableName: "OfferingFinancialTableColumns"
  }
}

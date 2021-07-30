import React from "react"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchFinancials } from "~/ApiServices/Service/FinancialService"
import FinancialMenu from "~/Component/Feature/Financial/FinancialMenu"
import {
  FINANCIAL_FACULTY_TYPE_ID,
  FINANCIAL_OFFERING_TYPE_ID,
  FINANCIAL_MARKETING_PROGRAM_TYPE_ID,
  FINANCIAL_RESOURCE_TYPE_ID,
  FINANCIAL_TYPE_FACULTY,
  FINANCIAL_TYPE_MARKETING_PROGRAM,
  FINANCIAL_TYPE_OFFERING,
  FINANCIAL_TYPE_RESOURCE
} from "~/utils/Constants"

export const getFinancialTableColumns = (ApplyToID: number, FinancialTypeID: number): ITableConfigProp => {
  let financialTypeName = ""
  if (FinancialTypeID === FINANCIAL_OFFERING_TYPE_ID) {
    financialTypeName = FINANCIAL_TYPE_OFFERING
  } else if (FinancialTypeID === FINANCIAL_FACULTY_TYPE_ID) {
    financialTypeName = FINANCIAL_TYPE_FACULTY
  } else if (FinancialTypeID === FINANCIAL_MARKETING_PROGRAM_TYPE_ID) {
    financialTypeName = FINANCIAL_TYPE_MARKETING_PROGRAM
  } else if (FinancialTypeID === FINANCIAL_RESOURCE_TYPE_ID) {
    financialTypeName = FINANCIAL_TYPE_RESOURCE
  }

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
          applyToID={record.ApplyToID}
          financialType={financialTypeName}
          financialId={record.FinancialID}
        />
      )
    }
  ]

  return {
    columns,
    searchFunc: () => searchFinancials({ FinancialTypeID, ApplyToID }),
    tableName: "FinancialTableColumns"
  }
}

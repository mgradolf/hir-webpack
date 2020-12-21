import React from "react"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchTransactions } from "~/ApiServices/Service/TransactionService"
import { Link } from "react-router-dom"

export const getTransactionFinancialTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Deposit ID",
      dataIndex: "depositTransactionID",
      render: (text: any, record: any) =>
        isModal ? text : <Link to={`/transaction/${record.depositTransactionID}`}>{text}</Link>
    },
    { title: "Date", dataIndex: "TransactionDate" },
    { title: "Account Owner", dataIndex: "PersonName" },
    { title: "Account Name", dataIndex: "AffiliateOrg" },
    { title: "Department", dataIndex: "Department" },
    { title: "TransactionType", dataIndex: "TransactionType" },
    { title: "Description", dataIndex: "Description" },
    { title: "Reference No", dataIndex: "ReferenceNo" },
    { title: "GL", dataIndex: "GLAccountName" },
    { title: "Deposit", dataIndex: "Credit" },
    { title: "Withdrawl", dataIndex: "Debit" },
    { title: "Balance", dataIndex: "Balance" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchTransactions }
}

import React from "react"
import { renderDate, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { searchTransactions } from "~/ApiServices/Service/TransactionService"
import { Link } from "react-router-dom"

export const getTransactionFinancialTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      render: (text: any, record: any) =>
        isModal
          ? text
          : renderDetailsLink(
              `/transaction/${record.DepositTransactionID ? record.DepositTransactionID : record.TransactionID}`
            )
    },
    // { title: "Deposit ID", dataIndex: "DepositTransactionID" },
    { title: "Date", dataIndex: "TransactionDate", render: renderDate },
    {
      title: "Account Owner",
      dataIndex: "PersonName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    {
      title: "Account Name",
      dataIndex: "AffiliatedOrg",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    },
    { title: "Department", dataIndex: "Department" },
    { title: "TransactionType", dataIndex: "TransactionType" },
    { title: "Description", dataIndex: "Description" },
    { title: "Reference No", dataIndex: "ReferenceNo" },
    { title: "GL", dataIndex: "GLAccountName" },
    { title: "Deposit", dataIndex: "Credit" },
    { title: "Withdrawl", dataIndex: "Debit" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchTransactions }
}

import React from "react"
import { renderDate, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchTransactions } from "~/ApiServices/Service/TransactionService"
import { Link } from "react-router-dom"

export const getTransactionFinancialTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "DepositTransactionID",
      render: (text: any, record: any) =>
        isModal
          ? text
          : renderDetailsLink(
              `/transaction/${record.DepositTransactionID ? record.DepositTransactionID : record.TransactionID}`
            )
    },
    { title: "Date", dataIndex: "TransactionDate", render: renderDate },
    {
      title: "Purchaser",
      dataIndex: "PersonName",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    {
      title: "Account",
      dataIndex: "AffiliatedOrg",
      render: (text: any, record: any) => (isModal ? text : <Link to={`/account/${record.AccountID}`}>{text}</Link>)
    },
    { title: "Transaction Type", dataIndex: "TransactionType" },
    { title: "Reference No", dataIndex: "ReferenceNo" },
    { title: "Description", dataIndex: "Description" },
    { title: "Deposit", dataIndex: "Credit" },
    { title: "Withdrawal", dataIndex: "Debit" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchTransactions }
}

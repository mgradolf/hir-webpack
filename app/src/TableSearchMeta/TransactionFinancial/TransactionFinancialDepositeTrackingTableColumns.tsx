import React from "react"
import { renderDate, sortByNumber, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { searchTransactions } from "~/ApiServices/Service/TransactionService"
import { Link } from "react-router-dom"

export const getTransactionFinancialDepositeTrackingTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Transaction ID",
      dataIndex: "TransactionID",
      render: (text: any, record: any) =>
        isModal ? (
          text
        ) : (
          <Link to={`/transaction/${record.DepositTransactionID ? record.DepositTransactionID : record.TransactionID}`}>
            {text}
          </Link>
        ),
      sorter: (a: any, b: any) => sortByNumber(a, b)
    },
    { title: "Date", dataIndex: "TransactionDate", render: renderDate },
    { title: "Transaction Type", dataIndex: "TransactionType" },
    { title: "Description", dataIndex: "Description" },
    { title: "Deposit", dataIndex: "Credit", sorter: (a: any, b: any) => sortByNumber(a, b) },
    { title: "Withdrawl", dataIndex: "Debit", sorter: (a: any, b: any) => sortByNumber(a, b) },
    { title: "Balance", dataIndex: "Balance", sorter: (a: any, b: any) => sortByNumber(a, b) }
  ]

  return { columns, searchFunc: searchTransactions, tableName: "TransactionFinancialDepositeTrackingTableColumns" }
}

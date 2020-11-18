import React from "react"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"

import { Button } from "antd"
import { Link } from "react-router-dom"

export interface IWaitListEntryTable {
  dataSource: Array<any>
  loading: boolean
  isModal?: boolean
  rowSelection?: any
  setEntryToEdit: (Params: any) => void
  removeEntry: (ID: number) => void
}

export default function WaitListEntryTable(props: IWaitListEntryTable) {
  const columns: TableColumnType = [
    {
      title: "SectionNumber",
      dataIndex: "SectionNumber",
      render: (text: any, record: any) =>
        props.isModal ? (
          text
        ) : (
          <Link
            to={
              record.offeringID
                ? `/offering/${record.offeringID}/section/${record.SectionID}`
                : `/section/${record.SectionID}`
            }
          >
            {text}
          </Link>
        ),
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "SeatGroupName",
      dataIndex: "SeatGroupName",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "AccountName",
      dataIndex: "AccountName",
      render: (text: any, record: any) => <Link to={`/account/${record.AccountID}`}>{record.AccountName}</Link>,
      width: 150
    },
    {
      title: "PurchaserName",
      dataIndex: "PurchaserName",
      render: (text: any, record: any) => <Link to={`/personn/${record.PersonID}`}>{record.PurchaserName}</Link>,
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "StudentName",
      dataIndex: "StudentName",
      render: (text: any, record: any) => <Link to={`/personn/${record.PersonID}`}>{record.StudentName}</Link>,
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "StudentEmailAddress",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Request State",
      dataIndex: "RequestState",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Email",
      dataIndex: "StudentEmailAddress",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "CreationTime",
      dataIndex: "CreationTime",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "ExpirationTime",
      dataIndex: "RequestExpirationTime",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Source",
      dataIndex: "Source",
      key: "WaitListEntryID",
      width: 150
    },
    {
      title: "Edit",
      key: "WaitListEntryID",
      render: (text: any, record: any) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                props.setEntryToEdit(record)
              }}
            >
              Edit
            </Button>
            <Button
              danger
              onClick={() => {
                props.removeEntry(record.WaitListEntryID)
              }}
            >
              Remove
            </Button>
          </>
        )
      }
    }
  ]

  return (
    <ResponsiveTable
      columns={columns}
      dataSource={props.dataSource}
      loading={props.loading}
      bordered
      rowKey="WaitListEntryID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      scroll={{ x: 300 }}
    />
  )
}

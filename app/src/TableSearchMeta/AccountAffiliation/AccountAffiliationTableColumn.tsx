import { Switch } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { removePrimaryAccountAffiliation, setPrimaryAccountAffiliation } from "~/ApiServices/BizApi/account/accountIF"
import { getAccountAffiliation } from "~/ApiServices/Service/AccountService"
import {
  renderBoolean,
  renderDate,
  renderEmail,
  sortByString,
  TableColumnType
} from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { eventBus } from "~/utils/EventBus"
import { AccountContactMenu } from "~/Component/Feature/Account/AccountContactMenu"

export const getAccountAffiliationTableColumn = (isModal = false): ITableConfigProp => {
  const primaryContactAction = (IsPublished: boolean, AccountID: number, AccountAffiliationID: number) => {
    if (IsPublished) {
      setPrimaryAccountAffiliation({ AccountID, AccountAffiliationID }).then((x) => {
        if (x.success) eventBus.publish("REFRESH_CONTACT_TAB")
      })
    } else {
      removePrimaryAccountAffiliation({ AccountID }).then((x) => {
        if (x.success) eventBus.publish("REFRESH_CONTACT_TAB")
      })
    }
  }

  const columns: TableColumnType = [
    {
      title: "Last Name",
      dataIndex: "LastName",
      render: (text, record) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>),
      sorter: (a: any, b: any) => sortByString(a?.LastName[0], b?.LastName[0])
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      render: (text, record) => (isModal ? text : <Link to={`/person/${record.PersonID}`}>{text}</Link>)
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Birth Date", dataIndex: "Birthday", render: renderDate },
    { title: "Role ", dataIndex: "AffiliationRoleTypeName" },
    { title: "Shared", dataIndex: "IsContactShared", render: renderBoolean },
    {
      title: "Status",
      dataIndex: "AccountAffiliationStatusName",
      sorter: (a: any, b: any) => sortByString(a?.AccountAffiliationStatusName[0], b?.AccountAffiliationStatusName[0])
    },
    {
      title: "Primary Contact",
      dataIndex: "PrimaryAccountAffiliation",
      render: (text: any, record: any) => (
        <Switch
          checked={!!text}
          onChange={(e) => primaryContactAction(e, record.AccountID, record.AccountAffiliationID)}
        />
      )
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <AccountContactMenu
          initialData={{ ...record, IsPrimaryAccountAffiliation: record.PrimaryAccountAffiliation }}
        />
      )
    }
  ]
  return { columns, searchFunc: getAccountAffiliation, tableName: "AccountAffiliationTableColumn" }
}

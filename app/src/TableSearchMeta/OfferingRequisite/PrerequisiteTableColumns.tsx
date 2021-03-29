import React from "react"
import { getGroupOfferings } from "~/ApiServices/Service/OfferingService"
import { renderDate, TableColumnType } from "~/Component/Common/ResponsiveTable"
import RequisiteOfferingRemoveLink from "~/Component/Feature/Offering/Requisite/RequisiteGroupOfferingRemoveLink"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getOfferingPrerequisiteTableColumns = (requisiteGroupID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Offering Code",
      dataIndex: "OfferingCode"
    },
    {
      title: "Offering Name",
      dataIndex: "Name"
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      render: renderDate
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      render: renderDate
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <RequisiteOfferingRemoveLink offeringId={record.OfferingID} requisiteGroupId={requisiteGroupID} />
      )
    }
  ]

  return {
    columns,
    searchFunc: () => getGroupOfferings({ RequisiteOfferingGroupID: requisiteGroupID }),
    tableName: "PrerequisiteTableColumns"
  }
}

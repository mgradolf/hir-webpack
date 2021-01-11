import React from "react"
import { Switch } from "antd"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
import { getSectionFinancialsCombined } from "~/ApiServices/Service/SectionService"
import { addFinancial, removeFinancial } from "~/ApiServices/Service/SeatGroupService"
import { eventBus, REFRESH_SEATGROUP_FINANCIAL_PAGE } from "~/utils/EventBus"

export const getSeatgroupFinancialTableColumns = (SeatGroupID: number, SectionID: number): ITableConfigProp => {
  const financialAction = (IsPublished: boolean, SectionFinancialID: number) => {
    if (IsPublished) {
      addFinancial({ SeatGroupID, SectionFinancialID }).then((x) => {
        if (x.success) eventBus.publish(REFRESH_SEATGROUP_FINANCIAL_PAGE)
      })
    } else {
      removeFinancial({ SeatGroupID, SectionFinancialID }).then((x) => {
        if (x.success) eventBus.publish(REFRESH_SEATGROUP_FINANCIAL_PAGE)
      })
    }
  }

  const columns: TableColumnType = [
    {
      title: "Type",
      dataIndex: "FinancialType"
    },
    {
      title: "Item",
      dataIndex: "ItemName"
    },
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "GL Account",
      dataIndex: "GLAccount"
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
      title: "Selected",
      dataIndex: "IsPublished",
      render: (text: any, record: any) => (
        <Switch checked={!!text} onChange={(e) => financialAction(e, record.SectionFinancialID)} />
      )
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: () => getSectionFinancialsCombined(SeatGroupID, SectionID)
  }
}

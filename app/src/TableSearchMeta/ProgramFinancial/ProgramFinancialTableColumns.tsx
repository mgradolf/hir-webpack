import React from "react"
import { Col, Row } from "antd"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { deleteProgramFinancial, getProgramFinancials } from "~/ApiServices/BizApi/program/programIF"
import { ProgramFinancialFormOpenButton } from "~/Component/Feature/ProgramFinancial/ProgramFinancialFormOpenButton"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { eventBus } from "~/utils/EventBus"

export const getProgramFinancialTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Applied To",
      dataIndex: "IsApplicationCharge",
      render: (text) => (text ? "Application" : "Enrollment")
    },
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "GL Account",
      dataIndex: "GLAccountName"
    },
    {
      title: "Basis",
      dataIndex: "FinancialBasisTypeName"
    },
    {
      title: "Optional",
      dataIndex: "IsOptional",
      render: renderBoolean
    },
    {
      title: "Income",
      dataIndex: "ItemUnitAmount"
    },
    {
      title: "Expense",
      dataIndex: "IsCharge",
      render: (text) => (text ? "Expense" : "Income")
    },
    {
      title: "Action",
      render: (record: any) => (
        <Row gutter={5}>
          <Col flex="none">
            <ProgramFinancialFormOpenButton editMode={true} ProgramFinancial={record} />
          </Col>
          <Col flex="none">
            <IconButton
              iconType="remove"
              toolTip="Remove Program Financial"
              onClickRemove={() =>
                deleteProgramFinancial(record).then((x) => {
                  if (x.success) eventBus.publish("REFRESH_PROGRAM_FINANCIAL")
                  return x
                })
              }
            />
          </Col>
        </Row>
      )
    }
  ]
  return { columns, searchFunc: getProgramFinancials, tableName: "ProgramTableColumns" }
}

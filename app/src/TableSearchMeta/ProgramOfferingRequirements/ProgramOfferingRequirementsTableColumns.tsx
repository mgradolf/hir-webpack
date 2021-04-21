import { Col, Row } from "antd"
import React from "react"
import { deleteProgramReqGroupMember, getProgramReqGroups } from "~/ApiServices/BizApi/program/programIF"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ProgramOfferingRequirementsGroupFormOpenButton } from "~/Component/Feature/ProgramOfferingRequirementsGroup/ProgramOfferingRequirementsGroupFormOpenButton"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getProgramOfferingRequirementsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Name", dataIndex: "Name" },
    { title: "Policy Name", dataIndex: "PolicyName" },
    { title: "Policy Value", dataIndex: "PolicyValue" },
    {
      title: "Actions",
      render: (text, record) => (
        <Row gutter={5}>
          <Col flex="none">
            <ProgramOfferingRequirementsGroupFormOpenButton editMode={true} OfferingGroup={record} />
          </Col>
          <Col flex="none">
            <IconButton
              iconType="remove"
              toolTip="Remove Offering Requirements Group"
              onClickRemove={() => deleteProgramReqGroupMember(record)}
            />
          </Col>
        </Row>
      )
    }
  ]

  return { columns, searchFunc: getProgramReqGroups, tableName: "ProgramOfferingTableColumns" }
}

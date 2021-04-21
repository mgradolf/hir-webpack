import { Col, Row } from "antd"
import React from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { FormInstance } from "antd/lib/form"
import { eventBus } from "~/utils/EventBus"
import { OfferingLookupButton } from "~/Component/Common/Form/FormLookupFields/OfferingLookup"
import {
  deleteProgramReqGroupMember,
  getProgramReqGroupMembers,
  addProgramReqGroupMember
} from "~/ApiServices/BizApi/program/programIF"

export const ProgramOfferingRequirementsGroupDetails = (props: {
  formInstance: FormInstance
  OfferingGroup: { [key: string]: any }
}) => {
  return (
    <Row gutter={10}>
      <Col span="12">
        <Row>
          <Col flex="auto">
            <OfferingLookupButton label="Add Offering" formInstance={props.formInstance} fieldName="OfferingID" />
          </Col>
          <Col flex="none">
            <IconButton
              iconType="create"
              toolTip="Add Offering"
              onClick={() => {
                console.log('formInstance.getFieldValue("OfferingID") ', props.formInstance.getFieldValue("OfferingID"))
                addProgramReqGroupMember({
                  ProgramReqGroupID: props.OfferingGroup.ProgramReqGroupID,
                  OfferingID: props.formInstance.getFieldValue("OfferingID")
                }).then((x) => {
                  if (x.success) {
                    eventBus.publish("REFRESH_OFFERING_LIST")
                    props.formInstance.setFieldsValue({ toUser: undefined })
                  }
                })
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col span="12">
        <ResponsiveTable
          searchFunc={getProgramReqGroupMembers}
          searchParams={props.OfferingGroup}
          refreshEventName={"REFRESH_OFFERING_LIST"}
          columns={[
            {
              title: "Offering Code",
              dataIndex: "OfferingCode"
            },
            {
              title: "Offering Name",
              dataIndex: "Name"
            },
            {
              title: "Action",
              render: (text, record) => (
                <IconButton
                  iconType="remove"
                  toolTip="Remove Recipient"
                  onClickRemove={() => {
                    return deleteProgramReqGroupMember({
                      ProgramReqGroupID: props.OfferingGroup.ProgramReqGroupID,
                      OfferingID: record.OfferingID
                    }).then((x) => {
                      if (x.success) eventBus.publish("REFRESH_OFFERING_LIST")
                      return x
                    })
                  }}
                />
              )
            }
          ]}
        />
      </Col>
    </Row>
  )
}

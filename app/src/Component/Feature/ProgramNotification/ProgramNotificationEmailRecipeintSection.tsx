import { Col, Row } from "antd"
import React from "react"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInstance } from "antd/lib/form"
import {
  addRecipientEmailAddress,
  addRecipientUserID,
  getRecipientWithTag,
  removeRecipientEmailAddress,
  removeRecipientUserID
} from "~/ApiServices/BizApi/program/programCommunicationIF"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { eventBus } from "~/utils/EventBus"

export const ProgramNotificationEmailRecipeintSection = (props: {
  formInstance: FormInstance
  EmailNotification: { [key: string]: any }
}) => {
  return (
    <Row gutter={10}>
      <Col span="12">
        <Row>
          <Col flex="auto">
            <FormDropDown
              label="From User"
              formInstance={props.formInstance}
              refLookupService={() => getAllUsers({})}
              displayKey="UserID"
              valueKey="UserID"
              fieldName="toUsers"
            />
          </Col>
          <Col flex="none">
            <IconButton
              iconType="create"
              toolTip="Add To User"
              onClick={() => {
                addRecipientUserID({
                  ProgramEmailNoticeID: props.EmailNotification.ProgramEmailNoticeID,
                  UserID: props.formInstance.getFieldValue("toUsers")
                }).then((x) => {
                  if (x.success) {
                    eventBus.publish("REFRESH_RECIPIENT_LIST")
                    props.formInstance.setFieldsValue({ toUser: undefined })
                  }
                })
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <FormInput
              label="To Email"
              fieldName="toEmail"
              formInstance={props.formInstance}
              rules={[{ message: "Please enter valid email address!", type: "email" }]}
            />
          </Col>
          <Col flex="none">
            <IconButton
              iconType="create"
              toolTip="Add To Email"
              onClick={() => {
                addRecipientEmailAddress({
                  ProgramEmailNoticeID: props.EmailNotification.ProgramEmailNoticeID,
                  UserID: props.formInstance.getFieldValue("toEmail")
                }).then((x) => {
                  if (x.success) {
                    eventBus.publish("REFRESH_RECIPIENT_LIST")
                    props.formInstance.setFieldsValue({ toEmail: undefined })
                  }
                })
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <FormDropDown
              label="To Tag"
              fieldName="toTag"
              formInstance={props.formInstance}
              options={[{ label: "student@email.com", value: "student@email.com" }]}
            />
          </Col>
          <Col flex="none">
            <IconButton
              iconType="create"
              toolTip="Add To Tag"
              onClick={() => {
                addRecipientEmailAddress({
                  ProgramEmailNoticeID: props.EmailNotification.ProgramEmailNoticeID,
                  UserID: props.formInstance.getFieldValue("toTag")
                }).then((x) => {
                  if (x.success) {
                    eventBus.publish("REFRESH_RECIPIENT_LIST")
                    props.formInstance.setFieldsValue({ toTag: undefined })
                  }
                })
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col span="12">
        <ResponsiveTable
          searchFunc={getRecipientWithTag}
          searchParams={props.EmailNotification}
          refreshEventName={"REFRESH_RECIPIENT_LIST"}
          columns={[
            {
              title: "Recipient",
              dataIndex: "Recipient"
            },
            {
              title: "Type",
              dataIndex: "Type"
            },
            {
              title: "Action",
              render: (text, record) => (
                <IconButton
                  iconType="remove"
                  toolTip="Remove Recipient"
                  onClickRemove={() => {
                    let removePromise = removeRecipientEmailAddress
                    let params: { [key: string]: any } = {
                      ProgramEmailNoticeID: props.EmailNotification.ProgramEmailNoticeID,
                      UserID: record.Value
                    }
                    if (record.Type === "UserID") {
                      removePromise = removeRecipientUserID
                      params = {
                        ProgramEmailNoticeID: props.EmailNotification.ProgramEmailNoticeID,
                        Email: record.Value
                      }
                    }
                    return removePromise(params).then((x) => {
                      if (x.success) eventBus.publish("REFRESH_RECIPIENT_LIST")
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

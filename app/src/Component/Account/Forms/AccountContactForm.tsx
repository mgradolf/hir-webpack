import React, { useEffect, useState } from "react"
import { Form, Input, Select, Switch, Card, Divider, Row, Col, Button, Spin, DatePicker } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { FormInstance } from "antd/lib/form"
import { IAccountContactFieldNames } from "~/Component/Account/Interfaces"
import {
  getAffiliationRoleTypes,
  getQuestionAnswers,
  getTaggedQuestionsByAffiliationRoleType
} from "~/ApiServices/BizApi/account/accountIF"
import { eventBus } from "~/utils/EventBus"
import "~/Sass/utils.scss"
import {
  ACCOUNT_AFFILIATION_STATUS_ACTIVE,
  ACCOUNT_AFFILIATION_STATUS_INACTIVE,
  ACCOUNT_AFFILIATION_STATUS_PENDING,
  DATE_FORMAT,
  REQUEST_DATE_TIME_FORMAT
} from "~/utils/Constants"
import { saveAccountAffiliation } from "~/ApiServices/Service/AccountService"
import moment from "moment"

interface IAccountContactFormProps {
  formInstance: FormInstance
  fieldNames: IAccountContactFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function AccountContactForm(props: IAccountContactFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [roleTypeID, setRoleTypeID] = useState(Number)
  const [roleTypeItems, setRoleTypeItems] = useState<Array<any>>([])
  const [questionItems, setQuestionItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const questionAnswers: { [key: string]: any } = {}

  const editMode: boolean = props.initialFormValue.AccountAffiliationID ? true : false
  const birthday = props.initialFormValue.Birthday

  useEffect(() => {
    ;(async function () {
      const result = await getAffiliationRoleTypes({ IsActive: true })
      if (result && result.success) {
        setRoleTypeItems(result.data)
      }
    })()
  }, [])

  useEffect(() => {
    async function loadQuestions(roleTypeID: number) {
      setLoading(true)
      const res = await getTaggedQuestionsByAffiliationRoleType({ AffiliationRoleTypeID: roleTypeID })
      if (res.success && Array.isArray(res.data)) {
        setQuestionItems(res.data)
        if (props.initialFormValue.AccountAffiliationID) {
          loadAnswers(props.initialFormValue.AccountAffiliationID)
        } else {
          setLoading(false)
        }
      }
    }

    async function loadAnswers(accountAffiliationID: number) {
      const res = await getQuestionAnswers({ AccountAffiliationID: accountAffiliationID })
      if (res.success) {
        res.data.forEach((element: any) => {
          questionAnswers[element["TagQuestionID"]] = element["Response"]
          props.formInstance.setFieldsValue({ [`AnswerList_${element.TagQuestionID}`]: element["Response"] })
        })
      }
      setLoading(false)
    }

    if (roleTypeID) {
      loadQuestions(roleTypeID)
    } else if (props.initialFormValue.AffiliationRoleTypeID) {
      loadQuestions(props.initialFormValue.AffiliationRoleTypeID)
    }
    // eslint-disable-next-line
  }, [props, roleTypeID])

  const onFormSubmission = async () => {
    try {
      await props.formInstance.validateFields()
      const params = props.formInstance.getFieldsValue()

      const answerList: Array<any> = []
      Object.keys(params).map((key) => {
        if (key.includes("AnswerList")) {
          const answerSplit: string[] = key.split("_")
          answerList.push({ TagQuestionID: parseInt(answerSplit[1]), AnswerText: params[key] })
        }
        return answerList
      })
      params["AnswerList"] = answerList

      setErrorMessages([])
      const response = await saveAccountAffiliation(params)
      if (response && response.success) {
        props.closeModal && props.closeModal()
        eventBus.publish("REFRESH_CONTACT_TAB")
      } else {
        setErrorMessages(response.error)
        console.log(response.error)
        console.log(errorMessages)
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo)
    }
  }

  const handelRoleTypeSelection = (value: any) => {
    setRoleTypeID(value)
  }

  return (
    <Card
      title={editMode ? `Edit Contact` : `Add Contact`}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.closeModal}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onFormSubmission}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form
        form={props.formInstance}
        initialValues={props.initialFormValue}
        scrollToFirstError
        style={{
          maxHeight: "80vh",
          overflowY: "scroll"
        }}
      >
        <OldFormError errorMessages={errorMessages} />
        <Row>
          <Col xs={24} sm={24} md={12}>
            <Form.Item label="Account ID" className="hidden" {...layout} name={props.fieldNames.AccountID}>
              <Input aria-label="Account ID" />
            </Form.Item>
            <Form.Item
              label="Account Affilation ID"
              className="hidden"
              {...layout}
              name={props.fieldNames.AccountAffiliationID}
            >
              <Input aria-label="Account Affiliation ID" />
            </Form.Item>
            <Form.Item
              label="First Name"
              {...layout}
              name={props.fieldNames.FirstName}
              rules={[{ required: true, message: "Please enter first name!" }]}
            >
              <Input aria-label="First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              {...layout}
              name={props.fieldNames.LastName}
              rules={[{ required: true, message: "Please enter last name!" }]}
            >
              <Input aria-label="Last Name" />
            </Form.Item>
            <Form.Item label="Birthday" {...layout} name={props.fieldNames.Birthday}>
              <DatePicker
                aria-label="Pick Birthday"
                placeholder={DATE_FORMAT}
                format={DATE_FORMAT}
                defaultValue={birthday ? moment(birthday, REQUEST_DATE_TIME_FORMAT) : undefined}
              />
            </Form.Item>
            <Form.Item label="Email Address" {...layout} name={props.fieldNames.EmailAddress}>
              <Input aria-label="Email Address" />
            </Form.Item>
            <Form.Item
              name={props.fieldNames.StatusID}
              label="Status"
              rules={[{ required: true, message: "Please select your answer!" }]}
              {...layout}
            >
              <Select aria-label="Status">
                <Select.Option key={ACCOUNT_AFFILIATION_STATUS_ACTIVE} value={ACCOUNT_AFFILIATION_STATUS_ACTIVE}>
                  Active
                </Select.Option>
                <Select.Option key={ACCOUNT_AFFILIATION_STATUS_INACTIVE} value={ACCOUNT_AFFILIATION_STATUS_INACTIVE}>
                  Inactive
                </Select.Option>
                <Select.Option key={ACCOUNT_AFFILIATION_STATUS_PENDING} value={ACCOUNT_AFFILIATION_STATUS_PENDING}>
                  Pending
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name={props.fieldNames.AffiliationRoleTypeID}
              label="Role Type"
              rules={[{ required: true, message: "Please select your answer!" }]}
              {...layout}
            >
              <Select onChange={handelRoleTypeSelection} aria-label="Role Type">
                {roleTypeItems.map((x) => {
                  return (
                    <Select.Option key={x.AffiliationRoleTypeID} value={x.AffiliationRoleTypeID}>
                      {x.Name}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Shared Contact"
              {...layout}
              valuePropName="checked"
              name={props.fieldNames.IsContactShared}
            >
              <Switch aria-label="Shared contact" />
            </Form.Item>
            <Form.Item
              label="Primary Contact"
              {...layout}
              valuePropName="checked"
              name={props.fieldNames.IsPrimaryAccountAffiliation}
            >
              <Switch aria-label="Primary contact" />
            </Form.Item>
            <Form.Item label="ERPID" {...layout} name={props.fieldNames.ERPID}>
              <Input aria-label="ERPID" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24}>
            <Divider orientation="left">Questions</Divider>
            <Spin spinning={loading} size="small">
              {questionItems.map((questionObj, index) => {
                const possibleOptions: Array<any> = questionObj.PossibleOptions
                if (possibleOptions !== null) {
                  return (
                    <Form.Item
                      key={index}
                      label={questionObj.Name}
                      {...layout}
                      rules={[{ required: questionObj.IsRequired, message: "Please select your answer!" }]}
                      name={`AnswerList_${questionObj.TagQuestionID}`}
                    >
                      <Select aria-label={questionObj.Name}>
                        <>
                          {possibleOptions.map((x) => {
                            return (
                              <Select.Option key={`${x.TagQuestionID}_${x.Option}`} value={x.Option}>
                                {x.Option}
                              </Select.Option>
                            )
                          })}
                        </>
                      </Select>
                    </Form.Item>
                  )
                } else {
                  return (
                    <Form.Item
                      key={index}
                      label={questionObj.Name}
                      rules={[{ required: questionObj.IsRequired, message: "Please input your answer!" }]}
                      {...layout}
                      name={`AnswerList_${questionObj.TagQuestionID}`}
                    >
                      <Input />
                    </Form.Item>
                  )
                }
              })}
            </Spin>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

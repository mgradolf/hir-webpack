import React, { useEffect, useState } from "react"
import { Form, Input, Select, Switch, Card, Divider, Row, Col, Button, Spin } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { FormInstance } from "antd/lib/form"
import { IPersonAccountFieldNames } from "~/Component/Feature/Person/Interfaces"
import {
  getAffiliationRoleTypes,
  getQuestionAnswers,
  getTaggedQuestionsByAffiliationRoleType
} from "~/ApiServices/BizApi/account/accountIF"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import { saveAccountRelation } from "~/ApiServices/Service/AccountService"
import { eventBus } from "~/utils/EventBus"
import "~/Sass/utils.scss"

interface IPersonAccountFormProps {
  formInstance: FormInstance
  fieldNames: IPersonAccountFieldNames
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function PersonAccountForm(props: IPersonAccountFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [roleTypeID, setRoleTypeID] = useState(Number)
  const [roleTypeItems, setRoleTypeItems] = useState<Array<any>>([])
  const [questionItems, setQuestionItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const questionAnswers: { [key: string]: any } = {}

  const editMode: boolean = props.initialFormValue.AccountAffiliationID ? true : false

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
      const response = await saveAccountRelation(params)
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
      title={editMode ? `Edit Relation` : `Add Relation`}
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

        <AccountLookup
          labelColSpan={8}
          wrapperColSpan={14}
          fieldName={props.fieldNames.AccountID}
          formInstance={props.formInstance}
          label={"Account"}
        />

        <Form.Item label="Person ID" className="hidden" {...layout} name={props.fieldNames.PersonID}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Account Affilation ID"
          className="hidden"
          {...layout}
          name={props.fieldNames.AccountAffiliationID}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={props.fieldNames.StatusID}
          label="Status"
          rules={[{ required: true, message: "Please select your answer!" }]}
          {...layout}
        >
          <Select disabled aria-label="Status">
            <Select.Option key={1} value={1}>
              Active
            </Select.Option>
          </Select>
        </Form.Item>

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

        <Form.Item label="Shared Contact" {...layout} valuePropName="checked" name={props.fieldNames.IsContactShared}>
          <Switch aria-label="Shared contact" />
        </Form.Item>

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
      </Form>
    </Card>
  )
}

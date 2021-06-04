import React, { useEffect, useState } from "react"
import { Form, Input, Select, Card, Divider, Row, Col, Button, Spin } from "antd"
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
import { FormInput } from "~/Component/Common/Form/FormInput"
import { getAccountAffiliationStatus } from "~/ApiServices/Service/RefLookupService"
import {
  ACCOUNT_AFFILIATION_STATUS_ACTIVE,
  ACCOUNT_AFFILIATION_STATUS_INACTIVE,
  ACCOUNT_AFFILIATION_STATUS_PENDING,
  ACCOUNT_AFFILIATION_STATUS_REJECTED
} from "~/utils/Constants"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import "~/Sass/utils.scss"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

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
  const [statusItems, setStatusItems] = useState<Array<any>>([])
  const [questionItems, setQuestionItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const questionAnswers: { [key: string]: any } = {}

  const editMode: boolean = props.initialFormValue.AccountAffiliationID ? true : false
  props.initialFormValue.StatusID =
    props.initialFormValue.AccountAffiliationStatusID !== undefined
      ? props.initialFormValue.AccountAffiliationStatusID
      : props.initialFormValue.StatusID

  useEffect(() => {
    ;(async function () {
      const result = await getAffiliationRoleTypes({ IsActive: true })
      if (result && result.success) {
        setRoleTypeItems(result.data)
      }
    })()
    ;(async function () {
      const result = await getAccountAffiliationStatus()
      if (result && result.success) {
        let resultData = result.data
        if (!editMode) {
          resultData = resultData.filter((x: any) => x.ID !== ACCOUNT_AFFILIATION_STATUS_REJECTED)
        } else {
          const currentStatusID = props.initialFormValue.AccountAffiliationStatusID
          if (
            currentStatusID === ACCOUNT_AFFILIATION_STATUS_ACTIVE ||
            currentStatusID === ACCOUNT_AFFILIATION_STATUS_INACTIVE
          ) {
            resultData = resultData.filter(
              (x: any) => x.ID === ACCOUNT_AFFILIATION_STATUS_ACTIVE || x.ID === ACCOUNT_AFFILIATION_STATUS_INACTIVE
            )
          } else if (currentStatusID === ACCOUNT_AFFILIATION_STATUS_PENDING) {
            resultData = resultData.filter(
              (x: any) =>
                x.ID === ACCOUNT_AFFILIATION_STATUS_ACTIVE ||
                x.ID === ACCOUNT_AFFILIATION_STATUS_PENDING ||
                x.ID === ACCOUNT_AFFILIATION_STATUS_REJECTED
            )
          } else {
            resultData = resultData.filter(
              (x: any) => x.ID === ACCOUNT_AFFILIATION_STATUS_PENDING || x.ID === ACCOUNT_AFFILIATION_STATUS_REJECTED
            )
          }
        }
        setStatusItems(resultData)
      }
    })()
    // eslint-disable-next-line
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
      title={
        <Row justify="space-between">
          <Col>{editMode ? `Edit Relation` : `Add Relation`}</Col>
          <Col>
            <HelpButton helpKey="personAddRelationForm" />
          </Col>
        </Row>
      }
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
          maxHeight: "66vh",
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

        <FormInput label="PersonID" formInstance={props.formInstance} fieldName={props.fieldNames.PersonID} hidden />

        <FormInput
          label="AccountAffiliationID"
          formInstance={props.formInstance}
          fieldName={props.fieldNames.AccountAffiliationID}
          hidden
        />

        <Form.Item
          name={props.fieldNames.StatusID}
          label="Status"
          rules={[{ required: true, message: "Please select your answer!" }]}
          {...layout}
        >
          <Select aria-label="Status">
            {statusItems.length &&
              statusItems.map((status) => {
                return (
                  <Select.Option key={status.ID} value={status.ID}>
                    {status.Name}
                  </Select.Option>
                )
              })}
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

        <FormMultipleRadio
          labelColSpan={8}
          wrapperColSpan={14}
          formInstance={props.formInstance}
          label={"Shared Contact"}
          ariaLabel={"Is Shared Contact"}
          fieldName={props.fieldNames.IsContactShared}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />

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

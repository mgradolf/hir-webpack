import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddContactModal } from "~/Store/ModalState"
import { Card, Button, Form, Input, Select, DatePicker, Switch, Divider } from "antd"
import { ACCOUNT_AFFILIATION_STATUS_ACTIVE, DATE_FORMAT } from "~/utils/Constants"
import { useEffect } from "react"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { saveAccountAffiliation } from "~/ApiServices/Service/AccountService"
import {
  getAffiliationRoleTypes,
  getTaggedQuestionsByAffiliationRoleType
} from "~/ApiServices/BizApi/account/accountIF"
import moment from "moment"

const { useState } = React

const layout = {
  labelCol: { span: 8 }
}

const questionLayout = {
  labelCol: { span: 10 }
}

interface IAddContactModal {
  AccountID: number
  closeAddContactModal?: () => void
}

function AddContactModal(props: IAddContactModal) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [roleTypeID, setRoleTypeID] = useState(Number)
  const [roleTypeItems, setRoleTypeItems] = useState<Array<any>>([])
  const [questionItems, setQuestionItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  const initialData = {
    AccountID: props.AccountID,
    StatusID: ACCOUNT_AFFILIATION_STATUS_ACTIVE,
    IsContactShared: false,
    Birthday: form.getFieldValue("Birthday") ? moment(form.getFieldValue("Birthday"), DATE_FORMAT) : undefined
  }

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await getAffiliationRoleTypes([null, null, true])
      if (result && result.success) {
        setRoleTypeItems(result.data)
      }
      setLoading(false)
    })()
  }, [props])

  useEffect(() => {
    async function loadQuestions(roleTypeID: number) {
      setLoading(true)
      const res = await getTaggedQuestionsByAffiliationRoleType([roleTypeID])
      if (res.success && Array.isArray(res.data)) {
        setQuestionItems(res.data)
      }
      setLoading(false)
    }

    if (roleTypeID) {
      loadQuestions(roleTypeID)
    }
  }, [roleTypeID])

  const onFormSubmission = async () => {
    try {
      await form.validateFields()
      const params = form.getFieldsValue()

      const answerList: Array<any> = []
      Object.keys(params).map((key) => {
        if (key.includes("AnswerList")) {
          const answerSplit: string[] = key.split("_")
          answerList.push({ TagQuestionID: parseInt(answerSplit[1]), AnswerText: params[key] })
        }
        return answerList
      })
      params["AnswerList"] = answerList

      setLoading(true)
      setErrorMessages([])
      const response = await saveAccountAffiliation(params)
      setLoading(false)
      if (response && response.success) {
        form.resetFields()
        if (props.closeAddContactModal) {
          props.closeAddContactModal()
        }
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
    <Modal showModal={true} width="800px" apiCallInProgress={loading} closable={true}>
      <Card
        title="Add Contact"
        actions={[
          <Button type="ghost" onClick={props.closeAddContactModal}>
            Cancel
          </Button>,
          <Button type="primary" onClick={onFormSubmission}>
            Submit
          </Button>
        ]}
      >
        <Form initialValues={initialData} form={form} style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
          <OldFormError errorMessages={errorMessages} />
          <Divider orientation="left">Contact</Divider>
          <Form.Item label="Account ID" className="hidden" {...layout} name="AccountID">
            <Input />
          </Form.Item>

          <Form.Item
            name="FirstName"
            label="First Name"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
          >
            <Input type="text" aria-label="First name" />
          </Form.Item>

          <Form.Item
            name="LastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
          >
            <Input type="text" aria-label="Last name" />
          </Form.Item>

          <Form.Item
            name="Birthday"
            label="Bith Date"
            rules={[{ required: true, message: "Please pick the date!" }]}
            {...layout}
          >
            <DatePicker aria-label="Pick Birthday" placeholder={DATE_FORMAT} format={DATE_FORMAT} />
          </Form.Item>

          <Form.Item
            name="EmailAddress"
            label="Email"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
          >
            <Input type="email" aria-label="Email address" />
          </Form.Item>

          <Form.Item
            name="StatusID"
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
            name="AffiliationRoleTypeID"
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
            name="ERPID"
            label="ERP ID"
            rules={[{ required: true, message: "Please input your answer!" }]}
            {...layout}
          >
            <Input aria-label="ERP ID" />
          </Form.Item>

          <Form.Item label="Shared Contact" {...layout} valuePropName="checked" name="IsContactShared">
            <Switch aria-label="Shared contact" />
          </Form.Item>

          <Divider orientation="left">Questions</Divider>
          {questionItems.map((questionObj, index) => {
            const possibleOptions: Array<any> = questionObj.PossibleOptions
            if (possibleOptions !== null) {
              return (
                <Form.Item
                  key={index}
                  label={questionObj.Name}
                  {...questionLayout}
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
                  {...questionLayout}
                  name={`AnswerList_${questionObj.TagQuestionID}`}
                >
                  <Input />
                </Form.Item>
              )
            }
          })}
        </Form>
      </Card>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAddContactModal: () => dispatch(showAddContactModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(AddContactModal)

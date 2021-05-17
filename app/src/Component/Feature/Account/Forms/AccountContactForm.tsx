import React, { useEffect, useState } from "react"
import { Form, Input, Select, Divider, Row, Col, Spin, message } from "antd"
import { FormInstance } from "antd/lib/form"
import { IAccountContactFieldNames } from "~/Component/Feature/Account/Interfaces"
import {
  getAffiliationRoleTypes,
  getQuestionAnswers,
  getTaggedQuestionsByAffiliationRoleType
} from "~/ApiServices/BizApi/account/accountIF"
import "~/Sass/utils.scss"
import {
  ACCOUNT_AFFILIATION_STATUS_ACTIVE,
  ACCOUNT_AFFILIATION_STATUS_INACTIVE,
  ACCOUNT_AFFILIATION_STATUS_PENDING,
  ADDED_SUCCESSFULLY
} from "~/utils/Constants"
import { saveAccountAffiliation } from "~/ApiServices/Service/AccountService"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { CustomFormConfigHook } from "~/Component/Common/Form/FormMetaShadowingProcessor"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { CustomFormModalOpenButton } from "~/Component/Common/Modal/FormModal/CustomFormModalOpenButton"
import { eventBus } from "~/utils/EventBus"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import { iconType } from "~/Component/Common/Form/Buttons/IconButton"

interface IAccountContactFormProps {
  editMode: boolean
  initialValue: { [key: string]: any }
  formInstance: FormInstance
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

const fieldNames: IAccountContactFieldNames = {
  AccountAffiliationID: "AccountAffiliationID",
  AccountID: "AccountID",
  PersonID: "PersonID",
  FirstName: "FirstName",
  LastName: "LastName",
  Birthday: "Birthday",
  EmailAddress: "EmailAddress",
  AffiliationRoleTypeID: "AffiliationRoleTypeID",
  StatusID: "StatusID",
  IsContactShared: "IsContactShared",
  IsPrimaryAccountAffiliation: "IsPrimaryAccountAffiliation",
  ERPID: "ERPID",
  AsnwerList: "AnswerList"
}

function AccountContactForm(props: IAccountContactFormProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const [roleTypeID, setRoleTypeID] = useState(Number)
  const [questionItems, setQuestionItems] = useState<Array<any>>([])
  const questionAnswers: { [key: string]: any } = {}

  const AccountAffiliationID = props.initialValue.AccountAffiliationID
  const AffiliationRoleTypeID = props.initialValue.AffiliationRoleTypeID
  const AccountContactFormConfig: IAccountContactFieldNames = CustomFormConfigHook(
    fieldNames,
    "AccountContactForm"
  ) as IAccountContactFieldNames

  useEffect(() => {
    async function loadQuestions(roleTypeID: number) {
      setLoading(true)
      const res = await getTaggedQuestionsByAffiliationRoleType({ AffiliationRoleTypeID: roleTypeID })
      if (res.success && Array.isArray(res.data)) {
        setQuestionItems(res.data)
        if (AccountAffiliationID) {
          loadAnswers(AccountAffiliationID)
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
    } else if (AffiliationRoleTypeID) {
      loadQuestions(AffiliationRoleTypeID)
    }
    // eslint-disable-next-line
  }, [props, roleTypeID])

  const handelRoleTypeSelection = (value: any) => {
    setRoleTypeID(value)
  }

  return (
    <>
      <Row>
        <Col xs={24} sm={24} md={12}>
          <FormInput
            hidden
            formInstance={props.formInstance}
            defaultValue={props.initialValue.AccountID}
            label={"Account ID"}
            ariaLabel={"Account ID"}
            fieldName="AccountID"
            {...AccountContactFormConfig.AccountID}
          />

          <FormInput
            hidden
            formInstance={props.formInstance}
            defaultValue={props.initialValue.AccountAffiliationID}
            label={"Account Affilation ID"}
            ariaLabel={"Account Affilation ID"}
            fieldName="AccountAffiliationID"
            {...AccountContactFormConfig.AccountAffiliationID}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"First Name"}
            ariaLabel={"Frist Name"}
            fieldName="FirstName"
            rules={[{ required: true, message: "Please enter first name!" }]}
            {...AccountContactFormConfig.FirstName}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Last Name"}
            ariaLabel={"Last Name"}
            fieldName="LastName"
            rules={[{ required: true, message: "Please enter last name!" }]}
            {...AccountContactFormConfig.LastName}
          />

          <FormDatePicker
            label={"Date Of Birth"}
            formInstance={props.formInstance}
            {...layout}
            aria-label="Pick BirthDate"
            placeholder="YYYY/MM/DD"
            fieldName="Birthday"
            defaultValue={props.initialValue.Birthday}
            {...AccountContactFormConfig.Birthday}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"Email Address"}
            ariaLabel={"Email Address"}
            fieldName="EmailAddress"
            rules={[{ required: true, message: "Please enter valid email address!", type: "email" }]}
            {...AccountContactFormConfig.EmailAddress}
          />

          <FormDropDown
            {...layout}
            formInstance={props.formInstance}
            label={"Status"}
            ariaLabel={"StatusID"}
            fieldName="StatusID"
            options={[
              { label: "Active", value: ACCOUNT_AFFILIATION_STATUS_ACTIVE },
              { label: "Inactive", value: ACCOUNT_AFFILIATION_STATUS_INACTIVE },
              { label: "Pending", value: ACCOUNT_AFFILIATION_STATUS_PENDING }
            ]}
            {...AccountContactFormConfig.StatusID}
            rules={[{ required: true, message: "Please select status!" }]}
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <FormDropDown
            {...layout}
            formInstance={props.formInstance}
            label={"Role Type"}
            ariaLabel={"Role Type"}
            fieldName="AffiliationRoleTypeID"
            onChangeCallback={handelRoleTypeSelection}
            refLookupService={() => getAffiliationRoleTypes({ IsActive: true })}
            displayKey="Name"
            valueKey="AffiliationRoleTypeID"
            {...AccountContactFormConfig.AffiliationRoleTypeID}
            rules={[{ required: true, message: "Please select affiliation role type!" }]}
          />

          <FormMultipleRadio
            {...layout}
            formInstance={props.formInstance}
            label={"Shared Contact"}
            ariaLabel={"Shared Contact"}
            fieldName="IsContactShared"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
            {...AccountContactFormConfig.IsContactShared}
          />

          <FormMultipleRadio
            {...layout}
            formInstance={props.formInstance}
            label={"Primary Contact"}
            ariaLabel={"Primary Contact"}
            fieldName="IsPrimaryAccountAffiliation"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
            {...AccountContactFormConfig.IsPrimaryAccountAffiliation}
          />

          <FormInput
            {...layout}
            formInstance={props.formInstance}
            label={"ERPID"}
            ariaLabel={"ERPID"}
            fieldName="ERPID"
            {...AccountContactFormConfig.ERPID}
          />
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
    </>
  )
}

export function AccountContactFormOpenButton(props: {
  editMode: boolean
  iconType?: iconType
  initialValues: { [key: string]: any }
}) {
  const [loading] = useState(false)
  const [formInstance] = Form.useForm()
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [initialValues] = useState<{ [key: string]: any }>(props.initialValues || {})

  const onFormSubmission = async (closeModal: () => void) => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()
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
      saveAccountAffiliation(params)
        .then((response) => {
          console.log("validation passed ", response)
          setApiCallInProgress(false)
          if (response && response.success) {
            formInstance.resetFields()
            message.success(ADDED_SUCCESSFULLY)
            eventBus.publish("REFRESH_CONTACT_TAB")
            closeModal()
          } else {
            console.log("validation failed ", response.error)
            setErrorMessages(response.error)
          }
        })
        .catch((y) => console.error(y))
    })
  }

  return (
    <CustomFormModalOpenButton
      formTitle={props.editMode ? "Edit Contact" : "Add Contact"}
      customForm={<AccountContactForm editMode={true} initialValue={props.initialValues} formInstance={formInstance} />}
      formInstance={formInstance}
      onFormSubmission={onFormSubmission}
      initialValues={initialValues}
      apiCallInProgress={apiCallInProgress}
      iconType={props.iconType}
      loading={loading}
      errorMessages={errorMessages}
      buttonLabel={""}
      buttonProps={{ type: "primary", icon: props.editMode ? <EditOutlined /> : <PlusOutlined />, shape: "circle" }}
    />
  )
}

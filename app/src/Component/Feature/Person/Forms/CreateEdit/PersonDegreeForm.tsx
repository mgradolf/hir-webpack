import React, { useState, useEffect } from "react"
import { Card, Button, Row, Col, Select, message } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import {
  createPersonEducationHistory,
  getDegreeProgram,
  updatePersonEducationHistory
} from "~/ApiServices/Service/PersonService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import { eventBus } from "~/utils/EventBus"
import { getCredentialType, getExitReasons, getSchoolCode } from "~/ApiServices/Service/RefLookupService"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { FormDatePicker } from "~/Component/Common/Form/FormDatePicker"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/utils/Constants"
import "~/Sass/global/index.scss"

interface IPersonDegreeFormProps {
  formInstance: FormInstance
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export function PersonDegreeForm(props: IPersonDegreeFormProps) {
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [degreeLoading, setDegreeLoading] = useState<boolean>(false)
  const [schoolCode, setSchoolCode] = useState<Array<any>>([])
  const [degreeProgram, setDegreeProgram] = useState<Array<any>>([])

  const educationHistID = props.initialFormValue.EducationHistID
  const isEdit = educationHistID !== undefined

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await getSchoolCode()
      if (result.success && result.data) {
        setSchoolCode(result.data)
      }
      setLoading(false)
    })()
    ;(async function () {
      setDegreeLoading(true)
      const result = await getDegreeProgram({})
      if (result.success && result.data) {
        if (educationHistID) {
          const credentialName = props.initialFormValue.CredentialName
          const find = result.data.filter((x: any) => x.Description === credentialName)
          if (find[0] !== undefined) {
            props.formInstance.setFieldsValue({ DegreeProgram: credentialName, CredentialName: undefined })
          }
        }
        setDegreeProgram(result.data)
      }
      setDegreeLoading(false)
    })()
    // eslint-disable-next-line
  }, [])

  const onFormSubmission = async () => {
    await props.formInstance.validateFields()
    const params = props.formInstance.getFieldsValue()

    if (params["CredentialName"] === undefined) {
      if (params["DegreeProgram"] !== undefined) {
        params["CredentialName"] = params["DegreeProgram"]
      }
    }

    const serviceMethoToCall: (params: { [key: string]: any }) => Promise<IApiResponse> = isEdit
      ? updatePersonEducationHistory
      : createPersonEducationHistory

    setErrorMessages([])
    props.setApiCallInProgress(true)
    const response = await serviceMethoToCall(params)
    console.log(response)
    props.setApiCallInProgress(false)

    if (response && response.success) {
      props.closeModal && props.closeModal()
      message.success(isEdit ? UPDATE_SUCCESSFULLY : CREATE_SUCCESSFULLY)
      eventBus.publish("REFRESH_EDUCATION_HISTORY_TAB")
    } else {
      console.log(response.error)
      setErrorMessages(response.error)
    }
  }

  const handleSchoolCode = (value: any) => {
    const schoolCodes = schoolCode.filter((x: any) => x.ID === value)
    props.formInstance.setFieldsValue({ EstablishmentName: schoolCodes[0].Name })
  }

  return (
    <Card
      title={isEdit ? "Update Degree" : "Add Degree"}
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
        <Row>
          <Col xs={24} sm={24} md={12}>
            <FormInput label="PersonID" fieldName="PersonID" formInstance={props.formInstance} hidden />
            <FormInput label="EducationHistID" fieldName="EducationHistID" formInstance={props.formInstance} hidden />
            <Form.Item label="School Code" {...layout} name="SchoolCodeID">
              <Select loading={loading} onChange={handleSchoolCode} aria-label="School Code Select">
                {schoolCode.map((x) => {
                  return (
                    <Select.Option key={x.ID} value={x.ID}>
                      {`${x.Description} (${x.Name})`}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Degree Program" {...layout} name="DegreeProgram">
              <Select loading={degreeLoading} aria-label="Degree Program Select">
                {degreeProgram.map((x) => {
                  return (
                    <Select.Option key={x.ID} value={x.Description}>
                      {x.Description}
                    </Select.Option>
                  )
                })}
              </Select>
            </Form.Item>
            <FormInput
              labelColSpan={8}
              wrapperColSpan={14}
              label="Lic/Cert Name"
              fieldName="CredentialName"
              maxLength={255}
              formInstance={props.formInstance}
            />
            <FormDatePicker
              labelColSpan={8}
              wrapperColSpan={14}
              label="Start Date"
              fieldName="StartDate"
              defaultValue={props.initialFormValue.StartDate}
              formInstance={props.formInstance}
              rules={[{ required: true, message: "Please pick start date!" }]}
            />
            <FormDropDown
              labelColSpan={8}
              wrapperColSpan={14}
              label={"Exit Reason"}
              ariaLabel={"Exit Reason Select"}
              formInstance={props.formInstance}
              fieldName={"ExitReasonCodeID"}
              refLookupService={getExitReasons}
              displayKey="Name"
              valueKey="ID"
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <FormInput
              labelColSpan={8}
              wrapperColSpan={14}
              label="School/Establishment Name"
              fieldName="EstablishmentName"
              maxLength={50}
              formInstance={props.formInstance}
            />
            <FormDropDown
              labelColSpan={8}
              wrapperColSpan={14}
              label={"Credetial Type"}
              ariaLabel={"Credetial Type Select"}
              formInstance={props.formInstance}
              fieldName={"CredentialTypeID"}
              refLookupService={getCredentialType}
              displayKey="Name"
              valueKey="ID"
              rules={[{ required: true, message: "Please select credential type!" }]}
            />
            <FormNumberInput
              labelColSpan={8}
              wrapperColSpan={14}
              label="Lic/Cert Number"
              fieldName="CredentialNumber"
              formInstance={props.formInstance}
            />
            <FormDatePicker
              labelColSpan={8}
              wrapperColSpan={14}
              label="End Date"
              fieldName="EndDate"
              defaultValue={props.initialFormValue.EndDate}
              formInstance={props.formInstance}
            />
            <FormDatePicker
              labelColSpan={8}
              wrapperColSpan={14}
              label="Conferred"
              fieldName="DateConferred"
              defaultValue={props.initialFormValue.DateConferred}
              formInstance={props.formInstance}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

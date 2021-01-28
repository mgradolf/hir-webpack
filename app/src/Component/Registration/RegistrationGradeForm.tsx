import React, { useEffect, useState } from "react"
import { Form, Button, Input, Select, DatePicker, Spin, Card } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/OldForm/FormError"
import { CEU_HOURS, CREDIT_HOURS, DATE_TIME_FORMAT, REQUEST_DATE_TIME_FORMAT } from "~/utils/Constants"
import { getGradeScaleType } from "~/ApiServices/Service/RefLookupService"
import {
  findGradeScoreDefinition,
  getGradeDefinitionDetails,
  saveFinalGrade
} from "~/ApiServices/Service/RegistrationService"
import { IRegistrationGradeFieldNames } from "~/Component/Registration/Interfaces"
import "~/Sass/utils.scss"
import moment from "moment"
import { eventBus, REFRESH_REGISTRATION_DETAIL_PAGE } from "~/utils/EventBus"

interface IRegistrationGradeFormProps {
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  handleCancel: () => void
}

const fieldNames: IRegistrationGradeFieldNames = {
  SectionID: "SectionID",
  StudentID: "StudentID",
  SeatGroupID: "SeatGroupID",
  CompletionDate: "CompletionDate",
  CEUHours: "CEUHours",
  CreditHours: "CreditHours",
  GradeScaleTypeID: "GradeScaleTypeID",
  GradeScoreDefinitionID: "GradeScoreDefinitionID",
  AttendanceActual: "AttendanceActual",
  AttendanceExpected: "AttendanceExpected"
}

const layout = {
  labelCol: { span: 8 }
}

export default function RegistrationGradeForm(props: IRegistrationGradeFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [isCreditHourEditable, setIsCreditHourEditable] = useState<boolean>(true)
  const [isCEUHourEditable, setIsCEUHourEditable] = useState<boolean>(true)
  const [gradeScaleItems, setGradeScaleItems] = useState<Array<any>>([])
  const [gradeScoreDefinitionItems, setGradeScoreDefinitionItems] = useState<Array<any>>([])
  const [gradeDefinitionDetails, setGradeDefinitionDetails] = useState<{ [key: string]: any }>({})
  const [gradeScaleTypeID, setGradeScaleTypeID] = useState<number>(props.initialFormValue.GradeScaleTypeID)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  props.initialFormValue[fieldNames.CreditHours] = props.initialFormValue.AttemptedHours
  const completionDate = props.initialFormValue.CompletionDate

  useEffect(() => {
    ;(async function () {
      const result = await getGradeScaleType()
      if (result && result.success) {
        setGradeScaleItems(result.data)
      }
    })()
  }, [form])

  useEffect(() => {
    ;(async function () {
      const result = await findGradeScoreDefinition({
        GradeScaleTypeID: gradeScaleTypeID
      })
      if (result && result.success) {
        setGradeScoreDefinitionItems(result.data)
      }
    })()
    ;(async function () {
      if (props.initialFormValue.GradeScoreDefinitionID) {
        setLoading(true)
        const response = await getGradeDefinitionDetails({
          SectionID: props.initialFormValue.SectionID,
          StudentID: props.initialFormValue.StudentID,
          GradeScoreDefinitionID: props.initialFormValue.GradeScoreDefinitionID
        })
        if (response && response.success) {
          setGradeDefinitionDetails(response.data)
          const editableFields: Array<any> = response.data.EditableFields
          if (editableFields) {
            editableFields.forEach((element) => {
              if (element === CREDIT_HOURS) {
                setIsCreditHourEditable(false)
              }
              if (element === CEU_HOURS) {
                setIsCEUHourEditable(false)
              }
            })
          }
        }
        setLoading(false)
      }
    })()
  }, [form, props, gradeScaleTypeID])

  const gradeScaleHandler = (event: any) => {
    setGradeScaleTypeID(event)
    form.setFieldsValue({ [fieldNames.GradeScoreDefinitionID]: null })
  }

  const gradeScoreHandler = async (value: any) => {
    setLoading(true)
    const response = await getGradeDefinitionDetails({
      SectionID: props.initialFormValue.SectionID,
      StudentID: props.initialFormValue.StudentID,
      GradeScoreDefinitionID: value
    })
    if (response && response.success) {
      setGradeDefinitionDetails(response.data)
      const editableFields: Array<any> = response.data.EditableFields
      if (editableFields) {
        editableFields.forEach((element) => {
          if (element === CREDIT_HOURS) {
            setIsCreditHourEditable(false)
          }
          if (element === CEU_HOURS) {
            setIsCEUHourEditable(false)
          }
        })
      }
    }
    setLoading(false)
  }

  const onFormSubmission = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()

    const objectKeys = Object.keys(params)
    objectKeys.forEach((key) => {
      if (params[key] === undefined || params[key] === null) {
        delete params[key]
      }
    })

    console.log("Params: ", params)

    setLoading(true)
    setErrorMessages([])
    const response = await saveFinalGrade(params)
    if (response && response.success) {
      eventBus.publish(REFRESH_REGISTRATION_DETAIL_PAGE)
      props.handleCancel()
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setLoading(false)
  }

  const onDateChange = (date: any, dateString: string) => {
    form.setFieldsValue({ [fieldNames.CompletionDate]: date })
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Update</Button>)

  return (
    <Card title={"Update Grades"} actions={actions}>
      <Spin size="large" spinning={loading}>
        <Form
          form={form}
          style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}
          initialValues={props.initialFormValue}
        >
          <FormError errorMessages={errorMessages} />

          <Form.Item className="hidden" name={fieldNames.StudentID}>
            <Input aria-label="Student ID" />
          </Form.Item>
          <Form.Item className="hidden" name={fieldNames.SectionID}>
            <Input aria-label="Section ID" />
          </Form.Item>
          <Form.Item className="hidden" name={fieldNames.SeatGroupID}>
            <Input aria-label="SeatGroup ID" />
          </Form.Item>

          <Form.Item label="Grade Scale" {...layout} name={fieldNames.GradeScaleTypeID}>
            <Select aria-label="Grade Scale" onChange={gradeScaleHandler}>
              {gradeScaleItems.map((x) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Name}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Gade Score Definition" {...layout} name={fieldNames.GradeScoreDefinitionID}>
            <Select aria-label="Grade Score Definition" onChange={gradeScoreHandler}>
              {gradeScoreDefinitionItems.map((x) => {
                return (
                  <Select.Option key={x.GradeScoreDefinitionID} value={x.GradeScoreDefinitionID}>
                    {x.AlphaValue} ({x.GradeClassificationType})
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Credit Hours" {...layout} name={fieldNames.CreditHours}>
            <Input type="number" disabled={isCreditHourEditable} aria-label="Credit hours" />
          </Form.Item>

          <Form.Item label="CEUs" {...layout} name={fieldNames.CEUHours}>
            <Input type="number" disabled={isCEUHourEditable} aria-label="CEUs" />
          </Form.Item>

          <Form.Item label="Final Grade" {...layout}>
            <Input disabled aria-label="Final Grade" value={gradeDefinitionDetails.AlphaValue} />
          </Form.Item>

          <Form.Item label="GPA Value" {...layout}>
            <Input disabled aria-label="GPA Value" value={gradeDefinitionDetails.GPAValue} />
          </Form.Item>

          <Form.Item label="Earned Hours" {...layout}>
            <Input disabled aria-label="Earned hours" value={gradeDefinitionDetails.EarnedHours} />
          </Form.Item>

          <Form.Item label="Attempted Hours" {...layout}>
            <Input disabled aria-label="Attempted hours" value={gradeDefinitionDetails.AttemptedHours} />
          </Form.Item>

          <Form.Item label="GPA Hours" {...layout}>
            <Input disabled aria-label="GPA hours" value={gradeDefinitionDetails.GPAHours} />
          </Form.Item>

          <Form.Item label="CEU Hours" {...layout}>
            <Input disabled aria-label="CEU hours" value={gradeDefinitionDetails.CEUHours} />
          </Form.Item>

          <Form.Item className="hidden" name={fieldNames.CompletionDate}>
            <Input aria-label="Completion date" />
          </Form.Item>

          <Form.Item label="Completion Date" {...layout}>
            <DatePicker
              aria-label="Pick Completion Date"
              placeholder={DATE_TIME_FORMAT}
              format={DATE_TIME_FORMAT}
              onChange={onDateChange}
              defaultValue={completionDate ? moment(completionDate, REQUEST_DATE_TIME_FORMAT) : undefined}
            />
          </Form.Item>

          <Form.Item label="Expected Attendance" {...layout} name={fieldNames.AttendanceExpected}>
            <Input aria-label="Expected Attendance" />
          </Form.Item>

          <Form.Item label="Actual Attendance" {...layout} name={fieldNames.AttendanceActual}>
            <Input aria-label="Actual Attendance" />
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  )
}

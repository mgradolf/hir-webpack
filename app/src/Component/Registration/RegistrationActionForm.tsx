import React, { useEffect, useState } from "react"
import { Form, Button, Input, Select, Switch, DatePicker, Table } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  GRADE_CLASSIFICATION_TYPE_WITHDRAW,
  REQUEST_DATE_TIME_FORMAT
} from "~/utils/Constants"
import { getGradeScaleType } from "~/ApiServices/Service/RefLookupService"
import {
  editRegistration,
  findGradeScoreDefinition,
  getCreditMemoData
} from "~/ApiServices/Service/RegistrationService"
import { IRegistrationActionFieldNames } from "~/Component/Registration/Interfaces"
import "~/Sass/utils.scss"
import moment from "moment"

interface IRegistrationFormProps {
  initialFormValue: { [key: string]: any }
  setApiCallInProgress: (flag: boolean) => void
  fieldNames: IRegistrationActionFieldNames
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 6 }
}

const btnLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

const columns = [
  {
    title: "Description",
    dataIndex: "Description",
    width: "25%",
    editable: false
  },
  {
    title: "Quantity",
    dataIndex: "Quantity",
    width: "15%",
    editable: false
  },
  {
    title: "Total Cost",
    dataIndex: "PaymentAmount",
    width: "30%",
    editable: false
  },
  {
    title: "Credit Amount",
    dataIndex: "PaymentAmount",
    width: "30%",
    editable: true
  }
]

export default function RegistrationActionForm(props: IRegistrationFormProps) {
  const [form] = Form.useForm()
  const [actionName, setActionName] = useState<string>("Drop")
  const [showGradeScale, setShowGradeScale] = useState<boolean>(false)
  const [showEffectiveDate, setShowEffectiveDate] = useState<boolean>(true)
  const [gradeScaleItems, setGradeScaleItems] = useState<Array<any>>([])
  const [creditMemoItems, setCreditMemoItems] = useState<Array<any>>([])
  const [gradeScoreDefinitionItems, setGradeScoreDefinitionItems] = useState<Array<any>>([])
  const [gradeScaleTypeID, setGradeScaleTypeID] = useState<number>(props.initialFormValue.GradeScaleTypeID)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    ;(async function () {
      const result = await getGradeScaleType()
      if (result && result.success) {
        setGradeScaleItems(result.data)
      }
    })()
    ;(async function () {
      const result = await getCreditMemoData({
        SectionID: props.initialFormValue.SectionID,
        StudentID: props.initialFormValue.StudentID
      })
      if (result && result.success) {
        setCreditMemoItems(result.data)
      }
    })()
  }, [props])

  useEffect(() => {
    ;(async function () {
      const result = await findGradeScoreDefinition({
        GradeScaleTypeID: gradeScaleTypeID,
        GradeClassificationTypeID: GRADE_CLASSIFICATION_TYPE_WITHDRAW
      })
      if (result && result.success) {
        setGradeScoreDefinitionItems(result.data)
      }
    })()
  }, [gradeScaleTypeID])

  const onFormSubmission = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()
    console.log("Params: ", params)

    props.setApiCallInProgress(true)
    setErrorMessages([])
    const response = await editRegistration(params)
    props.setApiCallInProgress(false)
    if (response && response.success) {
      form.resetFields()
      console.log("Successfully updated......")
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
  }

  const gradeScaleHandler = (event: any) => {
    setGradeScaleTypeID(event)
  }

  const actionHandler = (event: any) => {
    if (event === "Delete") {
      form.resetFields()
      setShowEffectiveDate(false)
      setShowGradeScale(false)
    } else {
      setShowEffectiveDate(true)
    }
    setActionName(event)
  }

  const effectiveDateHandler = (effectiveDate: any) => {
    console.log("date: ", effectiveDate)
    const finalEnrollmentDate = moment(props.initialFormValue.FinalEnrollmentDate, REQUEST_DATE_TIME_FORMAT)

    if (effectiveDate > finalEnrollmentDate) {
      setShowGradeScale(true)
      setActionName("Withdraw")
    } else {
      setActionName("Drop")
      setShowGradeScale(false)
    }
  }

  return (
    <Form form={form} initialValues={props.initialFormValue}>
      <FormError errorMessages={errorMessages} />

      <Form.Item className="hidden" name={props.fieldNames.StudentID}>
        <Input aria-label="Student ID" />
      </Form.Item>
      <Form.Item className="hidden" name={props.fieldNames.SectionID}>
        <Input aria-label="Section ID" />
      </Form.Item>

      <Form.Item label="Student" {...layout}>
        <Input disabled value={props.initialFormValue.StudentName} />
      </Form.Item>

      <Form.Item label="Offering" {...layout}>
        <Input disabled value={props.initialFormValue.SectionNumber} />
      </Form.Item>

      <Form.Item label="Final Enrollment Date" {...layout}>
        <Input
          disabled
          value={moment(props.initialFormValue.FinalEnrollmentDate, REQUEST_DATE_TIME_FORMAT).format(DATE_FORMAT)}
        />
      </Form.Item>

      <Form.Item label="Action" rules={[{ required: true, message: "Please select your answer!" }]} {...layout}>
        <Select aria-label="Actions" value={actionName} onChange={actionHandler}>
          <Select.Option key="1" value="Drop">
            Drop
          </Select.Option>
          <Select.Option key="2" value="Withdraw">
            Withdraw
          </Select.Option>
          <Select.Option key="3" value="Delete">
            Delete
          </Select.Option>
        </Select>
      </Form.Item>

      {showEffectiveDate && (
        <Form.Item
          label="Effective Date"
          rules={[{ required: true, message: "Please pick the date!" }]}
          {...layout}
          name={props.fieldNames.EffectiveDate}
        >
          <DatePicker
            aria-label="Pick Effective Date"
            onChange={effectiveDateHandler}
            placeholder={DATE_TIME_FORMAT}
            format={DATE_TIME_FORMAT}
          />
        </Form.Item>
      )}

      {showGradeScale && (
        <Form.Item
          label="Grade Scale"
          rules={[{ required: true, message: "Please select your answer!" }]}
          {...layout}
          name={props.fieldNames.GradeScaleTypeID}
        >
          <Select onChange={gradeScaleHandler} aria-label="Grade Scale">
            {gradeScaleItems.map((x) => {
              return (
                <Select.Option key={x.ID} value={x.ID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      )}

      {showGradeScale && (
        <Form.Item label="Final Grade" {...layout} name={props.fieldNames.GradeScoreDefinitionID}>
          <Select aria-label="Final Grade">
            {gradeScoreDefinitionItems.map((x) => {
              return (
                <Select.Option key={x.GradeScoreDefinitionID} value={x.GradeScoreDefinitionID}>
                  {x.GradeClassificationType}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      )}

      <Form.Item
        label="Return seat and issue credit"
        {...layout}
        valuePropName="checked"
        name={props.fieldNames.IsRefund}
      >
        <Switch aria-label="Return seat and issue credit" />
      </Form.Item>

      <Table bordered dataSource={creditMemoItems} columns={columns} />

      <Form.Item {...btnLayout}>
        <Button type="primary" style={{ float: "right" }} onClick={onFormSubmission}>
          Update
        </Button>
      </Form.Item>
    </Form>
  )
}

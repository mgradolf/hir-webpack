import React, { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Form, Input, Select, Switch, DatePicker, Table, Spin, Button, Card } from "antd"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
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
  dropOrWithdrawRegistration,
  deleteRegistration,
  findGradeScoreDefinition,
  getCreditMemoData
} from "~/ApiServices/Service/RegistrationService"
import { IRegistrationActionFieldNames } from "~/Component/Registration/Interfaces"
import "~/Sass/utils.scss"
import moment from "moment"

interface IRegistrationFormProps {
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  handleCancel: () => void
}

const fieldNames: IRegistrationActionFieldNames = {
  SectionID: "SectionID",
  StudentID: "StudentID",
  SeatGroupID: "SeatGroupID",
  EffectiveDate: "EffectiveDate",
  IsRefund: "IsRefund",
  CreditMemoData: "CreditMemoData",
  GradeScaleTypeID: "GradeScaleTypeID",
  GradeScoreDefinitionID: "GradeScoreDefinitionID"
}

const layout = {
  labelCol: { span: 8 }
}

export default function RegistrationActionForm(props: IRegistrationFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [actionName, setActionName] = useState<string>("Drop")
  const [showGradeScale, setShowGradeScale] = useState<boolean>(false)
  const [showEffectiveDate, setShowEffectiveDate] = useState<boolean>(true)
  const [showRefundItems, setShowRefundItems] = useState<boolean>(true)
  const [gradeScaleItems, setGradeScaleItems] = useState<Array<any>>([])
  const [creditMemoItems, setCreditMemoItems] = useState<Array<any>>([])
  const [gradeScoreDefinitionItems, setGradeScoreDefinitionItems] = useState<Array<any>>([])
  const [gradeScaleTypeID, setGradeScaleTypeID] = useState<number>(props.initialFormValue.GradeScaleTypeID)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  const [redirectAfterRemoveURL, setRedirectAfterRemove] = useState("")
  const finalEnrollmentDate = moment(props.initialFormValue.FinalEnrollmentDate, REQUEST_DATE_TIME_FORMAT)

  const [creditMemoData] = useState<Array<any>>([])
  props.initialFormValue["IsRefund"] = showRefundItems

  useEffect(() => {
    ;(async function () {
      const result = await getGradeScaleType()
      if (result && result.success) {
        setGradeScaleItems(result.data)
      }
    })()
    ;(async function () {
      setLoading(true)
      const result = await getCreditMemoData({
        SectionID: props.initialFormValue.SectionID,
        StudentID: props.initialFormValue.StudentID
      })
      if (result && result.success) {
        setCreditMemoItems(result.data)
        result.data.forEach((object: any) => {
          creditMemoData.push({
            OrderLineID: object.OrderLineID,
            Amount: parseFloat(object.CreditAmountTotal).toFixed(2)
          })
        })
      }
      setLoading(false)
    })()
  }, [props, creditMemoData])

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
    if (params["IsRefund"]) {
      params["CreditMemoData"] = creditMemoData
    }
    console.log("Params: ", params)
    console.log("Action name: ", actionName)

    type serviceMethodType = (params: { [key: string]: any }) => Promise<IApiResponse>
    const serviceMethoToCall: serviceMethodType =
      actionName === "Delete" ? deleteRegistration : dropOrWithdrawRegistration

    setLoading(true)
    setErrorMessages([])
    const response = await serviceMethoToCall(params)
    if (response && response.success) {
      setRedirectAfterRemove(`/section/${props.initialFormValue.SectionID}/registration`)
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setLoading(false)
  }

  const gradeScaleHandler = (event: any) => {
    setGradeScaleTypeID(event)
  }

  const actionHandler = (event: any) => {
    if (event === "Delete") {
      setShowEffectiveDate(false)
    } else {
      setShowEffectiveDate(true)
    }
    setShowGradeScale(false)
    form.resetFields()
    setActionName(event)
  }

  const effectiveDateHandler = (effectiveDate: any) => {
    if (effectiveDate > finalEnrollmentDate) {
      setShowGradeScale(true)
      setActionName("Withdraw")
    } else {
      setActionName("Drop")
      setShowGradeScale(false)
    }
  }

  const columns = [
    {
      title: "Description",
      dataIndex: "Description"
    },
    {
      title: "Quantity",
      dataIndex: "Quantity"
    },
    {
      title: "Total Cost",
      dataIndex: "ChargeAmount"
    },
    {
      title: "Credit Amount",
      render: (record: any) => {
        return <Input onChange={(event) => onAmountHandler(record, event)} defaultValue={record.CreditAmountTotal} />
      }
    }
  ]

  const onAmountHandler = (record: any, event: any) => {
    const recordAmount = parseFloat(event.target.value).toFixed(2)
    const recordOderLineID = record.OrderLineID
    creditMemoData.forEach((object) => {
      if (object.OrderLineID === recordOderLineID) {
        object.Amount = recordAmount
        return
      }
    })
  }

  const refundHandler = (isRefund: any) => {
    setShowRefundItems(isRefund)
  }

  const actions = []
  actions.push(<Button onClick={props.handleCancel}>Cancel</Button>)
  actions.push(<Button onClick={onFormSubmission}>Update</Button>)

  return (
    <Card title={"Registration Drop/Withdraw/Delete"} actions={actions}>
      <Spin size="large" spinning={loading}>
        <Form form={form} initialValues={props.initialFormValue}>
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
              name={fieldNames.EffectiveDate}
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
              name={fieldNames.GradeScaleTypeID}
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
            <Form.Item label="Final Grade" {...layout} name={fieldNames.GradeScoreDefinitionID}>
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
            name={fieldNames.IsRefund}
          >
            <Switch onChange={refundHandler} aria-label="Return seat and issue credit" />
          </Form.Item>

          {showRefundItems && (
            <Table rowKey="OrderLineID" bordered dataSource={creditMemoItems} pagination={false} columns={columns} />
          )}
          {redirectAfterRemoveURL !== "" && <Redirect to={redirectAfterRemoveURL} />}
        </Form>
      </Spin>
    </Card>
  )
}

import "~/Sass/utils.scss"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Form, Button, Input, DatePicker, Spin, Select } from "antd"
import FormError from "~/Component/Common/FormError"
import { DATE_FORMAT, ISSUE_CERTIFICATE_SAVE_SUCCESS } from "~/utils/Constants"
import { issueCertificate } from "~/ApiServices/Service/RegistrationService"
import Notification from "~/utils/notification"
import { getApplicableSectionCertificate } from "~/ApiServices/BizApi/certificate/certificateIF"
import { ICertificateFieldNames } from "~/Component/Registration/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"

interface ICertificateFormProps {
  initialFormValue: { [key: string]: any }
  fieldNames: ICertificateFieldNames
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 6 }
}

const btnLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

export default function IssueCertificateForm(props: ICertificateFormProps) {
  const sectionID = props.initialFormValue.SectionID
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [certificateItems, setCertificateItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  let validityMonths: any = null
  props.initialFormValue["IsProgram"] = false

  useEffect(() => {
    ;(async function () {
      setLoading(true)
      const result = await getApplicableSectionCertificate([sectionID])
      if (result && result.success) {
        setCertificateItems(result.data)
      }
      setLoading(false)
    })()
  }, [props, sectionID])

  const onFormSubmission = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()

    console.log("Params: ", params)

    setLoading(true)
    setErrorMessages([])
    const response = await issueCertificate(params)
    if (response && response.success) {
      Notification(ISSUE_CERTIFICATE_SAVE_SUCCESS)
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setLoading(false)
  }

  const certificateHandler = (certificateID: any) => {
    certificateItems.forEach((element) => {
      if (element.CertificateID === certificateID) {
        validityMonths = element.ValidityMonths
      }
    })

    const currentDate = new Date()
    if (validityMonths !== null) {
      form.setFieldsValue({
        [props.fieldNames.ExpirationDate]: moment(
          new Date(currentDate.setMonth(currentDate.getMonth() + validityMonths))
        )
      })
    } else {
      form.setFieldsValue({
        [props.fieldNames.ExpirationDate]: undefined
      })
    }
    form.setFieldsValue({ [props.fieldNames.IssueDate]: moment(new Date()) })
  }

  const issueDateHandler = (date: any) => {
    const selectedDate = date.toDate()
    console.log("Selected date: ", selectedDate)
    console.log("validity month: ", validityMonths)

    if (validityMonths !== null) {
      form.setFieldsValue({
        [props.fieldNames.ExpirationDate]: moment(
          new Date(selectedDate.setMonth(selectedDate.getMonth() + validityMonths))
        )
      })
    }
  }

  return (
    <Spin size="large" spinning={loading}>
      <Form form={form} initialValues={props.initialFormValue}>
        <FormError errorMessages={errorMessages} />

        <Form.Item className="hidden" name={props.fieldNames.StudentID}>
          <Input aria-label="Student ID" />
        </Form.Item>
        <Form.Item className="hidden" name={props.fieldNames.SectionID}>
          <Input aria-label="Section ID" />
        </Form.Item>

        <Form.Item className="hidden" name={props.fieldNames.IsProgram}>
          <Input aria-label="Certificate type" />
        </Form.Item>

        <Form.Item label="Certificate Type" {...layout}>
          <Input disabled value={props.initialFormValue.IsProgram ? "Program" : "Offering"} />
        </Form.Item>

        <Form.Item label="Student Name" {...layout}>
          <Input disabled value={props.initialFormValue.StudentName} />
        </Form.Item>

        <Form.Item label="Section Number" {...layout}>
          <Input disabled value={props.initialFormValue.SectionNumber} />
        </Form.Item>

        <Form.Item label="Certificate Name" {...layout} name={props.fieldNames.CertificateID}>
          <Select aria-label="Certificate name" onChange={certificateHandler}>
            {certificateItems.map((x) => {
              return (
                <Select.Option key={x.CertificateID} value={x.CertificateID}>
                  {x.Name}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>

        {/* <Form.Item className="hidden" name={props.fieldNames.IssueDate}>
          <Input aria-label="Issue date" />
        </Form.Item> */}

        <Form.Item label="Issue Date" {...layout} name={props.fieldNames.IssueDate}>
          <DatePicker
            aria-label="Pick Issue Date"
            placeholder={DATE_FORMAT}
            format={DATE_FORMAT}
            onChange={issueDateHandler}
          />
        </Form.Item>

        <Form.Item label="Expiration Date" {...layout} name={props.fieldNames.ExpirationDate}>
          <DatePicker aria-label="Pick Expiration Date" placeholder={DATE_FORMAT} format={DATE_FORMAT} />
        </Form.Item>

        <Form.Item label="Comment" {...layout} name={props.fieldNames.Comment}>
          <Input.TextArea rows={4} aria-label="Comment" />
        </Form.Item>

        <Form.Item {...btnLayout}>
          <Button type="primary" style={{ float: "right" }} onClick={onFormSubmission}>
            Save Certificate
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

import moment from "moment"
import React, { useEffect, useState } from "react"
import { Form, Input, DatePicker, Select } from "antd"
import FormError from "~/Component/Common/FormError"
import { DATE_FORMAT } from "~/utils/Constants"
import { ICertificateFieldNames } from "~/Component/Registration/Interfaces"
import {
  getApplicableSectionCertificate,
  getApplicableProgramCertificate
} from "~/ApiServices/BizApi/certificate/certificateIF"
import { FormStudentLookupButton } from "~/Component/Common/Form/FormLookups/FormStudentLookup"
import { FormSectionLookupButton } from "~/Component/Common/Form/FormLookups/FormSectionLookup"
import { FormProgramLookupButton } from "~/Component/Common/Form/FormLookups/FormProgramLookup"
import "~/Sass/utils.scss"
import { FormInstance } from "antd/lib/form"

interface ICertificateFormProps {
  initialFormValue: { [key: string]: any }
  fieldNames: ICertificateFieldNames
  formInstance: FormInstance
  errorMessages: Array<any>
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 6 }
}

export default function CertificateForm(props: ICertificateFormProps) {
  const [certificateItems, setCertificateItems] = useState<Array<any>>([])
  const [sectionID, setSectionID] = useState<Number>()
  const [programID, setProgramID] = useState<Number>()

  const isProgram = props.initialFormValue.IsProgram
  let validityMonths: any = null

  useEffect(() => {
    ; (async function () {
      if (sectionID) {
        props.setApiCallInProgress(true)
        const result = await getApplicableSectionCertificate([sectionID])
        if (result && result.success) {
          setCertificateItems(result.data)
        }
        props.setApiCallInProgress(false)
      }

      if (programID) {
        props.setApiCallInProgress(true)
        const result = await getApplicableProgramCertificate([programID])
        if (result && result.success) {
          setCertificateItems(result.data)
        }
        props.setApiCallInProgress(false)
      }

    })()
    // eslint-disable-next-line
  }, [props.setApiCallInProgress, sectionID, programID])

  const certificateHandler = (certificateID: any) => {
    certificateItems.forEach((element) => {
      if (element.CertificateID === certificateID) {
        validityMonths = element.ValidityMonths
      }
    })

    const currentDate = new Date()
    if (validityMonths !== null) {
      props.formInstance.setFieldsValue({
        [props.fieldNames.ExpirationDate]: moment(
          new Date(currentDate.setMonth(currentDate.getMonth() + validityMonths))
        )
      })
    } else {
      props.formInstance.setFieldsValue({
        [props.fieldNames.ExpirationDate]: undefined
      })
    }
    props.formInstance.setFieldsValue({ [props.fieldNames.IssueDate]: moment(new Date()) })
  }

  const issueDateHandler = (date: any) => {
    const selectedDate = date.toDate()
    console.log("Selected date: ", selectedDate)
    console.log("validity month: ", validityMonths)

    if (validityMonths !== null) {
      props.formInstance.setFieldsValue({
        [props.fieldNames.ExpirationDate]: moment(
          new Date(selectedDate.setMonth(selectedDate.getMonth() + validityMonths))
        )
      })
    }
  }

  const onCloseModal = (datas: any) => {
    if (isProgram) {
      setProgramID(datas[0].ProgramID)
    } else {
      setSectionID(datas[0].SectionID)
    }
  }

  return (
    <Form form={props.formInstance} initialValues={props.initialFormValue}>
      <FormError errorMessages={props.errorMessages} />

      <Form.Item className="hidden" name={props.fieldNames.IsProgram}>
        <Input aria-label="Certificate type" />
      </Form.Item>

      <Form.Item label="Certificate Type" {...layout}>
        <Input disabled value={isProgram ? "Program" : "Offering"} />
      </Form.Item>

      <FormStudentLookupButton formInstance={props.formInstance} />

      {!isProgram &&
        <FormSectionLookupButton formInstance={props.formInstance} onCloseModal={onCloseModal} />
      }

      {isProgram &&
        <FormProgramLookupButton formInstance={props.formInstance} onCloseModal={onCloseModal} />
      }

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
    </Form>
  )
}

import moment from "moment"
import React, { useState } from "react"
import { Form, Input, DatePicker } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"
import { ICertificateFieldNames } from "~/Component/Feature/Registration/Interfaces"
import { getApplicableSectionCertificate } from "~/ApiServices/BizApi/certificate/certificateIF"
import "~/Sass/utils.scss"
import { FormInstance } from "antd/lib/form"
import { getCompletedProgram, getCompletedSection } from "~/ApiServices/BizApi/certificate/studentCertificateIF"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"

interface ICertificateFormProps {
  initialValue: { [key: string]: any }
  fieldNames: ICertificateFieldNames
  formInstance: FormInstance
  setApiCallInProgress: (flag: boolean) => void
}

export function CertificateForm(props: ICertificateFormProps) {
  let validityMonths: any = null
  const isProgram = props.initialValue.IsProgram
  const fromRegistation = props.initialValue.StudentID

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: fromRegistation ? 10 : 0 }
  }

  const [certificateItems, setCertificateItems] = useState<any[]>([])
  const [sectionID, setSectionID] = useState<number>(fromRegistation ? props.initialValue.SectionID : undefined)
  const [programID, setProgramID] = useState<number>()
  const [studentID, setStudentID] = useState<number>(fromRegistation ? props.initialValue.StudentID : undefined)
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

    if (validityMonths !== null) {
      props.formInstance.setFieldsValue({
        [props.fieldNames.ExpirationDate]: moment(
          new Date(selectedDate.setMonth(selectedDate.getMonth() + validityMonths))
        )
      })
    }
  }

  const onCloseModal = (data: any) => {
    setStudentID(data[0].StudentID)
  }

  const selectSectionHandler = (value: any) => {
    setSectionID(value)
  }

  const selectProgramHandler = (value: any) => {
    setProgramID(value)
  }

  return (
    <>
      <Form.Item className="hidden" name={props.fieldNames.IsProgram}>
        <Input aria-label="Certificate type" />
      </Form.Item>

      <Form.Item label="Certificate Type" {...layout}>
        <Input disabled value={isProgram ? "Program" : "Offering"} />
      </Form.Item>

      {fromRegistation && (
        <>
          <Form.Item label="StudentID" className="hidden" name={props.fieldNames.StudentID}>
            <Input aria-label="StudentID" />
          </Form.Item>

          <Form.Item label="Student" {...layout}>
            <Input disabled value={props.initialValue.StudentName} />
          </Form.Item>

          <Form.Item label="SectionID" className="hidden" name={props.fieldNames.SectionID}>
            <Input aria-label="SectionID" />
          </Form.Item>

          <Form.Item label="Section" {...layout}>
            <Input disabled value={props.initialValue.SectionNumber} />
          </Form.Item>
        </>
      )}

      {!fromRegistation && (
        <StudentLookup
          fieldName="StudentID"
          label="Student"
          formInstance={props.formInstance}
          onSelectedItems={onCloseModal}
        />
      )}

      {!isProgram && !fromRegistation && studentID && (
        <FormDropDown
          formInstance={props.formInstance}
          onChangeCallback={selectSectionHandler}
          label="Section"
          fieldName={props.fieldNames.SectionID}
          refLookupService={() => getCompletedSection({ StudentID: studentID })}
          displayKey="SectionNumber"
          valueKey="SectionID"
          disabled={false}
          rules={[{ required: true, message: "Please select a Section!" }]}
        />
      )}

      {isProgram && !fromRegistation && (
        <FormDropDown
          formInstance={props.formInstance}
          onSelectedItems={selectProgramHandler}
          label="Program"
          fieldName={props.fieldNames.ProgramID}
          refLookupService={() => getCompletedProgram({ StudentID: studentID })}
          displayKey="ProgramCode"
          valueKey="ProgramID"
          disabled={false}
          rules={[{ required: true, message: "Please select a Program!" }]}
        />
      )}

      {(sectionID || programID) && (
        <FormDropDown
          label="Certificate Name"
          fieldName={props.fieldNames.CertificateID}
          formInstance={props.formInstance}
          rules={[{ required: true, message: "Please select a certificate!" }]}
          displayKey="Name"
          valueKey="CertificateID"
          onChangeCallback={certificateHandler}
          refLookupService={() => {
            let Params: { [key: string]: any } = {}
            if (sectionID) Params = { SectionID: sectionID }
            else if (programID) Params = { ProgramID: programID }

            return getApplicableSectionCertificate(Params).then((result) => {
              if (result && result.success) {
                setCertificateItems(result.data)
                console.log(result.data, certificateItems)
              }
              return result
            })
          }}
        />
      )}

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
    </>
  )
}

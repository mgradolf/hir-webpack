import moment from "moment"
import React, { useState } from "react"
import { Form, DatePicker } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"
import { ICertificateFieldNames } from "~/Component/Feature/Registration/Interfaces"
import { getApplicableSectionCertificate } from "~/ApiServices/BizApi/certificate/certificateIF"
import { FormInstance } from "antd/lib/form"
import { getCompletedProgram, getCompletedSection } from "~/ApiServices/BizApi/certificate/studentCertificateIF"
import { StudentLookup } from "~/Component/Common/Form/FormLookupFields/StudentLookup"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import "~/Sass/utils.scss"

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
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
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
      <FormMultipleRadio
        {...layout}
        formInstance={props.formInstance}
        label={"Certificate Type"}
        ariaLabel={"Ceritficate Type"}
        fieldName={props.fieldNames.IsProgram}
        options={[
          { label: "Offering", value: false },
          { label: "Program", value: true }
        ]}
        disabled
      />
      {fromRegistation && (
        <>
          <FormInput
            {...layout}
            label="StudentID"
            fieldName={props.fieldNames.StudentID}
            formInstance={props.formInstance}
            hidden
          />
          <FormInput
            {...layout}
            label="Student"
            fieldName={props.fieldNames.StudentName}
            formInstance={props.formInstance}
            disabled
          />
          <FormInput
            {...layout}
            label="SectionID"
            fieldName={props.fieldNames.SectionID}
            formInstance={props.formInstance}
            hidden
          />
          <FormInput
            {...layout}
            label="Section"
            fieldName={props.fieldNames.SectionNumber}
            formInstance={props.formInstance}
            disabled
          />
        </>
      )}
      {!fromRegistation && (
        <StudentLookup
          {...layout}
          fieldName="StudentID"
          label="Student"
          formInstance={props.formInstance}
          onSelectedItems={onCloseModal}
        />
      )}

      {!isProgram && !fromRegistation && studentID && (
        <FormDropDown
          {...layout}
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

      {isProgram && !fromRegistation && studentID && (
        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          onChangeCallback={selectProgramHandler}
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
          {...layout}
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

      <Form.Item
        colon={false}
        label="Issue Date"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        name={props.fieldNames.IssueDate}
      >
        <DatePicker
          aria-label="Pick Issue Date"
          placeholder={DATE_FORMAT}
          format={DATE_FORMAT}
          onChange={issueDateHandler}
        />
      </Form.Item>

      <Form.Item
        colon={false}
        label="Expiration Date"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
        name={props.fieldNames.ExpirationDate}
      >
        <DatePicker aria-label="Pick Expiration Date" placeholder={DATE_FORMAT} format={DATE_FORMAT} />
      </Form.Item>

      <FormTextArea
        {...layout}
        label="Comment"
        fieldName={props.fieldNames.Comment}
        formInstance={props.formInstance}
      />
    </>
  )
}

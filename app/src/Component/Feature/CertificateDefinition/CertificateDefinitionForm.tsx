import React, { useEffect, useState } from "react"
import { Row, Col, Divider } from "antd"
import { FormInstance } from "antd/lib/form"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { getOrganizationByType } from "~/ApiServices/BizApi/org/orgIf"
import { getCertificateCategoryType } from "~/ApiServices/Service/RefLookupService"
import { FormNumberInput } from "~/Component/Common/Form/FormNumberInput"
import { getCertificateTemplateFileNames, getStaticParameters } from "~/ApiServices/BizApi/certificate/certificateIF"
import { getStaticParams } from "~/ApiServices/Service/CertificateService"
import "~/Sass/utils.scss"

interface ICertificateDefinitionFormProps {
  initialValue: { [key: string]: any }
  formInstance: FormInstance
  setApiCallInProgress: (flag: boolean) => void
}

const fieldNames = {
  CertificateID: "CertificateID",
  CertificateCategoryTypeID: "CertificateCategoryTypeID",
  Name: "Name",
  Description: "Description",
  PrefixFormat: "PrefixFormat",
  IsProgramCertificate: "IsProgramCertificate",
  PublishOnWeb: "PublishOnWeb",
  IsActive: "IsActive",
  OrganizationID: "OrganizationID",
  TemplateFileName: "TemplateFileName",
  ValidityMonths: "ValidityMonths"
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export function CertificateDefinitionForm(props: ICertificateDefinitionFormProps) {
  const [templateNames, setTemplateNames] = useState<Array<any>>([])
  const [staticParameter, setStaticParameter] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    ;(async () => {
      const response = await getCertificateTemplateFileNames([])
      if (response && response.success && response.data) {
        const options: Array<any> = []
        response.data.map((x: any) => {
          options.push({ label: x, value: x })
          return options
        })
        setTemplateNames(options)
      }
    })()
    ;(async () => {
      if (props.initialValue.CertificateID !== undefined) {
        getStaticParams({ CertificateID: props.initialValue.CertificateID }).then((response: any) => {
          if (response.success && response.data) {
            response.data.map((x: any) => {
              props.formInstance.setFieldsValue({ [x.Name]: x.Value })
              return x
            })
          }
        })
        getCertificateStaticParameters(props.initialValue.TemplateFileName)
      }
    })()
    // eslint-disable-next-line
  }, [])

  const getCertificateStaticParameters = async (templateName: any) => {
    getStaticParameters({ TemplateName: templateName }).then((response: any) => {
      if (response && response.success && response.data) {
        const parameters: Array<any> = []
        Object.keys(response.data).map((x: any) => {
          parameters.push(x)
          return parameters
        })
        props.formInstance.setFieldsValue({ ParameterName: parameters })
        setStaticParameter(response.data)
      }
    })
  }

  return (
    <Row>
      <Col xs={24} sm={24} md={24}>
        <FormInput
          {...layout}
          label={"CertificateID"}
          ariaLabel={"CertificateID"}
          fieldName={fieldNames.CertificateID}
          formInstance={props.formInstance}
          hidden
        />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormMultipleRadio
          {...layout}
          formInstance={props.formInstance}
          label={"Certificate Type"}
          ariaLabel={"Ceritficate Type"}
          fieldName={fieldNames.IsProgramCertificate}
          options={[
            { label: "Offering", value: false },
            { label: "Program", value: true }
          ]}
          disabled
        />
        <FormInput
          {...layout}
          label={"Certificate Name"}
          ariaLabel={"Certificate Name"}
          fieldName={fieldNames.Name}
          formInstance={props.formInstance}
          rules={[{ required: true, message: "Please enter certificate name!" }]}
        />
        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Department"}
          fieldName={fieldNames.OrganizationID}
          refLookupService={getOrganizationByType}
          displayKey="Name"
          valueKey="OrganizationID"
        />
        <FormDropDown
          {...layout}
          formInstance={props.formInstance}
          label={"Category"}
          fieldName={fieldNames.CertificateCategoryTypeID}
          refLookupService={getCertificateCategoryType}
          displayKey="Name"
          valueKey="ID"
          rules={[{ required: true, message: "Please select category type!" }]}
        />
        {templateNames.length > 0 && (
          <FormDropDown
            {...layout}
            formInstance={props.formInstance}
            label={"Template Name"}
            fieldName={fieldNames.TemplateFileName}
            options={templateNames}
            onChangeCallback={(value) => {
              getCertificateStaticParameters(value)
            }}
            rules={[{ required: true, message: "Please select template name!" }]}
          />
        )}
      </Col>
      <Col xs={24} sm={24} md={12}>
        <FormMultipleRadio
          {...layout}
          formInstance={props.formInstance}
          label={"Is Active"}
          ariaLabel={"Is Active"}
          fieldName={fieldNames.IsActive}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
        <FormMultipleRadio
          {...layout}
          formInstance={props.formInstance}
          label={"Publish On Web"}
          ariaLabel={"Publish On Web"}
          fieldName={fieldNames.PublishOnWeb}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
        <FormInput
          {...layout}
          label={"Prefix Format"}
          ariaLabel={"Prefix Format"}
          fieldName={fieldNames.PrefixFormat}
          formInstance={props.formInstance}
        />
        <FormNumberInput
          {...layout}
          label={"Valid For"}
          ariaLabel={"Valid For (Months)"}
          fieldName={fieldNames.ValidityMonths}
          formInstance={props.formInstance}
        />
        <FormTextArea
          {...layout}
          label="Description"
          fieldName={fieldNames.Description}
          formInstance={props.formInstance}
        />
      </Col>
      {Object.keys(staticParameter).length > 0 && (
        <>
          <Divider orientation="left">Static Parameter/Value</Divider>
          <Col xs={24} sm={24} md={24}>
            {Object.keys(staticParameter).map((x: any) => {
              return <FormInput {...layout} label={x} fieldName={x} formInstance={props.formInstance} />
            })}
          </Col>
        </>
      )}
    </Row>
  )
}

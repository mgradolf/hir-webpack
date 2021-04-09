import React, { useEffect, useState } from "react"
import { Col, Divider, Row, Select } from "antd"
import Form, { FormInstance } from "antd/lib/form"
import { IOfferingFieldNames } from "~/Component/Feature/Offering/Interfaces"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { getOrganizations } from "~/ApiServices/Service/RefLookupService"
import { findSectionTypesByOfferingType } from "~/ApiServices/BizApi/query/queryIf"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { getAllUsers } from "~/ApiServices/Service/HRUserService"
import { DEFAULT_OFFERING_TYPE_ID } from "~/utils/Constants"
import "~/Sass/utils.scss"

interface IThirdStepFormProps {
  formInstance: FormInstance
  fieldNames: IOfferingFieldNames
  initialValue: { [key: string]: any }
}

export default function ThirdStepForm(props: IThirdStepFormProps) {
  const offeringTypes = props.formInstance.getFieldValue("OfferingTypes")

  const [department, setDepartment] = useState<Array<any>>([])
  const [defaultSection, setDefaultSection] = useState<Array<any>>([])

  useEffect(() => {
    ;(async () => {
      const response = await getOrganizations()
      if (response && response.success && Array.isArray(response.data)) {
        setDepartment(response.data)
      }
    })()

    let offeringTypeID: number
    if (offeringTypes !== undefined && offeringTypes) {
      offeringTypeID = DEFAULT_OFFERING_TYPE_ID
    } else {
      offeringTypeID = props.formInstance.getFieldValue("OfferingTypeID")
    }

    if (offeringTypeID) {
      ;(async () => {
        const response = await findSectionTypesByOfferingType({ OfferingTypeID: offeringTypeID })
        if (response && response.success && Array.isArray(response.data)) {
          setDefaultSection(response.data)
        }
      })()
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Row>
        <Divider orientation="left">Core characteristics</Divider>
        <Col xs={24} sm={24} md={12}>
          {/* <Form.Item
            label="Offering status"
            name={props.fieldNames.OfferingStatusCodeID}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
          >
            <Select aria-label="Offering Status Select" disabled={disableStatus}>
              {offeringStatusTypes &&
                offeringStatusTypes.map((x) => {
                  return (
                    <Select.Option key={x.StatusID} value={x.StatusID}>
                      {x.Name}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item> */}
          <FormMultipleRadio
            labelColSpan={8}
            wrapperColSpan={14}
            formInstance={props.formInstance}
            label={"Quick Admit"}
            ariaLabel={"Is Quick Admin"}
            fieldName={props.fieldNames.IsQuickAdmit}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          />
          <FormDropDown
            labelColSpan={8}
            wrapperColSpan={14}
            label={"Inquiry recipient"}
            ariaLabel={"Inquiry Recipient Select"}
            formInstance={props.formInstance}
            fieldName={props.fieldNames.SubmitInquiryToUserID}
            refLookupService={() => getAllUsers({})}
            displayKey="FormattedName"
            valueKey="UserID"
          />
        </Col>
        <Col xs={24} sm={24} md={12}>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label={"Department"}
            name={props.fieldNames.OrganizationID}
          >
            <Select aria-label={"Select department"}>
              {department.length &&
                department.map((dept) => {
                  return (
                    <Select.Option key={dept.OrganizationID} value={dept.OrganizationID}>
                      {dept.Name}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>

          <FormMultipleRadio
            disabled
            labelColSpan={8}
            wrapperColSpan={14}
            formInstance={props.formInstance}
            label={"Approval Process"}
            ariaLabel={"Has Approval Process"}
            fieldName={props.fieldNames.HasApprovalProcess}
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
          />
        </Col>
      </Row>
      <Row>
        <Divider orientation="left">Default Section</Divider>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            label={"Possible Section Type"}
            name={props.fieldNames.DefaultSectionTypeID}
          >
            <Select aria-label={"Select Possible Section Type"}>
              {defaultSection.length &&
                defaultSection.map((section) => {
                  return (
                    <Select.Option key={section.SectionTypeID} value={section.SectionTypeID}>
                      {section.SectionTypeName}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

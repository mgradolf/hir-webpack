import React, { useState, useEffect } from "react"
import { Form, Select, Card, Button, Row, Col, message } from "antd"
import { getSectionTypes } from "~/ApiServices/Service/RefLookupService"
import { createSection } from "~/ApiServices/Service/OfferingService"
import { CREATE_SUCCESSFULLY, DEFAULT_SECTION_TYPE_ID } from "~/utils/Constants"
import { FormMultipleRadio } from "~/Component/Common/Form/FormMultipleRadio"
import { FormInput } from "~/Component/Common/Form/FormInput"
import { Redirect } from "react-router"
import "~/Sass/utils.scss"

interface ISectionCreateFormProps {
  handleCancel: () => void
  setApiCallInProgress: (flag: boolean) => void
  OfferingID: number
}

interface ISectionCreateFieldNames {
  OfferingID: string
  SectionTypeID: string
}

const SectionFieldName: ISectionCreateFieldNames = {
  OfferingID: "OfferingID",
  SectionTypeID: "SectionTypeID"
}

export function SectionCreateForm(props: ISectionCreateFormProps) {
  const [formInstance] = Form.useForm()
  const [redirectAfterCreate, setRedirectAfterCreate] = useState<string>()
  const [sectionTypes, setSectionTypes] = useState<Array<any>>([])
  const [sectionTypesVisible, setSectionTypesVisible] = useState(false)
  const [initialValues] = useState<{ [key: string]: any }>({ SectionTypes: true, OfferingID: props.OfferingID })

  useEffect(() => {
    getSectionTypes().then((response) => {
      if (response && response.success && Array.isArray(response.data)) {
        setSectionTypes(
          response.data.map((x: any) => {
            if (x.SectionTypeID === DEFAULT_SECTION_TYPE_ID) {
              x.OfferingStatusCodeID = 0
            }
            return x
          })
        )
      }
    })
  }, [formInstance, props.OfferingID])

  const onChangeSectionTypes = (e: any) => {
    if (e.target.value) {
      setSectionTypesVisible(false)
      formInstance.resetFields()
      formInstance.setFieldsValue({ SectionTypes: true })
    } else {
      setSectionTypesVisible(true)
    }
  }

  const onSelectSectionType = () => {
    formInstance.validateFields().then((x) => {
      const params = formInstance.getFieldsValue()
      if (params["SectionTypes"]) {
        params["SectionTypeID"] = DEFAULT_SECTION_TYPE_ID
      }
      props.setApiCallInProgress(true)
      createSection(params).then((response) => {
        if (response.success) {
          formInstance.resetFields()
          message.success(CREATE_SUCCESSFULLY)
          setRedirectAfterCreate(`/section/${response.data.SectionID}`)
          props.handleCancel()
        }
        props.setApiCallInProgress(false)
      })
    })
  }

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <Card
        title="Create new Section"
        actions={[
          <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
            <Col>
              <Button type="primary" danger onClick={props.handleCancel}>
                Cancel
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={onSelectSectionType}>
                Create
              </Button>
            </Col>
          </Row>
        ]}
      >
        <Form
          form={formInstance}
          initialValues={initialValues}
          scrollToFirstError
          style={{
            maxHeight: "80vh",
            overflowY: "scroll"
          }}
        >
          <FormInput
            label={"OfferingID"}
            ariaLabel={"OfferingID"}
            formInstance={formInstance}
            fieldName={SectionFieldName.OfferingID}
            hidden
          />

          <FormMultipleRadio
            labelColSpan={8}
            wrapperColSpan={14}
            formInstance={formInstance}
            label={"Select a section type"}
            ariaLabel={"Select a section type"}
            fieldName="SectionTypes"
            onChangeCallback={(e) => onChangeSectionTypes(e)}
            options={[
              { label: "Default", value: true },
              { label: "Other", value: false }
            ]}
          />
          <Form.Item
            label="Other Section types"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            name={SectionFieldName.SectionTypeID}
            rules={[{ required: sectionTypesVisible, message: "Please select a section type!" }]}
          >
            <Select
              disabled={!sectionTypesVisible}
              placeholder="Select a section type"
              aria-label="Section Type Select"
            >
              {sectionTypes.length &&
                sectionTypes.map((section) => {
                  return (
                    <Select.Option key={section.SectionTypeID} value={section.SectionTypeID}>
                      {section.SectionTypeName}
                    </Select.Option>
                  )
                })}
            </Select>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

import React, { useState, useEffect } from "react"
import { Form, Radio, Select, Card, Button, Input } from "antd"
import {} from "@ant-design/icons"
import { RadioChangeEvent } from "antd/lib/radio"
import { getSectionTypes } from "~/ApiServices/Service/RefLookupService"
import "~/Sass/utils.scss"
import { createSection } from "~/ApiServices/Service/OfferingService"
import { DEFAULT_SECTION_TYPE_ID } from "~/utils/Constants"

interface ISectionCreateFormProps {
  handleCancel: () => void
  handleSelected: (sectionId: number) => void
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

export default function SectionCreateForm(props: ISectionCreateFormProps) {
  const [formInstance] = Form.useForm()
  const [sectionTypes, setSectionTypes] = useState<Array<any>>([])
  const [sectionTypesVisible, setSectionTypesVisible] = useState(false)
  const [isSectionTypeSelected, setIsSectionTypeSelected] = useState(false)
  const [disableRadios, setDisableRadios] = useState(false)
  const sectionRadioValues = {
    DEFAULT: "DEFAULT",
    OTHER: "OTHER"
  }
  const [sectionTypeRadioOptions] = useState([
    { label: "Default", value: sectionRadioValues.DEFAULT, default: true },
    { label: "Other", value: sectionRadioValues.OTHER, default: false }
  ])

  useEffect(() => {
    formInstance.setFieldsValue({ OfferingID: props.OfferingID })
    setIsSectionTypeSelected(!!formInstance.getFieldValue(SectionFieldName.SectionTypeID))
    setDisableRadios(true)
    getSectionTypes()
      .then((response) => {
        if (response && response.success && Array.isArray(response.data)) {
          setSectionTypes(
            response.data.map((x) => {
              if (x.SectionTypeID === DEFAULT_SECTION_TYPE_ID) {
                x.OfferingStatusCodeID = 0
              }
              return x
            })
          )
        }
      })
      .finally(() => setDisableRadios(false))

    return () => {
      formInstance.setFieldsValue({ [SectionFieldName.SectionTypeID]: undefined })
    }
  }, [formInstance, props.OfferingID])

  const onChangeSectionTypes = (e: RadioChangeEvent) => {
    if (e.target.value === sectionRadioValues.DEFAULT) {
      setSectionTypesVisible(false)
      setIsSectionTypeSelected(true)
      formInstance.setFieldsValue({ [SectionFieldName.SectionTypeID]: DEFAULT_SECTION_TYPE_ID })
    } else if (e.target.value === sectionRadioValues.OTHER) {
      setSectionTypesVisible(true)
      setIsSectionTypeSelected(false)
      formInstance.setFieldsValue({ [SectionFieldName.SectionTypeID]: undefined })
    }
  }

  const onSelectSectionType = () => {
    props.setApiCallInProgress(true)
    createSection(formInstance.getFieldsValue()).then((response) => {
      if (response.success) {
        props.handleSelected(response.data.SectionID)
        props.setApiCallInProgress(false)
      }
    })
  }

  return (
    <Card
      title="Create new Section"
      actions={[
        <Button onClick={props.handleCancel}>Cancel</Button>,
        <Button onClick={onSelectSectionType} disabled={!isSectionTypeSelected}>
          Create
        </Button>
      ]}
    >
      <Form form={formInstance} hideRequiredMark layout="horizontal">
        <Form.Item
          label="Select an Section type"
          rules={[{ required: true, message: "Please input an Section type!" }]}
        >
          <Radio.Group aria-label="Section Type" disabled={disableRadios}>
            {sectionTypeRadioOptions.map((opt, index) => (
              <Radio value={opt.value} key={index} onChange={onChangeSectionTypes}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item name={SectionFieldName.OfferingID} className="hidden">
          <Input />
        </Form.Item>
        <Form.Item name={SectionFieldName.SectionTypeID} className="hidden">
          <Input />
        </Form.Item>
        {sectionTypesVisible && (
          <Form.Item
            label="Other Section types"
            name={SectionFieldName.SectionTypeID}
            rules={[{ required: true, message: "Please select an Section type!" }]}
          >
            <Select
              placeholder="Select an Section type"
              aria-label="Section Type Select"
              onSelect={() => {
                setIsSectionTypeSelected(true)
              }}
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
        )}
      </Form>
    </Card>
  )
}

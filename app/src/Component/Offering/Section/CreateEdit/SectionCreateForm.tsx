import React, { useState, useEffect } from "react"
import { Form, Radio, Select, Card, Button, Input } from "antd"
import {} from "@ant-design/icons"
import { RadioChangeEvent } from "antd/lib/radio"
import { getSectionTypes } from "~/ApiServices/Service/RefLookupService"
import "~/sass/utils.scss"
import { createSection } from "~/ApiServices/Service/OfferingService"

interface IOfferingCreateForm1Props {
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

const defaultSectionTypeValue = 13
export default function CreateForm1(props: IOfferingCreateForm1Props) {
  const [formInstance] = Form.useForm()
  const [initialFormValue] = useState<{ [key: string]: any }>({})
  const [sectionTypes, setSectionTypes] = useState<Array<any>>([])
  const [disableRadios, setDisableRadios] = useState(false)
  const [radioValues] = useState([
    { label: "Default", value: defaultSectionTypeValue, default: true },
    { label: "Other", value: "OTHER", default: false }
  ])
  const [sectionTypesVisible, setSectionTypesVisible] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    formInstance.setFieldsValue({ OfferingID: props.OfferingID })
    formInstance.getFieldValue(SectionFieldName.SectionTypeID) ? setIsSelected(true) : setIsSelected(false)
    ;(async () => {
      setDisableRadios(true)
      const response = await getSectionTypes()
      if (response && response.success && Array.isArray(response.data)) {
        setSectionTypes(
          response.data.map((x) => {
            if (x.SectionTypeID === defaultSectionTypeValue) {
              x.OfferingStatusCodeID = 0
            }
            return x
          })
        )
      }
      setDisableRadios(false)

      if (formInstance.getFieldValue("sectionTypeRadio") === "OTHER") {
        setSectionTypesVisible(true)
      }
    })()
    return () => {
      formInstance.setFieldsValue({ [SectionFieldName.SectionTypeID]: undefined })
    }
  }, [formInstance, props.OfferingID])

  const onChangeSectionTypes = (e: RadioChangeEvent) => {
    if (e.target.value === defaultSectionTypeValue) {
      setSectionTypesVisible(false)
      setIsSelected(true)
      formInstance.setFieldsValue({ [SectionFieldName.SectionTypeID]: defaultSectionTypeValue })
    } else if (e.target.value === "OTHER") {
      setSectionTypesVisible(true)
      setIsSelected(false)
      formInstance.setFieldsValue({ [SectionFieldName.SectionTypeID]: undefined })
    }
  }

  const onSelectOtherSectionType = () => {
    props.setApiCallInProgress(true)
    console.log(formInstance.getFieldsValue())
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
        <Button
          onClick={() => {
            props.handleCancel()
          }}
        >
          Cancel
        </Button>,
        <Button onClick={onSelectOtherSectionType} disabled={!isSelected}>
          Select
        </Button>
      ]}
    >
      <Form form={formInstance} hideRequiredMark layout="horizontal" initialValues={initialFormValue}>
        <Form.Item
          label="Select an Section type"
          name="sectionTypeRadio"
          rules={[{ required: true, message: "Please input an Section type!" }]}
        >
          <Radio.Group aria-label="Section Type" disabled={disableRadios}>
            {radioValues.map((opt, index) => (
              <Radio value={opt.value} key={index} onChange={onChangeSectionTypes}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item name={SectionFieldName.OfferingID} className="hidden">
          <Input />
        </Form.Item>
        {!sectionTypesVisible && (
          <Form.Item
            className="hidden"
            label="Other Section types"
            name={SectionFieldName.SectionTypeID}
            rules={[{ required: true, message: "Please select an Section type!" }]}
          >
            <Input aria-label="Other Section Type" />
          </Form.Item>
        )}
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
                setIsSelected(true)
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

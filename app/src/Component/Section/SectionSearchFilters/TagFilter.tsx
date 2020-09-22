import { Row, Checkbox, Select, Col, Input } from "antd"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import {
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  InputCol,
  LabelCol
} from "~/Component/SearchFilters/common"
import styles from "~/Component/SearchFilters/SearchFilters.module.scss"

const { Option } = Select

export default function TagFilter(props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: number }) {
  const [tagTypes, setTagTypes] = useState<any[]>([])
  const [isSearchTagHierarcy, setIsSearchTagHierarchy] = useState<boolean>(
    Boolean(props.value.ComboSearchTagHierarchy) ||
      Boolean(props.value.ComboSearchTagTypeIDHierarchy) ||
      Boolean(props.show.IsSearchTagHierarchy)
  )
  const { show, toggleCheckboxHandler, filterValueChanged, value } = props

  useEffect(() => {
    async function fetchTagTypes() {
      const res = await getTagTypes()
      if (Array.isArray(res.data)) {
        setTagTypes(res.data)
      }
    }
    fetchTagTypes()
  }, [])

  let fieldNameState: { inactive: any; active: any }

  if (isSearchTagHierarcy) {
    fieldNameState = {
      active: {
        tagType: "ComboSearchTagTypeIDHierarchy",
        tagName: "ComboSearchTagHierarchy"
      },
      inactive: {
        tagType: "TagTypeID",
        tagName: "TagName"
      }
    }
  } else {
    fieldNameState = {
      inactive: {
        tagType: "ComboSearchTagTypeIDHierarchy",
        tagName: "ComboSearchTagHierarchy"
      },
      active: {
        tagType: "TagTypeID",
        tagName: "TagName"
      }
    }
  }

  const onChangeHandler = (fieldType: "tagType" | "tagName", value: string | number) => {
    filterValueChanged({
      [fieldNameState.inactive.tagType]: "",
      [fieldNameState.inactive.tagName]: "",
      [fieldNameState.active[fieldType]]: value
    })
  }

  return (
    <Col key={props.key} style={{ paddingLeft: 0 }}>
      <Row>
        <LabelCol>
          <Checkbox checked={show.IsSearchTagHierarchy} onChange={toggleCheckboxHandler("IsSearchTagHierarchy")}>
            Is Search Tag Hierarchy
          </Checkbox>
        </LabelCol>
        <InputCol className={show.IsSearchTagHierarchy ? styles.offeringFilterField : styles.hidden}>
          <Select
            aria-label="Is Search Tag Hierarchy"
            style={{ width: 250 }}
            value={isSearchTagHierarcy.toString()}
            // eslint-disable-next-line no-eval
            onChange={(value) => setIsSearchTagHierarchy(eval(value))}
          >
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
        </InputCol>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox
            checked={show[fieldNameState.active.tagType]}
            onChange={toggleCheckboxHandler(fieldNameState.active.tagType)}
          >
            Tag Type
          </Checkbox>
        </LabelCol>
        <InputCol className={show[fieldNameState.active.tagType] ? styles.offeringFilterField : styles.hidden}>
          <Select
            aria-label="Tag Type"
            style={{ width: 250 }}
            value={value[fieldNameState.active.tagType]}
            onChange={(value) => onChangeHandler("tagType", value)}
          >
            {tagTypes.map(({ Name: label, ID: value }, i) => (
              <Option value={value} key={`${value}_${i}`}>
                {label}
              </Option>
            ))}
          </Select>
        </InputCol>
      </Row>
      <Row>
        <LabelCol>
          <Checkbox
            checked={show[fieldNameState.active.tagName]}
            onChange={toggleCheckboxHandler(fieldNameState.active.tagName)}
          >
            Tag Name
          </Checkbox>
        </LabelCol>
        <InputCol className={show[fieldNameState.active.tagName] ? styles.offeringFilterField : styles.hidden}>
          <Input
            aria-label="Tag Name"
            name={fieldNameState.active.tagName}
            defaultValue=""
            value={value[fieldNameState.active.tagName] === "*" ? "" : value[fieldNameState.active.tagName]}
            onChange={(e) => onChangeHandler("tagName", e.target.value)}
          />
        </InputCol>
      </Row>
    </Col>
  )
}

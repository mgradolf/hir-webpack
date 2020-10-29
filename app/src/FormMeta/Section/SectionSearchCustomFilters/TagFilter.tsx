import { Select, Col, Input } from "antd"
import React, { useEffect, useState } from "react"
import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import {
  IFilterFieldComponent,
  IFilterGenericComponentProps,
  SearchComponentWrapper
} from "~/Component/Common/SearchFilters/common"

const { Option } = Select
const fieldNames = {
  combotagType: "ComboSearchTagTypeIDHierarchy",
  combotagName: "ComboSearchTagHierarchy",
  tagType: "TagTypeID",
  tagName: "TagName"
}
export default function TagFilter(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  const [tagTypes, setTagTypes] = useState<any[]>([])
  const [isSearchTagHierarcy, setIsSearchTagHierarchy] = useState<boolean>(false)

  useEffect(() => {
    async function fetchTagTypes() {
      const res = await getTagTypes()
      if (Array.isArray(res.data)) {
        setTagTypes(res.data)
      }
    }
    fetchTagTypes()
  }, [])

  const onTagTypeChangeHandler = (value: string | number) => {
    const update = {
      [fieldNames.combotagType]: isSearchTagHierarcy ? value : "",
      [fieldNames.tagType]: isSearchTagHierarcy ? "" : value
    }
    props.filterValueChanged(update)
  }
  const onTagNameChangeHandler = (value: string | number) => {
    const update = {
      [fieldNames.combotagName]: isSearchTagHierarcy ? value : "",
      [fieldNames.tagName]: isSearchTagHierarcy ? "" : value
    }
    props.filterValueChanged(update)
  }

  return (
    <Col style={{ paddingLeft: 0 }}>
      <SearchComponentWrapper {...props} fieldName="">
        <Select
          aria-label="Is Search Tag Hierarchy"
          style={{ width: 250 }}
          defaultValue={isSearchTagHierarcy.toString()}
          value={isSearchTagHierarcy.toString()}
          // eslint-disable-next-line no-eval
          onChange={(value) => setIsSearchTagHierarchy(eval(value))}
        >
          <Option value="true" key="true">
            Yes
          </Option>
          <Option value="false" key="false">
            No
          </Option>
        </Select>
      </SearchComponentWrapper>
      {isSearchTagHierarcy && (
        <>
          {" "}
          <SearchComponentWrapper {...props} label="Tag Type" fieldName={fieldNames.tagType}>
            <Select
              aria-label="Tag Type"
              style={{ width: 250 }}
              value={props.value[fieldNames.tagType]}
              onChange={(value) => onTagTypeChangeHandler(value)}
            >
              {tagTypes.map(({ Name: label, ID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchComponentWrapper>
          <SearchComponentWrapper {...props} label="Tag Name" fieldName={fieldNames.tagName}>
            <Input aria-label="Tag Name" defaultValue="" onChange={(e) => onTagNameChangeHandler(e.target.value)} />
          </SearchComponentWrapper>
        </>
      )}
      {!isSearchTagHierarcy && (
        <>
          {" "}
          <SearchComponentWrapper {...props} label="Tag Type" fieldName={fieldNames.combotagType}>
            <Select
              aria-label="Tag Type"
              style={{ width: 250 }}
              value={props.value[fieldNames.combotagType]}
              onChange={(value) => onTagTypeChangeHandler(value)}
            >
              {tagTypes.map(({ Name: label, ID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchComponentWrapper>
          <SearchComponentWrapper {...props} label="Tag Name" fieldName={fieldNames.combotagName}>
            <Input aria-label="Tag Name" defaultValue="" onChange={(e) => onTagNameChangeHandler(e.target.value)} />
          </SearchComponentWrapper>
        </>
      )}
    </Col>
  )
}

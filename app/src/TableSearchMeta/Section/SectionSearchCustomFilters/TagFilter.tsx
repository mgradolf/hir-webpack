import { Select, Col, Input } from "antd"
import React, { useEffect, useState } from "react"
import { getTagTypes } from "~/ApiServices/Service/RefLookupService"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"

const { Option } = Select
const fieldNames = {
  combotagType: "ComboSearchTagTypeIDHierarchy",
  combotagName: "ComboSearchTagHierarchy",
  tagType: "TagTypeID",
  tagName: "TagName"
}
export default function TagFilter(props: IGeneratedField) {
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

  return (
    <Col style={{ paddingLeft: 0 }}>
      <SearchFieldWrapper {...props} fieldName={props.fieldName}>
        <Select
          aria-label="Search Tag Hierarchy"
          style={{ width: 250 }}
          onChange={(selectedValue) => {
            setIsSearchTagHierarchy(selectedValue === "true" ? true : false)
          }}
        >
          <Option value="true" key="true">
            Yes
          </Option>
          <Option value="false" key="false">
            No
          </Option>
        </Select>
      </SearchFieldWrapper>
      {isSearchTagHierarcy && tagTypes.length && (
        <>
          {" "}
          <SearchFieldWrapper {...props} label="Tag Type" fieldName={fieldNames.tagType}>
            <Select aria-label="Tag Type" style={{ width: 250 }}>
              {tagTypes.map(({ Name: label, ID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchFieldWrapper>
          <SearchFieldWrapper {...props} label="Tag Name" fieldName={fieldNames.tagName}>
            <Input aria-label="Tag Name" />
          </SearchFieldWrapper>
        </>
      )}
      {!isSearchTagHierarcy && tagTypes.length && (
        <>
          {" "}
          <SearchFieldWrapper {...props} label="Tag Type" fieldName={fieldNames.combotagType}>
            <Select aria-label="Tag Type" style={{ width: 250 }}>
              {tagTypes.map(({ Name: label, ID: value }, i) => (
                <Option value={value} key={`${value}_${i}`}>
                  {label}
                </Option>
              ))}
            </Select>
          </SearchFieldWrapper>
          <SearchFieldWrapper {...props} label="Tag Name" fieldName={fieldNames.combotagName}>
            <Input aria-label="Tag Name" />
          </SearchFieldWrapper>
        </>
      )}
    </Col>
  )
}

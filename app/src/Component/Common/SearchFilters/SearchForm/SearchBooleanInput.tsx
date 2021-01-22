import React from "react"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/SearchFilters/SearchForm/common"
import { Checkbox } from "antd"

export function BooleanInputType(props: IGeneratedField) {
  return (
    <SearchFieldWrapper {...props} extraProps={{ valuePropName: "checked" }}>
      <Checkbox aria-label={props.ariaLabel} disabled={props.disabled} />
    </SearchFieldWrapper>
  )
}

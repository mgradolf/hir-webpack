import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { Input } from "antd"

export function TextInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return (
    <SearchFieldWrapper {...props}>
      <Input
        aria-label={props.ariaLabel}
        name={props.fieldName}
        type={props.inputType.toLowerCase()}
        defaultValue={props.defaultValue}
        value={props.value === "*" ? "" : props.value}
        onChange={(e) => props.filterValueChanged(props.fieldName, e.target.value)}
      />
    </SearchFieldWrapper>
  )
}

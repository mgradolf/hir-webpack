import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { Input } from "antd"

export function SearchInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return (
    <SearchFieldWrapper {...props}>
      <Input
        aria-label={props.ariaLabel}
        type={props.inputType ? props.inputType.toLowerCase() : "text"}
        disabled={props.disabled}
      />
    </SearchFieldWrapper>
  )
}

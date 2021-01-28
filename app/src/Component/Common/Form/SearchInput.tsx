import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Component/Common/Form/common"
import { Input } from "antd"

export function SearchInputType(props: IGeneratedField) {
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

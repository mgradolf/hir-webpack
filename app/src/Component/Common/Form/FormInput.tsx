import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Component/Common/Form/common"
import { Input } from "antd"

export function FormInput(props: IGeneratedField & { readOnly?: boolean }) {
  return (
    <SearchFieldWrapper {...props}>
      <Input
        aria-label={props.ariaLabel}
        type="text"
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        readOnly={props.readOnly}
      />
    </SearchFieldWrapper>
  )
}

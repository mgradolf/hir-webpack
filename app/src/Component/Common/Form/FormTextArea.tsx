import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Component/Common/Form/common"
import { Input } from "antd"

export function FormTextArea(props: IGeneratedField) {
  return (
    <SearchFieldWrapper {...props}>
      <Input.TextArea aria-label={props.ariaLabel} maxLength={props.maxLength} disabled={props.disabled} />
    </SearchFieldWrapper>
  )
}

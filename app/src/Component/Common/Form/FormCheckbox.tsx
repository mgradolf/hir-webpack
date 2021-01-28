import React from "react"
import { IGeneratedField, SearchFieldWrapper } from "~/Component/Common/Form/common"
import { Checkbox as AntCheckbox } from "antd"

export function FormCheckbox(props: IGeneratedField) {
  return (
    <SearchFieldWrapper {...props} extraProps={{ valuePropName: "checked" }}>
      <AntCheckbox aria-label={props.ariaLabel} disabled={props.disabled} />
    </SearchFieldWrapper>
  )
}

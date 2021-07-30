import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Component/Common/Form/common"
import { Input } from "antd"

export function FormNumberInput(props: IGeneratedField) {
  const maxLengthAndNegativeCheck = (object: any) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
    if (object.target.value.length < 1) {
      object.target.value = ""
    }
  }

  return (
    <SearchFieldWrapper {...props}>
      <Input
        aria-label={props.ariaLabel}
        type="number"
        min={1}
        maxLength={props.maxLength ? props.maxLength : 6}
        onInput={maxLengthAndNegativeCheck}
        disabled={props.disabled}
      />
    </SearchFieldWrapper>
  )
}

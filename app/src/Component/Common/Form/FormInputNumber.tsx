import React from "react"
import { SearchFieldWrapper, IGeneratedField } from "~/Component/Common/Form/common"
import { InputNumber } from "antd"

export function FormInputNumber(props: IGeneratedField) {
  return (
    <SearchFieldWrapper {...props}>
      <InputNumber
        style={{ width: "150px", textAlign: "right" }}
        aria-label={props.ariaLabel}
        max={999999}
        min={0}
        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        parser={(value) => (value !== undefined ? value.replace(/\$\s?|(,*)/g, "") : "")}
        disabled={props.disabled}
      />
    </SearchFieldWrapper>
  )
}

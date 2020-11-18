import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { DatePicker } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"

export function DatePickerInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return (
    <SearchFieldWrapper {...props}>
      <DatePicker
        allowClear
        disabled={props.disabled}
        onChange={(dateString) => {
          dateString && props.formInstance.setFieldsValue({ [props.fieldName]: dateString })
        }}
        format={DATE_FORMAT}
      />
    </SearchFieldWrapper>
  )
}

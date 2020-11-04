import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { DatePicker } from "antd"
import moment from "moment"
import { DATE_FORMAT } from "~/utils/Constants"

export function DatePickerInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return (
    <SearchFieldWrapper {...props}>
      <DatePicker
        allowClear
        value={props.value ? moment(props.value) : undefined}
        onChange={(value) => props.filterValueChanged(props.fieldName, value)}
        format={DATE_FORMAT}
      />
    </SearchFieldWrapper>
  )
}

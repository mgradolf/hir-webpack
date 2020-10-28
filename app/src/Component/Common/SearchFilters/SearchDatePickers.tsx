import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { DatePicker } from "antd"
import { DATE_FORMAT } from "~/utils/Constants"

export function DatePickersInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return (
    <SearchFieldWrapper {...props}>
      <DatePicker.RangePicker
        style={{ width: "100%" }}
        allowEmpty={[true, true]}
        aria-label={props.ariaLabel}
        allowClear
        onChange={(momentValues: any, values: any): void => {
          props.filterValueChanged(props.fieldName, values[0], props.fieldName2, values[1])
        }}
        format={DATE_FORMAT}
      />
    </SearchFieldWrapper>
  )
}

import React from "react"
import {
  IFilterFieldObject,
  IFilterGenericComponentProps,
  SearchFieldWrapper
} from "~/Component/Common/SearchFilters/common"
import { Checkbox } from "antd"

export function BooleanInputType(props: IFilterGenericComponentProps<IFilterFieldObject>) {
  return (
    <SearchFieldWrapper {...props}>
      <Checkbox aria-label={props.ariaLabel} disabled={props.disabled} />
    </SearchFieldWrapper>
  )
}

import React from "react"
import { IFilterGenericComponentProps } from "~/Component/SearchFilters/common"

export default function CustomeFilter(props: IFilterGenericComponentProps) {
  return <div>Hello {props.fieldName}</div>
}

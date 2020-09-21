import React from "react"
import { IFilterGenericComponentProps } from "~/Component/SearchFilters/common"

export default function TagFilter(props: IFilterGenericComponentProps) {
  return <div>Hello tag filter {props.fieldName}</div>
}

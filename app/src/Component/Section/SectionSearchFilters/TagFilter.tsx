import React from "react"
import { IFilterGenericComponentProps } from "~/Component/SearchFilters/common"

export default function TagFilter(props: IFilterGenericComponentProps) {
  return <div key={props.key}>Hello tag filter {props.fieldName}</div>
}

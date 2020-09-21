import React from "react"
import { IFilterGenericComponentProps } from "~/Component/SearchFilters/common"

export default function CustomeFilter(props: IFilterGenericComponentProps) {
  return <div key={props.key}>Hello {props.fieldName}</div>
}

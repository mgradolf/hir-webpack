import React from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/SearchFilters/common"

export default function CustomeFilter(props: IFilterGenericComponentProps<IFilterFieldComponent> & { key: number }) {
  return <div key={props.key}>Hello </div>
}

import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getStudentTableColumns } from "~/FormMeta/Student/StudentTableColumns"
import { studentSearchMeta } from "~/FormMeta/Student/StudentSearchMeta"

interface ISearchStudentLookup extends IFilterGenericComponentProps<IFilterFieldComponent> {
  valueField?: string
}
export function SearchStudentLookupButton(props: ISearchStudentLookup) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Student"
      displayField="FirstName"
      meta={studentSearchMeta}
      {...props}
      {...getStudentTableColumns(true)}
      valueField={props.valueField || "StudentID"}
    />
  )
}

import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { searchStudents } from "~/ApiServices/BizApi/student/studentIf"
import { getStudentTableColumns } from "~/FormMeta/Student/StudentTableColumns"
import { studentSearchMeta } from "~/FormMeta/Student/StudentSearchMeta"

export function SearchStudentLookup(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Student"
      valueField="StudentID"
      displayField="FirstName"
      meta={studentSearchMeta}
      {...props}
      formInstance={props.formInstance}
      searchFunc={searchStudents}
      columns={getStudentTableColumns(true)}
    />
  )
}

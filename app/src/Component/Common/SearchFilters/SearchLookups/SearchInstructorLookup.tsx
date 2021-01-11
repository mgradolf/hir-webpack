import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { InstructorSearchMeta } from "~/FormMeta/Instructor/InstructorSearchMeta"
import { getInstructorTableColumns } from "~/FormMeta/Instructor/InstructorTableColumns"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"

export function SearchInstructorLookupButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Instructor"
      valueField="FacultyID"
      displayField="FirstName"
      meta={InstructorSearchMeta}
      {...props}
      formInstance={props.formInstance}
      {...getInstructorTableColumns(true)}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          searchFaculties({ FacultyID: props.defaultValue }).then((x) => {
            return x.data[0]
          })
      })}
    />
  )
}

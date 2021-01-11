import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { getDiscountProgramsTableColumns } from "~/FormMeta/DiscountPrograms/DiscountProgramsTableColumns"
import { DiscountProgramsSearchMeta } from "~/FormMeta/DiscountPrograms/DiscountProgramsSearchMeta"

interface ISearchDiscountProgramLookup extends IFilterGenericComponentProps<IFilterFieldComponent> {
  valueField?: string
}
export function SearchDiscountProgramLookup(props: ISearchDiscountProgramLookup) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Discount Program"
      displayField="Name"
      meta={DiscountProgramsSearchMeta}
      {...props}
      {...getDiscountProgramsTableColumns(true)}
      valueField={props.valueField || "DiscountProgramID"}
      // {...(props.defaultValue && {
      //   entityLookupFunc: () =>
      //     searchStudents({ StudentID: props.defaultValue }).then((x) => {
      //       if (x.success) return x.data[0]
      //       else return undefined
      //     })
      // })}
    />
  )
}
